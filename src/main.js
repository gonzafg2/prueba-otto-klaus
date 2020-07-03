import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import { auth } from "./firebase/firebase";

auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch("detectarUsuario", { email: user.email, uid: user.uid });
  } else {
    store.dispatch("detectarUsuario", user);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
