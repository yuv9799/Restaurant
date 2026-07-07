import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const authApi = {
  sendOTP: (email: string) => api.post('/auth/send-otp', { email }),
  verifyOTP: (data: { email: string; otp: string; name?: string; phone?: string }) =>
    api.post('/auth/verify-otp', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Menu
export const menuApi = {
  getAll: (params?: { category?: string; veg?: string; nonveg?: string; jain?: string; search?: string }) =>
    api.get('/menu', { params }),
  getById: (id: string) => api.get(`/menu/${id}`),
};

// Drinks
export const drinksApi = {
  getAll: (params?: { category?: string; search?: string }) =>
    api.get('/drinks', { params }),
};

// Reservations
export const reservationApi = {
  create: (data: any) => api.post('/reservations', data),
  getAvailability: (date: string) =>
    api.get('/reservations/availability', { params: { date } }),
  getMyReservations: () => api.get('/reservations/my'),
  cancel: (id: string) => api.delete(`/reservations/${id}`),
};

// Tables
export const tablesApi = {
  getStatus: (date?: string) =>
    api.get('/tables/status', { params: { date } }),
};

// Private Dining
export const privateDiningApi = {
  submitInquiry: (data: any) => api.post('/private-dining/inquiry', data),
};

// Awards
export const awardsApi = {
  getAll: () => api.get('/awards'),
};

// Reviews
export const reviewsApi = {
  getAll: (params?: { platform?: string; rating?: string; page?: number }) =>
    api.get('/reviews', { params }),
  submit: (data: any) => api.post('/reviews', data),
};

// Contact
export const contactApi = {
  submit: (data: { name: string; email: string; message: string }) =>
    api.post('/contact', data),
};

// Orders
export const ordersApi = {
  create: (data: any) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
};

export default api;