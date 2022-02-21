<script>
export default {
  props: {
    session: {
      type: Object,
      default: () => ({}),
    },
    fastestLap: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<template>
  <div class="row my-2">
    <div
      class="col py-2"
      :class="{ 'bg-warning': session?.m_safetyCarStatus == 1 }"
    >
      Safety Car: {{ session?.m_safetyCarStatus == 1 ? 'Yes' : 'No' }}
    </div>
    <div class="col py-2">Air Temp: {{ session?.m_airTemperature }}</div>
    <div class="col py-2">Session Type: {{ session?.m_sessionType }}</div>
    <div class="col py-2">Fastest Lap: {{ fastestLap }}</div>
  </div>
</template>
