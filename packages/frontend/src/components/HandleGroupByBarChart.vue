<template>
  <h2>TOP 10 Betting Markets</h2>
  <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, type ChartData } from 'chart.js';
import numeral from 'numeral';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { chartData } = defineProps<{ chartData: ChartData | null }>();

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
</script>