import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Promise from 'bluebird';
import superagent from 'superagent';

import TagContainer from './TagContainer';

export default class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      data: props.options
    };

    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleDeselectItem = this.handleDeselectItem.bind(this);
    this.handleGetOptions = this.handleGetOptions.bind(this);
  }

  /**
   * Selects an item
   * pass it to parent (If any)
   *
   * @param {any} item
   * @memberof TagInput
   */
  handleSelectItem(item) {
    let { value } = this.props;

    value = value.push(item);

    // Sending the tags to parent
    this.props.onChange(value);
  }

  /**
   * Deselects an item
   * pass it to parent (If any)
   *
   * @param {any} item
   * @memberof TagInput
   */
  handleDeselectItem(item) {
    let { value } = this.props;

    const selectItemBy = item.key ? 'key' : 'id';
    const index = this.props.value.findIndex(selectedItem => item[selectItemBy] === selectedItem[selectItemBy]);

    if (index > -1) {
      value = value.splice(index, 1);
    }

    // Sending the tags to parent
    this.props.onChange(value);
  }

  fetchServer(query) {
    const { fetchUrl, httpHeaders } = this.props;

    this.setState({
      waiting: true
    });

    return new Promise((resolve, reject) => {
      let req = superagent.get(fetchUrl);
      // Setting the http headers
      Object.keys(httpHeaders).forEach((key) => {
        req.set(key, httpHeaders[key]);
      });

      req
        .accept('application/json')
        .query({ query: query })
        .end((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.body);
        });
    });
  }

  handleGetOptions(query = '', active = false) {
    if (active || this.state.data.some(field => field.label === query)) {
      return;
    }

    this.fetchServer(query)
      .then((res) => {
        this.setState({
          data: this.props.extractor(res),
          waiting: false
        });
      });
  }

  render() {
    const {
      data,
      waiting
    } = this.state;

    return (
      <TagContainer
        {...this.props}
        options={data}
        loading={waiting}
        selection={this.props.value}
        onSelect={this.handleSelectItem}
        onDeselect={this.handleDeselectItem}
        onHandleFetch={this.handleGetOptions}
      />
    );
  }
}

// default props
TagInput.defaultProps = {
  loading:              false,
  multiple:             true,
  filterable:           true,
  darkTheme:            false,

  className:            '',
  orderOptionsBy:       'title',
  label:                'Select Tags...',
  togglePosition:       'left',
  noOptionsMessage:     '',
  toggleSwitchStyle:    'search',
  fetchUrl:             '',

  optionGroupTitles:    [],
  options:              [],

  httpHeaders:          {},
  value:                new Immutable.List(),

  onHandleFetch:        function onHandleFetch() {},
  extractor:            data => data
};

// prop types checking
TagInput.propTypes = {
  loading:            PropTypes.bool,
  multiple:           PropTypes.bool,
  filterable:          PropTypes.bool,
  darkTheme:          PropTypes.bool,

  className:          PropTypes.string,
  orderOptionsBy:     PropTypes.string,
  label:              PropTypes.string,
  togglePosition:     PropTypes.string,
  noOptionsMessage:   PropTypes.string,
  toggleSwitchStyle:  PropTypes.string,
  fetchUrl:           PropTypes.string,

  options:            PropTypes.array,
  optionGroupTitles:  PropTypes.array,

  httpHeaders:        PropTypes.object,
  value:              PropTypes.instanceOf(Immutable.List).isRequired,

  onChange:           PropTypes.func.isRequired,
  onHandleFetch:      PropTypes.func,
  extractor:          PropTypes.func
};
