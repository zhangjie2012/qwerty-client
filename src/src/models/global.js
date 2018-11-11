import { querySiteInfo } from '@/services/site';

export default {
  namespace: 'global',

  state: {
    siteInfo: {
      title: '',
      copyright: '',
      ICP: '',
    },
  },

  effects: {
    *fetchSiteInfo(_, { call, put }) {
      const response = yield call(querySiteInfo);
      yield put({
        type: 'saveSiteInfo',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveSiteInfo(state, { payload }) {
      return {
        ...state,
        siteInfo: payload.site_info, // title, copyright, ICP
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
