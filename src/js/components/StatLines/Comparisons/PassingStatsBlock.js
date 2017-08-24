import React from "react";
import Flexbox from 'flexbox-react';

export default class PassingStatsBlock extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.stats);
    this.state = {
      yr:props.stats[0].yr,
      cmp:props.stats[0].cmp,
      att:props.stats[0].att,
      cpct:props.stats[0].cpct,
      yds:props.stats[0].yds,
      td:props.stats[0].td,
      i:props.stats[0].i,
    }
  }

  render() {

  	const {yr, cmp, att, cpct, yds, td, i} = this.state;

    const style = {
      width: "55px",
      height: "20px",
      textAlign: "center"
    };

    var formattedCmp = cmp + '/' + att + ' (' + cpct + '%)';

    return (
      <Flexbox style={{width:"342px", fontWeight:"bold",backgroundColor:"lightgrey"}} justifyContent="space-between">
        <div style={style}>{yr}</div>
        <div style={{...style, width:"140px"}}>{formattedCmp}</div>
        <div style={{style}}>{yds}</div>
        <div style={style}>{td}</div>
        <div style={style}>{i}</div>
      </Flexbox>
    );
  }
}