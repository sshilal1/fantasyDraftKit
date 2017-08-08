import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {TextField} from 'material-ui';

import PlayerStore from "../stores/PlayerStore";
import * as PlayerActions from "../actions/PlayerActions";

export default class CustomTextField extends React.Component {
  
  constructor() {
    super();
    this.state = {
      value: "",
    }
    this.clearField = this.clearField.bind(this);
  }

  clearField() {
    this.setState({
      value: "",
    });
  }

  componentWillMount() {
    PlayerStore.on("change", this.clearField);
    this.delayedCallback = _.debounce(function (event) {
      const filter = event.target.value;
      console.log(filter);
      PlayerActions.filterPlayers(filter);
    }, 500);
  }

  handleFilter(event) {
    this.setState({
      value: event.target.value,
    });
    event.persist();
    this.delayedCallback(event);
  }

  render() {
    return (
      <MuiThemeProvider>
      	<div>
  	      <TextField style={{width:"130px",height:"36px"}} hintText="Filter Players" onChange={this.handleFilter.bind(this)} value={this.state.value} />
       	</div>
      </MuiThemeProvider>
    );
  }
}