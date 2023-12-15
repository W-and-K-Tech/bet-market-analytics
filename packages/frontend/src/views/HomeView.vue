<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import HandleByStatsBarChart from "@/components/HandleByStatsBarChart.vue";
import TotalHandleChart from "../components/TotalHandleChart.vue";
import HandleByStatsPieChart from "@/components/HandleByStatsPieChart.vue";
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
    <div class="h-96">
      <HandleByStatsPieChart />
    </div>
  </main>
</template>
