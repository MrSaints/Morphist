/*!
 * Morphist - Generic Rotating Plugin for jQuery
 * https://github.com/MrSaints/Morphist
 *
 * Built on jQuery Boilerplate
 * http://jqueryboilerplate.com/
 *
 * Copyright 2014 Ian Lai and other contributors
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
            speed: 2000
        };

    function Plugin (element, options) {
        this.element = $(element);

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.children = this.element.children();
            this.element.addClass("morphist");
            this.index = -1;
            this.cycle();
        },
        animate: function () {
            var $that = this;

            ++this.index;
            this.prev = this.index;

            this.children.eq(this.index).addClass("animated " + this.settings.animateIn);

            setTimeout(function () {
                $that.cycle();
            }, this.settings.speed);
        },
        cycle: function () {
            var $that = this;

            if ((this.index + 1) === this.children.length) {
                this.index = -1;
            }

            if (typeof this.prev !== "undefined" && this.prev !== null) {
                this.children.eq(this.prev)
                    .removeClass(this.settings.animateIn)
                    .addClass(this.settings.animateOut)
                    .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass();
                        $that.animate();
                    });
                return;
            }

            this.animate();
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
