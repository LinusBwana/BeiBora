import api from './api';

const orderService = {
    // Get all user's orders
    getAllOrders: async () => {
        try {
            const data = await api.get('/orders/');
            return data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    // Get single order
    getOrder: async (id) => {
        try {
            const data = await api.get(`/orders/${id}/`);
            return data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    },
};

export default orderService;