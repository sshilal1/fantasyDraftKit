import React from "react";
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Flexbox from 'flexbox-react';

import * as PlayerActions from "../actions/PlayerActions";
import yahoo from '../../images/yahoo.png'
import espn from '../../images/espn.png'
import pros from '../../images/fantasypros.png'

export default class GlobalRankSwitch extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      bg1: true,
      bg2: false,
      bg3: false,
      selected: this.props.selectedRanking
    }
  }

  pageSwitchRanks(rankings,num) {

    var bgstr = "bg" + num;

    this.setState({
      bg1: false,
      bg2: false,
      bg3: false
    })

    this.setState({[bgstr]: true})
    
    PlayerActions.showRankAll(rankings);
  }

  render() {

    const selected = "rgba(47,144,195,.5)";
    const non = "rgba(0,0,0,0)";

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Flexbox flexDirection="row" justifyContent="space-between">
              <FlatButton hoverColor="#79b5d4" style={{width: "88px"}} backgroundColor={this.state.bg1 ? selected : non} onClick={() => this.pageSwitchRanks("yahoo",1)}><img style={{width:"85%"}} src={yahoo}/></FlatButton>
              <FlatButton hoverColor="#79b5d4" backgroundColor={this.state.bg2 ? selected : non} onClick={() => this.pageSwitchRanks("espn",2)}><img style={{width:"65%"}} src={espn}/></FlatButton>
              <FlatButton hoverColor="#79b5d4" backgroundColor={this.state.bg3 ? selected : non} onClick={() => this.pageSwitchRanks("pros",3)}><img src={pros}/></FlatButton>
            </Flexbox>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
