import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import _ from 'lodash';

class ComparisonStore extends EventEmitter {
  constructor() {
    super()
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
      case "REACHED_BOTTOM": {
				this.addPlayersToView();
				break;
			}
    }
  }
}

const comparisonStore = new ComparisonStore;
dispatcher.register(comparisonStore.handleActions.bind(comparisonStore));

export default comparisonStore;