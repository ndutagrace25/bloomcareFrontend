import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import CreateEntry from "../../components/entry/CreateEntry";

const setUp = (props = {}) => {
  const component = shallow(<CreateEntry {...props} />);
  return component;
};

describe("Create Entry tests", () => {
  describe("Checking Prop Types", () => {
    it("It should not throw a warning", () => {
      const expectedProps = {
        handleCreateEntry: () => {},
        errors: {}
      };

      const propsErr = checkProps(CreateEntry, expectedProps);

      expect(propsErr).toBeUndefined();
    });

    it("It should throw a warning", () => {
      const expectedProps = {
        handleCreateEntry: "",
        errors: []
      };

      const propsErr = checkProps(CreateEntry, expectedProps);
      expect(propsErr).toMatch("Failed props type");
    });
  });

  describe("Rendering component", () => {
    describe("Render with props", () => {
      let wrapper;
      beforeEach(() => {
        const initialState = {
          handleCreateEntry: () => {},
          errors: {}
        };
        wrapper = setUp(initialState);
      });

      it("It should render component without errors", () => {
        const component = findByTestAttribute(wrapper, "CreateEntryComponent");

        expect(component.length).toBe(1);
      });
    });
  });
});
