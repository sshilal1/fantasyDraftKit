import React from "react";
import Flexbox from 'flexbox-react';

export default class RushingStatsBlock extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.stats);
    this.state = {
      att:442,
      yds:1203,
      avg:5.3,
      td:11,
      fl:4
    }
  }

  render() {

  	const {att, fl, yds, avg, td} = this.state;

    return (
      <Flexbox className="ComparisonStatBlock text" style={{flex:1.2}} justifyContent="space-between">
        <div className="ComparisonStatItem">{att}</div>
        <div className="ComparisonStatItem">{yds}</div>
        <div className="ComparisonStatItem">{avg}</div>
        <div className="ComparisonStatItem">{td}</div>
        <div className="ComparisonStatItem">{fl}</div>
      </Flexbox>
    );
  }
}