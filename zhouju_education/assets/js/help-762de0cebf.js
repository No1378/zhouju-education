$(function () {
    var e;

    function o() {
        var t = $(".aw_page_input"),
            e = t.val();
        return !e || e <= 0 ? (t.css("border", "#f00 solid 1px"), !1) : /^[0-9]{0,}$/.test(e) ? t.attr("data-max") - 0 < e - 0 ? (t.css("border", "#f00 solid 1px"), !1) : (t.css("border", "1px solid #e5e5e5"), $(".goPage").attr("data-url") + "&page=" + e) : (t.css("border", "#f00 solid 1px"), !1)
    }
    init_select_city({
        aw_top_city_select_after: function (t) {
            console.log(t), e = t
        }
    });

    // $.get("/Help/helpHotSchool", {
    //     section_id: 4,
    //     city_code: e
    // }, function (t) {
    //     t.status && ($(".hot_school").html(t.info), $("img.lazy-two").lazyload({
    //         placeholder: "../assets/img/logoBd2.svg",
    //         effect: "fadeIn",
    //         threshold: 200,
    //         event: "mouseover",
    //         skip_invisible: !1,
    //         failurelimit: 10
    //     }), $("#timeLine").flexslider({
    //         animation: "slide",
    //         directionNav: !0,
    //         pauseOnAction: !1,
    //         slideshowSpeed: 3e3,
    //         smoothHeight: !0,
    //         controlNav: !1,
    //         directionNav: !0,
    //         prevText: '<span id="btnLeft">&lt;</span>',
    //         nextText: '<span id="btnRight">&gt;</span>',
    //         manualControlEvent: "hover",
    //         after: function (t) {
    //             $($("img.lazy-two")[t.animatingTo + 1]).trigger("mouseover")
    //         }
    //     }))
    // });

    $("#timeLine").flexslider({
        animation: "slide",
        directionNav: !0,
        pauseOnAction: !1,
        slideshowSpeed: 3e3,
        smoothHeight: !0,
        controlNav: !1,
        directionNav: !0,
        prevText: '<span id="btnLeft">&lt;</span>',
        nextText: '<span id="btnRight">&gt;</span>',
        manualControlEvent: "hover",
        after: function (t) {
            $($("img.lazy-two")[t.animatingTo + 1]).trigger("mouseover")
        }
    })



    // $.get("/Help/helpHotProduct", {
    //     city_id: 11e4
    // }, function (t) {
    //     t.status, $(".aw_hot_product").html(t.info), lazyImg("lazy-one")
    // });

    $(".aw_page_input").on("keyup", function () {
        o()
    });

    $(".goPage").on("click", function () {
        var t = o();
        t && (window.location.href = t)
    })
});