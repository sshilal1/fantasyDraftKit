import React from "react";
import Flexbox from 'flexbox-react';

import ComparisonStore from "../../../stores/ComparisonStore";

const noseason = {
  tar:"-",
  rec:"-",
  yds:"-",
  td:"-"
};

export default class ReceivingStatsBlock extends React.Component {

  constructor(props) {
    super(props);
    this.updateYear = this.updateYear.bind(this);
    this.state = noseason;
  }

  componentWillMount() {
    ComparisonStore.on("yearchange", this.updateYear);
  }

  componentWillUnmount() {
    ComparisonStore.removeListener("yearchange", this.updateYear);
  }

  componentDidMount() {
    this.updateYear(this.props.stats[0].yr);
  }

  updateYear(year) {

    const seasons = this.props.stats;

    var index = _.findIndex(seasons, function(o) { return o.yr.toString() == year; });

    if (index != -1) {
      this.setState({
        tar:seasons[index].tar,
        rec:seasons[index].rec,
        yds:seasons[index].yds,
        td:seasons[index].td
      });
    }
    else {
      this.setState(noseason);
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