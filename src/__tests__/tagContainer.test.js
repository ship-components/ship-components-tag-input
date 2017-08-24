import React from 'react';
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TagContainer from '../TagContainer';

const OPTIONS = [
  {
    id: 1,
    title: 'Option 1',
    searchString: 'Option 1'
  },
  {
    id: 2,
    title: 'Option 2',
    searchString: 'Option 2'
  },
  {
    id: 3,
    title: 'Option 3',
    searchString: 'Option 3'
  }
];

// Creates a shallow copy of TagContainer
function initializeShallowTagContainerComponent() {
  const onSelectFn = jest.fn();
  const onDeselectFn = jest.fn();

  return {
    wrapper: shallow(
      <TagContainer
        multiple
        filterable
        darkTheme={false}
        orderOptionsBy={'title'}
        label={'label'}
        options={OPTIONS}
        togglePosition={'right'}
        noOptionsMessage={''}
        toggleSwitchStyle={'library_add'}
        selection={new Immutable.List()}
        optionGroupTitles={[]}
        onSelect={onSelectFn}
        onDeselect={onDeselectFn}
      />
    ),
    onSelectFn,
    onDeselectFn
  };
}

// Creates a mounted copy of TagContainer
function initializeMountTagContainerComponent() {
  const onSelectFn = jest.fn();
  const onDeselectFn = jest.fn();

  return {
    wrapper: mount(
      <TagContainer
        multiple
        filterable
        darkTheme={false}
        orderOptionsBy={'title'}
        label={'label'}
        options={OPTIONS}
        togglePosition={'right'}
        noOptionsMessage={''}
        toggleSwitchStyle={'library_add'}
        selection={new Immutable.List()}
        optionGroupTitles={[]}
        onSelect={onSelectFn}
        onDeselect={onDeselectFn}
      />
    ),
    onSelectFn,
    onDeselectFn
  };
}

describe('Component: TagContainer', () => {
  describe('TagContainer Rendering', () => {
    it('should render correctly', () => {
      const {wrapper} = initializeShallowTagContainerComponent();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('handleToggleDropdown Function', () => {
    it('should toggle "active" state', () => {
      const {wrapper} = initializeMountTagContainerComponent();
      const event = new Event('look');

      expect(wrapper.state().active).toBeFalsy();
      wrapper.node.handleToggleDropdown(event);
      expect(wrapper.state().active).toBeTruthy();
    });
  });

  describe('handleInput Function', () => {
    it('should change "filterText" state on onChange event', () => {
      const {wrapper} = initializeMountTagContainerComponent();
      const newFilterText = 'test string';

      expect(wrapper.state().filterText).toEqual('');
      expect(wrapper.state().active).toBeFalsy();

      // Trigger  handleInput handler
      // by firing a change event
      wrapper
        .find('SelectControls')
        .props()
        .onChange({
          target: {
            value: newFilterText
          }
        });

      expect(wrapper.state().filterText).toEqual(newFilterText);
      expect(wrapper.state().active).toBeTruthy();
    });
  });

  describe('handleSelectItem Function', () => {
    it('should pass the selected item to parent on onSelect event', () => {
      const {
        wrapper,
        onSelectFn
      } = initializeMountTagContainerComponent();

      expect(onSelectFn.mock.calls.length).toBe(0);

      wrapper
        .find('Dropdown')
        .props()
        .onSelect(OPTIONS[0], new Event('look'));

      // how to ensure certain function is passed as prop to a component
      expect(wrapper.find('Dropdown')
        .prop('handleSelectItem')).toBe(wrapper.instance().onSelect);

      // Making sure the right option is passed to parent component
      expect(onSelectFn.mock.calls[0][0]).toEqual(OPTIONS[0]);
      expect(onSelectFn.mock.calls.length).toBe(1);
    });

    it('should not call parent onSelect function when option is null', () => {
      const {
        wrapper,
        onSelectFn
      } = initializeMountTagContainerComponent();

      expect(onSelectFn.mock.calls.length).toBe(0);

      wrapper
        .find('Dropdown')
        .props()
        .onSelect(null, new Event('look'));

      // how to ensure certain function is passed as prop to a component
      expect(wrapper.find('Dropdown')
        .prop('handleSelectItem')).toBe(wrapper.instance().onSelect);

      // Since we are not calling the props.onSelect function
      // the function should have no value passed in (empty array)
      expect(onSelectFn.mock.calls).toHaveLength(0);
    });
  });

  describe('optionWasSelected Function', () => {
    it('should update react state when fires', () => {
      const {
        wrapper,
        onSelectFn
      } = initializeMountTagContainerComponent();

      expect(onSelectFn.mock.calls.length).toBe(0);

      wrapper
        .find('Dropdown')
        .props()
        .onSelect(OPTIONS[0], new Event('look'));

      if (wrapper.props().multiple) {
        expect(wrapper.state().filterText).toEqual('');
      } else {
        expect(wrapper.state().filterText).toEqual(wrapper.state().filterText);
      }

      expect(wrapper.state().active).toBeFalsy();
      expect(wrapper.state().active).toBeFalsy();
      expect(wrapper.state().highlightedOption).toBe(null);

      expect(onSelectFn.mock.calls.length).toBe(1);
    });

    it('should call focusInput function when props.multiple is true', () => {
      const { wrapper } = initializeMountTagContainerComponent();

      // mock the focusInput function
      wrapper.instance().focusInput = jest.fn();
      // Update the wrapper to save the mock function
      wrapper.update();

      expect(wrapper.instance().focusInput.mock.calls.length).toBe(0);
      wrapper.instance().optionWasSelected();
      expect(wrapper.instance().focusInput.mock.calls.length).toBe(1);
    });
  });

  describe('handleClearItem Function', () => {
    it('should call the parent onDeselect function to remove the item', () => {
      const {
        wrapper,
        onDeselectFn
      } = initializeMountTagContainerComponent();

      expect(onDeselectFn.mock.calls.length).toBe(0);

      wrapper
        .find('SelectControls')
        .props()
        .onClear(OPTIONS[1], new Event('look'));

      // how to ensure certain function is passed as prop to a component
      expect(wrapper.find('SelectControls')
        .prop('handleClearItem')).toBe(wrapper.instance().onClear);

      // Making sure the right option is passed to parent component
      expect(onDeselectFn.mock.calls[0][0]).toEqual(OPTIONS[1]);
      expect(onDeselectFn.mock.calls.length).toBe(1);
    });
  });

  describe('handleKeyboard Function', () => {
    it('should pass the correct item to parent on Tab key press', () => {
      const {
        wrapper,
        onSelectFn
      } = initializeMountTagContainerComponent();

      expect(onSelectFn.mock.calls.length).toBe(0);

      wrapper
        .node
        .handleKeyboard({
          keyCode: 9,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        });

      // how to ensure certain function is passed as prop to a component
      expect(wrapper.find('Dropdown')
        .prop('handleKeyboard')).toBe(wrapper.instance().onKeyDown);

      expect(onSelectFn.mock.calls.length).toBe(1);
    });

    it('should pass the correct item to parent on Enter key press', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      wrapper.setProps({
        onEnterKey: jest.fn()
      });

      expect(wrapper.props().onEnterKey.mock.calls.length).toBe(0);

      wrapper
        .node
        .handleKeyboard({
          keyCode: 13,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        });

      // how to ensure certain function is passed as prop to a component
      expect(wrapper.find('Dropdown')
        .prop('handleKeyboard')).toBe(wrapper.instance().onKeyDown);

      expect(wrapper.props().onEnterKey.mock.calls.length).toBe(1);
    });

    it('should pass the previous item to parent on Up key press', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      // Mock highlightPreviousItem function to make sure it's called
      wrapper.node.highlightPreviousItem = jest.fn();
      expect(wrapper.node.highlightPreviousItem.mock.calls.length).toBe(0);

      // Setting the active state to true
      // Otherwise highlightPreviousItem will not fires
      wrapper.setState({
        active: true
      });

      wrapper
        .node
        .handleKeyboard({
          keyCode: 38,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        });

      // how to ensure certain function is passed as prop to a component
      expect(wrapper.find('Dropdown')
        .prop('handleKeyboard')).toBe(wrapper.instance().onKeyDown);

      expect(wrapper.node.highlightPreviousItem.mock.calls.length).toBe(1);
    });

    it('should pass the next item to parent on Down key press', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      // Mock highlightPreviousItem function to make sure it's called
      wrapper.node.highlightNextItem = jest.fn();
      expect(wrapper.node.highlightNextItem.mock.calls.length).toBe(0);

      wrapper
        .node
        .handleKeyboard({
          keyCode: 40,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        });

      // how to ensure certain function is passed as prop to a component
      expect(wrapper.find('Dropdown')
        .prop('handleKeyboard')).toBe(wrapper.instance().onKeyDown);

      expect(wrapper.node.highlightNextItem.mock.calls.length).toBe(1);
    });

    it('should change the active state to false on Escape key press', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      // Mock highlightPreviousItem function to make sure it's called
      wrapper.node.blurInput = jest.fn();
      expect(wrapper.node.blurInput.mock.calls.length).toBe(0);

      // Making sure the active state is true
      // Which means the dropdown is open
      wrapper.setState({
        active: true
      });

      wrapper
        .node
        .handleKeyboard({
          keyCode: 27,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        });

      // Active state should be false when press Escape key
      expect(wrapper.state().active).toBeFalsy();
      expect(wrapper.node.blurInput.mock.calls.length).toBe(1);
    });
  });

  describe('getFilterResults Function', () => {
    it('should return the correct result orderOptionsBy: title', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      wrapper.setProps({
        options: OPTIONS,
        orderOptionsBy: 'title'
      });

      let getAllResults = wrapper.node.getFilterResults('option');
      let getOneResult = wrapper.node.getFilterResults('option 1')[0];

      expect(getAllResults).toEqual(OPTIONS);
      expect(getOneResult).toEqual(OPTIONS[0]);
    });

    it('should return multiple option when orderOptionsBy: title', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      let sampleOptionList = [
        {
          id: 1,
          title: 'Option 1',
          searchString: 'Option 1'
        },
        {
          id: 10,
          title: 'Option 10',
          searchString: 'Option 10'
        }
      ];

      wrapper.setProps({
        options: sampleOptionList,
        orderOptionsBy: 'title'
      });

      let getTwoResults = wrapper.node.getFilterResults('1');

      expect(getTwoResults).toEqual(sampleOptionList);
    });

    it('should return the correct result orderOptionsBy: id', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      wrapper.setProps({
        options: OPTIONS,
        orderOptionsBy: 'id'
      });

      let getOneResult = wrapper.node.getFilterResults('2')[0];

      expect(getOneResult).toEqual(OPTIONS[1]);
    });
  });

  describe('getVisibleOptions Function', () => {
    it('should return the correct result orderOptionsBy: title', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      wrapper.setProps({
        options: OPTIONS,
        orderOptionsBy: 'title'
      });

      let getAllResults = wrapper.node.getVisibleOptions('option');
      let getOneResult = wrapper.node.getVisibleOptions('option 1')[0];

      expect(getAllResults).toEqual(OPTIONS);
      expect(getOneResult).toEqual(OPTIONS[0]);
    });

    it('should return the correct result sorted', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      // Create a OrderedSet so we can keep it unsorted
      // Array by default sort the items
      let sampleOptionList = new Immutable.OrderedSet([
        {
          id: 10,
          title: 'Option 10',
          searchString: 'Option 10'
        },
        {
          id: 100,
          title: 'Option 100',
          searchString: 'Option 100'
        },
        {
          id: 1,
          title: 'Option 1',
          searchString: 'Option 1'
        }
      ]);

      wrapper.setProps({
        options: sampleOptionList.toJS(),
        orderOptionsBy: 'title'
      });

      // Getting the sorted results
      let getAllSortedResults = wrapper.node.getFilterResults('1');

      expect(getAllSortedResults).not.toEqual(sampleOptionList.toJS());
      // Sort sampleOptionList
      var sorted = sampleOptionList.sort((a, b) => a.id > b.id);

      expect(getAllSortedResults).toEqual(sorted.toJS());
    });
  });
});
