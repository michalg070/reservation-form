import {mount, shallowMount} from "@vue/test-utils";
import BaseRating from "@/components/BaseRating.vue";

const factory = (props) => {
  return mount(BaseRating, {
    propsData: {
      ...props,
    },
  });
};

describe("BaseRating.vue", () => {
  it("renders successfully", () => {
    factory({rating: 5});
  });

  it("calculate a proper rating", () => {
    const rating = {rating: 2.4325};

    expect(BaseRating.computed.ratingRoundedToHalf.call(rating)).toBe(2.5);
  });

  it("returns a proper path to star-fill.svg", () => {
    const wrapper = factory({rating: 3.4});

    expect(wrapper.vm.starPath(1)).toBe("-fill");
  });

  it("returns a proper path to star-half.svg", () => {
    const wrapper = factory({rating: 3.4});

    expect(wrapper.vm.starPath(4)).toBe("-half");
  });

  it("returns a proper path to star.svg", () => {
    const wrapper = factory({rating: 3.4});

    expect(wrapper.vm.starPath(5)).toBe("");
  });
});
