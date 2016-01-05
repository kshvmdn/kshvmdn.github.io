$(function() {
	setInterval(randomWord, 1500);
	$('.contact_trigger').click(function(){
		$('.contact').addClass('blink');
		setTimeout(function(){
			$('.contact').removeClass('blink');
		}, 1000);
	});
});

function randomWord() {
	words = ['develop', 'hack', 'design', 'write code', 'innovate', 'create', 'build']
	$('.words').html(words[Math.floor(Math.random() * words.length)]);
}