import dispatcher from "../dispatcher";

import axios from 'axios'

export function createPlayer() {
  dispatcher.dispatch({
    type: "CREATE_PLAYER",
    player: {
        id: 4732947,
        firstname: "Buck",
        lastname: "NELSON",
        position: "QB",
        teamid: "SF",
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
  });
}


export function modPlayer(mod) {

  dispatcher.dispatch({
    type: "MOD_PLAYER",
    modification: mod,
  });
}

export function seeRank(id,rankings) {
	dispatcher.dispatch({
		type: "SEE_RANK",
		rankings: rankings,
		id: id
  });
}

export function showRankAll(rankings) {
	dispatcher.dispatch({
		type: "SEE_RANK_ALL",
		rankings: rankings
	});
}

export function sortBy(sortKey) {
	dispatcher.dispatch({
		type: "SORT_PLAYERS",
		sort: sortKey
	});
}

export function filterPlayers(filter) {
  dispatcher.dispatch({
    type: "FILTER_PLAYERS",
    filter: filter
  });
}

export function filterPlayersPos(filter) {
  dispatcher.dispatch({
    type: "FILTER_PLAYERS_POS",
    filter: filter
  });
}

export function reachedBottom() {
  dispatcher.dispatch({
    type: "REACHED_BOTTOM"
  });
}

export function getRanks() {

  axios.post('/ranks', {
		data: "test"
	})
	.then(function (response) {
		console.log(response);
		
		dispatcher.dispatch({
			type: "UPDATE_RANKS",
			rankings: response.data
		});
		
	})
	.catch(function (error) {
		console.log(error);
	});
}

export function fetchStats(id) {

  axios.post('/stats', {
    id: id
  })
  .then(function (response) {
    console.log(response);
    
    dispatcher.dispatch({
      type: "RECEIVE_STATS",
      stats: response.data
    });
    
  })
  .catch(function (error) {
    console.log(error);
  });
}