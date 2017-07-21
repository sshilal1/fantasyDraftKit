import React from "react";
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Footer from "./Footer";
import Header from "./Header";
import Player from "./Player";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
          <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="center"><Player /></Flexbox>
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
}
