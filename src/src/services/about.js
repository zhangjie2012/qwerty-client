import request from '@/utils/request';

export async function queryUser() {
  return request('/server/user_info');
}
