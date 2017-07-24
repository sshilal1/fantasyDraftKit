import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

import _ from 'lodash';

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
      },
      {
        id: 55268,
        firstname: "John",
        lastname: "FRANCO",
        position: "QB",
        teamid: "NYG",
        num: 10,
				overallrank: 29,
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
      },
    ];
  }

  createPlayer(player) {
    this.players.push(player);
    this.emit("change");
  }

  modPlayer(mod) {

    const players = this.players;

    var index = _.findIndex(players, function(o) { return o.id == mod.id; });

    this.players[index][mod.property] = mod.change;
    //this.emit("change");
  }
  
  showRank(rankings,id) {

    const players = this.players;
    var index = _.findIndex(players, function(o) { return o.id == id; });

    this.players[index]["overallrank"] = this.players[index][rankings].overallrank;
		this.players[index]["positionrank"] = this.players[index][rankings].positionrank;

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
        this.emit("change");
        break;
      }
	  case "SEE_RANK": {
        this.showRank(action.rankings, action.id);
        this.emit("change");
        break;
      }
    }
  }
}

const playerStore = new PlayerStore;
dispatcher.register(playerStore.handleActions.bind(playerStore));

export default playerStore;