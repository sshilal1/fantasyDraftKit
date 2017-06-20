import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import nygData from './nyg-team.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

class Player extends React.Component {
	render() {
		return (
			<div className="player">
				<h4>{this.props.name}</h4>
			</div>
		);
	}
}

class MyApp extends React.Component {

	renderPlayer(name) {
		return <Player name={name} />;
	}
	
	render() {
		const playerNames = [];
		for (var player of nygData.players) {
			playerNames.push(player.name);
		}
		const nygPlayers = playerNames.map((name) =>
			<li>{name}</li>
		);
		return (
			/*<div className="App">
				{this.renderPlayer("steve")}
			</div>*/
			<ul>{nygPlayers}</ul>
		);
	}
}

console.log(nygData);

export default MyApp;
