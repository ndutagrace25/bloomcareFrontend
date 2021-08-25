import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import EntryList from "../../components/entry/EntryList";

const setUp = (props = {}) => {
  const component = shallow(<EntryList {...props} />);
  return component;
};

describe("Entry List tests", () => {
  describe("Checking Prop Types", () => {
    it("It should not throw a warning", () => {
      const expectedProps = {
        updateEntry: () => {},
        handlePreloaderStyle: () => {},
        deleteEntry: () => {},
        entry: {}
      };

      const propsErr = checkProps(EntryList, expectedProps);

      expect(propsErr).toBeUndefined();
    });

    it("It should throw a warning", () => {
      const expectedProps = {
        updateEntry: "",
        handlePreloaderStyle: "",
        deleteEntry: "",
        entry: ""
      };

      const propsErr = checkProps(EntryList, expectedProps);
      expect(propsErr).toMatch("Failed props type");
    });
  });

  describe("Rendering component", () => {
    describe("Render with props", () => {
      let wrapper;
      beforeEach(() => {
        const initialState = {
          updateEntry: () => {},
          handlePreloaderStyle: () => {},
          deleteEntry: () => {},
          entry: {}
        };
        wrapper = setUp(initialState);
      });

      it("It should render component without errors", () => {
        const component = findByTestAttribute(wrapper, "EntryListComponent");

        expect(component.length).toBe(1);
      });
    });
  });
});
