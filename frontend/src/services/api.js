// Use environment variable
// const API_BASE_URL = import.meta.env.VITE_API_URL;

// Base URL for your Django backend
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Helper to make fetch requests
const apiRequest = async (endpoint, options = {}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                detail: 'An error occurred'
            }));
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }

};

// Export methods
const api = {
    get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
    post: (endpoint, data) => apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

export default api;