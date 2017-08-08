import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton,TextField,Toggle,AppBar} from 'material-ui';
import Flexbox from 'flexbox-react';

import PageSwitch from '../components/PageSwitch';
import GlobalRankSwitch from '../components/GlobalRankSwitch'
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
    PlayerActions.getRanks();
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
    PlayerStore.on("hide", this.getPlayers);
    this.delayedCallback = _.debounce(function (event) {
      const filter = event.target.value;
      console.log(filter);
      PlayerActions.filterPlayers(filter);
    }, 500);
  }

  handleFilter(event) {
    event.persist();
    this.delayedCallback(event);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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
        <div>
          <AppBar showMenuIconButton={false} titleStyle={{boxFlex:0, flex:0}} style={{ position: "fixed", backgroundColor: "white" }}>
            <Flexbox flexDirection="column" flexWrap="wrap" justifyContent="center" style={{margin: "0 auto"}}>
              <div><PageSwitch/></div>
              <Flexbox flexDirection="row" justifyContent="space-between">
                <GlobalRankSwitch/>
                <Flexbox flexDirection="row" style={{width:"130px",height:"28px",paddingTop:"8px"}}>
                  <div>Rank</div>
                  <Toggle style={{width:"50px"}} onToggle={this.toggleSortBy.bind(this)}/>
                  <div>Name</div>
                </Flexbox>
                <TextField style={{width:"130px",height:"36px"}} hintText="Filter Players" onChange={this.handleFilter.bind(this)} />
              </Flexbox>
            </Flexbox>
          </AppBar>
          <div style={{ paddingTop: 72 }}>
  					<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center"> 						
  						<FlatButton onClick={this.getRanks.bind(this)}>Get Ranks</FlatButton>
  					</Flexbox>
  					<Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">{PlayerComponents}</Flexbox>
          </div>
        </div>
			</MuiThemeProvider>
    );
  }
}