<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered" v-if="items.length">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Fecha</th>
          <th scope="col">Números</th>
          <th scope="col">Estrellas</th>
          <th scope="col">Ganancias</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item  in items" :key="item.id">
          <td>
            <button type="button" class="btn btn-warning btn-sm">Editar</button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="DeleteDoc(item.id)"
            >Borrar apuesta</button>
          </td>
          <td>{{ item.fecha }}</td>
          <td id="numbers">
            <div
              v-for="number in item.numbers"
              :key="number.id"
              class="alert alert-info"
              role="alert"
            >
              <span>{{ number }}</span>
            </div>
          </td>
          <td id="stars">
            <div
              v-for="star in item.stars"
              :key="star.id"
              class="alert alert-warning"
              role="alert"
            >{{ star }}</div>
          </td>
          <td>
            <span v-if="item.ganancias">{{ item.ganancias }}€</span>
            <button
              v-if="!item.ganancias"
              type="button"
              class="btn btn-success btn-sm"
              data-toggle="modal"
              data-target="#modalGanancia"
              @click="setGanancias(item.id)"
            >Añadir ganancias</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "tableComponent",
  props: {
    items: Array
  },
  methods: {
    DeleteDoc(id) {
      this.$emit("delete", id);
    },
    setGanancias(id) {
      this.$emit("setGanancias", id);
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  color: white;
  margin-left: 10px;
  font-size: 15px;
}
button:hover {
  cursor: pointer;
}
.alert {
  display: inline-block;
  margin: 0 4px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 8px;
}
</style>