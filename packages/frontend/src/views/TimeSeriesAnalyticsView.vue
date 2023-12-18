<template>
  <template v-if="isLoading">
    <Skeleton borderRadius="16px" width="30rem" height="3rem" class="mb-4"></Skeleton>
    <Skeleton borderRadius="16px" width="40rem" height="24rem" class="mb-2"></Skeleton>
  </template>
  <template v-else>
    <div class="w-full flex flex-wrap flex-col lg:flex-row gap-16 lg:gap-4">
      <div class="lg:w-2/3 h-[450px]">
        <TotalHandleChart :chartData="chartData" :selectedTimeSpan="settingsStore.selectedTimeSpan"
          :currencySign="settingsStore.selectedCurrencySign"
          @onChangeTimeSpan="(value: TimeSpanOptions) => settingsStore.setSelectedTimeSpan(value)" />
      </div>
      <div class="lg:w-1/3">
        <TotalHandleTable :totalHandle="totalHandle" :totalSingleBet="totalSingleBet" :totalMultiBet="totalMultiBet"
          :currencySign="settingsStore.selectedCurrencySign" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { ChartData } from "chart.js";
import Skeleton from 'primevue/skeleton';
import TotalHandleChart from "../components/TotalHandleChart.vue";
import TotalHandleTable from "../components/TotalHandleTable.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { CurrencyType, TimeSpanOptions } from "@/utils/types";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { useToast } from "primevue/usetoast";
dayjs.extend(utc);

const toast = useToast();

const isLoading = ref(false);

const chartData = ref<ChartData | null>(null);
const settingsStore = useSettingsStore();

const totalHandle = computed(() => {
  if (chartData.value === null) return 0;
  return chartData.value.datasets?.[2].data.reduce((acc, item) => acc + item, 0) ?? 0;
});

const totalMultiBet = computed(() => {
  if (chartData.value === null) return 0;
  return chartData.value.datasets?.[1].data.reduce((acc, item) => acc + item, 0) ?? 0;
});

const totalSingleBet = computed(() => {
  if (chartData.value === null) return 0;
  return chartData.value.datasets?.[0].data.reduce((acc, item) => acc + item, 0) ?? 0;
});

interface RequestType {
  groupBy?: TimeSpanOptions,
  betType?: 'single' | 'multi',
  startDateTime?: Date,
  endDateTime?: Date,
  currency: CurrencyType,
}

const loadData = async ({
  groupBy = TimeSpanOptions.Hourly,
  betType,
  startDateTime,
  endDateTime,
  currency,
}: RequestType) => {
  isLoading.value = true;
  try {
    const url = new URL(`${import.meta.env.VITE_BACKEND_BASEURL}/api/analytics/total-handle`);
    url.searchParams.append('groupBy', groupBy);
    if (betType) url.searchParams.append('betType', betType);
    if (startDateTime) url.searchParams.append('startDateTime', dayjs(startDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    if (endDateTime) url.searchParams.append('endDateTime', dayjs(endDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    const response = await fetch(url.href);
    const data = await response.json() as Array<any>;
    isLoading.value = false;
    return data.filter((item) => item.currency === currency);
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Cannot get data. Please refresh the page and try again.', });
    return null;
  }
}

const fetchChartData = async ({
  groupBy = TimeSpanOptions.Hourly,
  betType,
  startDateTime,
  endDateTime,
  currency,
}: RequestType) => {
  const totalHandleByHour = await loadData({ groupBy, betType, startDateTime, endDateTime, currency });
  const totalSingleBetByHour = await loadData({ groupBy, betType: 'single', startDateTime, endDateTime, currency });
  const totalMultiBetByHour = await loadData({ groupBy, betType: 'multi', startDateTime, endDateTime, currency });
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

watch(() => [
  settingsStore.startDateTime,
  settingsStore.endDateTime,
  settingsStore.selectedTimeSpan,
  settingsStore.selectedCurrency
], () => {
  fetchChartData({
    groupBy: settingsStore.selectedTimeSpan,
    startDateTime: settingsStore.startDateTime,
    endDateTime: settingsStore.endDateTime,
    currency: settingsStore.selectedCurrency,
  });
});

onMounted(async () => {
  const [startDateTime, endDateTime] = await fetchChartData({ groupBy: settingsStore.selectedTimeSpan, currency: settingsStore.selectedCurrency })
  settingsStore.fillMinMaxDateTimeRange(startDateTime.toDate(), endDateTime.toDate());
});
</script>