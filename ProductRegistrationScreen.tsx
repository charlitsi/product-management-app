// screens/ProductRegistrationScreen.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { validateProductRegistration } from '../utils/validation';
import { ProductCard } from '../components/ProductCard';

export const ProductRegistrationScreen = () => {
  const { state, dispatch } = useApp();
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRegister = () => {
    const validation = validateProductRegistration(sku, name, price, quantity);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Check if SKU already exists
    const existingProduct = state.products.find(
      p => p.sku.toLowerCase() === sku.toLowerCase()
    );
    if (existingProduct) {
      setErrors({ sku: 'Product with this SKU already exists' });
      return;
    }

    dispatch({
      type: 'REGISTER_PRODUCT',
      payload: {
        sku: sku.toUpperCase(),
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      },
    });

    Alert.alert('Success', 'Product registered successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setSku('');
          setName('');
          setPrice('');
          setQuantity('');
          setErrors({});
        },
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Register Product</Text>
          <Text className="text-gray-600 mb-6">Add a new product to inventory</Text>

          <FormInput
            label="SKU (Stock Keeping Unit)"
            value={sku}
            onChangeText={(text) => {
              setSku(text);
              if (errors.sku) setErrors({ ...errors, sku: '' });
            }}
            error={errors.sku}
            placeholder="PROD-001"
            autoCapitalize="characters"
          />

          <FormInput
            label="Product Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
            placeholder="Premium Widget"
          />

          <FormInput
            label="Price ($)"
            value={price}
            onChangeText={(text) => {
              setPrice(text);
              if (errors.price) setErrors({ ...errors, price: '' });
            }}
            error={errors.price}
            placeholder="29.99"
            keyboardType="decimal-pad"
          />

          <FormInput
            label="Initial Quantity"
            value={quantity}
            onChangeText={(text) => {
              setQuantity(text);
              if (errors.quantity) setErrors({ ...errors, quantity: '' });
            }}
            error={errors.quantity}
            placeholder="100"
            keyboardType="number-pad"
          />

          <Button
            title="Register Product"
            onPress={handleRegister}
          />
        </View>

        {state.products.length > 0 && (
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Products ({state.products.length})
            </Text>
            {state.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        )}

        {state.products.length === 0 && (
          <View className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <Text className="text-blue-800 text-center">
              No products registered yet. Add your first product above!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
