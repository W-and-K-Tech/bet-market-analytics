<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import HandleGroupByBarChart from "@/components/HandleGroupByBarChart.vue";
import TotalHandleChart from "../components/TotalHandleChart.vue";
import HandleGroupByPieChart from "@/components/HandleGroupByPieChart.vue";
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div class="h-96">
      <TotalHandleChart />
    </div>
    <div class="flex">
      <div class="h-96 w-3/4">
        <HandleGroupByBarChart groupType="stat_type" />
      </div>
      <div class="h-96 w-1/4">
        <HandleGroupByPieChart groupType="stat_type" />
      </div>
    </div>
    <div class="flex">
      <div class="h-96 w-3/4">
        <HandleGroupByBarChart groupType="player_name" />
      </div>
      <div class="h-96 w-1/4">
        <HandleGroupByPieChart groupType="player_name" />
      </div>
    </div>
  </main>
</template>