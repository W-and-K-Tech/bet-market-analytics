<script setup lang="ts">
import DimensionalAnalyticsView from "./DimensionalAnalyticsView.vue";
import GlobalSettings from "@/components/GlobalSettings.vue";
import TimeSeriesAnalyticsView from "./TimeSeriesAnalyticsView.vue";
</script>

<template>
  <main>
    <GlobalSettings />
    <div class="mt-16">
      <TimeSeriesAnalyticsView />
    </div>
    <div class="mt-32">
      <Suspense>
        <DimensionalAnalyticsView />
      </Suspense>
    </div>
  </main>
</template>