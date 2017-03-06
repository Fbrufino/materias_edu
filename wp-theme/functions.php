// Mapa Academico
function acamap_css() {
    if ( is_page(array('Mapa Acadêmico','416')) ) {
    wp_enqueue_style( 'corr_css',get_template_directory_uri() . '/teste_acamap/corr.css' );
        wp_enqueue_style( 'acamap_css',get_template_directory_uri() . '/teste_acamap/styling.css' );
    }
}
function acamap_js() {
    if ( is_page(array('Mapa Acadêmico','416')) ) {
        wp_enqueue_script( 'datatables','https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js',array('jquery') );
        wp_enqueue_script( 'acamap_js',get_template_directory_uri() . '/teste_acamap/vis.js',array('jquery','datatables') );
        wp_enqueue_script( 'acamap_dt','https://geeedu.github.io/materias_edu/lista.js' );
    }
}
add_action( 'wp_print_styles', 'acamap_css', 11 );
add_action( 'wp_enqueue_scripts', 'acamap_js' );
