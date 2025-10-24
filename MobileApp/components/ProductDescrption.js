import {StyleSheet, Text, View} from "react-native";

const ProductDescrption = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Hello world</Text>
    </View>
)

export default ProductDescrption;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});