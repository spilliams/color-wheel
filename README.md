I made this jQuery plugin to help me generate a palette that had specific requirements. Maybe you find it helpful too.

#Installation

Make sure you include jQuery (>=1.7) in your header, as well as any other js or css files found here

#API

You can make a simple hsl color wheel by putting some `<div class='cw'></div>` in your html, and some `$('.cw').colorWheel()` in your script. Hooray! You can pass it options to make it fancier!

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
    <td>The type of wheel. May be any permutation of "hsl" or "rgb". The first letter denotes what the degree varies, and the second character refers to what the radius varies.</td>
  </tr>
  <tr>
    <td>bg</td>
    <td>string (color)</td>
    <td>"transparent"</td>
    <td>The background of the circle</td>
  </tr>
</table>