
import React from 'react';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { DashboardIcon } from './icons/DashboardIcon';

const Sidebar: React.FC = () => {
    const { userRole } = useAuth();

    const getTitle = () => {
        switch (userRole) {
            case UserRole.ADMIN: return "Admin Panel";
            case UserRole.MANAGEMENT: return "Management Panel";
            case UserRole.DOCTOR: return "Doctor Panel";
            default: return "Panel";
        }
    };

  return (
    <aside className="w-64 bg-white flex-shrink-0 border-r border-slate-200">
      <div className="h-16 flex items-center justify-center border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-700">{getTitle()}</h2>
      </div>
      <nav className="p-4">
        <ul>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 bg-[#e0f2f1] text-[#00A79D] rounded-lg font-semibold"
            >
              <DashboardIcon className="w-5 h-5 mr-3" />
              Dashboard
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
