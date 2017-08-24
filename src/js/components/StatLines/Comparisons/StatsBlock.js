import React from "react";
import Flexbox from 'flexbox-react';

import PassingStatsBlock from './PassingStatsBlock';

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

    return (
      <Flexbox style={{width:"342px", fontWeight:"bold",backgroundColor:"lightgrey"}} justifyContent="space-between">
        <PassingStatsBlock stats={passingstats}/>
      </Flexbox>
    );
  }
}