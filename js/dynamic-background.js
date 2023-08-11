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

// Whether a background colour should be set by default
const setDefaultBackground = true;
// Id in the css: `#my_id: { background: #900; }`
const defaultBackgroundId = "red";
// END CONSTANTS

function lastElement(arr) {
  return arr[arr.length - 1];
}

// Anonymous "self-invoking" function
(function() {
  let startingTime = new Date().getTime();
  // Load the script
  let script = document.createElement("script");
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
      // let previousBackground = undefined;
      let lastScrollTop = 0;
      let userScrolledDown = false;
      const backgroundHistory = [];

      // This function goes once jQuery is loaded
      $(function() {
        let endingTime = new Date().getTime();
        let tookTime = endingTime - startingTime;
        if (DEBUG) {
          console.log("jQuery is loaded, after " + tookTime + " milliseconds!");
        }

        if (setDefaultBackground) {
          $(".pb-12").addClass(defaultBackgroundId);
          backgroundHistory.push(defaultBackgroundId);
        }
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

        return withinViewportCenter;
      };
      
      // Check if the user has scrolled up or down
      $(window).scroll(function(event){
        let st = $(this).scrollTop();
        if (st > lastScrollTop){
          // If the user scrolled down
          userScrolledDown = true;
          // console.log("downscroll");
        } else {
          // If the user scrolled up
          // console.log("upscroll");
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
            // If the background hasn't changed, return
            if (backgroundHistory && backgroundHistory[backgroundHistory.length - 1] == activeBackground) {
              return;
            }

            // If the user scrolled down or up
            if (userScrolledDown) {
              // if (DEBUG) console.log("Downscroll mid detected");
              // Remove previous styling if it exists
              if (backgroundHistory) {
                // if (DEBUG) console.log("Downscroll previousBg mid detected");
                $(".pb-12").removeClass(backgroundHistory.pop());
              }

              if (DEBUG) {
                console.log("Downscroll if mid detected");
                console.log("[before swap]")
                console.log(`activeBackground: ${activeBackground}`);
                console.log(`backgroundHistory: ${lastElement(backgroundHistory)}`);
              }

              // Add new styling
              $(".pb-12").addClass(activeBackground);
              backgroundHistory.push(activeBackground);

              if (DEBUG) {
                console.log("Downscroll if mid detected");
                console.log("[after swap]")
                console.log(`activeBackground: ${activeBackground}`);
                console.log(`backgroundHistory: ${lastElement(backgroundHistory)}`);
                console.log("======================================")
              }
            } else {
              // If user scrolled up
              if (backgroundHistory) {
                if (DEBUG) {
                  console.log("Upscroll if mid detected");
                  console.log("[before swap]")
                  console.log(`activeBackground: ${activeBackground}`);
                  console.log(`backgroundHistory: ${lastElement(backgroundHistory)}`);
                }

                $(".pb-12").removeClass(activeBackground);
                $(".pb-12").addClass(backgroundHistory.pop());

                // Swap the variables
                // let temp = activeBackground;
                // activeBackground = previousBackground;
                // previousBackground = temp;

                // activeBackground = previousBackground;

                if (DEBUG) {
                  console.log("Upscroll if mid detected");
                  console.log("[after swap]")
                  console.log(`activeBackground: ${activeBackground}`);
                  console.log(`backgroundHistory: ${lastElement(backgroundHistory)}`);
                  console.log("======================================")
                }
              } 
            }
          }
        });
      });
  });
})();
