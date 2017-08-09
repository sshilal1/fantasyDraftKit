import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

//import playerData from './nyg-team.json';
import playerData from '../../allplayers.json';
import _ from 'lodash';

class PlayerStore extends EventEmitter {
  constructor() {
    super()

		var initialPlayers = [];
		
		for (var player of playerData.players) {
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
				overallrank: Math.floor(Math.random() * (997)) + 1,
				positionrank: 999,
				selectedRanking: "totalranks",
				rookie: (player.experience == 'R' ? true : false),
				age: player.age,
				height: player.height,
				weight: player.weight,
				experience: player.experience,
				college: player.college,
				stats: {
					rushingstats: [],
    			receivingstats: [],
    			passingstats: [],
    			fetched: false
				},
        totalranks: {
					overallrank: 999,
					positionrank: 999
				},
				espn: {
					overallrank: 997,
					positionrank: 997
				},
				pros: {
					overallrank: 998,
					positionrank: 998
				},
				hide: false,
			};
			
			for (var person of initialPlayers) {
				if (newPlayer.name == person.name) {
					console.log("Found a duplicate: " + newPlayer.name);
				}
			}
			initialPlayers.push(newPlayer);
		}
		
		this.filter = "all";
		this.playersshown = 20;
		this.all = initialPlayers;
		this.sortPlayers("overallrank");
		this.filterPlayersPos(this.filter);
  }

  getAll() {
    return this.players;
  }

  addPlayersToView() {
  	if (this.playersshown < 100) {
  		this.playersshown += 6;
  		this.filterPlayersPos(this.filter);
  	}
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
		this.players[index].selectedRanking = rankings;

		this.emit("change");
  }
	
	showRanks(rankings) {
		const all = this.all;
		
		for (var player in all) {
			this.all[player].overallrank = this.all[player][rankings].overallrank;
			this.all[player].positionrank = this.all[player][rankings].positionrank;
			this.all[player].selectedRanking = rankings;
		}
		this.sortPlayers("overallrank");
		this.filterPlayersPos(this.filter);
		this.emit("change");
	}
	
	sortPlayers(sort) {
		this.all.sort(function(a,b) {
			if (a[sort]< b[sort])
				return -1;
			if (a[sort] > b[sort])
				return 1;
			return 0;
		})
		this.filterPlayersPos(this.filter);
		this.emit("change");
	}

	filterPlayersPos(filter) {

    const all = this.all;
    const playersshown = this.playersshown;

    this.filter = filter;
    this.players = [];

    if (filter == "all") {
    	for(var i=0;i<playersshown;i++) {
    		this.players.push(all[i]);
    	}
    }

    else {
    	var players = [];

	    all.forEach(function(obj,index) {
				if (_.includes(obj, filter)) {
					if (players.length > playersshown) {
						return;
					}
				  players.push(obj);
				}
			});

			this.players = players; 
    }

    this.emit("change");
  }

  // this needs work
  filterPlayers(filter) {

  	const all = this.all;
  	const playersshown = this.playersshown;

  	var players = [];

    all.forEach(function(obj,index) {
			if (JSON.stringify(obj).includes(filter)) {
				if (players.length > playersshown) {
					return;
				}
			  players.push(obj);
			}
		});
		this.players = players;

  	/*
    // Not actually removing (unmounting) players, just setting state to hide
    this.all.forEach(function(obj) {
    	const str = JSON.stringify(obj);
			if (str.includes(filter)) {
				obj.hide = false;
			}
			else {
				obj.hide = true;
			}

		});
		*/

    //this.filterPlayersPos("all");
    this.emit("hide");
  }
	
	updateRanks(rankings,db) {
		const all = this.all;
		
		switch(db) {
			case "espn": {
				for (var player in all) {
					for (var newRank in rankings) {
						if (all[player].name == rankings[newRank].name.toLowerCase()) {
							console.log("Updating espn rank for " + all[player].name + " from " + all[player].espn.overallrank + " to " + rankings[newRank].rank);
							this.all[player].espn.overallrank = rankings[newRank].rank;
						}
					}
				}
				break;
			}
			case "yahoo": {
				for (var player in all) {
					for (var newRank in rankings) {
						if (all[player].name == rankings[newRank].name.toLowerCase()) {
							console.log("Updating yahoo rank for " + all[player].name + " from " + all[player].totalranks.overallrank + " to " + rankings[newRank].rank);
							this.all[player].totalranks.overallrank = rankings[newRank].rank;
							this.all[player].totalranks.positionrank = rankings[newRank].posrank;
						}
					}
				}
				break;
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
      case "REACHED_BOTTOM": {
				this.addPlayersToView();
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
				this.updateRanks(action.rankings,"espn");
				break;
			}
			case "UPDATE_YAHOO_RANKS": {
				this.updateRanks(action.rankings,"yahoo");
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