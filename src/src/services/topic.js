import { stringify } from 'qs';
import request from '@/utils/request';

const prefix = '/server/topic/api/v1';

export async function queryTopics() {
  return request(`${prefix}/topics`);
}

export async function queryTopicComments(params) {
  return request(`${prefix}/comments?${stringify(params)}`);
}
