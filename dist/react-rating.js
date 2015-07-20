!function(e){function t(r){if(s[r])return s[r].exports;var o=s[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var s={};return t.m=e,t.c=s,t.p="/dist",t(0)}([/*!******************************!*\
  !*** ./src/react-rating.jsx ***!
  \******************************/
function(e,t,s){"use strict";var r=s(/*! react */3),o=s(/*! ./style */2),n=r.createClass({displayName:"Symbol",render:function(){return r.createElement("span",{onMouseDown:this.props.onMouseDown},r.createElement("span",{style:this.props.style,className:this.props.className}))}}),p=r.createClass({displayName:"Rating",propTypes:{start:r.PropTypes.number,stop:r.PropTypes.number,step:r.PropTypes.number,empty:r.PropTypes.oneOfType([r.PropTypes.string,r.PropTypes.object]),full:r.PropTypes.oneOfType([r.PropTypes.string,r.PropTypes.object]),onChange:r.PropTypes.func},getDefaultProps:function(){return{start:1,stop:5,step:1,empty:o.empty,full:o.full,onChange:function(e){}}},getInitialState:function(){return{index:void 0}},handleMouseDown:function(e){var t=this.state.index;this.setState({index:e}),t!==e&&this.props.onChange(this._indexToRate(e)),console.log(this._indexToRate(e))},_indexToRate:function(e){return this.props.start+e*this.props.step},_rateToIndex:function(e){return(e-this.props.start)/this.props.step},render:function(){for(var e=[],t=0;t<=this._rateToIndex(this.props.stop);t++){var s=t<=this.state.index?this.props.full:this.props.empty,o="string"==typeof s?s:"",p="object"==typeof s?s:{};e.push(r.createElement(n,{key:t,className:o,style:p,onMouseDown:this.handleMouseDown.bind(this,t)}))}return r.createElement("div",null,e)}});e.exports=window.Rating=p},/*!**********************!*\
  !*** ./src/merge.js ***!
  \**********************/
function(e,t){"use strict";e.exports=function(){for(var e={},t=0;t<arguments.length;t++){var s=arguments[t];for(var r in s)e[r]=s[r]}return e}},/*!**********************!*\
  !*** ./src/style.js ***!
  \**********************/
function(e,t,s){"use strict";var r=s(/*! ./merge */1),o={display:"inline-block",borderRadius:"50%",border:"5px double white",width:30,height:30,cursor:"pointer"};e.exports={empty:r(o,{backgroundColor:"#ccc"}),full:r(o,{backgroundColor:"black"})}},/*!************************!*\
  !*** external "React" ***!
  \************************/
function(e,t){e.exports=React}]);
//# sourceMappingURL=react-rating.js.map