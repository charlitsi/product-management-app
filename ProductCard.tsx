// components/ProductCard.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stockStatus = product.quantity === 0 
    ? 'Out of Stock' 
    : product.quantity < 10 
    ? 'Low Stock' 
    : 'In Stock';

  const stockColor = product.quantity === 0 
    ? 'text-red-600' 
    : product.quantity < 10 
    ? 'text-orange-600' 
    : 'text-green-600';

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200"
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">{product.name}</Text>
          <Text className="text-sm text-gray-600">SKU: {product.sku}</Text>
        </View>
        <View className="bg-blue-100 px-3 py-1 rounded-full">
          <Text className="text-blue-800 font-semibold">${product.price.toFixed(2)}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-2">
        <View>
          <Text className="text-gray-600 text-sm">Quantity</Text>
          <Text className="text-2xl font-bold text-gray-900">{product.quantity}</Text>
        </View>
        <View className="items-end">
          <Text className={`font-semibold ${stockColor}`}>{stockStatus}</Text>
          <Text className="text-xs text-gray-500 mt-1">
            Updated: {formatDate(product.lastUpdated)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
