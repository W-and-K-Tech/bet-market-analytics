<template>
  <h2>Total Handle Through Time</h2>
  <Button text label="reset" :onclick="() => chartRef?.chart.resetZoom()" />
  <Line ref="chartRef" v-if="chartData" :data="chartData" :options="options" />
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
  Legend,
  TimeScale,
  Filler,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { onMounted, ref, watch } from 'vue';
import { Line } from 'vue-chartjs'
import numeral from 'numeral';
import { format, startOfDay, isEqual } from 'date-fns';
import 'chartjs-adapter-date-fns';
import { useSettingsStore } from '@/stores/settings';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TimeSpanOptions } from '@/utils/types';
import zoomPlugin from 'chartjs-plugin-zoom';
import Button from 'primevue/button';
dayjs.extend(utc);

const chartRef = ref(null);

const settingStore = useSettingsStore();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  Filler,
)

const loadData = async ({
  groupBy = TimeSpanOptions.Hourly,
  betType,
  startDateTime,
  endDateTime,
}: { groupBy: TimeSpanOptions, betType?: 'single' | 'multi', startDateTime?: Date, endDateTime?: Date }) => {
  try {
    const url = new URL("http://localhost:3000/api/analytics/total-handle");
    url.searchParams.append('groupBy', groupBy);
    if (betType) url.searchParams.append('betType', betType);
    if (startDateTime) url.searchParams.append('startDateTime', dayjs(startDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    if (endDateTime) url.searchParams.append('endDateTime', dayjs(endDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  plugins: {
    filler: {
      propagate: false,
    },
    tooltip: {
      callbacks: {
        label: function ({ raw }) {
          return numeral(raw).format('$0,0.00');
        },
      },
    },
    zoom: {
      zoom: {
        drag: {
          enabled: true,
        },
        mode: 'x',
      },
    }
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: TimeSpanOptions.Hourly,
      },
      ticks: {
        callback: (value, index, ticks) => {
          const date = new Date(value);
          const startDate = startOfDay(date);
          if (index === 0 || isEqual(date, startDate)) {
            // Show full date for the first tick and start of each day
            return format(date, 'MMMM d - h a');
          }
          return format(date, 'h a'); // Show only time for other ticks
        }
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value) {
          return numeral(value).format('$0,0');
        }
      }
    }
  }
}

const chartData = ref<ChartData | null>(null);

const fetchChartData = async ({
  groupBy = TimeSpanOptions.Hourly,
  betType,
  startDateTime,
  endDateTime,
}: {
  groupBy?: TimeSpanOptions, betType?: 'single' | 'multi', startDateTime?: Date, endDateTime?: Date
}) => {
  const totalHandleByHour = await loadData({ groupBy, betType, startDateTime, endDateTime });
  const totalSingleBetByHour = await loadData({ groupBy, betType: 'single', startDateTime, endDateTime });
  const totalMultiBetByHour = await loadData({ groupBy, betType: 'multi', startDateTime, endDateTime });
  const totalTimeDividends = totalHandleByHour.map(item => item.bet_time);

  chartData.value = {
    labels: totalTimeDividends.map(item => dayjs.utc(item).toDate()),
    datasets: [
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
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129)',
        borderWidth: 1,
        fill: 'start',
        pointRadius: 2,
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
        backgroundColor: 'rgba(245, 158, 11, 0.4)',
        borderColor: 'rgba(245, 158, 11)',
        borderWidth: 1,
        fill: 'start',
        pointRadius: 2,
      },
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
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246)',
        borderWidth: 1,
        fill: 'start',
        pointRadius: 2,
      },
    ]
  };
  return [dayjs.utc(totalHandleByHour[0].bet_time), dayjs.utc(totalHandleByHour[totalHandleByHour.length - 1].bet_time)];
}

watch(() => [settingStore.startDateTime, settingStore.endDateTime, settingStore.selectedTimeSpan], () => {
  fetchChartData({
    groupBy: settingStore.selectedTimeSpan,
    startDateTime: settingStore.startDateTime,
    endDateTime: settingStore.endDateTime,
  });
});

onMounted(async () => {
  const [startDateTime, endDateTime] = await fetchChartData({ groupBy: settingStore.selectedTimeSpan })
  settingStore.fillMinMaxDateTimeRange(startDateTime.toDate(), endDateTime.toDate());
});
</script>
