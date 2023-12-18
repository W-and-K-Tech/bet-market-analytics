<script setup lang="ts">
import Calendar from 'primevue/calendar';
import { useSettingsStore } from "@/stores/settings";
import { onBeforeMount, ref, watch } from 'vue';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { CurrencyType } from '@/utils/types';

const settingsStore = useSettingsStore();

const startDateTime = ref();
const endDateTime = ref();

const curriencies = ref([
  { name: 'USD', value: CurrencyType.USD },
  { name: 'EUR', value: CurrencyType.EUR },
  { name: 'AUSD', value: CurrencyType.AUSD },
  { name: 'CAD', value: CurrencyType.CAD },
]);
const selectedCurrency = ref(curriencies.value[0]);

const handleTimeRangeChangeClick = () => {
  settingsStore.setStartDateTime(startDateTime.value);
  settingsStore.setEndDateTime(endDateTime.value);
  settingsStore.setSelectedCurrency(selectedCurrency.value.value);
}

onBeforeMount(() => {
  startDateTime.value = settingsStore.minDateTime;
  endDateTime.value = settingsStore.maxDateTime;
  selectedCurrency.value = curriencies.value.find((currency) => currency.value === settingsStore.selectedCurrency) ?? curriencies.value[0];
})

watch(() => settingsStore.minDateTime, (value) => {
  startDateTime.value = value;
  settingsStore.setStartDateTime(value);
});

watch(() => settingsStore.maxDateTime, (value) => {
  endDateTime.value = value;
  settingsStore.setEndDateTime(value);
});
</script>

<template>
  <div v-if="settingsStore.minDateTime && settingsStore.maxDateTime">
    <div class="flex flex-wrap gap-8">
      <div>
        <label for="start-date-time" class="font-semibold text-slate-500 block mb-2"><i class="pi pi-calendar-times"></i>
          Start Date Time </label>
        <Calendar id="start-date-time" :minDate="settingsStore.minDateTime" :maxDate="settingsStore.maxDateTime"
          v-model="startDateTime" showTime hourFormat="12" />
      </div>
      <div>
        <label for="end-date-time" class="font-semibold text-slate-500 block mb-2"><i class="pi pi-calendar-times"></i>
          End Date Time </label>
        <Calendar id="end-date-time" :minDate="startDateTime" :maxDate="settingsStore.maxDateTime" v-model="endDateTime"
          showTime hourFormat="12" />
      </div>
      <div>
        <label for="currencies" class="font-semibold text-slate-500 block mb-2"><i class="pi pi-money-bill"></i> Currency
        </label>
        <Dropdown id="currencies" v-model="selectedCurrency" :options="curriencies" optionLabel="name"
          placeholder="Select Currency" />
      </div>
      <Button severity="info" label="Query" :onclick="handleTimeRangeChangeClick" />
    </div>
  </div>
</template>