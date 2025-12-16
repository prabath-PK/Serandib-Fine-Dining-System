import React, { useState, useRef, useEffect } from 'react';
import { User, UserPlus, MapPin, Key } from 'lucide-react';
import { Room } from '../types';

interface OrderContextBarProps {
  selectedTable: Room | null;
  onTableClick: () => void;
  guestName: string;
  onGuestChange: (name: string) => void;
}

const OrderContextBar: React.FC<OrderContextBarProps> = ({
  selectedTable,
  onTableClick,
  guestName,
  onGuestChange
}) => {
  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const guestInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingGuest && guestInputRef.current) {
        guestInputRef.current.focus();
    }
  }, [isEditingGuest]);

  return (
    <div className="h-16 bg-slate-950 border-b border-slate-800 flex items-center px-6 shrink-0 gap-6">
        {/* Context Display */}
        <div className="flex items-center min-w-[150px]">
             {selectedTable ? (
                <div className="flex items-center gap-2 text-indigo-400 animate-in fade-in">
                   <Key className="w-4 h-4" />
                   <span className="font-semibold text-lg">Room {selectedTable.id}</span>
                </div>
             ) : guestName ? (
                <div className="flex items-center gap-2 text-amber-400 animate-in fade-in">
                   <User className="w-4 h-4" />
                   <span className="font-semibold text-lg">{guestName}</span>
                </div>
             ) : (
                <div className="flex items-center gap-2 text-slate-500 italic text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    <span>No Selection</span>
                </div>
             )}
        </div>

        <div className="h-8 w-px bg-slate-800" />

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
            <button 
                onClick={onTableClick}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition-all group shadow-sm"
            >
                <MapPin className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-sm font-semibold text-indigo-200 group-hover:text-white">
                    {selectedTable ? 'Change Room' : 'Choose Room'}
                    </span>
                </div>
            </button>

            {isEditingGuest ? (
                <div className="flex items-center bg-slate-800 rounded-lg border border-amber-500/50 px-3 py-1.5 h-[46px] w-56 animate-in fade-in zoom-in-95 duration-200">
                    <UserPlus className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                    <input
                        ref={guestInputRef}
                        type="text"
                        className="bg-transparent border-none text-white text-sm focus:outline-none w-full placeholder-slate-500"
                        defaultValue={guestName}
                        placeholder="Guest Name..."
                        onBlur={(e) => {
                            onGuestChange(e.target.value);
                            setIsEditingGuest(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onGuestChange(e.currentTarget.value);
                                setIsEditingGuest(false);
                            }
                            if (e.key === 'Escape') {
                                setIsEditingGuest(false);
                            }
                        }}
                    />
                </div>
            ) : (
                <button
                    onClick={() => setIsEditingGuest(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-all group shadow-sm"
                >
                    <UserPlus className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                    <div className="flex flex-col items-start leading-none gap-1">
                        <span className="text-sm font-semibold text-amber-200 group-hover:text-white">
                            {guestName ? 'Edit Guest' : 'New Guest'}
                        </span>
                    </div>
                </button>
            )}
        </div>
    </div>
  );
};

export default OrderContextBar;