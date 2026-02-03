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

    // Get single product
    getProduct: async () => {
        try {
            const data = await api.get(`/products/${id}`);
            return data
        } catch (error) {
            console.log('Error fetching product:', error);
            throw error;
        }
    },

    // Get all categories
    getAllCategories: async () => {
        try {
            const data = await api.get(`/products/categories/`);
            return data;
        } catch (error) {
            console.log('Error fetching categories:', error);
            throw error;
        }
    },

    // Filter products by category
    getProductByCategory: async () => {
        try {
            const data = await api.get(`/products/?category=${categoryId}`);
            return data;
        } catch (error) {
            console.log('Error fetching products by category:', error);
            throw error;
        }
    },

    // Filter products by gender
    getProductsByGender: async (gender) => {
        try {
            const data = await api.get(`/products/?gender=${gender}`);
            return data;
        } catch (error) {
            console.error('Error fetching products by gender:', error);
            throw error;
        }
    },

    // Search products
    searchProducts: async (query) => {
        try {
            const data = await api.get(`/products/?search=${query}`);
            return data;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    },

};


export default productService;