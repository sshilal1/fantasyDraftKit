import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton} from 'material-ui';
import Flexbox from 'flexbox-react';

import Card from "../components/Card";
import * as PlayerActions from "../actions/PlayerActions";
import PlayerStore from "../stores/PlayerStore";

export default class Players extends React.Component {
  constructor() {
    super();
    this.getPlayers = this.getPlayers.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      all: PlayerStore.getAll(),
      players: PlayerStore.getAll()
    };
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= (docHeight-5)) { // bc of rounding
      PlayerActions.reachedBottom();
    }
  }

  getPlayers() {
    this.setState({
      players: PlayerStore.getAll(),
    });
  }

  componentWillMount() {
    PlayerStore.on("change", this.getPlayers);
    // Search bar clears on every "change" event, but not "hide"
    PlayerStore.on("hide", this.getPlayers);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    PlayerStore.removeListener("change", this.getPlayers);
    PlayerStore.removeListener("hide", this.getPlayers);
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
	
	getRanks() {
		const { players } = this.state;
		PlayerActions.getRanks(players);
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
        <div style={{overflow: "overlay"}} >
          <div style={{ paddingTop: 72 }}>
  					<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center"> 						
  						<FlatButton onClick={this.getRanks.bind(this)}>Get Ranks</FlatButton>
  					</Flexbox>
  					<Flexbox style={{overflow: "overlay"}} flexDirection="row" flexWrap="wrap" justifyContent="center">{PlayerComponents}</Flexbox>
          </div>
        </div>
			</MuiThemeProvider>
    );
  }
}