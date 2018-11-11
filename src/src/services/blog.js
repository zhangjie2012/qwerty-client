import { stringify } from 'qs';
import request from '@/utils/request';

const prefix = '/server/blog/api/v1';

export async function queryBlogs(params) {
  return request(`${prefix}/query_blogs?${stringify(params)}`);
}
