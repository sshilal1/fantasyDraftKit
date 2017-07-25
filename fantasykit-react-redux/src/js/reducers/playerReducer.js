import _ from 'lodash';

export default function reducer(state={
    players: {},
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_PLAYERS": {
        return {...state, fetching: true}
      }
      case "FETCH_PLAYERS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          players: action.payload,
        }
      }

      case "SHOW_RANK": {

        const newPlayers = [...state.players]

        return {
          ...state,
        }
      }

      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload},
        }
      }
      case "SET_USER_AGE": {
        return {
          ...state,
          user: {...state.user, age: action.payload},
        }
      }
    }

    return state
}
