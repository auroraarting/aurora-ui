<?php
/**
 * Seeds the three EMEA programmes from aurora_early_careers_redesign.html
 * as DRAFTS, so an editor can add the flags, map images and Pinpoint links
 * and then publish. Also fills the hub fields on the early-careers landing
 * page (48198) if they are empty.
 *
 *   wp eval-file seed-emea-programmes.php
 *
 * Run once, after importing acf-programmes.json and acf-early-careers-hub-fields.json.
 * Re-running skips any programme whose slug already exists.
 */

if ( ! function_exists( 'update_field' ) ) {
	WP_CLI::error( 'SCF/ACF is not active.' );
}

$group = 'group_programmes';
$keys  = array();
foreach ( acf_get_fields( $group ) ?: array() as $f ) {
	$keys[ $f['name'] ] = $f['key'];
}
if ( ! $keys ) {
	WP_CLI::error( "Field group $group not found — import acf-programmes.json first." );
}

$region = get_term_by( 'slug', 'europe', 'region' );
if ( ! $region ) {
	WP_CLI::error( 'Region "europe" not found.' );
}

$cities = array(
	'oxford'    => array( 'Oxford',    10, array( 'Aurora HQ — largest EMEA team', 'Vibrant university city, close to London', 'All 3 graduate programmes available' ) ),
	'berlin'    => array( 'Berlin',    20, array( 'German & Central European markets', 'Fast-growing office in energy hub', 'Analyst & Modeller roles' ) ),
	'madrid'    => array( 'Madrid',    30, array( 'Iberian Peninsula energy markets', 'Solar, wind & storage focus', 'Graduate Analyst role' ) ),
	'paris'     => array( 'Paris',     40, array( 'French & Benelux power markets', 'Nuclear, hydro & renewables expertise', 'Graduate Analyst role' ) ),
	'stockholm' => array( 'Stockholm', 50, array( 'Nordics energy market specialists', 'Hydro-dominated system dynamics', 'Graduate Analyst role' ) ),
	'athens'    => array( 'Athens',    60, array( 'Greek & SE European power markets', 'High-growth renewables market', 'Graduate Analyst role' ) ),
);

/** HTML list from an array of strings. */
function ecp_list( $items ) {
	return '<ul><li>' . implode( '</li><li>', array_map( 'esc_html', $items ) ) . '</li></ul>';
}

/** City rows for a programme: every EMEA city, switched on where offered. */
function ecp_cities( $cities, $offered ) {
	$rows = array();
	foreach ( $cities as $slug => $c ) {
		$rows[] = array(
			'city'       => $c[0],
			'available'  => in_array( $slug, $offered, true ) ? 1 : 0,
			'sequence'   => $c[1],
			'facts'      => array_map( fn( $t ) => array( 'text' => $t ), $c[2] ),
			'deadline'   => 'Exp. Nov 27',
			'apply_url'  => '',
			'apply_text' => '',
		);
	}
	return $rows;
}

$programmes = array(
	array(
		'slug'    => 'emea-graduate-analyst',
		'title'   => 'EMEA Graduate Analyst',
		'order'   => 1,
		'accent'  => 'teal',
		'tag'     => 'Graduate Analyst Programme',
		'hub'     => 'Graduate Analyst',
		'intro'   => "Join Aurora's analytical community across Europe, the Middle East and Africa — producing forecasts and strategic advice that shape the global energy transition.",
		'map'     => 'EMEA locations — Graduate Analyst',
		'where'   => 'Oxford · Berlin · Madrid · Paris · Stockholm · Athens',
		'about'   => "The Graduate Analyst Programme gives you an immersive introduction to energy markets analysis. You'll work alongside senior analysts on live client projects — producing forecasts, reports and strategic advisory that directly shape investment decisions across the global energy sector.",
		'do'      => array( 'Analyse power markets, grid infrastructure and policy across your region', 'Build and maintain quantitative models for energy price forecasting', 'Contribute to client reports and presentations', 'Collaborate cross-functionally with modelling and software teams' ),
		'look'    => array( 'Strong quantitative and analytical ability', 'Degree in economics, engineering, mathematics, physics or related field', 'Intellectual curiosity about energy markets and the energy transition', 'Excellent written and verbal communication' ),
		'sub'     => 'Select a city to apply via Pinpoint — the full job description and application form will open.',
		'offered' => array( 'oxford', 'berlin', 'madrid', 'paris', 'stockholm', 'athens' ),
	),
	array(
		'slug'    => 'emea-graduate-modeller',
		'title'   => 'EMEA Graduate Modeller',
		'order'   => 2,
		'accent'  => 'gold',
		'tag'     => 'Graduate Modeller Programme',
		'hub'     => 'Graduate Modeller',
		'intro'   => "Build the quantitative engine behind Aurora's forecasts — sitting at the intersection of energy systems, mathematics and cutting-edge computational methods.",
		'map'     => 'EMEA locations — Graduate Modeller',
		'where'   => 'Oxford · Berlin',
		'about'   => "Graduate Modellers develop Aurora's proprietary large-scale simulations of electricity markets and grid infrastructure. You'll work with world-class researchers and engineers to produce the forecasts that underpin strategic decisions for clients worldwide.",
		'do'      => array( 'Develop and validate energy system models in Python and other tools', 'Improve forecast accuracy through statistical analysis and calibration', 'Work with large, complex datasets from grid operators and market exchanges', 'Collaborate with analysts and software engineers in cross-functional teams' ),
		'look'    => array( 'Strong mathematical, statistical or computational background', 'Degree in mathematics, physics, engineering, computer science or related', 'Programming experience (Python preferred)', 'Interest in energy systems and market design' ),
		'sub'     => 'Modeller roles available in Oxford and Berlin. Click to apply via Pinpoint.',
		'offered' => array( 'oxford', 'berlin' ),
	),
	array(
		'slug'    => 'emea-graduate-software-engineer',
		'title'   => 'EMEA Graduate Software Engineer',
		'order'   => 3,
		'accent'  => 'blue',
		'tag'     => 'Graduate Software Engineer Programme',
		'hub'     => 'Graduate Software Engineer',
		'intro'   => "Build the tools, platforms and infrastructure that power Aurora's analytics and client-facing products — at the frontier of energy data and software engineering.",
		'map'     => 'EMEA locations — Graduate Software Engineer',
		'where'   => 'Oxford',
		'about'   => "Graduate Software Engineers at Aurora build and maintain the EOS platform, internal tools and the data pipelines that support our models and analytics. You'll work within agile product teams, contributing to real features that thousands of energy professionals use every day.",
		'do'      => array( "Develop full-stack features for Aurora's EOS analytics platform", 'Design and maintain scalable data pipelines and APIs', 'Collaborate with modellers and analysts to surface insights effectively', 'Participate in code reviews, testing and architectural decisions' ),
		'look'    => array( 'Degree in computer science, software engineering or related field', 'Proficiency in Python and/or JavaScript/TypeScript', 'Understanding of software design principles and data structures', 'Collaborative, product-minded approach to engineering' ),
		'sub'     => 'Software Engineering roles are Oxford-based. Click to apply via Pinpoint.',
		'offered' => array( 'oxford' ),
	),
);

foreach ( $programmes as $p ) {
	if ( get_page_by_path( $p['slug'], OBJECT, 'programmes' ) ) {
		WP_CLI::log( "skip {$p['slug']} — already exists" );
		continue;
	}
	$id = wp_insert_post( array(
		'post_type'   => 'programmes',
		'post_status' => 'draft',
		'post_title'  => $p['title'],
		'post_name'   => $p['slug'],
		'menu_order'  => $p['order'],
	), true );
	if ( is_wp_error( $id ) ) {
		WP_CLI::warning( "{$p['slug']}: " . $id->get_error_message() );
		continue;
	}
	wp_set_object_terms( $id, array( $region->term_id ), 'region' );

	update_field( $keys['header'], array(
		'tag'        => $p['tag'],
		'accent'     => $p['accent'],
		'hub_label'  => $p['hub'],
		'breadcrumb' => 'Early Careers / EMEA',
		'intro'      => $p['intro'],
	), $id );
	update_field( $keys['map'], array( 'eyebrow' => $p['map'] ), $id );
	update_field( $keys['overview'], array(
		'eyebrow' => 'General overview of opportunities',
		'cards'   => array(
			array( 'label' => 'Programme length', 'value' => '2 years' ),
			array( 'label' => 'Start date', 'value' => 'September 2026' ),
			array( 'label' => 'Region', 'value' => 'EMEA' ),
			array( 'label' => 'Locations', 'value' => $p['where'] ),
		),
	), $id );
	update_field( $keys['body_sections'], array(
		array( 'heading' => 'About the programme', 'content' => '<p>' . esc_html( $p['about'] ) . '</p>' ),
		array( 'heading' => "What you'll do", 'content' => ecp_list( $p['do'] ) ),
		array( 'heading' => 'What we look for', 'content' => ecp_list( $p['look'] ) ),
	), $id );
	update_field( $keys['locations'], array(
		'title'    => 'Choose your location',
		'subtitle' => $p['sub'],
		'cities'   => ecp_cities( $cities, $p['offered'] ),
	), $id );

	WP_CLI::success( "created draft {$p['slug']} (#$id)" );
}

// Hub fields on the existing landing page — only if nothing is there yet.
$hub = array();
foreach ( acf_get_fields( 'group_ecp_hub_fields' ) ?: array() as $f ) {
	$hub[ $f['name'] ] = $f['key'];
}
$landing = 48198;
$hero    = $hub ? get_field( $hub['hero'], $landing ) : null;
if ( $hub && empty( $hero['title'] ) ) {
	update_field( $hub['hero'], array(
		'title'       => 'Launch your energy career',
		'highlight'   => 'with Aurora',
		'description' => "At Aurora, we don't just predict the future of energy — we help shape it. Our graduate opportunities offer you a unique platform to thrive, with roles available across the globe.",
		'button_text' => 'Join us',
	), $landing );
	update_field( $hub['explore'], array(
		'eyebrow' => 'Explore',
		'title'   => "Explore Aurora's opportunities by region",
	), $landing );

	$current = 'https://auroraer.com/careers/early-careers';
	$notes   = array(
		'asia'          => "APAC graduate programmes — roles in Japan, Singapore, Australia and India are available on the <a href=\"$current\">current site</a>. This section will be updated as the page expands.",
		'north-america' => "North America graduate programmes — United States and Canada roles are available on the <a href=\"$current\">current site</a>.",
		'south-america' => "South America graduate programmes — Brazil and Chile roles are available on the <a href=\"$current\">current site</a>.",
	);
	$rows = array();
	foreach ( $notes as $slug => $note ) {
		$term = get_term_by( 'slug', $slug, 'region' );
		if ( ! $term ) {
			WP_CLI::warning( "Region \"$slug\" not found — note skipped." );
			continue;
		}
		$rows[] = array( 'region' => $term->term_id, 'note' => "<p>$note</p>" );
	}
	update_field( $hub['region_notes'], $rows, $landing );
	WP_CLI::success( 'filled hub fields on page #48198' );
} else {
	WP_CLI::log( 'hub fields already filled (or group missing) — left alone' );
}
