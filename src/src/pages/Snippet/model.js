import { message } from 'antd';
import { fetchSnippets } from '@/services/snippet';

export default {
  namespace: 'snippet',

  state: {
    snippets: [],
  },

  effects: {
    *fetchSnippets(_, { call, put }) {
      const response = yield call(fetchSnippets);
      if (response.status === 'ok') {
        yield put({
          type: 'saveSnippet',
          snippets: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },
  },

  reducers: {
    saveSnippet(state, { snippets }) {
      return {
        ...state,
        snippets,
      };
    },
  },
};
