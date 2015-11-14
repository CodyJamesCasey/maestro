import React from 'react';

require('./app.scss');

export default class App extends React.Component {
  state = {

  }

  render() {
    return (
      <div>
        <h1>Music Generator</h1>
        <div className="buttons">
          <div className="button">Play</div>
          <div className="button">Stop</div>
        </div>
      </div>
    )
  }
}
