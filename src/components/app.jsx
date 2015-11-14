import React  from 'react';

import Button from './button';
import Icon   from './icon';
import VolumeController from './volumecontroller';

require('./app.scss');

export default class App extends React.Component {
  state = {

  }

  startMusic() {
    console.log('starting');
  }

  stopMusic() {
    console.log('stopping');
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="title">Music Generator</h1>
        <Icon />
        <VolumeController />
        <div className="buttons">
          <Button value="Jam" handleClick={this.startMusic} />
          <Button value="Rest" handleClick={this.stopMusic} />
        </div>
      </div>
    )
  }
}
