<script>
import { mergeData } from '/@/utils';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['lapData', 'drivers', 'lapHistory', 'fastestLap']),
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
        this.lapHistory,
      );
    },
    sortedLapData() {
      if (!this.mergedDriverData) {
        return [];
      }

      // Remove dead cars
      const filtered = this.mergedDriverData?.filter(
        (car) => car.m_carPosition > 0,
      );

      // TODO: Map in driver names

      // Sort by position
      return filtered.sort((a, b) => a.m_carPosition - b.m_carPosition);
    },
  },
  methods: {
    formatNonZero(numberInMs) {
      if (numberInMs == 0) return '-';
      return (numberInMs / 1000).toFixed(3);
    },
    isPersonalBestSector(driver, bestSectorLap) {
      return (
        bestSectorLap == driver.m_currentLapNum && driver.m_currentLapNum != 1
      );
    },
    isFastestLap(driver) {
      return (
        driver?.m_bestLapTimeLapNum == driver?.m_currentLapNum - 1 &&
        driver.m_currentLapNum != 1
      );
    },
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Pos</th>
        <th>Driver</th>
        <th>Last Lap</th>
        <th>S1</th>
        <th>S2</th>
        <th>Penalties</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(driver, idx) in sortedLapData"
        :key="idx"
      >
        <td>{{ driver.m_carPosition }}</td>
        <td>{{ driver.m_raceNumber || idx }}</td>
        <td
          class="text-end"
          :class="{
            'bg-success text-white': isFastestLap(driver),
            'bg-purple text-white':
              driver?.m_lastLapTimeInMS * 1000 == fastestLap,
          }"
        >
          {{ formatNonZero(driver.m_lastLapTimeInMS) }}
        </td>
        <td
          class="text-end"
          :class="{
            'bg-success text-white': isPersonalBestSector(
              driver,
              driver.m_bestSector1LapNum
            ),
          }"
        >
          {{ formatNonZero(driver.m_sector1TimeInMS) }}
        </td>
        <td
          class="text-end"
          :class="{
            'bg-success text-white': isPersonalBestSector(
              driver,
              driver.m_bestSector2LapNum
            ),
          }"
        >
          {{ formatNonZero(driver.m_sector2TimeInMS) }}
        </td>
        <td class="text-end">
          {{ driver.m_penalties || 0 }}s
          <span
            :class="{ 'bg-warning text-dark': driver.m_warnings > 0 }"
            class="badge bg-secondary text-white"
          >{{ driver.m_warnings || 0 }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.bg-purple {
  background-color: '#9400d3';
}
</style>
