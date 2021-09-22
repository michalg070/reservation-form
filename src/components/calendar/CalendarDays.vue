<template>
  <div class="calendar__days">
    <CalendarDaysItem
      v-for="day in days"
      :day="day"
      :currentSelectedRange="currentSelectedRange"
      :currentHoverDay="currentHoverDay"
      :key="day.date"
      @dayClicked="handleDayClick"
      @dayHovered="handleDayHover"
      @dayLeaved="currentHoverDay = null"
    />
  </div>
</template>

<script>
  import CalendarDaysItem from "@/components/calendar/CalendarDaysItem.vue";

  import dayjs from "dayjs";
  import weekday from "dayjs/plugin/weekday";
  import isBetween from "dayjs/plugin/isBetween";

  dayjs.extend(weekday);
  dayjs.extend(isBetween);

  export default {
    props: {
      currentDate: {
        type: Object,
      },
      disabledDates: {
        type: Array,
      },
      selectedRange: {
        type: Object,
      },
    },

    components: {
      CalendarDaysItem,
    },

    data() {
      return {
        currentSelectedRange: {...this.selectedRange},
        currentHoverDay: null,
      };
    },

    computed: {
      days() {
        return [...this.daysInPreviousMonth, ...this.daysInCurrentMonth, ...this.daysInNextMonth];
      },

      daysInCurrentMonth() {
        return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
          const date = dayjs(`${this.selectedYear}-${this.selectedMonth}-${index + 1}`).format(
            "YYYY-MM-DD"
          );
          const isDateIsBetweenStartAndEnd = this.checkIfDateIsBetweenStartAndEnd(date);

          return {
            date: date,
            isDisabled: this.checkIfDateIsDisabled(date),
            isSelected:
              date === this.currentSelectedRange?.start || date === this.currentSelectedRange?.end,
            isToday: date === dayjs().format("YYYY-MM-DD"),
            isInRange: isDateIsBetweenStartAndEnd && this.currentSelectedRange.start,
            isHoverable:
              isDateIsBetweenStartAndEnd ||
              (this.currentSelectedRange.start && this.currentSelectedRange.end) ||
              (!this.currentSelectedRange.start && !this.currentSelectedRange.end),
          };
        });
      },

      daysInNextMonth() {
        return [...Array(this.visibleNumberOfDaysFromNextMonth)].map((day, index) => {
          const date = dayjs(
            `${this.nextMonth.year()}-${this.nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY-MM-DD");

          return {
            date: date,
            isDisabled: true,
          };
        });
      },

      daysInPreviousMonth() {
        return [...Array(this.visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
          const date = dayjs(
            `${this.previousMonth.year()}-${this.previousMonth.month() + 1}-${this
              .firstVisibleDayOfPreviousMonth + index}`
          ).format("YYYY-MM-DD");

          return {
            date: date,
            isDisabled: true,
          };
        });
      },

      firstVisibleDayOfPreviousMonth() {
        return dayjs(this.daysInCurrentMonth[0].date)
          .subtract(this.visibleNumberOfDaysFromPreviousMonth, "day")
          .date();
      },

      isRangeModeOn() {
        return this.currentSelectedRange?.start && !this.currentSelectedRange?.end;
      },

      nextMonth() {
        return dayjs(`${this.selectedYear}-${this.selectedMonth}-01`).add(1, "month");
      },

      numberOfDaysInMonth() {
        return dayjs(this.currentDate).daysInMonth();
      },

      previousMonth() {
        return dayjs(`${this.selectedYear}-${this.selectedMonth}-01`).subtract(1, "month");
      },

      selectedMonth() {
        return Number(this.currentDate.format("M"));
      },

      selectedYear() {
        return Number(this.currentDate.format("YYYY"));
      },

      visibleNumberOfDaysFromNextMonth() {
        const lastWeekday = this.getWeekday(
          `${this.selectedYear}-${this.selectedMonth}-${this.daysInCurrentMonth.length}`
        );

        return lastWeekday ? 7 - lastWeekday : lastWeekday;
      },

      visibleNumberOfDaysFromPreviousMonth() {
        const firstWeekday = this.getWeekday(this.daysInCurrentMonth[0].date);

        return firstWeekday ? firstWeekday - 1 : 6;
      },
    },

    methods: {
      checkIfAnyDisbaleDateIsBetweenStartAndEnd(start, end) {
        return this.disabledDates.some((date) => {
          return dayjs(date).isBetween(start, end, null, []);
        });
      },

      checkIfDateIsBetweenStartAndEnd(date) {
        const startDate = this.currentSelectedRange?.start;
        const endDate = this.isRangeModeOn ? this.currentHoverDay : this.currentSelectedRange?.end;

        // when endDate is later than
        // startDate
        if (dayjs(endDate).diff(dayjs(this.currentSelectedRange?.start)) > 0) {
          // if any of disabled dates is between
          // - turn off hover
          if (this.checkIfAnyDisbaleDateIsBetweenStartAndEnd(startDate, endDate)) {
            return false;
          }

          return dayjs(date).isBetween(startDate, endDate, null, []);
        }

        // if any of disabled dates is between
        // - turn off hover
        if (this.checkIfAnyDisbaleDateIsBetweenStartAndEnd(endDate, startDate)) {
          return false;
        }

        // when endDate is earlier than
        // startDate
        return dayjs(date).isBetween(endDate, startDate, null, []);
      },

      checkIfDateIsDisabled(date) {
        return this.disabledDates.includes(date);
      },

      getWeekday(date) {
        return dayjs(date).weekday();
      },

      handleDayClick(day) {
        if (this.currentSelectedRange.start && this.currentSelectedRange.end) {
          this.currentSelectedRange.start = day.date;
          this.currentSelectedRange.end = null;

          return;
        }

        if (this.currentSelectedRange.start && !this.currentSelectedRange.end) {
          this.currentHoverDay = null;

          // if clicked date is earlier than
          // start date - swap them (end = start, start = clicked)
          if (dayjs(day.date).diff(dayjs(this.currentSelectedRange.start)) < 0) {
            this.currentSelectedRange.end = this.currentSelectedRange.start;
            this.currentSelectedRange.start = day.date;

            return;
          }

          this.currentSelectedRange.end = day.date;

          return;
        }

        if (!this.currentSelectedRange.start && !this.currentSelectedRange.end) {
          this.currentSelectedRange.start = day.date;
        }
      },

      handleDayHover(day) {
        this.currentHoverDay = day.date;
      },
    },

    watch: {
      currentSelectedRange: {
        handler(newValue) {
          this.$emit("selectedRangeChanged", newValue);
        },
        deep: true,
      },
    },
  };
</script>
