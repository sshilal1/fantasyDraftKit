import React from 'react';

export default class PSwitch extends React.Component {
  
  constructor() {
    super();

    this.state = {
      bg1: "red",
      bg2: "blue",
      bg3: "blue",
      bg4: "blue"
    }
  }

  choose1() {
    this.setState({
      bg1: "red",
      bg2: "blue",
      bg3: "blue",
      bg4: "blue"
    })
  }
  choose2() {
    this.setState({
      bg1: "blue",
      bg2: "red",
      bg3: "blue",
      bg4: "blue"
    })
  }
  choose3() {
    this.setState({
      bg1: "blue",
      bg2: "blue",
      bg3: "red",
      bg4: "blue"
    })
  }
  choose4() {
    this.setState({
     	bg1: "blue",
      bg2: "blue",
      bg3: "blue",
      bg4: "red"
    })
  }

  setNum(num) {
    console.log(num);
  }

  render() {

   	const {bg1,bg2,bg3,bg4} = this.state;

    return (
      <div>
        <button style={{color: bg1}} onClick={this.choose1.bind(this)}>One</button>
        <button style={{color: bg2}} onClick={this.choose2.bind(this)}>Two</button>
        <button style={{color: bg3}} onClick={this.setNum(3)}>Three</button>
        <button style={{color: bg4}} onClick={this.choose4.bind(this)}>Four</button>
      </div>
    );
  }
}