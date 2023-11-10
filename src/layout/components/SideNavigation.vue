<script setup lang="ts">
import logo from '../../assets/logo_light.svg?raw'
</script>

<template>
  <VNavigationDrawer>
    <template v-slot:prepend>
      <div
          class="pa-8 d-flex align-center gap-x-3 app-title-wrapper text-decoration-none"
      >
        <div class="d-flex" v-html="logo"/>
        <h3 class="text-white w-100">
          OUI Admin
        </h3>
      </div>
    </template>

    <VList class="pl-4">
      <VListItem prepend-icon="mdi-image" value="banner" router to="/banner">
        <VListItemTitle class="text-left">Banner</VListItemTitle>
      </VListItem>
      <VListItem prepend-icon="mdi-cards" value="coupon" router to="/coupon">
        <VListItemTitle class="text-left">Coupon</VListItemTitle>
      </VListItem>
      <VListItem prepend-icon="mdi-view-dashboard" value="category" router to="/category">
        <VListItemTitle class="text-left">Category</VListItemTitle>
      </VListItem>
      <VListItem prepend-icon="mdi-account-box" value="account" router to="/account">
        <VListItemTitle class="text-left">Account</VListItemTitle>
      </VListItem>
      <!--      <VListItem prepend-icon="mdi-pen" title="Settings" value="settings" router to="/settings"></VListItem>-->
    </VList>
  </VNavigationDrawer>

</template>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  align-items: center;

  .header-action {
    cursor: pointer;
  }
}

::deep .v-list-item {
  cursor: pointer;

  ::deep .v-list-item__content {
    text-align: left;
  }
}


</style>