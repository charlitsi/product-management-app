// types/index.ts

export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  type: 'add' | 'remove' | 'create';
  quantity: number;
  previousQuantity?: number;
  newQuantity?: number;
  timestamp: Date;
}

export interface AppState {
  users: User[];
  products: Product[];
  transactions: Transaction[];
  currentUser: User | null;
}

export type AppAction =
  | { type: 'REGISTER_USER'; payload: Omit<User, 'id' | 'createdAt'> }
  | { type: 'REGISTER_PRODUCT'; payload: Omit<Product, 'id' | 'lastUpdated'> }
  | { type: 'ADJUST_STOCK'; payload: { productId: string; quantity: number; type: 'add' | 'remove' } }
  | { type: 'CLEAR_ALL' };
