$(function() {
	words = ['develop', 'hack', 'design', 'write code', 'innovate', 'create', 'build']
	$('.words').click(function() {
		$(this).html(words[Math.floor(Math.random() * words.length)]);
	});
	$('.contact_trigger').click(function(){
		$('.contact').addClass('blink');
		setTimeout(function(){
			$('.contact').removeClass('blink');
		}, 1000);
	});
});