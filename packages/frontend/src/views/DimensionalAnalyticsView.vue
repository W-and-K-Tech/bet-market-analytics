<script setup lang="ts">
import HandleGroupByBarChart from "@/components/HandleGroupByBarChart.vue";
import TotalHandleChart from "../components/TotalHandleChart.vue";
import HandleGroupByPieChart from "@/components/HandleGroupByPieChart.vue";
import { type GroupType } from '@/utils/types';
import { generateColors } from '@/utils/index';
import type { ChartData } from "chart.js";
import { ref } from "vue";

const statTypeBarChartData = await fetchBarChartData('stat_type');
const playerNameBarChartData = await fetchBarChartData('player_name');

const groupByChartData = ref<ChartData | null>(statTypeBarChartData);

async function fetchBarChartData(groupType: GroupType): Promise<ChartData | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/analytics/handle_by_${groupType}`);
    const data = await response.json();

    return {
      labels: data.map((item: any) => item[groupType]).slice(0, 10),
      datasets: [{
        label: 'Total Bet Handle',
        data: data.map((item: any) => item.total_handle).slice(0, 10),
        backgroundColor: generateColors(data.length),
      }]
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

</script>

<template>
  <main>
    <div class="h-96">
      <TotalHandleChart />
    </div>
    <button :onclick="() => groupByChartData = statTypeBarChartData">Stat Market</button>
    <button :onclick="() => groupByChartData = playerNameBarChartData">Player</button>
    <div class="flex">
      <div class="h-96 w-3/4">
        <HandleGroupByBarChart :chartData="groupByChartData" />
      </div>
      <div class="h-96 w-1/4">
        <HandleGroupByPieChart groupType="stat_type" />
      </div>
    </div>
  </main>
</template>