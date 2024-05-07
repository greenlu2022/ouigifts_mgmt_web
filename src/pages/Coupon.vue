<script setup lang="ts">

import {useMainCouponStore} from "@/stores/mainCoupon.ts";
import CouponType from "@/types/CouponType.ts";
import {ref} from "vue";
import CouponTypeAddDialog from "@/components/CouponTypeAddDialog.vue";
import CouponTypeEditDialog from "@/components/CouponTypeEditDialog.vue";

import MoreActionMenu from "@/components/MoreActionMenu.vue";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";
import {useCategoryStore} from "@/stores/category.ts";

const store = useMainCouponStore()
store.getMainCoupons()

const categoryStore = useCategoryStore()
categoryStore.getCategories()

const search = ref<string>("")

const getCategoryNameById = (id: number): string => {
  const category = categoryStore.categories.find(item => item.id == id)
  return <string>category?.name
}

const handleEditConfirm = (couponType: CouponType) => {
  store.update(couponType)
}

const handleDeleteConfirm = (couponTypeId: number) => {
  store.remove(couponTypeId)
}

const handleAddConfirm = (couponType: CouponType) => {
  console.log("add confirm emitted", couponType)
  store.addFirst(couponType)
}

const headers = [
  {key: 'imageUrl', title: 'Image', align: 'center', fixed: true, width: '240px'},
  {key: 'name', title: 'Name', align: 'center'},
  {key: 'categoryIds', title: 'Categories', align: 'center'},
  {key: 'code', title: 'Code', align: 'center'},
  // {key: 'discountType', title: 'Discount Type', align: 'center'},
  // {key: 'discountPercentage', title: 'Discount Percentage', align: 'center'},
  {key: 'isLimited', title: 'Limited', align: 'center',},
  {key: 'availableAmount', title: 'Available Amount', align: 'center',},
  {key: 'startTime', title: 'Start Time', align: 'center',},
  {key: 'endTime', title: 'End Time', align: 'center',},
  {key: 'isEnabled', title: 'Active', align: 'center',},
  {key: 'more', title: 'More', align: 'center', width: '100px'}
]

</script>

<template>
  <VCard class="rounded-lg mt-9 w-100">
    <VCardTitle class="d-flex align-center pe-2">
      <VIcon icon="mdi-cards"></VIcon> &nbsp;
      Main Coupons
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

    <VDataTable v-model:search="search" :items="store.mainCoupons" :headers="( headers as any)" height="780px"
                class="rounded-lg"
                fixed-header>


      <template v-slot:item.imageUrl="{ item }">
        <VCard class="my-4" elevation="2" rounded>
          <VImg
              :width="240"
              aspect-ratio="16/9"
              class="ma-auto"
              cover
              :src="item.imageUrl"
          ></VImg>
        </VCard>
      </template>

      <template v-slot:item.categoryIds="{ item }">
        <VChipGroup>
          <VChip v-for="id in item.categoryIds ">{{ getCategoryNameById(id) }}</VChip>
        </VChipGroup>
      </template>


      <template v-slot:item.isLimited="{ item }">
        <div class="text-end">
          <VChip
              :color="item.isLimited ? 'red' : 'green'"
              :text="item.isLimited ? 'Limited' : 'Infinite'"
              class="text-uppercase"
              size="small"
              label
          ></VChip>
        </div>
      </template>

      <template v-slot:item.availableAmount="{ item }">
        <span v-if="item.isLimited" class="text-center">
            {{ item.availableAmount }}
        </span>
        <div v-if="!item.isLimited" class="text-center">
          <VIcon icon="mdi-all-inclusive"></VIcon> &nbsp;
        </div>
      </template>

      <template v-slot:item.isEnabled="{ item }">
        <div class="text-end">
          <VChip
              :color="item.isEnabled ? 'green' : 'red'"
              :text="item.isEnabled ? 'activated' : 'disabled'"
              class="text-uppercase"
              size="small"
              label
          ></VChip>
        </div>
      </template>

      <template v-slot:item.more="{ item }">
        <MoreActionMenu>
          <template #edit>
            <CouponTypeEditDialog :couponType="item" @@confirm="handleEditConfirm"></CouponTypeEditDialog>
          </template>
          <template #delete>
            <DeleteConfirmDialog @@delete="handleDeleteConfirm(item.id!!)"></DeleteConfirmDialog>
          </template>
        </MoreActionMenu>
      </template>
    </VDataTable>
  </VCard>
  <CouponTypeAddDialog @@confirm="handleAddConfirm"></CouponTypeAddDialog>
</template>

<style scoped>

</style>