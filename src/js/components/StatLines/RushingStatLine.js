import React from "react";

export default class RushingStatLine extends React.Component {
  render() {

  	const {yr, tm, gm, att, yds, avg, lng, td, fd, fmt, fml} = this.props;

    return (
    	<div>
	      <div>{yr}</div>
	      <div>{tm}</div>
	      <div>{gm}</div>
	      <div>{att}</div>
	      <div>{yds}</div>
	      <div>{avg}</div>
	      <div>{lng}</div>
	      <div>{td}</div>
	      <div>{fd}</div>
	      <div>{fmt}</div>
	      <div>{fml}</div>
     	</div>
    );
  }
}