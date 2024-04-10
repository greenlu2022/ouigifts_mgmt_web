<script setup lang="ts">

import {useMainCouponStore} from "@/stores/mainCoupon.ts";
import CouponType from "@/types/CouponType.ts";
import {ref} from "vue";
import CategoryEditDialog from "@/components/CategoryEditDialog.vue";
import MoreActionMenu from "@/components/MoreActionMenu.vue";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";

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


const headers = [
  {key: 'imageUrl', title: 'Image', align: 'center', fixed: true},
  {key: 'name', title: 'Name', align: 'center'},
  {key: 'categoryIds', title: 'Categories', align: 'center'},
  {key: 'code', title: 'Image', align: 'center'},
  {key: 'discountType', title: 'Discount Type', align: 'center'},
  {key: 'discountPercentage', title: 'Discount Percentage', align: 'center'},
  {key: 'isLimited', title: 'Limited', align: 'center',},
  {key: 'availableAmount', title: 'Available Amount', align: 'center',},
  {key: 'startTime', title: 'Start Time', align: 'center',},
  {key: 'endTime', title: 'End Time', align: 'center',},
  {key: 'isEnabled', title: 'Active', align: 'center',},
  {key: 'more', title: 'More', align: 'center',}
]

const search = ref<string>("")

</script>

<template>
  <VCard class="rounded-lg mt-9">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-cards"></v-icon> &nbsp;
      Main Coupons
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
      ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
    
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


      <template v-slot:item.isLimited="{ item }">
        <div class="text-end">
          <v-chip
              :color="item.isLimited ? 'red' : 'green'"
              :text="item.isLimited ? 'Limited' : 'Infinite'"
              class="text-uppercase"
              size="small"
              label
          ></v-chip>
        </div>
      </template>

      <template v-slot:item.isEnabled="{ item }">
        <div class="text-end">
          <v-chip
              :color="item.isEnabled ? 'green' : 'red'"
              :text="item.isEnabled ? 'activated' : 'disabled'"
              class="text-uppercase"
              size="small"
              label
          ></v-chip>
        </div>
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


  <!--  <VTable class="rounded-lg w-100 mt-9" fixed-header height="800px">-->
  <!--    <thead>-->
  <!--    <tr>-->
  <!--      <th class="text-uppercase text-center">-->
  <!--        Image-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center">-->
  <!--        Category-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center">-->
  <!--        Name-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        Code-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        discountType-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        discountPercentage-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        isLimited-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        availableAmount-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        restriction-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        startTime-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        endTime-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        Active-->
  <!--      </th>-->
  <!--      <th class="text-uppercase text-center w140">-->
  <!--        More-->
  <!--      </th>-->
  <!--    </tr>-->
  <!--    </thead>-->

  <!--    <tbody>-->
  <!--    <tr-->
  <!--        v-for="item in store.mainCoupons"-->
  <!--        :key="item.id"-->
  <!--    >-->
  <!--      <td class="pa-3 w-25">-->
  <!--        <VImg-->
  <!--            :width="240"-->
  <!--            aspect-ratio="16/9"-->
  <!--            class="ma-auto"-->
  <!--            cover-->
  <!--            :src="item.imageUrl"-->
  <!--        ></VImg>-->
  <!--      </td>-->
  <!--      <td class="text-center">-->
  <!--        {{ item.categoryIds }}-->
  <!--      </td>-->
  <!--      <td class="text-center">-->
  <!--        {{ item.name }}-->
  <!--      </td>-->
  <!--      <td class="text-center">-->
  <!--        {{ item.code }}-->
  <!--      </td>-->
  <!--      <td class="text-center">-->
  <!--        {{ item.discountType }}-->
  <!--      </td>-->
  <!--      <td class="text-center">-->
  <!--        {{ item.discountPercentage }}-->
  <!--      </td>-->
  <!--      <td class="center">-->
  <!--        <VCheckbox-->
  <!--            v-model="item.isLimited"-->
  <!--            @change="handleEditConfirm(item)"-->
  <!--            hide-details-->
  <!--        ></VCheckbox>-->
  <!--      </td>-->
  <!--      <td class="text-center">-->
  <!--        {{ item.availableAmount }}-->
  <!--      </td>-->
  <!--      <td class="text-center">-->
  <!--        {{ item.restriction }}-->
  <!--      </td>-->
  <!--      <td class="text-center">-->
  <!--        {{ item.startTime }}-->
  <!--      </td>-->
  <!--      <td class="text-center">-->
  <!--        {{ item.endTime }}-->
  <!--      </td>-->

  <!--      <td class="center">-->
  <!--        <VSwitch class="justify-center" v-model="item.isEnabled" @change="handleEditConfirm(item)"></VSwitch>-->
  <!--      </td>-->
  <!--      <td>-->
  <!--        <MoreActionMenu>-->
  <!--          <template #edit>-->
  <!--            <CategoryEditDialog :category="item" @@confirm="handleEditConfirm"></CategoryEditDialog>-->
  <!--          </template>-->
  <!--          <template #delete>-->
  <!--            <DeleteConfirmDialog @@delete="handleDeleteConfirm(item.id!!)"></DeleteConfirmDialog>-->
  <!--          </template>-->
  <!--        </MoreActionMenu>-->
  <!--      </td>-->
  <!--    </tr>-->
  <!--    </tbody>-->
  <!--  </VTable>-->
</template>

<style scoped>

</style>