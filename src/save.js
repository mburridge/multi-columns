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
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const {
		dropCapColor,
		columnCount,
		columnWidth,
		columnGap,
		columnRuleStyle,
		columnRuleWidth,
		columnRuleColor,
		dropCapSize,
	} = attributes;

	const columnStyles = {
		columnCount: columnCount,
		columnWidth: columnWidth,
		columnGap: columnGap,
		columnRuleStyle: columnRuleStyle,
		columnRuleWidth: columnRuleWidth,
		columnRuleColor: columnRuleColor,
		"--drop-cap-color": dropCapColor,
		"--drop-cap-font-size": dropCapSize.fontSize,
		"--drop-cap-line-height": dropCapSize.lineHeight,
	};

	const blockProps = useBlockProps.save({ style: columnStyles });

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
