import React from "react";
import Flexbox from 'flexbox-react';

export default class PassingHeader extends React.Component {
  render() {

  	const style = {
      width: "45px",
      height: "20px",
      textAlign: "center"
    };

    return (
    	<div>
	    	<div style={{textAlign:"center"}}>Passing Stats</div>
	    	<Flexbox className="card-row" flexDirection="row" justifyContent="space-between">
		      <div style={{...style, width:"60px"}}>Season</div>
	        <div style={style}>Team</div>
	        <div style={style}>GM</div>
	        <div style={style}>CMP</div>
	        <div style={style}>ATT</div>
	        <div style={style}>CM%</div>
	        <div style={style}>YDS</div>
	        <div style={style}>AVG</div>
	        <div style={style}>TD</div>
	        <div style={style}>LNG</div>
	        <div style={style}>I</div>
	        <div style={style}>FUM</div>
	        <div style={style}>QBR</div>
	        <div style={style}>RAT</div>
	     	</Flexbox>
	    </div>
    );
  }
}