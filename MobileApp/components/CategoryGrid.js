import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const categories =
    [
        {
            "id": "groceries",
            "name": "Groceries",
            "imageurl": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            "subcategories": [
                {
                    "id": "fruits_veggies",
                    "name": "Fruits & Vegetables",
                    "imageurl": "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg"
                },
                {
                    "id": "dairy",
                    "name": "Dairy Products",
                    "imageurl": "https://images.pexels.com/photos/236701/pexels-photo-236701.jpeg"
                },
                {
                    "id": "snacks",
                    "name": "Snacks & Beverages",
                    "imageurl": "https://images.pexels.com/photos/36567/pexels-photo.jpg"
                }
            ]
        },
        {
            "id": "electronics",
            "name": "Electronics",
            "imageurl": "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
            "subcategories": [
                {
                    "id": "mobiles",
                    "name": "Mobile Phones",
                    "imageurl": "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"
                },
                {
                    "id": "laptops",
                    "name": "Laptops & Computers",
                    "imageurl": "https://images.pexels.com/photos/18105/pexels-photo.jpg"
                },
                {
                    "id": "cameras",
                    "name": "Cameras",
                    "imageurl": "https://images.pexels.com/photos/51383/camera-digital-camera-photo-photography-51383.jpeg"
                }
            ]
        },
        {
            "id": "fashion",
            "name": "Fashion",
            "imageurl": "https://images.pexels.com/photos/377058/pexels-photo-377058.jpeg",
            "subcategories": [
                {
                    "id": "mens_clothing",
                    "name": "Men's Clothing",
                    "imageurl": "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"
                },
                {
                    "id": "womens_clothing",
                    "name": "Women's Clothing",
                    "imageurl": "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"
                },
                {
                    "id": "accessories",
                    "name": "Accessories",
                    "imageurl": "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
                }
            ]
        },
        {
            "id": "books",
            "name": "Books",
            "imageurl": "https://images.pexels.com/photos/159711/pexels-photo-159711.jpeg",
            "subcategories": [
                {
                    "id": "fiction",
                    "name": "Fiction",
                    "imageurl": "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg"
                },
                {
                    "id": "non_fiction",
                    "name": "Non-Fiction",
                    "imageurl": "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg"
                },
                {
                    "id": "academic",
                    "name": "Academic",
                    "imageurl": "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg"
                }
            ]
        },
        {
            "id": "home_appliances",
            "name": "Home Appliances",
            "imageurl": "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
            "subcategories": [
                {
                    "id": "kitchen_appliances",
                    "name": "Kitchen Appliances",
                    "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg"
                },
                {
                    "id": "cleaning_appliances",
                    "name": "Cleaning Appliances",
                    "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg"
                },
                {
                    "id": "heating_cooling",
                    "name": "Heating & Cooling",
                    "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg"
                }
            ]
        }

];


const onSeeAll = () => {
    alert('See All clicked!');
    console.log(categories);
};
    const SCREEN_WIDTH = Dimensions.get('window').width;

    // Adjust number of columns here: 2 or 3
    const NUM_COLUMNS = 2;

    // Calculate item width based on number of columns and margin/padding
    const ITEM_MARGIN = 12;
    const ITEM_WIDTH = (SCREEN_WIDTH - ITEM_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
    const limitedCategories = categories.slice(0, NUM_COLUMNS * 3);

    const CategoryGrid = () => {
        const navigation = useNavigation();
        const onCategoryPress = (item) => {
        Alert.alert('Category', `You clicked on ${item.name}`);
        navigation.navigate('CategoryDetail', {  category: item });

        // navigation.navigate('CategoryDetail', { categoryId: item.id })

    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => onCategoryPress(item)}>
            <Image source={{ uri: item.imageurl }} style={styles.categoryImage} />
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
                scrollEnabled={true}
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