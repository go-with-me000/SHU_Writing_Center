
// wow = new WOW({  
//     boxClass: 'wow', 
//     animateClass: 'animated',
//     offset: 0, 
//     mobile: true, 
//     live: true
// })  
// wow.init();

window.onload = function(){
 
    var flag = true;
    $('header .nav').click(function(){
        if(flag){
            flag = false;
            $('header .nav span').eq(0).addClass('active');
            $('header .nav span').eq(2).addClass('active');
            $('header .nav span').eq(1).hide();
            $('header .header>ul').slideDown();
        }else{
            flag = true;
            $('header .nav span').eq(0).removeClass('active');
            $('header .nav span').eq(2).removeClass('active');
            $('header .nav span').eq(1).show();          
            $('header .header>ul').slideUp();
        }
    });

    $('.header>ul>li').hover(
        function(){ $(this).find('.childUl').fadeIn(100); $(this).find('.childUl').animate({top:'80px',display:'block'},200)},
        function(){$(this).find('.childUl').animate({top:'100px',display:'none'},200); $(this).find('.childUl').fadeOut();}
    
    )
    var arr = window.location.href.split('/');
    var index = arr.indexOf(document.domain);
    var value = arr[index+1].split('.');
    var val = value[0];
    for(var i=0; i<$('#nav>li').length; i++){
        if($('#nav>li').eq(i).attr('name') == val){
            $('#nav>li').eq(i).addClass('active').siblings().removeClass('active'); 
        }
    }

    
    

}
