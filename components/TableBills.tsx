import React, { useState } from 'react';
import { Printer, CreditCard, User, Clock, ChevronRight } from 'lucide-react';
import PaymentModal from './modals/PaymentModal';

// Mock Data Types for this view
interface BillItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Bill {
  id: number; // Room Number
  guestName: string;
  orderNumber: string;
  status: 'dining' | 'unpaid'; // dining = color 1, unpaid = color 2
  items: BillItem[];
  startTime: string;
}

// Mock Data Generation
const MOCK_BILLS: Bill[] = [
  {
    id: 101,
    guestName: 'Chriss',
    orderNumber: 'Order #3',
    status: 'unpaid',
    startTime: '19:30',
    items: [
        { id: '1', name: 'Grilled Salmon', quantity: 1, price: 28.99 },
        { id: '2', name: 'Beef Tenderloin', quantity: 1, price: 42.99 },
        { id: '3', name: 'Red Wine', quantity: 1, price: 18.99 },
        { id: '4', name: 'Tiramisu', quantity: 1, price: 11.99 },
    ]
  },
  {
    id: 104,
    guestName: 'Walk-in',
    orderNumber: 'Order #7',
    status: 'dining',
    startTime: '20:15',
    items: [
        { id: '5', name: 'Caesar Salad', quantity: 2, price: 12.99 },
        { id: '6', name: 'Sparkling Water', quantity: 2, price: 6.99 },
    ]
  },
  {
    id: 201,
    guestName: 'Smith Family',
    orderNumber: 'Order #12',
    status: 'dining',
    startTime: '19:45',
    items: [
        { id: '7', name: 'Lobster Bisque', quantity: 2, price: 16.99 },
        { id: '8', name: 'Filet Mignon', quantity: 2, price: 48.99 },
        { id: '9', name: 'Martini', quantity: 2, price: 15.99 },
    ]
  },
  {
    id: 203,
    guestName: 'VIP - John',
    orderNumber: 'Order #4',
    status: 'unpaid',
    startTime: '18:00',
    items: [
        { id: '10', name: 'Truffle Fries', quantity: 1, price: 9.99 },
        { id: '11', name: 'Burger', quantity: 1, price: 18.50 },
        { id: '12', name: 'Beer', quantity: 3, price: 7.50 },
    ]
  },
  {
    id: 302,
    guestName: 'Couple',
    orderNumber: 'Order #9',
    status: 'dining',
    startTime: '20:30',
    items: [
        { id: '13', name: 'Choco Lava Cake', quantity: 2, price: 13.99 },
        { id: '14', name: 'Coffee', quantity: 2, price: 4.50 },
    ]
  },
];

const TableBills: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>(MOCK_BILLS);
  const [selectedBillId, setSelectedBillId] = useState<number | null>(MOCK_BILLS[0].id);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const selectedBill = bills.find(b => b.id === selectedBillId) || null;

  // Calculations
  const subtotal = selectedBill ? selectedBill.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;
  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    // Simulate removing bill or changing status
    if (selectedBillId) {
       setBills(prev => prev.filter(b => b.id !== selectedBillId));
       setSelectedBillId(null);
    }
    alert("Payment Successful!");
  };

  return (
    <div className="flex h-full bg-slate-950">
      
      {/* LEFT: Bill Grid */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-bold text-white mb-6">Table Bills</h2>
        
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 content-start">
          {bills.map((bill) => {
            const billTotal = bill.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 1.1; // inc tax
            const isUnpaid = bill.status === 'unpaid';
            const isActive = selectedBillId === bill.id;

            return (
              <div 
                key={bill.id}
                className={`relative p-4 rounded-lg flex flex-col justify-between min-h-[140px] transition-all duration-200 border-2 ${
                    isActive 
                        ? 'ring-2 ring-blue-500 transform scale-[1.02]' 
                        : ''
                } ${
                    isUnpaid 
                        ? 'bg-slate-900 border-amber-500/60 shadow-[0_0_15px_-3px_rgba(245,158,11,0.15)]' // Color 2: Unpaid (Amber)
                        : 'bg-slate-900 border-slate-700 hover:border-slate-600' // Color 1: Dining (Slate)
                }`}
              >
                {/* Card Content */}
                <div>
                    <h3 className="text-lg font-bold text-white leading-none mb-1">Room {bill.id}</h3>
                    <p className="text-slate-400 text-xs mb-2 font-medium truncate">{bill.guestName}</p>
                    
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wide">{bill.orderNumber}</span>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {bill.startTime}
                        </div>
                    </div>
                    
                    <div className={`font-bold text-sm mb-3 ${isUnpaid ? 'text-amber-500' : 'text-slate-200'}`}>
                        Rs{billTotal.toFixed(2)}
                    </div>
                </div>

                {/* Button */}
                <button 
                    onClick={() => setSelectedBillId(bill.id)}
                    className={`w-full py-1.5 px-2 rounded text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${
                        isUnpaid 
                        ? 'bg-amber-500 text-slate-900 hover:bg-amber-400' 
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                >
                    View Details
                    {isActive && <ChevronRight className="w-3 h-3" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Action Section / Details */}
      <div className="w-[340px] bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 shadow-2xl z-10">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 text-right">Action section</div>
            <div className="text-2xl font-bold text-white text-right">
                {selectedBill ? `Room ${selectedBill.id}` : 'Select Room'}
            </div>
            {selectedBill && (
                <div className="text-right text-sm text-amber-500 font-medium">{selectedBill.guestName}</div>
            )}
        </div>

        {/* Order List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {selectedBill ? (
                <>
                    <h3 className="text-sm font-semibold text-slate-400 mb-4">Current Order <span className="text-xs font-normal opacity-50">({selectedBill.items.length} items)</span></h3>
                    <div className="space-y-3">
                        {selectedBill.items.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex justify-between items-start py-2 border-b border-slate-800/50">
                                <div>
                                    <div className="text-slate-200 text-sm font-medium">{item.name}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">Qty: {item.quantity}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-amber-500 text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                                    <div className="text-[10px] text-slate-600">${item.price}/ea</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="h-full flex items-center justify-center text-slate-600 text-sm">
                    Select a bill to view details
                </div>
            )}
        </div>

        {/* Footer / Totals / Actions */}
        {selectedBill && (
            <div className="p-5 bg-slate-950 border-t border-slate-800">
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-slate-400 text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-sm">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-3 border-t border-dashed border-slate-800">
                        <span className="text-slate-200 font-bold">Total</span>
                        <span className="text-2xl font-bold text-amber-500">${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-slate-700">
                        <Printer className="w-4 h-4" />
                        Print Receipt
                    </button>
                    <button 
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-lg shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <CreditCard className="w-5 h-5" />
                        Payment
                    </button>
                </div>
            </div>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal 
         isOpen={isPaymentModalOpen}
         onClose={() => setIsPaymentModalOpen(false)}
         totalUSD={total}
         onComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default TableBills;