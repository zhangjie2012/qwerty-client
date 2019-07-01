import { stringify } from 'qs';
import request from '@/utils/request';

const prefix = '/server/blog/api/v1';

export async function queryBlogs(params) {
  return request(`${prefix}/blogs?${stringify(params)}`);
}

export async function queryBlogDetail(slug) {
  return request(`${prefix}/blogs/${slug}`);
}

export async function queryArchiveBlogs() {
  return request(`${prefix}/archives`);
}

export async function queryBlogCategory() {
  return request(`${prefix}/categories`);
}
