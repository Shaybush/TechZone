import { Link } from 'react-router-dom';

import DarkModeToggle from '../../DarkModeToggle';

export default function Header() {
   
  return (
    <header className='relative flex h-15 w-full items-center justify-between bg-pink-200 shadow-sm dark:bg-gray-800 dark:shadow-dark-sm px-4'>
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold mr-8">TechZone</Link>
      </div>
      <DarkModeToggle size={20} />
    </header>
  );
}
