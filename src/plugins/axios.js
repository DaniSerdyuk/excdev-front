import parentAxios from 'axios';
import router from '@/router';
import { getTokenFromLocalStorage } from '@/services/auth';
import { useAuth } from '@/stores/auth';
import { getApiHost } from '@/config/env';
import { useToast } from 'vue-toastification';

const axios = parentAxios.create({
  baseURL: getApiHost(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const $toast = useToast();

/**
 * @return {Promise<void>}
 */
function clearAndMoveToLogin() {
  const authStore = useAuth();

  authStore.logout().finally(() => router.push({ name: 'login' }));
}

/**
 * @return {void}
 */
function requestInterceptors() {
  axios.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${getTokenFromLocalStorage()}`;

      return config;
    },
    (error) => Promise.reject(error),
  );
}

/**
 * @param {AxiosError} error
 *
 * @returns {string}
 */
function getErrorMessage(error) {
  return error.response ? error.response.data.error.error_message : error.message;
}

/**
 * @return {void}
 */
function responseInterceptors() {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const message = getErrorMessage(error);

      if (error.response && (error.response.status === 401 || error.response.status === 419)) {
        await clearAndMoveToLogin();
      }

      $toast.error(message);

      return Promise.reject(message);
    },
  );
}

/**
 * @return {void}
 */
export function setInterceptors() {
  requestInterceptors();
  responseInterceptors();
}

export default axios;
