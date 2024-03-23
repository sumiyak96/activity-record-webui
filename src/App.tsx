import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes, // SwitchからRoutesへ変更
  Route,
  Link
} from "react-router-dom";

import Home from "./home/Home";
import Menu from "./components/Menu";
import ActivityRegister from "./activity/ActivityRegister";
import ActivityList from "./activity/ActivityList";
import CategoryList from "./category/CategoryList";

function App() {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/activity/register" element={<ActivityRegister />} />
          <Route path="/activity/list" element={<ActivityList />} />
          <Route path="/category/list" element={<CategoryList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
