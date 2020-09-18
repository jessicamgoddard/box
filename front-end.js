const clipPathID = function( box, number ) {

  const clipPath = box.querySelector( '.box-svg #clipPath' );
  const boxBkg = box.querySelector( '.box-bkg' );

  number++;

  clipPath.id = 'clipPath-' + number;

  boxBkg.style.clipPath = 'url(#' + clipPath.id + ')';

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

// Get all SVGs
const boxes = document.querySelectorAll( '.wp-block-pandp-blocks-box .box' );

if( boxes ) {

  for( let i = 0; i < boxes.length; i++ ) {

    clipPathID( boxes[i], [i] );

    boxes[i].addEventListener( 'mouseenter', function() {

      let square = this.querySelector( '.box-svg #square' );
      let squareD = square.getAttribute( 'd' );
      let blobs = this.querySelectorAll( '.box-svg .blob' );
      let blob = blobs[Math.floor(Math.random()*blobs.length)];

      squareToBlob( square, blob );

      this.addEventListener( 'mouseleave', function() {

        blobToSquare( square, squareD );

      }, false );

    }, false );

  }

}
