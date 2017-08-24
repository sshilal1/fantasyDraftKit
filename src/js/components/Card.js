import React from "react";
import Flexbox from 'flexbox-react';
import FlatButton from 'material-ui/FlatButton';
import ReactImageFallback from "react-image-fallback";
import './Card.css';

import ButtonDrop from './ButtonDrop';
import RankingsSwitch from './RankingsSwitch';
import * as PlayerActions from "../actions/PlayerActions";

import espn from '../../images/espn.png'
import pros from '../../images/fantasypros.png'
import silhouette from '../../images/HeadshotSilhouette.png'

export default class PlayerCard extends React.Component {
	
	constructor() {
		super();
	}

	compare() {
    const player = this.props;
    if (!player.comparing) {
    	if (!player.stats.fetched) {
    		console.log("no stats fetched yet, doing so now...");
    		PlayerActions.fetchStats(player.id,player.teamid);
    	}
    	PlayerActions.comparePlayer(player);
    }
    else {
    	PlayerActions.removePlayer(player);
    }
  }

	shouldComponentUpdate(nextProps, nextState) {
    if (this.props.overallrank !== nextProps.overallrank) {
      return true;
    }
    if (this.props.positionrank !== nextProps.positionrank) {
      return true;
    }
    if (this.props.selectedRanking !== nextProps.selectedRanking) {
      return true;
    }
    if (this.props.comparing !== nextProps.comparing) {
      return true;
    }
    if (this.props.stats !== nextProps.stats) {
      return true;
    }
    return false;
  }
	
  render() {
	  
		const { id,firstname,lastname,position,num,teamid,overallrank,positionrank,rookie,selectedRanking,comparing } = this.props;	
		var lastnameClass = lastname.length > 8 ? "xlarge text" : "xxlarge text";

		var compare = comparing ? 'Remove' : 'Compare';
		var compareBg = comparing ? 'rgba(153,153,153,.2)' : 'rgba(0,0,0,0)';

	  return (
      <div className="Card">
        <Flexbox className="card-row header" flexDirection="row" justifyContent="space-between">
					<div>
						<div className="text">{firstname}</div>
						<div style={{height:"45px"}} className={lastnameClass}>{lastname.toUpperCase()}</div>
					</div>
					<div className="xlarge text">{position.toUpperCase()}</div>
        </Flexbox>
				<Flexbox className="card-row" flexDirection="row" justifyContent="space-between">
					<ReactImageFallback className="player-img" src={"../../images/" + id + ".jpg"} fallbackImage={silhouette}/>
					<Flexbox className="number-team" flexDirection="column" justifyContent="center">
						<div className="center xlarge text">{teamid.toUpperCase()}</div>
						<div className="center text"># {num}</div>
					</Flexbox>
        </Flexbox>
				<div className="card-row">
					<div className="rankings-title">
						<RankingsSwitch id={id} selectedRanking={selectedRanking}/>
						<Flexbox flexDirection="row" justifyContent="space-around">
							<div>
								<div className="center text">Overall</div>
								<Flexbox flexDirection="row" justifyContent="space-around">
									<div className="center xlarge text">{overallrank>500 ? "N/A" : overallrank}</div>
									{/*<Flexbox style={{color: "red"}} className="center text">&#8595;4</Flexbox>*/}
								</Flexbox>
							</div>
							<div>
								<div className="center text">Positional</div>
								<Flexbox flexDirection="row" justifyContent="space-around">
									<div className="center xlarge text">{positionrank>500 ? "N/A" : positionrank}</div>
									{/*<Flexbox style={{color: "green"}} className="center text">&#8593;2</Flexbox>*/}
								</Flexbox>
							</div>
						</Flexbox>
					</div>
        </div>
				<Flexbox className="card-row">
					<FlatButton backgroundColor={compareBg} style={{minWidth:"65px"}} onClick={this.compare.bind(this)} label={compare} labelStyle={{paddingLeft:0,paddingRight:0}} className="text" />
					<ButtonDrop text="stats" age="31" id={id} rookie={rookie} teamid={teamid} stattable={true}/>
					<ButtonDrop text="bio" stattable={false} {...this.props}/>
        </Flexbox>
    	</div>
		);
  }
}