<script setup lang="ts">
import Calendar from 'primevue/calendar';
import { useSettingsStore } from "@/stores/settings";
import { computed } from 'vue';

const settingStore = useSettingsStore();

const startDateTime = computed({
  get: () => settingStore.startDateTime,
  set: (value) => settingStore.setStartDateTime(value),
});

const endDateTime = computed({
  get: () => settingStore.endDateTime,
  set: (value) => settingStore.setEndDateTime(value),
});
</script>

<template>
  <div v-if="settingStore.isAllDateTimeFilled">
    Report Range: {{ startDateTime.toLocaleString() }} - {{ endDateTime.toLocaleString() }}
    <div class="flex flex-wrap gap-3">
      <div>
        <label for="start-date-time" class="font-bold block mb-2"> Start Date Time </label>
        <Calendar id="start-date-time" :minDate="settingStore.minDateTime" :maxDate="settingStore.maxDateTime"
          v-model="startDateTime" showTime hourFormat="12" />
      </div>
      <div>
        <label for="end-date-time" class="font-bold block mb-2"> End Date Time </label>
        <Calendar id="end-date-time" :minDate="startDateTime" :maxDate="settingStore.maxDateTime" v-model="endDateTime"
          showTime hourFormat="12" />
      </div>
    </div>
  </div>
</template>