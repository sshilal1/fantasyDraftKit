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

export function sortDisplayed(sortKey) {
  dispatcher.dispatch({
    type: "SORT_DISPLAYED_PLAYERS",
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

export function getRanks(rankingorg) {

  axios.post('/ranks', {
		rankingorg: rankingorg
	})
	.then(function (response) {
		console.log(response);
		
		dispatcher.dispatch({
			type: "UPDATE_RANKS",
      rankingorg: rankingorg,
			rankings: response.data
		});

    dispatcher.dispatch({
      type: "SEE_RANK_ALL",
      rankings: rankingorg
    });
		
	})
	.catch(function (error) {
		console.log(error);
	});
}

export function fetchStats(id,teamid) {

  axios.post('/stats', {
    id: id,
    team: teamid
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

export function fetchDepth(id,position,teamid) {

  var pos = position == 'k' ? 'pk' : position;

  axios.post('/depth', {
    position: pos,
    teamid: teamid
  })
  .then(function (response) {
    console.log(response);
    
    dispatcher.dispatch({
      type: "RECEIVE_DEPTH",
      depth: response.data,
      id: id
    });
    
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function fetchMatchups() {

  var teams = ["buf","mia","ne","nyj","bal","cin","cle","pit","hou","ind","jax","ten","den","kc","oak","lac","dal","nyg","phi","wsh","chi","det","gb","min","atl","car","no","tb","ari","lar","sf","sea"];

  for (var team in teams) {
    const teamid = teams[team];
    axios.post('/matchups', {
      team: teamid
    })
    .then(function (response) {
      dispatcher.dispatch({
        type: "RECEIVE_MATCHUPS",
        team: teamid,
        matchups: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export function comparePlayer(player) {
  dispatcher.dispatch({
    type: "C_ADD_PLAYER",
    player: player
  });
}

export function compareAll(position) {
  dispatcher.dispatch({
    type: "C_COMPARE_ALL",
    position: position
  });
}

export function removePlayer(player) {
  dispatcher.dispatch({
    type: "C_REMOVE_PLAYER",
    player: player
  });
}

export function changeComparisonYear(year) {
  dispatcher.dispatch({
    type: "C_CHANGE_YEAR",
    year: year
  });
}