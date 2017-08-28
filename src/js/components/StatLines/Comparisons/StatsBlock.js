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

    var teststats = [
      {
        yr:2016,
        cmp:285,
        att:137,
        cpct:99.9,
        yds:5694,
        td:10,
        i:9,
      },
      {
        yr:2015,
        cmp:456,
        att:500,
        cpct:65.5,
        yds:4567,
        td:30,
        i:14,
      },
      {
        yr:2014,
        cmp:909,
        att:527,
        cpct:0.04,
        yds:3482,
        td:20,
        i:35,
      },
    ];

    var testreceiving = [
      {
        yr:2015,
        rec:89,
        tar:203,
        yds:984,
        td:7
      }
    ];

    return (
      <Flexbox style={{flex:2}} justifyContent="space-between">
        <PassingStatsBlock stats={passingstats}/>
        <ReceivingStatsBlock stats={receivingstats}/>
        <RushingStatsBlock stats={rushingstats}/>
      </Flexbox>
    );
  }
}