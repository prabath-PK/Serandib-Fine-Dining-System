import React from 'react';
import { CreditCard, Printer, PauseCircle, Send, Calculator, Delete } from 'lucide-react';

interface ActionPanelProps {
  onPay: () => void;
  onClear: () => void;
  isDisabled: boolean;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ onPay, onClear, isDisabled }) => {
  const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

  return (
    <div className="flex flex-col h-full bg-slate-900 p-4 gap-4 border-l border-slate-800">
      
      {/* Primary Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onPay}
          disabled={isDisabled}
          className="w-full py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-xl font-bold text-lg text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          <span>Pay Now</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
            <button
                disabled={isDisabled}
                className="py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg text-slate-200 font-medium text-sm flex flex-col items-center gap-1 border border-slate-700 transition-colors"
            >
                <Send className="w-4 h-4 text-blue-400" />
                Kitchen
            </button>
            <button
                disabled={isDisabled}
                className="py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg text-slate-200 font-medium text-sm flex flex-col items-center gap-1 border border-slate-700 transition-colors"
            >
                <PauseCircle className="w-4 h-4 text-orange-400" />
                Hold
            </button>
        </div>
      </div>

      {/* Numpad Section */}
      <div className="flex-1 bg-slate-800/50 rounded-xl border border-slate-800 p-3 flex flex-col">
        <div className="flex items-center gap-2 mb-3 px-1">
            <Calculator className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Input</span>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-2">
            {numpadKeys.map((key) => (
                <button
                    key={key}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xl font-medium text-slate-200 active:bg-slate-600 transition-colors shadow-sm"
                >
                    {key}
                </button>
            ))}
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-1 gap-3">
         <button
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 font-medium text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
         >
            <Printer className="w-4 h-4" />
            Print Bill
         </button>
         <button
            onClick={onClear}
            disabled={isDisabled}
            className="w-full py-3 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg font-medium text-sm border border-red-900/30 transition-colors flex items-center justify-center gap-2"
         >
            <Delete className="w-4 h-4" />
            Void Order
         </button>
      </div>
    </div>
  );
};

export default ActionPanel;