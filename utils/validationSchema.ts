import * as Yup from 'yup';

export const getValidationSchema = (transferType: 'domestic' | 'international') => {
  const baseSchema = {
    recipientName: Yup.string()
      .required('Recipient name is required')
      .min(2, 'Name must be at least 2 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    
    accountNumber: Yup.string()
      .required('Account number is required')
      .min(10, 'Account number must be at least 10 digits')
      .matches(/^[0-9\s]+$/, 'Account number can only contain numbers'),
    
    amount: Yup.string()
      .required('Amount is required')
      .test('min-amount', 'Minimum amount is ₹100', (value) => {
        const numericValue = parseFloat((value || '').replace(/[^0-9.]/g, ''));
        return numericValue >= 100;
      })
      .test('max-amount', 'Maximum amount is ₹1,00,000', (value) => {
        const numericValue = parseFloat((value || '').replace(/[^0-9.]/g, ''));
        return numericValue <= 100000;
      }),
    
    password: Yup.string()
      .required('Transaction password is required')
      .length(6, 'Password must be exactly 6 digits')
      .matches(/^\d{6}$/, 'Password must contain only numbers'),
  };

  if (transferType === 'international') {
    return Yup.object({
      ...baseSchema,
      iban: Yup.string()
        .required('IBAN is required for international transfers')
        .min(15, 'IBAN must be at least 15 characters')
        .max(34, 'IBAN cannot exceed 34 characters')
        .matches(/^[A-Z0-9\s]+$/, 'IBAN can only contain letters and numbers'),
      
      swiftCode: Yup.string()
        .required('SWIFT code is required for international transfers')
        .matches(/^[A-Z]{4}-[A-Z]{2}-[A-Z]{2}-[0-9]{2}$/, 'Invalid SWIFT code format (AAAA-BB-CC-12)'),
    });
  }

  return Yup.object(baseSchema);
};