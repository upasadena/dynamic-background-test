// var red = $('#red-bg').offset().top - 100;
// var blue = $('#blue-bg').offset().top - 100;
// var purple = $('#purple-bg').offset().top - 100;

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
//       $('header').css({"background-color":"red"});
//   } else if($(this).scrollTop() > blue) {   
//       $('header').css({"background-color":"blue"});
//     } else if($(this).scrollTop() > purple) {   
//         $('header').css({"background-color":"purple"});
//   } 
//   // else {
//   //     $('header').css({"background-color":"#520833"});
//   // }
// });

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};


var previousColor = undefined;

$(window).on('resize scroll', function() {
  $('.color').each(function() {
    var activeColor = $(this).attr('id');
    
    if ($(this).isInViewport()) {
      // console.log(`"${activeColor}" is in viewport!`);
      // console.log(`activeColor = ${activeColor}`);
      // console.log(`previousColor = ${previousColor}`);
      // $('#fixed-' + activeColor).addClass(activeColor + '-active');

      if (previousColor != undefined) {
        $(".pb-12").removeClass(previousColor);
      }

      $(".pb-12").addClass(activeColor);
      previousColor = activeColor;
    }
    // } else {
    //   // $('#fixed-' + activeColor).removeClass(activeColor + '-active');
    //   $(".pb-12").removeClass(activeColor);
    // }
  });
});