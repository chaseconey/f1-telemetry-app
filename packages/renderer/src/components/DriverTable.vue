<script>
export default {
  props: {
    drivers: {
      type: Array,
      default: Array,
    },
  },
  data() {
    return {
      lapData: null,
    };
  },
  computed: {
    sortedLapData() {
      if (!this.lapData || !this.drivers) {
        return [];
      }

      // Merge in Driver data
      let merged = this.lapData.m_lapData.map((obj, index) => ({
        ...obj,
        ...this.drivers.m_participants[index],
      }));

      // Remove dead cars
      const filtered = merged.filter((car) => car.m_carPosition > 0);

      // TODO: Map in driver names

      // Sort by position
      return filtered.sort((a, b) => a.m_carPosition - b.m_carPosition);
    },
  },
  created() {
    window.api.handle('lapData', () => (event, data) => {
      this.lapData = data;
    });
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Pos</th>
        <th>Driver</th>
        <th>Delta</th>
        <th>Last Lap</th>
        <th>Sector 1</th>
        <th>Sector 2</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(driver, idx) in sortedLapData"
        :key="idx"
      >
        <td>{{ driver.m_carPosition }}</td>
        <td>{{ driver.m_raceNumber || idx }}</td>
        <td>0</td>
        <td>{{ (driver.m_lastLapTimeInMS / 1000).toFixed(2) }}</td>
        <td>{{ (driver.m_sector1TimeInMS / 1000).toFixed(3) }}</td>
        <td>{{ (driver.m_sector2TimeInMS / 1000).toFixed(3) }}</td>
      </tr>
    </tbody>
  </table>
</template>
