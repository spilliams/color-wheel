I made this jQuery plugin to help me generate a palette that had specific requirements. Maybe you find it helpful too.

#Installation

Make sure you include jQuery (>=1.7) in your header, as well as any other js or css files found here.
**THIS PLUGIN CURRENTLY ONLY HAS SUPPORT FOR CHROME** (if it works in any other browsers that's super sweet, but not intended. This will change in subsequent versions)

#API

You can make a simple hsl color wheel by putting some `<div class='colorwheel'></div>` in your html, and some `$('.colorwheel').colorWheel()` in your script. You can even pass it options to make it fancier!

##Options

<table>
  <tr>
    <th>option</th>
    <th>type</th>
    <th>default</th>
    <th>description</th>
  </tr>
  <tr>
    <td>radius</td>
    <td>integer (pixels)</td>
    <td>100</td>
    <td>The radius of the wheel, in pixels.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>string (see description)</td>
    <td>"hsl"</td>
    <td>The type of wheel. May be any permutation of "hsl" or "rgb". The first character denotes what the degree varies and the second refers to what the radius varies. The third is varied by a slider placed below the wheel.</td>
  </tr>
  <tr>
    <td>bg</td>
    <td>string (color)</td>
    <td>"transparent"</td>
    <td>The color of the background of the circle.</td>
  </tr>
  <tr>
    <td>showPicker</td>
    <td>boolean</td>
    <td>false</td>
    <td>Whether or not to show the picker on initialization</td>
  </tr>
  <tr>
    <td>picker</td>
    <td>string or array</td>
    <td>"single"</td>
    <td>Specifies the type of picker. Standard types are supported, or you may use your own picker format (see below for details).
  </tr>
</table>

###Picker Formats

This plugin includes several predefined color pickers, each of which is essentially a call to the `custom` picker with a specific format. You can make your own custom pickers by providing a format in the initial call (`$(foo).colorWheel({"picker":bar})`), or by passing it to a `showPicker` call (`$(foo).colorWheel('showPicker',bar)`). In these examples, `bar` is the format of the custom picker.

A picker format consists of an array of integers referring to the degrees of separation between the cursor and the picked color. Here are the formats of the standard pickers:

<table>
  <tr><th>type</th><th>format</th></tr>
  <tr><td>single</td><td>[0]</td></tr>
  <tr><td>complementary</td><td>[0, 180]</td></tr>
  <tr><td>split-complementary</td><td>[0, -150, 150]</td></tr>
  <tr><td>analogous</td><td>[0, -30, 30]</td></tr>
  <tr><td>accented-analogous</td><td>[0, -30, 30, 180]</td></tr>
  <tr><td>triadic</td><td>[0, 120, 240]</td></tr>
  <tr><td>tetradic</td><td>[0, 60, 180, 240]</td></tr>
  <tr><td>square</td><td>[0, 90, 180, 270]</td></tr>
</table>

Note that all picked colors will be at the same radius in the wheel.


##Methods

<table>
  <tr>
    <th>name</th>
    <th>options</th>
    <th>description</th>
  </tr>
  <tr>
    <td>showPicker</td>
    <td>{picker, radius, slider}</td>
    <td>Shows the picker. (Shows the picked colors in separate swatches, and highlights them on the wheel). <code>picker</code> is a string or array (see the <code>picker</code> option above). Note that arguments are optional. A call to this method without arguments will attempt to show a picker that was previously hidden.</td>
  </tr>
  <tr>
    <td>hidePicker</td>
    <td></td>
    <td>Hides the picker.</td>
  </tr>
  <tr>
    <td>pick</td>
    <td>{degrees, radius, slider}</td>
    <td>Picks points at specified coordinates. <code>degrees</code> is an array of integers referring to the degree values of the points.</td>
  </tr>
  <tr>
    <td>makeWheel</td>
    <td>object</td>
    <td>Takes the same options as the initializer. This generates a table of cells 1px square, each colored according to the options</td>
  </tr>
</table>

#Roadmap

1.1:

- support other browsers
- craft an example page, put it on the web
- order swatches on purpose somehow

1.0:

- <strike>create wheels of all kinds</strike>
- <strike>pick colors based on format</strike>
- bind slider to update wheel
- bind mouse events
- replace slider with fancy slider (with gradient background)
