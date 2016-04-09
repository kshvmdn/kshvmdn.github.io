'use strict';
$(() => {
  $.getJSON('./projects.json', result => {
    let html = new EJS({url: './assets/templates/projects.ejs'}).render({projects: result});
    $('.projects')
      .append(html)
      .on('click', '.project .title', function() {
        window.open($(this).parent().attr('data-href'));
      });
  });
});
