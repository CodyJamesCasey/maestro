import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app';

const wrapper = document.createElement("div");
wrapper.className = 'app-container-wrapper';

ReactDOM.render(<App />, document.body.appendChild(wrapper));
