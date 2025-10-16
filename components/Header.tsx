
import React from 'react';
import { useAuth } from '../App';
import { LogoIcon } from './icons/LogoIcon';

const Header: React.FC = () => {
  const { logout } = useAuth();
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
        <div className="flex items-center">
            <LogoIcon className="h-8 w-8 text-[#00A79D]" />
            <h1 className="text-xl font-semibold text-slate-800 ml-2">CareVision</h1>
        </div>
        <button
            onClick={logout}
            className="bg-[#00A79D] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#00897b] transition duration-300 text-sm"
        >
            Logout
        </button>
    </header>
  );
};

export default Header;
