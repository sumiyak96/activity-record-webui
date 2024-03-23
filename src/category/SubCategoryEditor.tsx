import React, { useState, useEffect } from 'react';
import { RegisterSubCategoryRequest, SubCategory, UpdateSubCategoryRequest } from './Category';
import { Button, Modal, Box, TextField } from '@mui/material';

interface SubCategoryEditorProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (subCategory: RegisterSubCategoryRequest | UpdateSubCategoryRequest) => void;
    selectedCategoryId: number;
    subCategory?: SubCategory | null;
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SubCategoryEditor: React.FC<SubCategoryEditorProps> = ({
    isOpen,
    onClose,
    onSave,
    selectedCategoryId,
    subCategory: initialSubCategory
}) => {
    const [subCategoryName, setSubCategoryName] = useState('');

    useEffect(() => {
        setSubCategoryName(initialSubCategory ? initialSubCategory.subCategoryName : '');
    }, [initialSubCategory]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (initialSubCategory) {
            onSave({
                subCategoryId: initialSubCategory.subCategoryId,
                subCategoryName
            });
        } else {
            onSave({
                categoryId: selectedCategoryId,
                subCategoryName
            });
        }
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="sub-category-editor-title"
            aria-describedby="sub-category-editor-description"
        >
            <Box sx={modalStyle}>
                <h2 id="sub-category-editor-title">{initialSubCategory ? 'サブカテゴリ編集' : '新規サブカテゴリ追加'}</h2>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="subCategoryName"
                        label="サブカテゴリ名"
                        name="subCategoryName"
                        value={subCategoryName}
                        onChange={(e) => setSubCategoryName(e.target.value)}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mr: 2 }}
                        >
                            保存
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                        >
                            キャンセル
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default SubCategoryEditor;
