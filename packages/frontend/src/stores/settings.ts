import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { set } from "date-fns";

export const useSettingsStore = defineStore("settings", () => {
  const minDateTime = ref();
  const maxDateTime = ref();
  const startDateTime = ref();
  const endDateTime = ref();

  const setMinDateTime = (date: Date) => (minDateTime.value = date);
  const setMaxDateTime = (date: Date) => (maxDateTime.value = date);
  const setStartDateTime = (date: Date) => (startDateTime.value = date);
  const setEndDateTime = (date: Date) => (endDateTime.value = date);

  const isAllDateTimeFilled = computed(
    () =>
      !!minDateTime.value &&
      !!maxDateTime.value &&
      !!startDateTime.value &&
      !!endDateTime.value
  );

  const fillInitialDateTimeRange = (startDateTime: Date, endDateTime: Date) => {
    setMinDateTime(startDateTime);
    setStartDateTime(startDateTime);
    setMaxDateTime(endDateTime);
    setEndDateTime(endDateTime);
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
    isAllDateTimeFilled,
    fillInitialDateTimeRange,
  };
});
