import React, { Component, PropTypes }  from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// creating custom react top right header
const CardHeaderRight = ({text}) => {
    return (
        <div style = {
        	{
        		position:"absolute",
        		top: 0,
        		right: 0
        	}
        }>
        {text}
        </div>
    );
};

export default class Player extends React.Component {

	constructor() {
		super();
		this.state = {
			id: 5526,
			name: "Eli Manning",
			teamid: "nyg",
			position: "qb",
			num: 10,
			espnrank: 24,
			fun: "test"
		}
	}

	render() {

		var playerImg = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/" + this.state.id + ".png&amp;w=345&amp;h=230;";
		
		return (
			<Card className="player" style={{position:"relative"}}>
				<CardHeader
					title={this.state.name}
					subtitle={this.state.teamid}
				/>
				<CardHeaderRight text="som text"></CardHeaderRight>
				<CardMedia
					overlayContentStyle={{color:"white"}}
					
					overlay={<CardTitle 
						title={this.state.position + " #" + this.state.num} 
						titleStyle={{fontSize:"small"}}
						style={{padding: "35px 10px 0"}}
					/>}
				>
					<img src={playerImg}
						style={{
							width:"100px",
							maxWidth:"100px",
							minWidth:"100px",
							height:"73px"
						}}
					/>
				</CardMedia>
				<CardText>Espn Id={this.state.espnrank}</CardText>

				<CardActions>
					<FlatButton label="Ranks" />
				</CardActions>
			</Card>
		);
	}
}