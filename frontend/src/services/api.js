import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getMe = () => API.get('/auth/me');

// Portfolio (public read)
export const getPortfolio = () => API.get('/portfolio');

// Profile
export const updateProfile = (data) => API.put('/portfolio/profile', data);

// Skills
export const addSkillCategory = (data) => API.post('/portfolio/skills', data);
export const updateSkillCategory = (id, data) => API.put(`/portfolio/skills/${id}`, data);
export const deleteSkillCategory = (id) => API.delete(`/portfolio/skills/${id}`);

// Experiences
export const addExperience = (data) => API.post('/portfolio/experiences', data);
export const updateExperience = (id, data) => API.put(`/portfolio/experiences/${id}`, data);
export const deleteExperience = (id) => API.delete(`/portfolio/experiences/${id}`);

// Projects
export const addProject = (data) => API.post('/portfolio/projects', data);
export const updateProject = (id, data) => API.put(`/portfolio/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/portfolio/projects/${id}`);

// Education
export const addEducation = (data) => API.post('/portfolio/education', data);
export const updateEducation = (id, data) => API.put(`/portfolio/education/${id}`, data);
export const deleteEducation = (id) => API.delete(`/portfolio/education/${id}`);

// Languages
export const addLanguage = (data) => API.post('/portfolio/languages', data);
export const updateLanguage = (id, data) => API.put(`/portfolio/languages/${id}`, data);
export const deleteLanguage = (id) => API.delete(`/portfolio/languages/${id}`);

// Qualities
export const addQuality = (data) => API.post('/portfolio/qualities', data);
export const updateQuality = (id, data) => API.put(`/portfolio/qualities/${id}`, data);
export const deleteQuality = (id) => API.delete(`/portfolio/qualities/${id}`);

export default API;
