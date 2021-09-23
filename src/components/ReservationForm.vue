<template>
  <form class="reservation-form" @submit.prevent="handleSubmit">
    <div class="reservation-form__wrapper">
      <header class="reservation-form__header">
        <h5 class="reservation-form__header__price">{{ price }} zł</h5>

        <div class="reservation-form__header__reviews">
          <BaseRating :rating="rating" />

          <span class="reservation-form__header__count">{{ reviews }}</span>
        </div>
      </header>

      <BaseDatesPicker
        :disabledDates="disabledDates"
        :selectedRange="selectedRange"
        @selectedRangeChanged="formValues.range = {...$event}"
      />

      <button :disabled="isSubmitDisabled" class="reservation-form__submit">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
  import BaseDatesPicker from "@/components/BaseDatesPicker.vue";
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
      BaseDatesPicker,
      BaseRating,
    },

    data() {
      return {
        formValues: {
          range: {},
        },
      };
    },

    computed: {
      isSubmitDisabled() {
        return !this.formValues.range || !this.formValues.range.start || !this.formValues.range.end;
      },
    },

    methods: {
      handleSubmit() {
        if (this.isSubmitDisabled) {
          return;
        }

        window.alert(
          "Your reservation date is: " +
            this.formValues.range.start +
            " - " +
            this.formValues.range.end +
            ". Have a nice trip!"
        );
      },
    },
  };
</script>
