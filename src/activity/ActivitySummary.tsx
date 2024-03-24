import React, { useState, useEffect, ReactNode } from 'react';
import {
    Container,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
    Paper,
    SelectChangeEvent,
} from '@mui/material';
import ServerAdapter from '../api/ServerAdapter';
import { Category, SubCategory } from '../category/Category';
import { AggregateActivityRequest, AggregateActivityResponse, AggregateUnit, AggregateUnitLabels } from './Activity';
import ActivitySummaryGraph from './ActivitySummaryGraph';

const ActivitySummary = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>();
    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);
    const [aggregateUnit, setAggregateUnit] = useState<AggregateUnit>(AggregateUnit.MONTH);
    const [aggregateActivities, setAggregateActivities] = useState<AggregateActivityResponse>();

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await ServerAdapter.getCategories("user1");
            setCategories(response.categories);
            if (response.categories.length > 0) {
                setSelectedCategory(response.categories[0]);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = async () => {
        const request: AggregateActivityRequest = {
            categoryId: selectedCategory!.categoryId,
            subCategoryId: selectedSubCategory?.subCategoryId,
            aggregateUnit: aggregateUnit!,
            fromDate: fromDate ?? undefined,
            toDate: toDate ?? undefined,
        };

        const response = await ServerAdapter.aggregateActivities(request);
        setAggregateActivities(response);
    };

    const handleCategoryChange = (event: SelectChangeEvent<number>, child: ReactNode) => {
        const categoryId = event.target.value as number;
        const category = categories.find((c) => c.categoryId === categoryId);
        setSelectedCategory(category || undefined);
        setSelectedSubCategory(undefined);
    };

    const handleSubCategoryChange = (event: SelectChangeEvent<number>, child: ReactNode) => {
        const subCategoryId = event.target.value as number;
        const subCategory = selectedCategory && selectedCategory.subCategories.find((sc) => sc.subCategoryId === subCategoryId);
        setSelectedSubCategory(subCategory || undefined);
    };

    const handleChangeAggregateUnit = (event: SelectChangeEvent<number>, child: ReactNode) => {
        setAggregateUnit(event.target.value as AggregateUnit);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>イベントサマリー</Typography>
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="category-label">カテゴリ</InputLabel>
                        <Select
                            labelId="category-label"
                            value={selectedCategory ? selectedCategory.categoryId : ''}
                            onChange={handleCategoryChange}
                            label="カテゴリ"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="sub-category-label">サブカテゴリ</InputLabel>
                        <Select
                            labelId="sub-category-label"
                            value={selectedSubCategory ? selectedSubCategory.subCategoryId : ''}
                            onChange={handleSubCategoryChange}
                            label="サブカテゴリ"
                            disabled={!selectedCategory}
                        >
                            {selectedCategory ? selectedCategory.subCategories.map((subCategory) => (
                                <MenuItem key={subCategory.subCategoryId} value={subCategory.subCategoryId}>
                                    {subCategory.subCategoryName}
                                </MenuItem>
                            )) : null}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        label="fromDate"
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        label="toDate"
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="aggregate-unit-select-label">集計単位</InputLabel>
                        <Select
                            labelId="aggregate-unit-select-label"
                            value={''}
                            onChange={handleChangeAggregateUnit}
                            label="集計単位"
                        >
                            {Object.entries(AggregateUnitLabels).map(([key, label]) => (
                                <MenuItem key={key} value={key}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleSearch}>
                表示
            </Button>

            <ActivitySummaryGraph data={aggregateActivities} />
        </Container>
    );
};

export default ActivitySummary;
