import React, { useState, useEffect } from 'react';
import { Category, RegisterCategoryRequest, UpdateCategoryRequest } from './Category'; // 適切な型をインポート

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: RegisterCategoryRequest | UpdateCategoryRequest) => void;
  category?: Category | null; // 初期値または編集対象のカテゴリ
}

const CategoryEditor: React.FC<Props> = ({ isOpen, onClose, onSave, category: initialCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  // 編集対象のカテゴリ情報がある場合は、フォームの初期値を設定
  useEffect(() => {
    if (initialCategory) {
      setCategoryName(initialCategory.categoryName);
    } else {
      // 新規追加の場合は初期値をリセット
      setCategoryName('');
    }
  }, [initialCategory]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 新規追加と更新を区別して処理
    if (initialCategory) {
      // 更新処理
      const updateData: UpdateCategoryRequest = {
        categoryId : initialCategory.categoryId,
        categoryName : categoryName
      };
      onSave(updateData);
    } else {
      // 新規追加処理
      const newData: RegisterCategoryRequest = {
        categoryName : categoryName
      };
      onSave(newData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{ border: '2px solid black', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white' }}>
      <h2>{initialCategory ? 'Edit Category' : 'Add New Category'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name:</label>
          <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CategoryEditor;
