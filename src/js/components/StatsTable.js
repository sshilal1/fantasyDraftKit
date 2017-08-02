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

    var stats = PlayerStore.getStats(props.id);

    this.state = {
      id: props.id,
    	rushingstats: stats.rushingstats,
    	receivingstats: stats.receivingstats,
    	passingstats: stats.passingstats,
      fetched: stats.fetched
    }
  }

  componentDidMount() {
    const {fetched} = this.state;
    console.log("fetched?", fetched);
    if ((!this.props.rookie) && (!fetched)) {
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
    }
  }

  render() {

    const { rushingstats,receivingstats,passingstats } = this.state;
    const alternatingColor = ['#d5d5d5', '#a9a9a9'];

    const RushingStats = rushingstats.map((season, index) => {
      return <RushingStatLine key={index} color={alternatingColor[index % alternatingColor.length]} {...season}/>;
    });

    const ReceivingStats = receivingstats.map((season, index) => {
      return <ReceivingStatLine key={index} color={alternatingColor[index % alternatingColor.length]} {...season}/>;
    });

    const PassingStats = passingstats.map((season, index) => {
      return <PassingStatLine key={index} color={alternatingColor[index % alternatingColor.length]} {...season}/>;
    });

    if (!this.props.rookie) {
      return (
        <div style={{maxHeight:"300px",padding:"10px"}}>
          <RushingHeader should={RushingStats.length > 0}/>
          {RushingStats}
          <ReceivingHeader should={ReceivingStats.length > 0}/>
          {ReceivingStats}
          <PassingHeader should={PassingStats.length > 0}/>
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