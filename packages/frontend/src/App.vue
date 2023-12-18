<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import Menubar from 'primevue/menubar';
import { ref } from "vue";
import Toast from 'primevue/toast';

const router = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => {
      router.push('/');
    }
  },
]);

</script>

<template>
  <header>
    <Toast />
    <div class="flex h-12">
      <Menubar :model="items" class="w-full justify-between">
        <template #start>
          <h1 class="pl-4 font-bold">🏀 NBA Game Bet Transaction Analytics Dashboard</h1>
        </template>
      </Menubar>
    </div>
  </header>

  <RouterView />
</template>