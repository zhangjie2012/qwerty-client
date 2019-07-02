import request from '@/utils/request';

const prefix = '/server/resume/api/v1';

export async function queryResume() {
  return request(`${prefix}/resume`);
}
