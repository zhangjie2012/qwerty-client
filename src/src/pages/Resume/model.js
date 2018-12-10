import moment from 'moment';
import { message } from 'antd';
import { queryResume } from '@/services/resume';

export default {
  namespace: 'resume',

  state: {
    educationList: [],
    jobList: [],
  },

  effects: {
    *fetchResume(_, { call, put }) {
      const response = yield call(queryResume);
      if (response.status === 'ok') {
        yield put({
          type: 'saveResume',
          payload: response.data,
        });
      } else {
        message.error(`出错啦：${response.message}`);
      }
    },
  },

  reducers: {
    saveResume(state, { payload }) {
      const now = new Date();
      const educationList = [];
      for (const education of payload.education_list) {
        educationList.push({
          ...education,
          end_dt: moment(education.end_dt, 'YYYY-MM-DD').toDate() > now ? 'Now' : education.end_dt,
        });
      }

      const jobList = [];
      for (const job of payload.job_list) {
        jobList.push({
          ...job,
          end_dt: moment(job.end_dt, 'YYYY-MM-DD').toDate() > now ? 'Now' : job.end_dt,
        });
      }

      return {
        ...state,
        educationList,
        jobList,
      };
    },
  },
};
