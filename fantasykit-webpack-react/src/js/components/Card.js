import React from "react";
import Flexbox from 'flexbox-react';
import FlatButton from 'material-ui/FlatButton';
import './Card.css';

import espn from '../../espn2.png'
import pros from '../../fantasypros.png'

export default class PlayerCard extends React.Component {
  render() {
	  
	const { firstname, lastname, position, num, teamid, overallrank, positionrank } = this.props;
	  
    return (
      <div className="Card">
        <Flexbox className="card-row header" flexDirection="row" justifyContent="space-between">
			<div>
				<div className="text">{firstname}</div>
				<div className="xxlarge text">{lastname}</div>
			</div>
			<div className="xlarge text">{position}</div>
        </Flexbox>
		<Flexbox className="card-row" flexDirection="row" justifyContent="space-between">
			<img className="player-img" src={"http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/5526.png&amp;w=345&amp;h=230;"}/>
			<Flexbox className="number-team" flexDirection="column" justifyContent="center">
				<div className="center  xlarge text">{teamid}</div>
				<div className="center text">{num}</div>
			</Flexbox>
        </Flexbox>
		<div className="card-row">
			<div className="rankings-title">
				<Flexbox flexDirection="row" justifyContent="space-between">
					<FlatButton style={{minWidth:"40px"}} className="text" /*onClick={() => this.setState({ sortKey: 'TOTAL' })}*/ >Total</FlatButton>
					<FlatButton style={{minWidth:"45px"}}><img style={{width:"80%"}} src={espn}/></FlatButton>
					<FlatButton style={{minWidth:"85px"}}><img src={pros}/></FlatButton>
				</Flexbox>
				<Flexbox flexDirection="row" justifyContent="space-around">
					<div>
						<div className="center text">Overall</div>
						<div className="center xlarge text">{overallrank}</div>
					</div>
					<div>
						<div className="center text">Positional</div>
						<div className="center xlarge text">{positionrank}</div>
					</div>
				</Flexbox>
			</div>
        </div>
		<div className="card-row">
			<FlatButton className="text large" label="Stats"/>
			<FlatButton className="text large" label="Bio"/>
        </div>
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