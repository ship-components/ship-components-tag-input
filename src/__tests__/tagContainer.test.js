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
  const onFetchOptionsFn = jest.fn();

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
        onFetchOptions={onFetchOptionsFn}
      />
    ),
    onSelectFn,
    onDeselectFn,
    onFetchOptionsFn
  };
}

// Creates a mounted copy of TagContainer
function initializeMountTagContainerComponent() {
  const onSelectFn = jest.fn();
  const onDeselectFn = jest.fn();
  const onFetchOptionsFn = jest.fn();

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
        onFetchOptions={onFetchOptionsFn}
      />
    ),
    onSelectFn,
    onDeselectFn,
    onFetchOptionsFn
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
    it('should toggle "dropdownOpen" state', () => {
      const {wrapper} = initializeMountTagContainerComponent();
      const event = new Event('look');

      expect(wrapper.state().dropdownOpen).toBeFalsy();
      wrapper.instance().handleToggleDropdown(event);
      expect(wrapper.state().dropdownOpen).toBeTruthy();
    });
  });

  describe('handleInput Function', () => {
    it('should change "filterText" state on onChange event', () => {
      const {wrapper} = initializeMountTagContainerComponent();
      const newFilterText = 'test string';

      expect(wrapper.state().filterText).toEqual('');
      expect(wrapper.state().dropdownOpen).toBeFalsy();

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
      expect(wrapper.state().dropdownOpen).toBeTruthy();
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

      expect(wrapper.state().dropdownOpen).toBeFalsy();
      expect(wrapper.state().dropdownOpen).toBeFalsy();
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
    // This test is commented out for changes in 1.0.4. See README.md.
    // it('should pass the correct item to parent on Tab key press', () => {
    //   const {
    //     wrapper,
    //     onSelectFn
    //   } = initializeMountTagContainerComponent();

    //   expect(onSelectFn.mock.calls.length).toBe(0);

    //   // highlight an option by simulating "DOWN" key, otherwise select function will not be called.
    //   wrapper
    //     .instance()
    //     .handleKeyboard({
    //       keyCode: 40,
    //       preventDefault: jest.fn(),
    //       stopPropagation: jest.fn()
    //     });

    //   wrapper
    //     .instance()
    //     .handleKeyboard({
    //       keyCode: 9,
    //       preventDefault: jest.fn(),
    //       stopPropagation: jest.fn()
    //     });

    //   // how to ensure certain function is passed as prop to a component
    //   expect(wrapper.find('Dropdown')
    //     .prop('handleKeyboard')).toBe(wrapper.instance().onKeyDown);

    //   expect(onSelectFn.mock.calls.length).toBe(1);
    // });

    it('should pass the correct item to parent on Enter key press', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      wrapper.setProps({
        onEnterKey: jest.fn()
      });

      expect(wrapper.props().onEnterKey.mock.calls.length).toBe(0);

      wrapper
        .instance()
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
      wrapper.instance().highlightPreviousItem = jest.fn();
      expect(wrapper.instance().highlightPreviousItem.mock.calls.length).toBe(0);

      // Setting the dropdownOpen state to true
      // Otherwise highlightPreviousItem will not fires
      wrapper.setState({
        dropdownOpen: true
      });

      wrapper
        .instance()
        .handleKeyboard({
          keyCode: 38,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        });

      // how to ensure certain function is passed as prop to a component
      expect(wrapper.find('Dropdown')
        .prop('handleKeyboard')).toBe(wrapper.instance().onKeyDown);

      expect(wrapper.instance().highlightPreviousItem.mock.calls.length).toBe(1);
    });

    it('should pass the next item to parent on Down key press', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      // Mock highlightPreviousItem function to make sure it's called
      wrapper.instance().highlightNextItem = jest.fn();
      expect(wrapper.instance().highlightNextItem.mock.calls.length).toBe(0);

      wrapper
        .instance()
        .handleKeyboard({
          keyCode: 40,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        });

      // how to ensure certain function is passed as prop to a component
      expect(wrapper.find('Dropdown')
        .prop('handleKeyboard')).toBe(wrapper.instance().onKeyDown);

      expect(wrapper.instance().highlightNextItem.mock.calls.length).toBe(1);
    });

    it('should change the dropdownOpen state to false on Escape key press', () => {
      const {
        wrapper
      } = initializeMountTagContainerComponent();

      // Mock highlightPreviousItem function to make sure it's called
      wrapper.instance().blurInput = jest.fn();
      expect(wrapper.instance().blurInput.mock.calls.length).toBe(0);

      // Making sure the dropdownOpen state is true
      // Which means the dropdown is open
      wrapper.setState({
        dropdownOpen: true
      });

      wrapper
        .instance()
        .handleKeyboard({
          keyCode: 27,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        });

      // dropdownOpen state should be false when press Escape key
      expect(wrapper.state().dropdownOpen).toBeFalsy();
      expect(wrapper.instance().blurInput.mock.calls.length).toBe(1);
    });
  });

  describe('filter behavior', () => {
    it('does not attempt to fetch options unless filter length > 2', () => {
      const {wrapper, onFetchOptionsFn} = initializeMountTagContainerComponent();
      const shortFilter = '12';
      const adequateFilter = '123';

      wrapper.setProps({autoComplete: true});

      // change filter text
      const selectControls = wrapper
        .find('SelectControls');

      // it shouldn't fetch on filter
      selectControls.props()
        .onChange({
          target: {
            value: shortFilter
          }
        });
      expect(onFetchOptionsFn).not.toHaveBeenCalled();

      // it shouldn't fetch on dropdown opening
      selectControls.props().onFocus();
      expect(onFetchOptionsFn).not.toHaveBeenCalled();

      // it should fetch on filter
      selectControls.props()
        .onChange({
          target: {
            value: adequateFilter
          }
        });

      // it should fetch on dropdown opening
      selectControls.props().onFocus();
      expect(onFetchOptionsFn).toHaveBeenCalled();
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

      let getAllResults = wrapper.instance().getFilterResults('option');
      let getOneResult = wrapper.instance().getFilterResults('option 1')[0];

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

      let getTwoResults = wrapper.instance().getFilterResults('1');

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

      let getOneResult = wrapper.instance().getFilterResults('2')[0];

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

      let getAllResults = wrapper.instance().getVisibleOptions('option');
      let getOneResult = wrapper.instance().getVisibleOptions('option 1')[0];

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
      let getAllSortedResults = wrapper.instance().getFilterResults('1');

      expect(getAllSortedResults).not.toEqual(sampleOptionList.toJS());
      // Sort sampleOptionList
      var sorted = sampleOptionList.sort((a, b) => a.id > b.id); // eslint-disable-line max-nested-callbacks

      expect(getAllSortedResults).toEqual(sorted.toJS());
    });
  });

  describe('isEmpty Function', () => {
    it('return true when props.selection is Immutable.List && size is zero', () => {
      const { wrapper } = initializeMountTagContainerComponent();
      let sampleProps = {
        selection: new Immutable.List()
      };

      const result1 = wrapper.instance().isEmpty(sampleProps);
      expect(result1).toBeTruthy();

      // Add an item to selection
      // isEmpty should return false
      sampleProps.selection = sampleProps.selection.push(OPTIONS[0]);
      const result2 = wrapper.instance().isEmpty(sampleProps);

      expect(result2).toBeFalsy();
    });

    it('return false when props.selection is not an instance of List', () => {
      const { wrapper } = initializeMountTagContainerComponent();
      let sampleProps = {
        selection: {}
      };

      const result = wrapper.instance().isEmpty(sampleProps);
      expect(result).toBeFalsy();
    });
  });

  describe('highlightPreviousItem Function', () => {
    it('should update state to correct previous item when function calls', () => {
      const { wrapper } = initializeMountTagContainerComponent();

      // setState manually
      wrapper.setState({
        highlightedOption: OPTIONS[2]
      });

      wrapper.instance().highlightPreviousItem();
      expect(wrapper.state().highlightedOption).toEqual(OPTIONS[1]);

    });

    it('should NOT update state to previous item when first item is selected', () => {
      const { wrapper } = initializeMountTagContainerComponent();

      // setState manually
      wrapper.setState({
        highlightedOption: OPTIONS[0]
      });

      wrapper.instance().highlightPreviousItem();
      expect(wrapper.state().highlightedOption).toEqual(OPTIONS[0]);
    });
  });

  describe('highlightNextItem Function', () => {
    it('should update state to correct next item when function calls', () => {
      const { wrapper } = initializeMountTagContainerComponent();

      // setState manually
      wrapper.setState({
        highlightedOption: OPTIONS[0]
      });

      wrapper.instance().highlightNextItem();
      expect(wrapper.state().highlightedOption).toEqual(OPTIONS[1]);

    });

    it('should NOT update state to next item when last item is selected', () => {
      const { wrapper } = initializeMountTagContainerComponent();

      // setState manually
      wrapper.setState({
        highlightedOption: OPTIONS[2]
      });

      wrapper.instance().highlightNextItem();
      expect(wrapper.state().highlightedOption).toEqual(OPTIONS[2]);
    });
  });
});
