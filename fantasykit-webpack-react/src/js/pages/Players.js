import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
  /*
  componentWillUnmount() {
    PlayerStore.removeListener("change", this.getPlayers);
  }
*/
  getPlayers() {
    this.setState({
      players: PlayerStore.getAll(),
    });
  }

  createPlayer() {
    PlayerActions.createPlayer();
  }

  reloadPlayers() {
    PlayerActions.reloadPlayers();
  }

  render() {
    const { players } = this.state;

    const PlayerComponents = players.map((card) => {
        return <Card key={card.id} {...card}/>;
    });

    return (
      <div>
        <button onClick={this.createPlayer.bind(this)}>Reload!</button> 
        <MuiThemeProvider>
          <div>
            {PlayerComponents}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}