import React from "react";
import Flexbox from 'flexbox-react';

import ComparisonStore from "../../../stores/ComparisonStore";

export default class PassingStatsBlock extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.stats);
    this.updateYear = this.updateYear.bind(this);
    /*this.state = {
      yr:props.stats[0].yr,
      cmp:props.stats[0].cmp,
      att:props.stats[0].att,
      cpct:props.stats[0].cpct,
      yds:props.stats[0].yds,
      td:props.stats[0].td,
      i:props.stats[0].i,
    }*/
    this.state = {
      cmp:456,
      att:500,
      cpct:65.5,
      yds:4567,
      td:30,
      i:14,
    }
  }

  componentWillMount() {
    ComparisonStore.on("yearchange", this.updateYear);
  }

  componentWillUnmount() {
    ComparisonStore.removeListener("yearchange", this.updateYear);
  }

  updateYear(year) {

    const seasons = this.props.stats;

    var index = _.findIndex(seasons, function(o) { return o.yr.toString() == year; });

    this.setState({
      cmp:seasons[index].cmp,
      att:seasons[index].att,
      cpct:seasons[index].cpct,
      yds:seasons[index].yds,
      td:seasons[index].td,
      i:seasons[index].i
    })
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