<script setup lang="ts">
import HandleGroupByBarChart from "@/components/HandleGroupByBarChart.vue";
import HandleGroupByPieChart from "@/components/HandleGroupByPieChart.vue";
import { groupTitleMap, type GroupType } from '@/utils/types';
import { generateColors } from '@/utils/index';
import type { ChartData } from "chart.js";
import { computed, onMounted, reactive, watch } from "vue";
import Button from 'primevue/button';
import { useSettingsStore } from "@/stores/settings";
import dayjs from "dayjs";

const colorSet: { [key in GroupType]: any[] } = {
  'stat_type': generateColors(50),
  'player_name': generateColors(50),
  'team_abbr': generateColors(2),
};

const totalHandleDataByGroup = reactive<{ [key in GroupType]: any[] | null }>({
  'stat_type': null,
  'player_name': null,
  'team_abbr': null,
});

const settingsStore = useSettingsStore();

const groups = Object.keys(totalHandleDataByGroup) as GroupType[];

const barChartData = computed<ChartData | null>(() => {
  const data = totalHandleDataByGroup[settingsStore.currentGroup];
  if (data === null) return null;
  return {
    labels: data.map((item: any) => item[settingsStore.currentGroup]).slice(0, 10),
    datasets: [{
      label: 'Total Bet Handle',
      data: data.map((item: any) => item.total_handle).slice(0, 10),
      backgroundColor: colorSet[settingsStore.currentGroup],
    }]
  }
});

const pieChartData = computed<ChartData | null>(() => {
  const data = totalHandleDataByGroup[settingsStore.currentGroup];
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
      [settingsStore.currentGroup]: 'Other',
      total_handle: otherTotalHandle
    });
  }

  const totalHandle = data.reduce((acc: number, item: any) => acc + item.total_handle, 0);

  return {
    labels: topItems.map((item: any) => item[settingsStore.currentGroup]),
    datasets: [{
      label: 'Percentage of Total Handle',
      data: topItems.map((item: any) => (item.total_handle / totalHandle) * 100),
      backgroundColor: colorSet[settingsStore.currentGroup],
    }]
  };
});

const handleClickMarketType = async (group: GroupType) => {
  settingsStore.setCurrentGroup(group);
}

onMounted(async () => {
  totalHandleDataByGroup['stat_type'] = await fetchData({
    groupType: 'stat_type',
    startDateTime: settingsStore.startDateTime,
    endDateTime: settingsStore.endDateTime,
  });
});

watch(() => [
  settingsStore.startDateTime,
  settingsStore.endDateTime,
  settingsStore.selectedTimeSpan,
  settingsStore.selectedCurrency,
  settingsStore.currentGroup,
], async () => {
  totalHandleDataByGroup[settingsStore.currentGroup] = await fetchData({
    groupType: settingsStore.currentGroup,
    startDateTime: settingsStore.startDateTime,
    endDateTime: settingsStore.endDateTime,
  });
});

async function fetchData({ groupType, startDateTime, endDateTime }: { groupType: GroupType, startDateTime?: Date, endDateTime?: Date }) {
  try {

    const url = new URL(`http://localhost:3000/api/analytics/handle_by_${groupType}`);
    if (startDateTime) url.searchParams.append('startDateTime', dayjs(startDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    if (endDateTime) url.searchParams.append('endDateTime', dayjs(endDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));

    const response = await fetch(url.href);
    const data = await response.json();
    return data.filter((item: any) => item.currency === settingsStore.selectedCurrency);
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
</script>

<template>
  <div>
    <div class="flex items-center gap-12 mb-8">
      <h3 class="text-lg">Market</h3>
      <div class="flex gap-4">
        <Button :key="group" v-for="group in groups" severity="info" :outlined="settingsStore.currentGroup !== group"
          :onclick="async () => handleClickMarketType(group)" :label="groupTitleMap[group]" />
      </div>
    </div>
    <h3>{{ `TOP 10 ${settingsStore.currentGroupTitle} Betting Performance` }}</h3>
  </div>

  <div class="flex flex-col lg:flex-row gap-12 lg:gap-4">
    <div class="h-[450px] lg:w-3/4">
      <HandleGroupByBarChart :chartData="barChartData" />
    </div>
    <div class="h-[450px] lg:w-1/4">
      <HandleGroupByPieChart :chartData="pieChartData" />
    </div>
  </div>
</template>