import React from 'react';

require('./svg.scss');

const APP_SETTINGS = 'app';
export default class SettingsButton extends React.Component {

  render() {
    return (
      <div className='back-button' onClick={this.props.handleClick.bind(this, APP_SETTINGS)}>
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </div>
    )
  }
}
