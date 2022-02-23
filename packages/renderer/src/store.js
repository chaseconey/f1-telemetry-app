import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      drivers: null,
      session: null,
      lapData: null,
      lapHistory: [],
      fastestLap: null,
    };
  },
  // mutations: {
  //   increment(state) {
  //     state.count++;
  //   },
  // },
});
