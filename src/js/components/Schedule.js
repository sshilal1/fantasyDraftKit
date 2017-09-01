import React from "react";
import Flexbox from 'flexbox-react';

export default class Schedule extends React.Component {
  render() {

    const {matchups} = this.props;
    console.log(matchups);

    const ScheduleList = matchups.map((week) => {
    	if (parseInt(week.week))
      	return <div key={week.week}>{week.week} | {week.teamid}</div>;
      else
      	return null;
    });

    return (
      <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="space-between" style={{width:"250px"}}>
        {ScheduleList}
      </Flexbox>
    );
  }
}