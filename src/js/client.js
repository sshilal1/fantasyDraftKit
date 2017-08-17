import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  BrowserRouter,
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

const App = (pagename) => (
  <div>
    <TopNavBar page={pagename.pagename} />
    <Main />
  </div>
)

// This demo uses a HashRouter instead of BrowserRouter
// because there is no server to match URLs
ReactDOM.render((
  <BrowserRouter>
    <App pagename={"test"} />
  </BrowserRouter>
), document.getElementById('app'))