<template>
  <div
    class="calendar__days__item"
    :class="{
      'calendar__days__item--disabled': day.isDisabled,
      'calendar__days__item--today': day.isToday,
      'calendar__days__item--selected': day.isSelected,
      'calendar__days__item--inRange': day.isInRange,
      'calendar__days__item--hoverable': day.isHoverable,
      'calendar__days__item--firstInRange': isFirstInRange,
      'calendar__days__item--lastInRange': isLastInRange,
    }"
    @click="dayClicked"
    @mouseover="dayHovered"
    @mouseleave="dayLeaved"
  >
    <span class="calendar__days__item__content">
      {{ dayNumber }}
    </span>
  </div>
</template>

<script>
  import dayjs from "dayjs";

  export default {
    props: {
      day: {
        type: Object,
      },
      currentHoverDay: {
        type: String,
      },
      currentSelectedRange: {
        type: Object,
      },
    },

    computed: {
      dayNumber() {
        return dayjs(this.day.date).format("D");
      },

      isFirstInRange() {
        if (!this.day.isInRange) {
          return false;
        }

        // when range select is complete
        if (this.currentSelectedRange.start && this.currentSelectedRange.end) {
          return this.day.date === this.currentSelectedRange.start;
        }

        // when current day
        // is equal start range
        // and current hover is later
        // then current day
        if (
          this.day.date === this.currentSelectedRange.start &&
          dayjs(this.currentHoverDay).diff(dayjs(this.currentSelectedRange.start)) > 0
        ) {
          return true;
        }

        // when current day
        // is equal to currentHoverDay,
        // and it is erlier than start range
        if (
          this.day.date === this.currentHoverDay &&
          dayjs(this.currentHoverDay).diff(dayjs(this.currentSelectedRange.start)) < 0
        ) {
          return true;
        }

        return false;
      },

      isLastInRange() {
        if (!this.day.isInRange) {
          return false;
        }

        // when range select is complete
        if (this.currentSelectedRange.start && this.currentSelectedRange.end) {
          return this.day.date === this.currentSelectedRange.end;
        }

        // when current day
        // is equal start range
        // and current hover is earlier
        // then current day
        if (
          this.day.date === this.currentSelectedRange.start &&
          dayjs(this.currentHoverDay).diff(dayjs(this.currentSelectedRange.start)) < 0
        ) {
          return true;
        }

        // when current day
        // is equal to currentHoverDay,
        // and it is later than start range
        if (
          this.day.date === this.currentHoverDay &&
          dayjs(this.currentHoverDay).diff(dayjs(this.currentSelectedRange.start)) > 0
        ) {
          return true;
        }

        return false;
      },
    },

    methods: {
      dayClicked() {
        if (!this.day.isHoverable) {
          return;
        }

        this.$emit("dayClicked", this.day);
      },

      dayHovered() {
        this.$emit("dayHovered", this.day);
      },

      dayLeaved() {
        this.$emit("dayLeaved");
      },
    },
  };
</script>
