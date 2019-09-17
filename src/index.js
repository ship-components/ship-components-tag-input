import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
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
    this.handleFetchOptions = this.handleFetchOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.options
    });
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

    if (!this.props.multiple && !value.size == 0) {
      // clear existing selection and send the tags to parent
      this.props.onChange(new List().push(item));
    } else {
      value = this.props.invert ? value.unshift(item) : value = value.push(item);

      // Sending the tags to parent
      this.props.onChange(value);
    }
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

  fetchOptions(query) {
    this.setState({
      waiting: true
    });

    // do a user-provided fetch
    if (typeof this.props.fetchOptions === 'function') {
      return this.props.fetchOptions(query);
    }

    // do a fetch with user-provided url + headers
    const { fetchUrl, httpHeaders } = this.props;
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

  handleFetchOptions(query = '', dropdownOpen = false) {
    if (dropdownOpen || this.state.data.some(field => field.label === query)) {
      return;
    }

    this.fetchOptions(query)
      .then((res) => {
        this.setState({
          data: this.props.extractor(res)
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setState({
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
        onFetchOptions={this.handleFetchOptions}
      />
    );
  }
}

// default props
TagInput.defaultProps = {
  loading: false,
  multiple: true,
  filterable: true,
  darkTheme: false,
  invert: false,

  className: '',
  orderOptionsBy: 'title',
  label: 'Select Tags...',
  togglePosition: 'left',
  noOptionsMessage: '',
  toggleSwitchStyle: 'search',
  fetchUrl: '',
  fetchOptions: void 0,


  optionGroupTitles: [],
  options: [],

  httpHeaders: {},
  value: new List(),

  onFetchOptions: void 0,
  extractor: data => data
};

// prop types checking
TagInput.propTypes = {
  loading: PropTypes.bool,
  multiple: PropTypes.bool,
  filterable: PropTypes.bool,
  darkTheme: PropTypes.bool,

  className: PropTypes.string,
  orderOptionsBy: PropTypes.string,
  label: PropTypes.string,
  togglePosition: PropTypes.oneOf(['right', 'left']),
  noOptionsMessage: PropTypes.string,
  toggleSwitchStyle: PropTypes.string,
  fetchUrl: PropTypes.string,
  fetchOptions: PropTypes.func,
  invert: PropTypes.bool,

  options: PropTypes.array,
  optionGroupTitles: PropTypes.array,

  httpHeaders: PropTypes.object,
  value: PropTypes.instanceOf(List).isRequired,

  onChange: PropTypes.func.isRequired,
  onFetchOptions: PropTypes.func,
  extractor: PropTypes.func
};
