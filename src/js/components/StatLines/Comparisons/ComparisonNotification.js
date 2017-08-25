import React from "react";
import Flexbox from 'flexbox-react';

export default class ComparisonNotification extends React.Component {
  render() {

  	const {count} = this.props;
  	console.log("Count at note",count);

  	var noteStyle = {
  		backgroundColor: "#ec3c31",
    	width: "20px",
    	height: "20px",
    	textAlign: "center",
    	borderRadius: "100px",
    	color: "white"
  	};

    if (count>0) {
	    return (
	    	<div style={noteStyle} className="text">{count}</div>
	    );
	 	}
	 	else return null;
  }
}