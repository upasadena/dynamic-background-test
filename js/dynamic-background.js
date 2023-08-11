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

function isFullArray(arr) {
  return arr && arr.length >= 1;
}

function debugObject(obj) {
  console.log(`${JSON.stringify(obj, undefined, 2)}`);
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
      objectsAbove: undefined, // array of strings
      currentObject: undefined,
      objectsBelow: undefined, // array of strings
    };
    let $previousThis = undefined;

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
          $previousThis = $(this);
          // if (DEBUG) console.log(`backgroundHistory: ${backgroundHistory}`);

          // If the background hasn't changed, return
          if (historyObj.currentObject === activeBackground) {
            return;
          }

          // If the user scrolled down
          if (userScrolledDown) {
            historyObj.currentObject = activeBackground;

            // If the history object exists and isn't an empty list
            if (isFullArray(historyObj.objectsAbove)) {
              $(".pb-12").removeClass(lastElement(historyObj.objectsAbove));
              historyObj.objectsAbove.push(historyObj.currentObject)
            } else {
              historyObj.objectsAbove = [historyObj.currentObject];
            }

            if (DEBUG) debugObject(historyObj);

            $(".pb-12").addClass(historyObj.currentObject);

          }
        // If the previous context exists and that div is visible in the
        // viewport, and if the user is scrolling up, then run this
        } else if ($previousThis &&
          $previousThis.isInViewport() &&
          !userScrolledDown) {

          // If the history object exists and isn't an empty array
          // if (isFullArray(historyObj.objectsBelow)) {
          //   historyObj.objectsBelow.push(historyObj.currentObject);
          // } else {
          //   historyObj.objectsBelow = [historyObj.currentObject]
          // }

          if (historyObj.currentObject === activeBackground) {
            console.log("first eq")
            // return;

            historyObj.currentObject = activeBackground;

            if (DEBUG) debugObject(historyObj);

            $(".pb-12").removeClass(historyObj.currentObject);
            $(".pb-12").removeClass(defaultBackgroundId);

            if (isFullArray(historyObj.objectsAbove)) {
              $(".pb-12").addClass(historyObj.objectsAbove.pop());
            } else if (setDefaultBackground) {
              $(".pb-12").addClass(defaultBackgroundId);
            }
          } 
          // else if (historyObj.currentObject === $previousThis.attr("id")) {
          //   console.log("second eq");
          //   return;
          // }

          
        }
      });
    });
  });
})();
