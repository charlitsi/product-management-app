// screens/ProductManagementScreen.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Modal, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { validateStockAdjustment } from '../utils/validation';
import { Product } from '../types';

export const ProductManagementScreen = () => {
  const { state, dispatch } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState('');
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove'>('add');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setQuantity('');
    setErrors({});
    setShowModal(true);
  };

  const handleAdjustStock = () => {
    if (!selectedProduct) return;

    const validation = validateStockAdjustment(
      quantity,
      selectedProduct.quantity,
      adjustmentType
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    dispatch({
      type: 'ADJUST_STOCK',
      payload: {
        productId: selectedProduct.id,
        quantity: parseInt(quantity, 10),
        type: adjustmentType,
      },
    });

    Alert.alert(
      'Success',
      `Stock ${adjustmentType === 'add' ? 'added' : 'removed'} successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowModal(false);
            setQuantity('');
            setErrors({});
            setSelectedProduct(null);
          },
        },
      ]
    );
  };

  return (
    <>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Product Management
            </Text>
            <Text className="text-gray-600">
              Select a product to adjust its stock levels
            </Text>
          </View>

          {state.products.length === 0 ? (
            <View className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <Text className="text-blue-800 text-center">
                No products available. Register a product first!
              </Text>
            </View>
          ) : (
            <>
              <Text className="text-lg font-bold text-gray-900 mb-3">
                Products ({state.products.length})
              </Text>
              {state.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => handleProductPress(product)}
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 max-h-[80%]">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-900">Adjust Stock</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text className="text-gray-500 text-2xl">×</Text>
              </TouchableOpacity>
            </View>

            {selectedProduct && (
              <>
                <View className="bg-gray-50 rounded-lg p-4 mb-4">
                  <Text className="font-semibold text-gray-900 text-lg">
                    {selectedProduct.name}
                  </Text>
                  <Text className="text-gray-600">SKU: {selectedProduct.sku}</Text>
                  <Text className="text-2xl font-bold text-blue-600 mt-2">
                    Current Stock: {selectedProduct.quantity}
                  </Text>
                </View>

                <View className="flex-row gap-2 mb-4">
                  <TouchableOpacity
                    className={`flex-1 py-3 rounded-lg ${
                      adjustmentType === 'add' ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                    onPress={() => {
                      setAdjustmentType('add');
                      setErrors({});
                    }}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        adjustmentType === 'add' ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      Add Stock
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 py-3 rounded-lg ${
                      adjustmentType === 'remove' ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                    onPress={() => {
                      setAdjustmentType('remove');
                      setErrors({});
                    }}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        adjustmentType === 'remove' ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      Remove Stock
                    </Text>
                  </TouchableOpacity>
                </View>

                <FormInput
                  label="Quantity"
                  value={quantity}
                  onChangeText={(text) => {
                    setQuantity(text);
                    if (errors.quantity) setErrors({ ...errors, quantity: '' });
                  }}
                  error={errors.quantity}
                  placeholder="Enter quantity"
                  keyboardType="number-pad"
                />

                <Button
                  title={`${adjustmentType === 'add' ? 'Add' : 'Remove'} Stock`}
                  onPress={handleAdjustStock}
                  variant={adjustmentType === 'add' ? 'primary' : 'danger'}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};
