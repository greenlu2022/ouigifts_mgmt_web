<script setup lang="ts">
import {useCategoryStore} from "@/stores/category"
import Category from "@/types/Category";
import MoreActionMenu from "@/components/MoreActionMenu.vue";
import CategoryEditDialog from "@/components/CategoryEditDialog.vue";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";
import CategoryAddDialog from "@/components/CategoryAddDialog.vue";

const store = useCategoryStore()
store.getCatefories()

const handleEditConfirm = (category: Category) => {
  store.update(category)
}

const handleDeleteConfirm = (categoryId: number) => {
  store.remove(categoryId)
}

const handleAddConfirm = (category: Category) => {
  console.log("add confirm emitted", category)
  store.addFirst(category)
}

</script>

<template>
  <VTable class="rounded-lg w-100 mt-9" fixed-header height="800px">
    <thead>
    <tr>
      <th class="text-uppercase text-center">
        Image
      </th>
      <th class="text-uppercase text-center">
        Name
      </th>
      <th class="text-uppercase text-center">
        Active
      </th>
      <th class="text-uppercase text-center w140">
        More
      </th>
    </tr>
    </thead>

    <tbody>
    <tr
        v-for="item in store.categories"
        :key="item.imageUrl"
    >
      <td class="pa-3 w-25">
        <v-img
            :width="240"
            aspect-ratio="16/9"
            class="ma-auto"
            cover
            :src="item.imageUrl"
        ></v-img>
      </td>
      <td class="text-center">
        {{ item.name }}
      </td>
      <td class="center">
        <VSwitch class="justify-center" v-model="item.isEnabled" @change="handleEditConfirm(item)"></VSwitch>
      </td>
      <td>
        <MoreActionMenu>
          <template #edit>
            <CategoryEditDialog :category="item" @@confirm="handleEditConfirm"></CategoryEditDialog>
          </template>
          <template #delete>
            <DeleteConfirmDialog @@delete="handleDeleteConfirm(item.id!!)"></DeleteConfirmDialog>
          </template>
        </MoreActionMenu>
      </td>
    </tr>
    </tbody>
  </VTable>
  <CategoryAddDialog @@confirm="handleAddConfirm"></CategoryAddDialog>
</template>

<style scoped>
:deep(.v-selection-control) {
  justify-content: center;
}
</style>