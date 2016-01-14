$(function() {
	$('.project').click(function() {
		window.open($(this).attr('data-href'));
	});
});