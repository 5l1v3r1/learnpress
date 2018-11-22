<?php
/**
 * Template for displaying description of quiz.
 *
 * This template can be overridden by copying it to yourtheme/learnpress/content-quiz/description.php.
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

if ( ! $content = $quiz->get_content() ) {
	return;
}
?>

<div class="content-item-description quiz-description" v-show="hasAccessLevel(20, '!') && !isReviewing"><?php echo $content; ?></div>
