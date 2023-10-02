<script setup lang="ts">

import SideNavigation from "./components/SideNavigation.vue";
import TopAppBar from "./components/TopAppBar.vue";
import {RouterView} from "vue-router";
</script>

<template>
  <VLayout class="rounded rounded-md">
    <SideNavigation/>
    <TopAppBar/>
    <VMain class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView/>
    </VMain>
  </VLayout>
</template>

<style scoped>

</style>