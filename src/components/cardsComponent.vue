<template>
  <!-- Tarjetas inferiores -->
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Inversión:</h5>
          <p class="card-text inversion">{{ totalInversion }} €</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Ingresos:</h5>
          <p class="card-text ganancias">{{ totalGanancias }} €</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Balance:</h5>
          <p class="card-text inversion" :class="isPositive">{{ total }} €</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin de Tarjetas inferiores -->
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "cardsComponent",
  computed: {
    ...mapState(["items", "precioApuesta"]),
    isPositive: function() {
      return {
        ganancias: this.total >= 0,
        inversion: this.total < 0
      };
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
    },
    total() {
      return this.totalGanancias - this.totalInversion;
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  margin: 20px 0 40px 0;
}
.inversion {
  color: #dc3545;
}
.ganancias {
  color: #42b983;
}
p.card-text {
  font-size: 2.5em;
  font-weight: bold;
}
</style>