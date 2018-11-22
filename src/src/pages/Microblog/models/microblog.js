import moment from 'moment';
import { message } from 'antd';
import { queryMicroblogs } from '@/services/microblog';

export default {
  namespace: 'microblog',

  state: {
    currentPage: 0,
    totalPages: 0,
    microblogList: [] /* id, cover_img, content, publishDT */,
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryMicroblogs, payload.params);
      if (response.status === 'ok') {
        yield put({
          type: 'saveList',
          payload: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },
  },

  reducers: {
    saveList(state, { payload }) {
      const {
        current_page_num: currentPage,
        total_pages: totalPages,
        microblog_list: microblogList,
      } = payload;

      const microblogListBak = [];
      for (const microblog of microblogList) {
        microblog.publishDT = moment(microblog.publish_dt).format('YYYY-MM-DD HH:mm');
        microblogListBak.push(microblog);
      }

      return {
        ...state,
        currentPage,
        totalPages,
        microblogList: microblogListBak,
      };
    },
  },
};
