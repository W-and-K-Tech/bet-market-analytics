<template>
  <h2>{{ title }}</h2>
  <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, type ChartData } from 'chart.js';
import numeral from 'numeral';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { title, chartData, currencySign } = defineProps<{ title?: string; chartData: ChartData | null; currencySign: string; }>();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    tooltip: {
      callbacks: {
        label: function ({ raw }) {
          return `${currencySign}${numeral(raw).format('0,0')}`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        // Include a currency sign in the ticks
        callback: function (value) {
          return `${currencySign}${numeral(value).format('0,0')}`;
        }
      }
    }
  },
};
</script>