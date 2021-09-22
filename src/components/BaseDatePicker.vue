<template>
  <div class="base-date-picker">
    <p class="base-date-picker__title">Dates</p>

    <div class="base-date-picker__box">
      <input
        :id="inputNames.CHECK_IN"
        :value="currentSelectedRange.start"
        :class="{'base-date-picker__trigger--active': activeInput === inputNames.CHECK_IN}"
        @click="showCalendar(inputNames.CHECK_IN)"
        class="base-date-picker__trigger"
        placeholder="Check In"
        readonly
      />

      <img
        class="base-date-picker__arrow"
        :src="require('../assets/right-arrow.svg')"
        alt="arrow-icon"
      />

      <input
        :id="inputNames.CHECK_OUT"
        :value="currentSelectedRange.end"
        :class="{'base-date-picker__trigger--active': activeInput === inputNames.CHECK_OUT}"
        @click="showCalendar(inputNames.CHECK_OUT)"
        class="base-date-picker__trigger"
        placeholder="Check Out"
        readonly
      />

      <transition name="slide-fade">
        <keep-alive>
          <Calendar
            v-if="isCalendarVisible"
            :activeInput="activeInput"
            :disabledDates="disabledDatesParsed"
            :selectedRange="currentSelectedRange"
            @hideCalendar="hideCalendar"
            @selectedRangeChanged="handleSelectedRangeChange"
          />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  import Calendar from "@/components/calendar/Calendar.vue";

  import {formInputNames} from "@/enums/formInputNames.js";
  import dayjs from "dayjs";
  import isBetween from "dayjs/plugin/isBetween";

  dayjs.extend(isBetween);

  export default {
    props: {
      disabledDates: {
        type: Array,
        default: () => {
          return [];
        },
      },
      selectedRange: {
        type: Object,
      },
    },

    components: {
      Calendar,
    },

    data() {
      return {
        activeInput: null,
        disabledDatesParsed: [],
        isCalendarVisible: false,
        inputNames: formInputNames,
        currentSelectedRange: {
          start: this.selectedRange?.start || null,
          end: this.selectedRange?.end || null,
        },
      };
    },

    methods: {
      checkIfAnyDisbaleDateIsBetweenStartAndEnd() {
        if (!this.currentSelectedRange.start || !this.currentSelectedRange.end) {
          console.log("dsass");
          return false;
        }

        return this.disabledDatesParsed.some((date) => {
          return dayjs(date).isBetween(
            this.currentSelectedRange.start,
            this.currentSelectedRange.end,
            null,
            []
          );
        });
      },

      clearActiveInput() {
        this.activeInput = null;
      },

      handleSelectedRangeChange(selectedRange) {
        this.currentSelectedRange.start = selectedRange.start;
        this.currentSelectedRange.end = selectedRange.end;
      },

      hideCalendar() {
        this.isCalendarVisible = false;
        this.activeInput = null;
      },

      showCalendar(activeInput) {
        this.isCalendarVisible = true;
        this.activeInput = activeInput;
      },

      parseDatesIfNecessary() {
        // parse selected range
        if (this.selectedRange?.start instanceof Date) {
          this.currentSelectedRange.start = dayjs(this.selectedRange?.start).format("YYYY-MM-DD");
        }

        if (this.selectedRange?.end instanceof Date) {
          this.currentSelectedRange.end = dayjs(this.selectedRange?.end).format("YYYY-MM-DD");
        }

        // parse disabled dates
        const disabledDatesParsed = [];

        if (!this.disabledDates || !this.disabledDates.length) {
          return disabledDatesParsed;
        }

        this.disabledDates.forEach((date) => {
          if (date instanceof Date) {
            disabledDatesParsed.push(dayjs(date).format("YYYY-MM-DD"));
          } else {
            disabledDatesParsed.push(date);
          }
        });

        this.disabledDatesParsed = disabledDatesParsed;
      },
    },

    mounted() {
      this.parseDatesIfNecessary();

      // check if any disable date
      // is in passed selectedRange props
      if (this.checkIfAnyDisbaleDateIsBetweenStartAndEnd()) {
        this.currentSelectedRange.start = null;
        this.currentSelectedRange.end = null;

        window.alert(
          "Passed range is invalid - disable date is in current range. Please pass valid range."
        );
      }
    },
  };
</script>
