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
	SelectControl,
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
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	// console.table( attributes );

	const template_placeholders = [
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus, lectus non interdum cursus, arcu sapien mollis lacus, et tincidunt odio nisi ut purus. Duis eleifend, magna placerat faucibus tincidunt, orci nulla ornare tortor, eget egestas tortor nunc quis sem. Cras in tortor justo. Nulla consectetur leo vel blandit consectetur. Fusce quis sapien ante. Vestibulum non varius augue, et ultricies urna. Integer hendrerit suscipit nibh.",
		"Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vestibulum mauris diam. Praesent semper diam a efficitur iaculis. Nullam lacinia augue quis lorem accumsan tempus. Maecenas dapibus velit eu blandit pretium. Nullam posuere ut ipsum in commodo. Fusce fringilla quis turpis a placerat. Etiam hendrerit velit a lacus varius ornare.",
	];
	const NPC_TEMPLATE = [
		["core/heading", { level: 2, placeholder: "Heading..." }],
		["core/paragraph", { placeholder: template_placeholders[0] }],
		["core/heading", { level: 5, placeholder: "Sub-heading..." }],
		["core/paragraph", { placeholder: template_placeholders[1] }],
	];
	const ALLOWED_BLOCKS = ["core/image", "core/paragraph", "core/heading"];

	const {
		columnRuleColor,
		dropCapColor,
		columnCount,
		columnWidth,
		columnGap,
		columnRuleStyle,
		columnRuleWidth,
		dropCapSize,
	} = attributes;

	const columnStyles = {
		columnCount,
		columnWidth,
		columnGap,
		columnRuleStyle,
		columnRuleWidth,
		columnRuleColor,
		"--drop-cap-color": dropCapColor,
		"--drop-cap-font-size": dropCapSize.fontSize,
		"--drop-cap-line-height": dropCapSize.lineHeight,
	};

	const blockProps = useBlockProps({ style: columnStyles });

	const onChangeColumnRuleColor = (newColumnRuleColor) => {
		setAttributes({ columnRuleColor: newColumnRuleColor });
	};
	const onChangeDropCapColor = (newDropCapColor) => {
		setAttributes({ dropCapColor: newDropCapColor });
	};
	const onChangeColumnCount = (newColumnCount) => {
		newColumnCount = newColumnCount > 6 ? 6 : newColumnCount;
		newColumnCount = newColumnCount < 2 ? 2 : newColumnCount;
		setAttributes({ columnCount: Number(newColumnCount) });
	};
	const onChangeColumnWidth = (newColumnWidth) => {
		newColumnWidth = newColumnWidth > 500 ? 500 : newColumnWidth;
		newColumnWidth = newColumnWidth < 120 ? 120 : newColumnWidth;
		setAttributes({ columnWidth: Number(newColumnWidth) });
	};
	const onChangeColumnGap = (newColumnGap) => {
		newColumnGap = newColumnGap > 100 ? 100 : newColumnGap;
		newColumnGap = newColumnGap < 10 ? 10 : newColumnGap;
		setAttributes({ columnGap: Number(newColumnGap) });
	};
	const onChangeColumnRuleStyle = (newColumnRuleStyle) => {
		setAttributes({ columnRuleStyle: newColumnRuleStyle });
	};
	const onChangeColumnRuleWidth = (newColumnRuleWidth) => {
		newColumnRuleWidth = newColumnRuleWidth > 8 ? 8 : newColumnRuleWidth;
		newColumnRuleWidth = newColumnRuleWidth < 1 ? 1 : newColumnRuleWidth;
		setAttributes({ columnRuleWidth: Number(newColumnRuleWidth) });
	};
	const onChangeDropCapSize = (newDropCapSize) => {
		switch (newDropCapSize) {
			case "small":
				setAttributes({
					dropCapSize: {
						size: "small",
						fontSize: "3.8rem",
						lineHeight: "3.5rem",
					},
				});
				break;
			case "large":
				setAttributes({
					dropCapSize: {
						size: "large",
						fontSize: "6.2rem",
						lineHeight: "5.2rem",
					},
				});
				break;
			default:
				setAttributes({
					dropCapSize: {
						size: "small",
						fontSize: "3.8rem",
						lineHeight: "3.5rem",
					},
				});
		}
	};

	const colorSettingsDropDown =
		attributes.className === "is-style-drop-cap"
			? [
					{
						value: columnRuleColor,
						onChange: onChangeColumnRuleColor,
						label: __("Separator colour", "multi-columns"),
					},
					{
						value: dropCapColor,
						onChange: onChangeDropCapColor,
						label: __("Drop Capital colour", "multi-columns"),
					},
			  ]
			: [
					{
						value: columnRuleColor,
						onChange: onChangeColumnRuleColor,
						label: __("Separator colour", "multi-columns"),
					},
			  ];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Column Settings", "multi-columns")}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<NumberControl
								label={__("No. of columns", "multi-columns")}
								labelPosition="side"
								onChange={onChangeColumnCount}
								value={columnCount}
								min="2"
								max="6"
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<NumberControl
								label={__("Width", "multi-columns")}
								labelPosition="side"
								onChange={onChangeColumnWidth}
								value={columnWidth}
								min="120"
								max="500"
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<NumberControl
								label={__("Gap", "multi-columns")}
								labelPosition="side"
								onChange={onChangeColumnGap}
								value={columnGap}
								min="10"
								max="100"
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>

				<PanelBody
					title={__("Column Separator", "multi-columns")}
					initialOpen={false}
				>
					<PanelRow>
						<fieldset>
							<SelectControl
								label={__("Separator Style", "multi-columns")}
								labelPosition="side"
								onChange={onChangeColumnRuleStyle}
								value={columnRuleStyle}
								options={[
									{
										label: __("None", "multi-columns"),
										value: "none",
									},
									{
										label: __("Solid", "multi-columns"),
										value: "solid",
									},
									{
										label: __("Dotted", "multi-columns"),
										value: "dotted",
									},
									{
										label: __("Dashed", "multi-columns"),
										value: "dashed",
									},
									{
										label: __("Double", "multi-columns"),
										value: "double",
									},
									{
										label: __("Groove", "multi-columns"),
										value: "groove",
									},
									{
										label: __("Ridge", "multi-columns"),
										value: "ridge",
									},
								]}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<NumberControl
								label={__("Width", "multi-columns")}
								labelPosition="side"
								onChange={onChangeColumnRuleWidth}
								value={columnRuleWidth}
								min="1"
								max="8"
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>

				{attributes.className === "is-style-drop-cap" && (
					<PanelBody
						title={__("Dropped Initial Capital", "multi-columns")}
						initialOpen={false}
					>
						<PanelRow>
							<fieldset>
								<SelectControl
									label={__("Dropped Capital Size", "multi-columns")}
									labelPosition="side"
									onChange={onChangeDropCapSize}
									value={dropCapSize.size}
									options={[
										{
											label: __("Small", "multi-columns"),
											value: "small",
										},
										{
											label: __("Large", "multi-columns"),
											value: "large",
										},
									]}
								/>
							</fieldset>
						</PanelRow>
					</PanelBody>
				)}
				<PanelColorSettings
					title={__("Colour settings", "multi-columns")}
					initialOpen={false}
					colorSettings={colorSettingsDropDown}
				/>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={NPC_TEMPLATE} />
			</div>
		</>
	);
}
