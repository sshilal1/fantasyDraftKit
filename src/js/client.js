import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";
import Switch from "./components/SwitchTest";
import Players from "./pages/Players";

const app = document.getElementById('app');

// do this for standard layout
//ReactDOM.render(<Layout/>, app);
// do this for new card layout
ReactDOM.render(<Switch/>, app);
