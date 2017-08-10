import React from "react";
import ReactDOM from "react-dom";
//import { Router, Route, IndexRoute } from "react-router";
import {
  HashRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Players from "./pages/Players";
import Comparisons from "./pages/Comparisons";

//const app = document.getElementById('app');
//ReactDOM.render(<Players/>, app);

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Players}/>
      <Route path='/comparisons' component={Comparisons}/>
    </Switch>
  </main>
)

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/comparisons'>Comparisons</Link></li>
      </ul>
    </nav>
  </header>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

// This demo uses a HashRouter instead of BrowserRouter
// because there is no server to match URLs
ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'))