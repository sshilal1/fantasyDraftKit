import React from "react";
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton,TextField,Toggle,AppBar} from 'material-ui';

import CustomTextField from '../components/CustomTextField';
import PageSwitch from '../components/PageSwitch';
import GlobalRankSwitch from '../components/GlobalRankSwitch';
import * as PlayerActions from "../actions/PlayerActions";
import {
  HashRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'

export default class TopNavBar extends React.Component {

	constructor() {
		super();
		this.state = {
			nav:"home"
		}
	}

	toggleSortBy(e, isInputChecked) {
    if(isInputChecked) {
      PlayerActions.sortBy("lastname");
    }
    else {
      PlayerActions.sortBy("overallrank");
    }
  }

  toggleCompareBy(e, isInputChecked) {
    if(isInputChecked) {
      console.log("By year");
    }
    else {
      console.log("Career");
    }
  }

  changeNav() {
  	const page = this.state.nav;

  	this.setState({
  		nav: page == "home" ? "compare" : "home",
  	})
  }

  render() {

  	if (this.state.nav == "home") {
	    return (
	    	<MuiThemeProvider>
	        <div>
			    	<AppBar showMenuIconButton={false} titleStyle={{boxFlex:0, flex:0}} style={{ position: "fixed", backgroundColor: "white" }}>
			        <Flexbox flexDirection="column" flexWrap="wrap" justifyContent="center" style={{margin: "0 auto"}}>
			          <div>
			          	<Flexbox flexDirection="column" style={{position:"fixed",left:5}}>
				          	<Link to='/'><FlatButton onClick={this.changeNav.bind(this)} style={{textAlign:"left"}}>Home</FlatButton></Link>
				          	<Link to='/comparisons'><FlatButton onClick={this.changeNav.bind(this)}>Comparisons</FlatButton></Link>
			          	</Flexbox>
			          	<PageSwitch/>
			          </div>
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
	  else {
	  	return(
	  		<MuiThemeProvider>
	        <div>
			    	<AppBar showMenuIconButton={false} titleStyle={{boxFlex:0, flex:0}} style={{ position: "fixed", backgroundColor: "white" }}>
			        <Flexbox flexDirection="column" flexWrap="wrap" justifyContent="center" style={{margin: "0 auto"}}>
			          <div>
			          	<Flexbox flexDirection="column" style={{position:"fixed",left:5}}>
				          	<Link to='/'><FlatButton onClick={this.changeNav.bind(this)} style={{textAlign:"left"}}>Home</FlatButton></Link>
				          	<Link to='/comparisons'><FlatButton onClick={this.changeNav.bind(this)}>Comparisons</FlatButton></Link>
			          	</Flexbox>
			          </div>
			          <Flexbox flexDirection="row" justifyContent="space-between">
			            <Flexbox flexDirection="row" style={{width:"130px",height:"28px",paddingTop:"8px"}}>
			              <div>Career</div>
			              <Toggle style={{width:"50px"}} onToggle={this.toggleCompareBy.bind(this)}/>
			              <div>By Year</div>
			            </Flexbox>
			          </Flexbox>
			        </Flexbox>
			      </AppBar>
			    </div>
				</MuiThemeProvider>
	  	);
	  }
  }
}