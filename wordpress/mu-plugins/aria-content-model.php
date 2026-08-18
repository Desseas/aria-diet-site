<?php
/**
 * Plugin Name: Aria Content Model
 * Description: Service CPT + ACF field groups for the headless Άρια Τσιάκα site.
 * Version: 0.1.0
 *
 * Loaded as a must-use plugin so the content model stays in git.
 */

declare(strict_types=1);

/**
 * Register Service custom post type and expose it to WPGraphQL.
 */
add_action('init', static function (): void {
	register_post_type(
		'service',
		[
			'labels'              => [
				'name'          => 'Services',
				'singular_name' => 'Service',
				'add_new_item'  => 'Add New Service',
				'edit_item'     => 'Edit Service',
				'view_item'     => 'View Service',
				'search_items'  => 'Search Services',
				'not_found'     => 'No services found',
			],
			'public'              => true,
			'has_archive'         => false,
			'rewrite'             => ['slug' => 'service'],
			'show_in_rest'        => true,
			'menu_icon'           => 'dashicons-heart',
			'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
			'show_in_graphql'     => true,
			'graphql_single_name' => 'service',
			'graphql_plural_name' => 'services',
		]
	);
});

/**
 * ACF Free-compatible Service fields.
 * FAQ / benefits / process use textareas (one item per line) to avoid ACF Pro repeaters for now.
 */
add_action('acf/init', static function (): void {
	if (!function_exists('acf_add_local_field_group')) {
		return;
	}

	acf_add_local_field_group([
		'key'                   => 'group_aria_service',
		'title'                 => 'Service Details',
		'show_in_graphql'       => 1,
		'graphql_field_name'    => 'serviceDetails',
		'map_graphql_types_from_location_rules' => 0,
		'graphql_types'         => ['Service'],
		'fields'                => [
			[
				'key'   => 'field_service_short_description',
				'label' => 'Short Description',
				'name'  => 'short_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'   => 'field_service_hero_title',
				'label' => 'Hero Title',
				'name'  => 'hero_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_service_hero_description',
				'label' => 'Hero Description',
				'name'  => 'hero_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'           => 'field_service_hero_image',
				'label'         => 'Hero Image',
				'name'          => 'hero_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'   => 'field_service_introduction',
				'label' => 'Introduction',
				'name'  => 'introduction',
				'type'  => 'wysiwyg',
				'tabs'  => 'all',
				'toolbar' => 'basic',
				'media_upload' => 0,
			],
			[
				'key'   => 'field_service_body_content',
				'label' => 'Main Content',
				'name'  => 'body_content',
				'type'  => 'wysiwyg',
				'tabs'  => 'all',
				'toolbar' => 'full',
				'media_upload' => 1,
			],
			[
				'key'           => 'field_service_secondary_image',
				'label'         => 'Secondary Image',
				'name'          => 'secondary_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'          => 'field_service_benefits',
				'label'        => 'Benefits',
				'name'         => 'benefits',
				'type'         => 'textarea',
				'instructions' => 'One benefit per line (ACF Free alternative to Repeater).',
				'rows'         => 6,
			],
			[
				'key'          => 'field_service_process',
				'label'        => 'Process',
				'name'         => 'process',
				'type'         => 'textarea',
				'instructions' => 'One process step per line.',
				'rows'         => 6,
			],
			[
				'key'          => 'field_service_faq',
				'label'        => 'FAQ',
				'name'         => 'faq',
				'type'         => 'textarea',
				'instructions' => "One Q&A per block. Format:\nQuestion?\nAnswer\n\nNext question?\nAnswer",
				'rows'         => 10,
			],
			[
				'key'   => 'field_service_cta_title',
				'label' => 'CTA Title',
				'name'  => 'cta_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_service_cta_description',
				'label' => 'CTA Description',
				'name'  => 'cta_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'   => 'field_service_cta_button_label',
				'label' => 'CTA Button Label',
				'name'  => 'cta_button_label',
				'type'  => 'text',
			],
			[
				'key'   => 'field_service_cta_button_url',
				'label' => 'CTA Button URL',
				'name'  => 'cta_button_url',
				'type'  => 'url',
			],
			[
				'key'   => 'field_service_seo_title',
				'label' => 'SEO Title',
				'name'  => 'seo_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_service_seo_description',
				'label' => 'SEO Description',
				'name'  => 'seo_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
		],
		'location' => [
			[
				[
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'service',
				],
			],
		],
		'position' => 'normal',
		'style'    => 'default',
		'active'   => true,
	]);
});
