export enum AggregateUnit {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
}

// 表示用のラベルマッピング
export const AggregateUnitLabels: { [key in AggregateUnit]: string } = {
    [AggregateUnit.DAY]: '日',
    [AggregateUnit.WEEK]: '週',
    [AggregateUnit.MONTH]: '月',
    [AggregateUnit.YEAR]: '年',
};

export interface AggregateActivityRequest {
    categoryId: number;
    subCategoryId?: number;
    aggregateUnit: AggregateUnit;
    fromDate?: string | undefined; // ISO format (YYYY-MM-DD)
    toDate?: string | undefined; // ISO format (YYYY-MM-DD)
}

export interface AggregateActivityResponse {
    aggregateUnit: AggregateUnit;
    aggregateActivities: AggregateActivity[];
}

export interface AggregateActivity {
    categoryId: number;
    categoryName: string;
    subCategoryId?: number;
    subCategoryName?: string;
    aggregateTerm: string;
    aggregateStartDate: string; // ISO format (YYYY-MM-DD)
    aggregateEndDate: string; // ISO format (YYYY-MM-DD)
    activityCount: number;
}
