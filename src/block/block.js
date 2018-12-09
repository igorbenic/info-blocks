/**
 * BLOCK: info-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls } = wp.editor;
const { ColorPicker, PanelBody, RangeControl, RadioControl, Icon, TextControl } = wp.components;
const { Fragment } = wp.element;

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
registerBlockType( 'simple-blocks/info-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Info Block' ), // Block title.
	icon: 'info', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'simple-blocks' ),
		__( 'information' ),
		__( 'info' ),
	],
	attributes: {
		text: {
			type: 'string',
			default: __( 'Info Text' )
		},
		bgcolor: {
			type: 'string',
			default: '#000000'
		},
		color: {
			type: 'string',
			default: '#ffffff'
		},
		padding: {
			type: 'string',
			default: '10',
			selector: '[data-padding]',
			source: 'attribute',
			attribute: 'data-padding'
		},
		paddingUnit: {
			type: 'string',
			default: 'px'
		},
		icon: {
			type: 'string',
			default: 'info'
		},
		iconSize: {
			type: 'string',
			default: '20',
			selector: 'div.icon',
			source: 'attribute',
			attribute: 'data-iconsize'
		},
		iconSpace: {
			type: 'string',
			default: '20',
			selector: 'div.icon',
			source: 'attribute',
			attribute: 'data-iconspace'
		}
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const { setAttributes, attributes } = props;
		const { text, bgcolor, color, padding, paddingUnit, icon, iconSize, iconSpace } = attributes;
		 console.log( attributes );
		const style = {
			backgroundColor: bgcolor,
			color: color,
			padding: padding + paddingUnit
		};
		const marginRight = iconSpace + 'px';
	
		// Creates a <p class='wp-block-cgb-block-info-blocks'></p>.
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Background Color' ) } initialOpen={ false }>
						<ColorPicker color={ bgcolor } onChangeComplete={ ( bgcolor ) => setAttributes( { bgcolor: bgcolor.hex } )  }/>
					</PanelBody>
					<PanelBody title={ __( 'Text Color' ) } initialOpen={ false }>
						<ColorPicker color={ color } onChangeComplete={ ( color ) => setAttributes( { color: color.hex } ) }/>
					</PanelBody>
					<PanelBody title={ __( 'Padding' ) } initialOpen={ false }>
						<RangeControl 
							label= { __( 'Size' ) }
							min={ 0 }
							max={ 100 }
							value={ padding } 
							onChange={ ( padding ) => setAttributes( { padding } ) }
							/>
						<RadioControl
							label = { __( 'Unit' ) }
							selected={ paddingUnit }
							options={ [
								{ label: 'px', value: 'px' },
								{ label: 'em', value: 'em' },
								{ label: '%', value: '%' }
							] }
							onChange={ ( paddingUnit ) => { setAttributes( { paddingUnit } ) } }
							/>
					</PanelBody>
					<PanelBody title={ __( 'Dashicon' ) } initialOpen={ false }>
						<TextControl value={ icon } onChange={ ( icon ) => setAttributes( { icon } ) }/>
						<RangeControl 
							label= { __( 'Size' ) }
							min={ 0 }
							max={ 100 }
							value={ iconSize } 
							onChange={ ( iconSize ) => setAttributes( { iconSize } ) }
							/>
						<RangeControl 
							label= { __( 'Space' ) }
							min={ 0 }
							max={ 100 }
							value={ iconSpace } 
							onChange={ ( iconSpace ) => setAttributes( { iconSpace } ) }
							/>
					</PanelBody>
				</InspectorControls>
				<div className={ props.className } style={ style }>
					{ icon && <div class="icon" style={ { marginRight: marginRight } }><Icon icon={icon} size={iconSize}  /></div> }
					<RichText
						value = { text }
						onChange = { ( text ) => setAttributes( { text } ) }
					/>
				</div>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const { attributes } = props;
		const { text, bgcolor, color, padding, paddingUnit, icon, iconSize, iconSpace } = attributes;
		const style = {
			backgroundColor: bgcolor,
			color: color,
			padding: padding + paddingUnit
		};
		const marginRight = iconSpace + 'px';
		
		return (
			<div data-padding={ padding } className={ props.className } style={ style }>
				{ icon && <div data-iconsize={ iconSize } data-iconspace={ iconSpace } class="icon" style={ { marginRight: marginRight } }><Icon icon={icon} size={iconSize}  /></div> }
				<RichText.Content tagName="div" value={ text } />
			</div>
		);
	},
} );
