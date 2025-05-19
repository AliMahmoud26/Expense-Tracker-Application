'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeBarChart = ({ data }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
          />
          <Legend />
          <Bar 
            dataKey="salary" 
            stackId="a" 
            fill="#6366f1" 
            name="Salary"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="freelance" 
            stackId="a" 
            fill="#10b981" 
            name="Freelance"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="investments" 
            stackId="a" 
            fill="#f59e0b" 
            name="Investments"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeBarChart;