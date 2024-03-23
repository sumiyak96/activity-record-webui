export interface Category {
    categoryId: number;
    categoryName: string;
    subCategories: SubCategory[];
}

export interface SubCategory {
    subCategoryId: number;
    subCategoryName: string;
}

export interface RegisterCategoryRequest {
    categoryName: string;
}

export interface RegisterSubCategoryRequest {
    categoryId: number;
    subCategoryName: string;
}

export interface UpdateCategoryRequest {
    categoryId: number;
    categoryName: string;
}

export interface UpdateSubCategoryRequest {
    subCategoryId: number;
    subCategoryName: string;
}