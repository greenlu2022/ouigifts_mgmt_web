<script setup lang="ts">

import {ref} from 'vue'
import SubCoupon from '@/types/SubCoupon'
import subCoupons from "@/mockData/subCoupons";

const dialog = ref(false)

const coupons: SubCoupon[] = subCoupons

interface FetchOptions {
  page: number,
  itemsPerPage: number,
  sortBy: { key: string, order: 'asc' | 'desc' }[]
}

interface FetchResponse {
  items: any[],
  total: number,
}

interface FakeAPI {
  fetch: (options: FetchOptions) => Promise<FetchResponse>
}

const FakeAPI: FakeAPI = {
  fetch: async function ({page, itemsPerPage, sortBy}: FetchOptions): Promise<FetchResponse> {
    return new Promise<FetchResponse>((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = coupons.slice()

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a: any, b: any) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({items: paginated, total: items.length})
      }, 500)
    })
  },
}

const headers = [
  {title: '#', key: 'index', align: 'start', sortable: false, fixed: true},
  {title: 'Id', key: 'id', align: 'end', sortable: false, fixed: true},
  {title: 'couponCode', key: 'couponCode', align: 'end'},
  {title: 'collectedBy', key: 'collectedBy', align: 'end'},
  {title: 'generatedTime', key: 'generatedTime', align: 'end'},
  {title: 'redeemedAt', key: 'redeemedAt', align: 'end'},
  {title: 'redeemedTime', key: 'redeemedTime', align: 'end'},
]

const loading = ref<boolean>(true)
const search = ref('')
const itemsPerPage = ref(10)
const totalItems = ref(0)
const serverItems = ref<SubCoupon[]>([])
const currentPage = ref(1)


const loadItems = async ({page, itemsPerPage, sortBy}: FetchOptions): Promise<void> => {
  loading.value = true
  try {
    const {items, total} = await FakeAPI.fetch({page, itemsPerPage, sortBy})
    serverItems.value = items
    totalItems.value = total
    currentPage.value = page
  } catch (error) {
    // Handle error
    console.error(error)
  } finally {
    loading.value = false
  }
};
</script>

<template>
  <VDialog
      v-model="dialog"
      persistent
      width="800"
  >
    <template v-slot:activator="{ props }">
        <span v-bind="props">
          <VIcon color="white">mdi-list-box-outline</VIcon>
        </span>
    </template>
    <VCard class="pa-3">
      <VCardTitle class="text-h5">
        Sub Coupons
      </VCardTitle>
      <VRow class="pa-3">
        <VDataTableServer
            v-model:items-per-page="itemsPerPage"
            :headers="(headers as any)"
            :items="serverItems"
            :items-length="totalItems"
            :loading="loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
            fixed-header
            height="600"
        >
          <template v-slot:item.index="{ index }">
            {{ ((currentPage - 1) * itemsPerPage) + index + 1 }}
          </template>
        </VDataTableServer>
      </VRow>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn
            color="green"
            variant="text"
            @click="dialog = false"
        >
          Close
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>

</style>