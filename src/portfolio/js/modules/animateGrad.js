/**
 * animateGradient
 * Animates a gradient.
 *
 * **Usage:**
 *
 * ```js
 * $.animateGradient(".jQuerySelector", [0, 0, 0], [0, 0, 0], 2000, 100, function () {});
 * $.animateGradient(".jQuerySelector", [0, 0, 0], [0, 0, 0], 2000, function () {});
 * $.animateGradient(".jQuerySelector", [0, 0, 0], [0, 0, 0], function () {});
 * ```
 *
 * @name animateGradient
 * @function
 * @param {jQuery|String} jQueryElement The jQuery element or selector.
 * @param {Array} top An array of values interpreted by `rgb()` and representing the top color.
 * @param {Array} bottom An array of values interpreted by `rgb()` and representing the bottom color.
 * @param {} duration The duration of animation in miliseconds (default: `1000`).
 * @param {} delay Delay of interval (default: `100`).
 * @param {Function} callback The callback function.
 */
$.animateGradient = function (jQueryElement, top, bottom, duration, delay, callback) {

    // if the jQuery element is a jQuery selector (string)
    // make it jQuery object
    if (typeof jQueryElement === "string") {
        jQueryElement = $(jQueryElement);
    }

    // the delay isn't provided
    if (typeof delay === "function") {
        callback = delay;
        delay = undefined;
    }

    // the duration and delay aren't provided
    if (typeof duration === "function") {
        callback = duration;
        duration = undefined;
    }

    // take the initial background of jQuery element
    var background = jQueryElement.css("background");
    background = background.substring(background.indexOf("gradient") + 8);

    // TODO top/bottom parameter of gradient?

    // find top color
    var topI = background.substring(background.indexOf("rgb") + 4);
    topI = topI.substring(0, topI.indexOf(")"));
    topI = topI.split(", ");
    // [r, g, b]

    // find bottom color
    var bottomI = background.substring(background.indexOf("), rgb") + 7);
    bottomI = bottomI.substring(0, bottomI.indexOf(")"));
    bottomI = bottomI.split(", ");
    // [r, g, b]

    var delta1 = [];
    var delta2 = [];

    var step1 = [];
    var step2 = [];

    duration = duration || 1000;
    delay = delay || 100;

    for (var i = 0; i < 3; ++i) {
        delta1.push(Math.abs(topI[i] - top[i]));
        delta2.push(Math.abs(bottomI[i] - bottom[i]));
    }

    for (var i = 0; i < 3; ++i) {
        step1.push(delta1[i] / (duration / delay));
        step2.push(delta2[i] / (duration / delay));
    }

    // set the timer
    var interval = setInterval(function () {

        var tempStep = {
            "top": topI,
            "bottom": bottomI
        };

        // change the values for rgb
        for (var i = 0; i < 3; ++i) {

            if (tempStep.top[i] < top[i]) {
                tempStep.top[i] = Math.floor(tempStep.top[i] + step1[i]);
            }
            else {
                tempStep.top[i] = Math.floor(tempStep.top[i] - step1[i]);
            }

            if (tempStep.bottom[i] < bottom[i]) {
                tempStep.bottom[i] = Math.floor(tempStep.bottom[i] + step2[i]);
            }
            else {
                tempStep.bottom[i] = Math.floor(tempStep.bottom[i] - step2[i]);
            }
        }

        // use jQuery to change the background
        var back1 = "-webkit-linear-gradient(rgb(" + tempStep.top.join(",") + "), rgb(" + tempStep.bottom.join(",") + "))";
        var back2 = "-moz-linear-gradient(rgb(" + tempStep.top.join(",") + "), rgb(" + tempStep.bottom.join(",") + "))";

        jQueryElement.css("background", back1);
        jQueryElement.css("background", back2);

    }, delay)

    // clear the interval when the timer is stopped
    setTimeout(function () {
        clearInterval(interval);
        callback();
    }, duration)
}

