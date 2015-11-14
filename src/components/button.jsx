import React from 'react';

require('./button.scss');

export default class Button extends React.Component {

  render() {
    return (
      <div className="button" onClick={this.props.handleClick}>
        {this.props.value}
      </div>
    )
  }
}
