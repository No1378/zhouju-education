$(function () {
    function e() {
        var t = $(".aw_page_input"),
            a = t.val();
        return !a || a <= 0 ? (t.css("border", "#f00 solid 1px"), !1) : /^[0-9]{0,}$/.test(a) ? t.attr("data-max") - 0 < a - 0 ? (t.css("border", "#f00 solid 1px"), !1) : (t.css("border", "1px solid #e5e5e5"), $(".goPage").attr("data-url") + "&page=" + a) : (t.css("border", "#f00 solid 1px"), !1)
    }
    $(".area-tap_1 span").on("click", function () {
        var t = $(this).attr("data-type");
        return $(".area-tap_1 span").removeClass("active"), $(this).addClass("active"), $(".area-list_1 table").hide(), $(".aw_table_" + t.toLowerCase()).show(), !1
    }), $("#aw_change_area_name").on("click", function () {
        return $(".select-area").hide(), $(".select-area_1").show(), $.get("/base/findCityList", {}, function (t) {
            t.status && ($(".area-list_1").html(t.info), $(".area-tap_1 span").removeClass("active"), $(".aw_city_title_" + t.url).addClass("active"))
        }), !1
    }), init_select_city({
        aw_top_city_select_after: function (t) {
            return $.get("/home/base/ajaxTopCity", {
                id: t
            }, function (t) {
                t.status && (window.location.href = location.href)
            }), !1
        }
    }), $(".area-list_1").on("click", "i", function () {
        var t = $(this).attr("data-id");
        return $(".area-list_1 table a").removeClass("active"), $(this).addClass("active"), $.get("/home/base/ajaxTopCity", {
            id: t
        }, function (t) {
            t.status && (window.location.href = location.href)
        }), !1
    }), $("body").on("click", function () {
        $(".select-area_1").hide(), $(".select-area").hide()
    }), $(".goPage").on("click", function () {
        var t = e();
        t && (window.location.href = t)
    }), $(".aw_page_input").on("keyup", function (t) {
        if (13 == t.keyCode) {
            var a = e();
            a && (window.location.href = a)
        }
    }), $.get("/Major/hotProductList", {
        city_id: 11e4
    }, function (t) {
        t.status, $(".aw_hot_product").html(t.info), lazyImg("lazy-two")
    }), $(".check em").on("click", function () {
        var t = $(this).attr("data-href");
        window.location.href = t, $(".aw_loging").css("display", "block")
    }), $(".aw_select_more").on("click", function () {
        var t = $(this).parents("td").parents("tr").find("div");
        t.css("height", "auto"), t.css("overflow", "auto"), $(this).hide(), $(this).siblings().show()
    }), $(".aw_select_less").on("click", function () {
        var t = $(this).parents("td").parents("tr").find("div");
        t.css("height", "36px"), t.css("overflow-y", "hidden"), $(this).hide(), $(this).siblings().show()
    }), $(".major-type").each(function (t) {
        if (0 == $(this).find(".active").length) $(this).children(".select-all").children("a").addClass("active");
        else {
            var a = $(this).children(".select-type").children("div");
            a.css("height", "auto"), a.css("overflow", "auto")
        }
    }), lazyImg("lazy-one")
});