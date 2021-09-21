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
    const wrapper = factory({rating: 2, price: 23, reviews: 543});

    expect(wrapper.find("h5").text()).toBe("23 zł");
    expect(wrapper.find("span").text()).toBe("543");
  });
});
