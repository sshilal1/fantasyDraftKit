import React from "react";
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Flexbox from 'flexbox-react';

import * as PlayerActions from "../actions/PlayerActions";

export default class CompareAllSwitch extends React.Component {
  
  constructor() {
    super();

    this.state = {
      bg1: true,
      bg2: false,
      bg3: false,
      bg4: false
    }
  }

  compareAll(pos,num) {

    var bgstr = "bg" + num;

    this.setState({
      bg1: false,
      bg2: false,
      bg3: false,
      bg4: false
    })

    this.setState({[bgstr]: true})
    PlayerActions.compareAll(pos);
  }

  render() {

    const selected = "rgba(47,144,195,.5)";
    const non = "rgba(0,0,0,0)";

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center">
              <div>Compare All</div>
              <FlatButton hoverColor="#79b5d4" backgroundColor={this.state.bg1 ? selected : non} onClick={() => this.compareAll("qb",1)}>QBs</FlatButton>
              <FlatButton hoverColor="#79b5d4" backgroundColor={this.state.bg2 ? selected : non} onClick={() => this.compareAll("rb",2)}>RBs</FlatButton>
              <FlatButton hoverColor="#79b5d4" backgroundColor={this.state.bg3 ? selected : non} onClick={() => this.compareAll("wr",3)}>WRs</FlatButton>
              <FlatButton hoverColor="#79b5d4" backgroundColor={this.state.bg4 ? selected : non} onClick={() => this.compareAll("te",4)}>TEs</FlatButton>
            </Flexbox>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
