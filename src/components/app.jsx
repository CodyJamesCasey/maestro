import React  from 'react';

const RaisedButton = require('material-ui/lib/raised-button');

const MyRawTheme = require('./material-ui-theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

import Icon   from './icon';
import SettingsButton from './settings-button';
import BackButton from './back-button';
import VolumeController from './volumecontroller';
import { startMusic, stopMusic, changeVolume } from 'util/audio';

require('./app.scss');

const APP_VIEW = 'app';
const SETTINGS_VIEW = 'settings';

@ThemeDecorator(ThemeManager.getMuiTheme(MyRawTheme))
export default class App extends React.Component {

  state = {
    view: APP_VIEW
  }

  changeView(view) {
    this.setState({
      view: view
    });
  }

  renderApp() {
    return (
      <div className="app-container">
        <SettingsButton handleClick={this.changeView.bind(this)} />
        <h1 className="title">Maestro</h1>
        <Icon />
        <VolumeController changeVolume={changeVolume} />
        <div className="buttons">
          <RaisedButton label="Jam" primary={true} onClick={startMusic} />
          <RaisedButton label="Rest" primary={true} onClick={stopMusic} />
        </div>
      </div>
    );
  }

  renderSettings() {
    return (
        <div className="app-container">
          <BackButton handleClick={this.changeView.bind(this)} />
          <h2 className="title settings-title">Settings</h2>
        </div>
    );
  }

  render() {
    let view = null;
    switch (this.state.view) {
      case APP_VIEW:
        view = this.renderApp();
        break;
      case SETTINGS_VIEW:
        view = this.renderSettings();
        break;
      default:
    }
    return view;
  }
}
