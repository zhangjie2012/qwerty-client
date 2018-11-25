import { stringify } from 'qs';
import request from '@/utils/request';

const prefix = '/server/topic/api/v1';

export async function queryTopics() {
  return request(`${prefix}/query_topics`);
}

export async function queryTopicComments(params) {
  return request(`${prefix}/query_topic_comments?${stringify(params)}`);
}
