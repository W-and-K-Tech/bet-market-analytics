<template>
  <h2>{{ title }}</h2>
  <Pie v-if="chartData" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const { title, chartData } = defineProps<{ title: string; chartData: ChartData | null }>();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

</script>
