<script setup lang="ts">
import {ref} from "vue";
import {useCategoryStore} from "@/stores/category"
import Category from "@/types/Category";
import MoreActionMenu from "@/components/MoreActionMenu.vue";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";
import CategoryAddDialog from "@/components/CategoryAddDialog.vue";
import CategoryEditDialog from "@/components/CategoryEditDialog.vue";
import type {ID} from "@/types/utilsType.ts";

const store = useCategoryStore()
store.getCategories()

const search = ref<string>("")

const handleEditConfirm = (category: Category) => {
  store.update(category)
}

const handleDeleteConfirm = (categoryId: ID) => {
  store.remove(categoryId)
}

const handleAddConfirm = (category: Category) => {
  console.log("add confirm emitted", category)
  store.addFirst(category)
}

const headers = [
  {key: 'imageUrl', title: 'Image', align: 'center', fixed: true, width: '240px'},
  {key: 'name', title: 'Name', align: 'center'},
  {key: 'isEnabled', title: 'Active', align: 'center',},
  {key: 'more', title: 'More', align: 'center', width: '120px'}
]

</script>

<template>
  <VCard class="rounded-lg mt-9 w-100">
    <VCardTitle class="d-flex align-center pe-2">
      <VIcon icon="mdi-view-dashboard"></VIcon> &nbsp;
      Category
      <VSpacer></VSpacer>
      <VTextField
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
      ></VTextField>
    </VCardTitle>
    <VDivider></VDivider>

    <VDataTable v-model:search="search" :items="store.categories" :headers="( headers as any)" height="780px"
                class="rounded-lg"
                fixed-header>

      <template v-slot:item.imageUrl="{ item }">
        <VCard class="my-4" elevation="2" rounded>
          <VImg
              :width="240"
              aspect-ratio="16/9"
              cover
              :src="item.imageUrl"
              :class="{ grayscale: !item.isEnabled }"
          ></VImg>
        </VCard>
      </template>
      <template v-slot:item.isEnabled="{ item }">
        <VSwitch class="justify-center" v-model="item.isEnabled" @change="handleEditConfirm(item)"></VSwitch>
      </template>

      <template v-slot:item.more="{ item }">
        <MoreActionMenu>
          <template #edit>
            <CategoryEditDialog :category="item" @@confirm="handleEditConfirm"></CategoryEditDialog>
          </template>
          <template #delete>
            <DeleteConfirmDialog @@delete="handleDeleteConfirm(item.id!!)"></DeleteConfirmDialog>
          </template>
        </MoreActionMenu>
      </template>
    </VDataTable>
  </VCard>
  <CategoryAddDialog @@confirm="handleAddConfirm"></CategoryAddDialog>
</template>

<style scoped>
:deep(.v-selection-control) {
  justify-content: center;
}
</style>