<template>
  <form class="reservation-form">
    <div class="reservation-form__wrapper">
      <header class="reservation-form__header">
        <h5 class="reservation-form__header__price">{{ price }} zł</h5>

        <div class="reservation-form__header__reviews">
          <BaseRating :rating="rating" />

          <span class="reservation-form__header__count">{{ reviews }}</span>
        </div>
      </header>

      <BaseDatePicker :disabledDates="disabledDates" :selectedRange="selectedRange" />
    </div>
  </form>
</template>

<script>
  import BaseDatePicker from "@/components/BaseDatePicker.vue";
  import BaseRating from "@/components/BaseRating.vue";

  export default {
    props: {
      disabledDates: {
        type: Array,
      },
      price: {
        type: Number,
      },
      rating: {
        type: Number,
      },
      reviews: {
        type: Number,
      },
      selectedRange: {
        type: Object,
      },
    },

    components: {
      BaseDatePicker,
      BaseRating,
    },
  };
</script>
