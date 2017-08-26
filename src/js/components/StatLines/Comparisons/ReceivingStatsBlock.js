import React from "react";
import Flexbox from 'flexbox-react';

export default class ReceivingStatsBlock extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.stats);
    this.state = {
      tar:123,
      rec:80,
      yds:1203,
      td:11,
    }
  }

  render() {

  	const {tar, rec, yds, td} = this.state;

    return (
      <Flexbox className="ComparisonStatBlock text" style={{flex:1}} justifyContent="space-between">
        <div className="ComparisonStatItem">{tar}</div>
        <div className="ComparisonStatItem">{rec}</div>
        <div className="ComparisonStatItem">{yds}</div>
        <div className="ComparisonStatItem">{td}</div>
      </Flexbox>
    );
  }
}