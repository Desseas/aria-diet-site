<?php
/**
 * Plugin Name: Aria Revalidate Webhook
 * Description: Notifies the Next.js /api/revalidate endpoint when content is published or updated.
 * Version: 0.1.0
 *
 * Configure via Docker / wp-config:
 *   ARIA_REVALIDATE_URL    e.g. http://host.docker.internal:3000/api/revalidate
 *   ARIA_REVALIDATE_SECRET same value as Next.js REVALIDATION_SECRET
 */

declare(strict_types=1);

/**
 * @return array{url: string, secret: string}|null
 */
function aria_revalidate_config(): ?array
{
	$url = getenv('ARIA_REVALIDATE_URL') ?: (defined('ARIA_REVALIDATE_URL') ? (string) ARIA_REVALIDATE_URL : '');
	$secret = getenv('ARIA_REVALIDATE_SECRET') ?: (defined('ARIA_REVALIDATE_SECRET') ? (string) ARIA_REVALIDATE_SECRET : '');

	$url = is_string($url) ? trim($url) : '';
	$secret = is_string($secret) ? trim($secret) : '';

	if ($url === '' || $secret === '') {
		return null;
	}

	return ['url' => $url, 'secret' => $secret];
}

/**
 * Fire after a relevant post is saved (create/update/publish).
 */
add_action('save_post', static function (int $post_id, WP_Post $post, bool $update): void {
	if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
		return;
	}

	if ($post->post_status !== 'publish' && $post->post_status !== 'trash') {
		return;
	}

	$allowed = ['service', 'campaign', 'page'];
	if (!in_array($post->post_type, $allowed, true)) {
		return;
	}

	$config = aria_revalidate_config();
	if ($config === null) {
		return;
	}

	$slug = $post->post_name;
	if ($post->post_type === 'page') {
		$front_id = (int) get_option('page_on_front');
		if ($front_id > 0 && $front_id === $post_id) {
			$slug = 'home';
		}
	}

	$body = wp_json_encode([
		'secret'   => $config['secret'],
		'postType' => $post->post_type,
		'slug'     => $slug,
	]);

	if (!is_string($body)) {
		return;
	}

	wp_remote_post(
		$config['url'],
		[
			'timeout'  => 5,
			'blocking' => false,
			'headers'  => [
				'Content-Type' => 'application/json',
			],
			'body'     => $body,
		]
	);
}, 20, 3);
