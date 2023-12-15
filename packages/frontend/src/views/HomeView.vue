<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import HandleByStatsBarChart from "@/components/HandleByStatsBarChart.vue";
import TotalHandleChart from "../components/TotalHandleChart.vue";
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div class="h-96">
      <TotalHandleChart />
    </div>
    <div class="h-96">
      <HandleByStatsBarChart />
    </div>
  </main>
</template>
