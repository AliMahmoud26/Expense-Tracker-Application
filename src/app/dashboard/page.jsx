'use client';
import { FaArrowRight, FaWallet } from 'react-icons/fa';
import { dashboardData, pieChartData } from '../data/Data';
import PieChartComponent from '../components/PieChart';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);

  // Load transactions from localStorage
  useEffect(() => {
    const loadTransactions = () => {
      const incomeSources = JSON.parse(localStorage.getItem('incomeSources')) || [];
      const expenseSources = JSON.parse(localStorage.getItem('expenseSources')) || [];
      
      // Combine and sort by date (newest first)
      const allTransactions = [...incomeSources, ...expenseSources]
        .map(transaction => ({
          ...transaction,
          // Add type for styling
          type: transaction.type || (transaction.textBgColor?.includes('red') ? 'expense' : 'income')
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5); // Get only the 5 most recent

      setRecentTransactions(allTransactions);
    };

    loadTransactions();

    // Add event listener for storage changes
    window.addEventListener('storage', loadTransactions);
    
    return () => {
      window.removeEventListener('storage', loadTransactions);
    };
  }, []);

  return (
    <main className="w-full px-4 mx-auto max-w-[1800px]">
      {/* Stats Cards Section */}
      <section className="flex justify-between items-center gap-4 mb-8">
        {dashboardData.map((item) => (
          <div 
            className="flex items-center gap-4 bg-white shadow-sm shadow-black/20 w-full py-6 pl-4 rounded-lg" 
            key={item.id}
          >
            <div className={`bg-cyan-600 p-4 rounded-full ${item.iconBgColor || ''}`}>
              {item.icon}
            </div>
            <div>
              <h2 className="mb-1 font-bold text-cyan-800 tracking-wide">{item.title}</h2>
              <p className="text-2xl">${item.amount.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Transactions and Pie Chart Section */}
      <section className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Recent Transactions Component */}
        <div className="w-full lg:w-[49%] bg-white shadow-sm shadow-black/20 p-8 rounded-lg">
          <div className="flex justify-between items-center mb-8">
            <h1 className='font-bold text-xl text-gray-800'>Recent Transactions</h1>
            <Link href='/dashboard/transactions'>
              <button className='flex items-center gap-2 bg-gray-200 rounded-sm py-2 px-5 text-sm text-cyan-800 cursor-pointer'>
                See All <FaArrowRight />
              </button>
            </Link>
          </div>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <div 
                className={`flex justify-between items-center gap-4 mb-6 ${transaction.type || ''}`} 
                key={transaction.id}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-xl bg-gray-200 p-4 rounded-full ${transaction.iconColor || ''}`}>
                    {transaction.icon}
                  </div>
                  <div>
                    <h2 className="mb-1 font-bold text-cyan-800 tracking-wide">{transaction.title}</h2>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <p className={`py-1 px-3 rounded-sm text-sm ${transaction.textBgColor || ''} ${transaction.textColor || ''}`}>
                  ${transaction.amount.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent transactions found
            </div>
          )}
        </div>

        {/* Pie Chart Component */}
        <div className="w-full lg:w-[49%] bg-white shadow-sm shadow-black/20 p-8 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Financial Overview</h2>
          <div className="h-[400px] w-full">
            <PieChartComponent data={pieChartData} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;