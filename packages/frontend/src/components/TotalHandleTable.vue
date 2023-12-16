<template>
  <DataTable :value="bets">
    <Column field="type" header="Type"></Column>
    <Column field="total" header="Total"></Column>
  </DataTable>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const bets = [{ type: 'single', total: 1000 }]
</script>