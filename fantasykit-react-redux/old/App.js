import React, { Component, PropTypes } from 'react';
import Flexbox from 'flexbox-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from './logo.svg';
import './App.css';
import nygData from './nyg-team.json';
import silhouette from './HeadshotSilhouette.png'

import axios from 'axios';

class App extends React.Component {
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

// Creating a custom react Image element
const Image = ({src, fallbackSrc, style}) => {
    let element;
    const changeSrc = newSrc => {
        element.src = newSrc;
    };
    return (
        <img src={src}
			style = {style}
            onError={() => changeSrc(fallbackSrc)} 
            ref={el => element=el} 
        />
    );
};

Image.propTypes = {
    src: PropTypes.string,
    fallbackSrc: PropTypes.string
};

class Player extends React.Component {

	constructor(props) {
		super(props);

		this.getRank = this.handleGetRank.bind(this);
	}

	handleGetRank(e) {
		var self = this;

		axios.post('/ranks', {
			name: this.props.name
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {

		var playerImg = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/" + this.props.id + ".png&amp;w=345&amp;h=230;";
		
		return (
			<Card className="player">
				<CardHeader
					title={this.props.name}
					textStyle={{
						paddingRight:0,
						display: "flex",
						justifyContent: "space-between"
					}}
					subtitle={this.props.teamid}
				/>
				<CardMedia
					overlayContentStyle={{
						color:"white"
						
					}}
					
					overlay={<CardTitle 
						title={this.props.position + " #" + this.props.num} 
						titleStyle={{fontSize:"small"}}
						style={{
							padding: "35px 10px 0"
						}}
					/>}
				>
					<Image src={playerImg}
						fallbackSrc={silhouette}
						style={{
							width:"100px",
							maxWidth:"100px",
							minWidth:"100px",
							height:"73px"
						}}
					/>
				</CardMedia>
				<CardText>Espn Id={this.props.espnrank}</CardText>

				<CardActions>
					<FlatButton label="Ranks" />
					<form onSubmit={this.getRank}>
						<input type="submit" />
					</form>
				</CardActions>
			</Card>
		);
	}
}

function sortName(a,b) {
	if (a.name < b.name)
		return -1;
	if (a.name > b.name)
		return 1;
	return 0;
}
function sortId(a,b) {
	if (a.id < b.id)
		return -1;
	if (a.id > b.id)
		return 1;
	return 0;
}
function sortRank(a,b) {
	if (a.espnrank < b.espnrank)
		return -1;
	if (a.espnrank > b.espnrank)
		return 1;
	return 0;
}

const SORTSTYLE = {
	'BY_NAME': sortName,
	'BY_ID': sortId,
	'BY_RANK': sortRank
};

class MyApp extends React.Component {

	/*renderPlayer(name) {
		return <Player name={name} />;
	}*/
	
	constructor(props) {
		super(props);
 
		this.state = {
			list: nygData.players,
			sortKey: 'BY_ID',
		};
	}
	
	render() {
		const { list, sortKey, rankings } = this.state;
		const sortedList = list.sort(SORTSTYLE[sortKey]);
		const nygPlayers = sortedList.map((player) =>
			<Player key={player.id.toString()}
					name={player.name}
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
					//espnrank={rankings[player.name]}
			/>
		);
		return (
			<MuiThemeProvider>
				<div>
					<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">
						<FlatButton
							onClick={() => this.setState({ sortKey: 'BY_NAME' })}
						>By Name</FlatButton>
						<FlatButton
							onClick={() => this.setState({ sortKey: 'BY_ID' })}
						>By Id</FlatButton>
					</Flexbox>
					<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">{nygPlayers}</Flexbox>
				</div>
			</MuiThemeProvider>
		);
	}
}
export default MyApp;
