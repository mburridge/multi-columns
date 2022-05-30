<?php
/**
 * Plugin Name:       Multi-columns Block
 * Description:       Implements a block that allows text to wrap across 2 or more columns - like a newspaper
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Plugin Author
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       multi-columns
 *
 * @package           multi-columns
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function multi_columns_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'multi_columns_block_init' );
