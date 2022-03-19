<script>
export default {
  props: { driver: { type: Object, default: () => {} } },
  computed: {
    getSectorData() {
      // If a new lap has started, show last lap until first sector is done
      if (this.driver.m_sector1TimeInMS === 0) {
        return this.driver.m_lapHistoryData[this.driver.m_currentLapNum - 2];
      } else {
        return this.driver.m_lapHistoryData[this.driver.m_currentLapNum - 1];
      }
    },
  },
  methods: {
    formatNonZero(numberInMs) {
      if (numberInMs == 0 || !numberInMs) return '-';
      return (numberInMs / 1000).toFixed(3);
    },
    isPersonalBestSector(sector) {
      const bestLap = this.driver[`m_bestSector${sector}LapNum`];

      // Use last lap if we haven't completed sector 1 of next lap
      if (this.driver.m_sector1TimeInMS === 0) {
        return (
          bestLap == this.driver.m_currentLapNum - 1 &&
          this.driver.m_currentLapNum != 1
        );
      }

      return (
        bestLap == this.driver.m_currentLapNum &&
        this.driver.m_currentLapNum != 1
      );
    },
  },
};
</script>

<template>
  <td
    class="text-end"
    :class="{
      'table-success': isPersonalBestSector(1),
    }"
  >
    {{ formatNonZero(getSectorData?.m_sector1TimeInMS) }}
  </td>
  <td
    class="text-end"
    :class="{
      'table-success': isPersonalBestSector(2),
    }"
  >
    {{ formatNonZero(getSectorData?.m_sector2TimeInMS) }}
  </td>
  <td
    class="text-end"
    :class="{
      'table-success': isPersonalBestSector(3),
    }"
  >
    {{ formatNonZero(getSectorData?.m_sector3TimeInMS) }}
  </td>
</template>
<style scoped></style>
