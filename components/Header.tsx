import React from 'react';
import { User, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-40">
      
      {/* Left: Page Title */}
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {title}
        </h2>
      </div>

      {/* Right: Status & User */}
      <div className="flex items-center gap-5">
        
        <div className="hidden md:flex items-center gap-2 text-xs text-emerald-500 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           ONLINE
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-none">John Doe</p>
            <p className="text-[10px] text-slate-400 mt-1">Cashier</p>
          </div>
          <div className="w-9 h-9 bg-[#2c2049] rounded-full flex items-center justify-center ring-2 ring-slate-800 cursor-pointer hover:ring-slate-700 transition-all border border-slate-700">
            <User className="w-4 h-4 text-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;