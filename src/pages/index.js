import PropTypes from 'prop-types';
import { Head, UserInfo, Charts, Repos, Footer, Corner} from '../components';
import {
  fetchUserProfileData,
  fetchUserReposData,
  fetchReposLangsData,
} from "@/api";

export const getStaticProps = async () => {
  const userData = await fetchUserProfileData();
  const reposData = await fetchUserReposData(userData.public_repos);
  const langData = await fetchReposLangsData(reposData);

  return {
    props: {
      userData: userData,
      repoData: reposData,
      langData: langData,
    }
  }
}

const Home = props => {
  const {userData, repoData, langData} = props;

  return (
    <main>
      <Head title={`OctoProfile | ${userData.login}`}/>

      <Corner />
      <UserInfo userData={userData} />
      <Charts langData={langData} repoData={repoData} />
      <Repos repoData={repoData} />
      <Footer />
    </main>
  );
};

Home.propTypes = {
  query: PropTypes.object,
};

export default Home;
