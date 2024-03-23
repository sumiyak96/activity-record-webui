import React, { useState, useEffect } from 'react';
import ServerAdapter from '../api/ServerAdapter';
import { RegisterSubCategoryRequest, SubCategory, UpdateSubCategoryRequest } from './Category';
import SubCategoryEditor from './SubCategoryEditor'; // 編集フォーム用のコンポーネント

interface Props {
  isOpen: boolean;
  categoryId: number;
  subCategories: SubCategory[];
  onClose: () => void;
}

const SubCategoryList: React.FC<Props> = ({ categoryId, subCategories, onClose }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);

  // 編集ボタンクリック時の処理
  const handleEditClick = (subCategory: SubCategory) => {
    setEditingSubCategory(subCategory);
    setIsEditorOpen(true);
  };

  // 削除ボタンクリック時の処理
  const handleDeleteClick = async (subCategoryId: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this subcategory?");
    if (isConfirmed) {
      // await ServerAdapter.deleteSubCategory(subCategoryId);
    }
  };

  // 追加ボタンクリック時の処理
  const handleAddClick = () => {
    setEditingSubCategory(null); // 新規追加の場合はnullを設定
    setIsEditorOpen(true);
  };

  // 保存処理
  const handleSave = async (subCategoryRequest: RegisterSubCategoryRequest | UpdateSubCategoryRequest) => {
    if ('subCategoryId' in subCategoryRequest) {
      await ServerAdapter.updateSubCategory(subCategoryRequest);
    } else {
      await ServerAdapter.registerSubCategory({ ...subCategoryRequest, categoryId }); // categoryIdを含めて新規追加
    }
    setIsEditorOpen(false);
  };

  return (
    <div style={{ border: '2px solid black', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white' }}>
      <h2>サブカテゴリ一覧</h2>
      <button onClick={handleAddClick}>Add SubCategory</button>
      {subCategories?.map((subCategory) => (
        <div key={subCategory.subCategoryId}>
          <span>{subCategory.subCategoryName}</span>
          <button onClick={() => handleEditClick(subCategory)}>Edit</button>
          <button onClick={() => handleDeleteClick(subCategory.subCategoryId)}>Delete</button>
        </div>
      ))}
      {isEditorOpen && (
        <SubCategoryEditor
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSave}
          selectedCategoryId={categoryId}
          subCategory={editingSubCategory}
        />
      )}
    </div>
  );
};

export default SubCategoryList;
