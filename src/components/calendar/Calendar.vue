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
    </div>
  </div>
</template>

<script>
  import CalendarHeader from "@/components/calendar/CalendarHeader.vue";

  import ClickOutside from "vue-click-outside";

  import dayjs from "dayjs";
  import weekday from "dayjs/plugin/weekday";
  import {formInputNames} from "@/enums/formInputNames.js";

  dayjs.extend(weekday);

  export default {
    props: {
      activeInput: {
        type: String,
      },
    },

    components: {
      CalendarHeader,
    },

    data() {
      return {
        currentDate: dayjs(),
      };
    },

    directives: {
      ClickOutside,
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
