import React from "react";
import axios from 'axios';
import Flexbox from 'flexbox-react';

import PlayerStore from "../stores/PlayerStore";
import * as PlayerActions from "../actions/PlayerActions";

class DepthPlayer extends React.Component {
  render() {
    const {name, depth, team, teamid} = this.props;

    return (
      <div className="text" style={{fontSize:"smaller"}}>{depth} {name}</div>
    );
  }
}

export default class BioTable extends React.Component {

  constructor(props) {
    super(props);

    this.getDepth = this.getDepth.bind(this);
    var depth = PlayerStore.getDepth(props.id);

    this.state = {
      id: props.id,
      teamid: props.teamid,
      depth: depth,
      position: props.position,
      fetched: false
    }
  }

  componentWillMount() {
    PlayerStore.on("depth", this.getDepth);
  }

  componentWillUnmount() {
    PlayerStore.removeListener("depth", this.getDepth);
  }

  getDepth() {
    var depth = PlayerStore.getDepth(this.props.id);

    this.setState({
      depth: depth,
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

    const {age, height, weight, experience, college} = this.props;
    const {depth, teamid, position} = this.state;

    const DepthChart = depth.map((player) => {
      return (
        <DepthPlayer key={player.name} {...player}/>
      );
    });

    console.log(DepthChart);
    
    return (
      <Flexbox>
        <div className="text large" style={{ padding:"20px", width:"250px"}}>
          <div>Bio</div>
          <div style={{fontSize:"smaller"}}>Age: {age}</div>
          <div style={{fontSize:"smaller"}}>Height: {height}</div>
          <div style={{fontSize:"smaller"}}>Weight: {weight}</div>
          <div style={{fontSize:"smaller"}}>Experience: {experience}</div>
          <div style={{fontSize:"smaller"}}>College: {college}</div>
        </div>
        <div className="text" style={{ padding:"20px", width:"250px"}}>
          <div>{teamid.toUpperCase()} {position} Depth</div>
          <div>{DepthChart}</div>
        </div>
      </Flexbox>
    )
  }

}