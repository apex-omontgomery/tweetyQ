import React from 'react';
import RC2 from 'react-chartjs2';
import data from './data.json';

const arr = [];
data.data.map(item => arr.push(item.value));

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Temperature in Delhi',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      data: arr
    }
  ]
};

const chartOptions = {
  scales: {
    xAxes: [
      {
        stacked: true
      }
    ],
    yAxes: [
      {
        stacked: true
      }
    ]
  }
};
const style = {
  width: '500px',
  height: '500px'
};

class Bar extends React.Component {
  render() {
    return (
      <div style={style}>
        <RC2 data={chartData} options={chartOptions} type="bar" />
      </div>
    );
  }
}

export default Bar;
