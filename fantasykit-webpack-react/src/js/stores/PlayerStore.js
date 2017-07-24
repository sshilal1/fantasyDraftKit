import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PlayerStore extends EventEmitter {
  constructor() {
    super()
    this.players = [{
        id: 5526,
        firstname: "Eli",
        lastname: "MANNING",
        position: "QB",
        teamid: "NYG",
        num: 10,
        overallrank: 29,
        positionrank: 7
      },
      {
        id: 55268,
        firstname: "John",
        lastname: "FRANCO",
        position: "QB",
        teamid: "NYG",
        num: 10,
        overallrank: 29,
        positionrank: 7
      },
    ];
  }

  createPlayer(player) {
    this.players.push(player);

    this.emit("change");
  }

  getAll() {
    return this.players;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_PLAYER": {
        this.createPlayer(action.player);
        break;
      }
      case "RECEIVE_PLAYERS": {
        this.players = action.player;
        this.emit("change");
        break;
      }
    }
  }
}

const playerStore = new PlayerStore;
dispatcher.register(playerStore.handleActions.bind(playerStore));

export default playerStore;