import React from 'react';
import RC2 from 'react-chartjs2';

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataObject: {}
    };
    console.log(this.props);
  }

  componetWillMount() {
    const reducedData = this.collectData(this.props.data);
    console.log(this.reducedData);
    const labels = reducedData.map(item => {
      return item.name;
    });

    const vals = reducedData.map(item => {
      return item.average;
    });
    console.log(vals);
    console.log(labels);
    this.setState({ dataObject: this.chartData(vals, labels) });
  }

  splitDataObject = dataObject => {};
  collectData = dataMetricsArray => {
    let listObjects = Array.prototype.concat.apply([
      this.extractKeywords(dataMetricsArray.entities),
      this.extractKeywords(dataMetricsArray.keywords)
    ]);
    return this.avgListObjects(listObjects);
  };

  extractKeywords = jsonData => {
    return jsonData.map(arrayItem => {
      return arrayItem.emotion;
    });
  };

  avgListObjects = dataInput => {
    return Array.from(
      dataInput.reduce(
        (acc, obj) =>
          Object.keys(obj).reduce(
            (acc, key) =>
              typeof obj[key] === 'number'
                ? acc.set(
                    key,
                    // immediately invoked function:
                    (([sum, count]) => [sum + obj[key], count + 1])(
                      acc.get(key) || [0, 0]
                    )
                  ) // pass previous value
                : acc,
            acc
          ),
        new Map()
      ),
      ([name, [sum, count]]) => ({ name, average: sum / count })
    );
  };

  chartOptions = {
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

  style = {
    width: '500px',
    height: '500px'
  };

  chartData = (data, labels) => {
    return {
      labels: labels,
      datasets: [
        {
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
          data: data
        }
      ]
    };
  };

  render() {
    return (
      <div style={this.style}>
        <RC2
          data={this.props.dataObject}
          options={this.chartOptions}
          type="bar"
        />
      </div>
    );
  }
}

export default Bar;
