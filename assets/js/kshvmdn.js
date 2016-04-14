$(function() {
  $.getJSON('./projects.json', function(result) {
    var html = new EJS({url: './assets/templates/projects.ejs'}).render({projects: result});
    $('.projects')
      .append(html)
      .on('click', '.project .title', function() {
        window.open($(this).parent().attr('data-href'));
      });
  });
});
