<script setup lang="ts">
import Calendar from 'primevue/calendar';
import { useSettingsStore } from "@/stores/settings";
import { onBeforeMount, ref, watch } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import { CurrencyType, TimeSpanOptions } from '@/utils/types';

const settingStore = useSettingsStore();

const startDateTime = ref();
const endDateTime = ref();

const timeSpans = ref([
  { name: 'Every Minute', value: TimeSpanOptions.Minutely },
  { name: 'Hourly', value: TimeSpanOptions.Hourly },
]);
const selectedTimeSpan = ref(timeSpans.value[1]);

const curriencies = ref([
  { name: 'USD', value: CurrencyType.USD },
  { name: 'EUR', value: CurrencyType.EUR },
  { name: 'AUSD', value: CurrencyType.AUSD },
  { name: 'CAD', value: CurrencyType.CAD },
]);
const selectedCurrency = ref(curriencies.value[0]);

const handleTimeRangeChangeClick = () => {
  settingStore.setStartDateTime(startDateTime.value);
  settingStore.setEndDateTime(endDateTime.value);
  settingStore.setSelectedTimeSpan(selectedTimeSpan.value.value);
  settingStore.setSelectedCurrency(selectedCurrency.value.value);
}

onBeforeMount(() => {
  startDateTime.value = settingStore.minDateTime;
  endDateTime.value = settingStore.maxDateTime;
  selectedTimeSpan.value = timeSpans.value.find((timeSpan) => timeSpan.value === settingStore.selectedTimeSpan) ?? timeSpans.value[1];
  selectedCurrency.value = curriencies.value.find((currency) => currency.value === settingStore.selectedCurrency) ?? curriencies.value[0];
})

watch(() => settingStore.minDateTime, (value) => {
  startDateTime.value = value;
  settingStore.setStartDateTime(value);
});

watch(() => settingStore.maxDateTime, (value) => {
  endDateTime.value = value;
  settingStore.setEndDateTime(value);
});
</script>

<template>
  <div v-if="settingStore.minDateTime && settingStore.maxDateTime">
    <Card>
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
          <div>
            <label for="time-span" class="font-bold block mb-2"> Time Span </label>
            <Dropdown id="time-span" v-model="selectedTimeSpan" :options="timeSpans" optionLabel="name"
              placeholder="Select a Time Span" />
          </div>
          <div>
            <label for="currencies" class="font-bold block mb-2"> Currency </label>
            <Dropdown id="currencies" v-model="selectedCurrency" :options="curriencies" optionLabel="name"
              placeholder="Select Currency" />
          </div>
          <Button severity="info" label="Query" :onclick="handleTimeRangeChangeClick" />
        </div>
      </template>
    </Card>
  </div>
</template>