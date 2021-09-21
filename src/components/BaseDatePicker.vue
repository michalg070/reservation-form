<template>
  <div class="base-date-picker">
    <p class="base-date-picker__title">Dates</p>

    <div class="base-date-picker__box">
      <input
        :id="inputNames.CHECK_IN"
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
            @hideCalendar="hideCalendar"
          />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  import Calendar from "@/components/calendar/Calendar.vue";

  import {formInputNames} from "@/enums/formInputNames.js";

  export default {
    components: {
      Calendar,
    },

    data() {
      return {
        activeInput: null,
        inputNames: formInputNames,
        isCalendarVisible: false,
      };
    },

    methods: {
      clearActiveInput() {
        this.activeInput = null;
      },

      hideCalendar() {
        this.isCalendarVisible = false;
        this.activeInput = null;
      },

      showCalendar(activeInput) {
        this.isCalendarVisible = true;
        this.activeInput = activeInput;
      },
    },
  };
</script>
