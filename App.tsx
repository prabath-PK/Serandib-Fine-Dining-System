import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OrderContextBar from './components/OrderContextBar';
import MenuGrid from './components/MenuGrid';
import OrderSummary from './components/OrderSummary';
import TableManagement from './components/modals/TableManagement';
import ModifierModal from './components/modals/ModifierModal';
import SummaryDashboard from './components/SummaryDashboard';
import TableBills from './components/TableBills';

import { Category, MenuItem, OrderItem, Room } from './types';
import { MENU_ITEMS, ROOMS } from './constants';

const App: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState('New Order');

  // App Data State
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [guestName, setGuestName] = useState('');
  
  // Modals
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showModifierModal, setShowModifierModal] = useState(false);
  
  // Selection
  const [pendingItem, setPendingItem] = useState<MenuItem | null>(null);
  const [editingItem, setEditingItem] = useState<OrderItem | null>(null);

  // Computed
  const activeOrderItems = orderItems.filter(i => i.deletionStatus !== 'pending');
  const pendingDeleteItems = orderItems.filter(i => i.deletionStatus === 'pending');
  
  const subtotal = activeOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  // Filter Items
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toString().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Handlers

  // Handle Category Click: Updates category and clears search to prioritize category view
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSearchQuery(''); 
  };

  const handleItemClick = (item: MenuItem) => {
    // Validation: Prevent adding items if no Room or Guest is selected
    if (!selectedRoom && !guestName) {
        alert("Please select a Room or Guest to start an order.");
        return;
    }

    setPendingItem(item);
    setEditingItem(null); // Ensure we are in "Add" mode
    setShowModifierModal(true);
  };

  const handleEditItem = (item: OrderItem) => {
    setPendingItem(item); // OrderItem extends MenuItem, so this works for display info
    setEditingItem(item); // Set "Edit" mode with current data
    setShowModifierModal(true);
  };

  const handleConfirmItem = (item: OrderItem) => {
    if (editingItem) {
      // Update existing item
      setOrderItems(prev => prev.map(i => i.uniqueId === item.uniqueId ? item : i));
    } else {
      // Add new item
      setOrderItems(prev => [...prev, item]);
    }
    setShowModifierModal(false);
    setPendingItem(null);
    setEditingItem(null);
  };

  const handleUpdateQuantity = (uniqueId: string, change: number) => {
    setOrderItems(prev => prev.map(item => {
        if (item.uniqueId === uniqueId) {
            const newQty = item.quantity + change;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
    }));
  };

  // Direct remove without approval for Cart Items
  const handleRemoveItem = (uniqueId: string) => {
    setOrderItems(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  // Admin Approves deletion (For future dashboard use)
  const handleApproveDelete = (uniqueId: string) => {
    setOrderItems(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  // Admin Denies deletion (For future dashboard use)
  const handleDenyDelete = (uniqueId: string) => {
    setOrderItems(prev => prev.map(item => 
      item.uniqueId === uniqueId 
        ? { ...item, deletionStatus: 'none' } 
        : item
    ));
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setGuestName(''); // Enforce exclusivity
    setShowRoomModal(false);
    if (room.hasOrder) {
        // Simulate fetching existing order
    } else {
        setOrderItems([]);
    }
  };

  const handleGuestChange = (name: string) => {
    setGuestName(name);
    if (name) {
        setSelectedRoom(null); // Enforce exclusivity
    }
  };

  const handlePlaceOrder = () => {
    if (activeOrderItems.length === 0) return;
    setOrderItems([]);
    setGuestName('');
    setSelectedRoom(null);
    alert("Order Placed Successfully!");
  };

  const handleCancelOrder = () => {
    if (window.confirm("Clear all items in current order?")) {
        setOrderItems([]);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Bar */}
        <Header title={activeTab === 'Summary' ? 'Dashboard' : activeTab} />

        {/* Content View */}
        {activeTab === 'Summary' ? (
           <SummaryDashboard 
              rooms={ROOMS}
              orders={activeOrderItems}
              revenue={197945.00}
              pendingDeleteItems={pendingDeleteItems}
              onApproveDelete={handleApproveDelete}
              onDenyDelete={handleDenyDelete}
           />
        ) : activeTab === 'Table Bills' ? (
           <TableBills />
        ) : activeTab === 'New Order' ? (
          <div className="flex-1 flex overflow-hidden bg-slate-900/50">
            
            {/* Left Column: Context Bar & Menu */}
            <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-slate-800">
               
               {/* Context Bar: Room/Guest Selection */}
               <OrderContextBar
                 selectedTable={selectedRoom}
                 onTableClick={() => setShowRoomModal(true)}
                 guestName={guestName}
                 onGuestChange={handleGuestChange}
               />

               {/* Menu Grid - Fills remaining vertical space */}
               <div className="flex-1 overflow-hidden">
                  <MenuGrid
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                    items={filteredItems}
                    onItemClick={handleItemClick}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
               </div>
            </div>

            {/* Right Column: Order Cart - Fixed 30% width */}
            <div className="w-[30vw] h-full overflow-hidden bg-slate-900 shrink-0 border-l border-slate-800">
               <OrderSummary
                 orderItems={orderItems}
                 onUpdateQuantity={handleUpdateQuantity}
                 onRemoveItem={handleRemoveItem}
                 onEditItem={handleEditItem}
                 onPlaceOrder={handlePlaceOrder}
                 onCancelOrder={handleCancelOrder}
                 subtotal={subtotal}
                 tax={tax}
                 total={total}
                 selectedRoom={selectedRoom}
                 guestName={guestName}
               />
            </div>
          </div>
        ) : (
          /* Placeholder for other views */
          <div className="flex-1 flex items-center justify-center bg-slate-900/50 text-slate-500">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-400 mb-2">{activeTab}</h3>
                <p>This module is currently under development.</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <TableManagement 
        isOpen={showRoomModal} 
        onClose={() => setShowRoomModal(false)}
        tables={ROOMS}
        onSelectTable={handleRoomSelect}
      />

      <ModifierModal
        isOpen={showModifierModal}
        onClose={() => setShowModifierModal(false)}
        item={pendingItem}
        initialData={editingItem}
        onConfirm={handleConfirmItem}
      />
    </div>
  );
};

export default App;