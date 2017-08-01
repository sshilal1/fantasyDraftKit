import React from "react";

export default class StatsTable extends React.Component {
  constructor() {
    super();
    this.state = { 
    	rushingstats: {},
    	receivingstats: {},
    	passingstats: {}
    }
  }
  componentDidMount() {
    fetchStats(comments =>
      this.setState({ comments: comments }));
  }
  render() {
    return (
      <ul>
        {this.state.comments.map(c => (
          <li>{c.body}—{c.author}</li>
        ))}
      </ul>
    );
  }
}

// This is just a placeholder for a real request
const fetchSomeComments = cb =>
  cb([
    { author: "Chan", body: "You look nice today." },
    { author: "You", body: "I know, right?!" }
  ]);