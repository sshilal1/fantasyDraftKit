import React, { Component, PropTypes } from 'react';
import Flexbox from 'flexbox-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from './logo.svg';
import './App.css';
import nygData from './nyg-team.json';
import silhouette from './HeadshotSilhouette.png'

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
	render() {

		var playerImg = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/" + this.props.id + ".png&amp;w=345&amp;h=230;";
		
		return (
			<Card style={{padding:"5px 5px",margin:10,width:220}}>
				<CardHeader
					title={this.props.position + " #" + this.props.num}
					titleStyle={{
						fontSize:"small"
					}}
					//subtitle={this.props.position + " #" + this.props.num}
					//subtitleColor={"blue"}
				/>
				<CardMedia
					/*overlayContainerStyle={{
						height:"10px",
						color:"white"
					}}*/
					overlay={<CardTitle 
						title={this.props.name} 
						titleStyle={{
							fontSize:"small"
						}}
					/>}
				>
					<Image src={playerImg}
						fallbackSrc={silhouette}
						style={{
							width:"100px",
							maxWidth:"100px",
							minWidth:"100px"
						}}
					/>
				</CardMedia>
				<CardText>{this.props.id}</CardText>

				<CardActions>
					<FlatButton label="Stats" />
				</CardActions>
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
			/>
		);
		return (
			<MuiThemeProvider>
				<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">{nygPlayers}</Flexbox>
			</MuiThemeProvider>
		);
	}
}
export default MyApp;
