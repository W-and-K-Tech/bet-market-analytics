<template>
  <div>
    <div class="h-[520px] w-full flex px-12">
      <div class="w-2/3 h-[520px]">
        <TotalHandleChart :chartData="chartData" />
      </div>
      <div class="w-1/3">
        <TotalHandleTable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChartData } from "chart.js";
import TotalHandleChart from "../components/TotalHandleChart.vue";
import TotalHandleTable from "../components/TotalHandleTable.vue";
import { onMounted, ref, watch } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { CurrencyType, TimeSpanOptions } from "@/utils/types";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const chartData = ref<ChartData | null>(null);
const settingStore = useSettingsStore();

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
  try {
    const url = new URL("http://localhost:3000/api/analytics/total-handle");
    url.searchParams.append('groupBy', groupBy);
    if (betType) url.searchParams.append('betType', betType);
    if (startDateTime) url.searchParams.append('startDateTime', dayjs(startDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    if (endDateTime) url.searchParams.append('endDateTime', dayjs(endDateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    const response = await fetch(url.href);
    const data = await response.json() as Array<any>;
    return data.filter((item) => item.currency === currency);
  } catch (error) {
    console.error('Error fetching data:', error);
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
  settingStore.startDateTime,
  settingStore.endDateTime,
  settingStore.selectedTimeSpan,
  settingStore.selectedCurrency
], () => {
  fetchChartData({
    groupBy: settingStore.selectedTimeSpan,
    startDateTime: settingStore.startDateTime,
    endDateTime: settingStore.endDateTime,
    currency: settingStore.selectedCurrency,
  });
});

onMounted(async () => {
  const [startDateTime, endDateTime] = await fetchChartData({ groupBy: settingStore.selectedTimeSpan, currency: settingStore.selectedCurrency })
  settingStore.fillMinMaxDateTimeRange(startDateTime.toDate(), endDateTime.toDate());
});
</script>