import TotalHandleChart from "../components/TotalHandleChart.vue";
import TotalHandleTable from "../components/TotalHandleTable.vue";
import { TimeSpanOptions } from "@/utils/types";
import {
  __VLS_internalComponent,
  __VLS_componentsOption,
  __VLS_name,
  chartData,
  settingsStore,
  totalHandle,
  totalSingleBet,
  totalMultiBet,
} from "./TimeSeriesAnalyticsView.vue";

function __VLS_template() {
  let __VLS_ctx!: InstanceType<
    __VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>
  > & {};
  /* Components */
  let __VLS_otherComponents!: NonNullable<
    typeof __VLS_internalComponent extends { components: infer C } ? C : {}
  > &
    typeof __VLS_componentsOption;
  let __VLS_own!: __VLS_SelfComponent<
    typeof __VLS_name,
    typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots })
  >;
  let __VLS_localComponents!: typeof __VLS_otherComponents &
    Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
  let __VLS_components!: typeof __VLS_localComponents &
    __VLS_GlobalComponents &
    typeof __VLS_ctx;
  /* Style Scoped */
  type __VLS_StyleScopedClasses = {};
  let __VLS_styleScopedClasses!:
    | __VLS_StyleScopedClasses
    | keyof __VLS_StyleScopedClasses
    | (keyof __VLS_StyleScopedClasses)[];
  /* CSS variable injection */
  /* CSS variable injection end */
  let __VLS_resolvedLocalAndGlobalComponents!: {} & __VLS_WithComponent<
    "TotalHandleChart",
    typeof __VLS_localComponents,
    "TotalHandleChart",
    "TotalHandleChart",
    "TotalHandleChart"
  > &
    __VLS_WithComponent<
      "TotalHandleTable",
      typeof __VLS_localComponents,
      "TotalHandleTable",
      "TotalHandleTable",
      "TotalHandleTable"
    >;
  __VLS_intrinsicElements.div;
  __VLS_intrinsicElements.div;
  __VLS_intrinsicElements.div;
  __VLS_intrinsicElements.div;
  __VLS_intrinsicElements.div;
  __VLS_intrinsicElements.div;
  __VLS_intrinsicElements.div;
  __VLS_intrinsicElements.div;
  __VLS_components.TotalHandleChart;
  // @ts-ignore
  [TotalHandleChart];
  __VLS_components.TotalHandleTable;
  // @ts-ignore
  [TotalHandleTable];
  {
    const __VLS_0 = __VLS_intrinsicElements["div"];
    const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
    const __VLS_2 = __VLS_1(
      { ...{} },
      ...__VLS_functionalComponentArgsRest(__VLS_1)
    );
    (
      ({}) as (
        props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> &
          Record<string, unknown>
      ) => void
    )({ ...{} });
    const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
    let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
    {
      const __VLS_5 = __VLS_intrinsicElements["div"];
      const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
      const __VLS_7 = __VLS_6(
        { ...{}, class: "w-full flex flex-col lg:flex-row gap-16 lg:gap-4" },
        ...__VLS_functionalComponentArgsRest(__VLS_6)
      );
      (
        ({}) as (
          props: __VLS_FunctionalComponentProps<
            typeof __VLS_5,
            typeof __VLS_7
          > &
            Record<string, unknown>
        ) => void
      )({ ...{}, class: "w-full flex flex-col lg:flex-row gap-16 lg:gap-4" });
      const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
      let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
      {
        const __VLS_10 = __VLS_intrinsicElements["div"];
        const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
        const __VLS_12 = __VLS_11(
          { ...{}, class: "lg:w-2/3 h-[450px]" },
          ...__VLS_functionalComponentArgsRest(__VLS_11)
        );
        (
          ({}) as (
            props: __VLS_FunctionalComponentProps<
              typeof __VLS_10,
              typeof __VLS_12
            > &
              Record<string, unknown>
          ) => void
        )({ ...{}, class: "lg:w-2/3 h-[450px]" });
        const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
        let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
        {
          const __VLS_15 = (
            {} as "TotalHandleChart" extends keyof typeof __VLS_ctx
              ? { TotalHandleChart: typeof __VLS_ctx.TotalHandleChart }
              : typeof __VLS_resolvedLocalAndGlobalComponents
          ).TotalHandleChart;
          const __VLS_16 = __VLS_asFunctionalComponent(
            __VLS_15,
            new __VLS_15({
              ...{ onOnChangeTimeSpan: {} as any },
              chartData: __VLS_ctx.chartData,
              selectedTimeSpan: __VLS_ctx.settingsStore.selectedTimeSpan,
            })
          );
          (({}) as { TotalHandleChart: typeof __VLS_15 }).TotalHandleChart;
          const __VLS_17 = __VLS_16(
            {
              ...{ onOnChangeTimeSpan: {} as any },
              chartData: __VLS_ctx.chartData,
              selectedTimeSpan: __VLS_ctx.settingsStore.selectedTimeSpan,
            },
            ...__VLS_functionalComponentArgsRest(__VLS_16)
          );
          (
            ({}) as (
              props: __VLS_FunctionalComponentProps<
                typeof __VLS_15,
                typeof __VLS_17
              > &
                Record<string, unknown>
            ) => void
          )({
            ...{ onOnChangeTimeSpan: {} as any },
            chartData: __VLS_ctx.chartData,
            selectedTimeSpan: __VLS_ctx.settingsStore.selectedTimeSpan,
          });
          const __VLS_18 = __VLS_pickFunctionalComponentCtx(
            __VLS_15,
            __VLS_17
          )!;
          let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
          let __VLS_20 = {
            onChangeTimeSpan: __VLS_pickEvent(
              __VLS_19["onChangeTimeSpan"],
              (
                {} as __VLS_FunctionalComponentProps<
                  typeof __VLS_16,
                  typeof __VLS_17
                >
              ).onOnChangeTimeSpan
            ),
          };
          __VLS_20 = {
            onChangeTimeSpan: (value: TimeSpanOptions) =>
              __VLS_ctx.settingsStore.setSelectedTimeSpan(value),
          };
        }
        __VLS_13.slots!.default;
      }
      {
        const __VLS_21 = __VLS_intrinsicElements["div"];
        const __VLS_22 = __VLS_elementAsFunctionalComponent(__VLS_21);
        const __VLS_23 = __VLS_22(
          { ...{}, class: "lg:w-1/3" },
          ...__VLS_functionalComponentArgsRest(__VLS_22)
        );
        (
          ({}) as (
            props: __VLS_FunctionalComponentProps<
              typeof __VLS_21,
              typeof __VLS_23
            > &
              Record<string, unknown>
          ) => void
        )({ ...{}, class: "lg:w-1/3" });
        const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_21, __VLS_23)!;
        let __VLS_25!: __VLS_NormalizeEmits<typeof __VLS_24.emit>;
        {
          const __VLS_26 = (
            {} as "TotalHandleTable" extends keyof typeof __VLS_ctx
              ? { TotalHandleTable: typeof __VLS_ctx.TotalHandleTable }
              : typeof __VLS_resolvedLocalAndGlobalComponents
          ).TotalHandleTable;
          const __VLS_27 = __VLS_asFunctionalComponent(
            __VLS_26,
            new __VLS_26({
              ...{},
              totalHandle: __VLS_ctx.totalHandle,
              totalSingleBet: __VLS_ctx.totalSingleBet,
              totalMultiBet: __VLS_ctx.totalMultiBet,
              currencySign: __VLS_ctx.settingsStore.selectedCurrencySign,
            })
          );
          (({}) as { TotalHandleTable: typeof __VLS_26 }).TotalHandleTable;
          const __VLS_28 = __VLS_27(
            {
              ...{},
              totalHandle: __VLS_ctx.totalHandle,
              totalSingleBet: __VLS_ctx.totalSingleBet,
              totalMultiBet: __VLS_ctx.totalMultiBet,
              currencySign: __VLS_ctx.settingsStore.selectedCurrencySign,
            },
            ...__VLS_functionalComponentArgsRest(__VLS_27)
          );
          (
            ({}) as (
              props: __VLS_FunctionalComponentProps<
                typeof __VLS_26,
                typeof __VLS_28
              > &
                Record<string, unknown>
            ) => void
          )({
            ...{},
            totalHandle: __VLS_ctx.totalHandle,
            totalSingleBet: __VLS_ctx.totalSingleBet,
            totalMultiBet: __VLS_ctx.totalMultiBet,
            currencySign: __VLS_ctx.settingsStore.selectedCurrencySign,
          });
          const __VLS_29 = __VLS_pickFunctionalComponentCtx(
            __VLS_26,
            __VLS_28
          )!;
          let __VLS_30!: __VLS_NormalizeEmits<typeof __VLS_29.emit>;
        }
        __VLS_24.slots!.default;
      }
      __VLS_8.slots!.default;
    }
    __VLS_3.slots!.default;
  }
  if (
    typeof __VLS_styleScopedClasses === "object" &&
    !Array.isArray(__VLS_styleScopedClasses)
  ) {
  }
  var __VLS_slots!: {};
  // @ts-ignore
  [
    chartData,
    settingsStore,
    chartData,
    settingsStore,
    chartData,
    settingsStore,
    settingsStore,
    totalHandle,
    totalSingleBet,
    totalMultiBet,
    settingsStore,
    totalHandle,
    totalSingleBet,
    totalMultiBet,
    settingsStore,
    totalHandle,
    totalSingleBet,
    totalMultiBet,
    settingsStore,
  ];
  return __VLS_slots;
}
