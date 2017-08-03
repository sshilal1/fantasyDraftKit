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
				last = parts.shift();
		
			var newPlayer = {
				name : player.name.toLowerCase(),
				firstname : first,
				lastname : last,
				id : player.id,
				position: player.position.toLowerCase(),
				num: player.num,
				teamid: player.teamid.toLowerCase(),
				overallrank: 39,
				positionrank: 22,
				rookie: (player.experience == 'R' ? true : false),
				stats: {
					rushingstats: [],
    			receivingstats: [],
    			passingstats: [],
    			fetched: false
				},
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
				},
				hide: false,
			};
			
			initialPlayers.push(newPlayer);
		}
		
		this.all = initialPlayers;
		this.players = initialPlayers;
  }

  getAll() {
    return this.players;
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

	filterPlayersPos(filter) {

    const all = this.all;

    if (filter == "all") {
    	this.players = all;
    }

    else {
    	var players = [];

	    all.forEach(function(obj) {
				if (_.includes(obj, filter)) {
				   players.push(obj);
				}
			});

			this.players = players; 
    }

    this.emit("hide");
  }

  filterPlayers(filter) {
    
    const players = this.players;

    // Not actually removing (unmounting) players, just setting state to hide
    this.players.forEach(function(obj) {

    	const str = JSON.stringify(obj);

			if (str.includes(filter)) {
			    obj.hide = false;
			}
			else {
				obj.hide = true;
			}

		});

    this.emit("hide");
  }
	
	updateRanks(rankings) {
		const players = this.players;
		
		for (var player in players) {
			//console.log(players[player].name);
			for (var newRank in rankings) {
				//console.log(rankings[newRank]);
				if (players[player].name == rankings[newRank].name) {
					console.log("updating espn rank for " + players[player].name + " from " + players[player].espn.overallrank + " to " + rankings[newRank].rank);
					this.players[player].espn.overallrank = rankings[newRank].rank;
				}
			}
		}
		this.emit("change");
	}

	updateStats(stats) {

		const players = this.players;
		const id = stats.id;
    var index = _.findIndex(players, function(o) { return o.id == id; });

    this.players[index].stats.rushingstats = stats.rushingstats;
    this.players[index].stats.receivingstats = stats.receivingstats;
    this.players[index].stats.passingstats = stats.passingstats;
    this.players[index].stats.fetched = true;

		this.emit("stats");
	}

	getStats(id) {
		const players = this.players;
    var index = _.findIndex(players, function(o) { return o.id == id; });

    return this.players[index].stats;
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
      case "FILTER_PLAYERS": {
        this.filterPlayers(action.filter);
        break;
      }
      case "FILTER_PLAYERS_POS": {
        this.filterPlayersPos(action.filter);
        break;
      }
			case "UPDATE_RANKS": {
				this.updateRanks(action.rankings);
				break;
			}
			case "RECEIVE_STATS": {
				this.updateStats(action.stats);
				break;
			}
    }
  }
}

const playerStore = new PlayerStore;
dispatcher.register(playerStore.handleActions.bind(playerStore));

export default playerStore;