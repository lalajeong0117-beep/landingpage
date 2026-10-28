




$(function () {

    // 모바일 반응형 header 

    $(".mo-navi").click(function () {
        $(".menu").fadeToggle(500);
    });

    // Header 메뉴 클릭 시 부드러운 스크롤 이동 (약 0.8초) 및 모바일 메뉴 닫기
    $(".menu a").click(function (e) {
        var targetId = $(this).attr("href");

        if (targetId && targetId.startsWith("#")) {
            var $target = $(targetId);
            if ($target.length) {
                e.preventDefault();
                var headerHeight = $("header").outerHeight() || 0;
                var targetOffset = $target.offset().top - headerHeight;

                $("html, body").stop().animate({
                    scrollTop: targetOffset > 0 ? targetOffset : 0
                }, 800);
            }
        }

        // 모바일(1280px 이하)에서 메뉴 클릭 시 자동으로 닫기
        if ($(".mo-navi").is(":visible")) {
            $(".menu").fadeOut(500);
        }
    });

    // header 스크롤시 색상 변경

    $(window).scroll(function () {

        if ($(window).scrollTop() > 50) {
            $("header").addClass("scroll");
        } else {
            $("header").removeClass("scroll");
        }

    });

    // hero btn 클릭하면 colleciton 으로 이동
    $(".hero-btn a").click(function (e) {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $("#collection").offset().top
        }, 800);
    });

    // collection pens 선택하면 선택된 개체 빼고 나머지는 흐려짐

    $(".pen-item").click(function () {
        $(".pen-item").removeClass("active");

        $(this).addClass("active");

        $(".feature-main-img-pens").addClass("selected")
    })

});