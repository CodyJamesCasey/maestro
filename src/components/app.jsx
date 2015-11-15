import React  from 'react';

const RaisedButton = require('material-ui/lib/raised-button');

const MyRawTheme = require('./material-ui-theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

import Icon   from './icon';
import VolumeController from './volumecontroller';

require('./app.scss');

@ThemeDecorator(ThemeManager.getMuiTheme(MyRawTheme))
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
          <RaisedButton label="Jam" primary={true} onClick={this.startMusic} />
          <RaisedButton label="Rest" primary={true} onClick={this.stopMusic} />
        </div>
      </div>
    )
  }
}
