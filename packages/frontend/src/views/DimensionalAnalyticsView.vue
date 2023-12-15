<script setup lang="ts">
import HandleGroupByBarChart from "@/components/HandleGroupByBarChart.vue";
import HandleGroupByPieChart from "@/components/HandleGroupByPieChart.vue";
import { type GroupType } from '@/utils/types';
import { generateColors } from '@/utils/index';
import type { ChartData } from "chart.js";
import { computed, onMounted, reactive, ref } from "vue";
import Button from 'primevue/button';

const colorSet: { [key in GroupType]: any[] } = {
  'stat_type': generateColors(50),
  'player_name': generateColors(50),
  'team_abbr': generateColors(2),
};

const groupTitleMap: { [key in GroupType]: string } = {
  'stat_type': 'Stat',
  'player_name': 'Player',
  'team_abbr': 'Team',
}

const totalHandleDataByGroup = reactive<{ [key in GroupType]: any[] | null }>({
  'stat_type': null,
  'player_name': null,
  'team_abbr': null,
});

const groups = Object.keys(totalHandleDataByGroup) as GroupType[];
const currentGroup = ref<GroupType>('stat_type');
const currentGroupTitle = computed<string>(() => groupTitleMap[currentGroup.value]);

const barChartData = computed<ChartData | null>(() => {
  const data = totalHandleDataByGroup[currentGroup.value];
  if (data === null) return null;
  return {
    labels: data.map((item: any) => item[currentGroup.value]).slice(0, 10),
    datasets: [{
      label: 'Total Bet Handle',
      data: data.map((item: any) => item.total_handle).slice(0, 10),
      backgroundColor: colorSet[currentGroup.value],
    }]
  }
});

const pieChartData = computed<ChartData | null>(() => {
  const data = totalHandleDataByGroup[currentGroup.value];
  if (data === null) return null;

  // Sort data by total_handle in descending order
  data.sort((a, b) => b.total_handle - a.total_handle);
  // Take the top 10 items
  const topItems = data.slice(0, 10);
  // Aggregate the rest
  const otherTotalHandle = data.slice(10).reduce((acc, item) => acc + item.total_handle, 0);
  // Add 'Other' category if there are more than 10 items
  if (data.length > 10) {
    topItems.push({
      [currentGroup.value]: 'Other',
      total_handle: otherTotalHandle
    });
  }

  const totalHandle = data.reduce((acc: number, item: any) => acc + item.total_handle, 0);

  return {
    labels: topItems.map((item: any) => item[currentGroup.value]),
    datasets: [{
      label: 'Percentage of Total Handle',
      data: topItems.map((item: any) => (item.total_handle / totalHandle) * 100),
      backgroundColor: colorSet[currentGroup.value],
    }]
  };
});

const handleClickMarketType = async (group: GroupType) => {
  currentGroup.value = group;
  if (totalHandleDataByGroup[group] === null) {
    totalHandleDataByGroup[group] = await fetchData(group);
  }
}

onMounted(async () => {
  totalHandleDataByGroup['stat_type'] = await fetchData('stat_type');
});

async function fetchData(groupType: GroupType) {
  try {
    const response = await fetch(`http://localhost:3000/api/analytics/handle_by_${groupType}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl">Total Handle Performance</h2>
    <div class="flex items-center gap-12">
      <h3 class="text-lg">Market</h3>
      <div class="flex gap-4">
        <Button :key="group" v-for="group in groups" severity="info" :outlined="currentGroup !== group"
          :onclick="async () => handleClickMarketType(group)" :label="groupTitleMap[group]" />
      </div>
    </div>
    <h3>{{ `TOP 10 ${currentGroupTitle} Betting Performance` }}</h3>
  </div>

  <div class="flex">
    <div class="h-96 w-3/4">
      <HandleGroupByBarChart :chartData="barChartData" />
    </div>
    <div class="h-96 w-1/4">
      <HandleGroupByPieChart :chartData="pieChartData" />
    </div>
  </div>
</template>