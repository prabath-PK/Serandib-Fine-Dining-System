import React, { useState, useEffect } from 'react';
import { X, Check, Clock, Minus, Plus } from 'lucide-react';
import { MenuItem, OrderItem } from '../../types';
import { MODIFIER_DATA } from '../../constants';

interface ModifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  initialData?: OrderItem | null; // For editing
  onConfirm: (item: OrderItem) => void;
}

const ModifierModal: React.FC<ModifierModalProps> = ({
  isOpen,
  onClose,
  item,
  initialData,
  onConfirm
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('Medium');
  const [selectedTemp, setSelectedTemp] = useState<string>('Medium');
  const [selectedAdditions, setSelectedAdditions] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Initialize state when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            // Pre-fill for editing
            const sizeMod = initialData.modifiers.find(m => m.category === 'Size');
            if (sizeMod) setSelectedSize(sizeMod.option);
            
            const tempMod = initialData.modifiers.find(m => m.category === 'Temperature');
            if (tempMod) setSelectedTemp(tempMod.option);
            
            const additionMods = initialData.modifiers
                .filter(m => m.category === 'Additions')
                .map(m => m.option);
            setSelectedAdditions(additionMods);
            
            setNote(initialData.note || '');
            setQuantity(initialData.quantity);
        } else {
            // Reset for new item
            setSelectedSize('Medium');
            setSelectedTemp('Medium');
            setSelectedAdditions([]);
            setNote('');
            setQuantity(1);
        }
    }
  }, [isOpen, initialData]);

  if (!isOpen || !item) return null;

  // Calculate current total price dynamically
  const additionsPrice = selectedAdditions.reduce((sum, addName) => {
    const option = MODIFIER_DATA.additions.options.find(o => typeof o === 'object' && o.name === addName);
    return sum + (option && typeof option === 'object' ? option.price : 0);
  }, 0);
  
  const totalPrice = (item.price + additionsPrice) * quantity;

  const handleConfirm = () => {
    const modifiers = [
      { category: 'Size', option: selectedSize, price: 0 },
      { category: 'Temperature', option: selectedTemp, price: 0 },
      ...selectedAdditions.map(addName => {
        const option = MODIFIER_DATA.additions.options.find(o => typeof o === 'object' && o.name === addName);
        return {
           category: 'Additions',
           option: addName,
           price: option && typeof option === 'object' ? option.price : 0
        };
      })
    ];

    onConfirm({
      ...item,
      uniqueId: initialData ? initialData.uniqueId : Date.now().toString(), // Keep ID if editing
      quantity,
      modifiers,
      note: note.trim()
    });
  };

  const toggleAddition = (name: string) => {
    if (selectedAdditions.includes(name)) {
      setSelectedAdditions(selectedAdditions.filter(a => a !== name));
    } else {
      setSelectedAdditions([...selectedAdditions, name]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-xl w-full max-w-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header Section */}
        <div className="p-6 border-b border-slate-800/50 bg-slate-900 shrink-0">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-white font-bold text-lg">Add Item</h2>
                    <h1 className="text-2xl font-bold text-amber-500 mt-1">{item.name}</h1>
                    
                    {/* Preparing Time */}
                     <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-2 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>15-20 mins prep time</span>
                     </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Quantity Control */}
                    <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-white">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Close Button (Red Square) */}
                    <button 
                        onClick={onClose}
                        className="w-11 h-11 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-900">
             
             {/* SIZE Section */}
             <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-3">
                   {MODIFIER_DATA.size.options.map((option) => (
                      <button
                        key={option as string}
                        onClick={() => setSelectedSize(option as string)}
                        className={`py-3 px-4 rounded-lg font-medium text-sm transition-all border ${
                            selectedSize === option 
                            ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                        }`}
                      >
                         {option as string}
                      </button>
                   ))}
                </div>
             </div>

             {/* TEMPERATURE Section (Conditional) */}
             {item.category === 'Mains' && (
                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Temperature</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {MODIFIER_DATA.temperature.options.map((option) => (
                        <button
                            key={option as string}
                            onClick={() => setSelectedTemp(option as string)}
                            className={`py-3 px-2 rounded-lg font-medium text-xs transition-all border ${
                                selectedTemp === option 
                                ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                            }`}
                        >
                            {option as string}
                        </button>
                    ))}
                    </div>
                </div>
             )}

             {/* ADDITIONS Section */}
             <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Additions</h3>
                <div className="space-y-2">
                    {MODIFIER_DATA.additions.options.map((opt) => {
                        const option = opt as { name: string, price: number };
                        const isSelected = selectedAdditions.includes(option.name);
                        return (
                            <button
                                key={option.name}
                                onClick={() => toggleAddition(option.name)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                                    isSelected 
                                    ? 'bg-slate-800 border-slate-600'
                                    : 'bg-slate-800 border-slate-700/50 hover:bg-slate-750'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                        isSelected 
                                        ? 'bg-slate-600 border-slate-500 text-white' 
                                        : 'border-slate-600 bg-slate-900'
                                    }`}>
                                        {isSelected && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className="text-slate-300 font-medium text-sm">{option.name}</span>
                                </div>
                                <span className="text-emerald-500 font-bold text-sm">+${option.price.toFixed(2)}</span>
                            </button>
                        );
                    })}
                </div>
             </div>

             {/* KITCHEN NOTES */}
             <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Kitchen Notes</h3>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Allergy info, special requests..."
                    className="w-full h-24 bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 placeholder-slate-600 resize-none"
                />
             </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800/50 bg-slate-900 shrink-0">
             <button
                onClick={handleConfirm}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 rounded-xl font-bold text-white shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-between px-6 text-lg"
             >
                <span>Add to Order</span>
                <span>${totalPrice.toFixed(2)}</span>
             </button>
        </div>

      </div>
    </div>
  );
};

export default ModifierModal;