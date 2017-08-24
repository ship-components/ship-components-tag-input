import React from 'react';
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SelectControls from '../Controls';

function createSampleProps() {
  return {
    darkTheme: true,
    filterable: true,
    label: 'sample',
    orderOptionsBy: 'title',
    selection: new Immutable.List(),
    onFocus: jest.fn(),
    onChange: jest.fn(),
    onKeyDown: jest.fn(),
    onClear: jest.fn(),
    onToggle: jest.fn()
  };
}

// Creates a shallow copy of SelectControls
function initializeShallowTagInputComponent() {
  const props = createSampleProps();

  return shallow(
    <SelectControls {...props} />
  );
}

// Creates a mounted copy of SelectControls
function initializeMountTagInputComponent() {
  const props = createSampleProps();

  return mount(
    <SelectControls {...props}/>
  );
}

describe('Component: Controls', () => {
  describe('SelectControls Rendering', () => {
    it('should render correctly', () => {
      const tree = initializeShallowTagInputComponent();
      expect(shallowToJson(tree)).toMatchSnapshot();
    });
  });

  describe('focusInput Function', () => {
    it('should fires a focus event when focusInput function calls', () => {
      const wrapper = initializeMountTagInputComponent();
      const textInputWrapper = wrapper.find('input [type="text"]');
      const textInput = textInputWrapper.get(0);
      const focusInputSpy = jest.spyOn(textInput, 'focus');

      // Fires the focusInput function
      wrapper.node.focusInput();

      expect(focusInputSpy).toHaveBeenCalled();
    });

    it('should NOT fires a focus event when filterable is false', () => {
      const wrapper = initializeMountTagInputComponent();
      const textInputWrapper = wrapper.find('input [type="text"]');
      const textInput = textInputWrapper.get(0);
      const focusInputSpy = jest.spyOn(textInput, 'focus');

      // Update filterable to be false
      wrapper.setProps({
        filterable: false
      });

      // Fires the focusInput function
      wrapper.node.focusInput();

      expect(focusInputSpy).not.toHaveBeenCalled();
    });
  });

  describe('blurInput Function', () => {
    it('should fires a blur event when blurInput function calls', () => {
      const wrapper = initializeMountTagInputComponent();
      const textInputWrapper = wrapper.find('input [type="text"]');
      const textInput = textInputWrapper.get(0);
      const blurInputSpy = jest.spyOn(textInput, 'blur');

      // Fires the blurInput function
      wrapper.node.blurInput();

      expect(blurInputSpy).toHaveBeenCalled();
    });

    it('should NOT fires a blur event when filterable is false', () => {
      const wrapper = initializeMountTagInputComponent();
      const textInputWrapper = wrapper.find('input [type="text"]');
      const textInput = textInputWrapper.get(0);
      const blurInputSpy = jest.spyOn(textInput, 'blur');

      // Update filterable to be false
      wrapper.setProps({
        filterable: false
      });

      // Fires the blurInput function
      wrapper.node.blurInput();

      expect(blurInputSpy).not.toHaveBeenCalled();
    });
  });
});
