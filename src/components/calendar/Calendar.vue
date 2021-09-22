<template>
  <div v-click-outside="hideCalendar" id="calendar" class="calendar">
    <img
      class="calendar__triangle"
      :class="{
        'calendar__triangle--right': activeInput === inputNames.CHECK_OUT,
      }"
      :src="require('../../assets/triangle.svg')"
      alt="triangle-icon"
    />

    <div class="calendar__wrapper">
      <CalendarHeader :currentDate="currentDate" @monthChanged="handleMonthChange" />

      <div class="calendar__body">
        <CalendarWeekdays />

        <CalendarDays
          :currentDate="currentDate"
          :selectedRange="selectedRange"
          :disabledDates="disabledDates"
          @selectedRangeChanged="$emit('selectedRangeChanged', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import CalendarHeader from "@/components/calendar/CalendarHeader.vue";
  import CalendarWeekdays from "@/components/calendar/CalendarWeekdays.vue";
  import CalendarDays from "@/components/calendar/CalendarDays.vue";

  import dayjs from "dayjs";
  import weekday from "dayjs/plugin/weekday";
  import ClickOutside from "vue-click-outside";

  import {formInputNames} from "@/enums/formInputNames.js";

  dayjs.extend(weekday);

  export default {
    props: {
      activeInput: {
        type: String,
      },
      disabledDates: {
        type: Array,
      },
      selectedRange: {
        type: Object,
      },
    },

    components: {
      CalendarDays,
      CalendarHeader,
      CalendarWeekdays,
    },

    directives: {
      ClickOutside,
    },

    data() {
      return {
        currentDate: dayjs(),
      };
    },

    computed: {
      inputNames() {
        return formInputNames;
      },
    },

    methods: {
      handleMonthChange(newDate) {
        this.currentDate = newDate;
      },

      hideCalendar(event) {
        if (
          event.target.id === formInputNames.CHECK_IN ||
          event.target.id === formInputNames.CHECK_OUT
        ) {
          return;
        }

        this.$emit("hideCalendar");
      },
    },
  };
</script>
