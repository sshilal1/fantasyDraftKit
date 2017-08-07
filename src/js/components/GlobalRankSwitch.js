import React from "react";
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Flexbox from 'flexbox-react';

import * as PlayerActions from "../actions/PlayerActions";
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

    const selected = "rgba(153,153,153,.2)";
    const non = "rgba(0,0,0,0)";

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Flexbox flexDirection="row" justifyContent="space-between">
              <FlatButton backgroundColor={this.state.bg1 ? selected : non} onClick={() => this.pageSwitchRanks("totalranks",1)} className="text">Total</FlatButton>
              <FlatButton backgroundColor={this.state.bg2 ? selected : non} onClick={() => this.pageSwitchRanks("espn",2)}><img style={{width:"80%"}} src={espn}/></FlatButton>
              <FlatButton backgroundColor={this.state.bg3 ? selected : non} onClick={() => this.pageSwitchRanks("pros",3)}><img src={pros}/></FlatButton>
            </Flexbox>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
