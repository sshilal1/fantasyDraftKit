import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import _ from 'lodash';

class ComparisonStore extends EventEmitter {
  constructor() {
    super();
    this.players = [];
  }

  getAll() {
    return this.players;
  }

  addPlayer(player) {
  	console.log("player");
  	this.players.push(player);
  }

  removePlayer(player) {
  	const players = this.players;
  	this.players = _.reject(players, function(o) { o.id == player.id; });
  }

  handleActions(action) {
    switch(action.type) {
      case "C_ADD_PLAYER": {
        this.addPlayer(action.player);
        break;
      }
      case "C_REMOVE_PLAYER": {
				this.removePlayer(action.player);
				break;
			}
			case "C_CLEAR_ALL": {
				this.clearPlayers();
				break;
			}
    }
  }
}

const comparisonStore = new ComparisonStore;
dispatcher.register(comparisonStore.handleActions.bind(comparisonStore));

export default comparisonStore;