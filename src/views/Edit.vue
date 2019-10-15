<template>
  <div>
    <h1>Este es el del cupon: {{ this.$route.params.id }}</h1>
    <div class="row">
      <div class="col-4 offset-2">
        <form class="form-inline">
          <!-- Comienzo Fecha -->
          <input-component :fecha="data.fecha" msg="Fecha" />
          <!-- Fin de Fecha -->
          <!-- Comienzo Ganancias -->
          <input-component :ganancias="data.ganancias" msg="Ganancias" />
          <!-- Fin de Ganancias -->
          <!-- Comienzo de Numbers -->
          <input-vfor-component msg="Número" :collection="data.numbers" />
          <!-- Fin de Numbers -->
          <button type="submit" class="btn btn-primary mb-2">Confirmar cambios</button>
        </form>
      </div>
      <div class="col-4 offset-2">
        <!-- Fecha -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Fecha</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Fecha"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="data.fecha"
          />
        </div>
        <!-- Fin de Fecha -->
        <!-- Estrellas -->
        <div class="input-group mb-3" v-for="star in data.stars" :key="star.id">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Estrella {{ star.id }}</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Número"
            aria-label="Username"
            aria-describedby="basic-addon1"
            :value="star"
          />
        </div>
        <!-- Fin de Estrellas -->
        <!-- Ganancias -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Ganancias</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Fecha"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="data.ganancias"
          />
        </div>
        <!-- Fin de Ganancias -->
      </div>
      <div class="col-4">
        <!-- Números -->
        <div class="input-group mb-3" v-for="number in data.numbers" :key="number.id">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Número</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Número"
            aria-label="Username"
            aria-describedby="basic-addon1"
            :value="number"
          />
        </div>
        <!-- Fin de Números -->
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
      data: {},
      id: ""
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
</style>