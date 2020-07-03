<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5 my-4">
        <h2 class="text-center">Listado de Juguetes</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-2 mb-5 mx-auto">
        <button
          class="btn btn-success btn-block"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Agregar Juguete
        </button>
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Ingreso de Juguete
                </h5>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label>Código</label>
                    <input
                      type="text"
                      v-model="inputCodigo"
                      class="form-control"
                      placeholder="Código del Juguete"
                    />
                  </div>
                  <div class="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      v-model="inputNombre"
                      class="form-control"
                      placeholder="Nombre del Juguete"
                    />
                  </div>
                  <div class="form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      v-model.number="inputStock"
                      class="form-control"
                      min="0"
                      placeholder="Stock del Juguete"
                    />
                  </div>
                  <div class="form-group">
                    <label>Precio</label>
                    <input
                      type="number"
                      v-model.number="inputPrecio"
                      class="form-control"
                      min="0"
                      placeholder="Precio del Juguete"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-dismiss="modal">
                  Cerrar
                </button>
                <button
                  data-dismiss="modal"
                  type="button"
                  @click="addJuguete"
                  class="btn btn-success"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Código</th>
              <th scope="col">Nombre</th>
              <th scope="col" class="text-right">Stock</th>
              <th scope="col" class="text-right">Precio</th>
              <th scope="col" class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in juguetes" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.codigo }}</td>
              <td>{{ item.nombre }}</td>
              <td class="text-right">{{ item.stock }}</td>
              <td class="text-right">
                $ {{ item.precio.toLocaleString("de-DE") }}
              </td>
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-outline-primary mr-3"
                  data-toggle="modal"
                  data-target="#exampleModal2"
                  @click="btnEditJuguete({ index: index, item: item })"
                >
                  Editar
                </button>
                <div
                  class="modal fade"
                  id="exampleModal2"
                  tabindex="-1"
                  role="dialog"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">
                          Actualización de Juguete
                        </h5>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="form-group">
                            <label>Código</label>
                            <input
                              type="text"
                              v-model="inputCodigo"
                              class="form-control"
                              placeholder="Código del Juguete"
                            />
                          </div>
                          <div class="form-group">
                            <label>Nombre</label>
                            <input
                              type="text"
                              v-model="inputNombre"
                              class="form-control"
                              placeholder="Nombre del Juguete"
                            />
                          </div>
                          <div class="form-group">
                            <label>Stock</label>
                            <input
                              type="number"
                              v-model.number="inputStock"
                              class="form-control"
                              min="0"
                              placeholder="Stock del Juguete"
                            />
                          </div>
                          <div class="form-group">
                            <label>Precio</label>
                            <input
                              type="number"
                              v-model.number="inputPrecio"
                              class="form-control"
                              min="0"
                              placeholder="Precio del Juguete"
                            />
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-dark"
                          data-dismiss="modal"
                        >
                          Cerrar
                        </button>
                        <button
                          data-dismiss="modal"
                          type="button"
                          @click="editJuguete"
                          class="btn btn-success"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  @click="deleteJuguete({ index: index, id: item.id })"
                  type="button"
                  class="btn btn-outline-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { db } from "../firebase/firebase";

export default {
  name: "Inicio",
  data() {
    return {
      inputCodigo: null,
      inputNombre: null,
      inputStock: null,
      inputPrecio: null,
      indexJuguete: null,
      idJuguete: null,
    };
  },
  computed: {
    ...mapState(["juguetes"]),
  },
  methods: {
    async addJuguete() {
      let codigo = this.inputCodigo;
      let nombre = this.inputNombre;
      let stock = this.inputStock;
      let precio = this.inputPrecio;

      await db.collection("juguetes").add({
        codigo,
        nombre,
        stock,
        precio,
      });

      let updateLocal = {
        codigo,
        nombre,
        stock,
        precio,
      };
      this.$store.state.juguetes.push(updateLocal);

      // Limpiar variables locales.
      this.inputCodigo = null;
      this.inputNombre = null;
      this.inputStock = null;
      this.inputPrecio = null;
    },
    async deleteJuguete(payload) {
      let index = payload.index;
      let id = payload.id;

      // Borrar en firebase.
      await db
        .collection("juguetes")
        .doc(id)
        .delete();

      // Borrar en Local.
      this.$store.state.juguetes.splice(index, 1);
    },
    btnEditJuguete(payload) {
      this.inputCodigo = payload.item.codigo;
      this.inputNombre = payload.item.nombre;
      this.inputStock = payload.item.stock;
      this.inputPrecio = payload.item.precio;

      this.indexJuguete = payload.index;
      this.idJuguete = payload.item.id;
    },
    async editJuguete() {
      let codigo = this.inputCodigo;
      let nombre = this.inputNombre;
      let stock = this.inputStock;
      let precio = this.inputPrecio;
      let id = this.idJuguete;
      let index = this.indexJuguete;

      // Actualizar en Firebase.
      await db
        .collection("juguetes")
        .doc(id)
        .update({
          codigo,
          nombre,
          stock,
          precio
        });
      // Actualizar en Local.
      this.$store.state.juguetes[index] = {
        codigo,
        nombre,
        stock,
        precio
      }

      // Limpiar variables locales.
      this.inputCodigo = null;
      this.inputNombre = null;
      this.inputStock = null;
      this.inputPrecio = null;
      this.indexJuguete = null;
      this.idJuguete = null;
    },
  },
};
</script>
