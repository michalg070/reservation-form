<template>
  <div class="base-date-picker">
    <p class="base-date-picker__title">Dates</p>

    <div class="base-date-picker__box">
      <input
        :id="inputNames.CHECK_IN"
        :class="{'base-date-picker__trigger--active': activeInput === inputNames.CHECK_IN}"
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
        class="base-date-picker__trigger"
        placeholder="Check Out"
        readonly
      />
    </div>
  </div>
</template>

<script>
  import {formInputNames} from "@/enums/formInputNames.js";

  export default {
    data() {
      return {
        activeInput: null,
        inputNames: formInputNames,
      };
    },
  };
</script>
