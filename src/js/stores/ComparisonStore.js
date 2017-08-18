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
    var newPlayer = Object.assign({}, player);
    newPlayer.comparing = true;
  	this.players.push(newPlayer);
  	this.emit("compare");
  }

  removePlayer(player) {
  	const players = this.players;
  	const id = player.id;
  	this.players = _.reject(players, function(o) {
  		console.log("rejecting", o);
  		return o.id == id; 
  	});
  	this.emit("compare");
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
				//this.clearPlayers();
				break;
			}
    }
  }
}

const comparisonStore = new ComparisonStore;
dispatcher.register(comparisonStore.handleActions.bind(comparisonStore));

export default comparisonStore;