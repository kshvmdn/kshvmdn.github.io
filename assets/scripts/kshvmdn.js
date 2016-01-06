$(function() {

	var $words = $('.hero .words');
	var $underscore = $('.hero .underscore');
	var $name = $('.hero .name');

	var words = ['developer', 'hacker', 'designer', 'innovater', 'creator', 'builder', 'technology enthusiast', 'leader']
	var underscore = '_';
	var name = 'Kashav.'.split('');

	typeName($name, 'Kashav.'.split(''), 0);

	setTimeout(function() {
		setInterval(function() {
			$words.html(words[Math.floor(Math.random() * words.length)]);
			// flash($underscore, underscore);
		}, 650);
	}, name.length * 301);

	$('.contact_trigger').click(function(){
		$('.contact').addClass('blink');
		setTimeout(function(){
			$('.contact').removeClass('blink');
		}, 1000);
	});
});

var flash = function(el, text) {
	el.text() != text ? el.html(text) : el.html('');
}

var typeName = function(el, array, arrayPosition) {
	if (arrayPosition < array.length) {
		setTimeout(function () {
			el.append(array[arrayPosition]);
			typeName(el, array, arrayPosition + 1);
		}, 300);
	}
}