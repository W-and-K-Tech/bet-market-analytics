<template>
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
import { Line } from 'vue-chartjs'
import numeral from 'numeral';
import { format, startOfDay, isEqual } from 'date-fns';
import 'chartjs-adapter-date-fns';
import { TimeSpanOptions } from '@/utils/types';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ref } from 'vue';

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

const { chartData } = defineProps<{ chartData: ChartData | null }>();

const chartRef = ref<ChartJS | null>(null);

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  elements: {
    line: {
      tension: 0.2,
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
</script>