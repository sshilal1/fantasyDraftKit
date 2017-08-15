import React from "react";

import * as PlayerActions from "../actions/PlayerActions";
import ComparisonStore from "../stores/PlayerStore";

export default class Comparisons extends React.Component {
  constructor() {
    super();
    this.state = {
      players: ComparisonStore.getAll()
    };
  }
  /*
  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });
    return (
      <div>
        <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    );
  }*/
  render() {
    return (
      <div style={{ paddingTop: 72 }}> Comparison Page! </div>
    )
  }
}