import React, { Component } from 'react';
//import Line from './components/Line/Line';
import Bar from './components/Bar/Bar';
import { render } from 'react-dom';
import data from './components/Bar/data.json';

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      boolDisplayLine: false,
      boolDisplayBar: true
    };
  }

  isGraph() {
    console.log(this._button);
  }
  render() {
    return (
      <div>
        <div>
          <div>
            <button
              className="btn btn-success"
              onClick={() => {
                this.setState({
                  boolDisplayLine: true,
                  boolDisplayBar: false
                });
              }}
            >
              Generate Line Graph
            </button>
          </div>
          <div>
            <button
              className="btn btn-success"
              onClick={() => {
                this.setState({
                  boolDisplayLine: false,
                  boolDisplayBar: true
                });
              }}
            >
              Generate Bar Graph
            </button>
          </div>
        </div>
        <Bar data={data} />
        {/* {this.state.boolDisplayLine ? <Line /> : <Bar />} */}
      </div>
    );
  }
}
render(<Menu />, document.getElementById('root'));
