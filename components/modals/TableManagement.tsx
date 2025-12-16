import React, { useState } from 'react';
import { X, Users, Clock, Search } from 'lucide-react';
import { Room } from '../../types';

interface TableManagementProps {
  isOpen: boolean;
  onClose: () => void;
  tables: Room[];
  onSelectTable: (table: Room) => void;
}

const TableManagement: React.FC<TableManagementProps> = ({
  isOpen,
  onClose,
  tables,
  onSelectTable,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const availableCount = tables.filter(t => t.status === 'available').length;
  const occupiedCount = tables.filter(t => t.status === 'occupied').length;

  const filteredTables = tables.filter(table => 
    table.id.toString().includes(searchQuery) || 
    table.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-xl w-full max-w-5xl h-[80vh] flex flex-col border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 pb-2 shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Room Selection</h2>
            
            <div className="flex items-center gap-3">
               {/* Status Pills */}
               <div className="flex items-center gap-3 mr-4">
                 <div className="px-3 py-1 bg-[#059669]/20 border border-[#059669]/30 rounded-full flex items-center gap-2">
                    <span className="text-[#10B981] text-xs font-semibold">Available: {availableCount}</span>
                 </div>
                 <div className="px-3 py-1 bg-[#7f1d1d]/30 border border-red-900/50 rounded-full flex items-center gap-2">
                    <span className="text-red-400 text-xs font-semibold">Occupied: {occupiedCount}</span>
                 </div>
               </div>

               <button
                 onClick={onClose}
                 className="text-slate-500 hover:text-white transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
             <input 
               type="text" 
               placeholder="Search rooms..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all"
             />
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="flex flex-wrap content-start gap-2">
            {filteredTables.map(table => {
              const isOccupied = table.status === 'occupied';
              
              return (
                <button
                  key={table.id}
                  onClick={() => onSelectTable(table)}
                  title={`Room ${table.id} - ${table.seats} seats - ${table.status}`}
                  className={`w-[60px] h-[60px] rounded-lg border flex flex-col items-center justify-center transition-all duration-200 relative group ${
                    isOccupied
                      ? 'bg-slate-950 border-red-900/80 text-red-500 hover:bg-red-900/10' // Red for occupied
                      : 'bg-slate-800 border-slate-700 hover:border-[#10B981] text-slate-300 hover:text-white hover:bg-[#10B981]/10' // Green hover for available
                  }`}
                >
                  <span className="font-bold text-sm leading-none">{table.id}</span>
                  
                  {/* Seat count */}
                  <span className="text-[10px] font-mono opacity-50 mt-1">{table.seats}p</span>

                  {/* Order Indicator Dot */}
                  {table.hasOrder && (
                     <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableManagement;