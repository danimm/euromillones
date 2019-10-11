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
            <button class="btn btn-success ml-4">Guardar apuesta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [],
      stars: []
    };
  },
  methods: {
    GenerarNumeros() {
      this.numbers = [];
      this.stars = [];
      const numMax = 50;
      const numMin = 1;

      const starMax = 12;
      const starMin = 1;

      for (let i = 0; i < 5; i++) {
        const numRandom = () =>
          Math.round(Math.random() * (numMax - numMin) + numMin);
        this.numbers.push(numRandom());
      }

      for (let i = 0; i < 2; i++) {
        const numRandom = () =>
          Math.round(Math.random() * (starMax - starMin) + starMin);
        this.stars.push(numRandom());
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
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>