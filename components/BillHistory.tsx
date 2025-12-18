import React from 'react';
import { Printer, Eye, Calendar } from 'lucide-react';

interface BillHistoryItem {
  id: string;
  table: string;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'CASH' | 'CARD';
  status: 'paid';
  timestamp: string; // ISO string for sorting/grouping
}

const MOCK_HISTORY: BillHistoryItem[] = [
  {
    id: '6F6D97',
    table: 'Table 7',
    subtotal: 7700.00,
    tax: 770.00,
    total: 8470.00,
    paymentMethod: 'CARD',
    status: 'paid',
    timestamp: '2025-12-17T21:56:50'
  },
  {
    id: '5A2B11',
    table: 'Table 2',
    subtotal: 3200.00,
    tax: 320.00,
    total: 3520.00,
    paymentMethod: 'CASH',
    status: 'paid',
    timestamp: '2025-12-17T20:15:30'
  },
  {
    id: '9C3D44',
    table: 'Table 12',
    subtotal: 12500.00,
    tax: 1250.00,
    total: 13750.00,
    paymentMethod: 'CARD',
    status: 'paid',
    timestamp: '2025-12-16T22:30:00'
  },
  {
    id: '1E8F92',
    table: 'Table 5',
    subtotal: 4500.00,
    tax: 450.00,
    total: 4950.00,
    paymentMethod: 'CASH',
    status: 'paid',
    timestamp: '2025-12-16T19:45:10'
  }
];

const BillHistory: React.FC = () => {
  // Group bills by date
  const groupedBills = MOCK_HISTORY.reduce((groups, bill) => {
    const date = new Date(bill.timestamp).toLocaleDateString('en-GB');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(bill);
    return groups;
  }, {} as Record<string, BillHistoryItem[]>);

  // Get sorted dates (descending)
  const sortedDates = Object.keys(groupedBills).sort((a, b) => {
    return new Date(b.split('/').reverse().join('-')).getTime() - new Date(a.split('/').reverse().join('-')).getTime();
  });

  return (
    <div className="flex-1 bg-slate-950 flex flex-col h-full overflow-hidden">
      <div className="p-6 shrink-0 border-b border-slate-800 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Bill History</h2>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Last 30 Days</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <table className="w-full text-left border-separate border-spacing-y-0">
          <thead>
            <tr className="text-slate-200 text-sm font-bold border-b border-slate-800">
              <th className="pb-4 pl-4">Bill ID</th>
              <th className="pb-4">Customer/Table</th>
              <th className="pb-4">Subtotal</th>
              <th className="pb-4">Total</th>
              <th className="pb-4">Payment</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Time</th>
              <th className="pb-4 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="before:block before:h-2">
            {sortedDates.map(date => (
              <React.Fragment key={date}>
                {/* Date Header Row */}
                <tr className="bg-slate-900/50">
                  <td colSpan={8} className="py-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-y border-slate-800">
                    {date}
                  </td>
                </tr>
                {groupedBills[date].map((bill) => (
                  <tr key={bill.id} className="group hover:bg-slate-900 transition-colors border-b border-slate-800/50">
                    <td className="py-4 pl-4 text-slate-300 text-sm font-medium">{bill.id}</td>
                    <td className="py-4 text-slate-300 text-sm">{bill.table}</td>
                    <td className="py-4 text-slate-400 text-sm">
                      Rs. {bill.subtotal.toFixed(2)} <span className="text-slate-100 font-bold">+{bill.tax.toFixed(2)}</span>
                    </td>
                    <td className="py-4 text-slate-100 text-sm font-bold">
                      Rs. {bill.total.toFixed(2)}
                    </td>
                    <td className="py-4 text-slate-300 text-sm font-medium">{bill.paymentMethod}</td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase rounded border border-emerald-500/20">
                        {bill.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400 text-xs">
                      {new Date(bill.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="p-1.5 text-slate-500 hover:text-white transition-colors">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-white transition-colors bg-slate-800/50 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {MOCK_HISTORY.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600">
             <Eye className="w-12 h-12 mb-4 opacity-20" />
             <p>No records found for this period.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillHistory;