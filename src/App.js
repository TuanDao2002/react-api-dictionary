import React from 'react';
import { ChangeThemeContainer } from './Container/ChangeThemeContainer';
import { InputContainer } from './Container/InputContainer';
import { ResponseContainer } from './Container/ResponseContainer';

const url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        theme: (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark',
        input: "",
        endpoint: null,
        error: false,
        reload: 0,
    }

    this.setTheme = this.setTheme.bind(this);
    this.setInput = this.setInput.bind(this);
    this.setError = this.setError.bind(this);
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

  setError(bool) {
    this.setState({error: bool});
  }

  setEndpoint() {
    if (this.state.input === "") {
      this.setState({endpoint: ""});
      return;
    } 
    this.setState({endpoint: url + this.state.input});

    if (this.state.error) {
      this.state.reload === 0 ? this.setState({reload: 1}) : this.setState({reload: 0});
    } 
  }

  render() {
    return (
        <main data-theme={this.state.theme}>
            <header>
                <h1 id='pagename'>Dictionary</h1>
            </header>

            <div className="container">
                <InputContainer input={this.state.input} onChange={this.setInput} onSubmit={this.setEndpoint}/>
                <ResponseContainer endpoint={this.state.endpoint} setError={this.setError} reload={this.state.reload}/>
                <ChangeThemeContainer theme={this.state.theme} setTheme={this.setTheme}/>
            </div>

        </main>
    )
  }
}