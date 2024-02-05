<script setup lang="ts">
import {useBannerStore} from "../stores/banner.ts"
import ActionMenu from "@/components/ActionMenu.vue";
import Banner from "@/types/Banner.ts";
import BannerAddDialog from "@/components/BannerAddDialog.vue";

const store = useBannerStore()
store.getBanners()

const handleEditConfirm = (banner: Banner) => {
  console.log("edit confirm emitted", banner)
  store.updateBanner(banner)
}

const handleAddConfirm = (banner: Banner) => {
  console.log("add confirm emitted", banner)
  store.addBannerUnshift(banner)
}

const handleDelete = (bannerId: number) => {
  console.log("delete emitted", bannerId)
  store.removeBanner(bannerId)
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
      <th class="text-uppercase text-center">
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
      <td class="text-center">
        <v-tooltip :text="item.directUrl" location="bottom">
          <template v-slot:activator="{ props }">
            <VBtn icon v-bind="props" color="transparent" variant="flat" :href="item.directUrl" target="_blank">
              <VIcon color="white">mdi-link-variant</VIcon>
            </VBtn>
          </template>
        </v-tooltip>
      </td>
      <td class="text-center">
        {{ item.actionType }}
      </td>
      <td class="text-center">
        <span v-html="twoLine(item.startTime)"></span>
      </td>
      <td class="text-center">
        <span v-html="twoLine(item.endTime)"></span>
      </td>
      <td class="center">
        <VSwitch class="justify-center" v-model="item.isActive" @change="handleEditConfirm(item)"></VSwitch>
      </td>
      <td>
        <ActionMenu :banner="item" @@edit="handleEditConfirm" @@delete="handleDelete"></ActionMenu>
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