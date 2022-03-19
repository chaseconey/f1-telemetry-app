<script>
import TopNav from '/@/components/TopNav.vue';

export default {
  components: { TopNav },
  data() {
    return {};
  },

  created() {
    // Interval updates
    window.api.handle('drivers', () => (event, data) => {
      this.$store.state.drivers = data;
    });
    window.api.handle('session', () => (_event, data) => {
      this.$store.state.session = data;
    });
    window.api.handle('fastestLap', () => (_event, data) => {
      this.$store.state.fastestLap = data;
    });
    window.api.handle('fastestLap', () => (_event, data) => {
      this.$store.state.fastestLap = data;
    });

    // One and done
    window.api.send('loadDriverMap').then((driverMap) => {
      this.$store.state.driverMap = driverMap;
    });
  },
};
</script>
<template>
  <div class="container">
    <TopNav />
    <router-view />
    <div
      v-if="$store.state.drivers.length === 0"
      class="text-center fs-1"
    >
      Waiting for session ...
    </div>
  </div>
</template>
