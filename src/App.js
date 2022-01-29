import React from 'react';
import { ChangeThemeContainer } from './Container/ChangeThemeContainer';
import { InputContainer } from './Container/InputContainer';
import { ResponseContainer } from './Container/ResponseContainer';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        theme: (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark',
        word: null,
        error: false,
        reload: 0,
    }

    this.setTheme = this.setTheme.bind(this);
    this.setWord = this.setWord.bind(this);
    this.setError = this.setError.bind(this);
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

  setWord(input) {
    this.setState({word: input});

    // if there is error, allow users to submit again by toggeling the "reload" state to trigger useEffect() in ResponseContainer.js
    if (this.state.error) {
      this.state.reload === 0 ? this.setState({reload: 1}) : this.setState({reload: 0});
    } 
  }

  setError(bool) {
    this.setState({error: bool});
  }

  render() {
    return (
        <main data-theme={this.state.theme}>
            <header>
                <h1 id='pagename'>Dictionary</h1>
            </header>

            <div className="container">
                <InputContainer word={this.state.word} onSubmit={this.setWord}/>
                <ResponseContainer word={this.state.word} setError={this.setError} reload={this.state.reload}/>
                <ChangeThemeContainer theme={this.state.theme} setTheme={this.setTheme}/>
            </div>

        </main>
    )
  }
}