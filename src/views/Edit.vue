<template>
  <div>
    <h1>Este es el Id del cupon: {{ this.$route.params.id }}</h1>
    <div class="row pt-4">
      <div class="col-3 offset-3">
        <!-- Fecha -->
        <!-- <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="fecha">Fecha: {{ fecha | formatedDate }}</span>
          </div>
          <input type="text" v-model="fecha" class="form-control" placeholder="Nuevo valor" />
        </div>-->
        <!-- Fin de Fecha -->
        <!-- Estrellas -->
        <div class="input-group mb-3" v-for="(star, index) in stars" :key="index">
          <div class="input-group-prepend">
            <span class="input-group-text span-estrellas">Estrellas: {{ star }}</span>
          </div>
          <input
            type="number"
            v-model="stars[index]"
            class="form-control"
            placeholder="Nuevo valor"
          />
        </div>
        <!-- Fin de Estrellas -->
        <!-- Ganancias -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="ganancias">Ganancias: {{ ganancias }}</span>
          </div>
          <input type="number" v-model="ganancias" class="form-control" placeholder="Nuevo valor" />
        </div>
        <!-- Fin de Ganancias -->
      </div>
      <div class="col-3">
        <!-- Números -->
        <div class="input-group mb-3" v-for="(number, index) in numbers" :key="index">
          <div class="input-group-prepend">
            <span class="input-group-text span-numeros">Número {{ index+1 }}:</span>
          </div>
          <input
            type="number"
            v-model="numbers[index]"
            class="form-control"
            placeholder="Nuevo valor"
          />
        </div>
        <!-- Fin de Números -->
      </div>
    </div>
    <div class="row pt-4 pb-5">
      <div class="col">
        <button class="btn btn-primary" @click="confirmChanges">Confirmar cambios</button>
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
      id: "",
      fecha: "",
      ganancias: 0,
      stars: [],
      numbers: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    console.log("este es el id: ", this.id);
    const ref = db.collection("cupones").doc(this.id);
    ref.get().then(res => {
      // this.data = res.data();
      this.fecha = res.data().fecha;
      this.ganancias = res.data().ganancias;
      this.stars = res.data().stars;
      this.numbers = res.data().numbers;
      console.log("Aquí estan los datos que pediste: ", res.data());
    });
  },
  methods: {
    confirmChanges() {
      // Formateando stars a números
      let intStars = [];
      this.stars.forEach(element => intStars.push(parseInt(element)));
      // Formateando numbers a números
      let intNumbers = [];
      this.numbers.forEach(element => intNumbers.push(parseInt(element)));
      // console.log(intStars);
      // console.log(intNumbers);
      // debugger;
      db.collection("cupones")
        .doc(this.id)
        .set({
          fecha: this.fecha,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          ganancias: parseInt(this.ganancias),
          numbers: intNumbers,
          stars: intStars
        })
        .then(() => {
          console.log("Datos actualizados correctamente");
        });
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.input-group-prepend {
  width: 180px;
}
span.input-group-text {
  width: 100%;
}
span.span-numeros {
  background-color: #d1ecf1;
}
span.span-estrellas {
  background-color: #fff3cd;
}
#ganancias {
  background-color: #42b983;
  color: white;
}
</style>