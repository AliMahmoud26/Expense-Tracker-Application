'use client'
import IncomeBarChart from '@/app/components/BarChart';
import { expenseTrends, expenseSources } from '../../data/Data';
import ExpenseLineChart from '@/app/components/ExpenseLineChart';

const Expense = () => {
  return (
    <main className='w-full max-w-[1800px] px-4 mx-auto'>
      <section className="income-overview w-full bg-white shadow-sm shadow-black/20 p-8 rounded-lg mb-5">
        <div className="income-header flex justify-between mb-[2rem]">
          <div className="income-title">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Expense Overview</h2>
            <p className='text-gray-400 mt-[-20px] text-[0.875rem]'>Track your spending trends over time and gain insight into where your money goes</p>
          </div>
          <div className="add-income">
            <button className='btn text-[0.875rem] text-white font-bold bg-purple-400 rounded-sm border-1 border-purple-400 py-[0.5rem] px-[2rem] outline-[0] duration-400 ease-in-out hover:bg-purple-200 hover:border-purple-200 hover:text-purple-400 cursor-pointer'>
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
          <h1 className='font-bold text-xl text-gray-800'>All Expanses</h1>
        </div>
        
        <div className="expense-sources-holder flex flex-wrap gap-10">
          {/* Left Column - 50% width */}
          <div className="left-expense-sources w-full md:w-[calc(48%-12px)]">
            {expenseSources.slice(0, Math.ceil(expenseSources.length/2)).map((source) => (
              <div 
                className={`flex justify-between items-center gap-4 mb-6 ${source.type || ''}`} 
                key={source.id}
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
              </div>
            ))}
          </div>

          {/* Right Column - 50% width */}
          <div className="right-expense-sources w-full md:w-[calc(48%-12px)]">
            {expenseSources.slice(Math.ceil(expenseSources.length/2)).map((source) => (
              <div 
                className={`flex justify-between items-center gap-4 mb-6 ${source.type || ''}`} 
                key={source.id}
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Expense