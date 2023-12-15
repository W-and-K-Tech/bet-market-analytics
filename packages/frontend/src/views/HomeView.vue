<script setup lang="ts">
import DimensionalAnalyticsView from "./DimensionalAnalyticsView.vue";
import TotalHandleChart from "../components/TotalHandleChart.vue";
</script>

<template>
  <main>
    <div class="h-96">
      <TotalHandleChart />
    </div>
    <div>
      <Suspense>
        <DimensionalAnalyticsView />
      </Suspense>
    </div>
  </main>
</template>