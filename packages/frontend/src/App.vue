<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import Menubar from 'primevue/menubar';
import { ref } from "vue";

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

    <div class="flex h-12">
      <Menubar :model="items" class="w-full justify-between">
        <template #start>
          <h1 class="pl-4 font-bold"><i class="pi pi-globe mr-2"></i>NBA Game Bet Transaction Analytics Dashboard</h1>
        </template>
      </Menubar>
    </div>
  </header>

  <RouterView />
</template>