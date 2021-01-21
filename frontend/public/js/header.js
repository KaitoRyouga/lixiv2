$(".nav-toggle").click(function() {
  $(".nav-menu").slideToggle();
});

$(window).resize(function() {
  if ($(window).width()>768) {
    $(".nav-menu").removeAttr("style");
  }
});

$("ul li").click(function() {
  $(this)
    .children("ul")
    .stop()
    .slideToggle(300);
});
