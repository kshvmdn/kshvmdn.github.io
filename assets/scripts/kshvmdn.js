$(function() {

	var $words = $('.hero .words');
	var $underscore = $('.hero .underscore');
	var $name = $('.hero .name');

	var words = ['developer', 'hacker', 'designer', 'innovater', 'creator', 'maker', 'explorer', 'problem-solver', 'inventor', 'technology enthusiast', 'leader']
	var underscore = '_';
	var name = 'Kashav.'.split('');

	changeWord($words, words);
	typeName($name, 'Kashav.'.split(''), 0);

	setTimeout(function() {
		setInterval(function() {
			changeWord($words, words);
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

var changeWord = function(el, wordList) {
	word = wordList[Math.floor(Math.random() * wordList.length)];
	while (word == el.text())
		word = wordList[Math.floor(Math.random() * wordList.length)];

	if (['a', 'e', 'i', 'o', 'u'].indexOf(word[0].toLowerCase()) !== -1)
		$('.a').html('an');
	else
		$('.a').html('a');
	el.text(word);
}

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