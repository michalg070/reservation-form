<template>
  <main class="main" id="app">
    <div class="main__wrapper">
      <ReservationForm
        :rating="rating"
        :price="price"
        :reviews="reviews"
        :disabledDates="disabledDates"
        :selectedRange="selectedRange"
      />
    </div>
  </main>
</template>

<script>
  import ReservationForm from "./components/ReservationForm.vue";

  export default {
    name: "App",

    components: {
      ReservationForm,
    },

    data() {
      return {
        rating: 1.5,
        price: 232,
        reviews: 234,
        disabledDates: ["2021-09-21", new Date(2021, 8, 28)], // YYYY-MM-DD or new Date()
        selectedRange: {
          start: new Date(2021, 8, 13), // YYYY-MM-DD or new Date()
          end: "2021-09-17", // YYYY-MM-DD or new Date()
        },
      };
    },
  };
</script>

<style lang="scss">
  @import "@/scss/main.scss";
</style>
