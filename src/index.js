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
      selection: new Immutable.List(),
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
    let selection = this.state.selection.slice(0);
    selection = selection.push(item);

    this.setState({
      selection: selection
    }, () => {
      // Sending the tags to parent
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.selection);
      }
    });
  }

  /**
   * Deselects an item
   * pass it to parent (If any)
   *
   * @param {any} item
   * @memberof TagInput
   */
  handleDeselectItem(item) {
    let { selection } = this.state;
    const selectItemBy = item.key ? 'key' : 'id';
    const index = selection.findIndex(selectedItem => item[selectItemBy] === selectedItem[selectItemBy]);

    if (index > -1) {
      selection = selection.splice(index, 1);
      this.setState({
        selection: selection
      }, () => {
        // Sending the tags to parent
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selection);
        }
      });
    }

    // Sending the tags to parent
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.selection);
    }
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
      waiting,
      selection
    } = this.state;

    return (
      <TagContainer
        {...this.props}
        options={data}
        loading={waiting}
        selection={selection}
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

  onHandleFetch:        function onHandleFetch() {},
  extractor:            data => data
};

// prop types checking
TagInput.propTypes = {
  loading:            PropTypes.bool,
  multiple:           PropTypes.bool,
  filterable:         PropTypes.bool,
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

  onChange:           PropTypes.func.isRequired,
  onHandleFetch:      PropTypes.func,
  extractor:          PropTypes.func
};
