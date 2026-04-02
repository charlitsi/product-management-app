// components/TransactionItem.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { Transaction } from '../types';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionIcon = () => {
    switch (transaction.type) {
      case 'add':
        return '📈';
      case 'remove':
        return '📉';
      case 'create':
        return '✨';
      default:
        return '📦';
    }
  };

  const getTransactionColor = () => {
    switch (transaction.type) {
      case 'add':
        return 'text-green-600';
      case 'remove':
        return 'text-red-600';
      case 'create':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTransactionLabel = () => {
    switch (transaction.type) {
      case 'add':
        return 'Stock Added';
      case 'remove':
        return 'Stock Removed';
      case 'create':
        return 'Product Created';
      default:
        return 'Transaction';
    }
  };

  const getDescription = () => {
    if (transaction.type === 'create') {
      return `Initial stock: ${transaction.quantity} units`;
    }
    return `${transaction.previousQuantity} → ${transaction.newQuantity} (${transaction.type === 'add' ? '+' : '-'}${transaction.quantity})`;
  };

  return (
    <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200">
      <View className="flex-row items-start">
        <Text className="text-2xl mr-3">{getTransactionIcon()}</Text>
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <Text className={`font-semibold ${getTransactionColor()}`}>
              {getTransactionLabel()}
            </Text>
            <Text className="text-xs text-gray-500">
              {formatDate(transaction.timestamp)}
            </Text>
          </View>
          
          <Text className="text-gray-900 font-medium">{transaction.productName}</Text>
          <Text className="text-sm text-gray-600">SKU: {transaction.productSku}</Text>
          <Text className="text-sm text-gray-700 mt-1">{getDescription()}</Text>
        </View>
      </View>
    </View>
  );
};
