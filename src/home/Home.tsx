import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import ServerAdapter from '../api/ServerAdapter';
import ActivitySummary from '../activity/ActivitySummary';

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
      <ActivitySummary />
    </div>
  );
};

export default Home;
