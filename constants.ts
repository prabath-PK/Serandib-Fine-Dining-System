import { MenuItem, Room, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Appetizers', 'Salads', 'Mains', 'Drinks', 'Desserts'];

export const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: 'Caesar Salad', price: 12.99, category: 'Salads' },
  { id: 2, name: 'Grilled Salmon', price: 28.99, category: 'Mains' },
  { id: 3, name: 'Beef Tenderloin', price: 42.99, category: 'Mains' },
  { id: 4, name: 'Lobster Bisque', price: 16.99, category: 'Appetizers' },
  { id: 5, name: 'Truffle Fries', price: 9.99, category: 'Appetizers' },
  { id: 6, name: 'Caprese Salad', price: 14.99, category: 'Salads' },
  { id: 7, name: 'Filet Mignon', price: 48.99, category: 'Mains' },
  { id: 8, name: 'Red Wine', price: 18.99, category: 'Drinks' },
  { id: 9, name: 'Martini', price: 15.99, category: 'Drinks' },
  { id: 10, name: 'Tiramisu', price: 11.99, category: 'Desserts' },
  { id: 11, name: 'Crème Brûlée', price: 12.99, category: 'Desserts' },
  { id: 12, name: 'Choco Lava Cake', price: 13.99, category: 'Desserts' },
  { id: 13, name: 'Sparkling Water', price: 6.99, category: 'Drinks' },
  { id: 14, name: 'Bruschetta', price: 11.50, category: 'Appetizers' },
  { id: 15, name: 'Cheesecake', price: 10.99, category: 'Desserts' },
];

export const ROOMS: Room[] = [
  { id: 101, seats: 2, status: 'occupied', hasOrder: true },
  { id: 102, seats: 2, status: 'available', hasOrder: false },
  { id: 103, seats: 4, status: 'cleaning', hasOrder: false },
  { id: 104, seats: 4, status: 'available', hasOrder: false },
  { id: 201, seats: 4, status: 'occupied', hasOrder: true },
  { id: 202, seats: 4, status: 'available', hasOrder: false },
  { id: 203, seats: 6, status: 'reserved', hasOrder: false },
  { id: 204, seats: 6, status: 'available', hasOrder: false },
  { id: 301, seats: 2, status: 'available', hasOrder: false },
  { id: 302, seats: 8, status: 'available', hasOrder: false },
  { id: 303, seats: 8, status: 'available', hasOrder: false },
  { id: 401, seats: 12, status: 'reserved', hasOrder: false },
];

export const MODIFIER_DATA = {
  size: {
    name: 'Size',
    type: 'single',
    options: ['Small', 'Medium', 'Large']
  },
  temperature: {
    name: 'Temperature',
    type: 'single',
    options: ['Rare', 'Medium Rare', 'Medium', 'Well Done']
  },
  additions: {
    name: 'Additions',
    type: 'multi',
    options: [
      { name: 'Extra Cheese', price: 2.99 },
      { name: 'Bacon', price: 3.99 },
      { name: 'Avocado', price: 4.99 },
      { name: 'Fried Egg', price: 1.99 },
    ]
  }
};