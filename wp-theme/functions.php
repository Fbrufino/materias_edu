// Mapa Academico
function back_acamap() {
    if ( is_page(array('Mapa Acadêmico','416')) ) {
        wp_enqueue_script( 'datatables','https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js',array('jquery') );
        wp_enqueue_script( 'acamap_js',get_template_directory_uri() . '/teste_acamap/vis1.js',array('jquery','datatables') );
        wp_enqueue_script( 'acamap_dt','https://geeedu.github.io/materias_edu/lista.js' );
        wp_enqueue_style( 'corr_css',get_template_directory_uri() . '/teste_acamap/corr.css' );
        wp_enqueue_style( 'acamap_css',get_template_directory_uri() . '/teste_acamap/styling.css' );
    }
}
add_action( 'wp_enqueue_scripts', 'back_acamap' );
