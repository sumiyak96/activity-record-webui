import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import ServerAdapter from '../api/ServerAdapter';

interface Activity {
  id: number;
  categoryId: number;
  subCategoryId: number;
  eventDate: string;
  memo: string;
}

const Home: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // ここでAPIから活動リストをフェッチする想定
    const fetchActivities = async () => {
      const response = await ServerAdapter.getActivities("user1");
      setActivities(response);
    };

    fetchActivities();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px' }}>
        <Menu />
      </div>
      <div style={{ flex: 1 }}>
        {/* メインコンテンツ */}
        <h1>ホームページへようこそ</h1>
        {/* メインコンテンツの追加 */}
      </div>
    </div>
  );
};

export default Home;
