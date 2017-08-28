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

  showRank(rankings,id) {

    const players = this.players;
    var index = _.findIndex(players, function(o) { return o.id == id; });

    this.players[index].overallrank = this.players[index][rankings].overallrank;
    this.players[index].positionrank = this.players[index][rankings].positionrank;
    this.players[index].selectedRanking = rankings;

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
      case "C_CHANGE_YEAR": {
        this.emit("yearchange", action.year);
        break;
      }
      case "SEE_RANK": {
        this.showRank(action.rankings, action.id);
        break;
      }
    }
  }
}

const comparisonStore = new ComparisonStore;
dispatcher.register(comparisonStore.handleActions.bind(comparisonStore));

export default comparisonStore;