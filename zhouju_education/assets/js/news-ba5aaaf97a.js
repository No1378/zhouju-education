$(function () {
    function e() {
        var o = $(".aw_page_input"),
            t = o.val();
        return !t || t <= 0 ? (o.css("border", "#f00 solid 1px"), !1) : /^[0-9]{0,}$/.test(t) ? o.attr("data-max") - 0 < t - 0 ? (o.css("border", "#f00 solid 1px"), !1) : (o.css("border", "1px solid #e5e5e5"), $(".goPage").attr("data-url") + "&page=" + t) : (o.css("border", "#f00 solid 1px"), !1)
    }
    // $.get("/News/hotStudentNews", {
    //     id: 2
    // }, function (o) {
    //     o.status && ($(".aw_hot_student_mien").html(o.info), setTimeout(function () {
    //         lazyImg("lazy-two")
    //     }, 100))
    // });

    $(".aw_title_span").hover(function () {
        $(this).addClass("aw_hove_color")
    }, function () {
        $(this).removeClass("aw_hove_color")
    });

    $(".goPage").on("click", function () {
        var o = e();
        o && (window.location.href = o)
    });

    $(".aw_page_input").on("keyup", function (o) {
        if (13 == o.keyCode) {
            var t = e();
            t && (window.location.href = t)
        }
    });

    lazyImg("lazy-one")
});