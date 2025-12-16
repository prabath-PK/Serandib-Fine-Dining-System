export type Category = 'All' | 'Appetizers' | 'Salads' | 'Mains' | 'Drinks' | 'Desserts';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: Category;
  image?: string;
}

export interface ModifierOption {
  name: string;
  price: number;
}

export interface ModifierCategory {
  name: string;
  type: 'single' | 'multi'; // Radio vs Checkbox
  options: (string | ModifierOption)[];
}

export interface OrderModifier {
  category: string;
  option: string;
  price: number;
}

export interface OrderItem extends MenuItem {
  uniqueId: string; // To distinguish same items with different modifiers
  quantity: number;
  modifiers: OrderModifier[];
  note?: string;
  deletionStatus?: 'none' | 'pending'; // New field for approval workflow
}

export type RoomStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';

export interface Room {
  id: number; // Room Number
  seats: number; // Capacity
  status: RoomStatus;
  hasOrder: boolean;
}