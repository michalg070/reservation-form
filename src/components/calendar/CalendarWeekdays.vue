<template>
  <div class="calendar__weekdays">
    <div v-for="weekday in weekdays" class="calendar__weekdays__item" :key="weekday">
      {{ weekday }}
    </div>
  </div>
</template>

<script>
  import {weekdays} from "@/enums/weekdays";

  export default {
    computed: {
      weekdays() {
        return weekdays;
      },
    },
  };
</script>
