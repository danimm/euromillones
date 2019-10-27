<template>
  <div>
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-header">
            <h1>Generar números aleatorios</h1>
          </div>
          <div class="card-body center-align">
            <h5
              class="card-title"
              v-if="numbers.length <= 0"
            >Generar una nueva apuesta de euromillones para guardar.</h5>
            <div v-if="msgSuccess" class="alert alert-success" role="alert">{{ msgSuccess }}</div>
            <div class="container">
              <ul class="list-group list-group-horizontal">
                <li
                  class="list-group-item list-group-item-primary"
                  v-for="number in numbers"
                  :key="number.id"
                >{{ number }}</li>
                <li
                  class="list-group-item list-group-item-warning"
                  v-for="star in stars"
                  :key="star.id"
                >{{ star }}</li>
              </ul>
            </div>
            <button class="btn btn-primary" @click="GenerarNumeros">Generar números aleatorios</button>
            <button v-if="!msgSuccess" class="btn btn-success ml-4" @click="addData">Guardar apuesta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import firestore from "firebase/firestore";
import db from "../firebase.js";
export default {
  data() {
    return {
      numbers: [],
      stars: [],
      msgSuccess: ""
    };
  },
  methods: {
    addData() {
      // const NewFecha = new Date();
      // let fecha = `${NewFecha.getDate()}/${NewFecha.getMonth() +
      //   1}/${NewFecha.getFullYear()}`;
      db.collection("cupones")
        .add({
          numbers: this.numbers,
          stars: this.stars,
          fecha: firebase.firestore.FieldValue.serverTimestamp(),
          ganancias: 0
        })
        .then(docRef => {
          this.msgSuccess = "Datos añadidos correctamente";
          console.log("Document añadido correctamente con ID: ", docRef.id);
        })
        .catch(err => console.log("Error al cargar el archivo", err));
      this.numbers = [];
      this.stars = [];
      this.$router.push("/");
    },
    GenerarNumeros() {
      this.msgSuccess = "";
      this.numbers = [];
      this.stars = [];
      const numMax = 50;
      const numMin = 1;

      const starMax = 12;
      const starMin = 1;

      for (let i = 0; i < 5; i++) {
        const numRandom = () =>
          Math.round(Math.random() * (numMax - numMin) + numMin);
        let newNumber = numRandom();

        while (this.numbers.includes(newNumber)) {
          newNumber = numRandom();
        }
        this.numbers.push(newNumber);
      }

      for (let i = 0; i < 2; i++) {
        const numRandom = () =>
          Math.round(Math.random() * (starMax - starMin) + starMin);
        let newStar = numRandom();

        while (this.stars.includes(newStar)) {
          newStar = numRandom();
        }
        this.stars.push(newStar);
      }
      this.OrdenarArrays();
    },
    OrdenarArrays() {
      this.numbers.sort(function(a, b) {
        return a - b;
      });
      this.stars.sort(function(a, b) {
        return a - b;
      });
    }
  },
  created() {
    this.msgSuccess = "";
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  // margin: 20px 0;
  .list-group-horizontal {
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 900px) {
  .btn-primary {
    margin-bottom: 20px;
  }
}
</style>