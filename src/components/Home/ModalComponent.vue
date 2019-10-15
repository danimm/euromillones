<template>
  <div
    class="modal fade"
    id="modalConfirmar"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalConfirmar"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Los datos no podrán ser recuperados</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro que quieres borrar la apuesta?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button
            type="button"
            data-dismiss="modal"
            class="btn btn-danger"
            @click="Confirmar"
          >Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    Confirmar() {
      this.$emit("confirmar");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>