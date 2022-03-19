<script>
import { mapState, mapGetters } from 'vuex';
import SectorTimeCells from './SectorTimeCells.vue';
import TireWearCell from './TireWearCell.vue';
import CarDamageCell from './CarDamageCell.vue';

export default {
  components: { SectorTimeCells, TireWearCell, CarDamageCell },
  computed: {
    ...mapState(['drivers', 'fastestLap']),
    sortedLapData() {
      if (!this.drivers) {
        return [];
      }
      // Remove dead cars
      const filtered = this.drivers?.filter((car) => car.m_carPosition > 0);
      // Sort by position
      return filtered.sort((a, b) => a.m_carPosition - b.m_carPosition);
    },
    ...mapGetters(['getDriveNameByRacingNumber']),
  },
  methods: {
    formatNonZero(numberInMs) {
      if (numberInMs == 0) return '-';
      return (numberInMs / 1000).toFixed(3);
    },
    isFastestLap(driver) {
      return (
        driver?.m_bestLapTimeLapNum == driver?.m_currentLapNum - 1 &&
        driver.m_currentLapNum != 1
      );
    },
    isDriverActive(driver) {
      return [2, 3].includes(driver.m_resultStatus);
    },
  },
};
</script>

<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th scope="col">
          Pos
        </th>
        <th scope="col">
          Driver
        </th>
        <th scope="col">
          Last Lap
        </th>
        <th scope="col">
          S1
        </th>
        <th scope="col">
          S2
        </th>
        <th scope="col">
          S3
        </th>
        <th scope="col">
          Wear
        </th>
        <th scope="col">
          Dmg
        </th>
        <th scope="col">
          Pen
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(driver, idx) in sortedLapData"
        :key="idx"
        :class="{
          'table-warning': !isDriverActive(driver),
        }"
        scope="row"
      >
        <td>{{ driver.m_carPosition }}</td>
        <td>{{ getDriveNameByRacingNumber(driver.m_raceNumber) }}</td>
        <template v-if="isDriverActive(driver)">
          <td
            class="text-end"
            :class="{
              'table-success': isFastestLap(driver),
              'bg-purple text-white':
                driver?.m_lastLapTimeInMS * 1000 == fastestLap,
            }"
          >
            {{ formatNonZero(driver.m_lastLapTimeInMS) }}
          </td>
          <SectorTimeCells :driver="driver" />
          <TireWearCell :driver="driver" />
          <CarDamageCell :driver="driver" />
          <td class="text-end">
            {{ driver.m_penalties || 0 }}s
          </td>
        </template>
        <template v-else>
          <td
            colspan="7"
            class="text-center"
          >
            DNF
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.bg-purple {
  background-color: '#9400d3';
}
</style>
