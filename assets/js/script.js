




$(function () {

    // 모바일 반응형 header 

    $(".mo-navi").click(function () {
        $(".menu").fadeToggle(500);
    });

    $(".menu a").click(function () {
        $(".menu").fadeOut(500);
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