import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

import _ from 'lodash';

class StatsStore extends EventEmitter {

  constructor() {
    super()
		
		this.playersStats = [];
  }

  getAll() {
    return this.players;
  }

  drawStats(stats) {

		this.playersStats.push(stats);
		this.emit("change");
		
	}

  handleActions(action) {
    switch(action.type) {
      case "RECEIVE_STATS": {
        this.drawStats(action.stats);
        break;
      }
    }
  }
}

const statsStore = new StatsStore;
dispatcher.register(statsStore.handleActions.bind(statsStore));

export default statsStore;