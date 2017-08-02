import React from "react";
import Flexbox from 'flexbox-react';

export default class PassingHeader extends React.Component {
  render() {

  	const style = {
      width: "35px",
      height: "20px",
      textAlign: "center"
    };

    if (this.props.should) {
	    return (
	    	<div>
		    	<div style={{textAlign:"center", fontSize:"large"}}>Passing</div>
		    	<Flexbox style={{backgroundColor: "black", color: "white", fontSize:"small"}} justifyContent="space-between">
			      <div style={{...style, width:"45px"}}>Season</div>
		        <div style={style}>Team</div>
		        <div style={style}>GM</div>
		        <div style={style}>CMP</div>
		        <div style={style}>ATT</div>
		        <div style={{...style, width:"45px"}}>CM%</div>
		        <div style={{...style, width:"45px"}}>YDS</div>
		        <div style={{...style, width:"45px"}}>AVG</div>
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
	  else return null;
  }
}