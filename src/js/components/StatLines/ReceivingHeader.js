import React from "react";
import Flexbox from 'flexbox-react';

export default class ReceivingHeader extends React.Component {
  render() {

  	const style = {
      width: "45px",
      height: "20px",
      textAlign: "center"
    };

    return (
    	<div>
	    	<div style={{textAlign:"center"}}>Rushing Stats</div>
	    	<Flexbox className="card-row" flexDirection="row" justifyContent="space-between">
		      <div style={{...style, width:"60px"}}>Season</div>
	        <div style={style}>Team</div>
	        <div style={style}>GM</div>
	        <div style={style}>REC</div>
	        <div style={style}>TGT</div>
	        <div style={style}>YDS</div>
	        <div style={style}>AVG</div>
	        <div style={style}>LNG</div>
	        <div style={style}>TD</div>
	        <div style={style}>FD</div>
	        <div style={style}>FT</div>
	        <div style={style}>FL</div>
	     	</Flexbox>
	    </div>
    );
  }
}