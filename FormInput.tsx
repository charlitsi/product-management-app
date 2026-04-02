// components/FormInput.tsx

import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  containerClassName = '',
  ...textInputProps
}) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      <Text className="text-gray-700 font-semibold mb-2">{label}</Text>
      <TextInput
        className={`border rounded-lg px-4 py-3 bg-white ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholderTextColor="#9CA3AF"
        {...textInputProps}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};
