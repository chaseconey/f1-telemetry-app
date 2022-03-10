<script>
import TopNav from '/@/components/TopNav.vue';

export default {
  components: { TopNav },
  data() {
    return {};
  },

  created() {
    window.api.handle('drivers', () => (event, data) => {
      this.$store.state.drivers = data;
    });
    window.api.handle('session', () => (_event, data) => {
      this.$store.state.session = data;
    });
    window.api.handle('fastestLap', () => (_event, data) => {
      this.$store.state.fastestLap = data;
    });
  },
};
</script>
<template>
  <div class="container">
    <TopNav />
    <router-view />
    <div
      v-if="!$store.state.drivers"
      class="text-center"
    >
      Waiting for match ...
    </div>
  </div>
</template>
