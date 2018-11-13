import moment from 'moment';
import { message } from 'antd';
import { queryBlogs } from '@/services/blog';

export default {
  namespace: 'blog',

  state: {
    currentPage: 1,
    totalPages: 1,
    articleList: [],
  },

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
      const {
        current_page_num: currentPage,
        total_pages: totalPages,
        article_list: articleList,
      } = payload;

      const articleListBak = [];
      for (const article of articleList) {
        article.publish_dt = moment(article.publish_dt).format('YYYY-MM-DD HH:mm');
        articleListBak.push(article);
      }
      return {
        ...state,
        currentPage,
        totalPages,
        articleList,
      };
    },
  },
};
