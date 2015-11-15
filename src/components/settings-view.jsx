import React  from 'react';

import BackButton from './back-button';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('./setting-view.scss');

const Slider = require('material-ui/lib/slider');
const DropDownMenu = require('material-ui/lib/drop-down-menu');

export default class App extends React.Component {

  changeBpm = (event, value) => {
    this.props.changeBpm(value);
  }

  render() {
    return (
    <div className="app-container">
      <BackButton handleClick={this.props.changeView.bind(this)} />
      <h2 className="title settings-title">Settings</h2>
      <div className="bpm-setting-section">
        <h1>BPM</h1>
        <Slider name="bpm-slider" defaultValue={60} max={120} step={1} onChange={this.changeBpm}/>
      </div>
      <div className="control-key-setting-section">
        <h1>Control Key</h1>
        <DropDownMenu   menuItems={[
        { payload: '1', text: 'Ab' },
        { payload: '2', text: 'A' },
        { payload: '3', text: 'Bb' },
        { payload: '4', text: 'B' },
        { payload: '5', text: 'C' },
        { payload: '6', text: 'Db' },
        { payload: '7', text: 'D' },
        { payload: '8', text: 'Eb' },
        { payload: '9', text: 'E' },
        { payload: '10', text: 'F' },
        { payload: '11', text: 'Gb' },
        { payload: '12', text: 'G' }
        ]}/>
      </div>

      <div className='color-setting-section'>
        <h1>Background Color</h1>
        <DropDownMenu
        menuItems={[
        { payload: '1', text: 'purple' },
        { payload: '2', text: 'black' },
        { payload: '3', text: 'blue' },
        { payload: '4', text: 'green' },
        { payload: '5', text: 'yellow' }
        ]}
        onChange={this.saveColor} />
      </div>
    </div>
    );
  }
}
