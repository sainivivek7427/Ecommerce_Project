import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const data = {
    categories: [
        {
            id: 'cat1',
            name: 'Electronics',
            subcategories: [
                { id: 'subcat1', name: 'Smartphones' },
                { id: 'subcat2', name: 'Laptops' },
            ],
        },
        {
            id: 'cat2',
            name: 'Fashion',
            subcategories: [
                { id: 'subcat3', name: "Men's Clothing" },
                { id: 'subcat4', name: "Women's Clothing" },
            ],
        },
    ],
    products: [
        { id: 'prod1', name: 'iPhone 13', categoryId: 'cat1', subcategoryId: 'subcat1' },
        { id: 'prod2', name: 'Samsung Galaxy S21', categoryId: 'cat1', subcategoryId: 'subcat1' },
        { id: 'prod3', name: 'MacBook Pro', categoryId: 'cat1', subcategoryId: 'subcat2' },
        { id: 'prod4', name: 'Men T-Shirt', categoryId: 'cat2', subcategoryId: 'subcat3' },
        { id: 'prod5', name: 'Women Dress', categoryId: 'cat2', subcategoryId: 'subcat4' },
    ],
};

export default function CategoriesScreen() {
    const [expandedCategoryIds, setExpandedCategoryIds] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
    // expandedCategoryIds (array of strings)
    // Keeps track of which categories are currently expanded in the sidebar.
    //     A category is “expanded” if its subcategories are visible.
    //     Multiple categories can be expanded simultaneously (since this is an array).
    // selectedCategoryId (string or null)
    // Holds the ID of the currently selected category.
    //     This means the user is viewing products for this category (if no subcategory is selected).
    // selectedSubcategoryId (string or null)
    // Holds the ID of the currently selected subcategory.
    //     When a subcategory is selected, products are filtered specifically by this subcategory.
    //     If null, product filtering uses only the selected category.
    const toggleExpandCategory = (categoryId) => {
        setSelectedSubcategoryId(null);
        //if already categoryid then remove it and collapse it
        if (expandedCategoryIds.includes(categoryId)) {
            setExpandedCategoryIds(expandedCategoryIds.filter((id) => id !== categoryId));
        }
        //otherwise add
        else {
            setExpandedCategoryIds([...expandedCategoryIds, categoryId]);
        }
    };

    const onSelectCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setSelectedSubcategoryId(null);
        if (!expandedCategoryIds.includes(categoryId)) {
            setExpandedCategoryIds([categoryId]);
        }
    };

    const onSelectSubcategory = (subcategoryId) => {
        setSelectedSubcategoryId(subcategoryId);
    };

    const filteredProducts = data.products.filter((product) => {
        if (selectedSubcategoryId) {
            return product.subcategoryId === selectedSubcategoryId;
        } else if (selectedCategoryId) {
            return product.categoryId === selectedCategoryId;
        }
        return true;
    });

    const renderCategoryItem = ({ item }) => {
        const isExpanded = expandedCategoryIds.includes(item.id);
        const isSelected = selectedCategoryId === item.id && selectedSubcategoryId === null;

        return (
            <View >
                <TouchableOpacity
                    style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
                    onPress={() => {
                        toggleExpandCategory(item.id);
                        onSelectCategory(item.id);
                    }}
                >
                    <Text style={styles.categoryText}>{item.name}</Text>
                    <Text style={styles.expandIcon}>{isExpanded ? '▾' : '▸'}</Text>
                </TouchableOpacity>

                {isExpanded && item.subcategories.length > 0 && (
                    <View style={styles.subcategoryContainer}>
                        {item.subcategories.map((subcat) => {
                            const isSubSelected = selectedSubcategoryId === subcat.id;
                            return (
                                <TouchableOpacity
                                    key={subcat.id}
                                    style={[styles.subcategoryItem, isSubSelected && styles.selectedSubcategoryItem]}
                                    onPress={() => onSelectSubcategory(subcat.id)}
                                >
                                    <Text style={styles.subcategoryText}>{subcat.name}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </View>
        );
    };

    const renderProductItem = ({ item }) => (
        <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Sidebar */}
            <FlatList
                style={styles.sidebar}
                data={data.categories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                extraData={{ expandedCategoryIds, selectedCategoryId, selectedSubcategoryId }}
                showsVerticalScrollIndicator={false}
            />

            {/* Products content */}
            <View style={styles.content}>
                <Text style={styles.contentTitle}>
                    {selectedSubcategoryId
                        ? `Products in ${data.categories
                            .find((c) => c.id === selectedCategoryId)
                            ?.subcategories.find((s) => s.id === selectedSubcategoryId)?.name}`
                        : selectedCategoryId
                            ? `Products in ${data.categories.find((c) => c.id === selectedCategoryId)?.name}`
                            : 'All Products'}
                </Text>

                {filteredProducts.length === 0 ? (
                    <Text style={styles.noProducts}>No products found</Text>
                ) : (
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item.id}
                        renderItem={renderProductItem}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop:25
    },
    sidebar: {
        width: '35%', // 30% width for sidebar
        backgroundColor: '#f8f8f8',
        borderRightWidth: 1,
        borderRightColor: '#fff',
        marginTop: 25,

    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },
    selectedCategoryItem: {
        backgroundColor: '#d0e8ff',
    },
    categoryText: {
        fontSize: 16,
    },
    expandIcon: {
        fontSize: 16,
        color: '#888',
    },
    subcategoryContainer: {
        backgroundColor: '#f0f7ff',
    },
    subcategoryItem: {
        paddingVertical: 12,
        paddingLeft: 30,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    selectedSubcategoryItem: {
        backgroundColor: '#b9d9ff',
    },
    subcategoryText: {
        fontSize: 14,
    },
    content: {
        width: '65%', // 70% width for content
        padding: 20,
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productCard: {
        backgroundColor: '#e2e8f0',
        padding: 15,
        marginBottom: 10,
        borderRadius: 6,
    },
    productName: {
        fontSize: 16,
    },
    noProducts: {
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
});