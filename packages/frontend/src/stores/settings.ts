import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  CurrencyType,
  TimeSpanOptions,
  currencySignMap,
  type GroupType,
  groupTitleMap,
} from "@/utils/types";

export const useSettingsStore = defineStore("settings", () => {
  const minDateTime = ref();
  const maxDateTime = ref();
  const startDateTime = ref();
  const endDateTime = ref();

  const setMinDateTime = (date: Date) => (minDateTime.value = date);
  const setMaxDateTime = (date: Date) => (maxDateTime.value = date);
  const setStartDateTime = (date: Date) => (startDateTime.value = date);
  const setEndDateTime = (date: Date) => (endDateTime.value = date);

  const selectedTimeSpan = ref(TimeSpanOptions.Hourly);
  const setSelectedTimeSpan = (option: TimeSpanOptions) =>
    (selectedTimeSpan.value = option);

  const selectedCurrency = ref(CurrencyType.USD);
  const selectedCurrencySign = computed(
    () => currencySignMap[selectedCurrency.value]
  );
  const setSelectedCurrency = (currency: CurrencyType) =>
    (selectedCurrency.value = currency);

  const currentGroup = ref<GroupType>("stat_type");
  const currentGroupTitle = computed<string>(
    () => groupTitleMap[currentGroup.value]
  );
  const setCurrentGroup = (group: GroupType) => (currentGroup.value = group);

  const fillMinMaxDateTimeRange = (startDateTime: Date, endDateTime: Date) => {
    setMinDateTime(startDateTime);
    setMaxDateTime(endDateTime);
  };

  return {
    minDateTime,
    maxDateTime,
    startDateTime,
    endDateTime,
    selectedTimeSpan,
    selectedCurrency,
    selectedCurrencySign,
    currentGroupTitle,
    currentGroup,
    setCurrentGroup,
    setMinDateTime,
    setMaxDateTime,
    setStartDateTime,
    setEndDateTime,
    setSelectedTimeSpan,
    setSelectedCurrency,
    fillMinMaxDateTimeRange,
  };
});
