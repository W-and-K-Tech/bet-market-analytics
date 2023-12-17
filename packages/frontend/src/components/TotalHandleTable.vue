<template>
  <DataTable :value="bets">
    <Column field="type" header="Type"></Column>
    <Column field="total" header="Total"></Column>
  </DataTable>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { computed, ref, toRefs } from 'vue';
import numeral from 'numeral';

const props = defineProps<{
  totalHandle: number;
  totalSingleBet: number;
  totalMultiBet: number;
  currencySign: string;
}>();

const { totalHandle, totalSingleBet, totalMultiBet, currencySign } = toRefs(props);

const formattedTotalHandle = computed(() => `${currencySign.value}${numeral(totalHandle.value).format("0,0.00")}`);
const formattedTotalSingleBet = computed(() => `${currencySign.value}${numeral(totalSingleBet.value).format("0,0.00")}`);
const formattedTotalMultiBet = computed(() => `${currencySign.value}${numeral(totalMultiBet.value).format("0,0.00")}`);

const bets = ref([
  { type: 'Total Handle', total: formattedTotalHandle },
  { type: 'Total Single Bet', total: formattedTotalSingleBet },
  { type: 'Total Multi Bet', total: formattedTotalMultiBet },
]);
</script>