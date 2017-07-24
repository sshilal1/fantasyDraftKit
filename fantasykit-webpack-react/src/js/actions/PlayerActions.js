import dispatcher from "../dispatcher";

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
        positionrank: 7
      },
  });
}


export function modPlayer(mod) {

  dispatcher.dispatch({
    type: "MOD_PLAYER",
    modification: mod,
  });
}

export function reloadPlayers() {

  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })

  dispatcher.dispatch({type: "FETCH_PLAYERS"});

  /*setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_PLAYERS", players: [
      {
        id: 4732947,
        firstname: "Buck",
        lastname: "NELSON",
        position: "QB",
        teamid: "SF",
        num: 10,
        overallrank: 29,
        positionrank: 7
      },
    ]});
  }, 1000);*/
}