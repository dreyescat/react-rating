// Use expect BDD assertion style.
var expect = require('chai').expect;
var React = require('react');
var TestUtils = require('react-dom/test-utils');
var createRenderer = require('react-test-renderer/shallow').createRenderer;
import RatingContainer from '../src/RatingAPILayer';

var render = function (component) {
  var renderer = createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput()
};

describe('RatingContainer', function () {
  describe('with a stop range of 10', function () {
    var rating;

    beforeEach(function () {
      rating = render(<RatingContainer stop={10} />);
    });

    it('should render a 10 symbol rating', function () {
      expect(rating.props.totalSymbols).to.be.equal(10);
    });
  });

  describe('with a range (5, 10]', function () {
    var rating;

    beforeEach(function () {
      rating = render(<RatingContainer start={5} stop={10} />);
    });

    it('should render a 5 symbol rating', function () {
      expect(rating.props.totalSymbols).to.be.equal(5);
    });
  });

  describe('with a range (0, 0]', function () {
    var rating;

    beforeEach(function () {
      rating = render(<RatingContainer start={0} stop={0} />);
    });

    it('should render a 0 symbol rating', function () {
      expect(rating.props.totalSymbols).to.be.equal(0);
    });
  });

  describe('with a range (0, 10] step 2', function () {
    var rating;

    beforeEach(function () {
      rating = render(<RatingContainer start={0} stop={10} step={2} />);
    });

    it('should render a 5 symbol rating', function () {
      expect(rating.props.totalSymbols).to.be.equal(5);
    });
  });

  describe('with a range (10, 0] step -2', function () {
    var rating;

    beforeEach(function () {
      rating = render(<RatingContainer start={10} stop={0} step={-2} />);
    });

    it('should render a 5 symbol rating', function () {
      expect(rating.props.totalSymbols).to.be.equal(5);
    });
  });
});
