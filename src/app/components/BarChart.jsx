'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

const IncomeBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const incomeSources = JSON.parse(localStorage.getItem('incomeSources')) || [];
      
      // Group income by month and category
      const monthlyIncome = incomeSources.reduce((acc, income) => {
        const date = new Date(income.date);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const monthYear = `${month} ${year}`;
        
        if (!acc[monthYear]) {
          acc[monthYear] = {
            month: monthYear,
            salary: 0,
            freelance: 0,
            investments: 0,
            other: 0
          };
        }
        
        // Categorize income
        if (income.title.toLowerCase().includes('salary')) {
          acc[monthYear].salary += income.amount;
        } else if (income.title.toLowerCase().includes('freelance')) {
          acc[monthYear].freelance += income.amount;
        } else if (income.title.toLowerCase().includes('investment')) {
          acc[monthYear].investments += income.amount;
        } else {
          acc[monthYear].other += income.amount;
        }
        
        return acc;
      }, {});

      // Convert to array format for chart
      const formattedData = Object.values(monthlyIncome).sort((a, b) => 
        new Date(a.month) - new Date(b.month)
      );

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
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value}`} />
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
          <Bar 
            dataKey="other" 
            stackId="a" 
            fill="#8b5cf6" 
            name="Other Income"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeBarChart;