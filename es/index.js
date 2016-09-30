function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Typeahead from 'react-typeahead-component2';
import JSONP from 'jsonp';
import OptionsTemplate from './OptionsTemplate';
import YoutubeFinder from 'youtube-finder';

var googleAutoSuggestURL = '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=';

require('./styles.scss');

var YoutubeAutocomplete = function (_Component) {
  _inherits(YoutubeAutocomplete, _Component);

  function YoutubeAutocomplete(props) {
    _classCallCheck(this, YoutubeAutocomplete);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      inputValue: ''
    };
    return _this;
  }

  YoutubeAutocomplete.prototype.handleChange = function handleChange(event) {
    var self = this,
        query = event.target.value,
        url = googleAutoSuggestURL + query;

    this.setState({
      inputValue: query
    });

    JSONP(url, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        var searchResults = data[1];
        self.setState({
          options: searchResults
        });
      }
    });
  };

  YoutubeAutocomplete.prototype.onClick = function onClick(event, optionData) {
    var searchTerm = optionData[0];
    this.setState({
      inputValue: searchTerm
    });
  };

  YoutubeAutocomplete.prototype.onOptionChange = function onOptionChange(event, optionData, index) {
    var self = this,
        searchTerm = optionData[0],
        apiKey = this.props.apiKey,
        maxResults = this.props.maxResults ? this.props.maxResults : '50';

    this.setState({
      inputValue: searchTerm
    });
  };

  YoutubeAutocomplete.prototype.onDropDownClose = function onDropDownClose(event) {
    var self = this,
        searchTerm = this.state.inputValue,
        maxResults = this.props.maxResults <= 50 ? this.props.maxResults : '50',
        YoutubeClient = YoutubeFinder.createClient({ key: this.props.apiKey }),
        params = {
      part: 'id,snippet',
      type: 'video',
      q: searchTerm,
      maxResults: maxResults
    };

    YoutubeClient.search(params, function (error, results) {
      if (error) return console.log(error);
      self.props.callback(results.items);
    });
  };

  YoutubeAutocomplete.prototype.render = function render() {
    // React components using ES6 classes no longer autobind this to non React methods. In your constructor, add:
    // this.onChange = this.onChange.bind(this)
    // this is why you have to do onChange={this.handleChange.bind(this)}
    return React.createElement(
      'div',
      null,
      React.createElement(Typeahead, {
        inputValue: this.state.inputValue,
        placeholder: this.props.placeHolder,
        className: this.props.className,
        onChange: this.handleChange.bind(this),
        optionTemplate: OptionsTemplate,
        options: this.state.options,
        onOptionClick: this.onClick.bind(this),
        onOptionChange: this.onOptionChange.bind(this),
        onDropdownClose: this.onDropDownClose.bind(this)
      })
    );
  };

  return YoutubeAutocomplete;
}(Component);

export default YoutubeAutocomplete;