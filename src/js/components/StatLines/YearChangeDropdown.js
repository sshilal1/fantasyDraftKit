import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import * as PlayerActions from "../../actions/PlayerActions";

export default class YearChangeDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.seasons[0],
      seasons: props.seasons
    };
  }

  handleChange(event,key,value) {
    console.log(value);
    this.setState({value: value});
    PlayerActions.changeComparisonYear(value);
  }

  render() {

    const {seasons} = this.state;

    var items = [];
    for (var season of seasons) {
      items.push(<MenuItem value={season} key={season} primaryText={season} />);
    }

    return (
      <DropDownMenu underlineStyle={{display:"none"}} maxHeight={200} value={this.state.value} onChange={this.handleChange.bind(this)}>
        {items}
      </DropDownMenu>
    );
  }
}