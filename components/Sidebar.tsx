import React from 'react';
import { LayoutDashboard, ShoppingCart, Receipt, History, BarChart3, Settings, LogOut, UtensilsCrossed, FileText } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Summary', id: 'Summary' },
    { icon: ShoppingCart, label: 'New Order', id: 'New Order' },
    { icon: Receipt, label: 'Table Bills', id: 'Table Bills' },
    { icon: History, label: 'Bill History', id: 'Bill History' },
    { icon: FileText, label: 'Day Report', id: 'Day Report' },
    { icon: Settings, label: 'Settings', id: 'Settings' },
  ];

  return (
    <div className="w-[14vw] bg-slate-950 border-r border-slate-800 flex flex-col h-full shrink-0 z-50 transition-all duration-300">
      {/* Logo Area */}
      <div className="h-24 flex flex-col items-center justify-center border-b border-slate-800/50 mb-2">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/10">
                <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div className="hidden xl:block">
                <h1 className="text-xl font-bold text-white tracking-wider leading-none">Restaurant</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">POS System</p>
            </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden xl:block">Restaurant</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-all duration-200 group relative justify-center xl:justify-start ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
            title={item.label}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
            <span className="font-medium text-sm hidden xl:block">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors justify-center xl:justify-start">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm hidden xl:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;