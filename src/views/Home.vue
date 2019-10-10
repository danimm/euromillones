<template>
  <div class="home">
    <HelloWorld
      msg="Welcome to Your Vue.js App"
      imageUrl="https://cadenaser00.epimg.net/ser/imagenes/2016/10/04/sociedad/1475569929_714674_1475573551_noticia_normal.jpg"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
