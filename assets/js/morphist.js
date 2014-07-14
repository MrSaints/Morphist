/*!
 * Morphist v1.1.0 - Text Rotating Plugin for jQuery
 * https://github.com/MrSaints/Morphist
 *
 * Built on jQuery Boilerplate
 * http://jqueryboilerplate.com/
 *
 * Copyright 2014 Ian Lai and other contributors
 * Released under the MIT license
 * http://ian.mit-license.org/
 */!function(a,b,c,d){function g(b,c){this.element=a(b),this.settings=a.extend({},f,c),this._defaults=f,this._name=e,this.init()}var e="Morphist",f={animateIn:"bounceIn",animateOut:"rollOut",speed:2e3};g.prototype={init:function(){this.children=this.element.children(),this.element.addClass("morphist"),this.index=-1,this._cycle()},_animate:function(){var a=this;++this.index,this.prev=this.index,this.children.eq(this.index).addClass("animated "+this.settings.animateIn),setTimeout(function(){a._cycle()},this.settings.speed)},_cycle:function(){var b=this;return this.index+1===this.children.length&&(this.index=-1),"undefined"!=typeof this.prev&&null!==this.prev?(this.children.eq(this.prev).addClass(this.settings.animateOut).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){a(this).removeClass(),b._animate()}),void 0):(this._animate(),void 0)},setInAnimation:function(a){this.settings.animateIn=a},setOutAnimation:function(a){this.settings.animateOut=a}},a.fn[e]=function(b){var c=arguments;if(b===d||"object"==typeof b)return this.each(function(){a.data(this,"plugin_"+e)||a.data(this,"plugin_"+e,new g(this,b))});if("string"==typeof b&&"_"!==b[0]&&"init"!==b){var f;return this.each(function(){var d=a.data(this,"plugin_"+e);d instanceof g&&"function"==typeof d[b]&&(f=d[b].apply(d,Array.prototype.slice.call(c,1))),"destroy"===b&&a.data(this,"plugin_"+e,null)}),f!==d?f:this}}}(jQuery,window,document);