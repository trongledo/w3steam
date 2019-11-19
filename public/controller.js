function loadMarsonry(){
    $(document).ready(function(){
        var $grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            //gutter: 10,
            columnWidth: '.grid-sizer',
            percentPosition: true
            //fitWidth: true
            
        });

        $grid.imagesLoaded()
        .progress( function() {
        $grid.masonry('layout');
        })
        .done( function( instance ) {
            $('#overlay-loader').hide();
            $(".item-project  .item-project-inner").each(function(index) {
            //$(this).addClass("animated animatedFadeInUp fadeInUp");
            $(this).addClass("load-project-animation ");
        });
        })
    });

}

function controllButtonMoveTop(){
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#btn-move-top').fadeIn(); 
        } else { 
            $('#btn-move-top').fadeOut(); 
        } 
    }); 

    $('#btn-move-top').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
}

function controllNavigation(){
    $( window ).resize(function() {
        if($( window ).width() <= 1224){
            $(".nav-vertical").css({left: '-250px'});
            $(".main-content").css({"left": '0'});
            
            $(".menu-close").text("MENU")
            $(".nav-vertical .nav-left > .top").removeClass("list-load-animation");
            isNavVerExpand = false;
        }else{
            $(".nav-horizontal  .list-text").css("right", "-100%");
            $(".icon-expand").removeClass('xstyle');
            $(".nav-horizontal .list-text").removeClass("list-load-animation");
            isNavHorExpand = false;
        }
    });

}

function controllDetailPage(){
    $(document).ready(function(){
        (function($) {
            $.fn.hasScrollBar = function(value) {
                console.log(this.get(0).scrollHeight - value, this.height());
                return this.get(0).scrollHeight - value > this.height();
    
            }
        })(jQuery);
    
        $( window ).resize(function() {
            if( ($('.description').get(0) && $('.description').hasScrollBar(30)) 
            || (($(".preview").get(0) && $(".preview").hasScrollBar(0)) )){
    
                $(".btn-close").css("right", "37px");
                console.log(true);
            }
            else{
                $(".btn-close").css("right", "20px");
                console.log(false);
            }
        });
    
        
    });
    
    console.log('load controller');
}

var permission = "";
