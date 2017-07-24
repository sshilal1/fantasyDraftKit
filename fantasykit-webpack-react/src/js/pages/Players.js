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
      players: PlayerStore.getAll(),
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

  render() {
    const { players } = this.state;

    const PlayerComponents = players.map((card) => {
        return <Card key={card.id} {...card}/>;
    });

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">
              <FlatButton onClick={() => this.setState({ sortKey: 'BY_NAME' })}>By Name</FlatButton>
              <FlatButton onClick={() => this.setState({ sortKey: 'BY_ID' })} >By Id</FlatButton>
              <FlatButton onClick={this.createPlayer.bind(this)}>Add Player!</FlatButton>
              <FlatButton onClick={this.modPlayer.bind(this)}>Modify Player</FlatButton> 
            </Flexbox>
            <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">{PlayerComponents}</Flexbox>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}