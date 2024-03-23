import React, { useState, useEffect } from 'react';
import ServerAdapter from '../api/ServerAdapter';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
      <h2>イベント一覧</h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>SubCategory</TableCell>
              <TableCell>Memo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{activity.eventDate}</TableCell>
                <TableCell>{activity.categoryName}</TableCell>
                <TableCell>{activity.subCategoryName}</TableCell>
                <TableCell>{activity.memo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {activities.length === 0 && <p>No activities found.</p>}
    </div>
  );
};

export default ActivityList;
