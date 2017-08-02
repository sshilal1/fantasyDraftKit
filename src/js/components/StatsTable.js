import React from "react";
import axios from 'axios';
import Flexbox from 'flexbox-react';

import RushingStatLine from './StatLines/RushingStatLine';
import RushingHeader from './StatLines/RushingHeader';
import ReceivingStatLine from './StatLines/ReceivingStatLine';
import ReceivingHeader from './StatLines/ReceivingHeader';
import PassingStatLine from './StatLines/PassingStatLine';
import PassingHeader from './StatLines/PassingHeader';

export default class StatsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
    	rushingstats: [{
        "yr": "2016",
        "tm": "NYG",
        "gm": "14",
        "att": "112",
        "yds": "456",
        "avg": "4.1",
        "lng": "22",
        "td": "0",
        "fd": "22",
        "fmt": "1",
        "fml": "0"
      }],
    	receivingstats: [{
        "yr": "2016",
        "tm": "NYG",
        "gm": "14",
        "rec": "15",
        "tar": "24",
        "yds": "162",
        "avg": "10.8",
        "lng": "67",
        "td": "0",
        "fd": "6",
        "fmt": "0",
        "fml": "0"
      }],
    	passingstats: [{
        "yr": "2016",
        "tm": "NYG",
        "gm": "14",
        "cmp": "0",
        "att": "0",
        "cpct": "0.0",
        "yds": "0",
        "avg": "0.00",
        "td": "0",
        "lng": "0",
        "i": "0",
        "fmt": "0",
        "qbr": "--",
        "rat": "0.0"
      }],
      fetched: false
    }
  }

  componentDidMount() {
    if ((!this.props.rookie) && (!this.state.fetched)) {
      axios.post('/stats', {
        id: this.props.id
      })
      .then((result)=> {
        console.log(result);
        /*
        this.setState({
          rushingstats: result.data.rushingstats,
          receivingstats: result.data.receivingstats,
          passingstats: result.data.passingstats,
          fetched: true
        })*/
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {

    const { rushingstats,receivingstats,passingstats } = this.state;

    const RushingStats = rushingstats.map((season) => {
        return <RushingStatLine {...season}/>;
    });
    const ReceivingStats = receivingstats.map((season) => {
        return <ReceivingStatLine key={season.yr} {...season}/>;
    });
    const PassingStats = passingstats.map((season) => {
        return <PassingStatLine key={season.yr} {...season}/>;
    });

    const style = {
      width: "45px",
      height: "20px",
      textAlign: "center"
    };

    return (
      <div>
        <RushingHeader/>
        {RushingStats}
        <ReceivingHeader/>
        {ReceivingStats}
        <PassingHeader/>
        {PassingStats}
      </div>
    );
  }

}