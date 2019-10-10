<template>
  <div class="jumbotron text-center">
    <h1>{{ msg }}</h1>
    <img :src="imageUrl" alt />
    <div class="row">
      <div class="col">
        <input type="text" name="numbers" id="data" v-model="numbers" />
        <button class="btn btn-success" @click="addData">Añadir nuevos números</button>
      </div>
    </div>
    <!-- <button class="btn btn-primary" @click="getData">Conseguir datos</button>
    <button class="btn btn-success" @click="getAsyncData">Subscribirse</button>-->
    <div class="row pt-4">
      <div class="col">
        <!-- Tabla de contenido -->
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Números</th>
              <th scope="col">Ganancias</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item  in items" :key="item.id">
              <th scope="row">
                <!-- {{ item.id }} -->
                <button type="button" class="btn btn-warning btn-sm">Editar</button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="DeleteDoc(item.id)"
                >Borrar</button>
              </th>
              <td>{{ item.fecha }}</td>
              <td>{{ item.numbers }}</td>
              <td>
                {{ item.ganancias }}€
                <button
                  v-if="!item.ganancias"
                  type="button"
                  class="btn btn-success btn-sm"
                  data-toggle="modal"
                  data-target="#modalGanancia"
                  @click="setIdGanancias(item.id)"
                >Win €?</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Tabla de contenido -->
        {{ itemsActualizados }}
        <!-- Comienza el modal -->
        <div
          class="modal fade"
          id="modalGanancia"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalGananciaLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalGananciaLabel">Añadir Ganancias</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form v-on:submit.prevent="añadirGanancias(idGanancias)">
                  <div class="form-group">
                    <label for="ganancia">Introduce las ganancias de esta apuesta</label>
                    <input
                      type="int"
                      class="form-control"
                      id="ganancia"
                      v-model="ganancias"
                      aria-describedby="emailHelp"
                      placeholder="Introduce tus ganancias"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button
                  type="submit"
                  class="btn btn-success"
                  data-dismiss="modal"
                  @click="añadirGanancias(idGanancias)"
                >Confirmar</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Termina el modal -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Ganancias totales:</h5>
            <p class="card-text">{{ totalGanancias }} €</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
    imageUrl: String
  },
  data() {
    return {
      numbers: "",
      idGanancias: "",
      ganancias: 0,
      items: [],
      total: 0
    };
  },
  computed: {
    itemsActualizados() {
      const cuponesRef = db.collection("cupones");
      cuponesRef.orderBy("fecha", "desc").onSnapshot(docs => {
        this.items = [];
        docs.forEach(doc => {
          this.items.push({
            id: doc.id,
            fecha: doc.data().fecha,
            numbers: doc.data().numbers,
            ganancias: doc.data().ganancias
          });
        });
      });
    },
    totalGanancias() {
      this.total = 0;
      this.items.forEach(item => {
        this.total += item.ganancias;
      });
      console.log(`El total de las ganancias actuales es: ${this.total}€`);
      return this.total;
    }
  },
  methods: {
    addData() {
      const NewFecha = new Date();
      let fecha = `${NewFecha.getDate()}/${NewFecha.getMonth() +
        1}/${NewFecha.getFullYear()}`;
      db.collection("cupones")
        .add({
          numbers: this.numbers,
          fecha,
          ganancias: 0
        })
        .then(docRef =>
          console.log("Document añadido correctamente con ID: ", docRef.id)
        )
        .catch(err => console.log("Error al cargar el archivo", err));
      this.numbers = "";
    },
    añadirGanancias(id) {
      let docRef = db.collection("cupones").doc(id);
      let gananciasInt = parseInt(this.ganancias, 10);
      docRef.update({
        ganancias: gananciasInt
      });
      console.log(
        `Se agregó al cupon con id: ${id} las siguientes ganancias: ${gananciasInt}€`
      );
      this.ganancias = 0;
      this.idGanancias = "";
    },
    setIdGanancias(id) {
      this.idGanancias = id;
      console.log("Id seteado correctamente: ", this.idGanancias);
    },
    DeleteDoc(id) {
      let docRef = db.collection("cupones").doc(id);
      docRef.delete();
      console.log("elemento borrado correctamente");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
  max-width: 100%;
  padding-bottom: 20px;
}
button {
  color: white;
  margin-left: 10px;
  font-size: 15px;
}
input {
  font-size: 20px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

