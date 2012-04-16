<?php
/*
Plugin Name: Beautiful Image Widget
Plugin URI: http://www.beautiful-landscapes.org/image-widget-page/
Description: Using this widget you could display beautiful nature images in the sidebar. You may define how many images should be displayed. Images loaded from random categories.
Version: 1.0
Author: Beautiful landscapes
Author URI: http://www.beautiful-landscapes.org/
*/

define(NEW_LINE, "\n");

class Beautiful_Image_Widget extends WP_Widget
{
	function Beautiful_Image_Widget() 
	{
		$widget_ops = array( 'description' => __( "Display beautiful landscape image on the sidebar.") );
		$this->WP_Widget('beautiful_image_widget', __('Beautiful Image'), $widget_ops);
		
		if ( is_active_widget(false, false, $this->id_base) )
			add_action( 'wp_head', array(&$this, 'style') );
	}
	
	function style() { ?>
	<style type="text/css">
		.beautiful-image-wrapper {width: 160px; padding-top: 10px;} 
		.beautiful-image-wrapper .more {width: 160px; text-align: center; font-size: smaller;} 
	</style>
<?php
	}


	function form($instance)
	{
		$instance = wp_parse_args(
				(array) $instance, 
				array( 
					'title'        => '',
					'display_link' => '1', 
					'display_num'  => '1'
				) 
			);
			
		$title        = strip_tags($instance['title']);
		$display_link = strip_tags($instance['display_link']);
		$display_num  = strip_tags($instance['display_num']);

	?>
		<p>
			<label title="Specify an alternative title."
				for="<?php echo $this->get_field_id('title'); ?>">Title:</label>
			
			<input class="widefat" type="text" value="<?php echo $title; ?>"
				id="<?php echo $this->get_field_id('title'); ?>"
				name="<?php echo $this->get_field_name('title'); ?>" />
		</p>
		<p>
			<label title='Specify the number of images that would be displayed in the sidebar.'>
				Number of images:<br/>
				<select class="widefat" name="<?php echo $this->get_field_name('display_num'); ?>">
					<option value="1" <?php echo (($display_num == 1) ? 'selected' : '') ?>>1 image</option>
					<option value="2" <?php echo (($display_num == 2) ? 'selected' : '') ?>>2 images</option>
					<option value="3" <?php echo (($display_num == 3) ? 'selected' : '') ?>>3 images</option>
				</select>
			</label>
		</p>
		<p>
			<label title='If you wish to support plugin development, please, tick this checkbox. Thank you!'>
				<input type="checkbox" class="checkbox"
					name="<?php echo $this->get_field_name('display_link'); ?>" 
					<?php echo (($display_link != 0) ? 'checked' : ''); ?>" value="1" />
					Display link
			</label>
		</p>
	<?php
	}
	
	function update($new_instance, $old_instance) {
		$instance = $old_instance;
		
		$instance['title']        = strip_tags($new_instance['title']);
		$instance['display_num']  = strip_tags($new_instance['display_num']);
		$instance['display_link'] = strip_tags($new_instance['display_link']);

		return $instance;
	}
	
	
	function widget($args, $instance)
	{
		extract($args, EXTR_SKIP);
		
		$title        = empty($instance['title']) ? ' ' : apply_filters('widget_title', $instance['title']);
		$display_num  = empty($instance['display_num']) ? ' ' : apply_filters('widget_display_num', $instance['display_num']);
		$display_link = empty($instance['display_link']) ? ' ' : apply_filters('widget_display_link', $instance['display_link']);
		
		if (intval($display_num) <= 0)
			$display_num = 1;
			
		$height = 130 * $display_num;
		
		echo $before_widget . NEW_LINE;
		
		if (!empty($title))
			echo $before_title . $title . $after_title . NEW_LINE;
			
		echo "<div class='beautiful-image-wrapper'>";
		echo "	<iframe src='http://www.beautiful-landscapes.org/widget/num/" . $display_num . "/' frameborder='0' style='height: " . $height . "px; width: 180px;'>Your browser does not support the IFRAME tag. Please, <a href='http://www.firefox.com/' target='_blank'>upgrade your browser</a>.</iframe>";
		
		if ($display_link == 1)
			echo "	<div class='more'><a href='http://www.beautiful-landscapes.org/' target='_blank'>Pictures of nature</a></div>" . NEW_LINE;
		
		echo "</div>";
		
		echo $after_widget;
	}
}

function load_beautiful_image_widget() {
	register_widget('Beautiful_Image_Widget');
}

add_action('widgets_init', 'load_beautiful_image_widget');


?>