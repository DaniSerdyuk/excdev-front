import axios from '@/plugins/axios';

const STORAGE_KEY_TOKEN = 'access_token';

export function setTokenToLocalStorage(token) {
  localStorage.setItem(STORAGE_KEY_TOKEN, token);
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem(STORAGE_KEY_TOKEN);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem(STORAGE_KEY_TOKEN);
}

export function login(params) {
  return axios
    .post('/api/auth/login', params, { skipLogout: true })
    .then((response) => response.data);
}

export function logout() {
  return axios.post('/api/auth/logout', {}, { skip: true });
}
