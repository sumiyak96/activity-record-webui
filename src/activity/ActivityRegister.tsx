import React, { useState, useEffect } from 'react';
import ServerAdapter from '../api/ServerAdapter';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Typography, SelectChangeEvent } from '@mui/material';

interface Category {
  categoryId: number;
  categoryName: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  subCategoryId: number;
  subCategoryName: string;
}

interface Activity {
  userId: string;
  categoryId: number;
  subCategoryId: number;
  eventDate: string; // YYYY-MM-DD形式を想定
  memo: string;
}

const ActivityRegister: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activity, setActivity] = useState<Activity>({
    userId: "user1",
    categoryId: 0,
    subCategoryId: 0,
    eventDate: '',
    memo: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await ServerAdapter.getCategories("user1");
      setCategories(response.categories);
    };
    fetchCategories();
  }, []);

  const handleChange = (e: any) => {
    const name = e.target.name as keyof Activity;
    const value = e.target.value;
    const updatedValue = name === 'categoryId' || name === 'subCategoryId' ? parseInt(value as string, 10) || 0 : value;
    setActivity({ ...activity, [name]: updatedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(activity);
    ServerAdapter.registerActivity(activity);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6">イベント登録</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-select-label">カテゴリ</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          name="categoryId"
          value={activity.categoryId}
          label="カテゴリ"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>選択してください</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="subCategory-select-label">サブカテゴリ</InputLabel>
        <Select
          labelId="subCategory-select-label"
          id="subCategory-select"
          name="subCategoryId"
          value={activity.subCategoryId}
          label="サブカテゴリ"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>選択してください</em>
          </MenuItem>
          {categories.find(cat => cat.categoryId === activity.categoryId)?.subCategories.map((subCategory) => (
            <MenuItem key={subCategory.subCategoryId} value={subCategory.subCategoryId}>
              {subCategory.subCategoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        fullWidth
        id="eventDate"
        label="実施日"
        type="date"
        name="eventDate"
        value={activity.eventDate}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        id="memo"
        label="メモ（100文字以内）"
        name="memo"
        value={activity.memo}
        onChange={handleChange}
        inputProps={{ maxLength: 100 }}
        multiline
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        登録
      </Button>
    </Box>
  );
};

export default ActivityRegister;
