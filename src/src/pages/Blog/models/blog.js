import moment from 'moment';
import { message } from 'antd';
import { queryBlogs, queryBlogDetail } from '@/services/blog';

export default {
  namespace: 'blog',

  state: {
    currentPage: 1,
    totalPages: 1,
    articleList: [],

    articleDetail: null,
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

    *fetchBlogDetail({ payload }, { call, put }) {
      const response = yield call(queryBlogDetail, payload.params);
      if (response.status === 'ok') {
        yield put({
          type: 'saveBlog',
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

    saveBlog(state, { payload }) {
      const articleDetail = {
        title: payload.title,
        publishDT: moment(payload.publish_dt).format('YYYY-MM-DD HH:mm'),
        updateDT: moment(payload.update_dt).format('YYYY-MM-DD HH:mm'),
        category: payload.category,
        coverImg: payload.cover_img,
        imgCopyRight: payload.img_copyright,
        content: payload.content,
      };
      return {
        ...state,
        articleDetail,
      };
    },
  },
};
