import Vue from "vue";
import {mount} from "@vue/test-utils";
import ReservationForm from "@/components/ReservationForm.vue";

const factory = (props) => {
  return mount(ReservationForm, {
    propsData: {
      ...props,
    },
  });
};

describe("ReservationForm.vue", () => {
  it("renders successfully", () => {
    factory({rating: 2, price: 23, reviews: 543});
  });

  it("renders proper price and reviews count", () => {
    const wrapper = factory({
      rating: 2,
      price: 23,
      reviews: 543,
      selectedRange: {
        start: null,
        end: null,
      },
    });

    expect(wrapper.find("h5").text()).toBe("23 zł");
    expect(wrapper.find("span").text()).toBe("543");
  });

  it("disable button when no selected range", async () => {
    const wrapper = factory({
      rating: 2,
      price: 23,
      reviews: 543,
      selectedRange: {
        start: null,
        end: null,
      },
    });

    await Vue.nextTick();

    expect(wrapper.find("button").element.disabled).toBe(true);
  });

  it("undisable button when range is selected", async () => {
    const wrapper = factory({
      rating: 2,
      price: 23,
      reviews: 543,
      selectedRange: {
        start: "2021-09-21",
        end: "2021-09-24",
      },
    });

    await Vue.nextTick();

    expect(wrapper.find("button").element.disabled).toBe(false);
  });
});
