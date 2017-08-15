import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton} from 'material-ui';
import Flexbox from 'flexbox-react';

import Card from "../components/Card";
import * as PlayerActions from "../actions/PlayerActions";
import ComparisonStore from "../stores/ComparisonStore";

export default class Comparisons extends React.Component {
  constructor() {
    super();
    this.state = {
      players: ComparisonStore.getAll()
    };
  }

  render() {

    const { players } = this.state;
    
    const PlayerComponents = players.map((card) => {
        return <Card key={card.id} {...card}/>;
    });

    return (
      <MuiThemeProvider>
        <div style={{overflow: "overlay"}} >
          <div style={{ paddingTop: 72 }}>
            Comparisons!
            <Flexbox style={{overflow: "overlay"}} flexDirection="row" flexWrap="wrap" justifyContent="center">{PlayerComponents}</Flexbox>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}