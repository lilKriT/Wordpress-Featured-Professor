<?php

/*
    Plugin Name: Featured Professor
    Version: 1.0
    Author: lilKriT
    Author URI: https://lilkrit.dev
*/

if (!defined("ABSPATH")) exit();

class FeaturedProfessor
{
    function __construct()
    {
        add_action("init", [$this, "onInit"]);
    }

    function onInit()
    {
        wp_register_script("featuredProfessorScript", plugin_dir_url(__FILE__) . "build/index.js", array("wp-blocks", "wp-i18n", "wp_editor"));
        wp_register_style("featuredProfessorStyle", plugin_dir_url(__FILE__) . "build/index.css");

        register_block_type("fprof/featured-professor", array(
            "render_callback" => [$this, "renderProfessor"],
            "editor_script" => "featuredProfessorScript",
            "editor_style" => "featuredProfessorStyle"
        ));
    }

    function renderProfessor($attributes)
    {
        return "<p>We will replace this soon</p>";
    }
}

$featuredProfessor = new FeaturedProfessor();
