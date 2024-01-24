<script setup lang="ts">
import {useBannerStore} from "../stores/banner.ts"
import BannerEditModal from "../components/BannerEditModal.vue"
import Banner from "../types/Banner.ts";

const store = useBannerStore()
store.getBanners()

const onConfirm = (banner: Banner) => {
  console.log("confirm emitted", banner)
  store.updateBanner(banner)
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
        Edit
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
            <VBtn icon v-bind="props" color="transparent" variant="flat" href="http://google.com" target="_blank">
              <VIcon color="white">mdi-link-variant</VIcon>
            </VBtn>
          </template>
        </v-tooltip>

      </td>
      <td class="text-center">
        {{ item.actionType }}
      </td>
      <td class="text-center">
        {{ item.startTime }}
      </td>
      <td class="text-center">
        {{ item.endTime }}
      </td>
      <td class="text-center">
        <BannerEditModal :banner="item" @@confirm="onConfirm"></BannerEditModal>
      </td>
    </tr>
    </tbody>
  </VTable>
</template>

<style scoped>

</style>