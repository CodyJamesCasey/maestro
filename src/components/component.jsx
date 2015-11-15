import React from 'react';

export default class Sound extends React.Component {
  static propTypes = {
    pitch: React.PropTypes.string.isRequired,
    leftPanning: React.PropTypes.number.isRequired,
    rightPanning: React.PropTypes.number.isRequired 
  }

  props = {
    pitch: null,
    leftPanning: 0,
    rightPanning: 0
  }

  render() {
    return (
      <audio autoplay>
        <source src={'Piano.ff.' + this.props.pitch + '.mp3'} type="audio/mp3">
      </audio>
    );
  }
}
