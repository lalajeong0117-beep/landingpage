$(function () {

    // ============================================
    // Header & Navigation Menu
    // ============================================

    // 1. 로고 클릭 시 페이지 최상단으로 부드러운 스크롤 이동
    $(".navi").css("cursor", "pointer").on("click", function () {
        $("html, body").stop().animate({ scrollTop: 0 }, 800);
    });

    // 2. 모바일 햄버거 메뉴 토글 & 배경 스크롤 락 제어
    $(".mo-navi").on("click", function () {
        $(".menu").fadeToggle(350, function () {
            if ($(".menu").is(":visible")) {
                $("body").css("overflow", "hidden");
            } else {
                $("body").css("overflow", "");
            }
        });
    });

    // 3. Header 네비게이션 메뉴 클릭 시 스크롤 이동 및 모바일 메뉴 닫기
    $(".menu a").on("click", function (e) {
        var targetId = $(this).attr("href");

        if (targetId && targetId.startsWith("#")) {
            var $target = $(targetId);
            if ($target.length) {
                e.preventDefault();

                // 고정 헤더 높이만큼 오프셋 차감
                var headerHeight = $("header").outerHeight() || 0;
                var targetOffset = $target.offset().top - headerHeight;

                $("html, body").stop().animate({
                    scrollTop: targetOffset > 0 ? targetOffset : 0
                }, 800, function () {
                    if (typeof ScrollTrigger !== "undefined") {
                        ScrollTrigger.refresh();
                    }
                });
            }
        }

        // 모바일(1280px 이하)에서 메뉴 링크 클릭 시 메뉴 닫기 & 스크롤 락 해제
        if ($(".mo-navi").is(":visible")) {
            $(".menu").fadeOut(300, function () {
                $("body").css("overflow", "");
            });
        }
    });

    // 4. 화면 리사이즈 시 모바일 메뉴 인라인 스타일 정리 (데스크탑 전환 시 메뉴 증발 방지)
    $(window).on("resize", function () {
        if ($(window).width() > 1280) {
            $(".menu").removeAttr("style");
            $("body").css("overflow", "");
        }
    });

    // 5. Header 스크롤 감지 (배경색 변경 & Scrollspy 현재 섹션 하이라이트)
    const $sections = $("section[id]");
    const $menuItems = $(".menu li");

    $(window).on("scroll", function () {
        var currentScroll = $(window).scrollTop();
        var headerHeight = $("header").outerHeight() || 0;

        // 스크롤 시 헤더 반투명 스타일 토글
        if (currentScroll > 50) {
            $("header").addClass("scroll");
        } else {
            $("header").removeClass("scroll");
        }

        // Scrollspy: 현재 보고 있는 섹션의 메뉴 활성화
        var activeId = "";
        $sections.each(function () {
            var sectionTop = $(this).offset().top - headerHeight - 100;
            var sectionBottom = sectionTop + $(this).outerHeight();
            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                activeId = $(this).attr("id");
            }
        });

        $menuItems.removeClass("active");
        if (activeId) {
            $(".menu a[href='#" + activeId + "']").parent("li").addClass("active");
        }
    });

    // 6. Hero 버튼 클릭 시 Collection 섹션으로 부드러운 스크롤 이동 (헤더 높이 보정)
    $(".hero-btn a").on("click", function (e) {
        e.preventDefault();
        var headerHeight = $("header").outerHeight() || 0;
        var targetOffset = $("#collection").offset().top - headerHeight;

        $("html, body").stop().animate({
            scrollTop: targetOffset > 0 ? targetOffset : 0
        }, 800, function () {
            if (typeof ScrollTrigger !== "undefined") {
                ScrollTrigger.refresh();
            }
        });
    });

    // ============================================
    // Collection Section - 우측 펜 사진 순차 도출 애니메이션
    // (텍스트와 기본 영역은 상시 노출, 스크롤 시 펜만 1개씩 도출)
    // ============================================
    const $penItems = $(".feature-main-img-pens .pen-item");

    if ($penItems.length) {
        let isRevealed = false;

        // 펜들을 초기에 아래에서 대기
        if (typeof gsap !== "undefined") {
            gsap.set($penItems, { opacity: 0, y: 90 });
        }

        // 스크롤 시 5개 펜이 왼쪽부터 한 개씩 쏙쏙 도출되는 함수
        function revealPens() {
            if (isRevealed) return;
            isRevealed = true;

            if (typeof gsap !== "undefined") {
                gsap.to($penItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.18, // 1개씩 순차적으로 도출
                    ease: "back.out(1.2)", // 탄력 있는 고급스러운 안착
                    clearProps: "transform,opacity" // 애니메이션 완료 후 호버/클릭 인터랙션을 위해 인라인 정리
                });
            } else {
                $penItems.css({ opacity: 1, transform: "none" });
            }
        }

        // 1. ScrollTrigger 연동
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            ScrollTrigger.create({
                trigger: "#collection",
                start: "top 75%",
                onEnter: revealPens
            });
        }

        // 2. IntersectionObserver 더블 안전장치 (어떤 환경에서도 100% 즉시 발동)
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        revealPens();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.15 });

            const targetSection = document.getElementById("collection");
            if (targetSection) observer.observe(targetSection);
        } else {
            // 구형 브라우저 fallback
            $(window).on("scroll", function () {
                if (!isRevealed) {
                    const el = $("#collection");
                    if (el.length) {
                        const scrollPos = $(window).scrollTop() + $(window).height();
                        if (scrollPos > el.offset().top + 100) {
                            revealPens();
                        }
                    }
                }
            });
        }

        // 이미지 로딩 완료 후 스크롤 위치 재계산
        $(window).on("load", function () {
            if (typeof ScrollTrigger !== "undefined") {
                ScrollTrigger.refresh();
            }
        });

        // 3. 만년필 마우스 호버 마이크로 인터랙션
        $penItems.on("mouseenter", function () {
            if (!$(this).hasClass("active")) {
                if (typeof gsap !== "undefined") {
                    gsap.to($(this).find("img"), {
                        y: -14,
                        duration: 0.35,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            }
        });

        $penItems.on("mouseleave", function () {
            if (!$(this).hasClass("active")) {
                if (typeof gsap !== "undefined") {
                    gsap.to($(this).find("img"), {
                        y: 0,
                        duration: 0.35,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            }
        });

        // 4. 만년필 클릭 인터랙션
        $penItems.click(function () {
            $penItems.removeClass("active");
            $(this).addClass("active");
            $(".feature-main-img-pens").addClass("selected");

            if (typeof gsap !== "undefined") {
                // 비활성 펜 제자리 복귀
                $penItems.not(this).find("img").each(function () {
                    gsap.to(this, { y: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
                });

                // 선택된 펜 상승 강조
                gsap.to($(this).find("img"), {
                    y: -18,
                    duration: 0.45,
                    ease: "back.out(1.4)",
                    overwrite: "auto"
                });
            }
        });
    }

});
