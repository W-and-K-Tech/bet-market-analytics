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
  {
    label: 'About',
    icon: 'pi pi-fw pi-flag',
    command: () => {
      router.push('/about');
    }
  },
]);

</script>

<template>
  <header>

    <div class="flex h-12">
      <Menubar :model="items" class="w-full">
        <template #start>
          <h1 class="font-bold">NBA Game Bet Transaction Analytics Dashboard</h1>
        </template>
      </Menubar>
    </div>
  </header>

  <RouterView />
</template>