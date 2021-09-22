<template>
  <div class="calendar__header">
    <img
      @click="changeMonth('previous')"
      class="calendar__header__arrow calendar__header__arrow--left"
      :src="require('../../assets/right-arrow-calendar.svg')"
      alt="previous-month-icon"
    />

    <p class="calendar__header__text">
      {{ selectedMonth }}
    </p>

    <img
      @click="changeMonth('next')"
      class="calendar__header__arrow"
      :src="require('../../assets/right-arrow-calendar.svg')"
      alt="next-month-icon"
    />
  </div>
</template>

<script>
  import dayjs from "dayjs";

  export default {
    props: {
      currentDate: {
        type: Object,
      },
    },

    computed: {
      selectedMonth() {
        return this.currentDate.format("MMMM YYYY");
      },
    },

    methods: {
      changeMonth(changeDirection) {
        const dateAfterChange =
          changeDirection === "previous"
            ? dayjs(this.currentDate).subtract(1, "month")
            : dayjs(this.currentDate).add(1, "month");

        this.$emit("monthChanged", dateAfterChange);
      },
    },
  };
</script>
