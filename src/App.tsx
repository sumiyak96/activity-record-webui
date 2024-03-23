import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Home from "./home/Home";
import Menu from "./components/Menu";
import ActivityRegister from "./activity/ActivityRegister";
import ActivityList from "./activity/ActivityList";
import CategoryList from "./category/CategoryList";

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              行動記録アプリ
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Menu />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar /> {/* 追加: コンテンツがAppBar下に隠れないようにする */}
          <Routes>
            <Route path="/activity/register" element={<ActivityRegister />} />
            <Route path="/activity/list" element={<ActivityList />} />
            <Route path="/category/list" element={<CategoryList />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

// ReactDOM.renderの呼び出し部分は変更なしでそのまま利用します。
ReactDOM.render(<App />, document.getElementById("root"));


export default App;
