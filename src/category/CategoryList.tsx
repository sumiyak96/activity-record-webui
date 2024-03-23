import React, { useState, useEffect } from 'react';
import ServerAdapter from '../api/ServerAdapter';
import { Category, RegisterSubCategoryRequest, SubCategory, UpdateSubCategoryRequest } from './Category'; // カテゴリとサブカテゴリの型定義をインポート
import CategoryEditor from './CategoryEditor';
import SubCategoryList from './SubCategoryList';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubCategoryListOpen, setIsSubCategoryListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ServerAdapter.getCategories("user1");
        setCategories(response.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId: number) => {
    console.log(`Delete category with ID: ${categoryId}`);
    // 実際の削除処理をここに実装
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSave = async (category: any) => {
    // カテゴリの保存処理
    setIsModalOpen(false); // エディターモーダルを閉じる
    setSelectedCategory(null); // 選択されたカテゴリをリセット
    if (category.categoryId) {
      ServerAdapter.updateCategory(category)
    } else {
      ServerAdapter.registerCategory(category)
    }
  };

  const handleShowSubCategories = (category: Category) => {
    setSelectedCategory(category); // 編集するカテゴリを設定
    setSelectedSubCategory(category.subCategories); // 選択されたサブカテゴリを設定
    setIsSubCategoryListOpen(true);
  };

  return (
    <Paper>
      <h2>カテゴリ一覧</h2>
      <Button variant="contained" color="primary" onClick={() => { setIsModalOpen(true); setSelectedCategory(null); }}>
        新規カテゴリー
      </Button>
      {isModalOpen && (
        <CategoryEditor
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          category={selectedCategory}
        />
      )}
      {isSubCategoryListOpen && selectedCategory && (
        <SubCategoryList
          isOpen={isSubCategoryListOpen}
          onClose={() => setIsSubCategoryListOpen(false)}
          subCategories={selectedCategory!.subCategories}
          categoryId={selectedCategory!.categoryId}
        />
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>カテゴリ名</TableCell>
            <TableCell>編集</TableCell>
            <TableCell>削除</TableCell>
            <TableCell>サブカテゴリ一覧</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.categoryId}>
              <TableCell>{category.categoryId}</TableCell>
              <TableCell>{category.categoryName}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleEdit(category)}>編集</Button>
              </TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => handleDelete(category.categoryId)}>削除</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleShowSubCategories(category)}>サブカテゴリ一覧</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CategoryList;
