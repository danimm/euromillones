<template>
  <div class="container text-center">
    <!-- <img src="https://cadenaser00.epimg.net/ser/imagenes/2016/10/04/sociedad/1475569929_714674_1475573551_noticia_normal.jpg" alt /> -->
    <div class="row pt-4">
      <div class="col">
        <div class="container" v-if="!items.length">
          <h2>Introduce alguna apuesta para comenzar</h2>
          <router-link class="btn btn-primary text-white" to="/new-coupon">Generar números</router-link>
        </div>
        <!-- Comienzo tabla de contenido -->
        <table-component :items="items" @delete="setIdGanancias" @setGanancias="setIdGanancias" />
        <!-- Fin tabla de contenido -->
        <!-- {{ itemsActualizados }} -->
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
                <form @submit.prevent>
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
        <!-- Tarjetas inferiores -->
        <cards-component :totalGanancias="totalGanancias" :totalInversion="totalInversion" />
        <!-- Fin de Tarjetas inferiores -->
        <!-- Modal Eliminar -->
        <modal-Component @setGanancias="setIdGanancias" @confirmar="DeleteDoc" />
        <!-- Final de Modal Eliminar -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "../firebase.js";
import tableComponent from "@/components/tableComponent.vue";
import cardsComponent from "@/components/cardsComponent.vue";
import ModalComponent from "@/components/Home/ModalComponent.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
    imageUrl: String
  },
  components: {
    tableComponent,
    cardsComponent,
    ModalComponent
  },
  data() {
    return {
      numbers: [],
      idGanancias: "",
      ganancias: 0,
      precioApuesta: 3.5,
      inversion: 0,
      items: []
    };
  },
  mounted: function() {
    return this.itemsActualizados;
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
            stars: doc.data().stars,
            ganancias: doc.data().ganancias
          });
        });
      });
    },
    totalInversion() {
      return this.items.length * this.precioApuesta;
    },
    totalGanancias() {
      let total = 0;
      this.items.forEach(item => {
        total += item.ganancias;
      });
      console.log(`El total de las ganancias actuales es: ${total}€`);
      return total;
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
      this.numbers = [];
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
      let idRef = "";
      id ? (idRef = id) : (idRef = this.idGanancias);
      let docRef = db.collection("cupones").doc(idRef);
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
input {
  font-size: 20px;
}
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>


