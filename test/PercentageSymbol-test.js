// Use expect BDD assertion style.
var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var PercentageSymbol = require('../src/PercentageSymbol');

var render = function (component) {
  var renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput()
};

describe('PercentageSymbol', function () {
  describe('with inline icon and background style', function () {
    var symbol,
        Style = require('../src/style.js'),
        icon = Style.full,
        background= Style.empty;

    beforeEach(function () {
      symbol = render(<PercentageSymbol icon={icon} background={background} />);
    });

    it('should have inline styled background', function () {
      var backgroundNode = symbol.props.children[0];
      expect(backgroundNode.props.style).to.be.equal(background);
    });

    it('should have inline styled icon', function () {
      var iconNode = symbol.props.children[1].props.children;
      expect(iconNode.props.style).to.be.equal(icon);
    });

    it('should show whole icon over background', function () {
      var iconContainerNode = symbol.props.children[1];
      expect(iconContainerNode.props.style.width).to.be.equal('auto');
    });
  });

  describe('with class name icon and background style', function () {
    var symbol,
        icon = 'fa fa-star fa-2x',
        background = 'fa fa-star-o fa-2x';

    beforeEach(function () {
      symbol = render(<PercentageSymbol icon={icon} background={background} />);
    });

    it('should have class styled background', function () {
      var backgroundNode = symbol.props.children[0];
      expect(backgroundNode.props.className).to.contain(background);
    });

    it('should have class styled icon', function () {
      var iconNode = symbol.props.children[1].props.children;
      expect(iconNode.props.className).to.contain(icon);
    });
  });

  describe('with 25 percent icon', function () {
    var symbol,
        Style = require('../src/style.js'),
        icon = Style.full,
        background= Style.empty;

    beforeEach(function () {
      symbol = render(<PercentageSymbol
        icon={icon}
        background={background}
        percent={25} />);
    });

    it('should show 25% icon width', function () {
      var iconContainerNode = symbol.props.children[1];
      expect(iconContainerNode.props.style.width).to.be.equal('25%');
    });
  });
});

