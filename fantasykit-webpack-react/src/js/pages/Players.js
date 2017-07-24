import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Flexbox from 'flexbox-react';
import FlatButton from 'material-ui/FlatButton';

import Card from "../components/Card";
import * as PlayerActions from "../actions/PlayerActions";
import PlayerStore from "../stores/PlayerStore";

export default class Players extends React.Component {
  constructor() {
    super();
    this.getPlayers = this.getPlayers.bind(this);
    this.state = {
      players: PlayerStore.getAll()
    };
  }

  componentWillMount() {
    PlayerStore.on("change", this.getPlayers);
  }
  
  componentWillUnmount() {
    PlayerStore.removeListener("change", this.getPlayers);
  }

  getPlayers() {
    this.setState({
      players: PlayerStore.getAll(),
    });
  }

  createPlayer() {
    PlayerActions.createPlayer();
  }

  modPlayer() {
    var mod = {};

    mod.id = 5526;
    mod.property = 'overallrank';
    mod.change = 19;

    PlayerActions.modPlayer(mod);
  }
	
	showTotalAll() {
    PlayerActions.showRankAll("totalranks");
  }
	
	showEspnAll() {
    PlayerActions.showRankAll("espn");
  }
	
	showProsAll() {
    PlayerActions.showRankAll("pros");
  }
	
	sortById() {
		PlayerActions.sortBy("id");
	}
	
	sortByName() {
		PlayerActions.sortBy("lastname");
	}

  render() {
    const { players } = this.state;
		
    const PlayerComponents = players.map((card) => {
        return <Card key={card.id} {...card}/>;
    });

    return (
			<MuiThemeProvider>
				<div>
					<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">
						<FlatButton onClick={this.sortByName.bind(this)}>By Name</FlatButton>
						<FlatButton onClick={this.sortById.bind(this)} >By Id</FlatButton>
						<FlatButton onClick={this.createPlayer.bind(this)}>Add</FlatButton>
						<FlatButton onClick={this.modPlayer.bind(this)}>Mod</FlatButton>
						<FlatButton onClick={this.showTotalAll.bind(this)}>Total</FlatButton>
						<FlatButton onClick={this.showEspnAll.bind(this)}>ESPN</FlatButton>
						<FlatButton onClick={this.showProsAll.bind(this)}>PROS</FlatButton> 
					</Flexbox>
					<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">{PlayerComponents}</Flexbox>
				</div>
			</MuiThemeProvider>
    );
  }
}