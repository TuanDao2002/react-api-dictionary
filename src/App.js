import React from 'react';
import { ToggleContainer } from './Container/ToggleContainer';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        theme: window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
    }

    this.getTheme = this.getTheme.bind(this);
  }

  // set the theme in localStorage if there is one, otherwise use the prefer color scheme of the media
  componentDidMount() {
    if (localStorage.getItem('theme')) {
        this.setState({theme: localStorage.getItem('theme')})
    } 
  }

  //store the theme in localStorage so it cannot be changed when reload
  componentDidUpdate() {
      localStorage.setItem('theme', this.state.theme);
  }

  getTheme(theme) {
    this.setState({theme: theme});
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
            </div>

            <ToggleContainer theme={this.state.theme} getTheme={this.getTheme}/>
        </main>
    )
  }
}