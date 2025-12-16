import React, { useState, useEffect } from 'react';
import { X, Printer, CreditCard, Banknote } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalUSD: number;
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
  const [exchangeRate, setExchangeRate] = useState<number>(300); // Fallback rate
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch Live Exchange Rate
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

  // Calculate Tax & Totals
  const cardTax = totalUSD * 0.03;
  const finalCardTotal = totalUSD + cardTax;

  // The active total depends on the method
  const activeTotalUSD = method === 'card' ? finalCardTotal : totalUSD;
  const activeTotalLKR = activeTotalUSD * exchangeRate;

  // Cash Balance Logic (always calculated against the active total, though irrelevant for card visually)
  const receivedAmount = parseFloat(cashReceived) || 0;
  const balanceLKR = receivedAmount - activeTotalLKR;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-slate-950 w-full max-w-[550px] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative flex flex-col min-h-[600px]">
        
        {/* Close Button (Red X Style) */}
        <button 
            onClick={onClose}
            className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center text-red-500 hover:text-white hover:bg-red-600 transition-colors z-10"
        >
            <X className="w-8 h-8" />
        </button>

        <div className="p-8 pt-10 flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6">Payment</h2>

            {/* Payment Method Toggle */}
            <div className="mb-6">
                <label className="text-sm font-semibold text-white mb-3 block">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setMethod('cash')}
                        className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-base transition-all border ${
                            method === 'cash'
                            ? 'bg-amber-400 border-amber-400 text-slate-900 shadow-lg shadow-amber-400/20'
                            : 'bg-slate-900/50 border-slate-800 text-white hover:bg-slate-800'
                        }`}
                    >
                        <Banknote className="w-5 h-5" />
                        Cash
                    </button>
                    <button
                        onClick={() => setMethod('card')}
                        className={`py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-base transition-all border ${
                            method === 'card'
                            ? 'bg-amber-400 border-amber-400 text-slate-900 shadow-lg shadow-amber-400/20'
                            : 'bg-slate-900/50 border-slate-800 text-white hover:bg-slate-800'
                        }`}
                    >
                        <CreditCard className="w-5 h-5" />
                        Card
                    </button>
                </div>
            </div>

            {/* Order Total Box */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-6 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium">Order Total</span>
                    {method === 'card' && (
                        <span className="px-2 py-0.5 bg-slate-950 border border-slate-700 rounded text-[11px] text-amber-500 font-bold tracking-wide">
                            Includes 3% Card Tax
                        </span>
                    )}
                </div>
                
                <div className="flex items-end justify-between">
                    <div>
                        <div className="text-4xl font-bold text-white tracking-tight">
                            ${activeTotalUSD.toFixed(2)}
                        </div>
                        {method === 'card' && (
                            <div className="text-xs text-slate-400 mt-1 font-medium animate-in fade-in">
                                Base: <span className="text-slate-300">${totalUSD.toFixed(2)}</span> + Tax: <span className="text-amber-500">${cardTax.toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="text-right">
                         <div className="text-xl font-bold text-slate-200">
                            LKR {activeTotalLKR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                         </div>
                         {method === 'card' && (
                             <div className="text-[10px] text-slate-500 mt-1">
                                 1 USD = {exchangeRate.toFixed(2)} LKR
                             </div>
                         )}
                    </div>
                </div>
            </div>

            {/* Cash Inputs (Always Rendered, Dimmed when Card selected) */}
            <div className={`space-y-4 transition-all duration-300 ease-in-out ${
                method === 'card' ? 'opacity-30 pointer-events-none grayscale blur-[1px]' : 'opacity-100'
            }`}>
                <div>
                    <label className="text-xs font-semibold text-slate-400 mb-2 block">Cash Received</label>
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold group-focus-within:text-white transition-colors">LKR/USD</span>
                        <input 
                            type="number" 
                            value={cashReceived}
                            onChange={(e) => setCashReceived(e.target.value)}
                            placeholder={activeTotalLKR.toFixed(2)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-24 pr-4 text-right text-white font-bold text-xl focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 placeholder-slate-800 transition-all"
                            autoFocus={method === 'cash'}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold text-slate-400 mb-2 block">Balance / Change</label>
                    <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">LKR</span>
                        <div className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-16 pr-4 text-right text-white font-bold text-xl">
                            {balanceLKR > 0 ? balanceLKR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-auto pt-6 flex gap-3">
                <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-[#15803d] hover:bg-[#166534] text-white rounded-lg font-bold text-base shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all flex items-center justify-center"
                >
                    {isProcessing ? 'Processing...' : 'Complete Payment'}
                </button>
                <button className="px-6 py-4 bg-slate-950 hover:bg-slate-900 text-white rounded-lg font-bold text-sm border border-slate-800 transition-all flex items-center gap-2">
                    <Printer className="w-5 h-5" />
                    Print
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentModal;