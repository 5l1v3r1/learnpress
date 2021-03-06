<?php
/**
 * Template for displaying top-bar in archive course page.
 *
 * @author  ThimPress
 * @package LearnPress/Templates
 * @version 3.3.0
 */

defined('ABSPATH') or die;

$layouts = learn_press_courses_layouts();
$active  = learn_press_get_courses_layout();
$s       = LP_Request::get( 's' );
?>
<div class="lp-courses-bar <?php echo $active ?>">
    <form class="search-courses" method="post">
        <input type="text" placeholder="<?php esc_attr_e( 'Search courses...', 'learnpress' ); ?>" name="s"
               value="<?php echo esc_attr( $s ); ?>">
        <button type="submit"><i class="fas fa-search"></i></button>
    </form>

    <div class="switch-layout">
		<?php foreach ( $layouts as $layout ) { ?>
            <input type="radio"
                   name="lp-switch-layout-btn"
                   value="<?php echo esc_attr( $layout ); ?>"
                   id="lp-switch-layout-btn-<?php echo $layout; ?>" <?php checked( $layout, $active ); ?>>
            <label class="switch-btn <?php echo $layout; ?>"
                   title="<?php echo esc_attr__( sprintf( __( 'Switch to %s', 'learnpress' ), $layout ) ); ?>"
                   for="lp-switch-layout-btn-<?php echo $layout; ?>"></label>
		<?php } ?>
    </div>
</div>