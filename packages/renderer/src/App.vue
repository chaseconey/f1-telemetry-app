<script>
import SessionInfo from '/@/components/SessionInfo.vue';
import DriverTable from '/@/components/DriverTable.vue';

export default {
  components: { SessionInfo, DriverTable },
  data() {
    return {
      // TODO: type  this somehow?
      drivers: {},
    };
  },
  created() {
    window.api.handle('drivers', () => (event, data) => {
      this.drivers = data;
    });
  },
};
</script>
<template>
  <div class="container">
    <SessionInfo />
    <DriverTable :drivers="drivers" />
  </div>
</template>
