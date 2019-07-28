import request from '@/utils/request';

const prefix = '/server/snippet/api/v1';

export async function fetchSnippets() {
  return request(`${prefix}/snippets`);
}

export async function fetchSnippetDetail(id) {
  return request(`${prefix}/snippets/${id}`);
}
