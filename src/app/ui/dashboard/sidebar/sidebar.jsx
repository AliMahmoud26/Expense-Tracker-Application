'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react'
import Dashboard_Logo from '../../../../../public/profile_image.jpg';
import { FaChevronLeft, FaChartBar, FaCog, FaShieldAlt, FaQuestionCircle, FaHome, FaWallet, FaSignOutAlt } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  
  const menuItems = [
    {
        name: "Dashboard",
        icon: <FaHome />,
        href: '/dashboard'
    },
    {
        name: "Income",
        icon: <FaWallet />,
        href: '/dashboard/income'
    },
    {
        name: "Expense",
        icon: <FaChartBar />,
        href: '/dashboard/expense'
    },
    {
        name: "Settings",
        icon: <FaCog />,
        href: '/dashboard/settings'
    },
    {
        name: "Help",
        icon: <FaQuestionCircle />,
        href: '/dashboard/help'
    },
    {
        name: "Privacy",
        icon: <FaShieldAlt />,
        href: '/dashboard/privacy'
    },
    {
        name: "Logout",
        icon: <FaSignOutAlt />,
        href: '/dashboard/logout'
    },
    ]

  const handleItemClick = (item) => {
    setActiveItem(item);
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <aside className={`h-screen ${isCollapsed ? 'w-[80px]' : 'w-[250px]'}`}>
      <nav className='h-full flex flex-col bg-white border-r border-gray-200 shadow-sm'>
        <div className='flex justify-between items-center p-[20px] border-gray-200 border-b-1 mb-[30px] cursor-pointer'>
          <Link href='/dashboard' className="flex items-center gap-1">
            {!isCollapsed && (
              <Image src={Dashboard_Logo} alt='Dashboard-Logo' width={50} height={50} />
            )}
            {!isCollapsed && <span className='text-[1rem]'>Welcome Ali</span>}
          </Link>
          <button onClick={toggleSidebar} className='ml-[5px] p-2 text-[.875rem] rounded-lg text-sky-500 bg-gray-100 duration-400 ease-in-out cursor-pointer hover:bg-gray-200'>
            <FaChevronLeft className={`${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <ul className='sidebar flex flex-col ms-[10px] flex-1 px-3'>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`text-[1.125rem] mb-3 p-2 cursor-pointer font-semibold rounded-lg duration-500 flex items-center gap-3
                ${pathname === item.href ? 'bg-sky-500 text-white translate-x-[5px]' : 'text-cyan-800 hover:text-sky-500 hover:bg-gray-200 hover:translate-x-[5px]'}
                ${isCollapsed ? 'w-[40px]' : 'w-40'} overflow-hidden transition-all duration-300`}
              >
                <span>{item.icon}</span>
                <span className={`${isCollapsed ? 'hidden' : 'whitespace-nowrap'}`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar