import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import BioTable from './BioTable';
import StatsTable from './StatsTable';
import * as PlayerActions from "../actions/PlayerActions";

export default class ButtonDrop extends React.Component {

  constructor(props) {
    super(props);
		
    this.state = {
      open: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.open !== nextState.open) {
      return true;
    }
    return false;
  }

  compare() {
    const player = this.props;
    console.log("test");
    PlayerActions.comparePlayer(player);
    console.log("test2");
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {

    const { id,rookie,age,height,weight,experience,college,teamid } = this.props;

    if(this.props.stattable) {
      var table = <StatsTable id={id} rookie={rookie} teamid={teamid}/>;
    }
    else {
      var table = <BioTable id={id} age={age} height={height} weight={weight} experience={experience} college={college}/>;
    }

    return (
      <div>
        <FlatButton onClick={this.compare.bind(this)} label="c" className="text" />
        <FlatButton onClick={this.handleTouchTap} label={this.props.text} className="text" />
        <Popover open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}>
          {table}
        </Popover>
      </div>
    );
  }
}
