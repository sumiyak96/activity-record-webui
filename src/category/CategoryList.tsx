import React, { useState, useEffect } from 'react';
import ServerAdapter from '../api/ServerAdapter';
import { Category, RegisterSubCategoryRequest, SubCategory, UpdateSubCategoryRequest } from './Category'; // カテゴリとサブカテゴリの型定義をインポート
import CategoryEditor from './CategoryEditor';
import SubCategoryList from './SubCategoryList';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubCategoryListOpen, setIsSubCategoryListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); // 編集するカテゴリを保持する状態
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
    // 実際の削除処理
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category); // 編集するカテゴリを設定
    setIsModalOpen(true); // エディターモーダルを開く
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
    setIsSubCategoryListOpen(true)
  };
  return (
    <div>
      <h2>Category List</h2>
      <button onClick={() => { setIsModalOpen(true); setSelectedCategory(null); }}>Add New Category</button>
      {isModalOpen && (
        <CategoryEditor
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          category={selectedCategory} // 編集するカテゴリの情報を渡す
        />
      )}
      {isSubCategoryListOpen && (
        <SubCategoryList
          isOpen={isSubCategoryListOpen}
          onClose={() => setIsSubCategoryListOpen(false)}
          subCategories={selectedCategory!.subCategories}
          categoryId={selectedCategory!.categoryId}
        />
      )}
      <table>
        {/* テーブルのヘッダーとボディ */}
        {categories.map((category) => (
          <tr key={category.categoryId}>
            <td>{category.categoryId}</td>
            <td>{category.categoryName}</td>
            <td>
              <button onClick={() => handleDelete(category.categoryId)}>Delete</button>
              <button onClick={() => handleEdit(category)}>Edit</button> {/* 詳細を編集に変更 */}
              <button onClick={() => handleShowSubCategories(category)}>Show SubCategories</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CategoryList;
