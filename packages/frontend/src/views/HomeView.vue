<script setup lang="ts">
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DimensionalAnalyticsView from "./DimensionalAnalyticsView.vue";
import GlobalSettings from "@/components/GlobalSettings.vue";
import TimeSeriesAnalyticsView from "./TimeSeriesAnalyticsView.vue";
import { useSettingsStore } from '@/stores/settings';
const settingStore = useSettingsStore();
</script>

<template>
  <main>
    <div class="flex">
      <div>
        <h3 class="text-xl font-semibold">Report Range</h3>
        <div class="text-sm mb-8">{{ settingStore.startDateTime?.toLocaleString() }} - {{
          settingStore.endDateTime?.toLocaleString() }}</div>
      </div>
      <GlobalSettings />
    </div>


    <TabView>
      <TabPanel>
        <template #header>
          <div>
            <i class="pi pi-chart-line"></i>
            <span class="font-bold white-space-nowrap ml-2">Time-Series Analysis</span>
          </div>
        </template>
        <TimeSeriesAnalyticsView />
      </TabPanel>
      <TabPanel>
        <template #header>
          <div>
            <i class="pi pi-chart-line"></i>
            <span class="font-bold white-space-nowrap ml-2">Dimensional Analysis</span>
          </div>
        </template>
        <Suspense>
          <DimensionalAnalyticsView />
        </Suspense>
      </TabPanel>
    </TabView>
</main></template>