<script setup lang="ts">
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DimensionalAnalyticsView from "./DimensionalAnalyticsView.vue";
import GlobalSettings from "@/components/GlobalSettings.vue";
import TimeSeriesAnalyticsView from "./TimeSeriesAnalyticsView.vue";
import GameInfo from '@/components/GameInfo.vue';
import { useSettingsStore } from '@/stores/settings';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(LocalizedFormat)

const settingStore = useSettingsStore();
</script>

<template>
  <main class="flex flex-col md:flex-row min-h-full-height w-full">
    <div class="md:w-72 shrink-0 bg-slate-50 p-8">
      <GlobalSettings />
    </div>

    <div class="grow p-8 shrink-0 md:w-dashboard-content-full">
      <GameInfo />
      <h3 class="mt-4 mb-2 text-sm text-slate-500 font-semibold">Report Range</h3>
      <div class="text-xl text-slate-800 mb-4">{{ dayjs(settingStore.startDateTime).format('lll') }} - {{
        dayjs(settingStore.endDateTime).format('lll') }}</div>
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
              <i class="pi pi-chart-bar"></i>
              <span class="font-bold white-space-nowrap ml-2">Dimensional Analysis</span>
            </div>
          </template>
          <Suspense>
            <DimensionalAnalyticsView />
          </Suspense>
        </TabPanel>
      </TabView>
    </div>

  </main>
</template>