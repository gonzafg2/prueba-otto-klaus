<template>
  <div>
    <h1 class="my-4 text-center">Ingreso de usuarios</h1>
    <div class="container">
      <div class="row">
        <div class="col-6 mx-auto">
          <form
            @submit.prevent="ingresoUsuario({ email: email, password: pass })"
          >
            <div class="form-group">
              <label>Nombre de Usuario</label>
              <input
                class="form-control"
                type="email"
                placeholder="Ingrese email"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                class="form-control"
                placeholder="Ingrese contraseña"
                v-model="pass"
              />
            </div>
            <button class="btn btn-primary btn-block" type="submit">
              Acceder
            </button>
          </form>
        </div>
      </div>
      <p class="text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Ingreso",
  data() {
    return {
      email: "",
      pass: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["ingresoUsuario"])
  },
  computed: {
    ...mapState(["error"])
  }
};
</script>
