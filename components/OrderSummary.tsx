import React, { useRef, useEffect } from 'react';
import { Trash2, Plus, Minus, ChefHat, MessageSquare } from 'lucide-react';
import { OrderItem, Room } from '../types';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
  onEditItem: (item: OrderItem) => void;
  onPlaceOrder: () => void;
  onCancelOrder: () => void;
  subtotal: number;
  tax: number;
  total: number;
  selectedRoom: Room | null;
  guestName: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onEditItem,
  onPlaceOrder,
  onCancelOrder,
  subtotal,
  tax,
  total,
  selectedRoom,
  guestName
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [orderItems.length]); // Scroll on new items

  return (
    <div className="flex flex-col h-full bg-slate-900 shadow-xl z-10 relative border-l border-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur shrink-0">
        <h2 className="text-lg font-bold text-white flex items-center justify-between">
          <span>Order Cart</span>
          {(selectedRoom || guestName) && (
            <span className={`text-xs font-bold px-2 py-1 rounded border ${
                selectedRoom 
                ? 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20' 
                : 'text-amber-300 bg-amber-500/10 border-amber-500/20'
            }`}>
                {selectedRoom ? `Room ${selectedRoom.id}` : guestName}
            </span>
          )}
        </h2>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-2 custom-scrollbar bg-slate-900">
        {orderItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-60">
            <div className="w-16 h-16 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center mb-3 bg-slate-900/50">
              <ChefHat className="w-8 h-8" />
            </div>
            <p className="font-medium text-sm">Start adding items</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {orderItems.map((item) => {
              return (
                <div 
                  key={item.uniqueId} 
                  className="group flex flex-col py-3 px-2 border-b border-slate-800/60 hover:bg-slate-800/50 transition-colors"
                >
                  {/* Row 1: Name, Qty, Price, Trash */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span 
                        className="text-white font-bold text-[15px] leading-none cursor-pointer hover:text-amber-500 transition-colors"
                        onClick={() => onEditItem(item)}
                      >
                        {item.name}
                      </span>
                      
                      {/* Quantity Widget */}
                      <div className="flex items-center bg-slate-950 rounded-md border border-slate-800 h-7 ml-1">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onUpdateQuantity(item.uniqueId, -1); }}
                            className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-white transition-colors active:scale-90"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <div className="h-4 w-px bg-slate-800"></div>
                        <span className="text-white font-bold text-xs w-7 text-center">{item.quantity}</span>
                        <div className="h-4 w-px bg-slate-800"></div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onUpdateQuantity(item.uniqueId, 1); }}
                            className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-white transition-colors active:scale-90"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-2">
                      <span className="text-amber-500 font-bold text-base tracking-wide">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button 
                          onClick={(e) => { e.stopPropagation(); onRemoveItem(item.uniqueId); }}
                          className="text-slate-600 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-slate-800"
                      >
                          <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Modifiers & Note */}
                  <div className="flex items-center gap-2 flex-wrap pl-0.5">
                    {/* Size & Temp as tags */}
                    {item.modifiers?.filter(m => m.category === 'Size' || m.category === 'Temperature').map((mod, idx) => (
                         <span key={`st-${idx}`} className="px-2 py-[3px] rounded bg-slate-950 border border-slate-800 text-sky-200/60 text-[11px] font-medium tracking-wide">
                            {mod.option}
                         </span>
                    ))}
                    
                    {/* Additions */}
                    {item.modifiers?.filter(m => m.category === 'Additions').map((mod, idx) => (
                         <span key={`add-${idx}`} className="px-2 py-[3px] rounded bg-slate-950 border border-slate-800 text-sky-200/60 text-[11px] font-medium tracking-wide">
                            {mod.option}
                         </span>
                    ))}

                    {/* Add Note Button / Display */}
                    <button 
                        onClick={() => onEditItem(item)}
                        className={`flex items-center gap-1.5 px-2 py-[3px] rounded border border-dashed text-[11px] transition-all duration-200 ${
                            item.note 
                            ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' 
                            : 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                        }`}
                    >
                        <MessageSquare className="w-3 h-3" />
                        <span className="font-medium">{item.note ? 'Note added' : 'Add note'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Footer Area */}
      <div className="bg-slate-900 p-5 border-t border-slate-800 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.3)] mt-auto z-20 shrink-0">
        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-slate-400 text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-sm">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-end pt-3 border-t border-dashed border-slate-800">
            <span className="text-slate-300 font-medium">Total</span>
            <span className="text-3xl font-bold text-white tracking-tight">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
             <button 
                onClick={onCancelOrder}
                disabled={orderItems.length === 0}
                className="flex-[3] py-4 bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-xl font-bold text-lg text-white shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all flex items-center justify-center"
             >
                CANCEL
             </button>
             <button 
                onClick={onPlaceOrder}
                disabled={orderItems.length === 0}
                className="flex-[7] py-4 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-xl font-bold text-lg text-slate-900 shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
             >
                PLACE ORDER
             </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;