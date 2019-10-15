<template>
  <div>
    <!-- Comienzo Fecha / Ganancias -->
    <div class="form-group mb-2">
      <label for="fecha" class="sr-only">{{ msg }}</label>
      <input type="text" readonly class="form-control-plaintext" :value="fecha || ganancias" />
    </div>
    <div class="form-group mx-sm-3 mb-2">
      <label for="nuevaFecha" class="sr-only">{{ msg }}</label>
      <input type="password" class="form-control" placeholder="Editar" />
    </div>
    <!-- Fin de / Ganancias -->
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    fecha: String,
    ganancias: Number
  }
};
</script>

<style lang="scss" scoped>
</style>