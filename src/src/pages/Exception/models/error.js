export default {
  namespace: 'error',

  state: {},

  effects: {},

  reducers: {
    trigger(state, action) {
      return {
        error: action.payload,
      };
    },
  },
};
