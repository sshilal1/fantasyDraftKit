import React from "react";
import Flexbox from 'flexbox-react';
import FlatButton from 'material-ui/FlatButton';
import ReactImageFallback from "react-image-fallback";
import './Card.css';

import * as PlayerActions from "../actions/PlayerActions";
import ButtonDrop from './ButtonDrop';

import espn from '../../images/espn.png'
import pros from '../../images/fantasypros.png'
import silhouette from '../../images/HeadshotSilhouette.png'

export default class PlayerCard extends React.Component {
	
	constructor() {
		super();
	}
	
	seeTotalRank() {
		PlayerActions.seeRank(this.props.id,"totalranks");
	}
	seeEspnRank() {
		PlayerActions.seeRank(this.props.id,"espn");
	}
	seeProsRank() {
		PlayerActions.seeRank(this.props.id,"pros");
	}

	shouldComponentUpdate(nextProps, nextState) {
    if (this.props.hide !== nextProps.hide) {
      return true;
    }
    if (this.props.overallrank !== nextProps.overallrank) {
      return true;
    }
    if (this.props.positionrank !== nextProps.positionrank) {
      return true;
    }
    return false;
  }
	
  render() {
	  
		const { id, firstname, lastname, position, num, teamid, overallrank, positionrank, hide } = this.props;
		
		if (hide) {
			return null;
		}

		else {
	    return (
	      <div className="Card">
	        <Flexbox className="card-row header" flexDirection="row" justifyContent="space-between">
						<div>
							<div className="text">{firstname}</div>
							<div className="xxlarge text">{lastname.toUpperCase()}</div>
						</div>
						<div className="xlarge text">{position.toUpperCase()}</div>
	        </Flexbox>
					<Flexbox className="card-row" flexDirection="row" justifyContent="space-between">
						<ReactImageFallback className="player-img" src={"../../images/" + id + ".jpg"} fallbackImage={silhouette}/>
						<Flexbox className="number-team" flexDirection="column" justifyContent="center">
							<div className="center  xlarge text">{teamid.toUpperCase()}</div>
							<div className="center text"># {num}</div>
						</Flexbox>
	        </Flexbox>
					<div className="card-row">
						<div className="rankings-title">
							<Flexbox flexDirection="row" justifyContent="space-between">
								<FlatButton style={{minWidth:"40px"}} onClick={this.seeTotalRank.bind(this)} className="text">Total</FlatButton>
								<FlatButton style={{minWidth:"45px"}} onClick={this.seeEspnRank.bind(this)}><img style={{width:"80%"}} src={espn}/></FlatButton>
								<FlatButton style={{minWidth:"85px"}} onClick={this.seeProsRank.bind(this)}><img src={pros}/></FlatButton>
							</Flexbox>
							<Flexbox flexDirection="row" justifyContent="space-around">
								<div>
									<div className="center text">Overall</div>
									<Flexbox flexDirection="row" justifyContent="space-around">
										<div className="center xlarge text">{overallrank}</div>
										<Flexbox style={{color: "red"}} className="center text">&#8595;4</Flexbox>
									</Flexbox>
								</div>
								<div>
									<div className="center text">Positional</div>
									<Flexbox flexDirection="row" justifyContent="space-around">
										<div className="center xlarge text">{positionrank}</div>
										<Flexbox style={{color: "green"}} className="center text">&#8593;2</Flexbox>
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