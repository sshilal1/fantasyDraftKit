import React from "react";
import axios from 'axios';
import Flexbox from 'flexbox-react';

import Schedule from "./Schedule";
import PlayerStore from "../stores/PlayerStore";
import * as PlayerActions from "../actions/PlayerActions";

class DepthPlayer extends React.Component {
  render() {
    const {name, depth, team, teamid, myplayer} = this.props;

    if (myplayer) {
      var textstyle={color: "red",fontSize:"smaller"};
    }
    else {
      textstyle={fontSize:"smaller"}
    }

    return (
      <div className="text" style={textstyle}>{depth} {name}</div>
    );
  }
}

export default class BioTable extends React.Component {

  constructor(props) {
    super(props);

    this.getPlayerInfo = this.getPlayerInfo.bind(this);
    var depth = PlayerStore.getDepth(props.id);
    var matchups = PlayerStore.getMatchups(props.teamid);

    this.state = {
      id: props.id,
      teamid: props.teamid,
      team: "",
      depth: depth,
      matchups: matchups,
      position: props.position,
      fetched: (depth.length != 0)
    }
  }

  componentWillMount() {
    PlayerStore.on("depth", this.getPlayerInfo);
  }

  componentWillUnmount() {
    PlayerStore.removeListener("depth", this.getPlayerInfo);
  }

  getPlayerInfo() {
    var depth = PlayerStore.getDepth(this.props.id);
    var matchups = PlayerStore.getMatchups(this.props.teamid);

    this.setState({
      depth: depth,
      matchups: matchups,
      team: (depth.length!=0 ? depth[0].team : ""),
      fetched: (depth.length != 0)
    });
  }

  componentDidMount() {
    const {id, fetched, teamid, position} = this.state;

    if (!fetched) {
      PlayerActions.fetchDepth(id,position,teamid);
    }
  }

  render() {

    const {age, height, weight, experience, college, name} = this.props;
    const {depth, matchups, teamid, position, team} = this.state;

    console.log(matchups);

    const DepthChart = depth.map((player) => {
      var myplayer = (player.name.toLowerCase() == name);
      return (
        <DepthPlayer key={player.name} myplayer={myplayer} {...player}/>
      );
    });
    
    return (
      <Flexbox>
        <div className="text large" style={{ padding:"20px"}}>
          <Flexbox justifyContent="space-between">
            <div style={{fontSize:"smaller"}}>Age: {age}</div>
            <div style={{fontSize:"smaller"}}>Height: {height}</div>
            <div style={{fontSize:"smaller"}}>Weight: {weight}</div>
          </Flexbox>
          <Flexbox justifyContent="space-between" style={{width:"250px"}}>
            <div style={{fontSize:"smaller"}}>Experience: {experience}</div>
            <div style={{fontSize:"smaller"}}>College: {college}</div>
          </Flexbox>
          <Schedule matchups={matchups}/>
        </div>
        <div className="text" style={{ padding:"20px"}}>
          <div className="text xlarge">{teamid.toUpperCase()} {position.toUpperCase()} Depth</div>
          <div>{DepthChart}</div>
          <div className="text xxsmall">Updated: 8/25/2017</div>
        </div>
      </Flexbox>
    )
  }

}