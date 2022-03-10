import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      drivers: null,
      session: null,
      fastestLap: null,
    };
  },
  // mutations: {
  //   increment(state) {
  //     state.count++;
  //   },
  // },
});
