<?php
/**
 * Plugin Name: Aria Content Model
 * Description: Service/Campaign CPTs + page ACF field groups for the headless Άρια Τσιάκα site.
 * Version: 0.4.0
 *
 * Loaded as a must-use plugin so the content model stays in git.
 */

declare(strict_types=1);

/**
 * Register Service + Campaign custom post types and expose them to WPGraphQL.
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

	register_post_type(
		'campaign',
		[
			'labels'              => [
				'name'          => 'Campaigns',
				'singular_name' => 'Campaign',
				'add_new_item'  => 'Add New Campaign',
				'edit_item'     => 'Edit Campaign',
				'view_item'     => 'View Campaign',
				'search_items'  => 'Search Campaigns',
				'not_found'     => 'No campaigns found',
			],
			'public'              => true,
			'has_archive'         => false,
			'rewrite'             => ['slug' => 'campaign'],
			'show_in_rest'        => true,
			'menu_icon'           => 'dashicons-megaphone',
			'supports'            => ['title', 'thumbnail', 'revisions'],
			'show_in_graphql'     => true,
			'graphql_single_name' => 'campaign',
			'graphql_plural_name' => 'campaigns',
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

	acf_add_local_field_group([
		'key'                => 'group_aria_home',
		'title'              => 'Homepage',
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'homeFields',
		'map_graphql_types_from_location_rules' => 0,
		'graphql_types'      => ['Page'],
		'fields'             => [
			[
				'key'   => 'field_home_hero_eyebrow',
				'label' => 'Hero Eyebrow',
				'name'  => 'hero_eyebrow',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_hero_title',
				'label' => 'Hero Title',
				'name'  => 'hero_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_hero_description',
				'label' => 'Hero Description',
				'name'  => 'hero_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'   => 'field_home_hero_primary_label',
				'label' => 'Hero Primary CTA Label',
				'name'  => 'hero_primary_label',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_hero_primary_url',
				'label' => 'Hero Primary CTA URL',
				'name'  => 'hero_primary_url',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_hero_secondary_label',
				'label' => 'Hero Secondary CTA Label',
				'name'  => 'hero_secondary_label',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_hero_secondary_url',
				'label' => 'Hero Secondary CTA URL',
				'name'  => 'hero_secondary_url',
				'type'  => 'text',
			],
			[
				'key'           => 'field_home_hero_image',
				'label'         => 'Hero Image',
				'name'          => 'hero_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'   => 'field_home_about_eyebrow',
				'label' => 'About Preview Eyebrow',
				'name'  => 'about_eyebrow',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_about_title',
				'label' => 'About Preview Title',
				'name'  => 'about_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_about_text',
				'label' => 'About Preview Text',
				'name'  => 'about_text',
				'type'  => 'textarea',
				'rows'  => 4,
			],
			[
				'key'           => 'field_home_about_image',
				'label'         => 'About Preview Image',
				'name'          => 'about_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'   => 'field_home_about_button_label',
				'label' => 'About Preview Button Label',
				'name'  => 'about_button_label',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_about_button_url',
				'label' => 'About Preview Button URL',
				'name'  => 'about_button_url',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_services_eyebrow',
				'label' => 'Services Section Eyebrow',
				'name'  => 'services_eyebrow',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_services_title',
				'label' => 'Services Section Title',
				'name'  => 'services_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_services_intro',
				'label' => 'Services Section Intro',
				'name'  => 'services_intro',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'   => 'field_home_approach_title',
				'label' => 'Approach Title',
				'name'  => 'approach_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_approach_content',
				'label' => 'Approach Content',
				'name'  => 'approach_content',
				'type'  => 'wysiwyg',
				'tabs'  => 'all',
				'toolbar' => 'basic',
				'media_upload' => 0,
			],
			[
				'key'           => 'field_home_approach_image',
				'label'         => 'Approach Image',
				'name'          => 'approach_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'   => 'field_home_philosophy_title',
				'label' => 'Philosophy Title',
				'name'  => 'philosophy_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_philosophy_content',
				'label' => 'Philosophy Content',
				'name'  => 'philosophy_content',
				'type'  => 'textarea',
				'rows'  => 4,
			],
			[
				'key'           => 'field_home_philosophy_image',
				'label'         => 'Philosophy Image',
				'name'          => 'philosophy_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'   => 'field_home_philosophy_cta_label',
				'label' => 'Philosophy CTA Label',
				'name'  => 'philosophy_cta_label',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_philosophy_cta_url',
				'label' => 'Philosophy CTA URL',
				'name'  => 'philosophy_cta_url',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_quote_text',
				'label' => 'Quote',
				'name'  => 'quote_text',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'          => 'field_home_faq',
				'label'        => 'FAQ',
				'name'         => 'faq',
				'type'         => 'textarea',
				'instructions' => "One Q&A per block:\nQuestion?\nAnswer",
				'rows'         => 10,
			],
			[
				'key'   => 'field_home_cta_title',
				'label' => 'Final CTA Title',
				'name'  => 'cta_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_cta_description',
				'label' => 'Final CTA Description',
				'name'  => 'cta_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'   => 'field_home_cta_button_label',
				'label' => 'Final CTA Button Label',
				'name'  => 'cta_button_label',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_cta_button_url',
				'label' => 'Final CTA Button URL',
				'name'  => 'cta_button_url',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_instagram_title',
				'label' => 'Instagram Title',
				'name'  => 'instagram_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_instagram_text',
				'label' => 'Instagram Text',
				'name'  => 'instagram_text',
				'type'  => 'textarea',
				'rows'  => 2,
			],
			[
				'key'   => 'field_home_instagram_button_label',
				'label' => 'Instagram Button Label',
				'name'  => 'instagram_button_label',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_instagram_url',
				'label' => 'Instagram URL',
				'name'  => 'instagram_url',
				'type'  => 'url',
			],
			[
				'key'   => 'field_home_seo_title',
				'label' => 'SEO Title',
				'name'  => 'seo_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_home_seo_description',
				'label' => 'SEO Description',
				'name'  => 'seo_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
		],
		'location' => [
			[
				[
					'param'    => 'page_type',
					'operator' => '==',
					'value'    => 'front_page',
				],
			],
		],
		'position' => 'normal',
		'style'    => 'default',
		'active'   => true,
	]);

	$about_page_id = (string) (get_option('aria_about_page_id') ?: '0');

	acf_add_local_field_group([
		'key'                => 'group_aria_about',
		'title'              => 'About Page',
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'aboutFields',
		'map_graphql_types_from_location_rules' => 0,
		'graphql_types'      => ['Page'],
		'fields'             => [
			[
				'key'   => 'field_about_hero_eyebrow',
				'label' => 'Hero Eyebrow',
				'name'  => 'hero_eyebrow',
				'type'  => 'text',
			],
			[
				'key'   => 'field_about_hero_title',
				'label' => 'Hero Title',
				'name'  => 'hero_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_about_hero_description',
				'label' => 'Hero Description',
				'name'  => 'hero_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'           => 'field_about_hero_image',
				'label'         => 'Hero Image',
				'name'          => 'hero_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'   => 'field_about_biography_title',
				'label' => 'Biography Title',
				'name'  => 'biography_title',
				'type'  => 'text',
			],
			[
				'key'          => 'field_about_biography_content',
				'label'        => 'Biography',
				'name'         => 'biography_content',
				'type'         => 'wysiwyg',
				'tabs'         => 'all',
				'toolbar'      => 'basic',
				'media_upload' => 0,
			],
			[
				'key'   => 'field_about_philosophy_title',
				'label' => 'Philosophy Title',
				'name'  => 'philosophy_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_about_philosophy_content',
				'label' => 'Philosophy',
				'name'  => 'philosophy_content',
				'type'  => 'textarea',
				'rows'  => 5,
			],
			[
				'key'          => 'field_about_qualifications',
				'label'        => 'Qualifications',
				'name'         => 'qualifications',
				'type'         => 'textarea',
				'instructions' => 'One qualification per line.',
				'rows'         => 6,
			],
			[
				'key'   => 'field_about_approach_title',
				'label' => 'Approach Title',
				'name'  => 'approach_title',
				'type'  => 'text',
			],
			[
				'key'          => 'field_about_approach_content',
				'label'        => 'Approach to Nutrition',
				'name'         => 'approach_content',
				'type'         => 'wysiwyg',
				'tabs'         => 'all',
				'toolbar'      => 'basic',
				'media_upload' => 0,
			],
			[
				'key'           => 'field_about_lifestyle_image',
				'label'         => 'Lifestyle Image',
				'name'          => 'lifestyle_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'   => 'field_about_cta_title',
				'label' => 'CTA Title',
				'name'  => 'cta_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_about_cta_description',
				'label' => 'CTA Description',
				'name'  => 'cta_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'   => 'field_about_cta_button_label',
				'label' => 'CTA Button Label',
				'name'  => 'cta_button_label',
				'type'  => 'text',
			],
			[
				'key'   => 'field_about_cta_button_url',
				'label' => 'CTA Button URL',
				'name'  => 'cta_button_url',
				'type'  => 'text',
			],
			[
				'key'   => 'field_about_seo_title',
				'label' => 'SEO Title',
				'name'  => 'seo_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_about_seo_description',
				'label' => 'SEO Description',
				'name'  => 'seo_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
		],
		'location' => [
			[
				[
					'param'    => 'page',
					'operator' => '==',
					'value'    => $about_page_id,
				],
			],
		],
		'position' => 'normal',
		'style'    => 'default',
		'active'   => true,
	]);

	$contact_page_id = (string) (get_option('aria_contact_page_id') ?: '0');

	acf_add_local_field_group([
		'key'                => 'group_aria_contact',
		'title'              => 'Contact Page',
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'contactFields',
		'map_graphql_types_from_location_rules' => 0,
		'graphql_types'      => ['Page'],
		'fields'             => [
			[
				'key'   => 'field_contact_intro_title',
				'label' => 'Intro Title',
				'name'  => 'intro_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_contact_intro_text',
				'label' => 'Intro Text',
				'name'  => 'intro_text',
				'type'  => 'textarea',
				'rows'  => 4,
			],
			[
				'key'           => 'field_contact_hero_image',
				'label'         => 'Hero Image',
				'name'          => 'hero_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
				'instructions'  => 'Full-bleed banner behind the contact title. If empty, a curated placeholder is shown.',
			],
			[
				'key'   => 'field_contact_phone',
				'label' => 'Phone',
				'name'  => 'phone',
				'type'  => 'text',
			],
			[
				'key'   => 'field_contact_email',
				'label' => 'Email',
				'name'  => 'email',
				'type'  => 'email',
			],
			[
				'key'   => 'field_contact_office_address',
				'label' => 'Office Address',
				'name'  => 'office_address',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'          => 'field_contact_opening_hours',
				'label'        => 'Opening Hours',
				'name'         => 'opening_hours',
				'type'         => 'textarea',
				'instructions' => 'One line per schedule entry.',
				'rows'         => 4,
			],
			[
				'key'   => 'field_contact_instagram_url',
				'label' => 'Instagram URL',
				'name'  => 'instagram_url',
				'type'  => 'url',
			],
			[
				'key'   => 'field_contact_facebook_url',
				'label' => 'Facebook URL',
				'name'  => 'facebook_url',
				'type'  => 'url',
			],
			[
				'key'   => 'field_contact_whatsapp_url',
				'label' => 'WhatsApp URL',
				'name'  => 'whatsapp_url',
				'type'  => 'url',
				'instructions' => 'Optional. Example: https://wa.me/30XXXXXXXXXX',
			],
			[
				'key'   => 'field_contact_seo_title',
				'label' => 'SEO Title',
				'name'  => 'seo_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_contact_seo_description',
				'label' => 'SEO Description',
				'name'  => 'seo_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
		],
		'location' => [
			[
				[
					'param'    => 'page',
					'operator' => '==',
					'value'    => $contact_page_id,
				],
			],
		],
		'position' => 'normal',
		'style'    => 'default',
		'active'   => true,
	]);

	$theme_page_id = (string) aria_ensure_theme_page();

	acf_add_local_field_group([
		'key'                => 'group_aria_theme',
		'title'              => 'Brand Colors',
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'themeFields',
		'map_graphql_types_from_location_rules' => 0,
		'graphql_types'      => ['Page'],
		'fields'             => [
			[
				'key'          => 'field_theme_accent',
				'label'        => 'Accent',
				'name'         => 'accent',
				'type'         => 'color_picker',
				'default_value'=> '#3D6B5C',
				'instructions' => 'Buttons, links, brand wordmark.',
			],
			[
				'key'          => 'field_theme_nav',
				'label'        => 'Nav bar',
				'name'         => 'nav',
				'type'         => 'color_picker',
				'default_value'=> '#C5B8AB',
				'instructions' => 'Main navigation background.',
			],
			[
				'key'          => 'field_theme_pattern',
				'label'        => 'Pattern / blush',
				'name'         => 'pattern',
				'type'         => 'color_picker',
				'default_value'=> '#F2EFE9',
				'instructions' => 'Soft section backgrounds.',
			],
			[
				'key'          => 'field_theme_surface_muted',
				'label'        => 'Surface muted',
				'name'         => 'surface_muted',
				'type'         => 'color_picker',
				'default_value'=> '#F6F3EE',
			],
			[
				'key'          => 'field_theme_dark_band',
				'label'        => 'Dark band',
				'name'         => 'dark_band',
				'type'         => 'color_picker',
				'default_value'=> '#3A403C',
				'instructions' => 'Quote bands, dark split sections, Instagram CTA.',
			],
			[
				'key'          => 'field_theme_text',
				'label'        => 'Body text',
				'name'         => 'text',
				'type'         => 'color_picker',
				'default_value'=> '#2A2E2C',
			],
		],
		'location' => [
			[
				[
					'param'    => 'page',
					'operator' => '==',
					'value'    => $theme_page_id,
				],
			],
		],
		'position' => 'normal',
		'style'    => 'default',
		'active'   => true,
	]);

	aria_seed_theme_defaults((int) $theme_page_id);

	acf_add_local_field_group([
		'key'                => 'group_aria_campaign',
		'title'              => 'Campaign Details',
		'show_in_graphql'    => 1,
		'graphql_field_name' => 'campaignDetails',
		'map_graphql_types_from_location_rules' => 0,
		'graphql_types'      => ['Campaign'],
		'fields'             => [
			[
				'key'   => 'field_campaign_eyebrow',
				'label' => 'Eyebrow',
				'name'  => 'eyebrow',
				'type'  => 'text',
			],
			[
				'key'   => 'field_campaign_hero_title',
				'label' => 'Hero Title',
				'name'  => 'hero_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_campaign_hero_description',
				'label' => 'Hero Description',
				'name'  => 'hero_description',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'           => 'field_campaign_hero_image',
				'label'         => 'Hero Image',
				'name'          => 'hero_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'          => 'field_campaign_introduction',
				'label'        => 'Introduction',
				'name'         => 'introduction',
				'type'         => 'wysiwyg',
				'tabs'         => 'all',
				'toolbar'      => 'basic',
				'media_upload' => 0,
			],
			[
				'key'          => 'field_campaign_body_content',
				'label'        => 'Main Content',
				'name'         => 'body_content',
				'type'         => 'wysiwyg',
				'tabs'         => 'all',
				'toolbar'      => 'basic',
				'media_upload' => 1,
			],
			[
				'key'           => 'field_campaign_secondary_image',
				'label'         => 'Secondary Image',
				'name'          => 'secondary_image',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'   => 'field_campaign_cta_title',
				'label' => 'CTA Title',
				'name'  => 'cta_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_campaign_cta_text',
				'label' => 'CTA Text',
				'name'  => 'cta_text',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'   => 'field_campaign_cta_button_label',
				'label' => 'CTA Button Label',
				'name'  => 'cta_button_label',
				'type'  => 'text',
			],
			[
				'key'   => 'field_campaign_cta_button_url',
				'label' => 'CTA Button URL',
				'name'  => 'cta_button_url',
				'type'  => 'text',
				'instructions' => 'Usually /contact — this is the URL you share from Instagram.',
			],
			[
				'key'   => 'field_campaign_seo_title',
				'label' => 'SEO Title',
				'name'  => 'seo_title',
				'type'  => 'text',
			],
			[
				'key'   => 'field_campaign_seo_description',
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
					'value'    => 'campaign',
				],
			],
		],
		'position' => 'normal',
		'style'    => 'default',
		'active'   => true,
	]);
});

/**
 * Ensure the singleton Site Theme page exists and return its ID.
 */
function aria_ensure_theme_page(): int
{
	$existing_id = (int) get_option('aria_theme_page_id');
	if ($existing_id > 0) {
		$post = get_post($existing_id);
		if ($post instanceof WP_Post && $post->post_type === 'page') {
			return $existing_id;
		}
	}

	$by_slug = get_page_by_path('site-theme');
	if ($by_slug instanceof WP_Post) {
		update_option('aria_theme_page_id', $by_slug->ID);
		return (int) $by_slug->ID;
	}

	$page_id = wp_insert_post(
		[
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => 'Site Theme',
			'post_name'    => 'site-theme',
			'post_content' => 'Brand colors for the Next.js frontend. Edit the Brand Colors fields below — this page is not shown in the site navigation.',
		],
		true
	);

	if (is_wp_error($page_id) || !is_int($page_id) || $page_id <= 0) {
		return 0;
	}

	update_option('aria_theme_page_id', $page_id);

	return $page_id;
}

/**
 * Fill default brand colors once so GraphQL never returns empty pickers.
 */
function aria_seed_theme_defaults(int $page_id): void
{
	if ($page_id <= 0 || !function_exists('update_field')) {
		return;
	}

	if (get_option('aria_theme_defaults_seeded')) {
		return;
	}

	$defaults = [
		'accent'         => '#3D6B5C',
		'nav'            => '#C5B8AB',
		'pattern'        => '#F2EFE9',
		'surface_muted'  => '#F6F3EE',
		'dark_band'      => '#3A403C',
		'text'           => '#2A2E2C',
	];

	foreach ($defaults as $name => $value) {
		$current = get_field($name, $page_id);
		if ($current === null || $current === false || $current === '') {
			update_field($name, $value, $page_id);
		}
	}

	update_option('aria_theme_defaults_seeded', 1);
}
