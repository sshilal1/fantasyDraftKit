import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton} from 'material-ui';
import Flexbox from 'flexbox-react';

import CompareCard from "../components/CompareCard";
import * as PlayerActions from "../actions/PlayerActions";
import ComparisonStore from "../stores/ComparisonStore";

export default class Comparisons extends React.Component {
  constructor() {
    super();
    this.getPlayers = this.getPlayers.bind(this);
    this.state = {
      players: ComparisonStore.getAll()
    };
  }

  getPlayers() {
    console.log("comparisons");
    this.setState({
      players: ComparisonStore.getAll(),
    });
  }

  componentWillMount() {
    ComparisonStore.on("compare", this.getPlayers);
  }

  componentWillUnmount() {
    ComparisonStore.removeListener("compare", this.getPlayers);
  }

  render() {

    const { players } = this.state;

    const headerStyle = {
      margin:"5px",
      justifyContent: "center",
      flex:1
    }
    
    const PlayerComponents = players.map((card) => {
        return <CompareCard key={card.id} {...card}/>;
    });

    return (
      <MuiThemeProvider>
        <div style={{overflow: "overlay"}} >
          <div style={{ paddingTop: 72 }}>
            <Flexbox>
              <Flexbox style={{width:"420px", margin:"5px"}}>Card Header</Flexbox>
              <Flexbox flex="2">
                <Flexbox style={headerStyle}>PassingHeader</Flexbox>
                <Flexbox style={headerStyle}>ReceivingHeader</Flexbox>
                <Flexbox style={headerStyle}>RushingHeader</Flexbox>
              </Flexbox>
            </Flexbox>
            <Flexbox style={{overflow: "overlay"}} flexDirection="column" justifyContent="center">{PlayerComponents}</Flexbox>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}