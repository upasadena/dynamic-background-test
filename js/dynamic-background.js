/**
 * dynamicBg.js
 *
 * This script dynamically allows you to dynamically change your background
 * colour and image
 *
 * Made by /u/_pasadena
 */

/**
 * CONSTANTS
 * 
 * Change these as needed
 */
// Change to true if there is a bug
const DEBUG = true;
const centerAllowance = 45; // pixels
// END CONSTANTS

function swap(x, y) {
  return y, x;
}

// Anonymous "self-invoking" function
(function() {
  let startingTime = new Date().getTime();
  // Load the script
  let script = document.createElement("SCRIPT");
  script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);

  // Poll for jQuery to come into existence
  let checkReady = function(callback) {
      if (window.jQuery) {
          callback(jQuery);
      }
      else {
          window.setTimeout(function() { checkReady(callback); }, 20);
      }
  };

  // Start polling...
  checkReady(function($) {
      // "Global" variables
      let previousBackground = undefined;
      let lastScrollTop = 0;
      let userScrolledDown = false;

      $(function() {
        let endingTime = new Date().getTime();
        let tookTime = endingTime - startingTime;
        console.log("jQuery is loaded, after " + tookTime + " milliseconds!");
      });

      // Check if the <div> is in the viewport
      $.fn.isInViewport = function() {
        /**
         * The absolute (in the context of the page) y position of the
         * elements, static
         */
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();
      
        /**
         * The top and bottom pixels that are seen
         */
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();

        // Create center variables
        const viewportCenter =
          viewportTop + ((viewportBottom - viewportTop) / 2);
        const viewportCenterTop = viewportCenter - centerAllowance;
        const viewportCenterBottom = viewportCenter + centerAllowance;
        // Check if it's within the center
        const withinViewportCenter =
          elementBottom > viewportCenterTop &&
          elementTop < viewportCenterBottom;
      
        // if (userScrolledDown) {
        // if (DEBUG) {
        //   console.log(`elementTop = ${elementTop}`);
        //   console.log(`elementBottom = ${elementBottom}`);
        //   console.log(`viewportTop = ${viewportTop}`);
        //   console.log(`viewportBottom = ${viewportBottom}`);
        //   console.log("==================================");
        // }

          // The higher the number, the lower on the page it is
          // const belowViewportTop = elementBottom > viewportTop;
          // const aboveViewportBottom = elementTop < viewportBottom;

          

          // return belowViewportTop && aboveViewportBottom;
        return withinViewportCenter;
        // } else {
          /**
           * As soon as the elementTop is in the center, switch styles to the
           * previous style
           */
          // return withinViewportCenter;
        // }
      };
      
      // Check if the user has scrolled up or down
      $(window).scroll(function(event){
        let st = $(this).scrollTop();
        if (st > lastScrollTop){
          // If the user scrolled down
          userScrolledDown = true;
          console.log("downscroll");
        } else {
          // If the user scrolled up
          console.log("upscroll");
          userScrolledDown = false;
          // upscroll code
        }
        lastScrollTop = st;
      });
      
      // On scroll
      $(window).on("resize scroll", function() {
        $(".bg").each(function() {
          let activeBackground = $(this).attr("id");
          
          if ($(this).isInViewport()) {
            // If the user scrolled down or up
            if (userScrolledDown) {
              // if (DEBUG) console.log("Downscroll mid detected");
              // Remove previous styling if it exists
              if (previousBackground) {
                // if (DEBUG) console.log("Downscroll previousBg mid detected");
                $(".pb-12").removeClass(previousBackground);
              }

              // Add new styling
              $(".pb-12").addClass(activeBackground);
              previousBackground = activeBackground;
            } else {
              // If user scrolled up
              if (previousBackground) {
                if (DEBUG) console.log("Upscroll if mid detected");
                $(".pb-12").removeClass(activeBackground);
                $(".pb-12").addClass(previousBackground);

                // Swap the variables
                // let temp = activeBackground;
                // activeBackground = previousBackground;
                // previousBackground = temp;
              } 
              // else {
              //   if (DEBUG) console.log("Upscroll else mid detected");
              //   $(".pb-12").removeClass(activeBackground);

              //   // Swap the variables (again — DRY? never heard of it)
              //   let temp = activeBackground;
              //   activeBackground = previousBackground;
              //   previousBackground = temp;
              // }
            }
          }
        });
      });
  });
})();
