<script setup lang="ts">
import {reactive, ref} from "vue";
import DateTimePickField from "@/components/DateTimePickField.vue";
import Banner from "@/types/Banner";
import {useVuelidate} from "@vuelidate/core";
import {required, url} from "@vuelidate/validators";
import {endDateAfterStartDate, isUrlWhenActionTypeIsNotNone} from "@/validators/formValidators.ts";


const initialData: Banner = {
  imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  name: "",
  directUrl: "",
  actionType: "None",
  startTime: "",
  endTime: "",
  isEnabled: false,
}

const dialog = ref(false)
const refInputEl = ref<HTMLElement>()

const localFormData = reactive({...initialData})

const rules = {
  imageUrl: {
    required,
    url
  },
  name: {
    required
  },
  directUrl: {
    isUrlWhenActionTypeIsNotNone
  },
  actionType: {
    required
  },
  endTime: {
    endDateAfterStartDate
  }
};


const v$ = useVuelidate(rules, localFormData);

const emit = defineEmits<{
  (e: '@confirm', banner: Banner): void,
}>()

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    emit("@confirm", {...localFormData});
    dialog.value = false;

    Object.assign(localFormData, {...initialData})
    v$.value.$reset();
  } else {
    return
  }
};

const handleDismiss = () => {
  dialog.value = false;
  Object.assign(localFormData, {...initialData})
  v$.value.$reset();
}

// changeAvatar function
const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const {files} = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        Object.assign(localFormData, {imageUrl: fileReader.result})
      }
    }
  }
}
</script>

<template>
  <VDialog
      v-model="dialog"
      persistent
      width="600"
  >
    <template v-slot:activator="{ props }">
      <VBtn icon
            color="green"
            class="position-fixed"
            style="bottom:30px; right:30px"
            v-bind="props">
        <VIcon color="white">mdi-plus</VIcon>
      </VBtn>
    </template>
    <VCard class="pa-3">
      <VCardTitle class="text-h5">
        Add Banner
      </VCardTitle>
      <VRow class="pa-3">
        <VCol cols="12" sm="3" class="px-3">
          <VAvatar
              rounded="lg"
              size="120"
              :image="localFormData.imageUrl"
          />
        </VCol>
        <VCol cols="12" sm="9" class="px-3">
          <VBtn
              color="primary"
              @click="refInputEl?.click()"
          >
            <span class="d-none d-sm-block">Upload Image</span>
          </VBtn>
          <input
              ref="refInputEl"
              type="file"
              name="file"
              accept=".jpeg,.png,.jpg,GIF,.webp,.svg"
              hidden
              @input="changeAvatar"
          >
          <VSpacer></VSpacer>
          <div class="text-body-1 mt-3">
            Allowed JPG, GIF, PNG, SVG or WEBP . Max size of 800K
          </div>
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
              label="Name"
              variant="outlined"
              v-model="localFormData.name"
              :error-messages="v$.name.$errors.map((e: any) => e.$message)"
              required
          ></VTextField>
        </VCol>
        <VCol cols="12" sm="6">
          <v-select
              label="Action Type"
              :items="['None', 'Inner Route', 'Outer Route']"
              variant="outlined"
              v-model="localFormData.actionType"
              :error-messages="v$.actionType.$errors.map((e: any) => e.$message)"
              required
          ></v-select>
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
              placeholder="https://ouigifts.com"
              label="Direct Url"
              variant="outlined"
              v-model="localFormData.directUrl"
              :error-messages="v$.directUrl.$errors.map((e: any) => e.$message)"
              required
          ></VTextField>
        </VCol>
        <VCol cols="12" sm="6">
          <DateTimePickField label="Start Date" v-model="localFormData.startTime"></DateTimePickField>
        </VCol>
        <VCol cols="12" sm="6">
          <DateTimePickField label="End Date"
                             v-model="localFormData.endTime"
                             :error-messages="v$.endTime.$errors.map((e: any):string => e.$message)"
          ></DateTimePickField>
        </VCol>
        <VCol cols="12" sm="6">
          <VSwitch v-model="localFormData.isEnabled"
                   :label="`${localFormData.isEnabled?'Activated':'Disabled'}`"
          ></VSwitch>
        </VCol>
      </VRow>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn
            color="red"
            variant="text"
            @click="handleDismiss"
        >
          Dismiss
        </VBtn>
        <VBtn
            color="green-darken-1"
            @click="handleSubmit"
        >
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>

</style>