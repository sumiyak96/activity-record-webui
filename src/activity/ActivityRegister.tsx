import React, { useState, useEffect } from 'react';
import ServerAdapter from '../api/ServerAdapter';

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
    userId: string
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

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'categoryId' || name === 'subCategoryId' ? parseInt(value, 10) || 0 : value;
    setActivity({ ...activity, [name]: updatedValue });
};

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(activity);
        ServerAdapter.registerActivity(activity);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>行動登録</h2>
            <div>
                <label>
                    カテゴリ:
                    <select name="categoryId" value={activity.categoryId} onChange={handleChange}>
                        <option value="">選択してください</option>
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    サブカテゴリ:
                    <select name="subCategoryId" value={activity.subCategoryId} onChange={handleChange}>
                        <option value="">選択してください</option>
                        {categories.find(cat => cat.categoryId === activity.categoryId)?.subCategories.map((subCategory) => (
                            <option key={subCategory.subCategoryId} value={subCategory.subCategoryId}>
                                {subCategory.subCategoryName}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <label>
                    実施日:
                    <input type="date" name="eventDate" value={activity.eventDate} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    メモ（100文字以内）:
                    <textarea name="memo" value={activity.memo} onChange={handleChange} maxLength={100} />
                </label>
            </div>
            <button type="submit">登録</button>
        </form>
    );
};

export default ActivityRegister;
