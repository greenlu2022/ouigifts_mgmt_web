<script setup lang="ts"></script>

<template>
  <VMenu open-on-hover>
    <template v-slot:activator="{ props }">
      <VBtn icon
            color="transparent"
            variant="flat"
            v-bind="props">
        <VIcon color="white">mdi-dots-vertical</VIcon>
      </VBtn>
    </template>
    <VList class="pa-0">
      <VListItem class="pa-0">
        <VListItemTitle class="align-center text-white">
          <VHover>
            <template v-slot:default="{ isHovering, props }">
              <VCard
                  class="ma-0 rounded-0 px-4 py-2"
                  v-bind="props"
                  :color="isHovering ? 'primary' : undefined">
                <slot name="edit"></slot>
              </VCard>
            </template>
          </VHover>
        </VListItemTitle>
        <VListItemTitle class="align-center text-white">
          <VHover>
            <template v-slot:default="{ isHovering, props }">
              <VCard
                  class="ma-0 rounded-0 px-4 py-2"
                  v-bind="props"
                  :color="isHovering ? 'red' : undefined">
                <slot name="delete"></slot>
              </VCard>
            </template>
          </VHover>
        </VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<style scoped>

</style>