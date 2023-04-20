import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPenToSquare,
  faFloppyDisk,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "./assets/main.css";

library.add(faPenToSquare, faFloppyDisk, faTrash, faPlus);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
