/*
 * Created in February 2012 by Spencer Williams <s@spencerenglish.com>.
 * Use at your own peril. This code is available unlicensed.
 * github.com/spilliams/color-wheel.
 */

(function(){
  $.fn.colorWheel = function(options) {
    var defaults = {
      radius: 100,
      type: 'hsl',      // any permutation of 'hsl' or 'rgb'
      bg: "transparent" // any valid color. hex, rgb, hsl etc
    };
    var options = $.extend(defaults,options)
    return this.each(function() {
      obj = $(this);
      
      r = options.radius
      
      table = "<table class='cw'><tbody>"
      originX=r;
      originY=r;
      for (i=0;i<(2*r);i++) {
        table += "<tr>"
        for (j=0;j<(2*r);j++) {
          // map cartesian to polar...
          opposite = i-originY;
          adjacent = j-originX;
          degrees  = Math.atan2(opposite,adjacent)*(180/Math.PI);
          degreesShift = degrees+180;
          radius   = Math.sqrt(Math.pow(opposite,2)+Math.pow(adjacent,2));
          inCircle = radius < r
          degreesRGB = Math.round((degreesShift/360)*255)
          radiusRGB = Math.round((radius/r)*255)
          switch(options.type)
          {
            // the first character refers to degrees in the circle
            // the second refers to radius
            // the third is controlled via slider
            case 'hsl':
              bg = "hsl("+degrees+","+((radius/r)*100)+"%,50%)";
              break;
            case 'hls':
              bg = "hsl("+degrees+",50%,"+((radius/r)*100)+"%)";
              break;
            case 'lsh':
              bg = "hsl(0,"+((radius/r)*100)+"%,"+((degreesShift/360)*100)+"%)";
              break;
            case 'lhs':
              bg = "hsl("+((radius/r)*360)+",50%,"+((degreesShift/360)*100)+"%)";
              break;
            case 'slh':
              bg = "hsl(0,"+((degreesShift/360)*100)+"%,"+((radius/r)*100)+"%)";
              break;
            case 'shl':
              bg = "hsl("+((radius/r)*360)+","+((degreesShift/360)*100)+"%,50%)";
              break;
            case 'rgb':
              bg = "rgb("+degreesRGB+","+radiusRGB+",0)";
              break;
            case 'rbg':
              bg = "rgb("+degreesRGB+",0,"+radiusRGB+")";
              break;
            case 'grb':
              bg = "rgb("+radiusRGB+","+degreesRGB+",0)";
              break;
            case 'gbr':
              bg = "rgb(0,"+degreesRGB+","+radiusRGB+")";
              break;
            case 'brg':
              bg = "rgb("+radiusRGB+",0,"+degreesRGB+")";
              break;
            case 'bgr':
              bg = "rgb(0,"+radiusRGB+","+degreesRGB+")";
              break;
            default:
              bg = "hsl("+degrees+","+((radius/r)*100)+"%,50%)"
          }
          table += "<td class='"+(inCircle ? 'inCircle' : 'outOfCircle')+"' style='background-color:"+(inCircle ? bg : options.bg)+";'></td>"
        }
        table += "</tr>"
      }
      table += "</tbody></table>"
      
      switch(options.type) {
        // the first character refers to degrees in the circle
        // the second refers to radius
        // the third is controlled via slider
        case 'hsl':
          s = [0,100,50];
          break;
        case 'hls':
          s = [0,100,50];
          break;
        case 'lsh':
          s = [0,360,0];
          break;
        case 'lhs':
          s = [0,100,50];
          break;
        case 'slh':
          s = [0,360,0];
          break;
        case 'shl':
          s = [0,100,50];
          break;
        case 'rgb':
          s = [0,255,0];
          break;
        case 'rbg':
          s = [0,255,0];
          break;
        case 'grb':
          s = [0,255,0];
          break;
        case 'gbr':
          s = [0,255,0];
          break;
        case 'brg':
          s = [0,255,0];
          break;
        case 'bgr':
          s = [0,255,0];
          break;
        default:
          s = [0,100,50];
      }
      slider = "<input type='range' min='"+s[0]+"' max='"+s[1]+"' value='"+s[2]+"' style='width:"+(2*r)+"px;'>"
      
      
      
      // TODO append table to this, hide it
      $(this).html(table+"<br>"+slider)
      // TODO style table
      // TODO show table
    }); // this.each
  }; // colorWheel function
})(jQuery);
