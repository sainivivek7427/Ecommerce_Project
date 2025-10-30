
import {Animated, FlatList, SafeAreaView, Text, TouchableOpacity, View,Image} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {useWishlist} from "../Context/WishlistContext";
import Header from "./Header";

const WishlistScreen = () => {
    const {wishlist, removeFromWishlist} = useWishlist();


    const renderItem = ({item}) => {

    console.log(item);
    return (
        <Animated.View style={styles.cartItem}>
            <Image source={{uri: item.images}} style={styles.productImageDiscounts}/>

            <View style={{flex: 1, marginLeft: 10}}>
                <Text style={{fontSize: 14}} numberOfLines={2} ellipsizeMode="tail">
                    {item.name}
                </Text>
                <Text style={styles.price}>₹{item.price}</Text>
            </View>
        </Animated.View>
    )
    // <Swipeable renderRightActions={() => renderRightActions(item.id)}>

    // </Swipeable>
};

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Header title="Wishlist" />
            {wishlist.length === 0 ? (
                <Text style={styles.emptyText}>❤️ Wishlist is empty</Text>
            ) : (
                <FlatList
                    data={wishlist}
                    renderItem={renderItem}
                    keyExtractor={(item, index) =>
                        item?.id ? item.id.toString() : index.toString()}
                />
            )}
        </SafeAreaView>
    );
};
export default WishlistScreen;
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    scrollSection: {
        flex: 1,
    },

    emptyText: {
        textAlign: "center",
        fontSize: 18,
        marginTop: 50,
        color: "#666",
    },

    // ✅ Cart / Wishlist Item row
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 12,
        marginHorizontal: 10,
        marginVertical: 6,
        borderRadius: 10,
        elevation: 2,
    },

    productImageDiscounts: {
        width: 70,
        height: 70,
        borderRadius: 10,
        resizeMode: "cover",
    },

    price: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 6,
    },

    // ✅ Quantity control box on cart screen
    cartControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0B7285",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 10,
        gap: 8,
    },

    cancelButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
    },

    // ✅ Order Summary Box
    totalBox: {
        backgroundColor: "white",
        margin: 12,
        padding: 14,
        borderRadius: 10,
        elevation: 4,
    },

    totalText: {
        fontSize: 16,
        marginBottom: 4,
    },

    checkoutBtn: {
        backgroundColor: "green",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },

    // ✅ Header Style
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#fff",
        elevation: 4,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },

    // ✅ Badge style for Wishlist Count / Cart Count
    badge: {
        position: "absolute",
        right: -6,
        top: -6,
        backgroundColor: "black",
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
});
