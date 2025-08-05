// Add or update a product in the cart
export function addOrUpdateCart(cart, product, quantity) {
  const price = 99; // Replace with product.price if available
  const existing = cart.find(item => item.id === product.id);
  if (quantity === 0) {
    // Remove from cart if quantity is 0
    return cart.filter(item => item.id !== product.id);
  } else if (existing) {
    // Update quantity and amount
    return cart.map(item =>
      item.id === product.id
        ? { ...item, quantity, amount: price * quantity }
        : item
    );
  } else {
    // Add new item
    return [
      ...cart,
      {
        id: product.id,
        name: product.name,
        price: price,
        quantity: quantity,
        amount: price * quantity,
      },
    ];
  }
}