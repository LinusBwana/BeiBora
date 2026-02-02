import api from './api';

const productService = {
    // Get all products
    getAllProducts: async () => {
        try {
            const data = await api.get('/products/');
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
};

export default productService;