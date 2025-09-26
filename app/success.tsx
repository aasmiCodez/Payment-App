import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function SuccessScreen() {
  const router = useRouter();
  const { transferType, amount, recipient } = useLocalSearchParams<{
    transferType: "domestic" | "international";
    amount: string;
    recipient: string;
  }>();

  const handleGoHome = () => {
    router.replace("/home");
  };

  const handleSendAnother = () => {
    router.push({
      pathname: "/payment",
      params: {
        transferType: transferType,
      },
    });
  };

  const handleDownloadReceipt = async () => {
    const receiptContent = `
SecureBank Payment Receipt
========================
Transaction ID: ${transactionId}
Amount: ₹${amount}
Recipient: ${recipient}
Type: ${transferType}
Date: ${new Date().toLocaleString()}
Status: Completed
========================
Thank you for using SecureBank!
    `;

    try {
      await Share.share({
        message: receiptContent,
        title: "Payment Receipt",
      });
    } catch (error) {
      console.log("Error sharing receipt:", error);
    }
  };

  const transactionId = `TXN${Date.now().toString().slice(-8)}`;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-IN");
  const formattedTime = currentDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Enhanced color scheme
  const colors = {
    primary: transferType === "domestic" ? "#3B82F6" : "#10B981",
    secondary: transferType === "domestic" ? "#EFF6FF" : "#ECFDF5",
    accent: transferType === "domestic" ? "#60A5FA" : "#34D399",
    success: "#10B981",
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#0F172A",
    textSecondary: "#64748B",
    border: "#E2E8F0",
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 16 }}>
          {/* Compact Success Header */}
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            {/* Smaller Success Icon */}
            <View
              style={{
                backgroundColor: "#D1FAE5",
                padding: 16,
                borderRadius: 50,
                marginBottom: 12,
                shadowColor: colors.success,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Ionicons name="checkmark-circle" size={48} color={colors.success} />
            </View>

            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: colors.text,
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Payment Successful!
            </Text>
            
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="shield-checkmark" size={14} color={colors.success} />
              <Text
                style={{
                  color: colors.success,
                  fontSize: 14,
                  marginLeft: 4,
                  fontWeight: "600",
                }}
              >
                Secure Transfer Completed
              </Text>
            </View>
          </View>

          {/* Compact Transaction Summary */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 4,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            {/* Amount Section */}
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "800",
                  color: colors.success,
                  marginBottom: 4,
                }}
              >
                ₹{amount}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: colors.textSecondary, fontSize: 14 }}>sent to</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text,
                    marginLeft: 6,
                  }}
                >
                  {recipient}
                </Text>
              </View>
            </View>

            {/* Compact Transaction Details Grid */}
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: colors.border,
                paddingTop: 16,
              }}
            >
              <View style={{ flexDirection: "row", marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 2 }}>
                    Transaction ID
                  </Text>
                  <Text style={{ fontFamily: "monospace", fontSize: 13, fontWeight: "600", color: colors.text }}>
                    {transactionId}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 2 }}>
                    Type
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name={transferType === "domestic" ? "home" : "globe"}
                      size={14}
                      color={colors.primary}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "600",
                        color: colors.text,
                        marginLeft: 4,
                        textTransform: "capitalize",
                      }}
                    >
                      {transferType}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 2 }}>
                    Date & Time
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: "600", color: colors.text }}>
                    {formattedDate} • {formattedTime}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 2 }}>
                    Status
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#DCFCE7",
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                      alignSelf: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        backgroundColor: colors.success,
                        borderRadius: 3,
                        marginRight: 4,
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: "600",
                        color: colors.success,
                        fontSize: 12,
                      }}
                    >
                      Completed
                    </Text>
                  </View>
                </View>
              </View>

              {transferType === "international" && (
                <View
                  style={{
                    backgroundColor: colors.secondary,
                    padding: 12,
                    borderRadius: 8,
                    marginTop: 8,
                  }}
                >
                  <Text style={{ fontSize: 12, color: colors.primary, fontWeight: "500" }}>
                    International transfers may take 1-3 business days
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Compact Action Buttons */}
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={handleDownloadReceipt}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 14,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Ionicons name="share-outline" size={18} color="white" />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                  marginLeft: 8,
                }}
              >
                Share Receipt
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSendAnother}
              style={{
                backgroundColor: "#1F2937",
                paddingVertical: 14,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Ionicons name="send-outline" size={18} color="white" />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                  marginLeft: 8,
                }}
              >
                Send Another Payment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoHome}
              style={{
                backgroundColor: colors.border,
                paddingVertical: 14,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Ionicons name="home-outline" size={18} color="#374151" />
              <Text
                style={{
                  color: "#374151",
                  fontSize: 16,
                  fontWeight: "600",
                  marginLeft: 8,
                }}
              >
                Back to Home
              </Text>
            </TouchableOpacity>

            {/* Compact Help Footer */}
            <View
              style={{
                backgroundColor: "#F3F4F6",
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="help-circle-outline" size={16} color={colors.textSecondary} />
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontWeight: "500",
                    marginLeft: 4,
                    fontSize: 13,
                  }}
                >
                  Need Help? Contact 24/7 Support
                </Text>
              </View>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                support@securebank.com • 1800-XXX-XXXX
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SuccessScreen;