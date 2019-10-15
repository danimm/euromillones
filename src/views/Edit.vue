<template>
  <div>
    <h1>Este es el del cupon: {{ this.$route.params.id }}</h1>
    <div class="row pt-4">
      <div class="col-3 offset-3">
        <!-- Fecha -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="fecha">Fecha: {{ data.fecha }}</span>
          </div>
          <input type="text" class="form-control" placeholder="Nuevo valor" aria-label="Username" />
        </div>
        <!-- Fin de Fecha -->
        <!-- Estrellas -->
        <div class="input-group mb-3" v-for="star in data.stars" :key="star.id">
          <div class="input-group-prepend">
            <span class="input-group-text span-estrellas">Estrellas: {{ star }}</span>
          </div>
          <input type="text" class="form-control" placeholder="Nuevo valor" />
        </div>
        <!-- Fin de Estrellas -->
        <!-- Ganancias -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="ganancias">Ganancias: {{ data.ganancias}}</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Nuevo valor"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <!-- Fin de Ganancias -->
      </div>
      <div class="col-3">
        <!-- Números -->
        <div class="input-group mb-3" v-for="number in data.numbers" :key="number.id">
          <div class="input-group-prepend">
            <span
              class="input-group-text span-numeros"
            >Número {{ data.numbers[number] }}: {{ number }}</span>
          </div>
          <input type="text" class="form-control" placeholder="Nuevo valor" />
        </div>
        <!-- Fin de Números -->
      </div>
    </div>
    <div class="row pt-4 pb-5">
      <div class="col">
        <button class="btn btn-primary">Confirmar cambios</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
import inputComponent from "../components/Edit/inputComponent.vue";
import inputVforComponent from "../components/Edit/inputVforComponent.vue";
export default {
  components: {
    inputComponent,
    inputVforComponent
  },
  data() {
    return {
      data: {}
    };
  },
  created() {
    const id = this.$route.params.id;
    console.log("este es el id: ", id);
    const ref = db.collection("cupones").doc(id);
    ref.get().then(res => {
      this.data = res.data();
      console.log("Aquí estan los datos que pediste: ", res.data());
    });
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