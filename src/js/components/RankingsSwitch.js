import React from "react";
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Flexbox from 'flexbox-react';

import PlayerStore from "../stores/PlayerStore";
import * as PlayerActions from "../actions/PlayerActions";
import yahoo from '../../images/yahoo-small.png'
import espn from '../../images/espn.png'
import pros from '../../images/fantasypros.png'

export default class RankingsSwitch extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      bg1: false,
      bg2: false,
      bg3: false
    }
  }

  componentDidMount() {
    var bgForRank = {"yahoo": "bg1","espn": "bg2","pros": "bg3"};
    const bg = bgForRank[this.props.selectedRanking];

    this.setState({
      [bg]: true
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedRanking !== nextProps.selectedRanking) {

      var bgForRank = {"yahoo": "bg1","espn": "bg2","pros": "bg3"};
      const bg = bgForRank[nextProps.selectedRanking];

      this.setState({
        bg1: false,
        bg2: false,
        bg3: false
      });

      this.setState({
        [bg]: true
      })

      return true;
    }
    else {
      return false;
    }
  }

  playerSwitchRanks(rankings,num) {

    var bgstr = "bg" + num;

    this.setState({
      bg1: false,
      bg2: false,
      bg3: false
    })

    this.setState({[bgstr]: true})
    PlayerActions.seeRank(this.props.id,rankings);
  }

  render() {

    const selected = "rgba(153,153,153,.2)";
    const non = "rgba(0,0,0,0)";
    const {bg1, bg2, bg3} = this.state;

    return (
      <Flexbox flexDirection="column" justifyContent="center">
        <MuiThemeProvider>
          <div>
            <Flexbox flexDirection="row" justifyContent="space-between">
              <FlatButton backgroundColor={bg1 ? selected : non} style={{minWidth:"40px"}} onClick={() => this.playerSwitchRanks("yahoo",1)}><img style={{width:"60%"}} src={yahoo}/></FlatButton>
              <FlatButton backgroundColor={bg2 ? selected : non} style={{minWidth:"45px"}} onClick={() => this.playerSwitchRanks("espn",2)}><img style={{width:"80%"}} src={espn}/></FlatButton>
              <FlatButton backgroundColor={bg3 ? selected : non} style={{minWidth:"85px"}} onClick={() => this.playerSwitchRanks("pros",3)}><img style={{width:"80%"}} src={pros}/></FlatButton>
            </Flexbox>
          </div>
        </MuiThemeProvider>
      </Flexbox>
    );
  }
}
