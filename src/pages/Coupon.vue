<script setup lang="ts">

import CategoryEditDialog from "@/components/CategoryEditDialog.vue";
import MoreActionMenu from "@/components/MoreActionMenu.vue";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";
import {useMainCouponStore} from "@/stores/mainCoupon.ts";
import CouponType from "@/types/CouponType.ts";

const store = useMainCouponStore()
store.getMainCoupons()

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
</script>

<template>
  <VTable class="rounded-lg w-100 mt-9" fixed-header fixed-first-column height="800px">
    <thead>
    <tr>
      <th class="text-uppercase text-center">
        Image
      </th>
      <th class="text-uppercase text-center">
        Category
      </th>
      <th class="text-uppercase text-center">
        Name
      </th>
      <th class="text-uppercase text-center w140">
        Code
      </th>
      <th class="text-uppercase text-center w140">
        discountType
      </th>
      <th class="text-uppercase text-center w140">
        discountPercentage
      </th>
      <th class="text-uppercase text-center w140">
        isLimited
      </th>
      <th class="text-uppercase text-center w140">
        availableAmount
      </th>
      <th class="text-uppercase text-center w140">
        restriction
      </th>
      <th class="text-uppercase text-center w140">
        startTime
      </th>
      <th class="text-uppercase text-center w140">
        endTime
      </th>
      <th class="text-uppercase text-center w140">
        Active
      </th>
      <th class="text-uppercase text-center w140">
        More
      </th>
    </tr>
    </thead>

    <tbody>
    <tr
        v-for="item in store.mainCoupons"
        :key="item.id"
    >
      <td class="pa-3 w-25">
        <VImg
            :width="240"
            aspect-ratio="16/9"
            class="ma-auto"
            cover
            :src="item.imageUrl"
        ></VImg>
      </td>
      <td class="text-center">
        {{ item.categoryIds }}
      </td>
      <td class="text-center">
        {{ item.name }}
      </td>
      <td class="text-center">
        {{ item.code }}
      </td>
      <td class="text-center">
        {{ item.discountType }}
      </td>
      <td class="text-center">
        {{ item.discountPercentage }}
      </td>
      <td class="center">
        <VCheckbox
            v-model="item.isLimited"
            @change="handleEditConfirm(item)"
            hide-details
        ></VCheckbox>
      </td>
      <td class="text-center">
        {{ item.availableAmount }}
      </td>
      <td class="text-center">
        {{ item.restriction }}
      </td>
      <td class="text-center">
        {{ item.startTime }}
      </td>
      <td class="text-center">
        {{ item.endTime }}
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
            <DeleteConfirmDialog @@delete="handleDeleteConfirm(item.id)"></DeleteConfirmDialog>
          </template>
        </MoreActionMenu>
      </td>
    </tr>
    </tbody>
  </VTable>
</template>

<style scoped>

</style>