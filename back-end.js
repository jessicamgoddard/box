window.addEventListener( 'load', () => {

  const editorBoxes = document.querySelectorAll( '.block-editor .wp-block-pandp-blocks-box' );

  if( editorBoxes ) {

    for( let i = 0; i < editorBoxes.length; i++ ) {

      const link = editorBoxes[i].querySelector( 'a' );

      if( link ) {
        link.removeAttribute( 'href' );
      }

    }

  }

} );
