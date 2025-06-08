'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

const ExpenseLineChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const expenseSources = JSON.parse(localStorage.getItem('expenseSources')) || [];
      
      // Group expenses by month
      const monthlyExpenses = expenseSources.reduce((acc, expense) => {
        const date = new Date(expense.date);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const monthYear = `${month} ${year}`;
        
        if (!acc[monthYear]) {
          acc[monthYear] = 0;
        }
        acc[monthYear] += expense.amount;
        
        return acc;
      }, {});

      // Convert to array format for chart
      const formattedData = Object.entries(monthlyExpenses).map(([month, expenses]) => ({
        month,
        expenses
      })).sort((a, b) => new Date(a.month) - new Date(b.month));

      setChartData(formattedData);
    };

    loadData();
    window.addEventListener('storage', loadData);
    
    return () => {
      window.removeEventListener('storage', loadData);
    };
  }, []);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
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
            stroke="#ef4444"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Total Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseLineChart;