import React, { useState, useEffect } from 'react';
import { X, Printer, CreditCard, Banknote } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalUSD: number; // This is the total from the order (Subtotal + 10% Tax)
  onComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  totalUSD,
  onComplete
}) => {
  const [method, setMethod] = useState<'cash' | 'card'>('cash');
  const [cashReceived, setCashReceived] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(309.42); // Match requested rate
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch Live Exchange Rate (Optional: keeps it dynamic but defaults to requested 309.42)
  useEffect(() => {
    if (isOpen) {
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
          if (data && data.rates && data.rates.LKR) {
            setExchangeRate(data.rates.LKR);
          }
        })
        .catch(err => console.error("Failed to fetch rates, using fallback", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate Card Fee (3%)
  const cardFee = totalUSD * 0.03;
  
  // The active total depends on the method
  const activeTotalUSD = method === 'card' ? totalUSD + cardFee : totalUSD;
  const activeTotalLKR = activeTotalUSD * exchangeRate;

  // Cash Balance Logic (for LKR)
  const receivedAmount = parseFloat(cashReceived) || 0;
  const balanceLKR = receivedAmount - activeTotalLKR;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      {/* Reduced width to ~400px (approx 30% reduction from previous 550px) */}
      <div className="bg-[#0f172a] w-full max-w-[400px] rounded-[32px] border border-slate-800 shadow-2xl overflow-hidden relative flex flex-col">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors z-10"
        >
            <X className="w-4 h-4" />
        </button>

        <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6">Payment Settlement</h2>

            {/* Payment Method Toggle */}
            <div className="mb-6">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setMethod('cash')}
                        className={`py-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 font-bold text-sm transition-all border ${
                            method === 'cash'
                            ? 'bg-amber-400 border-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <Banknote className="w-5 h-5" />
                        Cash
                    </button>
                    <button
                        onClick={() => setMethod('card')}
                        className={`py-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 font-bold text-sm transition-all border ${
                            method === 'card'
                            ? 'bg-amber-400 border-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <CreditCard className="w-5 h-5" />
                        Card
                    </button>
                </div>
            </div>

            {/* Order Total Box - Matched precisely to latest requested Screenshot */}
            <div className="bg-[#0c1221] border border-slate-800/50 rounded-[24px] p-6 mb-6 relative">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-slate-500 text-xs font-medium">Order Total</span>
                    <div className="text-[10px] font-medium text-slate-500 tracking-wide text-right">
                        - <br />
                        1 USD = {exchangeRate.toFixed(2)} LKR
                    </div>
                </div>
                
                <div className="flex justify-between items-end">
                    <div className="text-4xl font-bold text-white tracking-tight">
                        ${activeTotalUSD.toFixed(2)}
                    </div>
                    <div className="text-2xl font-bold text-white tracking-tight">
                        <span className="text-slate-300 text-base font-bold mr-1">LKR</span>
                        {activeTotalLKR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>
                
                {/* Subtle Tax Indicator (only shows for card) */}
                {method === 'card' && (
                    <div className="mt-4 flex justify-end">
                         <div className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[9px] text-amber-500 font-bold uppercase tracking-widest">
                            Includes 3% Card Tax
                        </div>
                    </div>
                )}
            </div>

            {/* Cash Inputs */}
            <div className={`space-y-4 mb-6 transition-all duration-300 ${
                method === 'card' ? 'opacity-20 pointer-events-none grayscale' : 'opacity-100'
            }`}>
                <div className="relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Amount Received (LKR)</label>
                    <input 
                        type="number" 
                        value={cashReceived}
                        onChange={(e) => setCashReceived(e.target.value)}
                        placeholder={activeTotalLKR.toFixed(0)}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-4 px-5 text-right text-white font-bold text-2xl focus:outline-none focus:border-amber-500 transition-all font-mono placeholder:text-slate-800"
                    />
                </div>
                <div className="flex justify-between items-center px-4 py-2 bg-slate-900/30 rounded-lg border border-slate-800/50">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Balance</span>
                    <span className={`text-lg font-bold font-mono ${balanceLKR >= 0 ? 'text-emerald-500' : 'text-slate-700'}`}>
                        {balanceLKR > 0 ? `LKR ${balanceLKR.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 'LKR 0.00'}
                    </span>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-auto flex gap-3">
                <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[18px] font-bold text-lg shadow-xl shadow-emerald-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    {isProcessing ? 'Wait...' : 'Complete'}
                </button>
                <button className="px-5 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-[18px] font-bold text-sm transition-all flex items-center gap-2">
                    <Printer className="w-5 h-5" />
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentModal;