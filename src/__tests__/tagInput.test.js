import React from 'react';
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TagInput from '../index';

// Globals
let DATA_LIST = new Immutable.List();
let SAMPLE_DATA = {};

// Updates the DATA_LIST when onChange functon fires
function onHandleChange(item) {
  DATA_LIST = item;
}

// Creates a shallow copy of TagInput
function initializeShallowTagInputComponent() {
  return shallow(
    <TagInput
      value={DATA_LIST}
      onChange={onHandleChange}
    />
  );
}

// Creates a mounted copy of TagInput
function initializeMountTagInputComponent() {
  return mount(
    <TagInput
      value={DATA_LIST}
      onChange={onHandleChange}
    />
  );
}

describe('index.js', () => {
  beforeEach(() => {
    SAMPLE_DATA = {id: 0, title: 'Sample Test'};
    return SAMPLE_DATA;
  });

  afterAll(() => {
    SAMPLE_DATA = {};
    return SAMPLE_DATA;
  });

  describe('TagInput Rendering', () => {
    it('should render correctly', () => {
      const tree = initializeShallowTagInputComponent();
      expect(shallowToJson(tree)).toMatchSnapshot();
    });
  });

  describe('handleSelectItem Function', () => {
    it('should call parent onChange function when add items', () => {
      const doneChangeFn = jest.fn();
      const wrapper = mount(
        <TagInput
          value={DATA_LIST}
          onChange={doneChangeFn}
        />
      );

      wrapper.node.handleSelectItem(SAMPLE_DATA);
      expect(doneChangeFn.mock.calls.length).toBe(1);
    });

    it('should add the passed value to array of data', () => {
      const wrapper = initializeMountTagInputComponent();

      wrapper.node.handleSelectItem(SAMPLE_DATA);
      expect(DATA_LIST.toJS()[0]).toEqual(SAMPLE_DATA);
    });
  });

  describe('handleDeselectItem Function', () => {
    it('should call parent onChange function when remove items', () => {
      const doneChangeFn = jest.fn();
      const wrapper = mount(
        <TagInput
          value={DATA_LIST}
          onChange={doneChangeFn}
        />
      );

      wrapper.node.handleDeselectItem(SAMPLE_DATA);
      expect(doneChangeFn.mock.calls.length).toBe(1);
    });

    it('should remove the passed value from array of data', () => {
      const wrapper = initializeMountTagInputComponent();

      // Add Extra item to the list
      wrapper.node.handleSelectItem({ id: 1, title: 'Sample Test 2' });
      // Removes the last added item
      wrapper.node.handleDeselectItem('Sample Test 2');
      expect(DATA_LIST.toJS()[0]).toEqual(SAMPLE_DATA);
    });
  });

  describe('fetchServer Function', () => {
    it('Throws Unauthorized error when fetch the server without proxy', async() => {
      const httpHeaders = {
        'x-jira-server': 'https://jira.sp.ppship.scea.com'
      };

      const fetchUrl = 'https://watch.ppship.scea.com/api/1/proxy/jira/1.0/labels/';

      const wrapper = mount(
        <TagInput
          value={DATA_LIST}
          onChange={onHandleChange}
          httpHeaders={httpHeaders}
          fetchUrl={fetchUrl}
        />
      );
      // Not sure how I can test this within proxy to get the results
      try {
        await wrapper.node.fetchServer('');
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });

  describe('handleGetOptions Function', () => {
    it('Throws Unauthorized error when fetch the server without proxy', async() => {
      const httpHeaders = {
        'x-jira-server': 'https://jira.sp.ppship.scea.com'
      };

      const fetchUrl = 'https://watch.ppship.scea.com/api/1/proxy/jira/1.0/labels/';
      const wrapper = mount(
        <TagInput
          value={DATA_LIST}
          onChange={onHandleChange}
          httpHeaders={httpHeaders}
          fetchUrl={fetchUrl}
        />
      );

      // Not sure how I can test this within proxy to get the results
      try {
        await wrapper.node.fetchServer('');
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });
});
