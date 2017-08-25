import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import BioTable from './BioTable';
import StatsTable from './StatsTable';

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

    const { id,rookie,age,height,weight,experience,college,teamid,position } = this.props;

    if(this.props.stattable) {
      var table = <StatsTable id={id} rookie={rookie} teamid={teamid}/>;
    }
    else {
      var table = <BioTable id={id} teamid={teamid} position={position} age={age} height={height} weight={weight} experience={experience} college={college}/>;
    }

    return (
      <div>
        <FlatButton style={{minWidth:"50px"}} onClick={this.handleTouchTap} label={this.props.text} className="text" />
        <Popover style={{minWidth:"550px"}}
          open={this.state.open}
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
