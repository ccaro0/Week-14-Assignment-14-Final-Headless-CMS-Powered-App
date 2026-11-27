<?php
// WordPress runs this file on the server. It loads the parent theme's stylesheet
// and adds three read-only REST endpoints, one for each custom post type.

// When WordPress builds the front-end styles, also load the parent theme's style.css
// so the child theme keeps the Twenty Twenty-One look.
add_action('wp_enqueue_scripts', 'enqueue_parent_styles');

function enqueue_parent_styles() {
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
}


// When the REST API starts, register the three custom URLs below.
add_action('rest_api_init', 'register_my_routes');

// Each register_rest_route() call creates one public GET address under
// /wp-json/twentytwentyone-child/v1/. The callback is the function that runs
// the SQL query for that post type.
function register_my_routes() {
    // Published especialidades, for example .../v1/especialidades
    register_rest_route(
        'twentytwentyone-child/v1',
        '/especialidades',
        array(
            'methods' => 'GET',
            'callback' => 'get_especialidades_via_sql',
            'permission_callback' => '__return_true'
        )
    );

    // Published servicios, for example .../v1/servicios
    register_rest_route(
        'twentytwentyone-child/v1',
        '/servicios',
        array(
            'methods' => 'GET',
            'callback' => 'get_servicios_via_sql',
            'permission_callback' => '__return_true'
        )
    );

    // Published medicos, for example .../v1/medicos
    register_rest_route(
        'twentytwentyone-child/v1',
        '/medicos',
        array(
            'methods' => 'GET',
            'callback' => 'get_medicos_via_sql',
            'permission_callback' => '__return_true'
        )
    );
}


// Returns JSON for published especialidades posts.
// Joins wp_posts to wp_especialidades_data and keeps only post_type especialidades.
function get_especialidades_via_sql() {
    global $wpdb;
    $pre = $wpdb->prefix;
    $query  = "SELECT " . $pre . "posts.ID, ";
    $query .= $pre . "posts.post_title, ";
    $query .= $pre . "especialidades_data.especialidad_name, ";
    $query .= $pre . "especialidades_data.description, ";
    $query .= $pre . "especialidades_data.requirements, ";
    $query .= $pre . "especialidades_data.work_environment ";
    $query .= "FROM " . $pre . "posts ";
    $query .= "INNER JOIN " . $pre . "especialidades_data ";
    $query .= "ON " . $pre . "posts.ID = " . $pre . "especialidades_data.post_id ";
    $query .= "WHERE " . $pre . "posts.post_status = 'publish' ";
    $query .= "AND " . $pre . "posts.post_type = 'especialidades'";
    $results = $wpdb->get_results($query);
    return new WP_REST_Response($results, 200);
}

// Returns JSON for published servicios posts.
// Joins wp_posts to wp_servicios_data and keeps only post_type servicios.
function get_servicios_via_sql() {
    global $wpdb;
    $pre = $wpdb->prefix;
    $query  = "SELECT " . $pre . "posts.ID, ";
    $query .= $pre . "posts.post_title, ";
    $query .= $pre . "servicios_data.service_name, ";
    $query .= $pre . "servicios_data.description, ";
    $query .= $pre . "servicios_data.cost, ";
    $query .= $pre . "servicios_data.duration ";
    $query .= "FROM " . $pre . "posts ";
    $query .= "INNER JOIN " . $pre . "servicios_data ";
    $query .= "ON " . $pre . "posts.ID = " . $pre . "servicios_data.post_id ";
    $query .= "WHERE " . $pre . "posts.post_status = 'publish' ";
    $query .= "AND " . $pre . "posts.post_type = 'servicios'";
    $results = $wpdb->get_results($query);
    return new WP_REST_Response($results, 200);
}

// Returns JSON for published medicos posts.
// Joins wp_posts to wp_medicos_data and keeps only post_type medicos.
function get_medicos_via_sql() {
    global $wpdb;
    $pre = $wpdb->prefix;
    $query  = "SELECT " . $pre . "posts.ID, ";
    $query .= $pre . "posts.post_title, ";
    $query .= $pre . "medicos_data.doctor_name, ";
    $query .= $pre . "medicos_data.specialty, ";
    $query .= $pre . "medicos_data.education, ";
    $query .= $pre . "medicos_data.years_of_experience ";
    $query .= "FROM " . $pre . "posts ";
    $query .= "INNER JOIN " . $pre . "medicos_data ";
    $query .= "ON " . $pre . "posts.ID = " . $pre . "medicos_data.post_id ";
    $query .= "WHERE " . $pre . "posts.post_status = 'publish' ";
    $query .= "AND " . $pre . "posts.post_type = 'medicos'";
    $results = $wpdb->get_results($query);
    return new WP_REST_Response($results, 200);
}
