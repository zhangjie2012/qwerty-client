import request from '@/utils/request';

const prefix = '/server/snippet/api/v1';

export async function fetchSnippets() {
  return request(`${prefix}/snippets`);
}
