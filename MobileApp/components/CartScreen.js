import { SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Image ,Alert} from 'react-native';
import { useCart } from './../Context/CartProvider';
const CartScreen=()=> {
  const { cart, addToCart, getCartItemCount } = useCart();
  const total = cart.reduce((sum, item) => sum + item.amount, 0);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.screenText}>Cart Screen</Text>
      <Text>Total Amount: ${total}</Text>
      {/* Render cart items here */}
    </SafeAreaView>
  );
}
export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
   screenText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});