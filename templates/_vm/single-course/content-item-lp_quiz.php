<?php
/**
 * Template for displaying quiz item content in single course.
 *
 * This template can be overridden by copying it to yourtheme/learnpress/single-course/content-item-lp_quiz.php.
 *
 * @author   ThimPress
 * @package  Learnpress/Templates
 * @version  3.x.x
 */

/**
 * Prevent loading this file directly
 */
defined( 'ABSPATH' ) || exit();

$quiz = LP_Global::course_item_quiz();

?>
<div class="content-item-summary">
	<?php
	/**
	 * @see learn_press_content_item_summary_title()
	 * @see learn_press_content_item_summary_content()
	 */
	do_action( 'learn-press/vm/before-content-item-summary/' . $quiz->get_item_type() );

	?>

	<?php
	/**
	 * @see learn_press_content_item_summary_question()
	 */
	do_action( 'learn-press/vm/content-item-summary/' . $quiz->get_item_type() );
	?>

	<?php
	/**
	 * @see learn_press_content_item_summary_question_numbers()
	 */
	do_action( 'learn-press/vm/after-content-item-summary/' . $quiz->get_item_type() );
	?>
</div>