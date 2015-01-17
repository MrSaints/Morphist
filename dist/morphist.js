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
            this.cycle();
        },
        cycle: function () {
            var $that = this;
            this._animateIn();

            this._timeout = setTimeout(function () {
                $that._animateOut()
                    .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd" +
                        "oanimationend animationend", function () {
                        $(this).removeClass();
                        if ($that.index + 1 === $that.children.length) {
                            $that.index = -1;
                        }
                        ++$that.index;
                        $that.cycle();
                    });
            }, this.settings.speed);

            if ($.isFunction(this.settings.complete)) {
                this.settings.complete.call(this);
            }
        },
        stop: function () {
            clearTimeout(this._timeout);
        },
        _animateIn: function () {
            return this.children.eq(this.index)
                        .addClass("animated " + this.settings.animateIn);
        },
        _animateOut: function () {
            var element = this.children.eq(this.index);
            element.removeClass();
            if (this.settings.animateIn === this.settings.animateOut) {
                element[0].offsetWidth = element[0].offsetWidth;
            }
            return element.addClass("animated " + this.settings.animateOut);
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
