<script>
export default {
  data() {
    return {
      // TODO: type  this somehow?
      session: null,
    };
  },
  created() {
    window.api.handle('session', () => (_event, data) => {
      console.log(data);
      this.session = data;
    });
  },
};
</script>

<template>
  <div class="row my-2">
    <div
      class="col py-2"
      :class="{ 'bg-warning': session?.m_safetyCarStatus == 1 }"
    >
      Safety Car: {{ session?.m_safetyCarStatus == 1 ? "Yes" : "No" }}
    </div>
    <div class="col py-2">
      Air Temp: {{ session?.m_airTemperature }}
    </div>
    <div class="col py-2">
      Session Type: {{ session?.m_sessionType }}
    </div>
  </div>
</template>
