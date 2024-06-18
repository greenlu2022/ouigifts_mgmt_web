<script setup lang="ts">
import logo from '@/assets/logo_light.svg?raw'
import {useRouter} from 'vue-router'

import {reactive} from 'vue'
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useUserStore} from "@/stores/user.ts";
import {setToken} from "@/helpers/authenticate.ts";


const store = useUserStore()

const router = useRouter()

const initialData = {
  account: "",
  password: ""
}

const form = reactive({...initialData})

const rules = {
  account: {
    required
  },
  password: {
    required
  }
}

const v$ = useVuelidate(rules, form)

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    // call api to login
    // const user = await api.login(form)
    const user = {
      id: 1,
      accountId: "user1",
      firstName: "John",
      lastName: "Doe",
      password: "123456",
      email: "john@oui.com",
      phone: "1234567890",
      sessionToken: "1234567890",
    }

    store.login(user)
    setToken('1234567890')

    Object.assign(form, {...initialData})
    v$.value.$reset();
    router.push('/banner')
  } else {
    return
  }
};
</script>

<template>
  <VCard class="rounded-lg pa-6" width="400">
    <template v-slot:title>
      <VRow class="ma-0">
        <VCol cols="12">
          <div class="d-flex justify-center" v-html="logo"/>
        </VCol>
      </VRow>
    </template>
    <template v-slot:subtitle>
      <div class="py-6">
        <span class="font-weight-black">Please sign-in to your account</span>
      </div>
    </template>

    <VRow class="mb-12 ">
      <VCol cols="12">
        <VTextField
            v-model="form.account"
            label="Account"
            outlined
            required
            :error-messages="v$.account.$errors.map((e: any) => e.$message)"
            prepend-inner-icon="mdi-account"
        />
      </VCol>
      <VCol cols="12">
        <VTextField
            v-model="form.password"
            label="Password"
            type="password"
            outlined
            required
            :error-messages="v$.password.$errors.map((e: any) => e.$message)"
            prepend-inner-icon="mdi-lock"
        />
      </VCol>
    </VRow>
    <VDivider class="my-6"/>
    <VRow>
      <VCol cols="12">
        <!--        <VBtn block color="primary" router to="/banner">Login</VBtn>-->
        <VBtn block color="primary" @click="handleSubmit">Login</VBtn>
      </VCol>
    </VRow>

  </VCard>

</template>

<style scoped>

</style>