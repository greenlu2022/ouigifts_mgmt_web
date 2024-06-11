<script setup lang="ts">
import logo from '@/assets/logo_light.svg?raw'

import {ref} from 'vue'

const account = ref('')
const password = ref('')
</script>

<template>
  <VCard class="rounded-lg pa-6" width="400">
    <template v-slot:title>
      <VRow class="ma-0">
        <VCol cols="5">
          <div class="d-flex justify-end" v-html="logo"/>
        </VCol>
        <VCol cols="5" class="d-flex justify-start">
          <span class="font-weight-black text-h4 pt-1">Login</span>
        </VCol>
      </VRow>
    </template>
    <template v-slot:subtitle>
      <div class="pt-6">
        <span class="font-weight-black">Please sign-in to your account</span>
      </div>

    </template>

    <VRow>
      <VCol cols="12">
        <div></div>
      </VCol>
    </VRow>
    <VRow class="mb-12 ">
      <VCol cols="12">
        <VTextField
            v-model="account"
            label="Account"
            outlined
            prepend-inner-icon="mdi-account"
        />
      </VCol>
      <VCol cols="12">
        <VTextField
            v-model="password"
            label="Password"
            type="password"
            outlined
            prepend-inner-icon="mdi-lock"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VBtn block color="primary" router to="/banner">Login</VBtn>
      </VCol>
    </VRow>

  </VCard>

</template>

<style scoped>

</style>