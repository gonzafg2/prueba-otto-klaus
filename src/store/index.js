/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import { auth, db } from "../firebase/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    juguetes: [],
  },
  getters: {
    existeUsuario(state) {
      if (state.usuario === null) {
        return false;
      } else {
        return true;
      }
    },
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setJuguetes(state, payload) {
      state.juguetes.push(payload);
    },
  },
  actions: {
    ingresoUsuario({ commit }, usuario) {
      auth
        .signInWithEmailAndPassword(usuario.email, usuario.password)
        .then((res) => {
          const usuario = {
            email: res.user.email,
            uid: res.user.uid,
          };
          commit("setUsuario", usuario);
        })
        .catch((error) => {
          console.log(error);
          commit("setError", error);
        });
    },
    detectarUsuario({ commit }, usuario) {
      commit("setUsuario", usuario);
    },
    cerrarSesion({ commit }) {
      auth.signOut();
    },
    async getJuguetes({ commit }) {
      try {
        const query = await db.collection("juguetes").get();
        query.forEach((el) => {
          let id = el.id;
          let codigo = el.data().codigo;
          let nombre = el.data().nombre;
          let stock = el.data().stock;
          let precio = el.data().precio;

          let jug = {
            id,
            codigo,
            nombre,
            stock,
            precio,
          };

          commit("setJuguetes", jug);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
