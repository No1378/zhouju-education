! function (n) {
    var a = {};

    function r(e) {
        if (a[e]) return a[e].exports;
        var t = a[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, r), t.l = !0, t.exports
    }
    r.m = n, r.c = a, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e["default"]
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 71)
}({
    0: function (e, t) {
        var r = $(".error-close"),
            o = r.find(".infor");
        e.exports = function n(e, t) {
            o.html(e), r.css("margin-left", "0px");
            var n = parseInt(r.outerWidth(!0) / 2);
            r.css("margin-left", -n + "px"), r.slideDown();
            var a = setTimeout(function () {
                1 == t ? window.location.href = "/" : r.fadeOut(), clearTimeout(a)
            }, 1e3)
        }
    }, 1: function (e, t) {
        e.exports = function n() {
            return $.getStorage("infor") && $.getStorage("infor").userSign ? $.getStorage("infor").userSign : ""
        }
    }, 22: function (e, t) {
        var a = $(".revise-result"),
            r = a.find(".container"),
            o = a.find(".prot"),
            i = a.find(".infor"),
            s = a.find(".opt");
        $("body").on("click", ".com", function () {
            a.hide(), r.removeClass("bounceIn")
        }), e.exports = function n(e, t, n) {
            o.html(e), i.html(t), s.html(n), a.show(), r.addClass("bounceIn")
        }
    }, 3: function (e, t) {
        var a = "/api/user/userkey";
        e.exports = function n(t, n) {
            // $.sendReq(a, "post", {}, function (e) {
            //     0 == e.code ? t.changeUserkey(e.data) : n(e.msg)
            // })
        }
    }, 5: function (e, t) {
        var _;
        (_ = jQuery).fn.checkForm = function (i) {
            var r = null;

            function e(e) {
                switch (_(e).attr("data-type")) {
                case "userName":
                    ! function t(e) {
                        var t = _(e).val();
                        0 == _.trim(t).length ? s(!0, _(e), i.userNoneMsg) : i.regExpName.test(t) ? s(!1, _(e), "") : s(!1, _(e), i.userErrorMsg)
                    }(e);
                    break;
                case "idCard":
                    ! function n(e) {
                        var t = _(e).val();
                        0 == _.trim(t).length ? s(!0, _(e), i.cardNoneMsg) : i.regExpCard.test(t.replace(/\s+/g, "")) ? s(!1, _(e), "") : s(!1, _(e), i.cardErrorMsg)
                    }(e);
                    break;
                case "phoneNum":
                    ! function a(e) {
                        var t = _(e).val();
                        0 == _.trim(t).length ? s(!0, _(e), i.phonenNoneMsg) : i.regExpPhone.test(t) ? s(!1, _(e), "") : s(!1, _(e), i.phoneErrorMsg)
                    }(e);
                    break;
                case "imgCode":
                    ! function r(e) {
                        var t = _(e).val();
                        0 == _.trim(t).length ? s(!0, _(e), i.imgCodeNoneMsg) : i.regExpImgCode.test(t) ? function n(t) {
                            var e = {
                                verify_code: _(t).val(),
                                userkey: i.userkey
                            };
                            _.ajax({
                                url: i.checkverify,
                                type: "post",
                                dataType: "json",
                                data: e,
                                async: !1,
                                success: function (e) {
                                    0 == e.code ? s(!1, _(t), "") : s(!1, _(t), i.imgCodeErrorMsg)
                                }, error: function () {
                                    i.showErrorTip("网络请求超时！")
                                }
                            })
                        }(e) : s(!1, _(e), i.imgCodeErrorMsg)
                    }(e);
                    break;
                case "phoneCode":
                    ! function o(e) {
                        var t = _(e).val();
                        0 == _.trim(t).length ? s(!0, _(e), i.codeNoneMsg) : i.regExpPhone.test(t) ? s(!1, _(e), "") : s(!1, _(e), i.codeErrorMsg)
                    }(e)
                }
            }

            function s(e, t, n) {
                var a = t.attr("data-num");
                e && t.removeClass("focus"), _(c[a]).text(n)
            }

            function t() {
                _.sendReq(i.getVerify, "post", {
                    userkey: i.userkey
                }, function (e) {
                    0 == e.code ? f.attr("src", e.data) : i.showErrorTip(e.msg)
                })
            }

            function o(e) {
                var n = !0;
                return _.each(e, function (e, t) {
                    if ("" != _(t).text()) return n = !1
                }), n
            }

            function l(e) {
                return n.find("input[data-type='" + e + "']")
            }
            i = _.extend({
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
            var n = _(this),
                a = n.find("input[data-type]"),
                c = n.find(".error"),
                d = n.find(".login-error"),
                u = n.find("[data-type='phoneNum']"),
                p = n.find("[data-type='imgCode']"),
                m = n.find("[data-type='idCard']"),
                f = n.find("[data-type='getImgCode']"),
                g = n.find("[data-type='phoneCode']"),
                h = n.find("[data-type='getCode']"),
                v = n.find("*[data-type='submit']");
            return a.bind("focus", function () {
                var e = _(this).attr("data-num");
                _(c[e]).text(""), _(this).addClass("focus")
            }), a.bind("blur", function () {
                e(this)
            }), m.bind("keyup", function () {
                var e = _(this).val();
                _(this).val(e.replace(i.regExpNumSort, ""))
            }), u.bind("keyup", function () {
                var e = _(this).val();
                _(this).val(e.replace(i.regExpNum, "")), _(this).val(_(this).val().substr(0, 11))
            }), p.bind("keyup", function () {
                var e = _(this).val();
                _(this).val(e.replace(i.regExpNumSort, "")), _(this).val(_(this).val().substr(0, 4))
            }), g.bind("keyup", function () {
                var e = _(this).val();
                _(this).val(e.replace(i.regExpNum, "")), _(this).val(_(this).val().substr(0, 4))
            }), g.bind("focus", function () {
                d.text("")
            }), f.bind("click", function () {
                t()
            }), h.bind("click", function () {
                var e = l("phoneNum"),
                    t = l("imgCode");
                if (e.trigger("blur"), t.trigger("blur"), o(c.eq(e.attr("data-num"))) && o(c.eq(t.attr("data-num")))) {
                    var n = {
                            phone: e.val(),
                            type: i.type,
                            verify_code: t.val(),
                            userkey: i.userkey,
                            sms_method: 2
                        },
                        a = this;
                    _(this).prop("disabled", !0), _.sendReq(i.phoCodeApi, "post", n, function (e) {
                        0 == e.code ? function t(e, t) {
                            var n = _(t);
                            n.prop("disabled", !0), n.text(e + "S"), r = setInterval(function () {
                                e--, n.text(e + "(S)"), e <= 0 && (n.text("获取验证码"), n.prop("disabled", !1), clearInterval(r))
                            }, 1e3)
                        }(60, a) : (_(a).prop("disabled", !1), i.showErrorTip(e.msg))
                    }, function () {
                        _(this).prop("disabled", !1)
                    })
                }
            }), m.bind("keyup", function () {
                _(this).val(_(this).val().replace(i.regExpFormatCard, "$1 ")), _(this).val(_(this).val().substr(0, 20))
            }), v.bind("click", function () {
                a.trigger("blur"), o(c) && i.submit(a, this, i.userkey)
            }), {
                initData: function b() {
                    a.val(""), c.text(""), clearInterval(r), h.text("获取验证码"), h.prop("disabled", !1)
                }, sendImgCode: t,
                changeUserkey: function y(e) {
                    i.userkey = e, t()
                }
            }
        }
    }, 6: function (e, t) {
        var n = $("body"),
            a = $("#signBox"),
            r = $(".server-lines"),
            o = $(".net-weixin"),
            i = $(window).height(),
            s = $("#goTop"),
            l = $("#signBox");
        $(window).scroll(function () {
            var e = $(this).scrollTop() - 100;
            i < e ? s.fadeIn() : s.fadeOut()
        }), $(window).trigger("scroll"), n.on("click", "#goTop", function () {
            $("html,body").animate({
                scrollTop: 0
            }, 200)
        }), n.on("click", "#signClose", function () {
            a.animate({
                left: 1
            })
        }), n.on("mouseenter", "#serverNum,.server-lines", function () {
            r.parent().addClass("active"), r.show(), r.animate({
                left: -165
            }, 300)
        }), n.on("mouseenter", "#signWechat,#signBox", function () {
            l.parent().addClass("active"), l.show(), l.animate({
                left: -165
            }, 300)
        }), n.on("mouseenter", "#netWx,.net-weixin", function () {
            o.parent().addClass("active"), o.show(), o.animate({
                left: -165
            }, 300)
        }), n.on("mouseleave", "#serverNum,.server-lines", function () {
            r.parent().removeClass("active"), r.animate({
                left: 1
            }, 300, function () {
                r.hide()
            })
        }), n.on("mouseleave", "#netWx,.net-weixin", function () {
            o.parent().removeClass("active"), o.animate({
                left: 1
            }, 300, function () {
                o.hide()
            })
        }), n.on("mouseleave", "#signWechat,#signBox", function () {
            l.parent().removeClass("active"), l.animate({
                left: 1
            }, 300, function () {
                l.hide()
            })
        }), $("body").on("click", ".signWechatBtn", function () {
            NTKF.im_openInPageChat("kf_10225_1531102671297")
        }), $("body").on("click", ".studyServeBtn", function () {
            window.open("http://webchat.openonline.com.cn/EliteWebChat/clientLogin.do?queue=1&urlFrom=web.learn.open.com.cn&loginName=anonymous&password=letmein")
        })
    }, 71: function (e, t, n) {
        e.exports = n(72)
    }, 72: function (e, t, o) {
        $(function () {
            var f = {
                    signUp: "/api/user/verifysign",
                    checksign: "/api/user/checksign"
                },
                g = $(".lose-box"),
                h = o(73),
                n = $.getStorage("infor");
            n ? g.html(h(!1, n)) : g.html(h(!0)), o(5);
            var v = o(0),
                b = o(22),
                a = o(74),
                y = $(".fiilUp"),
                r = o(8),
                e = o(75),
                t = o(3),
                _ = o(1);

            function x() {
                t(N, v)
            }
            o(6), $('<div id="hideEvent" style="display:none;">').on("myCustomEvent", function (e, t) {
                r.majorRender(t)
            }).appendTo("body"), e();
            var N = y.checkForm({
                submit: function C(e, r, t) {
                    var o = $.getStorage("infor"),
                        i = e.filter("[data-type='userName']").val(),
                        s = e.filter("[data-type='phoneNum']").val(),
                        n = e.filter("[data-type='phoneCode']").val(),
                        l = e.filter("[data-type='idCard']").val(),
                        a = e.filter("[data-type='imgCode']").val(),
                        c = $.getParam("cd"),
                        d = $.getParam("sd"),
                        u = $.getParam("pd"),
                        p = $.getParam("T") ? $.getParam("T") : "",
                        m = null;
                    m = o ? {
                        phone: s,
                        type: 1,
                        product_id: u,
                        true_name: i,
                        user_sign: _(),
                        certificate: l.replace(/\s+/g, ""),
                        school_code: d,
                        teacher_num: p,
                        city_id: c
                    } : {
                        phone: s,
                        type: 1,
                        product_id: u,
                        true_name: i,
                        sms_code: n,
                        certificate: l.replace(/\s+/g, ""),
                        school_code: d,
                        teacher_num: p,
                        verify_code: a,
                        userkey: t,
                        city_id: c
                    }, $(r).prop("disabled", !0), $(r).addClass("disabled"), $.sendReq(f.signUp, "post", m, function (e) {
                        $(r).prop("disabled", !1), $(r).removeClass("disabled");
                        var t = e.code,
                            n = e.msg;
                        if (e = e.data, 0 == t) $.setStorage("infor", {
                            userSign: e.user_sign,
                            phoneNum: s,
                            trueName: i,
                            card: l
                        }), 0 == e.prepare_enroll_id ? window.location.href = "./information.html?e=" + e.enroll_id + "&cd=" + c : b("提交成功", "预约报名信息提交成功，请保持手机畅<br/>通，学历顾问稍后会与您取得联系", '<a class="pre-regist" href="./preRegistSuccess.html?e=' + e.prepare_enroll_id + '">确定</a>');
                        else if (400001306 == t || 400001319 == t) g.html(h(!0, o)), $.removeLocalStorage("infor"), N = y.checkForm({
                            submit: C,
                            type: 2,
                            showErrorTip: v
                        }), x(), v(n);
                        else if (400001309 == t || 400001405 == t) $.setStorage("infor", {
                            userSign: e.user_sign,
                            phoneNum: s,
                            trueName: i,
                            card: l
                        }), 1 == e.check_status || 6 == e.check_status ? b("报名失败", "已存在未完成报名，请继续", '<button class="confir com">确定</button><a href="./information.html?e=' + e.enroll_id + "&cd=" + c + '" class="find">查看详情</a>') : b("报名失败", "已存在未完成报名，请继续", '<button class="confir com">确定</button><a href="./myRegistration.html" class="find">查看详情</a>');
                        else if (400001310 == t) $.setStorage("infor", {
                            userSign: e.user_sign,
                            phoneNum: s,
                            trueName: i,
                            card: l
                        }), b("报名失败", "已存在正在审核的报名，请勿重复报名", '<button class="confir com">确定</button><a href="./myRegistration.html" class="find">查看详情</a>');
                        else if (400001311 == t) $.setStorage("infor", {
                            userSign: e.user_sign,
                            phoneNum: s,
                            trueName: i,
                            card: l
                        }), b("报名失败", "您是奥鹏学员，不能重复报名", '<button class="ensure com">确定</button>');
                        else if (400001312 == t) b("报名失败", "身份验证失败！请确认姓名与</br>身份证号一致，且手机号为本</br>人实名认证。", '<button class="ensure com">确定</button>');
                        else if (400001313 == t) {
                            $.setStorage("infor", {
                                userSign: e.user_sign,
                                phoneNum: s,
                                trueName: i,
                                card: l
                            });
                            var a = "./information.html?e=" + e.enroll_id + "&cd=" + c;
                            3 == e.order_channel && (a = "./depositPay.html?e=" + e.enroll_id + "&o=" + e.order_id), b("报名失败", "已存在未完成报名，请继续", '<button class="confir com">确定</button><a href="' + a + '" class="find">查看详情</a>')
                        } else v(n)
                    }, function () {
                        $(r).prop("disabled", !1), $(r).removeClass("disabled")
                    })
                }, type: 2,
                showErrorTip: v
            });
            n || x(), $("body").on("click", "#revisePhone", function () {
                var t = g.find(".number"),
                    e = {
                        user_sign: _(),
                        phone: g.find(".number").val()
                    };
                a(t), $.sendReq(f.checksign, "post", e, function (e) {
                    0 == e.code ? a(t) : (g.html(h(!0, n)), $.removeLocalStorage("infor"), v(e.msg))
                })
            })
        })
    }, 73: function (e, t) {
        e.exports = function n(e, t) {
            return e ? '<div class="fill_item"><label>真实姓名：</label><input data-num="0" data-type="userName" placeholder="填写本人真实姓名" value="' + (t && t.trueName ? t.trueName : "") + '"><span class="error"></span></div><div class="fill_item"><label>身份证号：</label><input data-num="1" data-type="idCard" placeholder="请填写本人身份证号" maxlength="20" value="' + (t && t.card ? t.card : "") + '"><span class="error"></span></div><div id="hidePhone" class="fill_item"><label>手机号码：</label><input data-num="2" data-type="phoneNum" placeholder="填写本人手机号码" maxlength="11" value="' + (t && t.phoneNum ? t.phoneNum : "") + '"><span class="error"></span></div><div class="fill_item img-code"><label>图形验证码：</label><input data-num="3" data-type="imgCode"  maxlength="4" placeholder="请填写图形验证码" class="small"><strong><img data-type="getImgCode" /></strong><span class="error"></span></div><div class="fill_item"><label>手机验证码：</label><input data-num="4" data-type="phoneCode" maxlength="4" placeholder="请输入手机验证码" class="small"><button data-type="getCode" class="cord">获取验证码</button><span class="error"></span></div><div class="option"><button class="com-btn-hover" data-type="submit">提交报名</button></div>' : '<div class="fill_item"><label>真实姓名：</label><input data-num="0" data-type="userName" placeholder="填写本人真实姓名" value="' + (t && t.trueName ? t.trueName : "") + '"><span class="error"></span></div><div class="fill_item"><label>身份证号：</label><input data-num="1" data-type="idCard" placeholder="请填写本人身份证号" maxlength="20" value="' + (t && t.card ? t.card : "") + '"><span class="error"></span></div><div class="fill_item"><label>手机号码：</label><input class="number small" data-num="2" disabled="disabled" data-type="phoneNum" maxlength="11" placeholder="填写本人手机号码" value="' + (t && t.phoneNum ? t.phoneNum : "") + '"><button id="revisePhone" class="rep">修改手机号</button><span class="error"></span></div><div class="option"><button class="com-btn-hover" data-type="submit">提交报名</button></div>'
        }
    }, 74: function (e, t, n) {
        var o = n(0),
            i = n(22),
            a = $(".revise-phone"),
            r = a.find(".container"),
            s = a.find("#closePhone"),
            l = n(3),
            c = n(1),
            d = null,
            u = "/api/user/verifylogin";
        var p = a.checkForm({
            submit: function m(e, t, n) {
                var a = e.filter("[data-type='phoneNum']").val(),
                    r = {
                        phone: a,
                        type: 1,
                        sms_code: e.filter("[data-type='phoneCode']").val(),
                        verify_code: e.filter("[data-type='imgCode']").val(),
                        user_sign: c(),
                        userkey: n
                    };
                $.sendReq(u, "post", r, function (e) {
                    if (0 == e.code) {
                        s.trigger("click");
                        var t = $.getStorage("infor");
                        t.phoneNum = a, t.userSign = e.data.user_sign, $.setStorage("infor", t), d.val(a), i("修改成功", "报名手机号已修改，请使用新手机号</br>登录查看报名信息", '<button class="ensure com">确定</button>')
                    } else o(e.msg)
                })
            }, type: 3
        });
        s.bind("click", function () {
            a.hide(), r.removeClass("bounceIn"), p.initData()
        }), e.exports = function f(e) {
            d = e, a.show(), r.addClass("bounceIn"), l(p, o)
        }
    }, 75: function (e, t, n) {
        var a = n(0),
            r = {
                product_id: $.getParam("pd"),
                province_name: $.getParam("pn")
            };

        function o(e) {
            0 == e.code ? $("div#hideEvent").trigger("myCustomEvent", [e.data[0]]) : a(e.msg)
        }
        e.exports = function i() {
            $.sendReq("/api/info/productdetail", "post", r, o)
        }
    }, 8: function (e, t) {
        t.majorRender = function n(e) {
            var t = e.studyDate || e.studyTime || e.product_year || e.system ? e.studyDate || e.studyTime || e.product_year || e.system : e.product_year ? e.product_year : "";
            0 <= t.indexOf("年") ? t = t : t += "年";
            var n = "";
            if (n += "<ul><li>专业：" + (e.majorsName || e.majorName || e.majors_name ? e.majorsName || e.majorName || e.majors_name : e.name ? e.name : "") + "</li><li>院校：" + (e.collegeName || e.college_name ? e.collegeName || e.college_name : e.school_name ? e.school_name : "") + "</li><li>层次：" + (e.layerWords || e.layerName || e.layer_name ? e.layerWords || e.layerName || e.layer_name : e.level_name ? e.level_name : "") + "</li><li>学制：" + t + "</li></ul>", n += '<div class="logo"><img src="' + (e.logo_img || e.school_logo ? e.logo_img || e.school_logo : "http://www.iopen.com.cn/product/img/schoollogo/10200.png") + '" width="90" height="90"></div>', $("#person-message").html(n), 1 == e.is_rules) {
                var a = '<i class="iconfont">&#xe724;</i> 温馨提示：' + e.rules_content;
                $(".prompt").html(a)
            }
        }
    }
});