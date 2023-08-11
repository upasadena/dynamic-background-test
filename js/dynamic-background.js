// var red = $("#red-bg").offset().top - 100;
// var blue = $("#blue-bg").offset().top - 100;
// var purple = $("#purple-bg").offset().top - 100;

// // $(function() {
// //   $(window).scroll(function () {
// //      if ($(this).scrollTop() > 50) {
// //         $("body").addClass("changeColor")
// //      }
// //      if ($(this).scrollTop() < 50) {
// //         $("body").removeClass("changeColor")
// //      }
// //   });
// // });

// $(document).scroll(function(){
//   if($(this).scrollTop() > red) {   
//       $("header").css({"background-color":"red"});
//   } else if($(this).scrollTop() > blue) {   
//       $("header").css({"background-color":"blue"});
//     } else if($(this).scrollTop() > purple) {   
//         $("header").css({"background-color":"purple"});
//   } 
//   // else {
//   //     $("header").css({"background-color":"#520833"});
//   // }
// });

var startingTime = new Date().getTime();
var script = document.createElement("script");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"; // Check https://jquery.com/ for the current version
document.getElementsByTagName("head")[0].appendChild(script);

// Poll for jQuery to come into existence
var checkReady = function(callback) {
  if (window.jQuery) {
      callback(jQuery);
  }
  else {
      window.setTimeout(function() { checkReady(callback); }, 20);
  }
};

// Start polling...
checkReady(function($) {
  $(function() {
      var endingTime = new Date().getTime();
      var tookTime = endingTime - startingTime;
      window.alert("jQuery is loaded, after " + tookTime + " milliseconds!");
  });
});

$.fn.isInViewport = function() {
  let elementTop = $(this).offset().top;
  let elementBottom = elementTop + $(this).outerHeight();

  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

let previousColor = undefined;

$(window).on("resize scroll", function() {
  $(".color").each(function() {
    let activeColor = $(this).attr("id");
    
    if ($(this).isInViewport()) {
      // console.log(`"${activeColor}" is in viewport!`);
      // console.log(`activeColor = ${activeColor}`);
      // console.log(`previousColor = ${previousColor}`);
      // $("#fixed-" + activeColor).addClass(activeColor + "-active");

      if (previousColor) {
        $(".pb-12").removeClass(previousColor);
      }

      $(".pb-12").addClass(activeColor);
      previousColor = activeColor;
    }
    // } else {
    //   // $("#fixed-" + activeColor).removeClass(activeColor + "-active");
    //   $(".pb-12").removeClass(activeColor);
    // }
  });
});