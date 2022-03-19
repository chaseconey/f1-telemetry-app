<script>
import { carParts } from '/@/constants';

export default {
  props: { driver: { type: Object, default: () => {} } },
  computed: {
    damagedParts() {
      if (!this.driver) {
        return [];
      }

      const parts = [
        'm_frontLeftWingDamage',
        'm_frontRightWingDamage',
        'm_rearWingDamage',
        'm_floorDamage',
        'm_diffuserDamage',
        'm_sidepodDamage',
      ];

      let damaged = [];
      parts.forEach((p) => {
        if (this.driver[p] > 0) {
          damaged.push({
            part: carParts[p],
            percentage: this.driver[p],
          });
        }
      });

      return damaged;
    },
  },
  methods: {
    formatDmg(dmg) {
      const percentage = dmg.toFixed(1);

      return `${percentage}%`;
    },
  },
};
</script>

<template>
  <td
    :class="{
      'table-warning': damagedParts.length > 0,
    }"
  >
    <div
      v-for="part in damagedParts"
      :key="part"
      class=""
    >
      <div>{{ part.part }}: {{ formatDmg(part.percentage) }}</div>
    </div>
  </td>
</template>
<style scoped></style>
