import { createApp } from "vue";
import UUID from "vue3-uuid";

import App from "./App.vue";

const app = createApp(App);
app.use(UUID).mount("#app");
