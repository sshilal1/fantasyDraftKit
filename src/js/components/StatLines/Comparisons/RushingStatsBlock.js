import React from "react";
import Flexbox from 'flexbox-react';

import ComparisonStore from "../../../stores/ComparisonStore";

const noseason = {
  att:"-",
  yds:"-",
  avg:"-",
  td:"-",
  fml: "-"
};

export default class RushingStatsBlock extends React.Component {

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
        att:seasons[index].att,
        yds:seasons[index].yds,
        avg:seasons[index].avg,
        td:seasons[index].td,
        fml:seasons[index].fml,
      });
    }
    else {
      this.setState(noseason);
    }
  }

  render() {

  	const {att, fml, yds, avg, td} = this.state;

    return (
      <Flexbox className="ComparisonStatBlock text" style={{flex:1.2}} justifyContent="space-between">
        <div className="ComparisonStatItem">{att}</div>
        <div className="ComparisonStatItem">{yds}</div>
        <div className="ComparisonStatItem">{avg}</div>
        <div className="ComparisonStatItem">{td}</div>
        <div className="ComparisonStatItem">{fml}</div>
      </Flexbox>
    );
  }
}