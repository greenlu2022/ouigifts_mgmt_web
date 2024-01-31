<script setup lang="ts">

import {ref} from "vue";

const emit = defineEmits<{
  (e: '@delete'): void,
}>()

const dialog = ref(false)

const handleConfirm = () => {
  emit("@delete")
  dialog.value = false
}

</script>

<template>
  <VDialog
      v-model="dialog"
      persistent
      width="600"
  >
    <template v-slot:activator="{ props }">
        <span v-bind="props" class="w-100">
          <VIcon color="white">mdi-trash-can-outline</VIcon>
          <span class="px-3">Delete</span>
        </span>
    </template>
    <VCard class="pa-3">
      <VCardTitle class="text-h5">
        Delete Banner
      </VCardTitle>
      <VRow class="pa-3">
        <VCol cols="12" sm="6">
          Are you Sure ?
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
            @click="handleConfirm"
        >
          Confirm
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<style scoped>

</style>