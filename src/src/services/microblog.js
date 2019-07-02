import { stringify } from 'qs';
import request from '@/utils/request';

const prefix = '/server/microblog/api/v1';

export async function queryMicroblogs(params) {
  return request(`${prefix}/microblogs?${stringify(params)}`);
}
