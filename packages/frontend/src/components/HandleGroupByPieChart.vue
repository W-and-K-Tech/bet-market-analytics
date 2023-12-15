<template>
  <h2>TOP 10 Betting Markets</h2>
  <Pie v-if="chartData" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from 'chart.js';
import { generateColors } from '../utils/index.ts';
import type { GroupType } from '@/utils/types';

ChartJS.register(ArcElement, Tooltip, Legend);

const { groupType } = defineProps<{ groupType: GroupType }>();

const chartData = ref<ChartData | null>(null);
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

const fetchChartData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/analytics/handle_by_${groupType}`);
    const data = await response.json();

    // Sort data by total_handle in descending order
    data.sort((a, b) => b.total_handle - a.total_handle);

    // Take the top 10 items
    const topItems = data.slice(0, 10);

    // Aggregate the rest
    const otherTotalHandle = data.slice(10).reduce((acc, item) => acc + item.total_handle, 0);

    // Add 'Other' category if there are more than 10 items
    if (data.length > 10) {
      topItems.push({
        [groupType]: 'Other',
        total_handle: otherTotalHandle
      });
    }

    const totalHandle = data.reduce((acc: number, item: any) => acc + item.total_handle, 0);
    const backgroundColors = generateColors(topItems.length);

    chartData.value = {
      labels: topItems.map((item: any) => item[groupType]),
      datasets: [{
        label: 'Percentage of Total Handle',
        data: topItems.map((item: any) => (item.total_handle / totalHandle) * 100),
        backgroundColor: backgroundColors
      }]
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchChartData);
</script>

<style scoped>
/* Add styles here if necessary */
</style>
