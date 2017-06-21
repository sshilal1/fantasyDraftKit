import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

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
				<h6>{this.props.id}</h6>
			</div>
		);
	}
}

class MyApp extends React.Component {

	renderPlayer(name) {
		return <Player name={name} />;
	}
	
	render() {
		const nygPlayers = nygData.players.map((player) =>
			<Player name={player.name}
					id={player.id}
					age={player.age}
					height={player.height}
					weight={player.weight}
					num={player.num}
					position={player.position}
					college={player.college}
					experience={player.experience}
					teamid={player.teamid}
					stats={player.stats}
			/>
		);
		return (
			<ul>{nygPlayers}</ul>
		);
	}
}
export default MyApp;
