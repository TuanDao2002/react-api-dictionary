import React from 'react';
import { Toggle } from './Presentational/toggleTheme';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        theme: localStorage.getItem('theme'),
    }

    this.changeTheme = this.changeTheme.bind(this);
  }

  // store the theme in localStorage so it cannot be changed when reload
  componentDidMount() {
      localStorage.setItem('theme', this.state.theme);
  }

  componentDidUpdate() {
      localStorage.setItem('theme', this.state.theme);
  }

  changeTheme() {
      if (this.state.theme === 'light') {
          this.setState({ theme: 'dark' });
      } else if (this.state.theme === 'dark') {
          this.setState({ theme:'light' });
      }
  }

  render() {
    return (
        <main data-theme={this.state.theme}>
            <header>
                <h1 id='pagename'>Dictionary</h1>
            </header>

            <div className="container">

                <h1 id="prompt">Enter a Word</h1>

                <form id="form" autoComplete="off">
                    <input type="text" id="input" placeholder="Type in a word" />
                    <button id="submit">SUBMIT</button>
                </form>

                <div id="responseField">
                    <p id="def">Definition</p>
                </div>

                <Toggle theme={this.state.theme} onClick={this.changeTheme} />
            </div>
        </main>
    )
  }
}