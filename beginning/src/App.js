import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: {firstName: 'yihua', lastName: 'vor'},
      company: 'ztm',
    };

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hi {this.state.name.firstName } {this.state.name.lastName} you work at {this.state.company}
          </p>
          <button onClick={() => {
            this.setState(
              () => {
              return {
                name: {firstName : 'andrei', lastName: 'andrei'},
              }
              }, 
              () => {
                console.log(this.state)
              });
          //  console.log(this.state)
          }}> Change name </button>
          <button onClick={() => {
            this.setState({company: 'samsung'})
            console.log(this.state)
          }}>
          change company 
          </button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  
}

export default App;
