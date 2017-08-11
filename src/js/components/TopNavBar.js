import React from "react";
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton,TextField,Toggle,AppBar} from 'material-ui';

import * as PlayerActions from "../actions/PlayerActions";

export default class TopNavBar extends React.Component {

	constructor() {
		super();
	}

	toggleSortBy(e, isInputChecked) {
    if(isInputChecked) {
      PlayerActions.sortBy("lastname");
    }
    else {
      PlayerActions.sortBy("overallrank");
    }
  }

  render() {

  	const {appbar} = this.props;

    return (
    	<MuiThemeProvider>
        <div>
		    	<AppBar showMenuIconButton={false} titleStyle={{boxFlex:0, flex:0}} style={{ position: "fixed", backgroundColor: "white" }}>
		        <Flexbox flexDirection="column" flexWrap="wrap" justifyContent="center" style={{margin: "0 auto"}}>
		          <div><PageSwitch/></div>
		          <Flexbox flexDirection="row" justifyContent="space-between">
		            <GlobalRankSwitch/>
		            <Flexbox flexDirection="row" style={{width:"130px",height:"28px",paddingTop:"8px"}}>
		              <div>Rank</div>
		              <Toggle style={{width:"50px"}} onToggle={this.toggleSortBy.bind(this)}/>
		              <div>Name</div>
		            </Flexbox>
		            <CustomTextField/>
		          </Flexbox>
		        </Flexbox>
		      </AppBar>
		    </div>
			</MuiThemeProvider>
    );
  }
}