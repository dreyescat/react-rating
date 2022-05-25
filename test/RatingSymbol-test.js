// Use expect BDD assertion style.
var expect = require('chai').expect;
var React = require('react');
var TestUtils = require('react-dom/test-utils');
var createRenderer = require('react-test-renderer/shallow').createRenderer;
import RatingSymbol from '../src/RatingSymbol';

var render = function (component) {
  var renderer = createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput()
};

describe('RatingSymbol', function () {
  describe('with inline object icon and background', function () {
    var symbol,
      Style = require('../src/utils/style.js').default,
      icon = Style.full,
      background= Style.empty;

    beforeEach(function () {
      symbol = render(
        <RatingSymbol activeIcon={icon} inactiveIcon={background} />
      );
    });

    it('should have inline styled background', function () {
      var backgroundNode = symbol.props.children[0];
      expect(backgroundNode.props.children.props.style).to.be.equal(background);
    });

    it('should have inline styled foreground', function () {
      var iconNode = symbol.props.children[1];
      expect(iconNode.props.children.props.style).to.be.equal(icon);
    });

    it('should show pointer cursor', function () {
      expect(symbol.props.style.cursor).to.be.equal('pointer');
    });
  });

  describe('with class name icon and background', function () {
    var symbol,
      icon = 'fa fa-star fa-2x',
      background = 'fa fa-star-o fa-2x';

    beforeEach(function () {
      symbol = render(<RatingSymbol activeIcon={icon} inactiveIcon={background} />);
    });

    it('should have class styled background', function () {
      var backgroundNode = symbol.props.children[0];
      expect(backgroundNode.props.children.props.className).to.contain(background);
    });

    it('should have class styled foreground', function () {
      var iconNode = symbol.props.children[1].props.children;
      expect(iconNode.props.className).to.contain(icon);
    });
  });

  describe('with React element icon and background', function () {
    var symbol;

    beforeEach(function () {
      symbol = render(<RatingSymbol icon={<span>+</span>} background={<span>-</span>} />);
    });

    it('should have a React element background', function () {
      var backgroundNode = symbol.props.children[0];
      expect(TestUtils.isElement(backgroundNode));
    });

    it('should have a React element foreground', function () {
      var foregroundNode = symbol.props.children[0];
      expect(TestUtils.isElement(foregroundNode));
    });
  });

  describe('with 25 percent icon', function () {
    var symbol,
      Style = require('../src/utils/style.js').default,
      icon = Style.full,
      background= Style.empty;

    beforeEach(function () {
      symbol = render(<RatingSymbol
        icon={icon}
        background={background}
        percent={25} />);
    });

    it('should show 25% icon width', function () {
      var iconContainerNode = symbol.props.children[1];
      expect(iconContainerNode.props.style.width).to.be.equal('25%');
    });
  });

  describe('readonly', function () {
    var symbol,
      Style = require('../src/utils/style.js').default,
      icon = Style.full,
      background= Style.empty;

    beforeEach(function () {
      symbol = render(
        <RatingSymbol icon={icon} background={background} readonly />
      );
    });

    it('should show auto cursor', function () {
      expect(symbol.props.style.cursor).to.be.equal('not-allowed');
    });
  });

});
