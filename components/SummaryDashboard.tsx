import React from 'react';
import { Bell, RefreshCw, Wifi, Check, Clock, Trash2, TrendingUp, Users, ShoppingBag, Receipt } from 'lucide-react';
import { Room, OrderItem } from '../types';

interface SummaryDashboardProps {
  rooms: Room[];
  orders: OrderItem[];
  revenue: number;
  pendingDeleteItems: OrderItem[];
  onApproveDelete: (id: string) => void;
  onDenyDelete: (id: string) => void;
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ 
  rooms, 
  orders, 
  revenue,
  pendingDeleteItems,
  onApproveDelete,
  onDenyDelete
}) => {
  
  const activeRooms = rooms.filter(r => r.status === 'occupied').length;
  const pendingOrdersCount = orders.length; 
  const unpaidBillsCount = rooms.filter(r => r.hasOrder).length;

  const StatCard = ({ icon, value, label, trend }: any) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-start justify-between hover:border-slate-700 transition-all cursor-default group shadow-sm">
      <div className="flex w-full justify-between items-start mb-4">
          <div className="p-3 bg-slate-800 rounded-lg text-slate-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-colors">
            {icon}
          </div>
          {trend && (
             <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {trend}
             </span>
          )}
      </div>
      <div>
        <div className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
        <div className="text-sm font-medium text-slate-400">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-slate-950 p-8 overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
           <p className="text-slate-400 text-sm">Welcome back, here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-sm font-medium transition-colors">
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {/* Live Status Stats */}
      <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <StatCard 
                icon={<Users className="w-6 h-6" />}
                value={`${activeRooms}/${rooms.length}`}
                label="Active Rooms"
                trend="+12%"
             />
             <StatCard 
                icon={<ShoppingBag className="w-6 h-6" />}
                value={pendingOrdersCount}
                label="Pending Orders"
             />
             <StatCard 
                icon={<Receipt className="w-6 h-6" />}
                value={unpaidBillsCount}
                label="Unpaid Bills"
             />
             <StatCard 
                icon={<div className="font-serif italic font-bold text-lg leading-none">$</div>}
                value={`$${revenue.toFixed(2)}`}
                label="Today's Revenue"
                trend="+8.5%"
             />
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area Placeholder / Daily Stats */}
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Daily Performance</h3>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        <Wifi className="w-3 h-3" />
                        <span>System Online</span>
                    </div>
                  </div>
                  
                  {/* Quick Stats Row */}
                  <div className="grid grid-cols-3 gap-4 py-8 border-y border-slate-800/50">
                    <div className="text-center border-r border-slate-800/50">
                        <div className="text-2xl font-bold text-white">18</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Total Bills</div>
                    </div>
                    <div className="text-center border-r border-slate-800/50">
                        <div className="text-2xl font-bold text-emerald-400">$1,995.00</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Service Charge</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-amber-500">45m</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Avg Table Time</div>
                    </div>
                  </div>
              </div>

               {/* Notifications Section */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                       <Bell className="w-5 h-5 text-amber-500" />
                       <h2 className="text-lg font-bold text-white">Recent Notifications</h2>
                   </div>
                   <button className="text-xs text-slate-400 hover:text-white">Clear All</button>
                </div>
                
                <div className="flex flex-col items-center justify-center py-8 border border-dashed border-slate-800 rounded-lg bg-slate-950/50">
                   <Bell className="w-10 h-10 text-slate-700 mb-3" />
                   <p className="text-slate-500 text-sm">No new notifications</p>
                </div>
              </div>
          </div>

          {/* Pending Delete Requests Sidebar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full">
            <div className="p-6 border-b border-slate-800">
               <div className="flex items-center gap-2">
                  <div className="relative">
                      <Clock className="w-5 h-5 text-slate-100" />
                      {pendingDeleteItems.length > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>}
                  </div>
                  <h2 className="text-lg font-bold text-white">Pending Approvals</h2>
               </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                {pendingDeleteItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-60">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-emerald-500" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">All clear!</p>
                    <p className="text-slate-600 text-xs mt-1">No pending delete requests</p>
                </div>
                ) : (
                <div className="space-y-3">
                    {pendingDeleteItems.map((item) => (
                        <div key={item.uniqueId} className="bg-slate-950 border border-slate-800 rounded-lg p-3 animate-in fade-in slide-in-from-right-4">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 shrink-0">
                                    <Trash2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm line-clamp-1">{item.name}</h3>
                                    <div className="flex gap-3 text-xs text-slate-400 mt-1">
                                        <span>Qty: {item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <span className="text-[10px] text-amber-500 font-medium mt-1 block">Waiter requested void</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    onClick={() => onDenyDelete(item.uniqueId)}
                                    className="py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded transition-colors"
                                >
                                    Deny
                                </button>
                                <button 
                                    onClick={() => onApproveDelete(item.uniqueId)}
                                    className="py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded transition-colors shadow-lg shadow-emerald-900/20"
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;