import React from "react";
import { connect } from "react-redux"
import Flexbox from 'flexbox-react';
import FlatButton from 'material-ui/FlatButton';
import ReactImageFallback from "react-image-fallback";

import { showRank } from "../actions/playerActions"
import './Card.css';
import ButtonDrop from './ButtonDrop';
import espn from '../../espn2.png'
import pros from '../../fantasypros.png'
import silhouette from '../../HeadshotSilhouette.png'

@connect((store) => {

	//console.log(this.props.id);

  return {
    players: store.players.players,
  };
})
export default class PlayerCard extends React.Component {

	constructor() {
		super();
	}

	seeTotalRank() {
		this.props.dispatch(showRank("totalranks"))
	}
	seeEspnRank() {
		this.props.dispatch(showRank("espn"))
	}
	seeProsRank() {
		this.props.dispatch(showRank("pros"))
	}

  render() {
	  
	const { id, firstname, lastname, position, num, teamid, overallrank, positionrank } = this.props;

	var hide = "block";

	if (id == 5526) {
		hide = "none";
	}
		
    return (
      <div className="Card" style={{display: hide}}>
        <Flexbox className="card-row header" flexDirection="row" justifyContent="space-between">
			<div>
				<div className="text">{firstname}</div>
				<div className="xxlarge text">{lastname}</div>
			</div>
			<div className="xlarge text">{position}</div>
        </Flexbox>
		<Flexbox className="card-row" flexDirection="row" justifyContent="space-between">
			<ReactImageFallback className="player-img" src={"http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/" + id + ".png&amp;w=345&amp;h=230;"} fallbackImage={silhouette}/>
			<Flexbox className="number-team" flexDirection="column" justifyContent="center">
				<div className="center  xlarge text">{teamid}</div>
				<div className="center text">{num}</div>
			</Flexbox>
        </Flexbox>
		<div className="card-row">
			<div className="rankings-title">
				<Flexbox flexDirection="row" justifyContent="space-between">
					<FlatButton style={{minWidth:"40px"}} onClick={this.seeTotalRank.bind(this)} className="text" /*onClick={() => this.setState({ sortKey: 'TOTAL' })}*/ >Total</FlatButton>
					<FlatButton style={{minWidth:"45px"}} onClick={this.seeEspnRank.bind(this)} ><img style={{width:"80%"}} src={espn}/></FlatButton>
					<FlatButton style={{minWidth:"85px"}} onClick={this.seeProsRank.bind(this)} ><img src={pros}/></FlatButton>
				</Flexbox>
				<Flexbox flexDirection="row" justifyContent="space-around">
					<div>
						<div className="center text">Overall</div>
						<Flexbox flexDirection="row" justifyContent="space-around">
							<div className="center xlarge text">{overallrank}</div>
							<Flexbox style={{color: "red"}} className="center text">&#8595; 4</Flexbox>
						</Flexbox>
					</div>
					<div>
						<div className="center text">Positional</div>
						<Flexbox flexDirection="row" justifyContent="space-around">
							<div className="center xlarge text">{positionrank}</div>
							<Flexbox style={{color: "green"}} className="center text">&#8593; 2</Flexbox>
						</Flexbox>
					</div>
				</Flexbox>
			</div>
        </div>
		<Flexbox className="card-row">
			<ButtonDrop text="stats"/>
			<ButtonDrop text="bio" age='31'/>
        </Flexbox>
    </div>
    );
  }
}

/*
name
number
position
picture
team picture
espn rank
bio button (opens bio - height, weight, age, college, etc...)
stats button (opens stats)
*/