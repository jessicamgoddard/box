// Set unique ID for each box on the page
const clipPathID = function( box, number ) {
  // Get the clipPath from the active SVG
  const clipPath = box.querySelector( '.box-svg #clipPath' );
  // Get the background for the active box (contains image if applicable and color)
  const boxBkg = box.querySelector( '.box-bkg' );
  // Add one to th enumber
  number++;
  // Set the ID of the clip path
  clipPath.id = 'clipPath-' + number;
  // Add clip-path style to background
  boxBkg.style.clipPath = 'url(#' + clipPath.id + ')';
  boxBkg.style.webkitClipPath = 'url(#' + clipPath.id + ')';

}

const squareToBlob = function( square, blob ) {

  let toBlob = KUTE.to(
    square,
    { path: blob },
    {
      easing: 'easingCircularInOut',
      duration: 500
    }
  ).start();

}

const blobToSquare = function( square, squareD ) {

  let toSquare = KUTE.to(
    square,
    { path: squareD },
    {
      easing: 'easingCircularInOut',
      duration: 500
    }
  ).start();

}

if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {

} else {

  // Get all SVGs
  const boxes = document.querySelectorAll( '.wp-block-pandp-blocks-box' );

  // If there are boxes
  if( boxes ) {
    // For each box
    for( let i = 0; i < boxes.length; i++ ) {
      // If the box has a link
      if( boxes[i].querySelector( 'a' ) ) {
        // Create the box variable
        const box = boxes[i].querySelector( '.box' );
        // Call function using current box and number of active box
        clipPathID( boxes[i], [i] );

        let square = boxes[i].querySelector( '.box-svg #square' );
        const squareD = square.getAttribute( 'd' );

        // Listen for mouse to enter a box
        boxes[i].addEventListener( 'mouseover', function() {

          let blobs = this.querySelectorAll( '.box-svg .blob' );
          let blob = blobs[Math.floor(Math.random()*blobs.length)];

          squareToBlob( square, blob );

          this.addEventListener( 'mouseout', function() {

            blobToSquare( square, squareD );

          }, false );

        }, false );

      }

    }

  }

}
