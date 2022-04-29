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
	__experimentalBoxControl as BoxControl,
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
	const {
		backgroundColor,
		textColor,
		columnRuleColor,
		dropCapColor,
		padding,
		columnCount,
		columnWidth,
		columnGap,
		columnRuleStyle,
		columnRuleWidth,
		dropCapSize,
	} = attributes;

	const onChangeBackgroundColor = (newBackgroundColor) => {
		setAttributes({ backgroundColor: newBackgroundColor });
	};
	const onChangeTextColor = (newTextColor) => {
		setAttributes({ textColor: newTextColor });
	};
	const onChangeColumnRuleColor = (newColumnRuleColor) => {
		setAttributes({ columnRuleColor: newColumnRuleColor });
	};
	const onChangeDropCapColor = (newDropCapColor) => {
		setAttributes({ dropCapColor: newDropCapColor });
	};
	const onChangePadding = (newPadding) => {
		console.table(newPadding);
		setAttributes({ padding: newPadding });
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
						{
							value: columnRuleColor,
							onChange: onChangeColumnRuleColor,
							label: __("Separator colour", "newspaper-columns-block"),
						},
						{
							value: dropCapColor,
							onChange: onChangeDropCapColor,
							label: __("Drop Capital colour", "newspaper-columns-block"),
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
								label={__("No. of columns", "newspaper-columns-block")}
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
								label={__("Width", "newspaper-columns-block")}
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
								label={__("Gap", "newspaper-columns-block")}
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
					title={__("Column Separator", "newspaper-columns-block")}
					initialOpen={false}
				>
					<PanelRow>
						<fieldset>
							<SelectControl
								label={__("Separator Style", "newspaper-columns-block")}
								labelPosition="side"
								onChange={onChangeColumnRuleStyle}
								value={columnRuleStyle}
								options={[
									{ label: "None", value: "none" },
									{ label: "Solid", value: "solid" },
									{ label: "Dotted", value: "dotted" },
									{ label: "Dashed", value: "dashed" },
									{ label: "Double", value: "double" },
									{ label: "Groove", value: "groove" },
									{ label: "Ridge", value: "ridge" },
								]}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<NumberControl
								label={__("Width", "newspaper-columns-block")}
								labelPosition="side"
								onChange={onChangeColumnRuleWidth}
								value={columnRuleWidth}
								min="1"
								max="8"
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>

				<PanelBody
					title={__("Dropped Initial Capital", "newspaper-columns-block")}
					initialOpen={false}
				>
					<PanelRow>
						<fieldset>
							<SelectControl
								label={__("Dropped Capital Size", "newspaper-columns-block")}
								labelPosition="side"
								onChange={onChangeDropCapSize}
								value={dropCapSize.size}
								options={[
									{ label: "Small", value: "small" },
									{ label: "Large", value: "large" },
								]}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>

				<PanelBody
					title={__("Dimensions", "newspaper-columns-block")}
					initialOpen={false}
				>
					<BoxControl
						label="Padding"
						values={padding}
						resetValues={{
							top: "20px",
							left: "20px",
							right: "20px",
							bottom: "20px",
						}}
						onChange={onChangePadding}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{...blockProps}
				style={{
					backgroundColor: backgroundColor,
					color: textColor,
					paddingTop: padding.top,
					paddingRight: padding.right,
					paddingBottom: padding.bottom,
					paddingLeft: padding.left,
					columnCount: columnCount,
					columnWidth: columnWidth,
					columnGap: columnGap,
					columnRuleStyle: columnRuleStyle,
					columnRuleWidth: columnRuleWidth,
					columnRuleColor: columnRuleColor,
					"--drop-cap-color": dropCapColor,
					"--drop-cap-font-size": dropCapSize.fontSize,
					"--drop-cap-line-height": dropCapSize.lineHeight,
				}}
			>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={NPC_TEMPLATE} />
			</div>
		</>
	);
}
