import moment from 'moment';
import { message } from 'antd';
import {
  queryBlogs,
  queryBlogDetail,
  queryArchiveBlogs,
  queryBlogCategory,
  addComment,
} from '@/services/blog';

export default {
  namespace: 'blog',

  state: {
    currentPage: 1,
    totalPages: 1,
    articleList: [],

    articleDetail: null,
    comments: [],

    archive: [],
    categories: [],
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
        message.error(`出错啦：${response.message}`);
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
        message.error(`出错啦：${response.message}`);
      }
    },

    *clearBlogDetail(_, { put }) {
      yield put({
        type: 'resetBlogDetail',
      });
    },

    *fetchArchive(_, { call, put }) {
      const response = yield call(queryArchiveBlogs);
      if (response.status === 'ok') {
        yield put({
          type: 'saveArchive',
          payload: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },

    *fetchCategory(_, { call, put }) {
      const response = yield call(queryBlogCategory);
      if (response.status === 'ok') {
        yield put({
          type: 'saveCategory',
          payload: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },

    *addComment({ payload }, { call }) {
      const response = yield call(addComment, payload.params);
      if (response.status === 'ok') {
        message.success('评论已提交，等待审核中，请勿重复提交');
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
        article_list: articleList,
      } = payload;

      const articleListBak = [];
      for (const article of articleList) {
        article.publish_dt = moment(article.publish_dt).format('YYYY年MM月DD日');
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
      // eslint-disable-next-line
      const { comment_list } = payload;
      const articleDetail = {
        title: payload.title,
        publishDT: moment(payload.publish_dt).format('YYYY-MM-DD HH:mm'),
        updateDT: moment(payload.update_dt).format('YYYY-MM-DD HH:mm'),
        category: payload.category,
        coverImg: payload.cover_img,
        imgCopyRight: payload.img_copyright,
        content: payload.content,
        commentCount: comment_list.length,
        pageViewCount: payload.pv,
      };
      const comments = [];
      // eslint-disable-next-line
      for (const item of comment_list) {
        comments.push({
          ...item,
          publishDT: moment(item.publish_dt).format('YYYY年MM月DD日 HH:mm'),
        });
      }
      return {
        ...state,
        articleDetail,
        comments,
      };
    },

    resetBlogDetail(state) {
      return {
        ...state,
        articleDetail: null,
        comments: [],
      };
    },

    saveArchive(state, { payload }) {
      const archiveArticles = [];
      for (const item of payload) {
        const articles = [];
        for (const article of item.articles) {
          articles.push({
            ...article,
            publishDT: moment(article.publish_dt).format('MM-DD'),
          });
        }
        archiveArticles.push({
          year: item.year,
          articles,
        });
      }

      return {
        ...state,
        archive: archiveArticles,
      };
    },

    saveCategory(state, { payload }) {
      const categories = [];
      for (const item of payload) {
        const articles = [];
        for (const article of item.articles) {
          articles.push({
            ...article,
            publishDT: moment(article.publish_dt).format('YYYY-MM-DD'),
          });
        }
        categories.push({
          category: item.category,
          articles,
        });
      }

      return {
        ...state,
        categories,
      };
    },
  },
};
