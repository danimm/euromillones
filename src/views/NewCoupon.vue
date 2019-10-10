<template>
  <div>
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-header">
            <h1>Generar números aleatorios</h1>
          </div>
          <div class="card-body">
            <h5 class="card-title">Generar una nueva apuesta de euromillones.</h5>
            <p class="card-text">
              <span v-for="number in numbers" :key="number.id">{{ number }}-</span>
            </p>
            <p class="card-text" v-if="stars">
              Estrellas:
              <span v-for="star in stars" :key="star.id">{{ star }}*</span>
            </p>
            <button class="btn btn-primary" @click="GenerarNumeros">Generar números aleatorios</button>
            <button class="btn btn-success ml-4">Guardar</button>
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>