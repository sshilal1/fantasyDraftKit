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
      bg7: false
    }
  }

  pageSwitchTo(sort,num) {

    var bgstr = "bg" + num;

    this.setState({
      bg1: false,
      bg2: false,
      bg3: false,
      bg4: false,
      bg5: false,
      bg6: false,
      bg7: false
    })

    this.setState({[bgstr]: true})
    PlayerActions.filterPlayersPos(sort);
  }

  render() {

    const selected = "rgba(153,153,153,.2)";
    const non = "rgba(0,0,0,0)";

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">
              <FlatButton backgroundColor={this.state.bg1 ? selected : non} onClick={() => this.pageSwitchTo("all",1)}>All</FlatButton>
              <FlatButton backgroundColor={this.state.bg2 ? selected : non} onClick={() => this.pageSwitchTo("qb",2)}>QBs</FlatButton>
              <FlatButton backgroundColor={this.state.bg3 ? selected : non} onClick={() => this.pageSwitchTo("rb",3)}>RBs</FlatButton>
              <FlatButton backgroundColor={this.state.bg4 ? selected : non} onClick={() => this.pageSwitchTo("wr",4)}>WRs</FlatButton>
              <FlatButton backgroundColor={this.state.bg5 ? selected : non} onClick={() => this.pageSwitchTo("te",5)}>TEs</FlatButton>
              <FlatButton backgroundColor={this.state.bg6 ? selected : non} onClick={() => this.pageSwitchTo("k",6)}>Ks</FlatButton>
              <FlatButton backgroundColor={this.state.bg7 ? selected : non} onClick={() => this.pageSwitchTo("def",7)}>DEF</FlatButton>
            </Flexbox>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
