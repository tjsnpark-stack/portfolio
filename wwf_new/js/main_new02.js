$(document).ready(function(){

    let device_status
    let window_w
    let mobile_size = 1024
    function device_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mo'
        }
        console.log(device_status)
    }
    device_chk()
    $(window).resize(function(){
        device_chk()
    })
    $('.header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        $('.header').addClass('menu_over')
        $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $(this).addClass('over')
    })
    $('.header .gnb .gnb_wrap').on('mouseleave', function(){
        $('.header').removeClass('menu_over')
        $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })


    $('.header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
		e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
        if($(this).parent().hasClass('open') == true){
            $(this).parent().removeClass('open')
        }else{  
            $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
            $(this).parent().addClass('open')
        }
	});
    $('.header .gnb .gnb_open').on('click', function(){
        $('.header').addClass('menu_open')
    })
    $('.header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('.header').removeClass('menu_open')
    })


    let visual_wrap = $('.visual')
    let visual_wrap_h
    let visual_item = $('.visual .area')
    let visual_item_leng = visual_item.length
    let scrolling
    let win_h = $(window).height()
    let visual_start// 시작점
    let visual_end //종료점
    let visual_one_step //햐나의 애니메이션 길이
    let visual_step //현재 몇번째 이미지가 슬라이드 되고 있는지
    let visual_percent


    function visual_scroll(){
        scrolling = $(window).scrollTop()
        win_h = $(window).height()
        visual_wrap_h = visual_wrap.outerHeight()
        visual_start = visual_wrap.offset().top
        visual_end = visual_start + visual_wrap_h - win_h

        // 전체 구간을 (아이템 개수 - 1)로 나눔
        visual_one_step = (visual_end - visual_start) / (visual_item_leng - 1)

        if(scrolling < visual_start){
            // 시작 전
            visual_wrap.attr('data-staus', 'before')
            visual_item.height(0)
            visual_item.eq(0).height('100%')

        }else if(scrolling > visual_end){
            // 끝난 후
            visual_wrap.attr('data-staus', 'after')
            visual_item.height('100%')

        }else{
            // 진행 중
            visual_wrap.attr('data-staus', 'ing')
            let current = scrolling - visual_start

            // 현재 스텝 (0부터 시작)
            let step = Math.floor(current / visual_one_step) + 1

            // 현재 스텝 내 진행률 (0 ~ 1)
            let progress = (current % visual_one_step) / visual_one_step

            for(let i = 0; i < visual_item_leng; i++){
                if(i < step){
                    visual_item.eq(i).height('100%')
                }else if(i === step){
                    visual_item.eq(i).height((progress * 100) + '%')
                }else{
                    visual_item.eq(i).height(0)
                }
            }
        }
    }

    visual_scroll()
    $(window).scroll(function(){
        visual_scroll()
    })
    $(window).resize(function(){
        visual_scroll()
    })

    
    const swiper_paging = new Swiper('.activity .txt .swiper_paging', {
        effect: "fade",
        allowTouchMove: false,
        slidesPerView: 1,
    });

    const activity_swiper = new Swiper('.activity .list .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        // breakpoints: {
        //     640: {
        //         slidesPerView: 2,
        //         spaceBetween: 20,
        //     },
        // },
    });


    const news_swiper = new Swiper('.news .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {

            499: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            768: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            1100: {    /* 640px 이상일때 적용 */
                slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
        },
    });

    $('.newsletter .subscript .regist .email .email_domain .domain_open').on('click', function(){
        //console.log('체크')
        if($('.newsletter .subscript .regist .email .email_domain').hasClass('open') == false){
            $('.newsletter .subscript .regist .email .email_domain').addClass('open')
        }else{
            $('.newsletter .subscript .regist .email .email_domain').removeClass('open')
        }
    })
    $('.newsletter .subscript .regist .email .email_domain .domain_wrap ul li').on('click', function(){
        $('.newsletter .subscript .regist .email .email_domain .domain_open').text($(this).attr('data-value'))
        $('.newsletter .subscript .regist .email .email_domain').removeClass('open')
    })


    const wrap = document.querySelector('.support_wrap');
    const support = document.querySelector('.support');

    window.addEventListener('scroll', () => {
        const rect = wrap.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        let progress = -rect.top / (wrap.offsetHeight - windowHeight);
        progress = Math.max(0, Math.min(progress, 1));

        support.style.setProperty('--bg-opacity', progress);

        if(progress > 0.3){
            support.classList.add('active');
        } else {
            support.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
    support.style.setProperty('--bg-opacity', 0);
    });



})//document.ready(맨끝)