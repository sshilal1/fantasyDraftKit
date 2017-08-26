import React from "react";
import Flexbox from 'flexbox-react';

export default class ReceivingBlockHeader extends React.Component {
  render() {
    return (
    	<Flexbox className="text" style={{flex:1}} justifyContent="space-between">
        <div className="ComparisonStatItem">Tar</div>
        <div className="ComparisonStatItem">Rec</div>
        <div className="ComparisonStatItem">Yards</div>
        <div className="ComparisonStatItem">TD's</div>
      </Flexbox>
    );
  }
}