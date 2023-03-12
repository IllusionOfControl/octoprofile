import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ChartsStyles from './styles/ChartsStyles';
import {Section} from '../style';
import {langColors} from "../constants";
import {prepareMainLangsData, prepareStarsByReposData, prepareTopLangsBySizeChartData} from "../helpers";
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

  const initMainLangsData = () => {
    const data = prepareMainLangsData(repoData);

    const preparedData = {
      labels: data.map(({label}) => label),
      datasets: [
        {
          label: 'Number of repos',
          data: data.map(item => item.value),
          backgroundColor: data.map(({label}) => `${langColors[label]}B3`),
          borderColor: data.map(({label}) => langColors[label]),
          borderWidth: 1,
        }
      ],
    }

    setMainLangsData(preparedData);
  }

  const initTopLangsBySizeChart = () => {
    const data = prepareTopLangsBySizeChartData(langData);

    const preparedData = {
      labels: data.map(({label}) => label),
      datasets: [
        {
          label: 'Size in bytes',
          data: data.map(item => item.value),
          backgroundColor: data.map(({label}) => `${langColors[label]}B3`),
          borderColor: data.map(({label}) => langColors[label]),
          borderWidth: 1,
        }
      ],
    }

    setTopLangBySizeData(preparedData);
  }

  const initStarsByReposData = () => {
    const data = prepareStarsByReposData(repoData);

    const preparedData = {
      labels: data.map(({label}) => label),
      datasets: [
        {
          label: 'Stars',
          data: data.map(item => item.value),
          backgroundColor: '#FF5984',
          borderWidth: 1,
        }
      ],
    }

    setStarsByReposData(preparedData);
  }

  useEffect(() => {
    initMainLangsData();
    initStarsByReposData();
    initTopLangsBySizeChart();
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
