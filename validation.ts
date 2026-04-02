// utils/validation.ts

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUserRegistration = (
  email: string,
  fullName: string
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateProductRegistration = (
  sku: string,
  name: string,
  price: string,
  quantity: string
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!sku.trim()) {
    errors.sku = 'SKU is required';
  } else if (sku.trim().length < 3) {
    errors.sku = 'SKU must be at least 3 characters';
  }

  if (!name.trim()) {
    errors.name = 'Product name is required';
  }

  const priceNum = parseFloat(price);
  if (!price || isNaN(priceNum)) {
    errors.price = 'Valid price is required';
  } else if (priceNum <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  const quantityNum = parseInt(quantity, 10);
  if (!quantity || isNaN(quantityNum)) {
    errors.quantity = 'Valid quantity is required';
  } else if (quantityNum < 0) {
    errors.quantity = 'Quantity cannot be negative';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStockAdjustment = (
  quantity: string,
  currentStock: number,
  type: 'add' | 'remove'
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  const quantityNum = parseInt(quantity, 10);
  
  if (!quantity || isNaN(quantityNum)) {
    errors.quantity = 'Valid quantity is required';
  } else if (quantityNum <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  } else if (type === 'remove' && quantityNum > currentStock) {
    errors.quantity = `Cannot remove ${quantityNum} items. Only ${currentStock} in stock`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
