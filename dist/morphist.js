/*!
 * Morphist - Generic Rotating Plugin for jQuery
 * https://github.com/MrSaints/Morphist
 *
 * Built on jQuery Boilerplate
 * http://jqueryboilerplate.com/
 *
 * Copyright 2016 Ian Lai and other contributors
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
			sync: false,
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
            this._animationEnd = "webkitAnimationEnd mozAnimationEnd " +
                                "MSAnimationEnd oanimationend animationend";

            this.children = this.element.children();
			if (this.settings.sync && this.children[0]) {
				this.element.addClass("sync").height(this.children[0].clientHeight + "px");
			}
            this.element.addClass("morphist");

            this.index = 0;
            this.loop();
        },
        _shouldForceReflow: function ($elem) {
            if (this.settings.animateIn === this.settings.animateOut) {
                /*eslint-disable */
                $elem[0].offsetWidth;
                /*eslint-enable */
            }
        },
        _animate: function ($elem, $classes, $cb) {
            $elem.addClass("animated " + $classes)
                .one(this._animationEnd, $cb);
        },
        loop: function () {
            var $that = this;
            var $current = this.children.eq(this.index);

            var $animateOut = function () {
                $that.timeout = setTimeout(function () {
                    $current.removeClass();
                    $that._shouldForceReflow($current);

					$that.index = ++$that.index % $that.children.length;
                    $that._animate(
                        $current,
                        "mis-out " + $that.settings.animateOut,
                        function () {
                            $current.removeClass();
                            if (!$that.settings.sync) $that.loop();
                        }
                    );
					if ($that.settings.sync) $that.loop();
                }, $that.settings.speed);
            };

            this._animate(
                $current,
                "mis-in " + this.settings.animateIn,
                function () {
                    $animateOut();

                    if ($.isFunction($that.settings.complete)) {
                        $that.settings.complete.call($that);
                    }
                }
            );
        },
        stop: function () {
            clearTimeout(this.timeout);
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
