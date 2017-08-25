import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

import * as PlayerActions from "../actions/PlayerActions";
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
				overallrank: 999,
				positionrank: 999,
				selectedRanking: "yahoo",
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
        yahoo: {
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
				comparing: false,
				depth: []
			};
			
			for (var person of initialPlayers) {
				if (newPlayer.name == person.name) {
					console.log("Found a duplicate: " + newPlayer.name);
				}
			}
			initialPlayers.push(newPlayer);
		}
		
		this.filter = "all";
		this.playersshown = 30;
		this.all = initialPlayers;
		this.populatePlayers();

		PlayerActions.getRanks("pros");
    PlayerActions.getRanks("espn");
    PlayerActions.getRanks("yahoo");
  }

  getAll() {
    return this.players;
  }

  populatePlayers() {
  	const all = this.all;
  	const playersshown = this.playersshown;
  	this.players = [];
  	
  	for(var i=0;i<playersshown;i++) {
  		this.players.push(all[i]);
  	}
  }

  addPlayersToView() {
  	if (this.playersshown < 200) {
  		this.playersshown += 6;

	  	this.filterPlayers(this.filter);
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

		this.emit("hide");
  }
	
	showRanks(rankings) {
		const all = this.all;
		const players = this.players;

		for (var player in players) {
			this.players[player].overallrank = this.players[player][rankings].overallrank;
			this.players[player].positionrank = this.players[player][rankings].positionrank;
			this.players[player].selectedRanking = rankings;
		}
		this.sortPlayers("overallrank");
		this.emit("hide");

		for (var player in all) {
			this.all[player].overallrank = this.all[player][rankings].overallrank;
			this.all[player].positionrank = this.all[player][rankings].positionrank;
			this.all[player].selectedRanking = rankings;
		}
		this.sortAll("overallrank");
	}
	
	sortAll(sort) {

		this.all.sort(function(a,b) {
			if (a[sort]< b[sort])
				return -1;
			if (a[sort] > b[sort])
				return 1;
			return 0;
		})
	}

	sortPlayers(sort) {

		this.players.sort(function(a,b) {
			if (a[sort]< b[sort])
				return -1;
			if (a[sort] > b[sort])
				return 1;
			return 0;
		})

		this.emit("hide");
	}

	filterPlayersPos(filter) {

		this.playersshown = 30;
    const all = this.all;
    const playersshown = this.playersshown;
    console.log("filtering all players by", filter);

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
  	
  	this.filter = filter;
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
    this.emit("hide");
  }
	
	updateRanks(rankings,db) {
		const all = this.all;
		for (var player in all) {
			for (var newRank in rankings) {
				if (all[player].name == rankings[newRank].name.toLowerCase()) {
					console.log("Updating " + db + " rank for " + all[player].name + " from " + all[player][db].overallrank + " to " + rankings[newRank].rank);
					this.all[player][db].overallrank = rankings[newRank].rank;
					this.all[player][db].positionrank = rankings[newRank].posrank;
				}
			}
		}
		this.filterPlayersPos("all");
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

	updateDepth(depth,id) {
		const players = this.players;
    var index = _.findIndex(players, function(o) { return o.id == id; });

    this.players[index].depth = depth;

		this.emit("depth");
	}

	getStats(id) {
		const players = this.players;
    var index = _.findIndex(players, function(o) { return o.id == id; });

    return this.players[index].stats;
	}

	getDepth(id) {
		const players = this.players;
    var index = _.findIndex(players, function(o) { return o.id == id; });

    return this.players[index].depth;
	}

	comparePlayer(player,comparing) {
		const all = this.all;
		const id = player.id;

    var index = _.findIndex(all, function(o) { return o.id == id; });

    this.all[index].comparing = comparing;
    console.log("comparing", player.name);
    this.emit("change");
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
				this.sortAll(action.sort);
				break;
			}
			case "SORT_DISPLAYED_PLAYERS": {
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
				this.updateRanks(action.rankings,action.rankingorg);
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
			case "RECEIVE_DEPTH": {
				this.updateDepth(action.depth, action.id);
				break;
			}
			case "C_ADD_PLAYER": {
				this.comparePlayer(action.player,true);
				break;
			}
			case "C_REMOVE_PLAYER": {
				this.comparePlayer(action.player,false);
				break;
			}
    }
  }
}

const playerStore = new PlayerStore;
dispatcher.register(playerStore.handleActions.bind(playerStore));

window.playerstore = playerStore;

export default playerStore;