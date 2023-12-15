<template>
  <h2>TOP 10 Betting Markets</h2>
  <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, type ChartData } from 'chart.js';
import numeral from 'numeral';
import { generateColors } from '../utils/index.ts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = ref<ChartData | null>(null);
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    tooltip: {
      callbacks: {
        label: function ({ raw }) {
          return numeral(raw).format('$0,0.00');
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value) {
          return numeral(value).format('$0,0');
        }
      }
    }
  },
};

const fetchChartData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/analytics/handle-by-stat-type');
    const data = await response.json();

    chartData.value = {
      labels: data.map((item: any) => item.stat_type).slice(0, 10),
      datasets: [{
        label: 'Total Bet Handle',
        data: data.map((item: any) => item.total_handle).slice(0, 10),
        backgroundColor: generateColors(data.length),
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
