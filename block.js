/**
 * BLOCK: clear-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

// Import icon.
import icon from '../icon.js';
import shapes from './shapes.js';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { MediaUpload, MediaUploadCheck, URLInput, PanelColorSettings } = wp.editor;
const { PanelBody, PanelRow, SelectControl, Button, Tooltip } = wp.components;
const { withColors, getColorClassName, InnerBlocks, InspectorControls } = wp.blockEditor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'pandp-blocks/box', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Box' ), // Block title.
	icon: icon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'design', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
    __( 'blob' ),
    __( 'square' ),
    __( 'stat' ),
  ],
  attributes: {
    url: {
      type: 'string',
      source: 'attribute',
      attribute: 'href',
      selector: 'a',
      default: '',
    },
    backgroundImageURL: {
      type: 'string',
      default: '',
    },
    backgroundImageID: {
      type: 'number',
      default: 0,
    },
    boxColor: {
      type: 'string',
    },
    boxSize: {
      type: 'string',
      default: 'small',
    },
    verticalAlign: {
      type: 'string',
      default: 'top',
    },
  },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: withColors( { boxColor: 'box-color' } )( ( props ) => {

    const { attributes: { backgroundImageURL, backgroundImageID, url, boxSize, verticalAlign },
      className, setAttributes, isSelected, boxColor, setBoxColor } = props;

    let boxStyle = {
      backgroundImage: backgroundImageURL != 0 ? 'url("' + backgroundImageURL + '")' : 'none'
    };

    const onSelectImage = img => {
      setAttributes( {
        backgroundImageID: img.id,
        backgroundImageURL: img.url,
      } );
    };

    const onRemoveImage = () => {
      setAttributes( {
        backgroundImageID: null,
        backgroundImageURL: null,
      } );
    };

    let colorClass = 'has-default-box-color';

    if( boxColor != undefined ) {
      if( boxColor.class != undefined ) {
        colorClass = boxColor.class;
      }
    }

    const classes = `is-size-${ boxSize } is-vertical-align-${ verticalAlign } ${ colorClass }`;

    const isUrlEmpty = url.length > 0 ? false : true;

		return [
      <InspectorControls>
        <PanelBody title={ __( 'Box Settings' ) }>

          <label>Background Image</label>
          { ! backgroundImageID ? (
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ onSelectImage }
                allowedTypes={ ['image'] }
                value={ backgroundImageID }
                render={ ( { open } ) => (
                  <Button
                    className={ "button button-large" }
                    onClick={ open }
                  >
                    { __( 'Upload Image' ) }
                  </Button>
                ) }
              >
              </MediaUpload>
            </MediaUploadCheck>
          ) : (
            <div>
              <img src={ backgroundImageURL } />

              { isSelected ? (
                <Button
                  className="button remove-image"
                  onClick={ onRemoveImage }
                >
                  { __( 'Remove Image' ) }
                </Button>
              ) : null }
            </div>
          ) }

          <label>Link</label>
          { isSelected ? (
            <form onSubmit={ event => event.preventDefault() }>
              <URLInput
                className="url"
                value={ url }
                onChange={ url => setAttributes( { url } ) }
              />
            </form>
          ) : (
            <p>
              <a href={ url }>
                { __( 'Edit Link' ) }
              </a>
            </p>
          ) }

          <PanelRow>
            <SelectControl
              label={ __( 'Size' ) }
              value={ boxSize }
              options={ [
                { value: 'small', label: __( 'Small' ) },
                { value: 'medium', label: __( 'Medium' ) },
                { value: 'large', label: __( 'Large' ) },
              ] }
              onChange={ boxSize => setAttributes( { boxSize } ) }
            />
          </PanelRow>

          <PanelRow>
            <SelectControl
              label={ __( 'Vertical Alignment' ) }
              value={ verticalAlign }
              options={ [
                { value: 'top', label: __( 'Top' ) },
                { value: 'middle', label: __( 'Middle' ) },
                { value: 'bottom', label: __( 'Bottom' ) },
              ] }
              onChange={ verticalAlign => setAttributes( { verticalAlign } ) }
            />
          </PanelRow>

          <PanelRow>
            <PanelColorSettings
              title={ __( 'Color' ) }
              colorSettings={ [
                {
                  value: boxColor.color,
                  onChange: setBoxColor,
                  label: __( 'Box Color' ),
                }
              ] }
            >
            </PanelColorSettings>
          </PanelRow>

        </PanelBody>
      </InspectorControls>,
			<div className={ `${ className } is-size-${ boxSize } is-vertical-align-${ verticalAlign } ${ colorClass }` }>
        { isUrlEmpty ? (
          <div className="box">
    				<div className="box-content">
              <InnerBlocks
                template={ [
                  [ 'core/paragraph' ],
                ] }
              />
            </div>
            <div class="box-svg">{ shapes }</div>
            <div class="box-bkg"><div class="bkg-img" style={ boxStyle }></div></div>
          </div>
        ) : (
          <a href={ url }>
            <div className="box">
      				<div className="box-content">
                <InnerBlocks
                  template={ [
                    [ 'core/paragraph' ],
                  ] }
                />
              </div>
              <div class="box-svg">{ shapes }</div>
              <div class="box-bkg"><div class="bkg-img" style={ boxStyle }></div></div>
            </div>
          </a>
        ) }

			</div>

		];
	} ),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {

    const { attributes: { backgroundImageURL, url, boxSize, verticalAlign, boxColor }, className } = props;

    let colorClass = 'has-default-box-color';
    if( boxColor != undefined ) {
      colorClass = getColorClassName( 'box-color', boxColor );
    }
    const classes = `is-size-${ boxSize } is-vertical-align-${ verticalAlign } ${ colorClass }`;

    const boxStyle = {
      backgroundImage: backgroundImageURL != 0 ? 'url(' + backgroundImageURL + ')' : 'none'
    };

    const isUrlEmpty = url.length > 0 ? false : true;

		return (
			<div className={ classes }>
        { isUrlEmpty ? (
          <div className="box">
            <div className="box-content">
              <InnerBlocks.Content />
            </div>
            <div class="box-svg">{ shapes }</div>
            <div class="box-bkg"><div class="bkg-img" style={ boxStyle }></div></div>
          </div>
        ) : (
          <a href={ url }>
            <div className="box">
              <div className="box-content">
                <InnerBlocks.Content />
              </div>
              <div class="box-svg">{ shapes }</div>
              <div class="box-bkg"><div class="bkg-img" style={ boxStyle }></div></div>
            </div>
          </a>
        ) }
			</div>
		);
	},
} );
