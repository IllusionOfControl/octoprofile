const dictToArray = (dict, func) => {
  const array = []
  for (const key in dict) {
    array.push(func(key, dict[key]));
  }
  return array;
}

const prepareMainLangsData = (repoData) => {
  const LIMIT = 8;
  const mainLangsCount = repoData
    .map(repo => repo.language)
    .reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {})
  const sortedLangs = dictToArray(mainLangsCount, (key, value) => ({label: key, value: value}))
    .filter(lang => lang.label !== 'null')
    .sort((itemA, itemB) => itemA.value - itemB.value)
    .reverse();
  const otherLanguagesValue = sortedLangs
    .slice(LIMIT)
    .reduce((accum, _) => accum + 1, 0);
  return [...sortedLangs.slice(0, LIMIT), {label: 'Other', value: otherLanguagesValue}];
}

const prepareTopLangsBySizeChartData = (langData) => {
  const LIMIT = 8;

  const sortedData = langData
    .sort((itemA, itemB) => itemA.value - itemB.value)
    .reverse();
  const otherLanguagesValue = sortedData
    .slice(LIMIT)
    .reduce((accum, {value}) => accum + value, 0)

  return [...sortedData.slice(0, LIMIT), {label: 'Other', value: otherLanguagesValue}];
}

const prepareStarsByReposData = (repoData) => {
  const LIMIT = 5;
  const mainLangsCount = repoData
    .reduce((acc, {name, stargazers_count}) => {
      acc[name] = (acc[name] || 0) + stargazers_count;
      return acc;
    }, {});
  const sortedRepos = dictToArray(mainLangsCount, (key, value) => ({label: key, value: value}))
    .sort((itemA, itemB) => itemA.value - itemB.value)
    .reverse();
  return sortedRepos.slice(0, LIMIT)
}

export {
  dictToArray,
  prepareMainLangsData,
  prepareTopLangsBySizeChartData,
  prepareStarsByReposData,
}