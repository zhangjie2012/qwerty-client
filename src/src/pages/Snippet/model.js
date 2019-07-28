import { message } from 'antd';
import { fetchSnippets, fetchSnippetDetail } from '@/services/snippet';

export default {
  namespace: 'snippet',

  state: {
    snippets: [],
    snippetDetail: null,
  },

  effects: {
    *fetchSnippets(_, { call, put }) {
      const response = yield call(fetchSnippets);
      if (response.status === 'ok') {
        yield put({
          type: 'saveSnippets',
          snippets: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },
    *fetchSnippetDetail({ id }, { call, put }) {
      const response = yield call(fetchSnippetDetail, id);
      if (response.status === 'ok') {
        yield put({
          type: 'saveSnippetDetail',
          snippetDetail: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },
  },

  reducers: {
    saveSnippets(state, { snippets }) {
      return {
        ...state,
        snippets /* [{ id, title, pl_tag }] */,
      };
    },
    saveSnippetDetail(state, { snippetDetail }) {
      return {
        ...state,
        snippetDetail,
      };
    },
  },
};
