<script setup lang="ts">
const api = import.meta.env
console.log(api)
</script>

<template>

  <VAppBar class="my-3 mx-6 rounded-lg app-bar-width">
    <!--    <template v-slot:image>-->
    <!--      <VImg-->
    <!--          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"-->
    <!--      ></VImg>-->
    <!--    </template>-->

    <template v-slot:prepend>
      <VAppBarNavIcon></VAppBarNavIcon>
    </template>

    <VAppBarTitle class="left">App</VAppBarTitle>

    <VSpacer></VSpacer>

    <VBtn icon>
      <VIcon>mdi-magnify</VIcon>
    </VBtn>

    <VBtn icon>
      <VIcon>mdi-heart</VIcon>
    </VBtn>
    <VBtn icon>
      <VIcon>mdi-dots-vertical</VIcon>
    </VBtn>
  </VAppBar>
</template>

<style scoped>
.app-bar-width {
  max-width: calc((100% - 256px) - 48px);
}
</style>