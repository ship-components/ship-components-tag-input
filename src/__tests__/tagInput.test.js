import React from 'react';
import Immutable from 'immutable';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TagInput from '../index';

describe('TagInput Component', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <TagInput
        value={new Immutable.List()}
        onChange={() => {}}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
