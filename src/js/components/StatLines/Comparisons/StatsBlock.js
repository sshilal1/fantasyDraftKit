import React from "react";
import Flexbox from 'flexbox-react';

import PassingStatsBlock from './PassingStatsBlock';
import ReceivingStatsBlock from './ReceivingStatsBlock';
import RushingStatsBlock from './RushingStatsBlock';

export default class StatsBlock extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {

  	const {passingstats,rushingstats,receivingstats} = this.props.stats;

    rushingstats.sort(function(a, b) {return b.yr - a.yr});
    receivingstats.sort(function(c, d){return d.yr - c.yr});
    passingstats.sort(function(e, f){return f.yr - e.yr});

    //<PassingStatsBlock stats={passingstats}/>

    return (
      <Flexbox style={{flex:2}} justifyContent="space-between">
        <PassingStatsBlock stats={passingstats}/>
        <ReceivingStatsBlock stats={receivingstats}/>
        <RushingStatsBlock stats={rushingstats}/>
      </Flexbox>
    );
  }
}