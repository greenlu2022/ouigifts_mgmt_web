<script setup lang="ts">
import {ref} from 'vue'

const dialog = ref(false)

</script>

<template>
  <VRow justify="center">
    <VDialog
        v-model="dialog"
        persistent
        width="600"
    >
      <template v-slot:activator="{ props }">
        <VBtn icon color="transparent" variant="flat" v-bind="props">
          <VIcon color="white">mdi-pencil</VIcon>
        </VBtn>
      </template>
      <VCard class="pa-3">
        <VCardTitle class="text-h5">
          Banner Setting
        </VCardTitle>
        <VRow class="pa-3">
          <VCol cols="12" sm="12" class="px-3">
            <VFileInput clearable label="Upload Image"></VFileInput>
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
                label="Name"
                variant="outlined"
            ></VTextField>
          </VCol>
          <VCol cols="12" sm="6">
            <v-select
                label="Action Type"
                :items="['None', 'Inner Route', 'Outer Route']"
                variant="outlined"
            ></v-select>
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
                placeholder="https://"
                label="Direct Url"
                variant="outlined"
            ></VTextField>
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
                placeholder="https://"
                label="Direct Url"
                variant="outlined"
            ></VTextField>
          </VCol>
        </VRow>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
              color="red"
              variant="text"
              @click="dialog = false"
          >
            Dismiss
          </VBtn>
          <VBtn
              color="green-darken-1"
              @click="dialog = false"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>

<style scoped>

</style>