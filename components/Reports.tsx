import React, { useState } from 'react';
import { Calendar, TrendingUp, DollarSign, Receipt, ArrowUpRight, ArrowDownRight, Filter, Package, BarChart2, Star } from 'lucide-react';

type ReportFilter = 'daily' | 'weekly' | 'monthly' | 'custom';
type ReportCategory = 'financial' | 'inventory';

const Reports: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ReportCategory>('financial');
  const [activeFilter, setActiveFilter] = useState<ReportFilter>('daily');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Mock data for Top 10 Items
  const TOP_ITEMS = [
    { name: 'Grilled Salmon', sales: 142, revenue: 4116.58 },
    { name: 'Beef Tenderloin', sales: 128, revenue: 5502.72 },
    { name: 'Caesar Salad', sales: 98, revenue: 1273.02 },
    { name: 'Truffle Fries', sales: 85, revenue: 849.15 },
    { name: 'Red Wine', sales: 74, revenue: 1405.26 },
    { name: 'Lobster Bisque', sales: 62, revenue: 1053.38 },
    { name: 'Martini', sales: 58, revenue: 927.42 },
    { name: 'Tiramisu', sales: 45, revenue: 539.55 },
    { name: 'Caprese Salad', sales: 38, revenue: 569.62 },
    { name: 'Choco Lava Cake', sales: 32, revenue: 447.68 },
  ];

  const getMockFinancialData = () => {
    switch(activeFilter) {
      case 'daily': return { revenue: 12540.50, bills: 42, avg: 298.58, growth: '+5.2%' };
      case 'weekly': return { revenue: 84250.00, bills: 285, avg: 295.61, growth: '+12.1%' };
      case 'monthly': return { revenue: 342100.00, bills: 1120, avg: 305.44, growth: '+8.4%' };
      case 'custom': return { revenue: 45200.00, bills: 154, avg: 293.50, growth: '--' };
    }
  };

  const data = getMockFinancialData();

  // Reduced StatBox size (approx 30% smaller padding and font)
  const StatBox = ({ label, value, icon, subValue, trend }: any) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
          {React.cloneElement(icon, { size: 18 })}
        </div>
        {trend && (
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
            trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
          }`}>
            {trend.startsWith('+') ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {trend}
          </span>
        )}
      </div>
      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-xl font-bold text-white tracking-tight mb-1">{value}</div>
      {subValue && <div className="text-[10px] text-slate-600 font-medium">{subValue}</div>}
    </div>
  );

  return (
    <div className="flex-1 bg-slate-950 flex flex-col h-full overflow-hidden">
      {/* Category Switching Header */}
      <div className="px-8 pt-8 flex items-center gap-8 border-b border-slate-800/50">
        <button 
          onClick={() => setActiveCategory('financial')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
            activeCategory === 'financial' ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Financial Reports
          {activeCategory === 'financial' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 animate-in slide-in-from-left-2" />}
        </button>
        <button 
          onClick={() => setActiveCategory('inventory')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
            activeCategory === 'inventory' ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Inventory Report
          {activeCategory === 'inventory' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 animate-in slide-in-from-left-2" />}
        </button>
      </div>

      <div className="p-8 shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {activeCategory === 'financial' ? 'Financial Performance' : 'Inventory & Sales Insights'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {activeCategory === 'financial' 
              ? 'Analyze your revenue and transaction health' 
              : 'Identify top performing menu items and stock trends'}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex gap-1">
            {(['daily', 'weekly', 'monthly', 'custom'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === f 
                  ? 'bg-amber-500 text-slate-950 shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {activeFilter === 'custom' && (
            <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-300">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
              />
              <span className="text-slate-600 text-xs">to</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 pt-0 custom-scrollbar">
        {activeCategory === 'financial' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Reduced Card Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatBox 
                label="Total Income" 
                value={`Rs. ${data.revenue.toLocaleString()}`} 
                icon={<DollarSign />}
                trend={data.growth}
                subValue="Excl. tax"
              />
              <StatBox 
                label="Total Bills" 
                value={data.bills} 
                icon={<Receipt />}
                subValue="Paid orders"
              />
              <StatBox 
                label="Avg. Bill" 
                value={`Rs. ${data.avg.toLocaleString()}`} 
                icon={<TrendingUp />}
                subValue="Per ticket"
              />
            </div>

            {/* Financial Table Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2 text-xs uppercase tracking-widest">
                  <Filter className="w-4 h-4 text-amber-500" />
                  Income Breakdown
                </h3>
                <button className="text-xs text-amber-500 hover:underline font-medium">Export CSV</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-950/50">
                      <th className="py-4 px-6">Period</th>
                      <th className="py-4 px-6">Bills</th>
                      <th className="py-4 px-6">Card</th>
                      <th className="py-4 px-6">Cash</th>
                      <th className="py-4 px-6 text-right">Total Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-6 text-sm text-slate-300 font-medium">
                          {activeFilter === 'monthly' ? `Month ${i}` : `Day ${i}`}
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-400">{Math.floor(Math.random() * 50) + 10}</td>
                        <td className="py-4 px-6 text-sm text-slate-400">Rs. {(Math.random() * 5000).toFixed(2)}</td>
                        <td className="py-4 px-6 text-sm text-slate-400">Rs. {(Math.random() * 3000).toFixed(2)}</td>
                        <td className="py-4 px-6 text-sm text-white font-bold text-right">
                          Rs. {(Math.random() * 8000 + 1000).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
            {/* Inventory Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatBox 
                    label="Items Sold" 
                    value="1,248" 
                    icon={<Package />}
                    subValue="Total volume"
                />
                <StatBox 
                    label="Active Menu Items" 
                    value="42" 
                    icon={<BarChart2 />}
                    subValue="In stock/active"
                />
                <StatBox 
                    label="Best Seller" 
                    value="Salmon" 
                    icon={<Star />}
                    subValue="By quantity"
                />
            </div>

            {/* Top 10 Most Sold Items Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                    <div>
                        <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-widest">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                            Top 10 Most Sold Items
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1">Showing items with highest transaction frequency</p>
                    </div>
                </div>
                
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-950/50">
                                <th className="py-4 px-6">Rank</th>
                                <th className="py-4 px-6">Item Name</th>
                                <th className="py-4 px-6">Units Sold</th>
                                <th className="py-4 px-6 text-right">Revenue Generated</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {TOP_ITEMS.map((item, index) => (
                                <tr key={item.name} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold ${
                                            index < 3 
                                            ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' 
                                            : 'bg-slate-800 text-slate-400'
                                        }`}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-200 font-bold group-hover:text-amber-500 transition-colors">
                                        {item.name}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-slate-400 font-mono w-8">{item.sales}</span>
                                            {/* Minimalist bar visualization */}
                                            <div className="hidden sm:block flex-1 max-w-[100px] h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-amber-500/60 rounded-full" 
                                                    style={{ width: `${(item.sales / TOP_ITEMS[0].sales) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-white font-bold text-right tabular-nums">
                                        Rs. {item.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-3">
          <Calendar className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-200">Reporting Insights</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {activeCategory === 'financial' 
                ? 'Reports are generated in real-time based on closed bills. Ensure all pending table bills are completed for accurate end-of-period reporting.'
                : 'Item popularity is calculated based on total quantity sold across all table and guest bills. Inventory levels are adjusted upon kitchen completion.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;