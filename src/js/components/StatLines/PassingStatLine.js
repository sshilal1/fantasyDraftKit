import React from "react";
import Flexbox from 'flexbox-react';

export default class PassingStatLine extends React.Component {
  render() {

  	const {yr, tm, gm, cmp, att, cpct, yds, avg, lng, td, i, fmt, qbr, rat} = this.props;

  	const style = {
      width: "45px",
      height: "20px",
      textAlign: "center"
    };

    return (
    	<Flexbox className="card-row" flexDirection="row" justifyContent="space-between">
	      <div style={{...style, width:"60px"}}>{yr}</div>
	      <div style={style}>{tm}</div>
	      <div style={style}>{gm}</div>
	      <div style={style}>{cmp}</div>
	      <div style={style}>{att}</div>
	      <div style={style}>{cpct}</div>
	      <div style={style}>{yds}</div>
	      <div style={style}>{avg}</div>
	      <div style={style}>{td}</div>
	      <div style={style}>{lng}</div>
	      <div style={style}>{i}</div>
	      <div style={style}>{fmt}</div>
	      <div style={style}>{qbr}</div>
	      <div style={style}>{rat}</div>
     	</Flexbox>
    );
  }
}