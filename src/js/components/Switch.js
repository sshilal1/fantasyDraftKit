import React from "react";
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Flexbox from 'flexbox-react';

import * as PlayerActions from "../actions/PlayerActions";
import espn from '../../images/espn.png'
import pros from '../../images/fantasypros.png'

export default class Switch extends React.Component {
  
  constructor() {
    super();

    // Something here to remember state of selected rakning method
    // so that when we re-render player card, a this.props.selectedIndex
    // is passed from the player card and then some function here to
    // decide which background is selected

    this.state = {
      selectedIndex: 0,
      bgOne: "rgba(153,153,153,.2)",
      bgTwo: "rgba(0,0,0,0)",
      bgThree: "rgba(0,0,0,0)"
    }
  }

  handleOne() {
    this.setState({
      selectedIndex: 0,
      bgOne: "rgba(153,153,153,.2)",
      bgTwo: "rgba(0,0,0,0)",
      bgThree: "rgba(0,0,0,0)"
    });
    PlayerActions.seeRank(this.props.id,"totalranks");
  }

  handleTwo() {
    this.setState({
      selectedIndex: 1,
      bgOne: "rgba(0,0,0,0)",
      bgTwo: "rgba(153,153,153,.2)",
      bgThree: "rgba(0,0,0,0)"
    });
    PlayerActions.seeRank(this.props.id,"espn");
  }

  handleThree() {
    this.setState({
      selectedIndex: 2,
      bgOne: "rgba(0,0,0,0)",
      bgTwo: "rgba(0,0,0,0)",
      bgThree: "rgba(153,153,153,.2)"
    });
    PlayerActions.seeRank(this.props.id,"pros");
  }

  render() {

    const { bgOne,bgTwo,bgThree } = this.state;
    const { txtOne,txtTwo,txtThree } = this.props;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Flexbox flexDirection="row" justifyContent="space-between">
              <FlatButton backgroundColor={bgOne} style={{minWidth:"40px"}} onClick={this.handleOne.bind(this)} className="text">Total</FlatButton>
              <FlatButton backgroundColor={bgTwo} style={{minWidth:"45px"}} onClick={this.handleTwo.bind(this)}><img style={{width:"80%"}} src={espn}/></FlatButton>
              <FlatButton backgroundColor={bgThree} style={{minWidth:"85px"}} onClick={this.handleThree.bind(this)}><img src={pros}/></FlatButton>
            </Flexbox>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
