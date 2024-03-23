import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';

const drawerWidth = 240;

const Menu: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="ホーム" />
        </ListItemButton>
        <ListItemButton component={Link} to="/activity/register">
          <ListItemText primary="イベント登録" />
        </ListItemButton>
        <ListItemButton component={Link} to="/activity/list">
          <ListItemText primary="イベント一覧" />
        </ListItemButton>
        <ListItemButton component={Link} to="/category/list">
          <ListItemText primary="カテゴリー一覧" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Menu;
