import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import {useRoute} from "@react-navigation/native";

export default function CheckoutScreen() {

    const route = useRoute();
    const finaltotal=route.params();
    console.log("Total price "+finaltotal);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [addressSubmitted, setAddressSubmitted] = useState(false);

    // ✅ Fetch current address
    const fetchCurrentAddress = async () => {
        try {
            setLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Allow location access to fetch address");
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            let reverseGeo = await Location.reverseGeocodeAsync({ latitude, longitude });

            if (reverseGeo.length > 0) {
                const addr = reverseGeo[0];
                const formattedAddress = `${addr.name || ""}, ${addr.street || ""}, ${addr.city || ""}, ${addr.region || ""}, ${addr.postalCode || ""}`;
                setAddress(formattedAddress);
            }
        } catch (err) {
            Alert.alert("Error", "Unable to fetch current address");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle address submit
    const handleSubmit = () => {
        if (!name || !phone || !address) {
            Alert.alert("Missing Info", "Please fill all fields or fetch address");
            return;
        }
        setAddressSubmitted(true);
    };

    // ✅ Handle Payment option
    const handlePayment = (method) => {
        Alert.alert("Payment Started", `You selected ${method} payment method`);
        // Here you can trigger Razorpay / UPI / Card logic
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {!addressSubmitted ? (
                // ---------------- Address Form ----------------
                <View style={styles.card}>
                    <Text style={styles.header}>📦 Delivery Address</Text>

                    <Text style={styles.label}>Receiver Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter receiver name"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Receiver Phone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter phone number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={[styles.input, { height: 90 }]}
                        placeholder="Enter full address"
                        value={address}
                        onChangeText={setAddress}
                        multiline
                    />

                    <TouchableOpacity
                        style={styles.locationBtn}
                        onPress={fetchCurrentAddress}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.locationText}>📍 Fetch Current Address</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit Address</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // ---------------- Payment Section ----------------
                <View style={styles.card}>
                    <Text style={styles.header}>💳 Payment Page</Text>

                    <Text style={styles.summaryLabel}>Deliver To:</Text>
                    <Text style={styles.addressLine} numberOfLines={1}>
                        {name} - {phone}, {address}
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.paymentTitle}>Select Payment Method</Text>

                    <TouchableOpacity
                        style={styles.payOption}
                        onPress={() => handlePayment("UPI")}
                    >
                        <Text style={styles.payText}>💰 Pay with UPI</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.payOption}
                        onPress={() => handlePayment("Debit Card")}
                    >
                        <Text style={styles.payText}>💳 Pay with Debit Card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.payOption}
                        onPress={() => handlePayment("QR Scan")}
                    >
                        <Text style={styles.payText}>📷 Scan QR to Pay</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => setAddressSubmitted(false)}
                    >
                        <Text style={styles.backText}>← Edit Address</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    card: {
        backgroundColor: "#fff",
        width: "100%",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    label: {
        fontSize: 15,
        marginBottom: 5,
        color: "#555",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: "#fafafa",
    },
    locationBtn: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    locationText: {
        color: "#fff",
        fontWeight: "600",
    },
    submitBtn: {
        backgroundColor: "#28a745",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    summaryLabel: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    addressLine: {
        fontSize: 14,
        color: "#333",
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 10,
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#222",
    },
    payOption: {
        backgroundColor: "#007bff",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 12,
    },
    payText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    backBtn: {
        marginTop: 20,
        alignItems: "center",
    },
    backText: {
        color: "#555",
        fontWeight: "bold",
    },
});
