// SeeAllProductsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const NUM_COLUMNS = 2;

const SeeAllProductsScreen = ({ route }) => {
    const { productsdiscount } = route.params;

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text>{item.name}</Text>
            <Text>50% Off</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/*<Text style={styles.title}>All Discounted Products</Text>*/}

            <FlatList
                data={productsdiscount}
                keyExtractor={(item) => item.id}
                renderItem={renderProductItem}
                numColumns={NUM_COLUMNS}
                contentContainerStyle={styles.flatListContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    flatListContainer: {
        paddingBottom: 16,
    },
    productItem: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
});

export default SeeAllProductsScreen;