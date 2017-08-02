import React from "react";
import Flexbox from 'flexbox-react';

export default class RushingHeader extends React.Component {
  render() {

  	const style = {
      width: "35px",
      height: "20px",
      textAlign: "center"
    };

    if (this.props.should) {
	    return (
	    	<div>
		    	<div style={{textAlign:"center", fontSize:"large"}}>Rushing</div>
		    	<Flexbox style={{backgroundColor: "black", color: "white", fontSize:"small"}} justifyContent="space-between">
			      <div style={{...style, width:"45px"}}>Season</div>
		        <div style={style}>Team</div>
		        <div style={style}>GM</div>
		        <div style={style}>ATT</div>
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
	  else return null;
  }
}