<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {DateTime} from 'luxon'
// @ts-ignore
import {TimePicker} from 'vue-material-time-picker'
import "vue-material-time-picker/dist/style.css"
import DateTimeField from "@/types/DateTimeField";

const fieldProps = defineProps<DateTimeField>()
const model = defineModel()

const date = ref()
const time = ref("00:00")
const tab = ref("date")
const dateTimeDialogState = ref(false)

const dateTimeFormatted = computed(() => {
  if (date.value && time.value) {
    const formattedDate = DateTime.fromJSDate(date.value).toFormat("yyyy-MM-dd")
    const fullFormattedDateTime = `${formattedDate} ${time.value}`
    return fullFormattedDateTime
  } else {
    return model.value
  }
})


watch(dateTimeFormatted, (newDateTimeFormatted) => {
  model.value = newDateTimeFormatted
})

watch(date, () => {
  tab.value = "time"
})

// watch(dateTimeDialogState, (newDateTimeDialogState) => {
//   if (newDateTimeDialogState && fieldProps.modelValue) {
//     date.value = DateTime.fromISO(fieldProps.modelValue)
//         .setLocale("en-US")
//         .toFormat("yyyy-MM-dd");
//
//     time.value = DateTime.fromISO(fieldProps.modelValue)
//         .setLocale("en-US")
//         .toFormat("HH:mm");
//   }
// })

const closeDialog = () => {
  dateTimeDialogState.value = false
  // this.$emit(
  //     "input",
  //     DateTime.fromFormat(
  //         `${date.value} ${time.value}`,
  //         "yyyy-MM-dd HH:mm"
  //     ).toISO()
  // );
  // setTimeout(() => (tab.value = "date"), 300);
}
</script>

<template>
  <VDialog
      @click:outside="closeDialog"
      v-model="dateTimeDialogState"
      width="360px"
      :fullscreen="false"
  >
    <template v-slot:activator="{isActive, props}">
      <VTextField v-model="dateTimeFormatted"
                  :label="fieldProps.label"
                  variant="outlined"
                  readonly
                  v-bind="props"
                  v-on="isActive"
      >
      </VTextField>
    </template>

    <VCard class="t-datetime-picker white">
      <VTabs v-model="tab" bg-color="primary" color="white" grow height="36">
        <VTab value="date">
          <VIcon color="white">mdi-calendar</VIcon>
        </VTab>
        <VTab value="time">
          <VIcon color="white">mdi-clock</VIcon>
        </VTab>
      </VTabs>
      <VWindow v-model="tab">
        <VWindowItem value="date">
          <VDatePicker v-model="date" class="rounded-0" @input="tab = 'time'" full-width></VDatePicker>
        </VWindowItem>

        <VWindowItem value="time">
          <TimePicker
              v-model="time"
              format="24hr"
              class="rounded-0"
              full-width
              @click:minute="closeDialog"
          >
          </TimePicker>
        </VWindowItem>
      </VWindow>
    </VCard>
  </VDialog>
</template>

<style scoped>
.t-datetime-picker {
  .v-time-picker-title__time * {
    font-size: 60px;
    height: 60px;
  }

  :deep(.time-picker-clock__item) {
    color: green;
  }
}
</style>