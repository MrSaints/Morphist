/*!
 * Morphist - Generic Rotating Plugin for jQuery
 * https://github.com/MrSaints/Morphist
 *
 * Built on jQuery Boilerplate
 * http://jqueryboilerplate.com/
 *
 * Copyright 2015 Ian Lai and other contributors
 * Released under the MIT license
 * http://ian.mit-license.org/
 */

/*eslint-env browser */
/*global jQuery:false */
/*eslint-disable no-underscore-dangle */

(function ($) {
    "use strict";

    var pluginName = "Morphist",
        defaults = {
            animateIn: "bounceIn",
            animateOut: "rollOut",
            speed: 2000,
            complete: $.noop
        };

    function Plugin (element, options) {
        this.element = $(element);

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._init();
    }

    Plugin.prototype = {
        _init: function () {
            this.children = this.element.children();
            this.element.addClass("morphist");

            this.index = 0;
            this.loop();
        },
        loop: function () {
            var $that = this;

            this._animateIn();
            this.timeout = setTimeout(function () {
                var elem = $that._animateOut();
                $that._attachOutListener(elem);
            }, this.settings.speed);

            if ($.isFunction(this.settings.complete)) {
                this.settings.complete.call(this);
            }
        },
        _attachOutListener: function ($elem) {
            var $that = this;

            $elem.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd" +
                        "oanimationend animationend", function () {
                if ($elem.hasClass("mis-out")) {
                    $elem.removeClass();
                    $that.index = ++$that.index % $that.children.length;
                    $that.loop();
                }
            });
        },
        stop: function () {
            clearTimeout(this.timeout);
        },
        _animateIn: function () {
            return this.children.eq(this.index)
                        .addClass("animated mis-in " + this.settings.animateIn);
        },
        _animateOut: function () {
            var element = this.children.eq(this.index);
            element.removeClass();
            if (this.settings.animateIn === this.settings.animateOut) {
                /*eslint-disable */
                element[0].offsetWidth;
                /*eslint-enable */
            }
            return element.addClass("animated mis-out " + this.settings.animateOut);
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery);
