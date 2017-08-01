import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton,TextField,Toggle,AppBar} from 'material-ui';
import Flexbox from 'flexbox-react';
import { StickyContainer, Sticky } from 'react-sticky';

import PageSwitch from '../components/PageSwitch';
import Card from "../components/Card";
import * as PlayerActions from "../actions/PlayerActions";
import PlayerStore from "../stores/PlayerStore";

export default class Players extends React.Component {
  constructor() {
    super();
    this.getPlayers = this.getPlayers.bind(this);
    this.state = {
      all: PlayerStore.getAll(),
      players: PlayerStore.getAll()
    };
  }

  componentWillMount() {
    PlayerStore.on("change", this.getPlayers);
    PlayerStore.on("hide", this.getPlayers);
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

    mod.id = 11394;
    mod.property = 'totalranks';
    mod.change = {
			overallrank: 1,
			positionrank: 2
		};

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
	
	getRanks() {
		const { players } = this.state;
		PlayerActions.getRanks(players);
	}

  handleFilter(e) {
    const filter = e.target.value;
    PlayerActions.filterPlayers(filter); 
  }

  toggleSortBy(e, isInputChecked) {
    if(isInputChecked) {
      PlayerActions.sortBy("lastname");
    }
    else {
      PlayerActions.sortBy("overallrank");
    }
  }

  render() {
    const { players } = this.state;
		
    const PlayerComponents = players.map((card) => {
        return <Card key={card.id} {...card}/>;
    });

    return (
			<MuiThemeProvider>
        <div>
          <AppBar showMenuIconButton={false} titleStyle={{boxFlex:0, flex:0}} style={{ position: "fixed", backgroundColor: "white" }}>
            <div style={{margin: "0 auto"}}><PageSwitch/></div>
          </AppBar>
          <div style={{ paddingTop: 64 }}>
  					<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">
              <div><Toggle label="By Rank" onToggle={this.toggleSortBy.bind(this)}/></div>
              <div> By Name</div>
  						<FlatButton onClick={this.showTotalAll.bind(this)}>Total</FlatButton>
  						<FlatButton onClick={this.showEspnAll.bind(this)}>ESPN</FlatButton>
  						<FlatButton onClick={this.showProsAll.bind(this)}>PROS</FlatButton> 
  						<FlatButton onClick={this.getRanks.bind(this)}>Get Ranks</FlatButton>
              <TextField hintText="Filter Players" onChange={this.handleFilter.bind(this)} />
  					</Flexbox>
  					<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">{PlayerComponents}</Flexbox>
          </div>
        </div>
			</MuiThemeProvider>
    );
  }
}