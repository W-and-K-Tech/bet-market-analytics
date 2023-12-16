<script setup lang="ts">
import DimensionalAnalyticsView from "./DimensionalAnalyticsView.vue";
import TotalHandleChart from "../components/TotalHandleChart.vue";
import GlobalSettings from "@/components/GlobalSettings.vue";
</script>

<template>
  <main>
    <GlobalSettings />
    <div class="h-[520px] w-full">
      <TotalHandleChart />
    </div>
    <div class="mt-32">
      <Suspense>
        <DimensionalAnalyticsView />
      </Suspense>
    </div>
  </main>
</template>