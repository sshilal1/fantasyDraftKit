import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Players from "./pages/Players";
import Comparisons from "./pages/Comparisons";
import TopNavBar from "./components/TopNavBar";

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

const App = () => (
  <div>
    <TopNavBar />
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