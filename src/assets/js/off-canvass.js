
jQuery(document).ready(function($) {
    // Adding class to body to expand offcanvas from its default state
    $('.offcanvas-toggle').on('click', function() {
        $('body').toggleClass('offcanvas-expanded');
    });

    //FastClick on mobile
    $(function() {
        FastClick.attach(document.body);
    });
    
    //AlterClass when window changes
    // var alterClass = function() {
    //   var ww = document.body.clientWidth;
    //   if (ww < 1024) {
    //     $('.body').removeClass('offcanvas-expanded');

    //   } else if (ww >= 401) {
    //     $('body').toggleClass('offcanvas-expanded');

    //   };
    // };
    // $(window).resize(function(){
    //   alterClass();
    // });
    // //Fire it when the page first loads:
    // alterClass();
});