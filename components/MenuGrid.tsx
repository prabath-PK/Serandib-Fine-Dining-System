import React from 'react';
import { Search } from 'lucide-react';
import { Category, MenuItem } from '../types';
import { CATEGORIES } from '../constants';

interface MenuGridProps {
  selectedCategory: Category;
  onCategorySelect: (cat: Category) => void;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({
  selectedCategory,
  onCategorySelect,
  items,
  onItemClick,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-900/50">
      {/* Search Bar - Reduced padding and input height */}
      <div className="p-3 border-b border-slate-800">
        <div className="relative inline-block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[120px] pl-8 pr-2 h-8 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-white text-xs placeholder-slate-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Category Tabs - Reduced vertical padding and button size */}
      <div className="px-3 py-3 overflow-x-auto border-b border-slate-800 no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`h-8 px-4 rounded-lg font-medium text-sm flex items-center justify-center transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid - Dimensions updated 20% bigger: 120px x 72px */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex flex-wrap content-start gap-3">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => onItemClick(item)}
              className="group relative flex flex-col w-[120px] h-[72px] rounded-lg overflow-hidden border border-slate-700 bg-slate-800 shadow-sm hover:shadow-lg hover:border-amber-500/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative h-full flex flex-col justify-between p-2.5 z-10 text-left w-full">
                <h3 className="font-semibold text-slate-100 text-xs leading-tight mb-0 group-hover:text-amber-400 transition-colors line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-[13px] font-bold text-amber-500 leading-none">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              
              {/* Add Indicator - Tiny */}
              <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-slate-700/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-slate-600">
                <span className="text-amber-500 text-[11px] leading-none pb-0.5">+</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuGrid;