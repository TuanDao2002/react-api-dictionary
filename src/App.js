import React from 'react';

export class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
        <main data-theme='dark'>
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

                <button id="toggle">Switch to DARK mode!</button>

            </div>
        </main>
    )
  }
}