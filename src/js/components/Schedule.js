import React from "react";
import Flexbox from 'flexbox-react';

export default class Schedule extends React.Component {
  render() {

    const {matchups} = this.props;
    console.log(matchups);

    const ScheduleList = matchups.map((week) => {
      return (
        <div key={week.week}>{week.week} {week.teamid}</div>
      );
    });

    return (
      <Flexbox flexDirection="row" flexWrap="wrap" justifyContent="space-between" style={{width:"250px"}}>
        {ScheduleList}
      </Flexbox>
    );
  }
}