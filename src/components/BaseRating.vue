<template>
  <div class="base-rating">
    <img
      v-for="index in 5"
      :src="require(`../assets/star${starPath(index)}.svg`)"
      class="base-rating__start"
      alt="star-icon"
      :key="index"
    />
  </div>
</template>

<script>
  export default {
    props: {
      rating: {
        type: Number,
        required: true,
        validator: (value) => {
          return value >= 0 && value <= 5;
        },
      },
    },

    computed: {
      ratingRoundedToHalf() {
        if (typeof this.rating !== "number") {
          return;
        }

        return Math.round(this.rating * 2) / 2;
      },
    },

    methods: {
      starPath(index) {
        const halfPath = "-half";
        const fillPath = "-fill";

        return this.rating >= index
          ? fillPath
          : index - this.ratingRoundedToHalf < 1
          ? halfPath
          : "";
      },
    },
  };
</script>
