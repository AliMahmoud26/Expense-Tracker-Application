import { FaBox, FaChartBar, FaLightbulb, FaMoneyBillWave, FaPiggyBank, FaShoppingBag, FaSuitcase, FaWallet, FaWater } from "react-icons/fa";

export const dashboardData = [
    {
        id: 1,
        icon: <FaWallet className="text-2xl text-white" />,
        title: 'Total Balance',
        amount: 10050,
        iconBgColor: 'bg-purple-400',
        chartColor: '#06b6d4',
    },
    {
        id:2,
        icon: <FaMoneyBillWave className="text-2xl text-white" />,
        title: 'Total Income',
        amount: 12400,
        iconBgColor: 'bg-orange-400',
        chartColor: '#22c55e',
    },
    {
        id: 3,
        icon: <FaPiggyBank className="text-2xl text-white" />,
        title: 'Total Expenses',
        amount: 2350,
        iconBgColor: 'bg-red-500',
        chartColor: '#ef4444',
    }
];

// Data for the Transactions Component in The Dashboard Page
export const recentTransactions = [
    {
        id: 1,
        icon : <FaShoppingBag className="" />,
        title: 'Shopping',
        date: '3rd May 2025',
        amount: '-$1000',
        type: 'expense',
        iconColor: 'text-cyan-800',
        textColor: 'text-red-600',
        textBgColor: 'bg-red-200',
    },
    {
        id: 2,
        icon : <FaBox className="" />,
        title: 'DSL Bill',
        date: '2nd May 2025',
        amount: '-$500',
        type: 'expense',
        iconColor: 'text-cyan-800',
        textColor: 'text-red-600',
        textBgColor: 'bg-red-200',
    },
    {
        id: 3,
        icon : <FaMoneyBillWave className="" />,
        title: 'Water bill',
        date: '2nd May 2025',
        amount: '-$150',
        type: 'expense',
        iconColor: 'text-cyan-800',
        textColor: 'text-red-600',
        textBgColor: 'bg-red-200',
    },
    {
        id: 4,
        icon : <FaLightbulb className="" />,
        title: 'Electrcity bill',
        date: '1st May 2025',
        amount: '-$700',
        type: 'expense',
        iconColor: 'text-cyan-800',
        textColor: 'text-red-600',
        textBgColor: 'bg-red-200',
    },
    {
        id: 5,
        icon : <FaSuitcase className="" />,
        title: 'Salary',
        date: '28th April 2025',
        amount: '+$12400',
        type: 'income',
        iconColor: 'text-cyan-800',
        textColor: 'text-green-600',
        textBgColor: 'bg-green-200',
    },
    {
        id: 6,
        icon : <FaShoppingBag className="" />,
        title: 'Shopping',
        date: '22th April 2025',
        amount: '-$1200',
        type: 'expense',
        iconColor: 'text-cyan-800',
        textColor: 'text-red-600',
        textBgColor: 'bg-red-200',
    },
]

// Data specifically formatted for the pie chart - Dashboard Page
export const pieChartData = dashboardData.map(item => ({
  name: item.title,
  value: item.amount,
  color: item.chartColor
}));

// Data specifically formatted for the bar chart - Income Page
export const incomeData = [
  { 
    month: 'January',
    salary: 12400,
    freelance: 13525,
    investments: 21500,
  },
  { 
    month: 'February',
    salary: 12400,
    freelance: 8550,
    investments: 16000,
  },
];

// Data specifically formatted for the line chart - Expense Page
export const expenseTrends = [
  { month: 'Jan', expenses: 3200, budget: 3000 },
  { month: 'Feb', expenses: 2800, budget: 3000 },
  { month: 'Mar', expenses: 3500, budget: 3000 },
  { month: 'Apr', expenses: 2900, budget: 3000 },
  { month: 'May', expenses: 4200, budget: 3000 },
  { month: 'Jun', expenses: 3100, budget: 3000 },
];

// Income Sources
// export const incomeSources = [
//     {
//         id: 1,
//         icon : <FaSuitcase className="" />,
//         title: 'Salary',
//         date: '28th April 2025',
//         amount: '12400',
//         type: 'income',
//         iconColor: 'text-cyan-800',
//         textColor: 'text-green-600',
//         textBgColor: 'bg-green-200',
//     },
//     {
//         id: 2,
//         icon : <FaSuitcase className="" />,
//         title: 'Salary',
//         date: '28th April 2025',
//         amount: '12400',
//         type: 'income',
//         iconColor: 'text-cyan-800',
//         textColor: 'text-green-600',
//         textBgColor: 'bg-green-200',
//     },
// ]

// Expense Sources
// export const expenseSources = [
//     {
//         id: 1,
//         icon : <FaShoppingBag className="" />,
//         title: 'Shopping',
//         date: '3rd May 2025',
//         amount: '-$1000',
//         type: 'expense',
//         iconColor: 'text-cyan-800',
//         textColor: 'text-red-600',
//         textBgColor: 'bg-red-200',
//     },
//     {
//         id: 2,
//         icon : <FaBox className="" />,
//         title: 'DSL Bill',
//         date: '2nd May 2025',
//         amount: '-$500',
//         type: 'expense',
//         iconColor: 'text-cyan-800',
//         textColor: 'text-red-600',
//         textBgColor: 'bg-red-200',
//     },
// ]