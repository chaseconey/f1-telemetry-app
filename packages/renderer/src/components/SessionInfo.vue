<script>
import { mapState } from 'vuex';
import { tracks, weatherTypes, sessionTypes } from '/@/constants';

export default {
  computed: {
    ...mapState(['session']),
    weatherTypes() {
      return weatherTypes;
    },
    tracks() {
      return tracks;
    },
    sessionTypes() {
      return sessionTypes;
    },
    filteredWeatherSamples() {
      if (!this.session?.m_weatherForecastSamples) {
        return [];
      }

      return this.session.m_weatherForecastSamples.filter(
        (sample) => sample.m_trackTemperature > 0,
      );
    },
  },
};
</script>

<template>
  <div v-if="session?.m_trackId">
    <h1>
      {{ tracks[session?.m_trackId] }}
      <span class="fs-6">({{ sessionTypes[session?.m_sessionType] }})</span>
    </h1>
    <!-- <p>{{ session?.m_header }}</p> -->
    <h2>Quick Stats</h2>
    <div class="row my-2">
      <div
        class="col py-2"
        :class="{ 'bg-warning': session?.m_safetyCarStatus == 1 }"
      >
        Safety Car: {{ session?.m_safetyCarStatus == 1 ? 'Yes' : 'No' }}
      </div>
      <div class="col py-2">
        Air Temp: {{ session?.m_airTemperature }}
      </div>
    </div>
    <h2>Forecast</h2>
    <div class="row my-2">
      <div
        v-for="sample in filteredWeatherSamples"
        :key="sample.m_timeOffset"
        class="col"
      >
        <div class="d-flex flex-column text-center border">
          <b>{{ weatherTypes[sample.m_weather] }}</b>

          <div>{{ sample.m_trackTemperature }}°</div>
          <div>{{ sample.m_rainPercentage }}%</div>
          {{ sample.m_timeOffset }} m
        </div>
      </div>
    </div>
  </div>
</template>
