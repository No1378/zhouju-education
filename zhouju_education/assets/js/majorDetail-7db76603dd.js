$(function() {
	function d(a) {
		var t = document.location.search,
			e = new RegExp("[?&]" + a + "=([^&]+)", "g").exec(t),
			o = null;
		if(null != e) try {
			o = decodeURIComponent(decodeURIComponent(e[1]))
		} catch(n) {
			try {
				o = decodeURIComponent(e[1])
			} catch(n) {
				o = e[1]
			}
		}
		return o
	}
	init_select_city({
		aw_top_city_select_after: function(a) {
			window.location.href = location.href
		}
	}), $("body").on("click", ".aw_apply_apply", function() {
		var a = $(".detail"),
			t = $(".aw_city_top_name"),
			e = a.data("product-id"),
			o = a.data("school-code"),
			n = t.data("city-id"),
			i = t.text();
		window.location.href = window.location.protocol+"//"+ window.location.host + "/users/regist.html?pd=" + e + "&sd=" + o + "&cd=" + n + "&pn=" + i + (d("T") ? "&T=" + d("T") : "")
	});
	var a = $(".aw_sign_notice"),
		t = $(".aw_exam_graduation"),
		e = $(".aw_product_content");

	function o() {
		var a = $(".nav-tap").offset().top;
		$("html,body").animate({
			scrollTop: a - 10 + "px"
		}, 100)
	}
	0 == $(".aw_sign_notice_input").val() && a.css("display", "none"), 0 == $(".aw_exam_graduation_input").val() && t.css("display", "none"), a.on("click", function() {
		$(".major-detail-content .aw_content_div").addClass("aw_hide"), $(".aw_sign_notice_div").removeClass("aw_hide"), $(".nav-tap span").removeClass("active"), $(".opt span").removeClass("active"), a.addClass("active"), o()
	}), t.on("click", function() {
		$(".major-detail-content .aw_content_div").addClass("aw_hide"), $(".aw_exam_graduation_div").removeClass("aw_hide"), $(".nav-tap span").removeClass("active"), $(".opt span").removeClass("active"), t.addClass("active"), o()
	}), e.on("click", function() {
		$(".major-detail-content .aw_content_div").addClass("aw_hide"), $(".aw_product_content_div").removeClass("aw_hide"), $(".nav-tap span").removeClass("active"), $(".opt span").removeClass("active"), e.addClass("active"), s.initRadar(c), o()
	}), $(".select-list span").on("click", function() {
		var a = $(this).attr("data-id"),
			t = $(this).attr("data-type"),
			e = window.location.href;
		$.get("/Major/createProductUrl", {
			id: a,
			type: t,
			url: e
		}, function(a) {
			if(!a.status) return console.log(a.info), !1;
			window.location.href = a.info
		})
	});
	// var n = $(".aw_school_code_input").val();
	// $.get("/Major/recommendProductBySchool", {
	// 	code: n
	// }, function(a) {
	// 	a.status && $(".aw_hot_product").html(a.info), lazyImg("lazy-two")
	// }), $(document).scroll(function() {
	// 	var a = $(".nav-tap").offset().top - $(window).scrollTop();
	// 	a <= -50 ? ($(".master").removeClass("aw_hide"), $(".aw_box_qrcode").addClass("aw_hide")) : -50 < a && $(".master").addClass("aw_hide")
	// });

	
	var i = $("#arrSix"),
		c = [i.data("1"), i.data("2"), i.data("3"), i.data("4"), i.data("5"), i.data("6")],
		s = new function r(a) {
			var t = echarts.init(document.getElementById(a)),
				e = {
					radar: {
						splitLine: {
							lineStyle: {
								color: "#8e8e8e"
							}
						},
						center: ["50%", "50%"],
						nameGap: 10,
						name: {
							show: !0,
							color: "#8d8d8d",
							fontSize: "13",
							fontWeight: "normal",
							padding: 0,
							margin: 0
						},
						indicator: [{
							name: "晋升机会",
							max: 100,
							min: 1
						}, {
							name: "就业前景",
							max: 100,
							min: 1
						}, {
							name: "就业薪资",
							max: 100,
							min: 1
						}, {
							name: "学习难度",
							max: 100,
							min: 1
						}, {
							name: "学习时长",
							max: 100,
							min: 1
						}, {
							name: "报名人数",
							max: 100,
							min: 1
						}],
						radius: 120
					},
					maxAspectRatio: 1,
					series: [{
						type: "radar",
						areaStyle: {
							normal: {
								color: "#ff9320"
							}
						},
						symbol: "circle",
						symbolSize: 8,
						itemStyle: {
							normal: {
								color: "#ff9320",
								borderColor: "#ff9320"
							}
						},
						data: [{
							value: [94,32,13,23,35,23]
						}]
					}]
				};
			this.initRadar = function(a) {
				//e.series[0].data[0].value = a, 
				t.setOption(e, !0)
			}
		}("radar");
	s.initRadar(c), lazyImg("lazy-one")
});