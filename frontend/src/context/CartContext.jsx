import { createContext, useState, useEffect, useContext } from 'react';
import cartService from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load cart on mount
    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const data = await cartService.getCart();
            setCart(data);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            const data = await cartService.addToCart(productId, quantity);
            setCart(data);
            return { success: true };
        } catch (error) {
            console.error('Error adding to cart:', error);
            return { 
                success: false, 
                error: error.quantity || error.detail || 'Failed to add to cart' 
            };
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            await cartService.updateCartItem(itemId, quantity);
            await loadCart(); // Reload cart
            return { success: true };
        } catch (error) {
            console.error('Error updating cart:', error);
            return { 
                success: false, 
                error: error.quantity || error.detail || 'Failed to update quantity' 
            };
        }
    };

    const removeItem = async (itemId) => {
        try {
            await cartService.removeCartItem(itemId);
            await loadCart(); // Reload cart
            return { success: true };
        } catch (error) {
            console.error('Error removing item:', error);
            return { 
                success: false, 
                error: error.detail || 'Failed to remove item' 
            };
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clearCart();
            await loadCart();
            return { success: true };
        } catch (error) {
            console.error('Error clearing cart:', error);
            return { 
                success: false, 
                error: error.detail || 'Failed to clear cart' 
            };
        }
    };

    const value = {
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart: loadCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};