import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      drivers: [],
      driverMap: {},
      fastestLap: null,
      session: null,
    };
  },
  getters: {
    getDriverNameByRacingNumber: (state) => (number) => {
      return state.driverMap?.[number]?.name;
    },
  },
  // mutations: {
  //   increment(state) {
  //     state.count++;
  //   },
  // },
});
