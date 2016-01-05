$(function() {
	$('.contact_trigger').click(function(){
		$('.contact').addClass('blink');
		setTimeout(function(){
			$('.contact').removeClass('blink');
		}, 2000);
	});
	var show_kshv = false; 
	$('.name').click(function() {
		!show_kshv ? $(this).html('kshvmdn') : $(this).html('kashav'); show_kshv = !show_kshv;
	});
});