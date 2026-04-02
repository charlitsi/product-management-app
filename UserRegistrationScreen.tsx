// screens/UserRegistrationScreen.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { validateUserRegistration } from '../utils/validation';

export const UserRegistrationScreen = () => {
  const { state, dispatch } = useApp();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRegister = () => {
    const validation = validateUserRegistration(email, fullName);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Check if user already exists
    const existingUser = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      setErrors({ email: 'User with this email already exists' });
      return;
    }

    dispatch({
      type: 'REGISTER_USER',
      payload: { email, fullName },
    });

    Alert.alert('Success', 'User registered successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setEmail('');
          setFullName('');
          setErrors({});
        },
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Register User</Text>
          <Text className="text-gray-600 mb-6">Create a new user account</Text>

          <FormInput
            label="Email Address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            placeholder="john.doe@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <FormInput
            label="Full Name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            error={errors.fullName}
            placeholder="John Doe"
            autoComplete="name"
          />

          <Button
            title="Register User"
            onPress={handleRegister}
          />
        </View>

        {state.currentUser && (
          <View className="bg-green-50 rounded-lg p-4 border border-green-200">
            <Text className="text-green-800 font-semibold mb-1">Current User</Text>
            <Text className="text-green-700">{state.currentUser.fullName}</Text>
            <Text className="text-green-600 text-sm">{state.currentUser.email}</Text>
          </View>
        )}

        {state.users.length > 0 && (
          <View className="mt-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Registered Users ({state.users.length})
            </Text>
            {state.users.map((user) => (
              <View key={user.id} className="bg-white rounded-lg p-4 mb-2 shadow-sm">
                <Text className="font-semibold text-gray-900">{user.fullName}</Text>
                <Text className="text-gray-600 text-sm">{user.email}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
