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
    getDriveNameByRacingNumber: (state) => (number) => {
      return state.driverMap[number]?.name || number;
    },
  },
  // mutations: {
  //   increment(state) {
  //     state.count++;
  //   },
  // },
});
