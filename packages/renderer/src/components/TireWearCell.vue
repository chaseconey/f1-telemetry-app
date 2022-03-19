<script>
export default {
  props: { driver: { type: Object, default: () => {} } },
  methods: {
    formatTireWear(wear) {
      if (wear === 0) {
        return '-';
      }

      const percentage = wear.toFixed(1);

      return `${percentage}%`;
    },
  },
};
</script>

<template>
  <td>
    <div class="d-flex justify-content-evenly">
      <span>{{ formatTireWear(driver.m_tyresWear[0]) }}</span>
      <span>{{ formatTireWear(driver.m_tyresWear[1]) }}</span>
    </div>
    <div class="d-flex justify-content-evenly">
      <span>{{ formatTireWear(driver.m_tyresWear[2]) }}</span>
      <span>{{ formatTireWear(driver.m_tyresWear[3]) }}</span>
    </div>
  </td>
</template>
<style scoped></style>
