import React from "react";
import Flexbox from 'flexbox-react';

export default class RushingBlockHeader extends React.Component {
  render() {
    return (
    	<Flexbox className="text" style={{flex:1.2}} justifyContent="space-between">
        <div className="ComparisonStatItem">Att</div>
        <div className="ComparisonStatItem">Yards</div>
        <div className="ComparisonStatItem">Avg</div>
        <div className="ComparisonStatItem">TD's</div>
        <div className="ComparisonStatItem">Fum</div>
      </Flexbox>
    );
  }
}