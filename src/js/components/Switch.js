import React from "react";

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Switch extends React.Component {
  
  constructor() {
    super();
    this.state = {
      bgOne: "rgba(153,153,153,.2)",
      bgTwo: "rgba(0,0,0,0)",
      bgThree: "rgba(0,0,0,0)"
    }
  }

  handleOne() {
    this.setState({
      bgOne: "rgba(153,153,153,.2)",
      bgTwo: "rgba(0,0,0,0)",
      bgThree: "rgba(0,0,0,0)"
    })
  }

  handleTwo() {
    this.setState({
      bgOne: "rgba(0,0,0,0)",
      bgTwo: "rgba(153,153,153,.2)",
      bgThree: "rgba(0,0,0,0)"
    })
  }

  handleThree() {
    this.setState({
      bgOne: "rgba(0,0,0,0)",
      bgTwo: "rgba(0,0,0,0)",
      bgThree: "rgba(153,153,153,.2)"
    })
  }

  render() {

    const { bgOne,bgTwo,bgThree } = this.state;
    //const { txtOne,txtTwo,txtThree } = this.props;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <FlatButton backgroundColor={bgOne} onClick={this.handleOne.bind(this)} className="text">no</FlatButton>
            <FlatButton backgroundColor={bgTwo} onClick={this.handleTwo.bind(this)} className="text">no</FlatButton>
            <FlatButton backgroundColor={bgThree} onClick={this.handleThree.bind(this)} className="text">no</FlatButton>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
