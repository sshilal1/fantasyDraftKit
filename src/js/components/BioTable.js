import React from "react";
import axios from 'axios';
import Flexbox from 'flexbox-react';

export default class BioTable extends React.Component {

  //"age":"31","height":"6-3","weight":"215","experience":"7","college":"San Diego"
  render() {

    const {age, height, weight, experience, college} = this.props;
    
    return (
      <div style={{textAlign:"center", fontSize:"larger", padding:"20px", width:"250px"}}>
        <div>Bio</div>
        <div style={{fontSize:"smaller"}}>Age: {age}</div>
        <div style={{fontSize:"smaller"}}>Height: {height}</div>
        <div style={{fontSize:"smaller"}}>Weight: {weight}</div>
        <div style={{fontSize:"smaller"}}>Experience: {experience}</div>
        <div style={{fontSize:"smaller"}}>College: {college}</div>
      </div>
    )
  }

}