import React from "react";
import axios from 'axios';
import Flexbox from 'flexbox-react';

import PlayerStore from "../stores/PlayerStore";
import * as PlayerActions from "../actions/PlayerActions";

import RushingStatLine from './StatLines/RushingStatLine';
import RushingHeader from './StatLines/RushingHeader';
import ReceivingStatLine from './StatLines/ReceivingStatLine';
import ReceivingHeader from './StatLines/ReceivingHeader';
import PassingStatLine from './StatLines/PassingStatLine';
import PassingHeader from './StatLines/PassingHeader';

export default class StatsTable extends React.Component {
  constructor(props) {
    super(props);

    this.getStats = this.getStats.bind(this);
    var stats = PlayerStore.getStats(props.id);

    this.state = {
      id: props.id,
      teamid: props.teamid,
    	rushingstats: stats.rushingstats,
    	receivingstats: stats.receivingstats,
    	passingstats: stats.passingstats,
      fetched: stats.fetched
    }
  }

  componentWillMount() {
    PlayerStore.on("stats", this.getStats);
  }

  componentWillUnmount() {
    PlayerStore.removeListener("stats", this.getStats);
  }

  getStats() {
    var stats = PlayerStore.getStats(this.props.id);

    this.setState({
      rushingstats: stats.rushingstats,
      receivingstats: stats.receivingstats,
      passingstats: stats.passingstats,
      fetched: stats.fetched
    });
  }

  componentDidMount() {
    const {id, fetched, teamid} = this.state;

    if (!fetched && !this.props.rookie) {
      // If not fetched and not a rookie
      PlayerActions.fetchStats(id,teamid);
    }
  }

  render() {

    const {rushingstats,receivingstats,passingstats} = this.state;

    const alternatingColor = ['#d5d5d5', '#a9a9a9'];

    rushingstats.sort(function(a, b) {return b.yr - a.yr});
    receivingstats.sort(function(c, d){return d.yr - c.yr});
    passingstats.sort(function(e, f){return f.yr - e.yr});

    const RushingStats = rushingstats.map((season, index, array) => {
      if (array[index].att > 0) {
        return <RushingStatLine key={index} color={alternatingColor[index % alternatingColor.length]} {...season}/>;
      }
    });

    const ReceivingStats = receivingstats.map((season, index, array) => {
      if (array[index].tar > 0) {
        return <ReceivingStatLine key={index} color={alternatingColor[index % alternatingColor.length]} {...season}/>;
      }
    });

    const PassingStats = passingstats.map((season, index, array) => {
      if (array[index].att > 0) {
        return <PassingStatLine key={index} color={alternatingColor[index % alternatingColor.length]} {...season}/>;
      }
    });

    if (!this.props.rookie) {
      return (
        <div style={{minHeight:"200px",padding:"10px"}}>
          <RushingHeader should={RushingStats.length > 0}/>
          {RushingStats}
          <ReceivingHeader should={ReceivingStats.length > 0}/>
          {ReceivingStats}
          <PassingHeader should={passingHeader}/>
          {PassingStats}
        </div>
      );
    }
    else {
      return (
        <div style={{textAlign:"center", fontSize:"larger"}}>Rookie</div>
      );
    }
  }

}