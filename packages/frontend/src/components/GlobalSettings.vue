<script setup lang="ts">
import Calendar from 'primevue/calendar';
import { useSettingsStore } from "@/stores/settings";
import { computed, ref, watch } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';

const settingStore = useSettingsStore();

const startDateTime = ref();
const endDateTime = ref();

const handleTimeRangeChangeClick = () => {
  settingStore.setStartDateTime(startDateTime.value);
  settingStore.setEndDateTime(endDateTime.value);
}

watch(() => settingStore.minDateTime, (value) => {
  startDateTime.value = value;
});

watch(() => settingStore.maxDateTime, (value) => {
  endDateTime.value = value;
});
</script>

<template>
  <div v-if="settingStore.minDateTime && settingStore.maxDateTime">
    <Card>
      <template #title>
        Report Range: {{ startDateTime.toLocaleString() }} - {{ endDateTime.toLocaleString() }}
      </template>

      <template #content>
        <div class="flex flex-wrap gap-3">
          <div>
            <label for="start-date-time" class="font-bold block mb-2"> Start Date Time </label>
            <Calendar id="start-date-time" :minDate="settingStore.minDateTime" :maxDate="settingStore.maxDateTime"
              v-model="startDateTime" showTime hourFormat="12" />
          </div>
          <div>
            <label for="end-date-time" class="font-bold block mb-2"> End Date Time </label>
            <Calendar id="end-date-time" :minDate="startDateTime" :maxDate="settingStore.maxDateTime"
              v-model="endDateTime" showTime hourFormat="12" />
          </div>
          <Button label="Submit" :onclick="handleTimeRangeChangeClick" />
        </div>
      </template>
    </Card>
  </div>
</template>