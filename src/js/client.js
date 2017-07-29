import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";
import Players from "./pages/Players";
import Switch from "./components/Switch";

const app = document.getElementById('app');

// do this for standard layout
//ReactDOM.render(<Layout/>, app);
// do this for new card layout
ReactDOM.render(<Players/>, app);
