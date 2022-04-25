/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from "@wordpress/block-editor";

import {
	PanelBody,
	PanelRow,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent });
	};

	// console.table(attributes);

	const blockProps = useBlockProps();
	const ALLOWED_BLOCKS = ["core/image", "core/paragraph", "core/heading"];
	const NPC_TEMPLATE = [
		["core/heading", { placeholder: "Add a title..." }],
		["core/paragraph", { placeholder: "Add text here..." }],
		["core/paragraph", { placeholder: "Add more text here..." }],
	];
	const { backgroundColor, textColor, columnCount } = attributes;

	const onChangeBackgroundColor = (newBackgroundColor) => {
		setAttributes({ backgroundColor: newBackgroundColor });
	};
	const onChangeTextColor = (newTextColor) => {
		setAttributes({ textColor: newTextColor });
	};
	const onChangeColumnCount = (newColumnCount) => {
		newColumnCount = newColumnCount > 6 ? 6 : newColumnCount;
		newColumnCount = newColumnCount < 2 ? 2 : newColumnCount;
		setAttributes({ columnCount: Number(newColumnCount) });
	};

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__("Colour settings", "newspaper-columns-block")}
					initialOpen={false}
					colorSettings={[
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __("Text colour", "newspaper-columns-block"),
						},
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __("Background colour", "newspaper-columns-block"),
						},
					]}
				/>
				<PanelBody
					title={__("Column Settings", "newspaper-columns-block")}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<NumberControl
								label={__("Number of columns", "newspaper-columns-block")}
								onChange={onChangeColumnCount}
								value={columnCount}
								min="2"
								max="6"
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div
				{...blockProps}
				style={{
					backgroundColor: backgroundColor,
					color: textColor,
					columnCount: columnCount,
				}}
			>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={NPC_TEMPLATE} />
			</div>
		</>
	);
}
