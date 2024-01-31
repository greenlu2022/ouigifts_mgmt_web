<script setup lang="ts">

import Banner from "@/types/Banner";
import BannerEditDialog from "./BannerEditDialog.vue"
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";

// const store = useBannerStore()
const outerProps = defineProps<{
  banner: Banner
}>()

const emit = defineEmits<{
  (e: '@edit', banner: Banner): void,
  (e: '@delete', bannerId: number): void
}>()


const handleEdit = (banner: Banner) => {
  emit("@edit", banner)
}

const handleDelete = () => {
  emit("@delete", outerProps.banner.id)
}


</script>

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
                <BannerEditDialog :banner="outerProps.banner" @@confirm="handleEdit"></BannerEditDialog>
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
                <DeleteConfirmDialog @@delete="handleDelete"></DeleteConfirmDialog>
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