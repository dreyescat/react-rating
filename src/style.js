'use strict';

var merge = require('./merge');

var style = {
  display: 'inline-block',
  borderRadius: '50%',
  border: '5px double white',
  width: 30,
  height: 30,
  cursor: 'pointer'
};

module.exports = {
  empty: merge(style, {
    backgroundColor: '#ccc'
  }),
  full: merge(style, {
    backgroundColor: 'black'
  })
};
