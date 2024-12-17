<script setup lang="ts">

import {ref} from "vue";
import {useAccountStore} from "@/stores/account.ts";
import Account from "@/types/Account.ts";

const store = useAccountStore()
store.getAccounts()

const headers = [
  {key: 'userImage', title: 'UserImage', align: 'center', fixed: true, width: '240px'},
  {key: 'account', title: 'Account', align: 'center'},
  {key: 'name', title: 'Name', align: 'center'},
  {key: 'email', title: 'Email', align: 'center'},
  {key: 'phone', title: 'Phone', align: 'center'},
  {key: 'birthday', title: 'Birthday', align: 'center'},
  {key: 'membership', title: 'Membership', align: 'center'},
  {key: 'joinTime', title: 'Join Time', align: 'center',},
  {key: 'collections', title: 'Collections', align: 'center',},
  {key: 'status', title: 'Status', align: 'center',},
  {key: 'lastLoginTime', title: 'LastLoginTime', align: 'center',},
  {key: 'sessionToken', title: 'sessionToken', align: 'center',},
]

const search = ref<string>("")
const handleEditConfirm = (account: Account) => {
  console.log("edit confirm emitted", account)
  store.update(account)
}


</script>

<template>
  <VCard class="rounded-lg mt-9 w-100">
      <VCardTitle class="d-flex align-center pe-2">
        <VIcon icon="mdi-image-area"></VIcon> &nbsp;
        Account
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

<<<<<<< HEAD
      <VDataTable v-model:search="search" :items="store.accounts" :headers="( headers as any)" height="780px"
                  class="rounded-lg"
                  fixed-header>

        <template v-slot:item.imageUrl="{ item }">
          <VCard class="my-4" elevation="2" rounded>
            <VImg
                :width="240"
                aspect-ratio="4/3"
                class="ma-auto"
                cover
                :src="item.imageUrl"
                :class="{ grayscale: !item.isEnabled }"
            ></VImg>
=======
      <VDataTable v-model:search="search"
                  :items="store.accounts"
                  :headers="( headers as any)"
                  height="780px"
                  class="rounded-lg"
                  fixed-header>
        <template v-slot:item.imageUrl="{ item }">
          <VCard class="my-4" elevation="2" rounded>
            <VImg
                :width="160"
                aspect-ratio="1/1"
                class="ma-auto"
                cover
                lazy-src="https://picsum.photos/id/11/100/60"
                :src="item.imageUrl"
                :class="{ grayscale: !item.isEnabled }"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                  ></v-progress-circular>
                </div>
              </template>
            </VImg>
>>>>>>> 772b524 (init)
          </VCard>
        </template>
        <template v-slot:item.isEnabled="{ item }">
          <VSwitch class="justify-center" v-model="item.isEnabled" @change="handleEditConfirm(item)"></VSwitch>
        </template>
      </VDataTable>
    </VCard>
</template>

<style scoped>

</style>