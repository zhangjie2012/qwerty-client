import request from '@/utils/request';

export async function querySiteInfo() {
  return request('/server/site');
}
