import React from "react";
import Flexbox from 'flexbox-react';
import FlatButton from 'material-ui/FlatButton';
import ReactImageFallback from "react-image-fallback";
import './Card.css';

import ButtonDrop from './ButtonDrop';
import RankingsSwitch from './RankingsSwitch';
import StatsBlock from './StatLines/Comparisons/StatsBlock';
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
    	PlayerActions.comparePlayer(player);
    }
    else {
    	PlayerActions.removePlayer(player);
    }
  }

	shouldComponentUpdate(nextProps, nextState) {
    if (this.props.comparing !== nextProps.comparing) {
      return true;
    }
    if (this.props.selectedRanking !== nextProps.selectedRanking) {
      return true;
    }
    return false;
  }
	
  render() {
	  
		const { id,firstname,lastname,position,num,teamid,overallrank,positionrank,rookie,hide,selectedRanking,comparing,stats } = this.props;	
		var lastnameClass = lastname.length > 8 ? "xlarge text" : "xxlarge text";

		var compare = comparing ? 'Remove' : 'Compare';

		if (hide) {
			return null;
		}

		else {
	    return (
	    	<div>
	    		<Flexbox>
			      <div className="Comparecard">
			        <Flexbox className="card-row header" flexDirection="row" justifyContent="space-between">
								<ReactImageFallback className="player-img" src={"../../images/" + id + ".jpg"} fallbackImage={silhouette}/>
								<div>
									<div className="text">{firstname}</div>
									<div style={{height:"45px"}} className={lastnameClass}>{lastname.toUpperCase()}</div>
								</div>
								<Flexbox className="number-team" flexDirection="column" justifyContent="flex-end">
									<div className="end xxlarge text">{position.toUpperCase()}</div>							
									<div className="end large text">{teamid.toUpperCase()}</div>
								</Flexbox>
								<Flexbox style={{minWidth:"100px"}} flexDirection="row" justifyContent="flex-end">
									<FlatButton style={{minWidth:"80px"}} onClick={this.compare.bind(this)} label={compare} labelStyle={{paddingLeft:0,paddingRight:0}} className="text" />
								</Flexbox>
			        </Flexbox>

							<Flexbox className="card-row" flexDirection="row" justifyContent="space-around">
								<RankingsSwitch id={id} selectedRanking={selectedRanking}/>
								<Flexbox flexDirection="column">
									<div className="center text">Overall</div>
									<Flexbox flexDirection="row" justifyContent="space-around">
										<div className="center xlarge text">{overallrank>500 ? "N/A" : overallrank}</div>
									</Flexbox>
								</Flexbox>
								<Flexbox flexDirection="column">
									<div className="center text">Positional</div>
									<Flexbox flexDirection="row" justifyContent="space-around">
										<div className="center xlarge text">{positionrank>500 ? "N/A" : positionrank}</div>
									</Flexbox>
								</Flexbox>
			        </Flexbox>
			    	</div>
			    	<div className="PassingStatsblock">
		    			<StatsBlock stats={stats}/>
		    		</div>
		    	</Flexbox>
	    	</div>
  		);
    }
  }
}