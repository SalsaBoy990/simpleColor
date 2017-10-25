/*! simpleColors v1.0 | (c) Andras Gulacsi 2017 | MIT license
 * You have to include jQuery first to use this library!
 */
(function() {
    "use strict";
    /* An rgb object with color properties. */
    var rgb = {
        red: 0,
        green: 0,
        blue: 0,
        hex: ""
    };

    /* Converts the argument into hexadecimal format. */
    function componentToHex(a) {
        var hex = a.toString(16); 
        return (hex.length === 1) ? ("0" + hex) : hex; 
    };

    /* RGB to Hex conversion. */
    function rgbToHex(r, g, b) { 
        return "#" +
            componentToHex(r) +
            componentToHex(g) +
            componentToHex(b)
            ;
    }

    /* Inverts color. */
    function invert(a) { return (255 - a); };

    /* Calculates original and inverted colors. */
    function calculateColors() {
        return [
            rgbToHex(rgb.red, rgb.green, rgb.blue),
            rgbToHex(invert(rgb.red), invert(rgb.green), invert(rgb.blue))
        ];
    }

    /* Reads values from input and checks if user input was correct. */
    function inputColor(r, g, b, msg) {
        rgb.red = checkInput(document.getElementById(r), msg) || 0;
        rgb.green = checkInput(document.getElementById(g), msg) || 0;
        rgb.blue = checkInput(document.getElementById(b), msg) || 0;
    }

    /* Checks RGB input. */
    function checkInput(a, msg) {
        var error = document.getElementById(msg);
        try {
            if(parseInt(a.value, 10) >= 0) {
                var tmp = parseInt(a.value, 10) || 0;
                if (tmp <= 255) {
                    return tmp;
                }
                else {
                    throw new Error("Valid range is between 0 and 255. Give it again!");
                }
            }
            else {
                throw new Error ("Wrong input type (not a number) or you didn't fill in the form field.");
            }
        }
        catch(e) {
            error.innerHTML = e;
            return;
        }
    }

    /* Hex value to RGB conversion. If no error, returns an object. */
    function hexToRgb(msg) {
        /* If it finds a match with this regexp, it returns an array */
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgb.hex);
        console.log(result);
        var obj = result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
            : null;
        
        if (obj === null) {
            var error = document.getElementById(msg);
            /* If the input contains illegal characters.
               Other errors are caught by checkHexInput. */
            if (error.innerHTML === "") {
                error.innerHTML = "The Hex code you supplied contains illegal characters. Give it again!";
            }
            return;
        }
        else {
            return obj;
        }
    };

    /* Checks if Hex code input is correct. */
    function checkHexInput(hex, msg) {
        try {
            if (hex.value[0] !== "#") {
                throw new Error("Missing # at the start of the Hex code. Give it again!");
            }
            else if ((hex.value.length - 1) !== 6) {
                throw new Error("Hex code consists of 6 numbers. "
                    + "You supplied " + (hex.value.length - 1) + " numbers. Give it again!");
            }
            else {
                return hex.value;
            }
        }
        catch(e) {
            var error = document.getElementById(msg);
            error.innerHTML = e;
            return;      
        }
    }

    /* Gets Hex code from input. */
    function inputHex(id, msg) {
        var hex = document.getElementById(id);
        rgb.hex = checkHexInput(hex, msg) || 0;
    }

    /* jQuery code here. */
    $(document).ready(function() {
        $(":text").focusin(function() {
            $(this).css("background-color", "cornsilk");
        }).blur(function() {
            $(this).css("background-color", "#fff");
        });

        /* Coloring the boxes after click event. */
        $("#color-button").click(function() {
            inputColor("red", "green", "blue", "msg-1");
            var array = [];
            array = calculateColors();
            console.log(array[0] + " " + array[1]);
            var original = array[0];
            var inverted = array[1];
            var msg = $("#msg-1");
            msg.delay(4000).fadeOut("slow", function() {
                msg.html("").css('display', 'block')
            });
            
            $("#original").html(original)
                .css("background-color", original)
                .css("color", inverted);

            $("#inverted").html(inverted)
                .css("background-color", inverted)
                .css("color", original);
        });

        $("#hex-button").click(function() {
            inputHex("hex", "msg-2");
            var result = hexToRgb("msg-2");
            var string = (result)
                ? 
                "rgb(" + result.r + ", " + result.g + ", " + result.b + ")"
                :
                "rgb(0, 0, 0)";
            $("#output").html(string);
            var msg = $("#msg-2");
            if(msg !== "") {
                msg.delay(4000).fadeOut("slow", function() {
                    msg.html("").css("display", "block")
                });
            }
        });

        $("#delete-button").click(function() {
            $(".smallbox").css("background-color", "#fff").text("");
        });

        $("#switch-button").click(function() {
            var inverted = $("#inverted").css("background-color");
            var original = $("#original").css("background-color");
            var textInverted = $("#inverted").text();
            var textOriginal = $("#original").text();

            $("#inverted").css("background-color", original);
            $("#inverted").css("color", inverted);

            $("#original").css("background-color", inverted);
            $("#original").css("color", original);

            $("#inverted").html(textOriginal);
            $("#original").html(textInverted);
        });
    });
})();