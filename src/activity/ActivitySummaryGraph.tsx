import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AggregateActivity, AggregateActivityResponse } from './Activity';

interface ActivitySummaryGraphProps {
    data: AggregateActivityResponse | undefined;
}

const ActivitySummaryGraph: React.FC<ActivitySummaryGraphProps> = ({ data }) => {
    // データを加工して、Rechartsで扱いやすい形式にする
    const graphData = data?.aggregateActivities.map(activity => ({
        term: activity.aggregateTerm,
        activityCount: activity.activityCount,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={graphData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="term" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="activityCount" name="活動回数" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ActivitySummaryGraph;
