import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import Header from "./Header";

const AddressScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    // const { finaltotal,HeaderComp } = route.params || {0,true};
    const { finaltotalPrice=0, HeaderComp = true } = route.params || {};
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = () => {
        if (!name || !phone || !address) {
            Alert.alert("Missing Info", "Please fill all fields!");
            return;
        }

        Alert.alert(
            "Address Saved ✅",
            `Name: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nProceeding to payment ₹${finaltotal}`
        );

        // You can navigate to a Payment screen next if you have one:
        // navigation.navigate("PaymentScreen", { finaltotal });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {HeaderComp===true? null:<Header title="Delivery Address"  />}

                {/*<Header title="Delivery Address" />*/}
                {/*<Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>*/}
                {/*    Delivery Address*/}
                {/*</Text>*/}

                <TextInput
                    placeholder="Receiver Name"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    placeholder="Receiver Phone No"
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    placeholder="Full Address"
                    multiline
                    style={[styles.input, { height: 80 }]}
                    value={address}
                    onChangeText={setAddress}
                />

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit & Pay ₹{finaltotalPrice}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
                    <Text style={{ color: "red", textAlign: "center" }}>← Back to Cart</Text>
                </TouchableOpacity>
            </ScrollView>
            {/*<TabNavigator />*/}
        </SafeAreaView>
    );
};

const styles = {
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    submitBtn: {
        backgroundColor: "#007bff",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    submitText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
};

export default AddressScreen;
