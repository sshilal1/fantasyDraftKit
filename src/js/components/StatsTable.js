import React from "react";
import axios from 'axios';

export default class StatsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id
    	rushingstats: {},
    	receivingstats: {},
    	passingstats: {}
    }
  }

  componentDidMount() {
    axios.post('/stats', {
      id: this.props.id
    })
    .then(function (response) {
      console.log(response);

      this.state = response.data;
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>Hello</div>
    );
  }

}