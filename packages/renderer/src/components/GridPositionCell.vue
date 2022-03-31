<script>
export default {
  props: {
    driver: { type: Object, default: () => {} },
    session: { type: Object, default: () => {} },
  },
  computed: {
    positionsChanged() {
      return this.driver.m_gridPosition - this.driver.m_carPosition;
    },
  },
  methods: {},
};
</script>

<template>
  <td class="text-nowrap">
    <span class="badge bg-dark fs-5">{{ driver.m_carPosition }}</span>

    <!-- <span class="fs-5">{{ driver.m_carPosition }}</span> -->
    <span
      v-if="
        positionsChanged &&
          positionsChanged !== 0 &&
          session.m_sessionType === 10
      "
      class="ms-2"
      :class="{
        'text-danger': positionsChanged < 0,
        'text-success': positionsChanged > 0,
      }"
    >{{ positionsChanged > 0 ? '▲' : '▼' }}
      {{ Math.abs(positionsChanged) }}</span>
  </td>
</template>
<style scoped></style>
