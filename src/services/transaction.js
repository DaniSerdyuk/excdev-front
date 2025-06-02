import axios from '@/plugins/axios';
import qs from 'qs';

export function getTransactions(userId, params) {
  return axios
    .get(`/api/dashboard/${userId}/transactions`, {
      params,
      paramsSerializer: (params) => qs.stringify(params),
    })
    .then((response) => response.data);
}
