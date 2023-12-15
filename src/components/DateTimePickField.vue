<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {DateTime} from 'luxon'
// @ts-ignore
import {TimePicker} from 'vue-material-time-picker'
import "vue-material-time-picker/dist/style.css"

const fieldProps = defineProps({
  value: {
    type: String!!,
  },
  label: {
    type: String!!,
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  persistent: {
    type: Boolean,
    default: false
  },
  dateFormat: {
    type: String,
    default: "dd/MM/yyyy"
  },
  timeFormat: {
    type: String,
    default: "HH:mm"
  }
})

const date = ref()
const time = ref()
const tab = ref("date")
const dateTimeDialogState = ref(false)

const datetimeFormatted = computed(() => fieldProps.value ? DateTime.fromISO(fieldProps.value).setLocale("en-us").toFormat(`${fieldProps.dateFormat} ${fieldProps.timeFormat}`) : "")

watch(dateTimeDialogState, (newdateTimeDialogState) => {
  if (newdateTimeDialogState && fieldProps.value) {
    date.value = DateTime.fromISO(fieldProps.value)
        .setLocale("en-US")
        .toFormat("yyyy-MM-dd");

    time.value = DateTime.fromISO(fieldProps.value)
        .setLocale("en-US")
        .toFormat(fieldProps.timeFormat);
  }
})

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
      :persistent="persistent"
      width="360px"
      :fullscreen="fullscreen"
  >
    <template v-slot:activator="{ isActive, props }">
      <VTextField :value="datetimeFormatted"
                  :label="fieldProps.label"
                  variant="outlined"
                  readonly
                  v-bind="{ ...props, ...$attrs }"
                  v-on="isActive">
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
      <v-window v-model="tab">
        <v-window-item value="date">
          <VDatePicker v-model="date" class="rounded-0" @input="tab = 'time'" full-width></VDatePicker>
        </v-window-item>

        <v-window-item value="time">
          <TimePicker
              v-model="time"
              format="24hr"
              class="rounded-0"
              full-width
              @click:minute="closeDialog"
          >
          </TimePicker>
        </v-window-item>
      </v-window>
    </VCard>
  </VDialog>
</template>

<style scoped>
.t-datetime-picker {
  .v-tabs-slider-wrapper {
    top: 0;
  }

  .v-picker__title {
    height: 90px;
  }

  .v-time-picker-title__time * {
    font-size: 60px;
    height: 60px;
  }

  ::v-deep .time-picker-clock__item {
    color: green;
  }

  .v-picker__body {
    height: 290px;
  }

  .v-tabs-items {
    height: 380px;
  }
}
</style>