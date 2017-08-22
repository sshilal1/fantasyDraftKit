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
      // fetch them
      PlayerActions.fetchStats(id,teamid);
    }

    /*if ((!this.props.rookie) && (!fetched)) {
      axios.post('/stats', {
        id: this.props.id
      })
      .then((result)=> {
        console.log(result);
        
        this.setState({
          rushingstats: result.data.rushingstats,
          receivingstats: result.data.receivingstats,
          passingstats: result.data.passingstats,
          fetched: true
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }*/
  }

  render() {

    var rushingstats= this.state.rushingstats;
    var receivingstats = this.state.receivingstats;
    var passingstats = this.state.passingstats;

    const alternatingColor = ['#d5d5d5', '#a9a9a9'];
    var rushingHeader = false;
    var receivingHeader = false;
    var passingstats = false;

    rushingstats.sort(function(a, b){return b.yr - a.yr});
    receivingstats.sort(function(c, d){return d.yr - c.yr});
    rushingstats.sort(function(e, f){return f.yr - e.yr});

    const RushingStats = rushingstats.map((season, index, array) => {
      if (array[index].att > 0) {
        rushingHeader = true;
        return <RushingStatLine key={index} color={alternatingColor[index % alternatingColor.length]} {...season}/>;
      }
    });

    const ReceivingStats = receivingstats.map((season, index, array) => {
      if (array[index].tar > 0) {
        receivingHeader = true;
        return <ReceivingStatLine key={index} color={alternatingColor[index % alternatingColor.length]} {...season}/>;
      }
    });

    const PassingStats = passingstats.map((season, index, array) => {
      if (array[index].att > 0) {
        passingHeader = true;
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