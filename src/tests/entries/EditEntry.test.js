import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import EditEntry from "../../components/entry/EditEntry";

const setUp = (props = {}) => {
  const component = shallow(<EditEntry {...props} />);
  return component;
};

describe("Edit Entry tests", () => {
  describe("Checking Prop Types", () => {
    it("It should not throw a warning", () => {
      const expectedProps = {
        updateEntry: () => {},
        _id: "",
        name: "",
        errors: {}
      };

      const propsErr = checkProps(EditEntry, expectedProps);

      expect(propsErr).toBeUndefined();
    });

    it("It should throw a warning", () => {
      const expectedProps = {
        updateEntry: "",
        _id: () => {},
        name: () => {},
        errors: ""
      };

      const propsErr = checkProps(EditEntry, expectedProps);
      expect(propsErr).toMatch("Failed props type");
    });
  });

  describe("Rendering component", () => {
    describe("Render with props", () => {
      let wrapper;
      beforeEach(() => {
        const initialState = {
          updateEntry: () => {},
          _id: "12",
          name: "34",
          errors: {}
        };
        wrapper = setUp(initialState);
      });

      it("It should render component without errors", () => {
        const component = findByTestAttribute(wrapper, "EditEntryComponent");

        expect(component.length).toBe(1);
      });
    });
  });
});
