<template>
  <div id="app" class="main">
    <div class="main__wrapper">
      <ReservationForm :rating="3.5" :price="232" :reviews="234" />
    </div>
  </div>
</template>

<script>
  import ReservationForm from "./components/ReservationForm.vue";
  export default {
    name: "App",
    components: {
      ReservationForm,
    },
  };
</script>

<style lang="scss">
  @import "@/scss/main.scss";
</style>
