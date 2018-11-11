import { message } from 'antd';
import { queryBlogs } from '@/services/blog';

export default {
  namespace: 'blog',

  state: {},

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryBlogs, payload.params);
      if (response.status === 'ok') {
        yield put({
          type: 'saveList',
          payload: response.data,
        });
      } else {
        message.error(`出错啦：${response.error}`);
      }
    },
  },

  reducers: {
    saveList(state, { payload }) {
      console.log(payload);
      return {
        ...state,
      };
    },
  },
};
