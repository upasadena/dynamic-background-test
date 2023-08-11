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
  // return arr[arr.length - 1];
  return arr.slice(-1);
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
    const historyObj = {
      objectAbove: undefined,
      currentObject: undefined,
      objectBelow: undefined,
    };

    if (setDefaultBackground) {
      historyObj.currentObject = defaultBackgroundId;
    }

    if (DEBUG) console.log(historyObj);

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
      } else {
        // If the user scrolled up
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
          // if (DEBUG) console.log(`backgroundHistory: ${backgroundHistory}`);

          // If the background hasn't changed, return
          if (historyObj.currentObject === activeBackground) {
            return;
          }

          // If the user scrolled down or up
          if (userScrolledDown) {
            // If user has scrolled down
            historyObj.objectAbove = historyObj.currentObject;
            historyObj.currentObject = activeBackground;

            if (DEBUG) console.log(historyObj);

            if (historyObj.objectAbove) {
              $(".pb-12").removeClass(historyObj.objectAbove);
            }

            $(".pb-12").addClass(historyObj.currentObject);

            // Remove previous styling if it exists
            // if (backgroundHistory.length > 0) {
            //   $(".pb-12").removeClass(lastElement(backgroundHistory));
            // }

            // // Add new styling
            // $(".pb-12").addClass(activeBackground);
            // backgroundHistory.push(activeBackground);
          } else {
            // If user scrolled up
            historyObj.objectBelow = historyObj.currentObject;
            historyObj.currentObject = activeBackground;

            if (DEBUG) console.log(historyObj);

            $(".pb-12").removeClass(historyObj.currentObject);
            $(".pb-12").removeClass(defaultBackgroundId);

            if (historyObj.objectAbove) {
              $(".pb-12").addClass(historyObj.objectAbove);
            } else if (setDefaultBackground) {
              $(".pb-12").addClass(defaultBackgroundId);
            }

            // if (backgroundHistory.length > 1) {
            //   $(".pb-12").removeClass(activeBackground);

            //   backgroundHistory.pop();
            //   $(".pb-12").addClass(lastElement(backgroundHistory));

            //   // backgroundHistory.push(newClass);
            // } else if (backgroundHistory.length > 0) {
            //   // If there is only one item left

            //   $(".pb-12").removeClass(activeBackground);

            //   backgroundHistory.pop();
            //   // $(".pb-12").addClass(backgroundHistory[1]);

            //   if (setDefaultBackground) {
            //     $(".pb-12").addClass(defaultBackgroundId);
            //   }
            // } else {
            //   console.log(`else block`);
            // }
          }
        } else {
          if (DEBUG) console.log("NOT IN VIEWPORT");
        }
      });
    });
  });
})();
