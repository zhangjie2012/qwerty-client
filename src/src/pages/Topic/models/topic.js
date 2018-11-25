import moment from 'moment';
import { message } from 'antd';
import { queryTopics, queryTopicComments } from '@/services/topic';

export default {
  namespace: 'topic',

  state: {
    topicList: [],

    currentTopic: null,
    commentList: [],
  },

  effects: {
    *fetchTopics(_, { call, put }) {
      const response = yield call(queryTopics);
      if (response.status === 'ok') {
        yield put({
          type: 'saveTopics',
          payload: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },

    *fetchComments({ payload }, { call, put }) {
      const response = yield call(queryTopicComments, payload.params);
      if (response.status === 'ok') {
        yield put({
          type: 'saveComments',
          payload: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },
  },

  reducers: {
    saveTopics(state, { payload }) {
      const topicList = [];
      for (const topic of payload) {
        const createDT = moment(topic.create_dt).format('YYYY-MM-DD HH:mm');
        const updateDT = moment(topic.update_dt).format('YYYY-MM-DD HH:mm');
        topicList.push({
          ...topic /* id, title, archive, comment_count, tags[{name, slug}] */,
          createDT,
          updateDT,
        });
      }
      return {
        ...state,
        topicList,
      };
    },

    saveComments(state, { payload }) {
      const { topic, comment_list } = payload; /* eslint-disable-line */
      topic.createDT = moment(topic.create_dt).format('YYYY-MM-DD HH:mm');
      topic.updateDT = moment(topic.update_dt).format('YYYY-MM-DD HH:mm');
      const commentList = [];
      // eslint-disable-next-line
      for (const comment of comment_list) {
        const { article } = comment;
        if (article !== null) {
          article.createDT = moment(comment.create_dt).format('YYYY-MM-DD HH:mm');
        }
        commentList.push({
          ...comment,
          article,
          createDT: moment(comment.create_dt).format('YYYY-MM-DD HH:mm'),
        });
      }

      return {
        ...state,
        currentTopic: topic /* id, title, tags, createDT, updateDT */,
        commentList /* id, content, createDT, article:{title, slug} */,
      };
    },
  },
};
