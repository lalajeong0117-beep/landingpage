// $(function () {
//     $(".mo-navi").click(function () {
//         $(".menu").toggleClass("d-block");
//     });
//     $(".menu-a").click(function () {
//         $(".menu").removeClass("d-block");
//     });
// });


// $(function () {

//     // fadeToggle 메뉴 서서히 열기
//     $(".mo-navi").click(function () {
//         if ($(".menu").is(":visible")) {
//             $(".menu").fadeOut(500);
//         } else {
//             $(".menu").css("display", "flex").hide.fadeIn(500);
//         }
//     });

//     //fadeOut 줘서 서서히 닫기
//     $(".menu-a").click(function () {
//         $(".menu").fadeOut(500);
//     });
// });

$(function () {
    $(".mo-navi").click(function () {
        $(".menu").fadeToggle(500);
    });

    $(".menu a").click(function () {
        $(".menu").fadeOut(500);
    });
});
