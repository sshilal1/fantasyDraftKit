import React from "react";
import Flexbox from 'flexbox-react';

export default class ReceivingStatLine extends React.Component {
  render() {

  	const {yr, tm, gm, rec, tar, yds, avg, lng, td, fd, fmt, fml} = this.props;

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
	      <div style={style}>{rec}</div>
	      <div style={style}>{tar}</div>
	      <div style={style}>{yds}</div>
	      <div style={style}>{avg}</div>
	      <div style={style}>{lng}</div>
	      <div style={style}>{td}</div>
	      <div style={style}>{fd}</div>
	      <div style={style}>{fmt}</div>
	      <div style={style}>{fml}</div>
     	</Flexbox>
    );
  }
}