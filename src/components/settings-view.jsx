import React  from 'react';

import BackButton from './back-button';

export default class App extends React.Component {

  render() {
    return (
      <div className="app-container">
        <BackButton handleClick={this.props.changeView.bind(this)} />
        <h2 className="title settings-title">Settings</h2>
      </div>
    );
  }
}

/*
- control bpm with Slider (look for volume slider for example)
- control key with drop down (use material ui drop down)
- change color theme with drop down of colors (modify current colors so that other colors are calculated off of base color. That way, changing the base color will change entire theme)
*/
