Morphist
========

A simple jQuery slider / slideshow / carousel plugin for child objects powered by Animate.css and inspired by a Dota 2 hero, Morphling. 
It is a spin-off project of [Morphext](https://github.com/MrSaints/Morphext).

[Website / Demo](http://morphist.fyianlai.com/)


Install
-------

Download from the [project page](https://github.com/MrSaints/Morphist).

Install with [Bower](http://bower.io/): `bower install --save Morphist`


Usage
-----

1. Import the latest Animate.css and jQuery library into your HTML.

2. Import `morphist.css` and include `morphist.min.js` in your HTML document.

3. Encapsulate your rotating objects (children) in an element (parent):

        I am a...
        <ul id="js-rotating">
            <li>So Simple</li>
            <li>Very Doge</li>
            <li>Much Wow</li>
            <li>Such Cool</li>
        </ul>
        ...child object rotator.

4. Trigger the plugin by calling Morphist() on the element (parent) containing the rotating objects (children):

        $("#js-rotating").Morphist({
            // Animation type (refer to Animate.css for a list of available animations)
            animateIn: 'tada',
            animateOut: 'bounceOut',
            // The delay between each child object
            speed: 2000
        });


Prerequisites
-------------
- [jQuery](http://www.jquery.com/)
- [Animate.css](http://daneden.github.io/animate.css/)


License
-------
Morphist is licensed under the MIT license [(http://ian.mit-license.org/)](http://ian.mit-license.org/).
