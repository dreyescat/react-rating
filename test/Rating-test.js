// Use expect BDD assertion style.
var expect = require('chai').expect;
var React = require('react');
var TestUtils = require('react-dom/test-utils');
var Rating = require('../src/Rating');

var render = function (component) {
  var renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput()
};

describe('Rating', function () {
  describe('with default properties', function () {
    var rating;

    beforeEach(function () {
      rating = render(<Rating />);
    });

    it('should render a 5 symbol rating', function () {
      var Symbol = require('../src/PercentageSymbol');
      var children = rating.props.children;
      var symbols = children.filter(function (child) {
        return TestUtils.isElementOfType(child, Symbol);
      });
      expect(children).to.have.same.length(symbols.length).which.is.length(5);
    });

    it('should have all symbols empty', function () {
      rating.props.children.forEach(function (symbol) {
        expect(symbol.props.percent).to.be.equal(0);
      });
    });

    it('should have all symbols background set to empty', function () {
      var Style = require('../src/style');
      rating.props.children.forEach(function (symbol) {
        expect(symbol.props.background).to.be.equal(Style.empty);
      });
    });

    it('should have all symbols icon set to full', function () {
      var Style = require('../src/style');
      rating.props.children.forEach(function (symbol) {
        expect(symbol.props.icon).to.be.equal(Style.full);
      });
    });
  });

  describe('with an initial rate of 3', function () {
    var rating;

    beforeEach(function () {
      rating = render(<Rating initialRate={3} />);
    });

    it('should render a 5 symbol rating with the 3 first symbols full', function () {
      rating.props.children.forEach(function (symbol, i) {
        expect(symbol.props.percent).to.be.equal(i < 3 ? 100 : 0);
      });
    });
  });

  describe('that is readonly', function () {
    var rating;

    beforeEach(function () {
      rating = render(<Rating readonly={true} />);
    });

    it('should not have mouse move handler', function () {
      rating.props.children.forEach(function (symbol, i) {
        expect(symbol.props.onMouseMove).to.be.false;
      });
    });

    it('should not have click handler', function () {
      rating.props.children.forEach(function (symbol, i) {
        expect(symbol.props.onClick).to.be.false;
      });
    });

    it('should not have mouse leave handler', function () {
      expect(rating.props.onMouseLeave).to.be.false;
    });
  });
  /////////////////////////////////////////////////////////////////////////////
  // Range
  /////////////////////////////////////////////////////////////////////////////
  describe('with a stop range of 10', function () {
    var rating;

    beforeEach(function () {
      rating = render(<Rating stop={10} />);
    });

    it('should render a 10 symbol rating', function () {
      expect(rating.props.children).to.have.length(10);
    });
  });

  describe('with a range (5, 10]', function () {
    var rating;

    beforeEach(function () {
      rating = render(<Rating start={5} stop={10} />);
    });

    it('should render a 5 symbol rating', function () {
      expect(rating.props.children).to.have.length(5);
    });
  });

  describe('with a range (0, 0]', function () {
    var rating;

    beforeEach(function () {
      rating = render(<Rating start={0} stop={0} />);
    });

    it('should render a 0 symbol rating', function () {
      expect(rating.props.children).to.have.length(0);
    });
  });

  describe('with a range (0, 10] step 2', function () {
    var rating;

    beforeEach(function () {
      rating = render(<Rating start={0} stop={10} step={2} />);
    });

    it('should render a 5 symbol rating', function () {
      expect(rating.props.children).to.have.length(5);
    });
  });

  describe('with a range (10, 0] step -2', function () {
    var rating;

    beforeEach(function () {
      rating = render(<Rating start={10} stop={0} step={-2} />);
    });

    it('should render a 5 symbol rating', function () {
      expect(rating.props.children).to.have.length(5);
    });
  });

  /////////////////////////////////////////////////////////////////////////////
  // Custom symbol style
  /////////////////////////////////////////////////////////////////////////////
  describe('with custom class name style', function () {
    var rating,
        empty = 'fa fa-star-o fa-2x',
        full = 'fa fa-star fa-2x';

    beforeEach(function () {
      rating = render(<Rating empty={empty} full={full} />);
    });

    it('should render all symbols with custom style', function () {
      rating.props.children.forEach(function (symbol) {
        expect(symbol.props.icon).to.be.equal(full);
        expect(symbol.props.background).to.be.equal(empty);
      });
    });
  });

  describe('with custom inline style', function () {
    var rating,
        Style = require('../src/style'),
        empty = Style.empty,
        full = Style.full;

    beforeEach(function () {
      rating = render(<Rating empty={empty} full={full} />);
    });

    it('should render all symbols with custom style', function () {
      rating.props.children.forEach(function (symbol) {
        expect(symbol.props.icon).to.be.equal(full);
        expect(symbol.props.background).to.be.equal(empty);
      });
    });
  });

  describe('with custom list of class name styles', function () {
    var rating,
        empty = ['fa fa-star-o fa-2x', 'fa fa-heart-o fa-2x'],
        full = ['fa fa-star fa-2x', 'fa fa-heart-o fa-2x'];

    beforeEach(function () {
      rating = render(<Rating start={0} stop={6} empty={empty} full={full} />);
    });

    it('should render symbols with circular custom style', function () {
      rating.props.children.forEach(function (symbol, i) {
        expect(symbol.props.icon).to.be.equal(full[i % 2]);
        expect(symbol.props.background).to.be.equal(empty[i % 2]);
      });
    });
  });
});

