import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";

function ReviewScreen() {
  const router = useRouter();
  const { transferType = "domestic", values: valuesParam } =
    useLocalSearchParams<{
      transferType: "domestic" | "international";
      values: string;
    }>();

  const values = valuesParam ? JSON.parse(valuesParam) : {};
  const [isProcessing, setIsProcessing] = useState(false);

  const fee = transferType === "international" ? 250.0 : 0.0;
  const baseAmount = parseFloat(
    (values.amount || "0").toString().replace(/,/g, "")
  );
  const total = baseAmount + fee;

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.replace({
        pathname: "/success",
        params: {
          transferType,
          amount: baseAmount.toLocaleString("en-IN"),
          recipient: values.recipientName,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Transfer Failed", "Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaProvider>

    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <TouchableOpacity
            onPress={handleBack}
            style={{ padding: 8, borderRadius: 50 }}
          >
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
            }}
          >
            Review Payment
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Transfer Type Indicator */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <View
              style={{
                padding: 8,
                borderRadius: 50,
                marginRight: 12,
                backgroundColor:
                  transferType === "domestic" ? "#DBEAFE" : "#D1FAE5",
              }}
            >
              <Ionicons
                name={
                  transferType === "domestic" ? "home-outline" : "globe-outline"
                }
                size={20}
                color={transferType === "domestic" ? "#3B82F6" : "#10B981"}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#111827",
              }}
            >
              {transferType === "domestic"
                ? "Domestic Transfer"
                : "International Transfer"}
            </Text>
          </View>
        </View>

        {/* Recipient Details */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Recipient Details
          </Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#6B7280" }}>Name</Text>
              <Text style={{ fontWeight: "500", color: "#111827" }}>
                {values.recipientName || "—"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderTopWidth: 1,
                borderTopColor: "#F3F4F6",
              }}
            >
              <Text style={{ color: "#6B7280" }}>Account Number</Text>
              <Text style={{ fontWeight: "500", color: "#111827" }}>
                {values.accountNumber || "—"}
              </Text>
            </View>
            {transferType === "international" && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 8,
                    borderTopWidth: 1,
                    borderTopColor: "#F3F4F6",
                  }}
                >
                  <Text style={{ color: "#6B7280" }}>IBAN</Text>
                  <Text style={{ fontWeight: "500", color: "#111827" }}>
                    {values.iban || "—"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 8,
                    borderTopWidth: 1,
                    borderTopColor: "#F3F4F6",
                  }}
                >
                  <Text style={{ color: "#6B7280" }}>SWIFT Code</Text>
                  <Text style={{ fontWeight: "500", color: "#111827" }}>
                    {values.swiftCode || "—"}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Payment Summary */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Payment Summary
          </Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#6B7280" }}>Transfer Amount</Text>
              <Text style={{ fontWeight: "500", color: "#111827" }}>
                ₹{baseAmount.toLocaleString("en-IN")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderTopWidth: 1,
                borderTopColor: "#F3F4F6",
              }}
            >
              <Text style={{ color: "#6B7280" }}>Transfer Fee</Text>
              <Text style={{ fontWeight: "500", color: "#111827" }}>
                {fee === 0 ? "Free" : `₹${fee.toFixed(2)}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 12,
                borderTopWidth: 2,
                borderTopColor: "#E5E7EB",
              }}
            >
              <Text style={{ fontWeight: "600", color: "#111827" }}>
                Total Amount
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "#10B981",
                }}
              >
                ₹{total.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        </View>

        {/* Security Notice */}
        <View
          style={{
            backgroundColor: "#FFFBEB",
            borderWidth: 1,
            borderColor: "#FCD34D",
            borderRadius: 12,
            padding: 16,
            marginTop: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#D97706"
              style={{ marginRight: 8, marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#92400E",
                }}
              >
                Secure Transfer
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#B45309",
                  marginTop: 4,
                }}
              >
                Your transaction is protected by bank-level encryption and fraud
                monitoring.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View
        style={{
          padding: 16,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        }}
      >
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={isProcessing}
          style={{
            paddingVertical: 16,
            borderRadius: 12,
            backgroundColor: isProcessing ? "#D1D5DB" : "#10B981",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {isProcessing ? "Processing Payment..." : "Confirm & Send Payment"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default ReviewScreen;
