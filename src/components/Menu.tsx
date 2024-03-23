import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">ホーム</Link></li>
        <li><Link to="/activity/register">イベント登録</Link></li>
        <li><Link to="/activity/list">イベント一覧</Link></li>
        <li><Link to="/category/list">カテゴリー一覧</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
