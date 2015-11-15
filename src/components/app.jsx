import React  from 'react';

const RaisedButton = require('material-ui/lib/raised-button');

const MyRawTheme = require('./material-ui-theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

import Icon   from './icon';
import VolumeController from './volumecontroller';
import { startMusic, stopMusic, changeVolume } from 'util/audio';

require('./app.scss');

@ThemeDecorator(ThemeManager.getMuiTheme(MyRawTheme))
export default class App extends React.Component {

  render() {
    return (
      <div className="app-container">
        <h1 className="title">Music Generator</h1>
        <Icon />
        <VolumeController changeVolume={changeVolume} />
        <div className="buttons">
          <RaisedButton label="Jam" primary={true} onClick={startMusic} />
          <RaisedButton label="Rest" primary={true} onClick={stopMusic} />
        </div>
      </div>
    )
  }
}
