$(function () {
    var e;
    init_select_city({
        aw_top_city_select_after: function (t) {
            console.log(t), e = t
        }
    });

    // $.get("/Help/helpHotSchool", {
    //     section_id: 4,
    //     city_code: e
    // }, function (t) {
    //     t.status && ($(".hot_school").html(t.info), lazyImg("lazy-two");
    //     $("#timeLine").flexslider({
    //         animation: "slide",
    //         directionNav: !0,
    //         pauseOnAction: !1,
    //         slideshowSpeed: 3e3,
    //         smoothHeight: !0,
    //         controlNav: !1,
    //         directionNav: !0,
    //         prevText: '<span id="btnLeft">&lt;</span>',
    //         nextText: '<span id="btnRight">&gt;</span>',
    //         manualControlEvent: "hover"
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
            manualControlEvent: "hover"
    })

    // $.get("/Help/helpHotProduct", {
    //     city_id: 11e4
    // }, function (t) {
    //     t.status, $(".aw_hot_product").html(t.info), lazyImg("lazy-one")
    // });


    lazyImg("lazy-one")
});