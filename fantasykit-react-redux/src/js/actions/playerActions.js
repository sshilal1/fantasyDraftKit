import nygData from '../nyg-team.json';
import _ from 'lodash';

export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Will",
      age: 35,
    }
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}

export function fetchPlayers() {
  return function(dispatch) {

    dispatch({type: "FETCH_PLAYERS"});

    var initialPlayers = [];
      
    for (var player of nygData.players) {
      var parts = player.name.split(" "),
        first = parts.shift(),
        last = parts.shift().toUpperCase() || "";
    
      var newPlayer = {
        name : player.name,
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
    
    dispatch({type: "FETCH_PLAYERS_FULFILLED", payload: initialPlayers});
  }
}

export function showRank(rankings) {
  return {
    type: 'SHOW_RANK',
    payload: rankings,
  }
}

export function showRankAll(rankings) {
  return {
    type: 'SHOW_RANK_ALL',
    payload: rankings,
  }
}
