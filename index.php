<?php

/*
    Plugin Name: Featured Professor Block Type
    Version: 1.0
    Author: lilKriT
    Author URI: https://lilkrit.dev
    Text Domain: featured-professor
    Domain Path: /languages
*/

if (!defined("ABSPATH")) exit;

require_once plugin_dir_path(__FILE__) . 'inc/generateProfessorHTML.php';
require_once plugin_dir_path(__FILE__) . 'inc/relatedPostsHTML.php';

class FeaturedProfessor
{
    function __construct()
    {
        add_action("init", [$this, "onInit"]);
        add_action("rest_api_init", [$this, "profHTML"]);
        add_filter("the_content", [$this, "addRelatedPosts"]);
    }

    function onInit()
    {
        load_plugin_textdomain("featured-professor", false, dirname(plugin_basename(__FILE__)) . "/languages");

        register_meta("post", "featuredProfessor", array(
            "show_in_rest" => true,
            "type" => "number",
            "single" => false
        ));

        wp_register_script("featuredProfessorScript", plugin_dir_url(__FILE__) . "build/index.js", array("wp-blocks", "wp-i18n", "wp-editor"));
        wp_register_style("featuredProfessorStyle", plugin_dir_url(__FILE__) . "build/index.css");
        wp_set_script_translations("featuredProfessorScript", "featured-professor", plugin_dir_path(__FILE__) . "/languages");

        register_block_type("fprof/featured-professor", array(
            "render_callback" => [$this, "renderProfessor"],
            "editor_script" => "featuredProfessorScript",
            "editor_style" => "featuredProfessorStyle"
        ));
    }

    function renderProfessor($attributes)
    {
        $id = $attributes["profID"];
        if ($id) {
            wp_enqueue_style("featuredProfessorStyle");
            return generateProfessorHTML($id);
        } else {
            return null;
        }
    }

    function profHTML()
    {
        register_rest_route("featuredProfessor/v1", "getHTML", array(
            "methods" => WP_REST_SERVER::READABLE,
            "callback" => [$this, "getProfHTML"]
        ));
    }

    function getProfHTML($data)
    {
        return generateProfessorHTML($data["profID"]);
    }

    function addRelatedPosts($content)
    {
        if (is_singular("professor") && in_the_loop() && is_main_query()) {
            return $content . relatedPostsHTML(get_the_id());
        }

        return $content;
    }
}

$featuredProfessor = new FeaturedProfessor();
