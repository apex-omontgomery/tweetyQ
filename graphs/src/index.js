import React, { Component } from 'react';
import Line from './components/Line/Line';
import Bar from './components/Bar/Bar';
import { render } from 'react-dom';

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      boolDisplayLine: true,
      boolDisplayBar: false
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
        {this.state.boolDisplayLine ? <Line /> : <Bar />}
      </div>
    );
  }
}
render(<Menu />, document.getElementById('root'));
