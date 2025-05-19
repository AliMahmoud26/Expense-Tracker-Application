'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseLineChart = ({ data }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
            labelFormatter={(month) => `Month: ${month}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444" // Red color for expenses
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Total Expenses"
          />
          <Line
            type="monotone"
            dataKey="budget"
            stroke="#10b981" // Green color for budget
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Budget"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseLineChart;