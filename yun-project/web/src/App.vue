<template>
  <Navbar></Navbar>
  <router-view />
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  background: rgb(16, 228, 16);
}
::-webkit-scrollbar-track {
  background-color: rgb(40, 112, 219);
}
</style>
