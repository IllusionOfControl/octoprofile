import {FETCH_HEADER} from "@/constants";

const fetchUserProfileData = async () => {
  const response = await fetch(
    `https://api.github.com/user`,
    {headers: FETCH_HEADER}
  )
  return await response.json();
}

const fetchUserReposData = async (repos_count) => {
  const REPOS_PER_PAGE = 30;
  const numbersOfPages = Math.ceil(repos_count / REPOS_PER_PAGE);
  let totalRepositories = []

  for (let pageNumber = 1; pageNumber <= numbersOfPages; pageNumber++) {
    const response = await fetch(
      `https://api.github.com/user/repos?page=${pageNumber}&per_page=${REPOS_PER_PAGE}`,
      {headers: FETCH_HEADER}
    );
    const fetched_repos = await response.json();
    totalRepositories = totalRepositories.concat(fetched_repos);
  }

  return totalRepositories;
}

const fetchReposLangsData = async (repos) => {
  let totalLanguagesMetrics = {}

  for (const repo of repos) {
    const response = await fetch(
      repo.languages_url,
      {headers: FETCH_HEADER}
    );
    const fetchedLangs = await response.json();

    // sum language metric values
    for (const label in fetchedLangs) {
      totalLanguagesMetrics.hasOwnProperty(label) ?
        totalLanguagesMetrics[label] += fetchedLangs[label] :
        totalLanguagesMetrics[label] = fetchedLangs[label]
    }
  }

  // [ label: { label, value } ]
  for (const label in totalLanguagesMetrics) {
    totalLanguagesMetrics[label] = {label: label, value: totalLanguagesMetrics[label]};
  }

  return Object.values(totalLanguagesMetrics);
}

export {
  fetchUserProfileData,
  fetchReposLangsData,
  fetchUserReposData
};