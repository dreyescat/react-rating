'use strict'

var React = require('react');
var Rating = require('./react-rating');

var elements = document.getElementsByClassName('rating');
for (var i = 0; i < elements.length; i++) {
  React.render(<Rating
//      full="fa fa-star"
//      empty="fa fa-star-o"
      start={0}
      stop={5}
      step={0.5} />, elements[i]);
} 
