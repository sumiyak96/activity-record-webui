import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AggregateActivity, AggregateActivityResponse } from './Activity';

interface ActivitySummaryGraphProps {
    data: AggregateActivityResponse | undefined;
}

interface GraphData {
    term: string;
    [key: string]: string | number;
}

const ActivitySummaryGraph: React.FC<ActivitySummaryGraphProps> = ({ data }) => {
    const graphData = (data: AggregateActivityResponse): GraphData[] => {
        const result: GraphData[] = [];

        data.aggregateActivities.forEach(item => {
            const existingTerm = result.find(termItem => termItem.term === item.aggregateTerm);
            if (existingTerm) {
                existingTerm[item.subCategoryName || 'other'] = item.activityCount;
            } else {
                const newTerm = {
                    term: item.aggregateTerm,
                    [item.subCategoryName || 'other']: item.activityCount
                } as GraphData
                result.push(newTerm);
            }
        });

        return result;
    };
    const processedGraphData = data ? graphData(data) : []

    const subCategoryNames: string[] = processedGraphData
        .reduce((acc: string[], item) => {
            Object.keys(item).forEach(key => {
                if (key !== 'term' && !acc.includes(key)) {
                    acc.push(key);
                }
            });
            return acc;
        }, [])
        .sort();

    const getColor = (index: number): string => {
        // 色の配列または色を生成するロジック
        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#8dd1e1'];
        return colors[index % colors.length];
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={processedGraphData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="term" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                {subCategoryNames.map((name, index) => (
                    <Bar dataKey={name} stackId="a" fill={getColor(index)} key={name} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ActivitySummaryGraph;
