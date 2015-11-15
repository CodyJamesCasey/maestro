import React  from 'react';

const RaisedButton = require('material-ui/lib/raised-button');

const MyRawTheme = require('./material-ui-theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

import Icon   from './icon';
import VolumeController from './volumecontroller';
import { play, changeVolume } from 'util/audio';

require('./app.scss');

@ThemeDecorator(ThemeManager.getMuiTheme(MyRawTheme))
export default class App extends React.Component {

  startMusic() {
    console.log('starting');
  }

  stopMusic() {
    console.log('stopping');
  }

  party = () => {
    play('C4', -100 + (Math.random() * 200), -100 + (Math.random() * 200));
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="title">Music Generator</h1>
        <Icon />
        <VolumeController changeVolume={changeVolume} />
        <div className="buttons">
          <RaisedButton label="Jam" primary={true} onClick={this.startMusic} />
          <RaisedButton label="Rest" primary={true} onClick={this.stopMusic} />
          <RaisedButton label="Party" primary={true} onClick={this.party} />
        </div>
      </div>
    )
  }
}
