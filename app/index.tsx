import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      return router.replace('/home');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff'
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20
      }}>
        PaymentApp
      </Text>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={{
        fontSize: 16,
        color: '#6B7280',
        marginTop: 20
      }}>
        Loading...
      </Text>
    </View>
  );
}

export default Index;