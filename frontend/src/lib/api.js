import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE}/api`,
  withCredentials: true
});

export const Auth = {
  me: () => api.get('/auth/me').then(r => r.data),
  login: (data) => api.post('/auth/login', data).then(r => r.data),
  register: (data) => api.post('/auth/register', data).then(r => r.data),
  logout: () => api.post('/auth/logout')
};

export const Events = {
  list: (filter) => api.get('/events', { params: { filter } }).then(r => r.data),
  create: (payload) => api.post('/events', payload).then(r => r.data),
  update: (id, payload) => api.patch(`/events/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/events/${id}`),
  share: (id, isPublic) => api.post(`/events/${id}/share`, { isPublic }).then(r => r.data),
  publicGet: (shareId) => api.get(`/public/e/${shareId}`).then(r => r.data)
};