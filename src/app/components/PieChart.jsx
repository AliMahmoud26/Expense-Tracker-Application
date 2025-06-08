'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const PieChartComponent = () => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const incomeSources = JSON.parse(localStorage.getItem('incomeSources')) || [];
      const expenseSources = JSON.parse(localStorage.getItem('expenseSources')) || [];
      
      // Calculate total income
      const totalIncome = incomeSources.reduce((sum, item) => sum + item.amount, 0);
      
      // Calculate total expenses
      const totalExpenses = expenseSources.reduce((sum, item) => sum + item.amount, 0);
      
      // Calculate savings
      const savings = Math.max(0, totalIncome - totalExpenses);
      
      setPieData([
        { name: 'Income', value: totalIncome, color: '#10b981' },
        { name: 'Expenses', value: totalExpenses, color: '#ef4444' },
        { name: 'Savings', value: savings, color: '#6366f1' }
      ]);
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
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;