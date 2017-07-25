import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Players from "./pages/Players";
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <Players />
</Provider>, app);
