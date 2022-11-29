<?php

/*
    Plugin Name: Featured Professor Block Type
    Version: 1.0
    Author: lilKriT
    Author URI: https://lilkrit.dev
*/

if (!defined("ABSPATH")) exit;

require_once plugin_dir_path(__FILE__) . 'inc/generateProfessorHTML.php';

class FeaturedProfessor
{
    function __construct()
    {
        add_action("init", [$this, "onInit"]);
        add_action("rest_api_init", [$this, "profHTML"]);
    }

    function onInit()
    {
        register_meta("post", "featuredProfessor", array(
            "show_in_rest" => true,
            "type" => "number",
            "single" => false
        ));

        wp_register_script("featuredProfessorScript", plugin_dir_url(__FILE__) . "build/index.js", array("wp-blocks", "wp-i18n", "wp-editor"));
        wp_register_style("featuredProfessorStyle", plugin_dir_url(__FILE__) . "build/index.css");

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
}

$featuredProfessor = new FeaturedProfessor();
