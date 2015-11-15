import React  from 'react';

import Button from './button';
import Icon   from './icon';
import VolumeController from './volumecontroller';
import { play } from 'util/audio';

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

  party = () => {
    play('C4', -100 + (Math.random() * 200), -100 + (Math.random() * 200) );  
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
          <Button value="Party" handleClick={this.party} />
        </div>
      </div>
    )
  }
}
