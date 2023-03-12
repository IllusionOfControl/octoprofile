import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ChartsStyles from './styles/ChartsStyles';
import {Section} from '../style';
import {langColors} from "../constants";
import {dictToArray} from "../helpers";
import {Chart as ChartJS, BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale} from "chart.js";
import {Pie, Bar} from "react-chartjs-2";

ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const Charts = ({langData, repoData}) => {
  const [mainLangsData, setMainLangsData] = useState(null);
  const [starsByReposData, setStarsByReposData] = useState(null);
  const [topLangBySizeData, setTopLangBySizeData] = useState(null);
  const chartSize = 300;

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  const prepareMainLangsData = () => {
    const LIMIT = 8;
    const mainLangsCount = repoData
      .map(repo => repo.language)
      .reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      }, {})
    const sortedLangs = dictToArray(mainLangsCount, (key, value) => ({label: key, value: value}))
      .filter(lang => lang.label != 'null')
      .sort((itemA, itemB) => itemA.value - itemB.value)
      .reverse();
    const otherLanguagesValue = sortedLangs
      .slice(LIMIT)
      .reduce((accum, {value}) => accum + 1, 0);
    const selectedLanguages = [...sortedLangs.slice(0, LIMIT), {label: 'Other', value: otherLanguagesValue}];

    const preparedData = {
      labels: selectedLanguages.map(({label}) => label),
      datasets: [
        {
          label: 'Number of repos',
          data: selectedLanguages.map(item => item.value),
          backgroundColor: selectedLanguages.map(({label}) => `${langColors[label]}B3`),
          borderColor: selectedLanguages.map(({label}) => langColors[label]),
          borderWidth: 1,
        }
      ],
    }

    setMainLangsData(preparedData);
  }

  const prepareTopLangsBySizeChartData = () => {
    const LIMIT = 8;
    const sorted = langData
      .sort((itemA, itemB) => itemA.value - itemB.value)
      .reverse();
    const otherLanguagesValue = sorted
      .slice(LIMIT)
      .reduce((accum, {value}) => accum + value, 0)
    const selectedLanguages = [...sorted.slice(0, LIMIT), {label: 'Other', value: otherLanguagesValue}];

    const preparedData = {
      labels: selectedLanguages.map(({label}) => label),
      datasets: [
        {
          label: 'Size in bytes',
          data: selectedLanguages.map(item => item.value),
          backgroundColor: selectedLanguages.map(({label}) => `${langColors[label]}B3`),
          borderColor: selectedLanguages.map(({label}) => langColors[label]),
          borderWidth: 1,
        }
      ],
    }

    setTopLangBySizeData(preparedData);
  }

  const prepareStarsByReposData = () => {
    const LIMIT = 5;
    const mainLangsCount = repoData
      .reduce((acc, {name, stargazers_count}) => {
        acc[name] = (acc[name] || 0) + stargazers_count;
        return acc;
      }, {});
    const sortedRepos = dictToArray(mainLangsCount, (key, value) => ({label: key, value: value}))
      .sort((itemA, itemB) => itemA.value - itemB.value)
      .reverse();
    const selectedRepos = sortedRepos.slice(0, LIMIT);

    const preparedData = {
      labels: selectedRepos.map(({label}) => label),
      datasets: [
        {
          label: 'Stars',
          data: selectedRepos.map(item => item.value),
          backgroundColor: '#FF5984',
          borderWidth: 1,
        }
      ],
    }

    setStarsByReposData(preparedData);
  }

  useEffect(() => {
    prepareMainLangsData();
    prepareStarsByReposData();
    prepareTopLangsBySizeChartData();
  }, []);

  return (
    <Section>
      <ChartsStyles>
        <div className="chart">
          <header>
            <h2>Top Languages</h2>
          </header>

          <div className="chart-container">
            {mainLangsData
              ? <Pie data={mainLangsData}  options={pieOptions}/>
              : <p>Nothing to see here!</p>}
          </div>
        </div>

        <div className="chart">
          <header>
            <h2>Most Starred</h2>
          </header>
          <div className="chart-container">
            {starsByReposData
              ? <Bar data={starsByReposData} options={barOptions} height={chartSize}/>
              : <p>Nothing to see here!</p>}
          </div>
        </div>

        <div className="chart">
          <header>
            <h2>Stars per Language</h2>
          </header>
          <div className="chart-container">
            {topLangBySizeData
              ? <Pie data={topLangBySizeData} options={pieOptions}/>
              : <p>Nothing to see here!</p>}
          </div>
        </div>
      </ChartsStyles>
    </Section>
  );
};

Charts.propTypes = {
  langData: PropTypes.array.isRequired,
  repoData: PropTypes.array.isRequired,
};

export default Charts;
