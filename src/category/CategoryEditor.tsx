import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Category, RegisterCategoryRequest, UpdateCategoryRequest } from './Category';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: RegisterCategoryRequest | UpdateCategoryRequest) => void;
  category?: Category | null;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CategoryEditor: React.FC<Props> = ({ isOpen, onClose, onSave, category: initialCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    setCategoryName(initialCategory ? initialCategory.categoryName : '');
  }, [initialCategory]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = initialCategory ? { categoryId: initialCategory.categoryId, categoryName } : { categoryName };
    onSave(data);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="category-editor-title"
      aria-describedby="category-editor-description"
    >
      <Box sx={style}>
        <Typography id="category-editor-title" variant="h6" component="h2">
          {initialCategory ? 'カテゴリ編集' : 'カテゴリ追加'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryEditor;
