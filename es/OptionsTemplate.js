import React from 'react';

export default React.createClass({
  displayName: 'OptionsTemplate',

  render: function render() {
    var searchResult = this.props.data[0];
    return React.createElement(
      'div',
      null,
      searchResult
    );
  }
});