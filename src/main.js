// import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import BootstrapVue3 from "bootstrap-vue-3";
import router from "./router";

// Since every component imports their Bootstrap functionality,
// the following line is not necessary:
// import 'bootstrap'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Offcanvas } from "bootstrap";

const app = createApp(App);
app.component("VueDatePicker", VueDatePicker);
app.use(BootstrapVue3);
app.use(router);

app.mount("#app");
