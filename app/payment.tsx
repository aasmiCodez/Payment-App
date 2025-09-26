import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik, FormikHelpers } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { getValidationSchema } from "@/utils/validationSchema";
import TextInput from "@/components/TextInput";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface FormValues {
  recipientName: string;
  accountNumber: string;
  amount: string;
  iban?: string;
  swiftCode?: string;
  password: string;
}

function PaymentScreen() {
  const router = useRouter();
  const { transferType } = useLocalSearchParams<{
    transferType: "domestic" | "international";
  }>();

  const [isLoading, setIsLoading] = useState(false);

  if (!transferType) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F8FAFC",
        }}
      >
        <Text style={{ fontSize: 16, color: "#64748B" }}>
          Invalid Transfer Type
        </Text>
      </SafeAreaView>
    );
  }

  const initialValues: FormValues =
    transferType === "international"
      ? {
          recipientName: "John Doe",
          accountNumber: "1234 5678 9012 3456",
          amount: "5000",
          iban: "DE89 3704 0044 0532 0130 00",
          swiftCode: "AAAA-BB-CC-12",
          password: "",
        }
      : {
          recipientName: "Jane Smith",
          accountNumber: "9876 5432 1000 1234",
          amount: "2500",
          password: "",
        };

  const handleBack = () => {
    router.replace("/home");
  };

  const onFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200)); // Mock API delay
      router.push({
        pathname: "/review",
        params: {
          values: JSON.stringify(values),
          transferType,
        },
      });
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  // Optional formatters
  const formatAmount = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return parts[0] + "." + parts.slice(1).join("");
    if (parts[0]) parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const formatAccountNumber = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 20);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatIBAN = (text: string) => {
    const cleaned = text
      .replace(/[^A-Z0-9]/gi, "")
      .toUpperCase()
      .slice(0, 34);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatSWIFT = (text: string) => {
    const cleaned = text.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 6)
      return cleaned.slice(0, 4) + "-" + cleaned.slice(4);
    if (cleaned.length <= 8)
      return (
        cleaned.slice(0, 4) + "-" + cleaned.slice(4, 6) + "-" + cleaned.slice(6)
      );
    return (
      cleaned.slice(0, 4) +
      "-" +
      cleaned.slice(4, 6) +
      "-" +
      cleaned.slice(6, 8) +
      "-" +
      cleaned.slice(8, 10)
    );
  };

  // Enhanced color scheme
  const colors = {
    primary: transferType === "domestic" ? "#3B82F6" : "#10B981",
    secondary: transferType === "domestic" ? "#EFF6FF" : "#ECFDF5",
    accent: transferType === "domestic" ? "#60A5FA" : "#34D399",
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#0F172A",
    textSecondary: "#64748B",
    border: "#E2E8F0",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  };

  return (
    <SafeAreaProvider>

    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Enhanced Gradient Header */}
      <View
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 20,
          paddingVertical: 28,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <TouchableOpacity 
            onPress={() => handleBack()}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 12,
              padding: 8,
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={{ alignItems: "center", flex: 1, marginHorizontal: 16 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              {transferType === "domestic" ? "Domestic Transfer" : "International Transfer"}
            </Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
        
        <Text
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: 16,
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {transferType === "domestic"
            ? "Send money within India quickly and securely"
            : "Send money worldwide with competitive rates"}
        </Text>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(transferType)}
        onSubmit={onFormSubmit}
      >
        {({ handleSubmit, isValid, dirty, isSubmitting }) => (
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView 
                style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }}
                showsVerticalScrollIndicator={false}
              >
                {/* Enhanced Recipient Details Card */}
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: 20,
                    padding: 24,
                    marginBottom: 20,
                    shadowColor: "#000000",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 8,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}>
                    <View
                      style={{
                        backgroundColor: colors.secondary,
                        borderRadius: 12,
                        padding: 10,
                        marginRight: 12,
                      }}
                    >
                      <Ionicons name="person" size={24} color={colors.primary} />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: colors.text,
                      }}
                    >
                      Recipient Details
                    </Text>
                  </View>

                  <TextInput
                    label="Recipient Name"
                    name="recipientName"
                    placeholder="Enter recipient name"
                    leftIcon="person-outline"
                    style={{ marginBottom: 16 }}
                  />

                  <TextInput
                    name="accountNumber"
                    label="Account Number"
                    placeholder="1234 5678 9012"
                    keyboardType="numeric"
                    leftIcon="card-outline"
                    formatText={formatAccountNumber}
                    style={{ marginBottom: 16 }}
                  />

                  {transferType === "international" && (
                    <>
                      <TextInput
                        label="IBAN"
                        name="iban"
                        placeholder="DE89 3704 0044 ..."
                        leftIcon="globe-outline"
                        formatText={formatIBAN}
                        maxLength={39}
                        style={{ marginBottom: 16 }}
                      />
                      <TextInput
                        label="SWIFT Code"
                        name="swiftCode"
                        placeholder="AAAA-BB-CC-12"
                        leftIcon="key-outline"
                        formatText={formatSWIFT}
                        maxLength={13}
                      />
                    </>
                  )}
                </View>

                {/* Enhanced Transfer Amount Card */}
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: 20,
                    padding: 24,
                    marginBottom: 20,
                    shadowColor: "#000000",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 8,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}>
                    <View
                      style={{
                        backgroundColor: transferType === "domestic" ? "#FEF3C7" : "#D1FAE5",
                        borderRadius: 12,
                        padding: 10,
                        marginRight: 12,
                      }}
                    >
                      <Ionicons 
                        name="cash" 
                        size={24} 
                        color={transferType === "domestic" ? "#D97706" : "#059669"} 
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: colors.text,
                      }}
                    >
                      Transfer Amount
                    </Text>
                  </View>

                  <TextInput
                    name="amount"
                    label="Amount (₹)"
                    placeholder="1,000"
                    keyboardType="numeric"
                    leftIcon="cash-outline"
                    formatText={formatAmount}
                  />

                  {/* Enhanced Info Section */}
                  <View
                    style={{
                      backgroundColor: colors.secondary,
                      borderWidth: 2,
                      borderColor: colors.accent,
                      borderRadius: 16,
                      padding: 20,
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{ 
                        flexDirection: "row", 
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: colors.primary,
                          borderRadius: 10,
                          padding: 6,
                          marginRight: 12,
                        }}
                      >
                        <Ionicons
                          name={transferType === "domestic" ? "checkmark-circle" : "time"}
                          size={20}
                          color="#FFFFFF"
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: colors.primary,
                        }}
                      >
                        {transferType === "domestic" ? "Free Transfer" : "Transfer Fee"}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.primary,
                        marginLeft: 38,
                        fontWeight: "500",
                      }}
                    >
                      {transferType === "domestic"
                        ? "No fees for domestic transfers • Instant processing"
                        : "₹250 transfer fee • Processing time: 1-3 business days"}
                    </Text>
                  </View>
                </View>

                {/* Enhanced Security Card */}
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: 20,
                    padding: 24,
                    marginBottom: 120,
                    shadowColor: "#000000",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 8,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}>
                    <View
                      style={{
                        backgroundColor: "#FEE2E2",
                        borderRadius: 12,
                        padding: 10,
                        marginRight: 12,
                      }}
                    >
                      <Ionicons name="shield-checkmark" size={24} color="#DC2626" />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: colors.text,
                      }}
                    >
                      Security Verification
                    </Text>
                  </View>

                  <TextInput
                    name="password"
                    label="Transaction PIN"
                    placeholder="Enter 6-digit PIN"
                    isPassword
                    leftIcon="lock-closed-outline"
                    keyboardType="numeric"
                    maxLength={6}
                  />

                  {/* Security Notice */}
                  <View
                    style={{
                      backgroundColor: "#F0FDF4",
                      borderWidth: 1,
                      borderColor: "#BBF7D0",
                      borderRadius: 12,
                      padding: 16,
                      marginTop: 16,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={20}
                      color="#16A34A"
                      style={{ marginRight: 12 }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#166534",
                        fontWeight: "500",
                        flex: 1,
                      }}
                    >
                      Your transaction is protected by bank-level encryption
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>

            {/* Enhanced Fixed Bottom Button */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: colors.card,
                paddingHorizontal: 20,
                paddingVertical: 20,
                paddingBottom: Platform.OS === "ios" ? 40 : 20,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={!(isValid && dirty) || isSubmitting || isLoading}
                style={{
                  backgroundColor:
                    isValid && dirty && !isSubmitting && !isLoading
                      ? colors.primary
                      : "#CBD5E1",
                  borderRadius: 16,
                  paddingVertical: 18,
                  alignItems: "center",
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: isValid && dirty ? 0.3 : 0,
                  shadowRadius: 8,
                  elevation: isValid && dirty ? 6 : 0,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {(isSubmitting || isLoading) && (
                    <View
                      style={{
                        marginRight: 12,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        borderTopColor: "#FFFFFF",
                      }}
                    />
                  )}
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: "700",
                    }}
                  >
                    {isSubmitting || isLoading
                      ? "Processing..."
                      : "Continue to Review"}
                  </Text>
                  {!(isSubmitting || isLoading) && (
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default PaymentScreen;