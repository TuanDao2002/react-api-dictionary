import React from 'react';
import { ChangeThemeContainer } from './Container/ChangeThemeContainer';
import { InputContainer } from './Container/InputContainer';

const url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        theme: (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark',
        input: "",
        endpoint: "",
    }

    this.setTheme = this.setTheme.bind(this);
    this.setInput = this.setInput.bind(this);
    this.setEndpoint = this.setEndpoint.bind(this);
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

  setTheme(theme) {
    this.setState({theme: theme});
  }

  setInput(input) {
    this.setState({input: input});
  }

  setEndpoint() {
    if (this.state.input === '') {
      this.setState({endpoint: ''});
      return;
    } 
    this.setState({endpoint: url + this.state.input});
  }

  render() {
    return (
        <main data-theme={this.state.theme}>
            <header>
                <h1 id='pagename'>Dictionary</h1>
            </header>

            <div className="container">
                <InputContainer onChange={this.setInput} onSubmit={this.setEndpoint}/>

                <div id="responseField">
                    <p id="def">Definition</p>
                    <p>{this.state.endpoint}</p>
                </div>
            </div>

            <ChangeThemeContainer theme={this.state.theme} setTheme={this.setTheme}/>
        </main>
    )
  }
}