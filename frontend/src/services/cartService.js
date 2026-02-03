import api from './api';

const cartService = {
    // Get user's cart
    getCart: async () => {
        try {
            const data = await api.get('/cart/');
            return data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },

    // Add item to cart
    addToCart: async (productId, quantity = 1) => {
        try{
            const data = await api.post('/cart/add_item/', {
                product_id: productId,
                quantity: quantity,
            });
        }catch (error){
            console.error('Error adding to cart:', error);
            throw error;
        }
    },

    // Get cart items
    getCartItems: async () => {
        try {
            const data = await api.get('/cart/items/');
            return data;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            throw error;
        }
    },

    // Update cart item quantity
    updateCartItem: async (itemId, quantity) => {
        try {
            const data = await api.patch(`/cart/items/${itemId}/`, {
                quantity: quantity,
            });
            return data;
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw error;
        }
    },

    // Remove item from cart
    removeCartItem: async (itemId) => {
        try {
            const data = await api.delete(`/cart/items/${itemId}/`);
            return data;
        } catch (error) {
            console.error('Error removing cart item:', error);
            throw error;
        }
    },

    // Clear cart
    clearCart: async () => {
        try {
            const data = await api.delete('/cart/clear/');
            return data;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    },

    // Checkout
    checkout: async (shippingData) => {
        try {
            const data = await api.post('/cart/checkout/', shippingData);
            return data;
        } catch (error) {
            console.error('Error during checkout:', error);
            throw error;
        }
    },

};

export default cartService;