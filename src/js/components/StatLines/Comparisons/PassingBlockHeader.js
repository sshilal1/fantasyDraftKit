import React from "react";
import Flexbox from 'flexbox-react';

export default class PassingBlockHeader extends React.Component {
  render() {
    return (
    	<Flexbox className="text" style={{flex:1.2}} justifyContent="space-between">
        <div className="ComparisonStatItem" style={{flex:5}}>Completion %</div>
        <div className="ComparisonStatItem" style={{flex:2}}>Yards</div>
        <div className="ComparisonStatItem">TD's</div>
        <div className="ComparisonStatItem">Int</div>
      </Flexbox>
    );
  }
}