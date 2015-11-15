import React  from 'react';
const Slider = require('material-ui/lib/slider');

const MyRawTheme = require('./material-ui-theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');


require('./volume-controller.scss');

@ThemeDecorator(ThemeManager.getMuiTheme(MyRawTheme))
export default class VolumeController extends React.Component {

  constructor(props) {
    super(props);
    this.changeVolume = this.changeVolume.bind(this);
  }

  changeVolume(event, value) {
    this.props.changeVolume(value);
  }

  render() {
    return (
      <div className="volume-controller-container">
        <Slider name="volume-slider" defaultValue={0.5} step={0.01} onChange={this.changeVolume}/>
      </div>
    )
  }
}
