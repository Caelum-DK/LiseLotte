/*
*  Input Actions
*
*  @description: javascript for fields functionality		
*  @author: Elliot Condon
*  @since: 3.1.4
*/

var acf = {
	validation : false,
	validation_message : "Validation Failed. One or more fields below are required.", // this is overriden by a script tag generated in admin_head for translation
	editor_mode : 'visual'
};

(function($){
	
		
	/*
	*  Exists
	*
	*  @description: returns true / false		
	*  @created: 1/03/2011
	*/
	
	$.fn.exists = function()
	{
		return $(this).length>0;
	};
	
	
	/*
	*  Submit form
	*
	*  @description: does validation, deletes all hidden metaboxes (otherwise, post data will be overriden by hidden inputs)
	*  @created: 1/03/2011
	*/
	
	$('form#post').live("submit", function(){
		
		// do validation
		do_validation();
		
		if(acf.valdation == false)
		{
			// reset validation for next time
			acf.valdation = true;
			
			// show message
			$('#post').siblings('#message').remove();
			$('#post').before('<div id="message" class="error"><p>' + acf.validation_message + '</p></div>');
			
			
			// hide ajax stuff on submit button
			$('#publish').removeClass('button-primary-disabled');
			$('#ajax-loading').attr('style','');
			
			return false;
		}
		
		$('.acf_postbox:hidden').remove();
		
		// submit the form
		return true;
		
	});
	
	
	/*
	*  do_validation
	*
	*  @description: checks fields for required input
	*  @created: 1/03/2011
	*/
	
	function do_validation(){
		
		$('.acf_postbox:visible .field.required').each(function(){
			
			var validation = true;

			// text / textarea
			if($(this).find('input[type="text"], input[type="hidden"], textarea').val() == "")
			{
				validation = false;
			}
			
			// select
			if($(this).find('select').exists())
			{
				if($(this).find('select').val() == "null" || !$(this).find('select').val())
				{
					validation = false;
				}
			}
			
			// checkbox
			if($(this).find('input[type="checkbox"]:checked').exists())
			{
				validation = true;
			}
			
			// checkbox
			if($(this).find('.acf_relationship').exists() && $(this).find('input[type="hidden"]').val() != "")
			{
				validation = true;
			}
			
			// repeater
			if($(this).find('.repeater').exists())
			{

				if($(this).find('.repeater tr.row').exists())
				{
					validation = true;
				}
				else
				{
					validation = false;
				}
				//console.log(validation);
				
			}
			
			
			// flexible content
			if($(this).find('.acf_flexible_content').exists())
			{
				if($(this).find('.acf_flexible_content .values table').exists())
				{
					validation = true;
				}
				else
				{
					validation = false;
				}
				
			}

			// set validation
			if(!validation)
			{
				acf.valdation = false;
				$(this).closest('.field').addClass('error');
			}
			
		});
		
		
	}
	
	
	/*
	*  Remove error class on focus
	*
	*  @description: 
	*  @created: 1/03/2011
	*/

	// inputs / textareas
	$('.acf_postbox .field.required input, .acf_postbox .field.required textarea, .acf_postbox .field.required select').live('focus', function(){
		$(this).closest('.field').removeClass('error');
	});
	
	// checkbox
	$('.acf_postbox .field.required input:checkbox').live('click', function(){
		$(this).closest('.field').removeClass('error');
	});
	
	// wysiwyg
	$('.acf_postbox .field.required .acf_wysiwyg').live('mousedown', function(){
		$(this).closest('.field').removeClass('error');
	});
	
	
	/*
	*  Field: Color Picker
	*
	*  @description: 
	*  @created: 1/03/2011
	*/
	
	var farbtastic;
			
	$(document).ready(function(){
	
		$('body').append('<div id="acf_color_picker" />');
		if($.farbtastic)
		{
			farbtastic = $.farbtastic('#acf_color_picker');
		}
		
		
	});
				
	$('#poststuff input.acf_color_picker').live('focus', function(){
		
		var input = $(this);
		
		$('#acf_color_picker').css({
			left: input.offset().left,
			top: input.offset().top - $('#acf_color_picker').height(),
			display: 'block'
		});
		
		farbtastic.linkTo(this);
		
	}).live('blur', function(){

		$('#acf_color_picker').css({
			display: 'none'
		});
						
	});
	
	
	/*
	*  Field: File
	*
	*  @description: 
	*  @created: 1/03/2011
	*/
	
	$('#poststuff .acf_file_uploader .no-file .button').live('click', function(){
				
		// vars
		var div = $(this).closest('.acf_file_uploader');
		
		// set global var
		window.acf_div = div;
			
		// show the thickbox
		tb_show('Add Image to field', acf.admin_url + 'media-upload.php?post_id=' + acf.post_id + '&type=file&acf_type=file&TB_iframe=1');
	
		return false;
	});
		
	$('#poststuff .acf_file_uploader .acf-file-delete').live('click', function(){
		
		// vars
		var div = $(this).closest('.acf_file_uploader');
		
		div.removeClass('active').find('input.value').val('');
		
		return false;
		
	});
	
	
	/*
	*  Field: Image
	*
	*  @description: 
	*  @created: 1/03/2011
	*/
	
	$('#poststuff .acf_image_uploader .button').live('click', function(){
				
		// vars
		var div = $(this).closest('.acf_image_uploader');
		var preview_size = div.attr('data-preview_size');
		
		// set global var
		window.acf_div = div;
			
		// show the thickbox
		tb_show('Add Image to field', acf.admin_url + 'media-upload.php?post_id=' + acf.post_id + '&type=image&acf_type=image&acf_preview_size=' + preview_size + 'TB_iframe=1');
	
		return false;
	});
		
	$('#poststuff .acf_image_uploader .remove_image').live('click', function(){
		
		// vars
		var div = $(this).closest('.acf_image_uploader');
		
		div.removeClass('active').find('input.value').val('');
		
		return false;
		
	});
	
	
	/*
	*  Field: Relationship
	*
	*  @description: 
	*  @created: 3/03/2011
	*/
	
	// on mouse over, make list sortable
	$('#poststuff .acf_relationship').live('mouseenter', function(){
		
		if($(this).attr('data-is_setup')) return false;
		
		$(this).attr('data-is_setup','true');
		
		$(this).find('.relationship_right .relationship_list').sortable({
			axis: "y", // limit the dragging to up/down only
		    start: function(event, ui)
		    {
				ui.item.addClass('sortable_active');
		    },
		    stop: function(event, ui)
		    {
		    	ui.item.removeClass('sortable_active');
		    	ui.item.closest('.acf_relationship').update_acf_relationship_value();
		    }
		});
		
	});
	
	// updates the input value of a relationship field
	$.fn.update_acf_relationship_value = function(){
	
		// vars
		var div = $(this);
		var value = "";
		
		// add id's to array
		div.find('.relationship_right .relationship_list a:not(.hide)').each(function(){
			value += $(this).attr('data-post_id') + ",";
		});
		
		// remove last ","
		value = value.slice(0, -1);
		
		// set value
		div.children('input').val(value);
		
	};
	
	// add from left to right
	$('#poststuff .acf_relationship .relationship_left .relationship_list a').live('click', function(){
		
		// vars
		var id = $(this).attr('data-post_id');
		var div = $(this).closest('.acf_relationship');
		var max = parseInt(div.attr('data-max')); if(max == -1){ max = 9999; }
		var right = div.find('.relationship_right .relationship_list');
		
		// max posts
		if(right.find('a:not(.hide)').length >= max)
		{
			alert('Maximum values reached ( ' + max + ' values )');
			return false;
		}

		// hide / show
		$(this).addClass('hide');
		right.find('a[data-post_id="' + id + '"]').removeClass('hide').appendTo(right);
		
		// update input value
		div.update_acf_relationship_value();
		
		// validation
		div.closest('.field').removeClass('error');
		
		return false;
		
	});
	
	// remove from right to left
	$('#poststuff .acf_relationship .relationship_right .relationship_list a').live('click', function(){
		
		// vars
		var id = $(this).attr('data-post_id');
		var div = $(this).closest('.acf_relationship');
		var left = div.find('.relationship_left .relationship_list');
		
		// hide / show
		$(this).addClass('hide');
		left.find('a[data-post_id="' + id + '"]').removeClass('hide');
		
		// update input value
		div.update_acf_relationship_value();

		return false;
		
	});
	
	
	// search left
	$.expr[':'].Contains = function(a,i,m){
    	return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};
	$('#poststuff .acf_relationship input.relationship_search').live('change', function()
	{	
		// vars
		var filter = $(this).val();
		var div = $(this).closest('.acf_relationship');
		var left = div.find('.relationship_left .relationship_list');
		
	    if(filter)
	    {
			left.find("a:not(:Contains(" + filter + "))").addClass('filter_hide');
	        left.find("a:Contains(" + filter + "):not(.hide)").removeClass('filter_hide');
	    }
	    else
	    {
	    	left.find("a:not(.hide)").removeClass('filter_hide');
	    }

	    return false;
	    
	})
	.live('keyup', function(){
	    $(this).change();
	})
	.live('focus', function(){
		$(this).siblings('label').hide();
	})
	.live('blur', function(){
		if($(this).val() == "")
		{
			$(this).siblings('label').show();
		}
	});
	
	
	
	/*
	*  Field: WYSIWYG
	*
	*  @description: 
	*  @created: 3/03/2011
	*/
	
	// store wysiwyg buttons
	var acf_wysiwyg_buttons = {};
	
	// destroy wysiwyg
	$.fn.acf_deactivate_wysiwyg = function(){

		$(this).find('.acf_wysiwyg textarea').each(function(){

			tinyMCE.execCommand("mceRemoveControl", false, $(this).attr('id'));
			
		});
		
	};
	
	// create wysiwyg
	$.fn.acf_activate_wysiwyg = function(){
		

		// add tinymce to all wysiwyg fields
		$(this).find('.acf_wysiwyg textarea').each(function(){
			
			if(tinyMCE != undefined && tinyMCE.settings != undefined)
			{
				// reset buttons
				tinyMCE.settings.theme_advanced_buttons1 = acf_wysiwyg_buttons.theme_advanced_buttons1;
				tinyMCE.settings.theme_advanced_buttons2 = acf_wysiwyg_buttons.theme_advanced_buttons2;
			
				var toolbar = $(this).closest('.acf_wysiwyg').attr('data-toolbar');
				
				if(toolbar == 'basic')
				{
					tinyMCE.settings.theme_advanced_buttons1 = "bold,italic,formatselect,|,link,unlink,|,bullist,numlist,|,undo,redo";
					tinyMCE.settings.theme_advanced_buttons2 = "";
				}
				else
				{
					// add images + code buttons
					tinyMCE.settings.theme_advanced_buttons2 += ",code";
				}
			}
			
			//tinyMCE.init(tinyMCEPreInit.mceInit);
			tinyMCE.execCommand('mceAddControl', false, $(this).attr('id'));

		});
		
	};
	
	
	// create wysiwygs
	$(document).live('acf/setup_fields', function(e, postbox){
		
		if(typeof(tinyMCE) != "object")
		{
			return false;
		}
		
		$(postbox).acf_activate_wysiwyg();

	});
		
	$(window).load(function(){
		
		if(typeof(tinyMCE) != "object")
		{
			return false;
		}

		// store variables
		if(tinyMCE != undefined && tinyMCE.settings != undefined)
		{
			acf_wysiwyg_buttons.theme_advanced_buttons1 = tinyMCE.settings.theme_advanced_buttons1;
			acf_wysiwyg_buttons.theme_advanced_buttons2 = tinyMCE.settings.theme_advanced_buttons2;
		}
		
		$(document).trigger('acf/setup_fields', $('#poststuff'));
		
		// if editor_mode == html, toggle the html mode button on the default editor
		if(acf.editor_mode && acf.editor_mode == "html")
		{
			// click html tab after the wysiwyg has been initialed to prevent dual editor buttons
			setTimeout(function(){
				$('#poststuff #postdivrich #content-html').trigger('click');
			}, 1);
			
		}
		
	});
	
	// Sortable: Start
	$('#poststuff .repeater > table > tbody, #poststuff .acf_flexible_content > .values').live( "sortstart", function(event, ui) {
		
		$(ui.item).find('.acf_wysiwyg textarea').each(function(){
			tinyMCE.execCommand("mceRemoveControl", false, $(this).attr('id'));
		});
		
	});
	
	// Sortable: End
	$('#poststuff .repeater > table > tbody, #poststuff .acf_flexible_content > .values').live( "sortstop", function(event, ui) {
		
		$(ui.item).find('.acf_wysiwyg textarea').each(function(){
			tinyMCE.execCommand("mceAddControl", false, $(this).attr('id'));
		});
		
	});
	
	
	/*
	*  Field: Repeater
	*
	*  @description: 
	*  @created: 3/03/2011
	*/
	
	// create a unique id
	function uniqid()
    {
    	var newDate = new Date;
    	return newDate.getTime();
    }
    
	// update order numbers
	function update_r_order_numbers(div)
	{
		div.children('table').children('tbody').children('tr.row').each(function(i){
			$(this).children('td.order').html(i+1);
		});
	
	};
	
	
	// make sortable
	function make_r_sortable(div){
		
		var fixHelper = function(e, ui) {
			ui.children().each(function() {
				$(this).width($(this).width());
			});
			return ui;
		};
		
		div.children('table').children('tbody').unbind('sortable').sortable({
			update: function(event, ui){
				update_r_order_numbers(div);
			},
			items : '> tr',
			handle: '> td.order',
			helper: fixHelper,
			axis: "y" // limit the dragging to up/down only
		});
	};
	
	$(document).live('acf/setup_fields', function(e, postbox){
		
		$(postbox).find('.repeater').each(function(){
		
			var div = $(this);
			var row_limit = parseInt(div.attr('data-row_limit'));
			var row_count = div.children('table').children('tbody').children('tr.row').length;
			
			// has limit been reached?
			if(row_count >= row_limit) div.find('#r_add_row').attr('disabled','true');
			
			// sortable
			if(row_limit > 1){
				make_r_sortable(div);
			}
			
		});
			
	});
	
	// add field
	$('#poststuff .repeater #r_add_row').live('click', function(){
		
		var div = $(this).closest('.repeater');
		var row_limit = parseInt(div.attr('data-row_limit'));			
		var row_count = div.children('table').children('tbody').children('tr.row').length;
		
		// row limit
		if(row_count >= row_limit)
		{
			// reached row limit!
			div.find('#r_add_row').attr('disabled','true');
			return false;
		}
		
		// deactivate any wysiwygs
		div.children('table').children('tbody').children('tr.row_clone').acf_deactivate_wysiwyg();
	
		// create and add the new field
		var new_field = div.children('table').children('tbody').children('tr.row_clone').clone(false);
		new_field.attr('class', 'row');
		
		// update names
		var new_id = uniqid();
		new_field.find('[name]').each(function(){
		
			var name = $(this).attr('name').replace('[999]','[' + new_id + ']');
			$(this).attr('name', name);
			$(this).attr('id', name);
			
		});
		
		// add row
		div.children('table').children('tbody').append(new_field); 
		
		// activate wysiwyg
		$(document).trigger('acf/setup_fields',new_field);
		//new_field.acf_activate_wysiwyg();
	
		update_r_order_numbers(div);
		
		// there is now 1 more row
		row_count ++;
		
		// disable the add field button if row limit is reached
		if(row_count >= row_limit)
		{
			div.find('#r_add_row').attr('disabled','true');
		}
		
		// validation
		div.closest('.field').removeClass('error');
		
		return false;
		
	});
	
	
	// remove field
	$('#poststuff .repeater a#r_remove_row').live('click', function(){
		
		var div = $(this).closest('.repeater');
		var tr = $(this).closest('tr');
		
		tr.animate({'left' : '50px', 'opacity' : 0}, 250,function(){
			tr.remove();
			update_r_order_numbers(div);
		});
		
		div.find('#r_add_row').removeAttr('disabled');
		
		return false;
		
	});
	
	
	/*
	*  Field: Flexible Content
	*
	*  @description: 
	*  @created: 3/03/2011
	*/
	
	// update order numbers
	function update_fc_order_numbers(div)
	{
		div.children('.values').children('table').each(function(i){
			$(this).children('tbody').children('tr').children('td.order').html(i+1);
		});
	
	}
	
	
	// make sortable
	function make_fc_sortable(div){
		
		div.children('.values').unbind('sortable').sortable({
			update: function(event, ui){
				update_fc_order_numbers(div);
			},
			items : '> table',
			handle: '> tbody > tr > td.order',
			axis: "y" // limit the dragging to up/down only
		});
	}
	
	
	// add row
	$('#poststuff .acf_flexible_content #fc_add_row').live('click', function(){
		
		if($(this).hasClass('active'))
		{
			$(this).removeClass('active');
			$(this).closest('.table_footer').find('.acf_popup').animate({ opacity : 0, bottom : '35px' }, 250);
		}
		else
		{
			$(this).addClass('active');
			$(this).closest('.table_footer').find('.acf_popup').css({display : 'block', opacity : 0, bottom : '15px'}).animate({ opacity : 1, bottom : '25px' }, 250);
		}
	});
	
	
	// remove row
	$('#poststuff .acf_flexible_content #fc_remove_row').live('click', function(){
		
		var div = $(this).closest('.acf_flexible_content');
		var table = $(this).closest('table');
		var temp = $('<div style="height:' + table.height() + 'px"></div>');
		
		table.animate({'left' : '50px', 'opacity' : 0}, 250, function(){
			table.before(temp).remove();
			
			temp.animate({'height' : 0 }, 250, function(){
				temp.remove();
			});
			
			update_fc_order_numbers(div);
		
			if(!div.children('.values').children('table').exists())
			{
				div.children('.no_value_message').show();
			}
			
		});
		
		return false;
		
	});
	
	
	// add layout
	$('#poststuff .acf_flexible_content .table_footer .acf_popup ul li a').live('click', function(){
		
		// vars
		var layout = $(this).attr('data-layout');
		var div = $(this).closest('.acf_flexible_content');
		
		// deactivate any wysiwygs
		div.children('.clones').acf_deactivate_wysiwyg();
		
		// create new field
		var new_field = div.children('.clones').children('table[data-layout="' + layout + '"]').clone(false);
		
		// update names
		var new_id = uniqid();
		new_field.find('[name]').each(function(){
		
			var name = $(this).attr('name').replace('[999]','[' + new_id + ']');
			$(this).attr('name', name);
			$(this).attr('id', name);
			
		});

		// hide no values message
		div.children('.no_value_message').hide();
		
		// add row
		div.children('.values').append(new_field); 
		
		// activate wysiwyg
		$(document).trigger('acf/setup_fields',new_field);
		//new_field.acf_activate_wysiwyg();
		
		update_fc_order_numbers(div);
		
		// hide acf popup
		$(this).closest('.table_footer').find('#fc_add_row').removeClass('active');
		$(this).closest('.acf_popup').hide();
		
		// validation
		div.closest('.field').removeClass('error');
		
		return false;
		
	});
	
	
	$(document).live('acf/setup_fields', function(e, postbox){
		
		$(postbox).find('.acf_flexible_content').each(function(){

			// sortable
			make_fc_sortable($(this));
		});
		
	});
	
	
	/*
	*  Field: Datepicker
	*
	*  @description: 
	*  @created: 4/03/2011
	*/
	
	$('#poststuff input.acf_datepicker').live('focus', function(){

		var input = $(this);
		
		if(!input.hasClass('active'))
		{
			
			// vars
			var format = input.attr('data-date_format') ? input.attr('data-date_format') : 'dd/mm/yy';
			
			// add date picker and refocus
			input.addClass('active').datepicker({ 
				dateFormat: format 
			})
			
			// set a timeout to re focus the input (after it has the datepicker!)
			setTimeout(function(){
				input.trigger('blur').trigger('focus');
			}, 1);
			
			// wrap the datepicker (only if it hasn't already been wrapped)
			if($('body > #ui-datepicker-div').length > 0)
			{
				$('#ui-datepicker-div').wrap('<div class="ui-acf" />');
			}
			
		}
		
	});
	
	
	
	
})(jQuery);