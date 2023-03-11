import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Head, UserInfo, Charts, Repos, Footer, Corner, Error, RateLimit } from '../components';
import GhPolyglot from 'gh-polyglot';

const GITHUB_TOKEN = process.env.GITHUB_PERSONAL_TOKEN;

const FETCH_HEADERS = {
  Authorization: `Token ${GITHUB_TOKEN}`,
}

const fetchUserProfileData = async () => {
  const response = await fetch(`https://api.github.com/user`, {headers: FETCH_HEADERS})
  return await response.json();
}

const fetchUserReposData = async (repos_count) => {
  const REPOS_PER_PAGE = 30;
  const numbersOfPages = Math.ceil(repos_count / REPOS_PER_PAGE);
  let repos = []

  for (let pageNumber = 1; pageNumber <= numbersOfPages; pageNumber++) {
    const response = await fetch(
      `https://api.github.com/user/repos?page=${pageNumber}&per_page=${REPOS_PER_PAGE}`,
      {headers: FETCH_HEADERS}
    );
    const fetched_repos = await response.json();
    repos = repos.concat(fetched_repos);
  }

  return repos;
}

export const getStaticProps = async () => {
  const userData = await fetchUserProfileData();
  const reposData = await fetchUserReposData(userData.public_repos);

  return {
    props: {
      userData: userData,
      repoData: reposData,
      langData: [],
    }
  }
}

const Home = props => {
  const {userData, repoData, langData} = props;

  const getLangData = () => {
    const me = new GhPolyglot(`${username}`);
    me.userStats((err, stats) => {
      if (err) {
        console.error('Error:', err);
        setError({ active: true, type: 400 });
      }
      setLangData(stats);
    });
  };

  return (
    <main>
      <Head title={`OctoProfile | ${userData.login}`} />

      <Corner />

      {userData && <UserInfo userData={userData} />}

      {langData && repoData && <Charts langData={langData} repoData={repoData} />}

      {repoData && <Repos repoData={repoData} />}

      <Footer />
    </main>
  );
};

Home.propTypes = {
  query: PropTypes.object,
};

export default Home;
