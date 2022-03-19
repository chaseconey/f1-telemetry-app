import { createRouter, createWebHashHistory } from 'vue-router';
import DriverTable from '/@/components/DriverTable.vue';
import SessionInfo from '/@/components/SessionInfo.vue';

const routes = [
  { path: '/', component: SessionInfo },
  { path: '/race', component: DriverTable },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
