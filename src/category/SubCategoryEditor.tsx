import React, { useState, useEffect } from 'react';
import { Category, RegisterCategoryRequest, RegisterSubCategoryRequest, SubCategory, UpdateSubCategoryRequest } from './Category';

interface SubCategoryEditorProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (subCategory: any) => void;
    selectedCategoryId: number;
    subCategory?: SubCategory | null;
}

const SubCategoryEditor: React.FC<SubCategoryEditorProps> = ({
    isOpen,
    onClose,
    onSave,
    selectedCategoryId,
    subCategory: initialSubCategory
}) => {
    const [subCategoryName, setSubCategoryName] = useState('');

    useEffect(() => {
        if (initialSubCategory) {
            setSubCategoryName(initialSubCategory.subCategoryName);
        } else {
            setSubCategoryName('');
        }
    }, [initialSubCategory]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // 新規追加と更新を区別して処理
        if (initialSubCategory) {
            // 更新処理
            const updateData: UpdateSubCategoryRequest = {
                subCategoryId: initialSubCategory.subCategoryId,
                subCategoryName: subCategoryName
            };
            onSave(updateData);
        } else {
            // 新規追加処理
            const newData: RegisterSubCategoryRequest = {
                categoryId: selectedCategoryId,
                subCategoryName: subCategoryName
            };
            onSave(newData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="subCategoryEditor">
            <h2>{initialSubCategory ? 'Edit SubCategory' : 'Add New SubCategory'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="subCategoryName">SubCategory Name:</label>
                    <input
                        id="subCategoryName"
                        type="text"
                        value={subCategoryName}
                        onChange={(e) => setSubCategoryName(e.target.value)}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default SubCategoryEditor;
