import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Categories
export const getCategories = () => api.get('/categories');
export const getCategoryBySlug = (slug) => api.get(`/categories/${slug}`);
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Products
export const getProducts = (params = {}) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);

// File Upload
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return axios.post(`${API_BASE_URL.replace('/api', '')}/api/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default api;
