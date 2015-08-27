$( document).ready(function() {


//SCROLL TO TOP 
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
// SCROLL TO ANCHOR LINK
    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
//GALLERY POPOVER
    $(function(){
        $('[data-toggle="popover"]').popover(
            {container: '.info-container', 
             html: true
                });

        var infoDivider = $( "<div role='separator' class='divider'></div>" );
        

        $('[data-toggle="popover"]').click(function() {
            var styles = {
            maxWidth : "100%",
            width: "100%"
            };
             //check if `infoDivider` is empty or not
            if (infoDivider != '') {

                //if `infoDivider` is not empty then add it to the DOM
                $(".popover-content").after(infoDivider);

                //now that `infoDivider` has been added to the DOM, reset it's value to an empty string so this doesn't happen again
                NewContent = '';
            } else {

                //this is not the first click, so just toggle the appearance of the element that has already been added to the DOM
                //since we injected the element just after the `popover-content` element we can select it relatively to that element by using `.next()`
                $('.popover-content').next().toggle();
            }
           
        $( ".popover" ).css( styles );
        
        });

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });

    });
//GALLERY TEXT DISPLAY
    $('.img-container').hover(function() {
        console.log("hovering");
        $('.intxt', this).slideToggle(100, 'linear');
    });    

// PARALLAX INIT
    $(function(){
        $('.prlx-hldr').imageScroll({
//            image: null,
//            imageAttribute: 'image',
//              container: $('body'),
//            windowObject: $(window),
//            speed:.2,
//            coverRatio:.75,
                coverRatio:.62,
//                holderClass: 'prlx-hldr',
//            imgClass: 'img-holder-img',
//            holderMinHeight: 200,
//            holderMaxHeight: null,
//            extraHeight: 50,
//            mediaWidth: 1600,
//            mediaHeight: 900,
                parallax: true,
//            touch: false
        });
    });

    console.log("ready");

    });
}); //window ready

