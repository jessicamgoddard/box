// Get all SVGs
const svgs = document.querySelectorAll( 'svg.shapes' );

if( svgs ) {

  for( let i = 0; i < svgs.length; i++ ) {

    svgs[i].addEventListener( 'mouseenter', function() {

      let square = this.querySelector( '#square' );
      let squareD = square.getAttribute( 'd' );
      let blobs = this.querySelectorAll( '.blob' );
      let blob = blobs[Math.floor(Math.random()*blobs.length)];

      squareToBlob( square, blob );

      this.addEventListener( 'mouseleave', function() {

        blobToSquare( square, squareD );

      }, false );

    }, false );

  }

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
