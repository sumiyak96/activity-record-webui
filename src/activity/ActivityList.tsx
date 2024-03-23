// src/activity/ActivityList.tsx

import React, { useState, useEffect } from 'react';
import ServerAdapter from '../api/ServerAdapter';

interface Activity {
  userId: string;
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  eventDate: string; // YYYY-MM-DD形式を想定
  memo: string;
}

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await ServerAdapter.getActivities("user1");
        setActivities(response.activities);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h2>Activity List</h2>
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>
              <h3>Date: {activity.eventDate}</h3>
              <p>Category: {activity.categoryName} (ID: {activity.categoryId})</p>
              <p>SubCategory: {activity.subCategoryName} (ID: {activity.subCategoryId})</p>
              <p>Memo: {activity.memo}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  );
};

export default ActivityList;
