<script>
import SessionInfo from '/@/components/SessionInfo.vue';
import DriverTable from '/@/components/DriverTable.vue';
import { mergeData } from '/@/utils';

export default {
  components: { SessionInfo, DriverTable },
  data() {
    return {
      // TODO: type  this somehow?
      drivers: null,
      session: null,
      lapData: null,
      lapHistory: [],
      fastestLap: null,
    };
  },
  computed: {
    mergedDriverData() {
      if (
        !this.lapData?.m_lapData ||
        !this.drivers?.m_participants ||
        !this.lapHistory
      ) {
        return [];
      }

      return mergeData(
        this.lapData.m_lapData,
        this.drivers.m_participants,
        this.lapHistory
      );
    },
  },
  created() {
    window.api.handle('drivers', () => (event, data) => {
      this.drivers = data;
    });
    window.api.handle('lapData', () => (event, data) => {
      this.lapData = data;
    });
    window.api.handle('session', () => (_event, data) => {
      this.session = data;
    });
    window.api.handle('lapHistory', () => (_event, data) => {
      this.lapHistory = data;
    });
    window.api.handle('fastestLap', () => (_event, data) => {
      this.fastestLap = data;
    });
  },
};
</script>
<template>
  <div class="container">
    <SessionInfo :session="session" :fastest-lap="fastestLap" />
    <DriverTable :drivers="mergedDriverData" :fastest-lap="fastestLap" />
  </div>
</template>
