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

const loadData = async (groupBy = 'hour', betType?: 'single' | 'multi') => {
  try {
    const response = await fetch(`http://localhost:3000/api/analytics/total-handle?groupBy=${groupBy}${betType ? `&betType=${betType}` : ''}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

const chartData = ref(null);

onMounted(async () => {
  const totalHandleByHour = await loadData('hour');
  const totalSingleBetByHour = await loadData('hour', 'single');
  const totalMultiBetByHour = await loadData('hour', 'multi');
  const totalTimeDividends = totalHandleByHour.map(item => item.bet_time);

  chartData.value = {
    labels: totalTimeDividends,
    datasets: [
      {
        label: `Total Handle`,
        data: totalTimeDividends.map(time => {
          const matchingTimeDividend = totalHandleByHour.find((item) => item.bet_time === time);
          if (matchingTimeDividend) {
            return matchingTimeDividend.total_handle;
          } else {
            return 0;
          }
        }),
        backgroundColor: 'rgba(139, 92, 246)',
        borderColor: 'rgba(196, 181, 253)',
        borderWidth: 1
      },
      {
        label: `Total Single Bet`,
        data: totalTimeDividends.map(time => {
          const matchingTimeDividend = totalSingleBetByHour.find((item) => item.bet_time === time);
          if (matchingTimeDividend) {
            return matchingTimeDividend.total_handle;
          } else {
            return 0;
          }
        }),
        backgroundColor: 'rgba(16, 185, 129)',
        borderColor: 'rgba(167, 243, 208)',
        borderWidth: 1
      },
      {
        label: `Total Multi-Bet`,
        data: totalTimeDividends.map(time => {
          const matchingTimeDividend = totalMultiBetByHour.find((item) => item.bet_time === time);
          if (matchingTimeDividend) {
            return matchingTimeDividend.total_handle;
          } else {
            return 0;
          }
        }),
        backgroundColor: 'rgba(245, 158, 11)',
        borderColor: 'rgba(253, 230, 138)',
        borderWidth: 1
      },
    ]
  };
});
</script>
