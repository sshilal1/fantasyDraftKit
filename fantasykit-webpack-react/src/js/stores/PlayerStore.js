import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

import nygData from './nyg-team.json';
import _ from 'lodash';

class PlayerStore extends EventEmitter {
  constructor() {
    super()

		var initialPlayers = [];
		
		for (var player of nygData.players) {
			var parts = player.name.split(" "),
				first = parts.shift(),
				last = parts.shift().toUpperCase() || "";
		
			var newPlayer = {
				firstname : first,
				lastname : last,
				id : player.id,
				position: player.position,
				num: player.num,
				teamid: player.teamid.toUpperCase(),
				overallrank: 27,
				positionrank: 7,
        totalranks: {
					overallrank: 29,
					positionrank: 7
				},
				espn: {
					overallrank: 32,
					positionrank: 5
				},
				pros: {
					overallrank: 34,
					positionrank: 6
				}
			};
			
			initialPlayers.push(newPlayer);
		}
		
		this.players = initialPlayers;
  }

  createPlayer(player) {
    this.players.push(player);
    this.emit("change");
  }

  modPlayer(mod) {

    const players = this.players;

    var index = _.findIndex(players, function(o) { return o.id == mod.id; });

    this.players[index][mod.property] = mod.change;
    this.emit("change");
  }
  
  showRank(rankings,id) {

    const players = this.players;
    var index = _.findIndex(players, function(o) { return o.id == id; });

    this.players[index].overallrank = this.players[index][rankings].overallrank;
		this.players[index].positionrank = this.players[index][rankings].positionrank;
		this.emit("change");
  }
	
	showRanks(rankings) {
		const players = this.players;
		
		for (var player in players) {
			this.players[player].overallrank = this.players[player][rankings].overallrank;
			this.players[player].positionrank = this.players[player][rankings].positionrank;
		}
		this.emit("change");
	}
	
	sortPlayers(sort) {
		this.players.sort(function(a,b) {
			if (a[sort]< b[sort])
				return -1;
			if (a[sort] > b[sort])
				return 1;
			return 0;
		})
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
      case "MOD_PLAYER": {
        this.modPlayer(action.modification);
        //this.emit("change");
        break;
      }
			case "SEE_RANK": {
        this.showRank(action.rankings, action.id);
        break;
      }
			case "SEE_RANK_ALL": {
				this.showRanks(action.rankings);
				break;
			}
			case "SORT_PLAYERS": {
				this.sortPlayers(action.sort);
				break;
			}
    }
  }
}

const playerStore = new PlayerStore;
dispatcher.register(playerStore.handleActions.bind(playerStore));

export default playerStore;