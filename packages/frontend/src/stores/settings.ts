import { ref } from "vue";
import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
  const minDateTime = ref();
  const maxDateTime = ref();
  const startDateTime = ref();
  const endDateTime = ref();

  const setMinDateTime = (date: Date) => (minDateTime.value = date);
  const setMaxDateTime = (date: Date) => (maxDateTime.value = date);
  const setStartDateTime = (date: Date) => (startDateTime.value = date);
  const setEndDateTime = (date: Date) => (endDateTime.value = date);

  const fillMinMaxDateTimeRange = (startDateTime: Date, endDateTime: Date) => {
    setMinDateTime(startDateTime);
    setMaxDateTime(endDateTime);
  };

  return {
    minDateTime,
    maxDateTime,
    startDateTime,
    endDateTime,
    setMinDateTime,
    setMaxDateTime,
    setStartDateTime,
    setEndDateTime,
    fillMinMaxDateTimeRange,
  };
});
