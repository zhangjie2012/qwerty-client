import { stringify } from 'qs';
import request from '@/utils/request';

const prefix = '/server/blog/api/v1';

export async function queryBlogs(params) {
  return request(`${prefix}/query_blogs?${stringify(params)}`);
}

export async function queryBlogDetail(params) {
  return request(`${prefix}/query_blog_detail?${stringify(params)}`);
}

export async function queryBlogComments(params) {
  return request(`${prefix}/query_blog_comments?${stringify(params)}`);
}

export async function queryArchiveBlogs() {
  return request(`${prefix}/query_archive_blogs`);
}

export async function queryBlogCategory() {
  return request(`${prefix}/query_blog_categories`);
}

export async function addComment(params) {
  return request(`${prefix}/add_comment`, {
    method: 'POST',
    body: params,
  });
}