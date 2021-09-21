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

    calendar content
  </div>
</template>

<script>
  import ClickOutside from "vue-click-outside";

  import {formInputNames} from "@/enums/formInputNames.js";

  export default {
    props: {
      activeInput: {
        type: String,
      },
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
