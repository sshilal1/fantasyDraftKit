import React from "react";
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FlatButton,TextField,Toggle,AppBar} from 'material-ui';
import {
  HashRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import CustomTextField from '../components/CustomTextField';
import CompareAllSwitch from '../components/CompareAllSwitch';

import PageSwitch from '../components/PageSwitch';
import GlobalRankSwitch from '../components/GlobalRankSwitch';
import * as PlayerActions from "../actions/PlayerActions";
import PlayerStore from "../stores/PlayerStore";
import ComparisonStore from "../stores/ComparisonStore";
import ComparisonNotification from '../components/StatLines/Comparisons/ComparisonNotification';
import YearChangeDropdown from '../components/StatLines/YearChangeDropdown';

export default class TopNavBar extends React.Component {

	constructor() {
		super();
		//this.focusInput = this.focusInput.bind(this);
		this.updateComparisonCount = this.updateComparisonCount.bind(this);
		this.state = {
			nav:"home",
			comparisons: []
		}
	}

	/*focusInput() {
		if (this.input)
			this.input.focus();
	}

	componentDidMount() {
    this.focusInput();
  }

    <Toggle style={{width:"50px"}} onToggle={this.toggleCompareBy.bind(this)}/>
  <div style={{minWidth:"100px"}}>By Year</div>

	*/
  componentWillMount() {
  	ComparisonStore.on("compare", this.updateComparisonCount);
    //PlayerStore.on("change", this.focusInput);
    //PlayerStore.on("hide", this.focusInput);
  }

  componentWillUnmount() {
  	ComparisonStore.removeListener("compare", this.updateComparisonCount);
    //PlayerStore.removeListener("change", this.focusInput);
    //PlayerStore.removeListener("hide", this.focusInput);
  }

  updateComparisonCount() {

  	const comparisons = ComparisonStore.getAll();
  	console.log("Updating comparisons...");
  	this.setState({
  		comparisons: comparisons
  	})

  	if (comparisons.length > 0) {
  		console.log("Found some Comparisons!", comparisons.length);
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

  changeNavH() {
  	this.setState({
  		nav: "home",
  	})
  }

  changeNavC() {
  	this.setState({
  		nav: "compare",
  	})
  }

  render() {

  	var comparisoncount = this.state.comparisons.length;
  	
  	var seasons = [];
  	for (var player of this.state.comparisons) {
  		player.stats.passingstats.forEach(function(season) {
				if (!_.includes(seasons, season.yr)) {
				  seasons.push(season.yr);
				}
			});
  		player.stats.rushingstats.forEach(function(season) {
				if (!_.includes(seasons, season.yr)) {
				  seasons.push(season.yr);
				}
			});
			player.stats.receivingstats.forEach(function(season) {
				if (!_.includes(seasons, season.yr)) {
				  seasons.push(season.yr);
				}
			});
  	}
  	seasons.sort(function(a, b) {return b.yr - a.yr});
		
  	console.log("Count at render",comparisoncount);

  	const selected = "rgba(47,144,195,.5)";
    const non = "rgba(0,0,0,0)";

  	if (this.state.nav == "home") {
	    return (
	    	<MuiThemeProvider>
	        <div>
			    	<AppBar showMenuIconButton={false} titleStyle={{boxFlex:0, flex:0}} style={{ position: "fixed", backgroundColor: "#c0c0c0" }}>
			        <Flexbox flexDirection="column" style={{width:"200px"}}>
		          	<Link to='/'>
		          		<FlatButton hoverColor="#79b5d4"
		          			backgroundColor={this.state.nav == "home" ? selected : non}
		          			className="text xlarge start"
		          			onClick={this.changeNavH.bind(this)}>Home
		          		</FlatButton>
		          	</Link>
		          	<Link to='/comparisons'>
		          		<Flexbox flexDirection="row">
			          		<FlatButton hoverColor="#79b5d4"
			          			backgroundColor={this.state.nav == "home" ? non : selected}
			          			className="text"
			          			onClick={this.changeNavC.bind(this)}>Comparisons
			          		</FlatButton>
			          		<ComparisonNotification count={comparisoncount}/>
			          	</Flexbox>
		          	</Link>
	          	</Flexbox>
			        <Flexbox flexDirection="column" flexWrap="wrap" justifyContent="center" style={{margin: "0 auto"}}>
		          	<PageSwitch/>
			          <Flexbox flexDirection="row" justifyContent="space-between">
			            <GlobalRankSwitch/>
			            <CustomTextField inputRef={input => this.input = input}/>
			          </Flexbox>
			        </Flexbox>
			        <Flexbox flexDirection="column" style={{width:"200px"}}>
			        	<div className="kavoon xlarge" style={{color:"#2f90c3"}}>Fantasy Draft Kit</div>
			        	<div className="kavoon">Stephen Shilale</div>
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
			    	<AppBar showMenuIconButton={false} titleStyle={{boxFlex:0, flex:0}} style={{ position: "fixed", backgroundColor: "#c0c0c0" }}>
			        <Flexbox flexDirection="column" style={{width:"200px"}}>
		          	<Link to='/'>
		          		<FlatButton hoverColor="#79b5d4" 
		          			backgroundColor={this.state.nav == "home" ? selected : non}
		          			className="text xlarge start"
		          			onClick={this.changeNavH.bind(this)}>Home
		          		</FlatButton>
		          	</Link>
		          	<Link to='/comparisons'>
		          		<Flexbox flexDirection="row">
			          		<FlatButton hoverColor="#79b5d4" 
			          			backgroundColor={this.state.nav == "home" ? non : selected} 
			          			className="text" 
			          			onClick={this.changeNavC.bind(this)}>Comparisons
			          		</FlatButton>
			          		<ComparisonNotification count={comparisoncount}/>
			          	</Flexbox>
		          	</Link>
	          	</Flexbox>
							<Flexbox flexDirection="row" style={{height:"28px",paddingTop:"8px", margin: "0 auto"}}>
	              <Flexbox style={{height: "38px", alignItems: "flex-end"}} >Season</Flexbox>
	              <YearChangeDropdown seasons={seasons}/>
	            </Flexbox>
			        <Flexbox flexDirection="column" style={{width:"200px"}}>
			        	<div className="kavoon xlarge" style={{color:"#2f90c3"}}>Fantasy Draft Kit</div>
			        	<div className="kavoon">Stephen Shilale</div>
			        </Flexbox>
			      </AppBar>
			    </div>
				</MuiThemeProvider>
	  	);
	  }
  }
}