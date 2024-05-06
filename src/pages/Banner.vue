<script setup lang="ts">
import {useBannerStore} from "@/stores/banner"
import Banner from "@/types/Banner";
import BannerAddDialog from "@/components/BannerAddDialog.vue";
import BannerEditDialog from "@/components/BannerEditDialog.vue";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";
import MoreActionMenu from "@/components/MoreActionMenu.vue";
import {ref} from "vue";

const store = useBannerStore()
store.getBanners()

const search = ref<string>("")

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

const headers = [
  {key: 'imageUrl', title: 'Image', align: 'center', fixed: true},
  {key: 'name', title: 'Name', align: 'center'},
  {key: 'directUrl', title: 'Direct Url', align: 'center'},
  {key: 'actionType', title: 'Action Type', align: 'center'},
  {key: 'startTime', title: 'Start Time', align: 'center',},
  {key: 'endTime', title: 'End Time', align: 'center',},
  {key: 'isEnabled', title: 'Active', align: 'center',},
  {key: 'more', title: 'More', align: 'center',}
]


</script>

<template>
  <VCard class="rounded-lg mt-9 w-100">
    <VCardTitle class="d-flex align-center pe-2">
      <VIcon icon="mdi-image-area"></VIcon> &nbsp;
      Banner
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

    <VDataTable v-model:search="search" :items="store.banners" :headers="( headers as any)" height="780px"
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
      <template v-slot:item.isEnabled="{ item }">
        <VSwitch class="justify-center" v-model="item.isEnabled" @change="handleEditConfirm(item)"></VSwitch>
      </template>

      <template v-slot:item.directUrl="{ item }">
        <VTooltip :text="item.directUrl" location="bottom">
          <template v-slot:activator="{ props }">
            <VBtn icon v-bind="props" color="transparent" variant="flat" :href="item.directUrl" target="_blank">
              <VIcon color="white">mdi-link-variant</VIcon>
            </VBtn>
          </template>
        </VTooltip>
      </template>

      <template v-slot:item.startTime="{ item }">
        <span v-html="twoLine(item.startTime!!)"></span>
      </template>

      <template v-slot:item.endTime="{ item }">
        <span v-html="twoLine(item.endTime!!)"></span>
      </template>


      <template v-slot:item.more="{ item }">
        <MoreActionMenu>
          <template #edit>
            <BannerEditDialog :banner="item" @@confirm="handleEditConfirm"></BannerEditDialog>
          </template>
          <template #delete>
            <DeleteConfirmDialog @@delete="handleDeleteConfirm(item.id!!)"></DeleteConfirmDialog>
          </template>
        </MoreActionMenu>
      </template>
    </VDataTable>
  </VCard>
  <BannerAddDialog @@confirm="handleAddConfirm"></BannerAddDialog>
</template>

<style scoped>
:deep(.v-selection-control) {
  justify-content: center;
}
</style>