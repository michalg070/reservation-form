import Vue from "vue";
import {mount} from "@vue/test-utils";
import BaseDatesPicker from "@/components/BaseDatesPicker.vue";
import Calendar from "@/components/calendar/Calendar.vue";

const factory = (props) => {
  return mount(BaseDatesPicker, {
    propsData: {
      ...props,
    },
  });
};

describe("BaseDatesPicker.vue", () => {
  it("renders successfully", () => {
    factory();
  });

  it("it not renders calendar on start", () => {
    const wrapper = mount(BaseDatesPicker);

    expect(wrapper.findComponent(Calendar).exists()).toBe(false);
  });

  it("renders calendar when isCalendarVisible is true", () => {
    const wrapper = mount(BaseDatesPicker, {
      data() {
        return {
          isCalendarVisible: true,
        };
      },
    });

    expect(wrapper.findComponent(Calendar).exists()).toBe(true);
  });

  it("parse selected range properly if necessary", () => {
    const wrapper = factory({
      disabledDates: [],
      selectedRange: {
        start: new Date(2021, 8, 21),
        end: "2021-09-23",
      },
    });

    expect(wrapper.vm.currentSelectedRange.start).toBe("2021-09-21");
    expect(wrapper.vm.currentSelectedRange.end).toBe("2021-09-23");
  });

  it("parse disabled dates properly if necessary", () => {
    const wrapper = factory({
      disabledDates: [new Date(2021, 8, 20), "2021-09-19"],
      selectedRange: {
        start: new Date(2021, 8, 21),
        end: "2021-09-23",
      },
    });

    expect(wrapper.vm.disabledDatesParsed).toEqual(["2021-09-20", "2021-09-19"]);
  });

  it("display correct range in inputs based on passed props", async () => {
    const wrapper = factory({
      selectedRange: {
        start: new Date(2021, 8, 21),
        end: "2021-09-23",
      },
    });

    await Vue.nextTick();

    expect(wrapper.find("#check-in").element.value).toBe("2021-09-21");
    expect(wrapper.find("#check-out").element.value).toBe("2021-09-23");
  });
});
