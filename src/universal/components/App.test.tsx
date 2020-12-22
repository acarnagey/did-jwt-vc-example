import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

describe("<App />", () => {
  it("should render shallow", () => {
    const component  = shallow(<App />);
    expect(component .find("div").length).toBeGreaterThan(0);
  });
  it("should render", () => {
    expect(mount(<App />).find("div").length).toBeGreaterThan(0);
  });
});
