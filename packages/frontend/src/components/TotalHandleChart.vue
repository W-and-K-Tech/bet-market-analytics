<template>
  <Line v-if="chartData" :data="chartData" :options="options" />
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { onMounted, ref } from 'vue';
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const loadData = async (groupBy = 'hour') => {
  try {
    const response = await fetch(`http://localhost:3000/api/analytics/total-handle?groupBy=${groupBy}`);
    const data = await response.json();
    chartData.value = {
      labels: data.map(item => groupBy === 'hour' ? item.bet_time : item.bet_date),
      datasets: [
        {
          label: `Total Handle (${groupBy})`,
          data: data.map(item => item.total_handle),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

const chartData = ref(null);

onMounted(() => loadData());
</script>
