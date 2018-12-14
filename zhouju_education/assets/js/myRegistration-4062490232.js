! function (a) {
    var r = {};

    function n(t) {
        if (r[t]) return r[t].exports;
        var e = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return a[t].call(e.exports, e, e.exports, n), e.l = !0, e.exports
    }
    n.m = a, n.c = r, n.d = function (t, e, a) {
        n.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: a
        })
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t["default"]
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 57)
}({
    0: function (t, e) {
        var n = $(".error-close"),
            o = n.find(".infor");
        t.exports = function a(t, e) {
            o.html(t), n.css("margin-left", "0px");
            var a = parseInt(n.outerWidth(!0) / 2);
            n.css("margin-left", -a + "px"), n.slideDown();
            var r = setTimeout(function () {
                1 == e ? window.location.href = "/" : n.fadeOut(), clearTimeout(r)
            }, 1e3)
        }
    }, 1: function (t, e) {
        t.exports = function a() {
            return $.getStorage("infor") && $.getStorage("infor").userSign ? $.getStorage("infor").userSign : ""
        }
    }, 2: function (t, e) {
        var a = $(".login-status"),
            r = $("span.pho");
        t.exports = function n(t) {
            // if (t) {
            //     var e = $.getStorage("infor") && $.getStorage("infor").phoneNum ? $.getStorage("infor").phoneNum : "";
            //     e = e.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2"), a.show().find("i").text(e), a.next("#loginOpt").hide(), r.text(e)
            // } else a.hide().find("i").text(""), a.next("#loginOpt").show(), r.text("")
        }
    }, 22: function (t, e) {
        var r = $(".revise-result"),
            n = r.find(".container"),
            o = r.find(".prot"),
            i = r.find(".infor"),
            s = r.find(".opt");
        $("body").on("click", ".com", function () {
            r.hide(), n.removeClass("bounceIn")
        }), t.exports = function a(t, e, a) {
            o.html(t), i.html(e), s.html(a), r.show(), n.addClass("bounceIn")
        }
    }, 25: function (t, e) {
        t.exports = function a(t, e, a) {
            var r = $("<form>");
            $("body").append(r), r.attr("style", "display:none"), r.attr("method", "post"), r.attr("action", t);
            var n = $("<input>");
            n.attr("name", "user_sign"), n.attr("value", e), r.append(n);
            var o = $("<input>");
            o.attr("name", "enroll_id"), o.attr("value", a), r.append(o), r.submit()
        }
    }, 27: function (t, e, a) {
        var r = $(".myenlist-left-nav").find("#goPage"),
            n = a(1),
            o = a(2),
            i = null,
            s = null,
            d = null,
            l = null,
            c = null,
            u = {
                global_id: "",
                user_sign: n(),
                page_index: 1,
                page_size: 1,
                check_status: 0
            };
        $.sendReq("/api/user/newenrolllist", "get", u, function (t) {
            if (0 == t.code) {
                var e = t.data ? t.data.enroll_list : [];
                e[0] && (i = e[0].check_status, s = e[0].confirm_status, d = e[0].order_id, l = e[0].enroll_id, c = e[0].city_id, 5 != i && r.show())
            } else $.removeLocalStorage("infor"), o(!1)
        }), $("body").on("click", "#protocol", function () {
            n() ? window.location.href = "./protocol.html" : window.location.href = "/About/xieyi.html"
        }), $("body").on("click", "#goPage", function () {
            if (1 == i) return 1 == s ? window.open("./information.html?e=" + l + "&cd=" + c) : 2 == s && window.open("./depositWaitPay.html?e=" + l + "&o=" + d), !1;
            if (6 == i) return 1 == s ? window.open("./information.html?e=" + l + "&cd=" + c) : 2 == s && window.open("./depositWaitPay.html?e=" + l + "&o=" + d), !1;
            switch (i) {
            case "8":
                window.open("./underReview.html?e=" + l + "&o=" + d);
                break;
            case "4":
                window.open("./payForPayment.html?e=" + l + "&o=" + d + "&cd=" + c);
                break;
            case "11":
                window.open("./alreadyPaid.html?e=" + l + "&o=" + d);
                break;
            case "9":
                window.open("./auditFailure.html?e=" + l + "&o=" + d);
                break;
            case "10":
                window.open("./accepted.html?e=" + l + "&o=" + d);
                break;
            case "12":
                window.open("./registProcess.html?e=" + l + "&o=" + d);
                break;
            case "14":
                window.open("./depositWaitPay.html?e=" + l + "&o=" + d);
                break;
            case "13":
                window.open("./depositPaid.html?e=" + l + "&o=" + d);
                break;
            case "15":
                window.open("./preRegistSuccess.html?e=" + l);
                break;
            case "16":
                window.open("./waitAccepte.html?e=" + l + "&o=" + d)
            }
        })
    }, 3: function (t, e) {
        var r = "/api/user/userkey";
        t.exports = function a(e, a) {
            $.sendReq(r, "post", {}, function (t) {
                0 == t.code ? e.changeUserkey(t.data) : a(t.msg)
            })
        }
    }, 4: function (t, e, a) {
        var r = a(2);
        $.getStorage("infor") ? r(!0) : r(!1), a(5), a(6);
        var n = a(7),
            o = a(0),
            i = a(1),
            s = $("#searchKeywords"),
            d = "/api/user/logout";

        function l() {
            var t = s.val();
            if ("搜索你想要的院校，专业试一试~" == t || "" == t) var e = 1,
                a = setInterval(function () {
                    e++, s.toggleClass("input-toggle"), 5 == e && clearInterval(a)
                }, 150);
            else window.location.href = "/search/search.html?search=" + $.trim(t)
        }
        $("body").on("click", "#loginOpt", function () {
            n()
        }), $("body").on("click", ".quit-login", function () {
            var t = {
                user_sign: i()
            };
            $.sendReq(d, "Post", t, function (t) {
                0 == t.code ? ($.removeLocalStorage("infor"), window.location.href = "/") : o(t.msg)
            })
        }), s.on("keyup", function (t) {
            13 == t.keyCode && l()
        }), $("body").on("click", "#searchBtn", function () {
            l()
        });
        var c = {
            showErrorTip: o,
            showLogin: n,
            changeLogin: r
        };
        t.exports = c
    }, 5: function (t, e) {
        var x;
        (x = jQuery).fn.checkForm = function (i) {
            var n = null;

            function t(t) {
                switch (x(t).attr("data-type")) {
                case "userName":
                    ! function e(t) {
                        var e = x(t).val();
                        0 == x.trim(e).length ? s(!0, x(t), i.userNoneMsg) : i.regExpName.test(e) ? s(!1, x(t), "") : s(!1, x(t), i.userErrorMsg)
                    }(t);
                    break;
                case "idCard":
                    ! function a(t) {
                        var e = x(t).val();
                        0 == x.trim(e).length ? s(!0, x(t), i.cardNoneMsg) : i.regExpCard.test(e.replace(/\s+/g, "")) ? s(!1, x(t), "") : s(!1, x(t), i.cardErrorMsg)
                    }(t);
                    break;
                case "phoneNum":
                    ! function r(t) {
                        var e = x(t).val();
                        0 == x.trim(e).length ? s(!0, x(t), i.phonenNoneMsg) : i.regExpPhone.test(e) ? s(!1, x(t), "") : s(!1, x(t), i.phoneErrorMsg)
                    }(t);
                    break;
                case "imgCode":
                    ! function n(t) {
                        var e = x(t).val();
                        0 == x.trim(e).length ? s(!0, x(t), i.imgCodeNoneMsg) : i.regExpImgCode.test(e) ? function a(e) {
                            var t = {
                                verify_code: x(e).val(),
                                userkey: i.userkey
                            };
                            x.ajax({
                                url: i.checkverify,
                                type: "post",
                                dataType: "json",
                                data: t,
                                async: !1,
                                success: function (t) {
                                    0 == t.code ? s(!1, x(e), "") : s(!1, x(e), i.imgCodeErrorMsg)
                                }, error: function () {
                                    i.showErrorTip("网络请求超时！")
                                }
                            })
                        }(t) : s(!1, x(t), i.imgCodeErrorMsg)
                    }(t);
                    break;
                case "phoneCode":
                    ! function o(t) {
                        var e = x(t).val();
                        0 == x.trim(e).length ? s(!0, x(t), i.codeNoneMsg) : i.regExpPhone.test(e) ? s(!1, x(t), "") : s(!1, x(t), i.codeErrorMsg)
                    }(t)
                }
            }

            function s(t, e, a) {
                var r = e.attr("data-num");
                t && e.removeClass("focus"), x(l[r]).text(a)
            }

            function e() {
                x.sendReq(i.getVerify, "post", {
                    userkey: i.userkey
                }, function (t) {
                    0 == t.code ? g.attr("src", t.data) : i.showErrorTip(t.msg)
                })
            }

            function o(t) {
                var a = !0;
                return x.each(t, function (t, e) {
                    if ("" != x(e).text()) return a = !1
                }), a
            }

            function d(t) {
                return a.find("input[data-type='" + t + "']")
            }
            i = x.extend({
                regExpPhone: /^1[3456789]\d{9}$/,
                regExpImgCode: /^[a-zA-Z0-9]{4}$/,
                regExpPhoCode: /^[a-zA-Z0-9]{4}$/,
                regExpName: /^([\u4e00-\u9fa5\·\.]{2,16})$/,
                regExpCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                regExpFormatCard: /(^(\d{6})|(\d{8}))(?=[^\s])/g,
                regExpNum: /\D/g,
                regExpNumSort: /[^\w\.\/]/gi,
                userNoneMsg: "请输入真实姓名",
                userErrorMsg: "请输入真实姓名",
                cardNoneMsg: "请输入身份证号码",
                cardErrorMsg: "请输入正确的省份证号码",
                phonenNoneMsg: "请输入手机号码",
                phoneErrorMsg: "请输入正确的手机号码",
                imgCodeNoneMsg: "请输入图形验证码",
                imgCodeErrorMsg: "请输入正确图形验证码",
                codeNoneMsg: "请输入手机验证码",
                codeError: "验证码错误，请重新输入",
                phoCodeApi: "/api/user/verifysend",
                imgCodeApi: "",
                getVerify: "/api/user/verify",
                checkverify: "/api/user/checkverify",
                userkey: null
            }, i);
            var a = x(this),
                r = a.find("input[data-type]"),
                l = a.find(".error"),
                c = a.find(".login-error"),
                u = a.find("[data-type='phoneNum']"),
                p = a.find("[data-type='imgCode']"),
                f = a.find("[data-type='idCard']"),
                g = a.find("[data-type='getImgCode']"),
                h = a.find("[data-type='phoneCode']"),
                b = a.find("[data-type='getCode']"),
                _ = a.find("*[data-type='submit']");
            return r.bind("focus", function () {
                var t = x(this).attr("data-num");
                x(l[t]).text(""), x(this).addClass("focus")
            }), r.bind("blur", function () {
                t(this)
            }), f.bind("keyup", function () {
                var t = x(this).val();
                x(this).val(t.replace(i.regExpNumSort, ""))
            }), u.bind("keyup", function () {
                var t = x(this).val();
                x(this).val(t.replace(i.regExpNum, "")), x(this).val(x(this).val().substr(0, 11))
            }), p.bind("keyup", function () {
                var t = x(this).val();
                x(this).val(t.replace(i.regExpNumSort, "")), x(this).val(x(this).val().substr(0, 4))
            }), h.bind("keyup", function () {
                var t = x(this).val();
                x(this).val(t.replace(i.regExpNum, "")), x(this).val(x(this).val().substr(0, 4))
            }), h.bind("focus", function () {
                c.text("")
            }), g.bind("click", function () {
                e()
            }), b.bind("click", function () {
                var t = d("phoneNum"),
                    e = d("imgCode");
                if (t.trigger("blur"), e.trigger("blur"), o(l.eq(t.attr("data-num"))) && o(l.eq(e.attr("data-num")))) {
                    var a = {
                            phone: t.val(),
                            type: i.type,
                            verify_code: e.val(),
                            userkey: i.userkey,
                            sms_method: 2
                        },
                        r = this;
                    x(this).prop("disabled", !0), x.sendReq(i.phoCodeApi, "post", a, function (t) {
                        0 == t.code ? function e(t, e) {
                            var a = x(e);
                            a.prop("disabled", !0), a.text(t + "S"), n = setInterval(function () {
                                t--, a.text(t + "(S)"), t <= 0 && (a.text("获取验证码"), a.prop("disabled", !1), clearInterval(n))
                            }, 1e3)
                        }(60, r) : (x(r).prop("disabled", !1), i.showErrorTip(t.msg))
                    }, function () {
                        x(this).prop("disabled", !1)
                    })
                }
            }), f.bind("keyup", function () {
                x(this).val(x(this).val().replace(i.regExpFormatCard, "$1 ")), x(this).val(x(this).val().substr(0, 20))
            }), _.bind("click", function () {
                r.trigger("blur"), o(l) && i.submit(r, this, i.userkey)
            }), {
                initData: function m() {
                    r.val(""), l.text(""), clearInterval(n), b.text("获取验证码"), b.prop("disabled", !1)
                }, sendImgCode: e,
                changeUserkey: function v(t) {
                    i.userkey = t, e()
                }
            }
        }
    }, 57: function (t, e, a) {
        t.exports = a(58)
    }, 58: function (t, e, h) {
        $(function () {
            var r = h(4),
                e = h(59),
                a = h(22);
            h(60), h(27);
            var n = h(25),
                i = $(".page-opt"),
                o = h(1),
                s = $(".myenlist-left-nav #goPage"),
                d = {
                    enrolllist: "/api/user/newenrolllist",
                    cancelenroll: "/api/order/cancelenroll"
                },
                l = {
                    global_id: "",
                    user_sign: o(),
                    page_index: 1,
                    page_size: 10,
                    check_status: 0
                };

            function c(t) {
                l.page_index = t, f(l)
            }

            function u(t) {
                var e = t.data ? t.data.enroll_list : t,
                    a = e.length;
                if (0 == a) {
                    var r = '<tr><td class="none" colspan="6"><i class="iconfont none">&#xe68c;</i><span class="none">无相关内容</span></td></tr>';
                    i.html("")
                } else {
                    for (var n = t.data, o = (r = "", 0); o < e.length; o++) r += o % 2 != 0 ? '<tr class="odd">' : "<tr>", r += '<td class="first"><img src="' + e[o].img_url + '" width="80" height="60">' + e[o].majors_name + "</td><td>" + e[o].college_name + "</td><td>" + e[o].layer_name + '</td><td class="fx">¥' + (0 == e[o].total_price || null == e[o].total_price ? " - -" : e[o].total_price) + "</td>", 1 == e[o].check_status ? 1 == e[o].confirm_status ? r += '<td class="fx condition" style="color: #fe9b00;">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a class="pay-btn" href="./information.html?e=' + e[o].enroll_id + "&cd=" + e[o].city_id + '" target="_blank">确认报名</a><br/><a class="cancel" href="javaScript:;" id="' + e[o].enroll_id + '">取消报名</a><br/></td></tr>' : 2 == e[o].confirm_status && (r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a class="pay-btn" href="./depositPay.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '"  target="_blank">马上支付</a><br/><a href="./depositWaitPay.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/><a class="cancel" href="javaScript:;" id="' + e[o].enroll_id + '">取消报名</a></td></tr>') : 6 == e[o].check_status && (1 == e[o].confirm_status ? r += '<td class="fx condition" style="color: #fe9b00;">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a class="pay-btn" href="./information.html?e=' + e[o].enroll_id + "&cd=" + e[o].city_id + '"  target="_blank">确认报名</a><br/><a class="cancel" href="javaScript:;" id="' + e[o].enroll_id + '">取消报名</a><br/></td></tr>' : 2 == e[o].confirm_status && (r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a class="pay-btn" href="./depositPay.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '"  target="_blank">马上支付</a><br/><a href="./depositWaitPay.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/><a class="cancel" href="javaScript:;" id="' + e[o].enroll_id + '">取消报名</a></td></tr>')), 4 == e[o].check_status ? r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a class="pay-btn" href="./information.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + "&cd=" + e[o].city_id + '"  target="_blank">马上支付</a><br/><a href="./payForPayment.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + "&cd=" + e[o].city_id + '" target="_blank">查看详情</a><br/><a class="cancel" href="javaScript:;" id="' + e[o].enroll_id + '">取消报名</a></td></tr>' : 14 == e[o].check_status ? r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a class="pay-btn" href="./depositPay.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '"  target="_blank">马上支付</a><br/><a href="./depositWaitPay.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/><a class="cancel" href="javaScript:;" id="' + e[o].enroll_id + '">取消报名</a></td></tr>' : 11 == e[o].check_status ? r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a href="javascript:void(0);" class="downloadtests" data-enrollid=' + e[o].enroll_id + '>模拟题下载</a><br/><a href="./alreadyPaid.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/><a href="./certificate.html?o=' + e[o].order_id + '" target="_blank">报名凭证</a></td></tr>' : 13 == e[o].check_status ? r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a href="./depositPaid.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/></td></tr>' : 8 == e[o].check_status ? r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a href="./underReview.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/><a href="./certificate.html?o=' + e[o].order_id + '" target="_blank">报名凭证</a><br/></td></tr>' : 9 == e[o].check_status ? r += '<td class="fx condition" style="color: #f04f00;">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a href="./auditFailure.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/><a href="./certificate.html?o=' + e[o].order_id + '" target="_blank">报名凭证</a><br/></td></tr>' : 10 == e[o].check_status ? r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a href="./accepted.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/><a href="./certificate.html?o=' + e[o].order_id + '" target="_blank">报名凭证</a><br/></td>< /tr>' : 5 == e[o].check_status ? r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a href="./efficacy.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/></td></tr>' : 12 == e[o].check_status ? r += '<td class="fx condition" style="color: #fe9b00;">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a href="./registProcess.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/></td></tr>' : 15 == e[o].check_status ? r += '<td class="fx condition" style="color: #fe9b00;">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a href="./preRegistSuccess.html?e=' + e[o].enroll_id + '" target="_blank">查看详情</a><br/></td></tr>' : 16 == e[o].check_status && (r += '<td class="fx condition">' + e[o].order_status + '</td><td class="timer">' + e[o].created_at.split(" ")[0] + "<br/>" + e[o].created_at.split(" ")[1] + '</td><td class="fx btn-box"><a href="javascript:void(0);" class="downloadtests" data-enrollid=' + e[o].enroll_id + '>模拟题下载</a><br/><a href="./waitAccepte.html?e=' + e[o].enroll_id + "&o=" + e[o].order_id + '" target="_blank">查看详情</a><br/><a href="./certificate.html?o=' + e[o].order_id + '" target="_blank">报名凭证</a></td></tr>');
                    i.pagation({
                        current_page: n.current_page,
                        total_page: n.total_page,
                        total_nums: n.total_nums,
                        len: a,
                        calback: c
                    })
                }
                $(".table-box").html(r)
            }

            function p(t) {
                if (0 == t.code) {
                    u(t);
                    var e = t.data ? t.data.enroll_list : [],
                        a = e[0] ? e[0].order_status : "";
                    1 == l.page_index && 0 == l.check_status && "已失效" == a && s.hide()
                } else 400001306 == t.code || 400001326 == t.code || 400001324 == t.code ? ($.removeLocalStorage("infor"), u([]), r.showErrorTip(t.msg), r.changeLogin(!1), r.showLogin()) : (u([]), r.showErrorTip(t.msg))
            }

            function f(t) {
                $.sendReq(d.enrolllist, "get", t, p)
            }

            function g(t) {
                0 == t.code ? (e("取消报名成功！"), f(l)) : r.showErrorTip(t.msg)
            }
            $("body").on("click", "#tab li", function () {
                var t = $(this),
                    e = t.index(),
                    a = t.hasClass("current");
                t.siblings().removeClass("current"), t.addClass("current"), l.check_status = e, l.page_index = 1;//, a || f(l)
            });


            $("body").on("click", ".downloadtests", function (t) {
                $("form").remove(), n("/api/exam/downloadtests", l.user_sign, $(t.target).data("enrollid"))
            }), f(l), $("body").on("click", ".cancel", function () {
                var t = $(this).attr("id");
                a("取消报名", "确定取消报名吗？", '<button id="' + t + '" class="confir sure com">确认</button><a class="find com" href="javascript:;">取消</a>')
            }), $("body").on("click", ".sure", function () {
                var t = $(this).attr("id"),
                    e = {
                        global_id: "",
                        user_sign: o(),
                        enroll_id: t
                    };
                $.sendReq(d.cancelenroll, "post", e, g)
            })
        })
    }, 59: function (t, e) {
        var n = $(".success-close"),
            o = n.find(".infor");
        t.exports = function a(t, e) {
            o.html(t), n.css("margin-left", "0px");
            var a = parseInt(n.outerWidth(!0) / 2);
            n.css("margin-left", -a + "px"), n.slideDown();
            var r = setTimeout(function () {
                1 == e ? window.location.href = "/" : n.fadeOut(), clearTimeout(r)
            }, 1e3)
        }
    }, 6: function (t, e) {
        var a = $("body"),
            r = $("#signBox"),
            n = $(".server-lines"),
            o = $(".net-weixin"),
            i = $(window).height(),
            s = $("#goTop"),
            d = $("#signBox");
        $(window).scroll(function () {
            var t = $(this).scrollTop() - 100;
            i < t ? s.fadeIn() : s.fadeOut()
        }), $(window).trigger("scroll"), a.on("click", "#goTop", function () {
            $("html,body").animate({
                scrollTop: 0
            }, 200)
        }), a.on("click", "#signClose", function () {
            r.animate({
                left: 1
            })
        }), a.on("mouseenter", "#serverNum,.server-lines", function () {
            n.parent().addClass("active"), n.show(), n.animate({
                left: -165
            }, 300)
        }), a.on("mouseenter", "#signWechat,#signBox", function () {
            d.parent().addClass("active"), d.show(), d.animate({
                left: -165
            }, 300)
        }), a.on("mouseenter", "#netWx,.net-weixin", function () {
            o.parent().addClass("active"), o.show(), o.animate({
                left: -165
            }, 300)
        }), a.on("mouseleave", "#serverNum,.server-lines", function () {
            n.parent().removeClass("active"), n.animate({
                left: 1
            }, 300, function () {
                n.hide()
            })
        }), a.on("mouseleave", "#netWx,.net-weixin", function () {
            o.parent().removeClass("active"), o.animate({
                left: 1
            }, 300, function () {
                o.hide()
            })
        }), a.on("mouseleave", "#signWechat,#signBox", function () {
            d.parent().removeClass("active"), d.animate({
                left: 1
            }, 300, function () {
                d.hide()
            })
        }), $("body").on("click", ".signWechatBtn", function () {
            NTKF.im_openInPageChat("kf_10225_1531102671297")
        }), $("body").on("click", ".studyServeBtn", function () {
            window.open("http://webchat.openonline.com.cn/EliteWebChat/clientLogin.do?queue=1&urlFrom=web.learn.open.com.cn&loginName=anonymous&password=letmein")
        })
    }, 60: function (t, e) {
        var c;
        (c = jQuery).fn.pagation = function (r) {
            var t = (r = c.extend({
                    current_page: 1,
                    total_page: 1,
                    total_nums: 1,
                    len: 1,
                    calback: function () {}
                }, r)).current_page - 1,
                e = r.current_page + 1,
                a = '<div class="page-index">第<span>' + r.current_page + "</span>页&nbsp;/&nbsp;共<span>" + r.total_page + "</span>页&nbsp;&nbsp;本页<span>" + r.len + "</span>条&nbsp;/&nbsp;共<span>" + r.total_nums + '</span>条</div><div class="option"><a class="first ' + (1 == r.current_page ? "disabled" : "") + '"data-size="1" href="javascript:;">[首页]</a><a class="prev ' + (t < 1 ? "disabled" : "") + '" data-size="' + (t <= 0 ? 1 : t) + '" href="javascript:;">[上一页]</a><a class="next ' + (e > r.total_page ? "disabled" : "") + '" data-size="' + (e <= r.total_page ? e : r.total_page) + '" href="javascript:;">[下一页]</a><a class="end ' + (r.current_page == r.total_page ? "disabled" : "") + '"data-size="' + r.total_page + '" href="javascript:;">[末页]</a><input class="page num" type="text" data-size="' + r.total_page + '" maxlength="3"></input><button class="go">Go</button></div>',
                n = Number(r.total_page),
                o = c(this);
            o.html(a);
            var i = o.find("a"),
                s = o.find(".num"),
                d = o.find(".go");

            function l(t, e) {
                if (t.val(t.val().replace(/\D/g, "")), "" != t.val()) {
                    var a = Number(t.val());
                    a <= n ? t.val(a) : t.val(n), e && r.calback(t.val())
                }
            }
            i.bind("click", function () {
                var t = c(this).attr("data-size");
                r.calback(t)
            }), s.bind("keyup", function () {
                var t = c(this),
                    e = t.val();
                t.val(e.replace(/\D/g, ""))
            }), s.bind("keydown", function (t) {
                var e = c(this);
                13 == t.keyCode && l(e, !0)
            }), s.bind("blur", function (t) {
                l(c(this), !1)
            }), d.bind("click", function () {
                l(s, !0)
            })
        }
    }, 7: function (t, e, a) {
        var r = $("#login"),
            n = r.find(".box"),
            o = r.find(".login-error"),
            i = a(0),
            s = a(3),
            d = a(2),
            l = "/api/user/verifylogin";
        $("body").on("click", ".login-container #closeLogin", function () {
            n.removeClass("bounceIn"), r.hide(), c.initData(), o.text("")
        });
        var c = r.checkForm({
            submit: function u(t, e, a) {
                var r = t.filter("[data-type='phoneNum']").val(),
                    n = {
                        phone: r,
                        type: 1,
                        sms_code: t.filter("[data-type='phoneCode']").val(),
                        verify_code: t.filter("[data-type='imgCode']").val(),
                        userkey: a
                    };
                $(e).prop("disabled", !0), $(e).addClass("disabled"), $.sendReq(l, "POST", n, function (t) {
                    $(e).prop("disabled", !1), $(e).removeClass("disabled"), 0 == t.code ? ($.setStorage("infor", {
                        phoneNum: r,
                        userSign: t.data.user_sign
                    }), d(!0), $("#closeLogin").trigger("click"), window.location.reload()) : (o.text(t.msg), $.removeLocalStorage("infor"))
                }, function () {
                    $(e).prop("disabled", !1), $(e).removeClass("disabled")
                })
            }, type: 1,
            showErrorTip: i
        });
        t.exports = function p(t) {
            n.addClass("bounceIn"), r.show(), s(c, t)
        }
    }
});