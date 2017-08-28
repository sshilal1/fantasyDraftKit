import React from "react";
import Flexbox from 'flexbox-react';

import ComparisonStore from "../../../stores/ComparisonStore";

const noseason = {
  cmp:"-",
  att:"-",
  cpct:"-",
  yds:"-",
  td:"-",
  i:"-",
};

export default class PassingStatsBlock extends React.Component {

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
        cmp:seasons[index].cmp,
        att:seasons[index].att,
        cpct:seasons[index].cpct,
        yds:seasons[index].yds,
        td:seasons[index].td,
        i:seasons[index].i
      });
    }
    else {
      this.setState(noseason);
    }
  }

  render() {

  	const {yr, cmp, att, cpct, yds, td, i} = this.state;

    var formattedCmp = cmp + '/' + att + ' (' + cpct + '%)';

    return (
      <Flexbox className="ComparisonStatBlock text" style={{flex:1.2}} justifyContent="space-between">
        <div className="ComparisonStatItem" style={{flex:5}}>{formattedCmp}</div>
        <div className="ComparisonStatItem" style={{flex:2}}>{yds}</div>
        <div className="ComparisonStatItem">{td}</div>
        <div className="ComparisonStatItem">{i}</div>
      </Flexbox>
    );
  }
}