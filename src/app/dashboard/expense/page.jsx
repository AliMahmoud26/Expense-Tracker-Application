'use client'
import ExpenseLineChart from '@/app/components/ExpenseLineChart';
import { expenseTrends as initialExpenseTrends, expenseSources as initialExpenseSources } from '../../data/Data';
import Crud from '../../data/Crud';
import { useState, useEffect } from 'react';

const Expense = () => {
  const [showCrud, setShowCrud] = useState(false);
  const [expenseSources, setExpenseSources] = useState([]);
  const [editingSource, setEditingSource] = useState(null);
  const [expenseTrends, setExpenseTrends] = useState(initialExpenseTrends);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedSources = JSON.parse(localStorage.getItem('expenseSources')) || initialExpenseSources;
    const savedTrends = JSON.parse(localStorage.getItem('expenseTrends')) || initialExpenseTrends;
    setExpenseSources(savedSources);
    setExpenseTrends(savedTrends);
  }, []);

  // Save to localStorage whenever expenseSources or expenseTrends changes
  useEffect(() => {
    localStorage.setItem('expenseSources', JSON.stringify(expenseSources));
    localStorage.setItem('expenseTrends', JSON.stringify(expenseTrends));
  }, [expenseSources, expenseTrends]);

  const handleAddExpense = () => {
    setEditingSource(null);
    setShowCrud(true);
  };

  const handleSaveExpense = (newSource) => {
    if (editingSource) {
      // Update existing source
      const updatedSources = expenseSources.map(source => 
        source.id === editingSource.id ? newSource : source
      );
      setExpenseSources(updatedSources);
    } else {
      // Add new source with unique ID
      newSource.id = Date.now().toString();
      setExpenseSources([...expenseSources, newSource]);
    }

    // Update chart data
    updateChartData(newSource);
    setShowCrud(false);
  };

  const updateChartData = (source) => {
    const date = new Date(source.date);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const monthYear = `${month} ${year}`;
    
    setExpenseTrends(prevData => {
      const existingMonth = prevData.find(item => item.month === monthYear);
      
      if (existingMonth) {
        return prevData.map(item => 
          item.month === monthYear 
            ? { ...item, expense: item.expense + source.amount } 
            : item
        );
      } else {
        return [...prevData, { month: monthYear, expense: source.amount }];
      }
    });
  };

  const handleEdit = (source) => {
    setEditingSource(source);
    setShowCrud(true);
  };

  const handleDelete = (id) => {
    const sourceToDelete = expenseSources.find(source => source.id === id);
    
    // Update expense sources
    const updatedSources = expenseSources.filter(source => source.id !== id);
    setExpenseSources(updatedSources);

    // Update chart data by subtracting the deleted amount
    if (sourceToDelete) {
      const date = new Date(sourceToDelete.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;
      
      setExpenseTrends(prevData => {
        return prevData.map(item => 
          item.month === monthYear 
            ? { ...item, expense: Math.max(0, item.expense - sourceToDelete.amount) } 
            : item
        ).filter(item => item.expense > 0);
      });
    }
  };

  return (
    <main className='w-full max-w-[1800px] px-4 mx-auto relative'>
      {/* Overlay when CRUD is open */}
      {showCrud && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setShowCrud(false)}
        ></div>
      )}

      <section className="income-overview w-full bg-white shadow-sm shadow-black/20 p-8 rounded-lg mb-5">
        <div className="income-header flex justify-between mb-[2rem]">
          <div className="income-title">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Expense Overview</h2>
            <p className='text-gray-400 mt-[-20px] text-[0.875rem]'>Track your spending trends over time and gain insight into where your money goes</p>
          </div>
          <div className="add-income">
            <button 
              onClick={handleAddExpense}
              className='btn text-[0.875rem] text-white font-bold bg-purple-400 rounded-sm border-1 border-purple-400 py-[0.5rem] px-[2rem] outline-[0] duration-400 ease-in-out hover:bg-purple-200 hover:border-purple-200 hover:text-purple-400 cursor-pointer'
            >
              Add Expense
            </button>
          </div>
        </div>
        <div className="w-full">
          <ExpenseLineChart data={expenseTrends} />
        </div>
      </section>

      <section className="expense-sources w-full bg-white shadow-sm shadow-black/20 p-8 rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className='font-bold text-xl text-gray-800'>All Expenses</h1>
        </div>
        
        <div className="expense-sources-holder flex flex-wrap gap-10">
          {/* Left Column */}
          <div className="left-expense-sources w-full md:w-[calc(48%-12px)]">
            {expenseSources.slice(0, Math.ceil(expenseSources.length/2)).map((source) => (
              <ExpenseSourceItem 
                key={source.id} 
                source={source} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="right-expense-sources w-full md:w-[calc(48%-12px)]">
            {expenseSources.slice(Math.ceil(expenseSources.length/2)).map((source) => (
              <ExpenseSourceItem 
                key={source.id} 
                source={source} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </section>

      {showCrud && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="crud w-[600px]">
            <Crud 
              onSave={handleSaveExpense} 
              onCancel={() => setShowCrud(false)}
              editingSource={editingSource}
              isExpense={true}
            />
          </div>
        </div>
      )}
    </main>
  )
}

const ExpenseSourceItem = ({ source, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className={`flex justify-between items-center gap-4 mb-6 ${source.type || ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="expense-source-details flex items-center gap-4 w-full">
        <div className={`text-xl bg-gray-200 p-4 rounded-full ${source.iconColor || ''}`}>
          {source.icon}
        </div>
        <div className="flex-grow">
          <h2 className="mb-1 font-bold text-cyan-800 tracking-wide">{source.title}</h2>
          <p className="text-sm text-gray-500">{source.date}</p>
        </div>
        <div className="amount-number">
          <p className={`py-1 px-3 rounded-sm text-sm ${source.textBgColor || ''} ${source.textColor || ''}`}>
            ${source.amount.toLocaleString()}
          </p>
        </div>
      </div>
      
      {showActions && (
        <div className="actions flex gap-2 ml-4">
          <button 
            onClick={() => onEdit(source)}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(source.id)}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Expense;