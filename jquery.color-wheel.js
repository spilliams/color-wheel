/*
 * Created in February 2012 by Spencer Williams <s@spencerenglish.com>.
 * Use at your own peril. This code is available unlicensed.
 * github.com/spilliams/color-wheel.
 */

(function($){
  var debugCW = true
  function debugLog(msg) {
    if (debugCW)
      console.log(msg)
  }
  
  var methods = {
    init : function( options ) {
      var defaults = {
        radius: 100,
        type: 'hsl',       // any permutation of 'hsl' or 'rgb'
        bg: "transparent", // any valid color. hex, rgb, hsl etc
        showPicker: false,
        picker: "single"
      };
      var options = $.extend(defaults,options)
      return this.each(function() {
        obj = $(this);

        wheel = $("<div class='cw-wheel'></div>").html($.fn.colorWheel('makeWheel',options));

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
        swatches = "<div class='cw-swatches'></div>"
        wrapper = $("<div class='cw cw-wrapper'></div>")
        wrapper.append(wheel).append("<br>"+slider+swatches)

        $(this).html(wrapper)
        
        if (options.showPicker) {
          $(this).colorWheel('showPicker',{"picker":options.picker,"radius":r/2,"slider":s[2]})
        }
        
        // TODO bind slider change
        
      }); // this.each
    },
    showPicker : function ( options ) {
      if (options == undefined) {
        $(this).find(".cw-picker").show();
        return this;
      }
      
      debugLog('showPicker called. options.picker: '+options.picker)
      var defaults = {
        picker: "single"
        // radius
        // slider
      };
      var options = $.extend(defaults,options)
      return this.each(function() {
        obj = $(this);
        
        // what points are we picking today?
        if (typeof options.picker == "string") {
          switch(options.picker) {
            case "single":
              format = [0];
              break;
            case "complementary":
              format = [0,180];
              break;
            case "split-complementary":
              format = [0,-150,150];
              break;
            case "analogous":
              format = [0,-30,30];
              break;
            case "accented-analogous":
              format = [0,-30,30,180];
              break;
            case "triadic":
              format = [0,120,240];
              break;
            case "tetradic":
              format = [0,60,180,240];
              break;
            case "square":
              format = [0,90,180,270];
              break;
            default:
              format = [0]
          }
        } else {
          format = options.picker
        }
        debugLog("picker format: ")
        debugLog(format)
        
        $(this).colorWheel('pick',{"degrees":format,"radius":options.radius,"slider":options.slider});
      });
    },
    hidePicker : function ( options ) {
      return this.each(function() {
        $(this).find(".cw-picker").hide()
      });
    },
    pick : function ( options ) {
      // var defaults = {
      //   degrees:,
      //   radius:,
      //   slider:
      // };
      // var options = $.extend(defaults,options)
      return this.each(function() {
        // set the slider
        $(this).find('input[type=range]').attr('value',options.slider).change()
        
        maxRadius = $(this).find("table").css('width')
        if (typeof maxRadius == "string") {
          maxRadius = maxRadius.substring(0,maxRadius.length-2)
          maxRadius = parseInt(maxRadius)
        }
        maxRadius /= 2
        debugLog("maxRadius: "+maxRadius)
        swatches = $("");
        loupes = $("");
        $(this).find(".cw-loupe").remove()
        $(this).find(".cw-swatches").empty()
        for(i=0;i<options.degrees.length;i++) {
          debugLog("point picked. degrees:")
          debugLog(options.degrees[i])
          debugLog("radius: "+options.radius+", slider: "+options.slider)
          // map polar to cartesian...
          uy = Math.sin(options.degrees[i]*(Math.PI/180))
          ux = Math.cos(options.degrees[i]*(Math.PI/180))
          debugLog("ux: "+ux+", uy: "+uy)
          dy = options.radius*uy
          dx = options.radius*ux
          debugLog("dx: "+dx+", dy: "+dy)
          x = Math.round(maxRadius+dx-6) // the loupe has a width
          y = Math.round(maxRadius+dy-6) // the loupe has a height
          
          // get the color at the coordinates
          color = $($($(this).find("tr")[y]).find("td")[x]).css('background-color');
          debugLog("x: "+x+", y: "+y+", color: "+color)
          
          
          $(this).find(".cw-wheel").append($("<div class='cw-picker cw-loupe"+(i==0 ? ' first':'')+"'></div>").css({'top':(""+y+"px"),'left':(""+x+"px"),'backgroundColor':color}));
          $(this).find(".cw-swatches").append($("<div class='cw-picker cw-swatch'></div>").css({'backgroundColor':color}));
        }
      });
    },
    makeWheel : function ( options ) {
      var defaults = {
        radius: 100,
        type: 'hsl',       // any permutation of 'hsl' or 'rgb'
        bg: "transparent", // any valid color. hex, rgb, hsl etc
        showPicker: false,
        picker: "single"
      };
      var options = $.extend(defaults,options)
      
      r = options.radius

      table = "<table><tbody>"
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
      
      return table
    }
  }
  
  $.fn.colorWheel = function(method) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method == 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' + method + ' does not exist on jQuery.colorWheel' );
    }
  }; // colorWheel function
})(jQuery);
