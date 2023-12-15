<script setup lang="ts">
const api = import.meta.env
console.log(api)
</script>

<template>

  <VAppBar scroll-behavior="hide" scroll-threshold="40" class="my-8 mx-8 rounded-lg app-bar-width">
    <!--    <template v-slot:image>-->
    <!--      <VImg-->
    <!--          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"-->
    <!--      ></VImg>-->
    <!--    </template>-->

    <template v-slot:prepend>
      <VAppBarNavIcon color="white"></VAppBarNavIcon>
    </template>

    <VAppBarTitle class="text-left">App</VAppBarTitle>

    <VSpacer></VSpacer>

    <VBtn icon>
      <VIcon color="white">mdi-magnify</VIcon>
    </VBtn>

    <VBtn icon>
      <VIcon color="white">mdi-heart</VIcon>
    </VBtn>
    <VBtn icon>
      <VIcon color="white">mdi-dots-vertical</VIcon>
    </VBtn>
  </VAppBar>
</template>

<style scoped>
.app-bar-width {
  max-width: calc((100% - 256px) - 64px);
}
</style>