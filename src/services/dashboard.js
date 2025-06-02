import axios from '@/plugins/axios';

export function getUserWithBalance(params) {
  return axios.get('/api/dashboard/user-and-balance', params).then((response) => response.data);
}
