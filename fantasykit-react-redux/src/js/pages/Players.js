import React from "react"
import { connect } from "react-redux"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Flexbox from 'flexbox-react';
import FlatButton from 'material-ui/FlatButton';

import Card from "../components/Card";
import { fetchUser } from "../actions/userActions"
import { fetchTweets } from "../actions/tweetsActions"
import { fetchPlayers } from "../actions/playerActions"

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets,
    players: store.players.players,
  };
})
export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUser())
  }

  fetchTweets() {
    this.props.dispatch(fetchTweets())
  }

  fetchPlayers() {
    this.props.dispatch(fetchPlayers())
  }

  showTotalAll() {
    console.log("total");
    //this.props.dispatch(showRankAll("totalranks"));
  }
  
  showEspnAll() {
    console.log("espn");
    //this.props.dispatch(showRankAll("espn"));
  }

  render() {
    /*
    const { user, tweets } = this.props;

    if (!tweets.length) {
      return <button onClick={this.fetchTweets.bind(this)}>load tweets</button>
    }

    const mappedTweets = tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>)
    */

    const { players } = this.props;
    
    if (!players.length) {
      return <button onClick={this.fetchPlayers.bind(this)}>load players</button>
    }

    else {
      const PlayerComponents = players.map((card) => {
        return <Card key={card.id} {...card}/>;
      });

      return (
        <MuiThemeProvider>
          <div>
            <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">
              <FlatButton onClick={this.showTotalAll.bind(this)}>Total</FlatButton>
              <FlatButton onClick={this.showEspnAll.bind(this)}>ESPN</FlatButton>
            </Flexbox>
            <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">{PlayerComponents}</Flexbox>
          </div>
        </MuiThemeProvider>
      );
    }
  }
}
