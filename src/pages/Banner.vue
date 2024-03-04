<script setup lang="ts">
import {useBannerStore} from "@/stores/banner"
import Banner from "@/types/Banner";
import BannerAddDialog from "@/components/BannerAddDialog.vue";
import BannerEditDialog from "@/components/BannerEditDialog.vue";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";
import MoreActionMenu from "@/components/MoreActionMenu.vue";

const store = useBannerStore()
store.getBanners()

const handleEditConfirm = (banner: Banner) => {
  console.log("edit confirm emitted", banner)
  store.update(banner)
}

const handleAddConfirm = (banner: Banner) => {
  console.log("add confirm emitted", banner)
  store.addUnshift(banner)
}

const handleDeleteConfirm = (bannerId: number) => {
  console.log("delete emitted", bannerId)
  store.remove(bannerId)
}

const twoLine = (dateTime: string): string => {
  return dateTime.replace(" ", "<br/>")
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
        Direct Url
      </th>
      <th class="text-uppercase text-center">
        Action Type
      </th>
      <th class="text-uppercase text-center">
        Start Time
      </th>
      <th class="text-uppercase text-center">
        End Time
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
        v-for="item in store.banners"
        :key="item.imageUrl"
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
        {{ item.name }}
      </td>
      <td class="text-center">
        <VTooltip :text="item.directUrl" location="bottom">
          <template v-slot:activator="{ props }">
            <VBtn icon v-bind="props" color="transparent" variant="flat" :href="item.directUrl" target="_blank">
              <VIcon color="white">mdi-link-variant</VIcon>
            </VBtn>
          </template>
        </VTooltip>
      </td>
      <td class="text-center">
        {{ item.actionType }}
      </td>
      <td class="text-center">
        <span v-html="twoLine(item.startTime!!)"></span>
      </td>
      <td class="text-center">
        <span v-html="twoLine(item.endTime!!)"></span>
      </td>
      <td class="center">
        <VSwitch class="justify-center" v-model="item.isEnabled" @change="handleEditConfirm(item)"></VSwitch>
      </td>
      <td>
        <!--        <ActionMenu :banner="item" @@edit="handleEditConfirm" @@delete="handleDelete"></ActionMenu>-->
        <MoreActionMenu>
          <template #edit>
            <BannerEditDialog :banner="item" @@confirm="handleEditConfirm"></BannerEditDialog>
          </template>
          <template #delete>
            <DeleteConfirmDialog @@delete="handleDeleteConfirm(item.id!!)"></DeleteConfirmDialog>
          </template>
        </MoreActionMenu>
      </td>
    </tr>
    </tbody>
  </VTable>
  <BannerAddDialog @@confirm="handleAddConfirm"></BannerAddDialog>
</template>

<style scoped>
:deep(.v-selection-control) {
  justify-content: center;
}
</style>