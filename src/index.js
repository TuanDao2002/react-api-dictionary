import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Main extends React.Component {
  render() {
    return (
      <h1>Main</h1>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

