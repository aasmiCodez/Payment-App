import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";

function HomeScreen() {
  const router = useRouter();

  const navigateToPayment = (transferType: "domestic" | "international") => {
    router.push(`/payment?transferType=${transferType}`);
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
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 16,
          }}
        >
          SecureBank
        </Text>
        <Text
          style={{
            color: "#6B7280",
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          Send money quickly and securely
        </Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Quick Balance Card */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#6B7280",
              marginBottom: 8,
            }}
          >
            Available Balance
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            ₹1,25,430.50
          </Text>
        </View>

        {/* Transfer Options */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 16,
            }}
          >
            Send Money
          </Text>

          {/* Domestic Transfer */}
          <TouchableOpacity
            onPress={() => navigateToPayment("domestic")}
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                padding: 12,
                borderRadius: 50,
                marginRight: 16,
              }}
            >
              <Ionicons name="home-outline" size={24} color="#3B82F6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: 4,
                }}
              >
                Domestic Transfer
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                }}
              >
                Send money within India • Free
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* International Transfer */}
          <TouchableOpacity
            onPress={() => navigateToPayment("international")}
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View
              style={{
                backgroundColor: "#D1FAE5",
                padding: 12,
                borderRadius: 50,
                marginRight: 16,
              }}
            >
              <Ionicons name="globe-outline" size={24} color="#10B981" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: 4,
                }}
              >
                International Transfer
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                }}
              >
                Send money worldwide • ₹250 fee
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
                flex: 1,
                marginRight: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Ionicons
                name="time-outline"
                size={24}
                color="#8B5CF6"
                style={{ marginBottom: 8 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#111827",
                }}
              >
                Recent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
                flex: 1,
                marginHorizontal: 4,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Ionicons
                name="people-outline"
                size={24}
                color="#F59E0B"
                style={{ marginBottom: 8 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#111827",
                }}
              >
                Contacts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
                flex: 1,
                marginLeft: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#EF4444"
                style={{ marginBottom: 8 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#111827",
                }}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Notice */}
        <View
          style={{
            backgroundColor: "#EFF6FF",
            borderWidth: 1,
            borderColor: "#BFDBFE",
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#2563EB"
              style={{ marginRight: 12, marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#1E40AF",
                  marginBottom: 4,
                }}
              >
                Your money is safe with us
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#1E40AF",
                }}
              >
                All transactions are protected by bank-level security and
                encryption.
              </Text>
            </View>
          </View>
        </View>

        {/* Help Section */}
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Text
            style={{
              textAlign: "center",
              color: "#9CA3AF",
              fontSize: 14,
            }}
          >
            Need help? Contact our 24/7 support team
          </Text>
          <TouchableOpacity style={{ marginTop: 8 }}>
            <Text
              style={{
                color: "#3B82F6",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Get Help
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default HomeScreen;
