import React, { useState } from 'react';
import ServerAdapter from '../api/ServerAdapter';
import { RegisterSubCategoryRequest, SubCategory, UpdateSubCategoryRequest } from './Category';
import SubCategoryEditor from './SubCategoryEditor';
import { Button, Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  isOpen: boolean;
  categoryId: number;
  subCategories: SubCategory[];
  onClose: () => void;
}

const SubCategoryList: React.FC<Props> = ({ isOpen, categoryId, subCategories, onClose }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);

  const handleEditClick = (subCategory: SubCategory) => {
    setEditingSubCategory(subCategory);
    setIsEditorOpen(true);
  };

  const handleDeleteClick = async (subCategoryId: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this subcategory?");
    if (isConfirmed) {
      // 削除処理を実装
    }
  };

  const handleAddClick = () => {
    setEditingSubCategory(null);
    setIsEditorOpen(true);
  };

  const handleSave = async (subCategoryRequest: RegisterSubCategoryRequest | UpdateSubCategoryRequest) => {
    if ('subCategoryId' in subCategoryRequest) {
      await ServerAdapter.updateSubCategory(subCategoryRequest);
    } else {
      await ServerAdapter.registerSubCategory({ ...subCategoryRequest, categoryId });
    }
    setIsEditorOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>サブカテゴリ一覧</h2>
        <Button variant="contained" color="primary" onClick={handleAddClick}>新規サブカテゴリ追加</Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>サブカテゴリ名</TableCell>
                <TableCell align="right">編集</TableCell>
                <TableCell align="right">削除</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategories.map((subCategory) => (
                <TableRow key={subCategory.subCategoryId}>
                  <TableCell component="th" scope="row">
                    {subCategory.subCategoryName}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEditClick(subCategory)} color="primary">編集</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteClick(subCategory.subCategoryId)} color="secondary">削除</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isEditorOpen && (
          <SubCategoryEditor
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            onSave={handleSave}
            selectedCategoryId={categoryId}
            subCategory={editingSubCategory}
          />
        )}
      </Box>
    </Modal>
  );
};

export default SubCategoryList;
