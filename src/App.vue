<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand text-white">Otto Klaus</a>
        <span class="text-white ml-auto mr-3">{{ usuario.email }}</span>
        <button
          class="btn btn-danger"
          @click="cerrarSesion"
          v-if="existeUsuario"
        >
          Cerrar Sesión
        </button>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["cerrarSesion", "getJuguetes"])
  },
  computed: {
    ...mapGetters(["existeUsuario"]),
    ...mapState(["usuario"])
  },
  created() {
    this.getJuguetes();
  }
};
</script>

<style lang="scss"></style>
