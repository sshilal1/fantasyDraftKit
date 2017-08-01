import React from "react";
import axios from 'axios';

import RushingStatLine from './StatLines/RushingStatLine';
//import ReceivingStatLine from './StatLines/ReceivingStatLine';
//import PassingStatLine from './StatLines/PassingStatLine';

export default class StatsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
    	rushingstats: [],
    	receivingstats: [],
    	passingstats: [],
      fetched: false
    }
  }

  componentDidMount() {

    if ((!this.props.rookie) && (!this.state.fetched)) {
      axios.post('/stats', {
        id: this.props.id
      })
      .then(function (response) {
        console.log(response);

        for (var season in response.data.rushingstats) {
          //this.rushingstats.push(response.data.rushingstats[season]);
          console.log(response.data.rushingstats[season]);
        }
        for (var season in response.data.receivingstats) {
          //this.receivingstats.push(response.data.receivingstats[season]);
          console.log(response.data.receivingstats[season]);
        }
        for (var season in response.data.passingstats) {
          //this.passingstats.push(response.data.passingstats[season]);
          console.log(response.data.passingstats[season]);
        }

        this.setState({
          fetched: true
        })
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {

    const { rushingstats,receivingstats,passingstats } = this.state;

    const RushingStats = rushingstats.map((season) => {
        return <RushingStatLine key={season.yr} {...season}/>;
    });
    /*const ReceivingStats = receivingstats.map((season) => {
        return <ReceivingStatLine key={season.yr} {...season}/>;
    });
    const PassingStats = passingstats.map((season) => {
        return <PassingStatLine key={season.yr} {...season}/>;
    });*/

    return (
      <div>
        <div>Rushing Stats</div>
        <div>Year, Team, Games, Atempts, Yards, Average, Longest, Touchdowns, FirstDowns, TotalFumbles, FumblesLost</div>
        <div>{RushingStats}</div>
      </div>
    );
  }

}