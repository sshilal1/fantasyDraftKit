import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

const NewApp = () => (
  <MuiThemeProvider>
  </MuiThemeProvider>
);

class Player extends React.Component {
	render() {
		return (
			<Card style={{padding:"14px 24px 24px",margin:10,width:200}}>
				<CardHeader
					title={this.props.name}
				/>
				<CardText>{this.props.id}</CardText>
			</Card>
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
			<MuiThemeProvider>
				<Flexbox flexDirection="row" flexWrap="wrap">{nygPlayers}</Flexbox>
			</MuiThemeProvider>
		);
	}
}
export default MyApp;
