import React, { useState, useEffect } from 'react';

const Crud = ({ onSave, onCancel, editingSource, isExpense = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    icon: isExpense ? '🛒' : '💰',
    iconColor: isExpense ? 'bg-red-100' : 'bg-yellow-100',
    textBgColor: isExpense ? 'bg-red-100' : 'bg-green-100',
    textColor: isExpense ? 'text-red-800' : 'text-green-800'
  });

  const expenseCategories = [
    'Groceries', 'Rent', 'Utilities', 'Transportation', 
    'Entertainment', 'Dining Out', 'Healthcare', 'Education'
  ];
  
  const incomeCategories = [
    'Salary', 'Freelance', 'Investment', 'Bonus', 'Other'
  ];

  useEffect(() => {
    if (editingSource) {
      setFormData({
        title: editingSource.title,
        amount: editingSource.amount,
        date: editingSource.date,
        icon: editingSource.icon,
        iconColor: editingSource.iconColor,
        textBgColor: editingSource.textBgColor,
        textColor: editingSource.textColor
      });
    } else {
      // Reset form when adding new item
      setFormData({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        icon: isExpense ? '🛒' : '💰',
        iconColor: isExpense ? 'bg-red-100' : 'bg-yellow-100',
        textBgColor: isExpense ? 'bg-red-100' : 'bg-green-100',
        textColor: isExpense ? 'text-red-800' : 'text-green-800'
      });
    }
  }, [editingSource, isExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const source = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date,
      type: isExpense ? 'expense-source' : 'income-source'
    };
    onSave(source);
  };

  const icons = isExpense ? [
    { emoji: '🛒', color: 'bg-red-100' },
    { emoji: '🏠', color: 'bg-blue-100' },
    { emoji: '🚗', color: 'bg-yellow-100' },
    { emoji: '🍔', color: 'bg-green-100' },
    { emoji: '💊', color: 'bg-purple-100' },
  ] : [
    { emoji: '💰', color: 'bg-yellow-100' },
    { emoji: '💼', color: 'bg-blue-100' },
    { emoji: '🏦', color: 'bg-green-100' },
    { emoji: '📈', color: 'bg-purple-100' },
    { emoji: '💳', color: 'bg-red-100' },
  ];

  return (
    <div className='crud-functionalities flex flex-col gap-4 bg-white shadow-lg shadow-black/30 p-8 rounded-lg w-[600px]'>
      <h1 className='font-bold text-xl text-gray-800'>
        {editingSource ? `Edit ${isExpense ? 'Expense' : 'Income'}` : `Add ${isExpense ? 'Expense' : 'Income'}`}
      </h1>
      
      <div className="icon">
        <p className='mb-2 font-medium text-gray-700'>Choose Icon</p>
        <div className="flex gap-2">
          {icons.map((icon, index) => (
            <button
              key={index}
              type="button"
              className={`text-xl p-3 rounded-full ${icon.color} ${formData.icon === icon.emoji ? 'ring-2 ring-purple-600' : ''} hover:scale-105 transition-transform`}
              onClick={() => setFormData({
                ...formData, 
                icon: icon.emoji, 
                iconColor: icon.color,
                textBgColor: icon.color,
                textColor: icon.color.includes('red') ? 'text-red-800' : 
                          icon.color.includes('green') ? 'text-green-800' :
                          icon.color.includes('blue') ? 'text-blue-800' :
                          icon.color.includes('yellow') ? 'text-yellow-800' :
                          'text-purple-800'
              })}
            >
              {icon.emoji}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="first-child flex justify-between items-center gap-4">
          <div className="amount-of-money flex flex-col gap-1 w-full">
            <label htmlFor="amount" className="font-medium text-gray-700">Amount</label>
            <input 
              className='outline-none border border-gray-300 py-2 px-4 rounded-md text-gray-800 focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
              type="number" 
              name="amount" 
              id="amount" 
              placeholder='Enter amount'
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="date flex flex-col gap-1 w-full">
            <label htmlFor="date" className="font-medium text-gray-700">Date</label>
            <input 
              className='outline-none border border-gray-300 py-2 px-4 rounded-md text-gray-800 focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
              type="date" 
              name="date" 
              id="date" 
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="second-child">
          <div className="money-source flex flex-col gap-1">
            <label htmlFor="title" className="font-medium text-gray-700">{isExpense ? 'Category' : 'Source'}</label>
            <select 
              className='outline-none border border-gray-300 py-2 px-4 rounded-md text-gray-800 focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
              name="title" 
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            >
              <option value="">Select {isExpense ? 'Category' : 'Source'}</option>
              {(isExpense ? expenseCategories : incomeCategories).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-3 mt-4">
          <button 
            type="submit"
            className='flex-1 py-2 px-4 bg-purple-500 text-white font-medium rounded-md hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2'
          >
            {editingSource ? `Update ${isExpense ? 'Expense' : 'Income'}` : `Add ${isExpense ? 'Expense' : 'Income'}`}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className='flex-1 py-2 px-4 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Crud;