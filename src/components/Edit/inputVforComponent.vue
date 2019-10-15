<template>
  <div>
    <!-- Comienzo Fecha -->
    <div class="form-group mb-2" v-for="item in collection" :key="item.id">
      <label for="fecha" class="sr-only">{{ msg }}</label>
      <input type="text" readonly class="form-control-plaintext" :value="item" />
    </div>
    <div class="form-group mx-sm-3 mb-2">
      <label for="nuevaFecha" class="sr-only">Editar</label>
      <input type="password" class="form-control" placeholder="Editar" />
    </div>
    <!-- Fin de Fecha -->
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    collection: Array
  }
};
</script>

<style lang="scss" scoped>
</style>