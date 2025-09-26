import React, { useState } from 'react';
import { View, Text, TextInput as RNTextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { useField } from 'formik';
import { Ionicons } from '@expo/vector-icons';

interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  isPassword?: boolean;
  leftIcon?: string;
  formatText?: (text: string) => string;
  maxLength?: number;
  style?: ViewStyle; // Added style prop
}

export default function TextInput({
  label,
  name,
  placeholder,
  keyboardType = 'default',
  isPassword = false,
  leftIcon,
  formatText,
  maxLength,
  style,
}: TextInputProps) {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const hasError = meta.touched && meta.error;

  const handleChangeText = (text: string) => {
    const formattedText = formatText ? formatText(text) : text;
    helpers.setValue(formattedText);
  };

  // Enhanced color scheme
  const colors = {
    primary: '#3B82F6',
    secondary: '#EFF6FF',
    success: '#10B981',
    error: '#EF4444',
    background: '#F8FAFC',
    border: '#E2E8F0',
    borderFocused: '#3B82F6',
    borderError: '#EF4444',
    text: '#0F172A',
    textSecondary: '#64748B',
    placeholder: '#94A3B8',
    iconDefault: '#94A3B8',
    iconFocused: '#3B82F6',
  };

  const getBorderColor = () => {
    if (hasError) return colors.borderError;
    if (isFocused) return colors.borderFocused;
    return colors.border;
  };

  const getBackgroundColor = () => {
    if (hasError) return '#FEF2F2';
    if (isFocused) return '#FEFEFE';
    return '#F8FAFC';
  };

  const getIconColor = () => {
    if (hasError) return colors.error;
    if (isFocused) return colors.iconFocused;
    return colors.iconDefault;
  };

  return (
    <View style={[{ marginBottom: 20 }, style]}>
      {/* Enhanced Label */}
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: hasError ? colors.error : colors.text,
          marginBottom: 8,
          marginLeft: 4,
        }}
      >
        {label}
        {field.value && !hasError && (
          <Text style={{ color: colors.success, marginLeft: 4 }}>✓</Text>
        )}
      </Text>

      {/* Enhanced Input Container */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: getBackgroundColor(),
          borderWidth: 2,
          borderColor: getBorderColor(),
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
          minHeight: 56,
          shadowColor: isFocused ? colors.primary : '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isFocused ? 0.1 : 0.05,
          shadowRadius: isFocused ? 4 : 2,
          elevation: isFocused ? 3 : 1,
        }}
      >
        {/* Enhanced Left Icon */}
        {leftIcon && (
          <View
            style={{
              backgroundColor: isFocused 
                ? 'rgba(59, 130, 246, 0.1)' 
                : hasError 
                ? 'rgba(239, 68, 68, 0.1)'
                : 'rgba(148, 163, 184, 0.1)',
              borderRadius: 8,
              padding: 6,
              marginRight: 12,
            }}
          >
            <Ionicons 
              name={leftIcon as any} 
              size={20} 
              color={getIconColor()} 
            />
          </View>
        )}

        {/* Enhanced Text Input */}
        <RNTextInput
          value={field.value}
          onChangeText={handleChangeText}
          onBlur={() => {
            helpers.setTouched(true);
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !showPassword}
          maxLength={maxLength}
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: '500',
            color: colors.text,
            paddingVertical: 2,
          }}
          placeholderTextColor={colors.placeholder}
        />

        {/* Enhanced Password Toggle */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              backgroundColor: 'rgba(148, 163, 184, 0.1)',
              borderRadius: 8,
              padding: 6,
              marginLeft: 8,
            }}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}

        {/* Success Indicator */}
        {field.value && !hasError && !isFocused && (
          <View
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderRadius: 8,
              padding: 4,
              marginLeft: 8,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={colors.success}
            />
          </View>
        )}
      </View>

      {/* Enhanced Error Message */}
      {hasError && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            marginLeft: 4,
          }}
        >
          <Ionicons
            name="alert-circle"
            size={16}
            color={colors.error}
            style={{ marginRight: 6 }}
          />
          <Text
            style={{
              color: colors.error,
              fontSize: 13,
              fontWeight: '500',
              flex: 1,
            }}
          >
            {meta.error}
          </Text>
        </View>
      )}

      {/* Character Count (for fields with maxLength) */}
      {maxLength && field.value && (
        <Text
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            textAlign: 'right',
            marginTop: 4,
            marginRight: 4,
          }}
        >
          {field.value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
}