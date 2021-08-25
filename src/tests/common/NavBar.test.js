import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps, testStore } from "../../utils";

import NavBar from "../../components/common/Navbar";

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<NavBar store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe("NavBar tests", () => {
  describe("Checking Prop Types", () => {
    it("It should not throw a warning", () => {
      const expectedProps = {
        logoutPersonnel: () => {},
        auth: {}
      };

      const propsErr = checkProps(NavBar, expectedProps);

      expect(propsErr).toBeUndefined();
    });

    it("It should throw a warning", () => {
      const expectedProps = {
        logoutPersonnel: [],
        auth: ''
      };

      const propsErr = checkProps(NavBar, expectedProps);
      expect(propsErr).toMatch("Failed props type");
    });
  });

  describe("Rendering component", () => {
    describe("Render with props", () => {
      let wrapper;
      beforeEach(() => {       
        wrapper = setUp();
      });

      it("It should render component without errors", () => {
        const component = findByTestAttribute(wrapper, "NavBarComponent");

        expect(component.length).toBe(1);
      });
    });
  });
});
