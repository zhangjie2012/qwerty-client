import { message } from 'antd';
import { queryUser } from '@/services/about';

export default {
  namespace: 'about',

  state: {
    user: null,
  },

  effects: {
    *fetchUser(_, { call, put }) {
      const response = yield call(queryUser);
      if (response.status === 'ok') {
        yield put({
          type: 'saveUser',
          payload: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },
  },

  reducers: {
    saveUser(state, { payload }) {
      return {
        ...state,
        user: payload.user,
      };
    },
  },
};
