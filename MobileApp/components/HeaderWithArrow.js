import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput, SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HeaderWithArrow({ navigation, title }) {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.headerBox}>

                {/* Back Btn */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={26} color="#fff" />
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>{title}</Text>

                <View style={{ width: 26 }} />
            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 10,
        backgroundColor: "#F5F5F5",
        marginTop:25
    },

    headerBox: {
        backgroundColor: "lightgreen",
        padding: 12,
        borderRadius: 16,
        marginTop: 6,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        // Shadow
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: { height: 2 },
    },

    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 2,

        // Shadow
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    searchInput: {
        marginLeft: 10,
        fontSize: 16,
        flex: 1,
        color: "#333",
    },
});
