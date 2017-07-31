import React from "react";
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Flexbox from 'flexbox-react';

import * as PlayerActions from "../actions/PlayerActions";

export default class PageSwitch extends React.Component {
  
  constructor() {
    super();

    this.state = {
      bg1: true,
      bg2: false,
      bg3: false,
      bg4: false,
      bg5: false,
      bg6: false,
      bg6: false
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

  organizePlayersAll() {
    //PlayerActions.filterPlayersPos("all");
  }
  organizePlayersQbs() {
    this.setState({
      bg2: true
    })
    //PlayerActions.filterPlayersPos("qb");
  }

  pageSwitchTo(sort) {

    this.setState ({
      bg1: true,
      bg2: false,
      bg3: false,
      bg4: false,
      bg5: false,
      bg6: false,
      bg6: false
    })
    PlayerActions.filterPlayersPos(sort);
  }

  render() {

    var bg1 = (this.state.bg1 ? "rgba(153,153,153,.2)" : "rgba(0,0,0,0)");
    var bg2 = (this.state.bg2 ? "rgba(153,153,153,.2)" : "rgba(0,0,0,0)");
    var bg3 = (this.state.bg3 ? "rgba(153,153,153,.2)" : "rgba(0,0,0,0)");
    var bg4 = (this.state.bg4 ? "rgba(153,153,153,.2)" : "rgba(0,0,0,0)");
    var bg5 = (this.state.bg5 ? "rgba(153,153,153,.2)" : "rgba(0,0,0,0)");
    var bg6 = (this.state.bg6 ? "rgba(153,153,153,.2)" : "rgba(0,0,0,0)");
    var bg7 = (this.state.bg7 ? "rgba(153,153,153,.2)" : "rgba(0,0,0,0)");

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">
              <FlatButton backgroundColor={bg1} onClick={() => this.pageSwitchTo("all"))}>All</FlatButton>
              <FlatButton backgroundColor={bg2} onClick={() => this.pageSwitchTo("qb"))}>QBs</FlatButton>
              <FlatButton backgroundColor={bg3} onClick={() => this.pageSwitchTo("rb"))}>RBs</FlatButton>
              <FlatButton backgroundColor={bg4} onClick={() => this.pageSwitchTo("wr"))}>WRs</FlatButton>
              <FlatButton backgroundColor={bg5} onClick={() => this.pageSwitchTo("te"))}>TEs</FlatButton>
              <FlatButton backgroundColor={bg6} onClick={() => this.pageSwitchTo("k"))}>Ks</FlatButton>
              <FlatButton backgroundColor={bg7} onClick={() => this.pageSwitchTo("def"))}>DEF</FlatButton>
            </Flexbox>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
