import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet, Dimensions} from 'react-native';

const categories = [
    { id: 1, name: 'Apple', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 2, name: 'Banana', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 3, name: 'Carrot', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 4, name: 'Tomato', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 5, name: 'Apple', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 6, name: 'Banana', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 7, name: 'Carrot', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 8, name: 'Tomato', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 9, name: 'Apple', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 10, name: 'Banana', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 11, name: 'Carrot', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 12, name: 'Tomato', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 13, name: 'Apple', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 14, name: 'Banana', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 15, name: 'Carrot', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    { id: 16, name: 'Tomato', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=90&h=90&q=80' },
    // ... more categories
];
const onSeeAll = () => {
    alert('See All clicked!');
};
    const SCREEN_WIDTH = Dimensions.get('window').width;

    // Adjust number of columns here: 2 or 3
    const NUM_COLUMNS = 3;

    // Calculate item width based on number of columns and margin/padding
    const ITEM_MARGIN = 12;
    const ITEM_WIDTH = (SCREEN_WIDTH - ITEM_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
    const limitedCategories = categories.slice(0, NUM_COLUMNS * 3);
const CategoryGrid = () => {
    const onCategoryPress = (name) => {
        Alert.alert('Category', `You clicked on ${name}`);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => onCategoryPress(item.name)}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={{fontSize:14,fontWeight:500,paddingVertical:6}}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Category</Text>
                <TouchableOpacity onPress={onSeeAll}>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={limitedCategories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                numColumns={3}
                scrollEnabled={false}
                contentContainerStyle={{ padding: 13 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        margin: 3,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        // Optional shadow (iOS)
        shadowColor: '#121',
        shadowOffset: { width: 9, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        // Optional elevation (Android)
        elevation: 4,
    },
    categoryImage: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH-25,
        resizeMode: 'cover',

    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor:"#FF6363",
        padding:5,
        borderRadius:20,
        paddingHorizontal:15,
        paddingVertical:15,
        // Optional shadow (iOS)
        shadowColor: '#121',
        shadowOffset: { width: 9, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        // Optional elevation (Android)
        elevation: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
    },
    seeAllText: {
        fontSize: 16,
        color: '#007bff',
    },
});

export default CategoryGrid;