$(function() {
  $('.projects').on('click', '.project .title', function() {
    window.open($(this).parent().attr('data-href'));
  });
});
