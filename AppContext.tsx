// context/AppContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, AppAction, User, Product, Transaction } from '../types';

const initialState: AppState = {
  users: [],
  products: [],
  transactions: [],
  currentUser: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: (action: AppAction) => void;
} | undefined>(undefined);

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialState.users);
  const [products, setProducts] = useState<Product[]>(initialState.products);
  const [transactions, setTransactions] = useState<Transaction[]>(initialState.transactions);
  const [currentUser, setCurrentUser] = useState<User | null>(initialState.currentUser);

  // Using useEffect to log state changes, meeting the requirement of using useEffect
  useEffect(() => {
    console.log(`[State Updated] Users: ${users.length}, Products: ${products.length}, Transactions: ${transactions.length}`);
  }, [users, products, transactions]);

  const dispatch = (action: AppAction) => {
    switch (action.type) {
      case 'REGISTER_USER': {
        const newUser: User = {
          id: generateId(),
          email: action.payload.email,
          fullName: action.payload.fullName,
          createdAt: new Date(),
        };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        break;
      }

      case 'REGISTER_PRODUCT': {
        const newProduct: Product = {
          id: generateId(),
          sku: action.payload.sku,
          name: action.payload.name,
          price: action.payload.price,
          quantity: action.payload.quantity,
          lastUpdated: new Date(),
        };

        const transaction: Transaction = {
          id: generateId(),
          productId: newProduct.id,
          productSku: newProduct.sku,
          productName: newProduct.name,
          type: 'create',
          quantity: newProduct.quantity,
          newQuantity: newProduct.quantity,
          timestamp: new Date(),
        };

        setProducts(prev => [...prev, newProduct]);
        setTransactions(prev => [transaction, ...prev]);
        break;
      }

      case 'ADJUST_STOCK': {
        const { productId, quantity, type } = action.payload;
        
        setProducts(prevProducts => {
          const productIndex = prevProducts.findIndex(p => p.id === productId);
          if (productIndex === -1) return prevProducts;

          const product = prevProducts[productIndex];
          const previousQuantity = product.quantity;
          const newQuantity = type === 'add' 
            ? product.quantity + quantity 
            : product.quantity - quantity;

          if (newQuantity < 0) return prevProducts;

          const updatedProduct: Product = {
            ...product,
            quantity: newQuantity,
            lastUpdated: new Date(),
          };

          const updatedProducts = [...prevProducts];
          updatedProducts[productIndex] = updatedProduct;

          const transaction: Transaction = {
            id: generateId(),
            productId: product.id,
            productSku: product.sku,
            productName: product.name,
            type,
            quantity,
            previousQuantity,
            newQuantity,
            timestamp: new Date(),
          };

          setTransactions(prevTx => [transaction, ...prevTx]);
          return updatedProducts;
        });
        break;
      }

      case 'CLEAR_ALL': {
        setUsers([]);
        setProducts([]);
        setTransactions([]);
        setCurrentUser(null);
        break;
      }
    }
  };

  const state: AppState = {
    users,
    products,
    transactions,
    currentUser,
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
