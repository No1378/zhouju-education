/* @file nt2.js
 * @date 2018.10.15 15:45:21
 */
! function (t, e) {
    function i() {}
    t.animate ? t.Log("nt2.js loaded") : (t.animate = function () {
        var t = document.documentElement.style;
        return void 0 !== t.webkitTransition || void 0 !== t.MozTransition || void 0 !== t.OTransition || void 0 !== t.msTransition || void 0 !== t.transition
    }() ? function () {
        var e = document.documentElement.style,
            i = (void 0 !== e.webkitTransition ? "Webkit" : void 0 !== e.MozTransition ? "Moz" : void 0 !== e.OTransition ? "O" : void 0 !== e.msTransition ? "ms" : "") + "Transition";
        return function (e, n, s, o) {
            var a = [],
                r = [],
                h = [],
                l = [],
                c = e.style;
            return s = s || 300, t.each(n, function (i, n) {
                r[i] = t.camelize(i), t.isObject(n) ? (n.to = n.to || 0, a[i] = t.cssNumber[i] ? n.to : parseInt(n.to, 10), h[i] = t.unit(i, n.to), t.isDefined(n.from) && t.css(e, r[i], parseInt(n.from, 10) + h[i])) : (a[i] = t.cssNumber[i] ? parseInt(n, 10) : n, h[i] = t.unit(i, n), t.css(e, r[i], a[i])), l.push(i)
            }), setTimeout(function () {
                c[i] = "all " + s + "ms", t.each(l, function (t, e) {
                    c[r[e]] = a[e] + h[e]
                })
            }, 15), setTimeout(function () {
                c[i] = "", o && o.call(e)
            }, s), e
        }
    }() : function (e, i, n, s) {
        var o, a, r = 0,
            h = 0,
            l = 0,
            c = [],
            d = [],
            u = [],
            p = [],
            m = [];
        for (n = n || 300, t.each(i, function (i, n) {
            u.push(t.camelize(i)), t.isObject(n) ? (a = n.to, t.isDefined(n.from) ? d.push(t.cssNumber[i] ? n.from : parseInt(n.from, 10)) : d.push(t.cssNumber[i] ? t(e).css(i) : parseInt(t(e).css(i), 10)), t.css(e, u[h], d[h] + t.unit(i, a))) : (a = n, d.push(t(e).css(i))), c.push(t.cssNumber[i] ? a : isNaN(parseInt(a, 10)) ? "" : parseInt(a, 10)), p.push(t.unit(i, a)), h++, l++
        }), o = 0; o < 30; o++)
            for (m[o] = [], h = 0; h < l; h++) m[o][u[h]] = t.cssNumber[u[h]] || t.isNumeric(parseInt(d[h])) ? d[h] + (c[h] - d[h]) / 30 * o + ("opacity" === u[h] ? "" : p[h]) : "";
        for (; h < 30; h++) setTimeout(function () {
            for (h = 0; h < l; h++) t.css(e, u[h], m[r][u[h]]);
            r++
        }, n / 30 * h);
        return setTimeout(function () {
            for (h = 0; h < l; h++) t.css(e, u[h], c[h] + p[h]);
            s && s.call(e)
        }, n), e
    }, t.extend({
        listenerFunctions: [],
        listenerMessage: function (e) {
            function i(e) {
                t.each(t.listenerFunctions, function (i, n) {
                    n.apply(t, [e.data])
                })
            }
            var n = this;
            t.listenerFunctions.push(e), window.addEventListener && !0 !== this.__listenerMessage && (t.Event.addEvent(window, "message", i), t.removelistenerMessage = function () {
                t.Event.removeEvent(window, "message", i), t.listenerFunctions = [], n.__listenerMessage = !1
            }, this.__listenerMessage = !0)
        }, postMessage: function (t, e, i) {
            if (t.postMessage) {
                i = i || "*";
                try {
                    t.postMessage(e, i)
                } catch (n) {}
            }
        }
    }), t.Window = t.Class.create(), t.Window.prototype = {
        defaultOptions: {
            dropHeight: 30,
            width: 520,
            height: 410,
            left: 100,
            top: 100,
            minWidth: 520,
            minHeight: 410,
            resize: !1,
            drag: !1,
            fixed: !1,
            zIndex: 1e6,
            rightNode: !0,
            onChanage: i,
            onClose: i,
            onMinimize: i,
            onMaximize: i,
            onMaxResize: i
        },
        _tmpMove: null,
        _tmpStop: null,
        containter: null,
        header: null,
        body: null,
        chatBody: null,
        rightElement: null,
        buttonResize: null,
        buttonClose: null,
        buttonMax: null,
        buttonMin: null,
        _x: 0,
        _y: 0,
        _isdrag: null,
        _Style: null,
        parent: null,
        initialize: function (e, i) {
            t.extend(this, this.defaultOptions, e), this.parent = i || null, this.quirks = t.browser.msie6 || t.browser.Quirks && t.browser.oldmsie, this.right = t(window).width() - this.left - this.width, this.bottom = t(window).height() - this.top - this.height, t.Log("$.Window:: left:" + this.left + ", top:" + this.top), this._create(), this._bind()
        }, close: function (e) {
            this.cancelBubble(e), this.onClose.toString().indexOf("anonymous") <= -1 ? (this.onClose(), window.localStorage.carry_dest && (window.localStorage.carry_dest = "")) : this.containter.hide(function () {
                t(this).remove(), window.localStorage.carry_dest && (window.localStorage.carry_dest = "")
            })
        }, change: function (t) {
            t && this.onChanage.call(this, {
                width: this.width,
                height: this.height
            }), this._isdrag || (this.chatBody.css({
                height: this.height - this.dropHeight + "px"
            }), this.rightNode && this.rightElement.css("height", this.height - this.dropHeight + "px"))
        }, maxresize: function () {
            this.onMaxResize()
        }, minimize: function (t, e) {
            !0 !== e && this.cancelBubble(t), this.containter.css({
                height: "0px",
                width: "0px"
            }), !0 !== e && this.onMinimize()
        }, maximize: function (t, e) {
            this.containter.css({
                height: this.height + "px",
                width: this.width + "px"
            }), !0 !== e && this.onMaximize()
        }, cancelBubble: function (e) {
            this.containter.css("z-index", this.zIndex), t.Event.fixEvent(e).stopPropagation()
        }, changeAttr: function (e, i) {
            this.quirks && this.clearExpression(), t.extend(this, {
                width: e,
                height: i,
                left: Math.max(0, t(window).width() - this.right - e),
                top: Math.max(0, t(window).height() - this.bottom - i)
            }), this.containter.css({
                width: this.width + "px",
                height: this.height + "px",
                left: this.left + "px",
                top: this.top + "px"
            }), this.quirks && this.fixedPosition(), this.change(!0)
        }, start: function (e, i) {
            i || this.cancelBubble(e), this._Style = i ? {
                x: "left",
                y: "top"
            } : {
                x: "width",
                y: "height"
            }, this.right = t(window).width() - this.left - this.width, this.bottom = t(window).height() - this.top - this.height, this.quirks && !i && this.clearExpression(), e = t.Event.fixEvent(e), this.containter.css({
                "z-index": ++this.zIndex
            }), this._isdrag = i, this._x = i ? e.clientX - this.containter.get(0).offsetLeft || 0 : this.containter.get(0).offsetLeft || 0, this._y = i ? e.clientY - this.containter.get(0).offsetTop || 0 : this.containter.get(0).offsetTop || 0, t.browser.msie ? this.containter.bind("losecapture", this._tmpStop).get(0).setCapture() : (t.Event.fixEvent(e).preventDefault(), t(window).bind("blur", this._tmpStop)), t(document).bind("mousemove", this._tmpMove), t(document).bind("mouseup", this._tmpStop)
        }, move: function (e) {
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            var i = (e = t.Event.fixEvent(e)).clientX - this._x,
                n = e.clientY - this._y,
                s = t(window).offset();
            this._isdrag ? (this.quirks ? (this[this._Style.x] = Math.min(Math.max(i, s.left), s.left + t(window).width() - this.width) - s.left, this[this._Style.y] = Math.min(Math.max(n, s.top), s.top + t(window).height() - this.height) - s.top) : (this[this._Style.x] = Math.min(Math.max(i, 0), t(window).width() - this.width), this[this._Style.y] = Math.min(Math.max(n, 0), t(window).height() - this.height)), this.containter.css(this._Style.x, (this.quirks ? s.left : 0) + Math.max(0, this[this._Style.x]) + "px"), this.containter.css(this._Style.y, (this.quirks ? s.top : 0) + Math.max(0, this[this._Style.y]) + "px")) : (this.quirks ? (this[this._Style.x] = Math.min(Math.max(i + (this.quirks ? s.left : 0), this.minWidth), t(window).width() - this.left), this[this._Style.y] = Math.min(Math.max(n + (this.quirks ? s.top : 0), this.minHeight), t(window).height() - this.top)) : (this[this._Style.x] = Math.min(Math.max(i, this.minWidth), t(window).width() - this.left), this[this._Style.y] = Math.min(Math.max(n, this.minHeight), t(window).height() - this.top)), this.containter.css(this._Style.x, this[this._Style.x] + "px"), this.containter.css(this._Style.y, this[this._Style.y] + "px")), this.right = t(window).width() - this.left - this.width, this.bottom = t(window).height() - this.top - this.height, this.change(!0)
        }, stop: function () {
            this.quirks && this.fixedPosition(), this.containter.css({
                "z-index": --this.zIndex
            }), t(document).removeEvent("mousemove", this._tmpMove), t(document).removeEvent("mouseup", this._tmpStop), t.browser.msie ? this.containter.removeEvent("losecapture", this._tmpStop).get(0).releaseCapture() : t(window).removeEvent("blur", this._tmpStop)
        }, fixedPosition: function () {
            if (this.quirks) {
                var e = t(window).scrollTop();
                t(window).scrollTop(e + 1), this.containter.replaceIEcssText({
                    left: "expression(eval(Math.max((document.documentElement.scrollLeft || document.body.scrollLeft), (document.documentElement.scrollLeft || document.body.scrollLeft) + (document.documentElement.clientWidth  || document.body.clientWidth ) - this.offsetWidth  - " + this.right + ")))",
                    top: "expression(eval(Math.max((document.documentElement.scrollTop  || document.body.scrollTop ), (document.documentElement.scrollTop  || document.body.scrollTop ) + (document.documentElement.clientHeight || document.body.clientHeight) - this.offsetHeight - " + this.bottom + ")))"
                }), t(window).scrollTop(e), t(window).scrollLeft(1)
            } else this.containter.css({
                left: this.left + "px",
                top: this.top + "px"
            })
        }, clearExpression: function () {
            var e = t(window).offset();
            this.containter.Expression("left", ""), this.containter.Expression("top", ""), this.containter.Expression("left", ""), this.containter.replaceIEcssText({
                left: e.left + this.left + "px",
                top: e.top + this.top + "px"
            })
        }, _for_resize: function () {
            this.left = Math.max(0, t(window).width() - this.right - this.width), this.top = Math.max(0, t(window).height() - this.bottom - this.height), this.quirks || this.containter.css({
                left: this.left + "px",
                top: this.top + "px"
            })
        }, _create: function () {
            return this.containter = t({
                className: this.className || "ntalk-window-containter",
                style: t.STYLE_BODY + "box-sizing:content-box;overflow:hidden;"
            }).appendTo(this.parent, !0).css({
                position: this.fixed ? this.quirks ? "absolute" : "fixed" : "absolute",
                border: "none",
                width: this.width + "px",
                height: this.height + "px",
                zIndex: this.zIndex
            }), this.fixedPosition(), this.header = t({
                className: "ntalk-window-head",
                style: t.STYLE_BODY + "cursor:move;position:relative;left:0;top:0;"
            }).appendTo(this.containter).css({
                width: "100%",
                height: this.dropHeight + "px"
            }), this.buttonClose = t({
                className: "ntalk-button-close",
                style: t.STYLE_BODY + "width:20px;height:20px;cursor:pointer;position:static;float:right;position:relative;margin:2px 3px 0 0;line-height:20px;vertical-align:middle;background:none;"
            }).appendTo(this.header), this.buttonMax = t({
                className: "ntalk-button-maxresize",
                style: t.STYLE_BODY + "width:20px;height:20px;cursor:pointer;position:static;float:right;position:relative;margin:2px 3px 0 0;line-height:20px;vertical-align:middle;background:none;"
            }).appendTo(this.header), this.buttonMin = t({
                className: "ntalk-button-min",
                style: t.STYLE_BODY + "width:20px;height:20px;cursor:pointer;position:static;float:right;position:relative;margin:2px 3px 0 0;line-height:20px;vertical-align:middle;background:none;"
            }).appendTo(this.header), this.body = t({
                className: "ntalk-window-body",
                style: t.STYLE_BODY + "float:left;width:100%;"
            }).appendTo(this.containter), this.chatBody = t({
                className: "ntalk-chat-body",
                style: t.STYLE_BODY + "width:100%;position:relative;left:0;top:0;"
            }).appendTo(this.body), this.rightNode && (this.rightElement = t({
                className: "ntalk-window-right",
                style: t.STYLE_BODY + "float:left;display:none;width:100%;"
            }).appendTo(this.containter)), this.resize && (this.buttonResize = t({
                className: "window-resize",
                style: t.STYLE_BODY + "width:10px;height:10px;cursor:nw-resize;position:absolute;right:1px;bottom:1px;font-size:0;background:none;z-index:99;"
            }).appendTo(this.containter)), t({
                style: t.STYLE_BODY + "clear:both;"
            }).appendTo(this.containter), this.change(), this.containter
        }, _bind: function () {
            var e = this;
            this.containter.bind("mousedown", function (t) {
                e.drag && e.start.call(e, t, !0)
            }), this.buttonClose.bind("mousedown", function (i) {
                t.Event.fixEvent(i).stopPropagation(), e.close.call(e, i)
            }), this.buttonMax.bind("mousedown", function (i) {
                t.Event.fixEvent(i).stopPropagation(), e.maxresize.call(e, i)
            }), this.buttonMin.bind("mousedown", function (i) {
                t.Event.fixEvent(i).stopPropagation(), e.minimize.call(e, i)
            }), this.chatBody.bind("mousedown", function (t) {
                e.cancelBubble.call(e, t)
            }), this.rightNode && this.rightElement.bind("mousedown", function (t) {
                e.cancelBubble.call(e, t)
            }), this.resize && this.buttonResize.bind("mousedown", function (t) {
                e.start.call(e, t, !1)
            }), this.fixed && t(window).bind("resize", function () {
                e._for_resize()
            }), this._tmpStop = function (t) {
                e.stop.call(e, t)
            }, this._tmpMove = function (t) {
                e.move.call(e, t)
            }
        }
    }, t.Queue = t.Class.create(), t.Queue.prototype = {
        list: null,
        length: 0,
        initialize: function () {
            this.list = [], this.length = this.list.length
        }, isEmpty: function () {
            return 0 === this.list.length
        }, enQueue: function (t) {
            return this.list.push(t), this.length = this.list.length, this.list[this.length - 1]
        }, deQueue: function () {
            var t;
            return this.isEmpty() ? null : (t = this.list.shift(), this.length = this.list.length, t)
        }, queueFront: function () {
            return this.isEmpty() ? null : this.list[0]
        }
    }, t.pageManage = t.Class.create(), t.pageManage.prototype = {
        identid: "",
        keyid: "",
        data: null,
        interID: null,
        options: null,
        debug: !1,
        inter: .8,
        count: 0,
        chanageCall: !0,
        CON_MANAGE_PAGE_LIST: "IM_EXIST_PAGEARR",
        pageStore: null,
        initialize: function (e, n) {
            var s, o, a = this,
                r = 3;
            this.debug && t.Log("pageManage.initialize():"), this.options = t.extend(this.options, {
                onChanage: i,
                onInterval: i,
                pageNum: 3,
                timeout: 2.5,
                inter: .8
            }, e), this.keyid = t.CON_MANAGE_COOKIE + (n ? "_" + n.toUpperCase() : ""), this.identid = this._2shortTime(0, 8, 13), t.browser.chrome && (this.options.timeout = 5), this.options.timeout *= 10, this.options.inter *= 1e3, this.inter = this.options.inter, this.pageStore = t.store;
            try {
                for (; r-- && "" === (s = this.pageStore.get(this.CON_MANAGE_PAGE_LIST) || ""););
                if (o = this._get().m, (s = "" === s || 0 === o.length ? [] : s.split(",")).length != o.length && s.length <= this.options.pageNum) {
                    s = [];
                    for (var h = 0; h < o.length; h++)
                        for (var l in o[h]) s.push(l)
                }
                s.push(this.identid), this.pageStore.set(this.CON_MANAGE_PAGE_LIST, s.join(","))
            } catch (d) {}
            var c = t.getTime();
            this.interID = setInterval(function () {
                setTimeout(function () {
                    now = t.getTime();
                    var e = now - c;
                    a._update(e), a.options.onInterval(a.options.timeout, a.data.m), c = t.getTime()
                }, 0)
            }, this.options.inter), t.Event.addEvent(window, "unload", function () {
                a._remove(), setTimeout(function () {}, 500)
            })
        }, getIsLastPage: function () {
            return this.data.m.length
        }, _get: function () {
            var e = t.cookie.get(this.keyid) || "{}";
            return t.extend({
                m: []
            }, t.JSON.parseJSON(e))
        }, _save: function () {
            var e = t.JSON.toJSONString(this.data);
            return t.cookie.set(this.keyid, e, 0), e
        }, _remove: function () {
            var t = this._getIndex();
            this.data.m.splice(t, 1), this._save();
            var e = this.pageStore.get(this.CON_MANAGE_PAGE_LIST);
            if (e && "" !== e) {
                for (var i = e.split(","), n = 0; n < i.length; n++)
                    if (i[n] == this.identid) {
                        i.splice(n, 1);
                        break
                    }
                    "" !== (e = i.join(",")) ? this.pageStore.set(this.CON_MANAGE_PAGE_LIST, e): this.pageStore.whereClear(this.CON_MANAGE_PAGE_LIST)
            }
        }, _update: function (e) {
            this.data = this._get(), this._clear(e);
            var i = "update",
                n = this._getIndex();
            if (this.data.t = t.formatDate(), !this.data.m[n]) {
                if (!(this.data.m.length < this.options.pageNum)) return;
                i = "add", this.data.m[n] = {}
            }
            this.data.m[n][this.identid] = this._2shortTime(), this._save(), this.debug && t.Log(this.identid + ",pageCount:" + this.data.m.length + "," + i + " data:" + t.JSON.toJSONString(this.data.m)), "add" != i && !0 === this.chanageCall || this.count == this.data.m.length || (this.options.onChanage.call(this, this.data.m.length, this.data.m), this.count = this.data.m.length), this.chanageCall = !1
        }, _clear: function (t) {
            var e = this._2shortTime();
            if (this.data.m.length)
                for (var i, n = 0; n < this.data.m.length; n++)
                    if (this.data.m[n])
                        for (var s in this.data.m[n])
                            if ("function" != typeof this.data.m[n][s] && (i = e - this.data.m[n][s], Math.abs(i) > this.options.timeout + t / 100)) {
                                this.data.m.splice(n, 1), this.chanageCall = !0;
                                var o = this.pageStore.get(this.CON_MANAGE_PAGE_LIST);
                                if (!o || "" === o) return;
                                for (var a = o.split(","), r = 0; r < a.length; r++)
                                    if (a[r] == s) {
                                        a.splice(r, 1);
                                        break
                                    }
                                    "" !== (o = a.join(",")) ? this.pageStore.set(this.CON_MANAGE_PAGE_LIST, o): this.pageStore.whereClear(this.CON_MANAGE_PAGE_LIST)
                            }
        }, _getIndex: function () {
            if (!this.data || !this.data.m.length) return 0;
            for (var e = 0; e < this.data.m.length; e++)
                if (this.data.m[e])
                    for (var i in this.data.m[e])
                        if (this.data.m[e] && !t.isFunction(this.data.m[e][i]) && i === this.identid) return e;
            return e
        }, _2shortTime: function (e, i, n) {
            var s = (e || t.getTime()).toString();
            return i = i || 5, n = n || 11, s.substring(i, n)
        }
    }, t.store = function () {
        var e, n = {
                disabled: !1
            },
            s = t.browser.msie;
        if (n.toJSONString = function (e) {
            return null === e ? "" : t.JSON.toJSONString(e)
        }, n.parseJSON = function (e) {
            if ("object" == typeof e) return e || void 0;
            try {
                return t.JSON.parseJSON(e)
            } catch (i) {
                return e || void 0
            }
        }, function () {
            var e = null;
            try {
                e = window.localStorage
            } catch (n) {
                return t.Log("localStorage:" + n.message, 3), !1
            }
            if (e) {
                var i = "test";
                try {
                    return null !== localStorage.getItem(i) && localStorage.removeItem(i), localStorage.setItem(i, i), localStorage.getItem(i) == i && (localStorage.removeItem(i), !0)
                } catch (n) {
                    return t.Log("The browser localStorage is unavailable. " + n.message, 3), !1
                }
            }
        }()) e = window.localStorage, n.set = function (i, s) {
            if (!s || void 0 === s || null === s) return n.remove(i);
            try {
                "function" == typeof e.setItem ? e.setItem(i, n.toJSONString(s)) : e[i] = n.toJSONString(s)
            } catch (o) {
                if ("QUOTA_EXCEEDED_ERR" == o.name.toUpperCase()) {
                    n.remove(i);
                    try {
                        e.setItem(i, n.toJSONString(s))
                    } catch (a) {
                        t.Log("store.set:" + a.message, 3)
                    }
                }
            }
            return s
        }, n.get = function (t) {
            return n.parseJSON(e.getItem(t))
        }, n.remove = function (i) {
            try {
                e.removeItem(i)
            } catch (n) {
                t.Log("store.remove:" + n.message, 3)
            }
        }, n.clear = function () {
            try {
                e.clear()
            } catch (i) {
                t.Log("store.clear:" + i.message, 3)
            }
        }, n.getAll = function () {
            for (var t = {}, i = 0; i < e.length; ++i) {
                var s = e.key(i);
                t[s] = n.get(s)
            }
            return t
        };
        else if (s) {
            var o, a, r = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"),
                h = function (t) {
                    return function () {
                        var i, s = Array.prototype.slice.call(arguments, 0);
                        s.unshift(e);
                        try {
                            o.appendChild(e)
                        } catch (r) {
                            o.insertBefore(e, o.firstChild)
                        }
                        e.addBehavior && e.addBehavior("#default#userData");
                        for (var a = 20; a > 0;) {
                            a--;
                            try {
                                e.load("nTK-LS");
                                break
                            } catch (r) {}
                        }
                        return i = t.apply(n, s), o.removeChild(e), i
                    }
                },
                l = function (t) {
                    return t.replace(r, "___")
                };
            try {
                (a = new ActiveXObject("htmlfile")).open(), a.write('<script type="text/javascript">document.w=window;<\/script><iframe src="/favicon.ico"></iframe>'), a.close(), o = a.w.frames[0].document, e = o.createElement("div")
            } catch (c) {
                e = document.createElement("div"), o = document.body || document.getElementsByTagName("head")[0] || document.documentElement
            }
            n.set = h(function (t, e, i) {
                if (e = l(e), !i || void 0 === i || null === i) return n.remove(e);
                t.setAttribute(e, n.toJSONString(i));
                try {
                    t.save("nTK-LS")
                } catch (c) {}
                return i
            }), n.get = h(function (t, e) {
                return e = l(e), n.parseJSON(t.getAttribute(e))
            }), n.remove = h(function (t, e) {
                e = l(e), t.removeAttribute(e), t.save("nTK-LS")
            }), n.clear = h(function (t) {
                var e;
                try {
                    e = t.XMLDocument.documentElement.attributes
                } catch (c) {
                    return
                }
                t.load("nTK-LS");
                for (var i = 0, n = e.length; i < n; i++) {
                    var s = e[i];
                    t.removeAttribute(s.name)
                }
                t.save("nTK-LS")
            }), n.getAll = h(function (t) {
                var e;
                try {
                    e = t.XMLDocument.documentElement.attributes
                } catch (c) {
                    return
                }
                for (var i = {}, s = 0, o = e.length; s < o; ++s) {
                    var a = e[s],
                        r = l(a.name);
                    i[a.name] = n.parseJSON(t.getAttribute(r))
                }
                return i
            })
        } else n.set = function () {
            t.Log("The browser localStorage is unavailable.", 3)
        }, n.get = i, n.remove = i, n.clear = i, n.getAll = i;
        try {
            n.set("__cometd__", "__cometd__"), "__cometd__" != n.get("__cometd__") && (n.disabled = !0), n.remove("__cometd__")
        } catch (c) {
            n.disabled = !0
        }
        return n.whereClear = function (e) {
            var i = this,
                n = this.getAll();
            t.each(n, function (t) {
                t.indexOf(e) > -1 && i.remove(t)
            })
        }, n.enabled = !n.disabled, n
    }(), t.comet = t.Class.create(), t.comet.prototype = {
        name: "public.comet",
        version: "2014.05.17",
        connType: "login",
        options: null,
        fix: "",
        id: "",
        count: 0,
        sendIntervalID: null,
        _ipExpr: /^https?:\/\/\d+\.\d+\.\d+\.\d+(:\d+)?\/(.*?)$/gi,
        _cacheElement: {},
        _connectTimeID: {},
        defaultOption: {
            muDomain: 1,
            timeout: 20,
            onCallback: i,
            onComplete: i,
            onAbnormal: i,
            onTimeout: i
        },
        changePort: !1,
        initialize: function (e, i) {
            var n = this;
            this.uri = e, this.fix = t.randomChar(), this.uri || t.Log("comet uri is null", 3), this.callMethod = window, this.callbackName = "callback_" + this.fix, this.callMethod[this.callbackName] = function () {
                n._connectCallback.call(n, n.id, arguments)
            }, this.options = t.extend({}, this.defaultOption, i), this.initConnectionPooling()
        }, initMessageQueue: function () {
            this.messageQueue || (this.messageQueue = new t.Queue, this.messageQueue.addMessage = function (t) {
                for (var e = 0; e < this.length; e++)
                    if (this.list[e].msgid == t.msgid && this.list[e].index == t.index) return !1;
                return this.enQueue(t), !0
            }, this.messageQueue.nextMessage = function (t, e) {
                if (this.isEmpty()) return null;
                if (!t) return this.queueFront();
                for (var i = 0; i < this.length; i++)
                    if (this.list[i].msgid == t && this.list[i].body.sendpacket == e) return this.list[i + 1]
            }, this.messageQueue.removeMessage = function (t, e) {
                for (var i = 0; i < this.length; i++) this.list[i].msgid != t || this.list[i].index != e && -1 != e || i;
                this.list.splice(i, 1), this.length = this.list.length
            })
        }, initConnectionPooling: function () {
            if (!this.connectionPooling) {
                this._ipExpr.test(this.uri) && (this.options.muDomain = 1), this.connectionPooling = new t.Queue, this.connectionPooling.get = function () {
                    for (var t, e, i, n = 0; n < this.list.length; n++)!1 === this.list[n].lock && (!e || e.rTimesample > this.list[n].rTimesample) && (e = this.list[n]), (!i || this.list[n].sTimesample < i.sTimesample) && (i = this.list[n]);
                    return t = e || i, this.recover(t.uri, !0), t
                }, this.connectionPooling.getConnect = function () {
                    var t = this.get();
                    return {
                        uri: t.uri,
                        url: t.uri + (/\?$/gi.test(t.uri) ? "&" : "?")
                    }
                }, this.connectionPooling.recover = function (e, i, n, s) {
                    for (var o = 0; o < this.list.length; o++)
                        if (this.list[o].uri == e) return this.list[o].lock = i, i ? (this.list[o].sTimesample = n || t.getTime(), this.list[o].rTimesample = 0) : this.list[o].rTimesample = s || t.getTime(), !0;
                    return !1
                };
                for (var e = 0; e <= this.options.muDomain; e++) {
                    var i = !0,
                        n = !1,
                        s = 80;
                    this.uri.indexOf("https://") > -1 && (i = !1, s = 443);
                    var o = this.uri.replace(/(https?:)(\/)+/gi, "");
                    o.indexOf(":") > -1 && o.indexOf(":") < o.indexOf("/") && (n = !0, s = parseInt(o.substring(o.indexOf(":") + 1, o.indexOf("/")))), 1 === e && this.changePort && (this.uri = n ? (i ? "http://" : "https://") + o.replace(":" + s, ":" + ++s) : (i ? "http://" : "https://") + o.replace("/", ":" + ++s + "/")), this.connectionPooling.enQueue({
                        uri: this.uri.toString(),
                        lock: !1,
                        sTimesample: 0,
                        rTimesample: 0
                    })
                }
            }
        }, connect: function (e, i) {
            var n, s, o = this.count++;
            this.connType = "login", this.id = this.fix + "_" + o, e[i || "callbackname"] = this.callbackName, this.connectOptions = t.extend(e, {
                ts: t.getTime()
            }), s = (n = this.connectionPooling.getConnect()).url + t.toURI(this.connectOptions), this._cacheElement[this.id] = this._createConnect(s, this.id, o, n)
        }, kalive: function (e, i) {
            var n, s, o = this.count++;
            this.connType = "kalive", this.id = this.fix + "_" + o, e[i || "callbackname"] = this.callbackName, this.kaliveOptions = t.extend(this.kaliveOptions, e, {
                ts: t.getTime()
            }), s = (n = this.connectionPooling.getConnect()).url + t.toURI(this.kaliveOptions), this._cacheElement[this.id] = this._createConnect(s, this.id, o, n)
        }, disconnectServer: function (e, i) {
            var n = this.connectionPooling.getConnect();
            return this.flashGoServer = n.url + t.toURI(!1 === i ? e : t.extend(e, {
                ts: t.getTime()
            })), this.flashGoServer
        }, disconnect: function () {
            t.require(this.flashGoServer, function (e) {
                t(e.error ? e.target : e).remove()
            }), window[this.callbackName] = i
        }, reconnect: function () {
            this.connect(this.connectOptions)
        }, send: function (e, i) {
            var n = this,
                s = this.connectionPooling.getConnect(),
                o = this.mdyServerAddr(s.url) + t.toURI(e);
            return t.require(o + "#rnd", function (e) {
                n.connectionPooling.recover(s.uri, !1), i && i.call(n, e.error), t(e.error ? e.target : e).remove()
            }), !0
        }, mdyServerAddr: function (t) {
            return t.replace(/\/flashgo/i, "/httpgo")
        }, post: function (e, i) {
            var n = this,
                s = this.connectionPooling.getConnect();
            new t.POST(this.mdyServerAddr(s.url), e, function () {
                n.connectionPooling.recover(s.uri, !1), i && i.call(n, !0)
            })
        }, _createConnect: function (e, i, n, s) {
            var o, a, r = this,
                h = document.head || nTalk("head")[0] || document.documentElement;
            return o = t({
                className: i,
                tag: "script",
                type: "text/javascript",
                async: "async",
                src: e,
                charset: "utf-8"
            }).appendTo(h), a = o.get(0).readyState ? "onreadystatechange" : "onload", o.get(0)[a] = o.get(0).onerror = function (e) {
                var n = o.get(0).readyState;
                e = t.Event.fixEvent(e), /^(loaded|complete|undefined)$/.test(n) && (r.connectionPooling.recover(s.uri, !1), "error" !== e.type ? setTimeout(function () {
                    r._connectComplete(e, i), o.remove()
                }, t.browser.msie ? 800 : 50) : (r._connectAbnormal(e, i), o.remove()))
            }, this._connectTimeID[i] = setTimeout(function () {
                o.first().remove(), r._connectTimeout("timeout", i)
            }, 1e3 * +this.options.timeout + 1e4), o.get(0)
        }, _connectCallback: function (e, i) {
            i = Array.prototype.slice.call(i), t("." + e).remove(), this._cacheElement[e] ? (this._stopCallComplete(e, "callback"), this.options.onCallback.apply(self, [!0, i])) : this.options.onCallback.apply(self, [!1, i])
        }, _connectComplete: function (t, e) {
            var i = Array.prototype.slice.call(arguments);
            this._cacheElement[e] && (this._stopCallComplete(e, "complete"), this.options.onComplete.apply(self, [this.connType].concat(i)))
        }, _connectAbnormal: function (t, e) {
            var i = Array.prototype.slice.call(arguments);
            this._cacheElement[e] && (this._stopCallComplete(e, "abnormal"), this.options.onAbnormal.apply(self, [this.connType].concat(i)))
        }, _connectTimeout: function (t, e) {
            var i = Array.prototype.slice.call(arguments);
            this._cacheElement[e] && (this._stopCallComplete(e, "timeout"), this.options.onTimeout.apply(self, [this.connType].concat(i)))
        }, _stopCallComplete: function (e) {
            var n = this._cacheElement[e];
            n ? n.onload = n.onreadystatechange = n.onerror = i : t.Log("stop error id:" + e, 3), delete this._cacheElement[e], clearTimeout(this._connectTimeID[e]), delete this._connectTimeID[e]
        }, _createScriptPCID: function (e) {
            return "guest" + [e ? "TEMP" + t.randomChar(4) : t.randomChar(8), t.randomChar(4), t.randomChar(4), t.randomChar(4), t.randomChar(12)].join("-")
        }
    }, t.mqttws = t.Class.create(), t.mqttws.prototype = {
        name: "public.mqttws",
        version: "2015.04.10",
        connect: null,
        subscriptions: [],
        messages: [],
        connected: !1,
        recCount: 0,
        waitTime: 500,
        _wsKeepaliveId: null,
        _options: {
            url: null,
            siteid: null,
            pcid: null,
            onCallback: null,
            loginMsg: null,
            timeout: 3,
            keepAliveInterval: 90
        },
        initialize: function (e) {
            var i = this;
            this.options = t.extend({}, i._options, e), this.options.pcid = (this.options.siteid + "_" + this.options.pcid.substring(5)).substring(0, 23), t.require({
                mqtt: "mosquitto.js?siteid=" + t.extParmas.siteid
            }, function (e) {
                i.connect = new t.Mosquitto, i.connect.onmessage = function (e, n, s, o) {
                    var a = t.JSON.parseJSON(n);
                    i.options.onCallback.apply(this, [!0, [a.method].concat(a.params)])
                }, i.connect.ondisconnect = function (t) {
                    null !== this._wsKeepaliveId && (clearInterval(this._wsKeepaliveId), this._wsKeepaliveId = null)
                }, i.connect.onconnect = function (t) {
                    0 === t ? (i.connect.subscribe("foo", 0), i.connect.publish("foo", i.options.loginMsg, 0, 0)) : i.reconnect()
                }, i.connect.onreconnect = function () {
                    i.reconnect()
                }, i.connect.connect(i.options.url, i.options.keepAliveInterval, i.options.pcid)
            })
        }, reconnect: function () {
            var t = this;
            ++this.recCount < 3 ? this._waitTime = 500 : this._waitTime = 1e3 * +"034567890".charAt(Math.ceil(5 * Math.random())), setTimeout(function () {
                t.connect.connect(t.options.url, t.options.keepAliveInterval, t.options.pcid)
            }, this._waitTime)
        }, disconnect: function () {
            this.connect.closeFlag = !0, this.connect.disconnect()
        }, kalive: function (t) {
            var e = this;
            this._wsKeepaliveId || (this._wsKeepaliveId = setInterval(function () {
                e.connect.publish("foo", t, 0, !1)
            }, 1e3 * this.options.keepAliveInterval))
        }
    }, t.extend({
        htmlToElement: function (e) {
            var i, n;
            if (t.browser.msie) try {
                (i = new ActiveXObject("MSXml.DOMDocument")).loadXML(e), n = i.childNodes
            } catch (s) {
                (i = document.createElement("DIV")).innerHTML = e, n = i.childNodes
            } else(i = document.createElement("DIV")).innerHTML = e, n = i.childNodes;
            return n
        }, elementToObject: function (e) {
            var i, n, s = {};
            if (n = t.isArray(e) || e.talkVersion ? e[0] : e, s[n.tagName.toLowerCase()] = n.innerHTML || n.text, n.attributes)
                for (var o = 0; o < n.attributes.length; o++)(i = n.attributes[o].name) && (s[i] = n.attributes[o].value);
            else s.msg = n.textContent;
            return s
        }, jsonToxml: function (e) {
            var i, n = this,
                s = "";
            return "object" != typeof e ? e : (t.each(e, function (o, a) {
                if ("string" == typeof a && "text" == o) s = a;
                else if (t.isArray(e)) s += n.jsonToxml(a);
                else {
                    if (s += "<" + o, "object" == typeof a.attributes) {
                        for (var r in a.attributes) a.attributes.hasOwnProperty(r) && (s += " " + r + '="' + a.attributes[r] + '"');
                        delete a.attributes
                    }
                    i = n.jsonToxml(a), s += a && i ? ">" + i + "</" + o + ">" : "></" + o + ">"
                }
            }), s)
        }, utils: {
            options: {},
            handleLinks: function (e, i, n) {
                this.options = t.extend({}, this.options, i), e = e || "";
                var s;
                s = n ? this.linkPatternsP4 : this.linkPatterns;
                for (var o = 0; o < s.length; o++) e = e.replace(s[o][0], s[o][1]);
                return e
            }, linkPatternsP4: [
                [/\[link\s+images=[\'\"]+([^\[\]\'\"]+)[\'\"]+\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, '<img width="324" height="146"  onload="globalChatHandle.scrollHistoryToBottom()" src="$1">'],
                [/\[link\s+submit=[\'\"]+([^\[\]\'\"]+)[\'\"]+\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, '<a class="specil" onclick="NTKF.chatManage.get().send(this.nextSibling.innerHTML, null, this.innerHTML);return false;" href="#">$2</a><span style="display:none;">$1</span>'],
                [/\[link\s+submit=([^\s\[\]\'\"]+)\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, '<a class="specil" onclick="NTKF.chatManage.get().send(this.nextSibling.innerHTML, null, this.innerHTML);return false;" href="#">$2</a><span style="display:none;">$1</span>'],
                [/\[link\](.*?)\[\/link\]/gi, '<a class="specil" onclick="NTKF.chatManage.get().send(this.innerHTML);return false;" >$1</a>'],
                [/<a class="specil" id="submitLink".*?>.*?<\/a>/gi,
                    function (t) {
                        return t.replace(/(http|ftp|https)/gi, "$1_")
                    }
                ],
                [/\[link\s+url=[\'\"]+([^\[\]\'\"]+)[\'\"]+\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, '<a href="$1" target="_blank">$2</a>'],
                [/\[link\s+url=[\'\"]+([^\[\]\'\"]+)[\'\"]+\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, '<a href="$1" target="_blank">$2</a>'],
                [/\[link\s+url=([^\s\[\]\'\"]+)\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, '<a href="$1" target="_blank">$2</a>'],
                [/\[link\s+p4=[\'\"]+([^\[\]\'\"]+)[\'\"]+\s+title=[\'\"]+([^\[\]\'\"]+)[\'\"]+\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, "<a href=\"#\" onclick=\"$client.Activity.openP4('$1','$2');return false;\" >$3</a>"],
                [/\[link\s+p4=([^\s\[\]\'\"]+)\s+title=([^\s\[\]\'\"]+)\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, "<a href=\"#\" onclick=\"$client.Activity.openP4('$1','$2');return false;\" >$3</a>"],
                [/\[link\s+p4=[\'\"]+([^\[\]\'\"]+)[\'\"]+\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, "<a href=\"#\" onclick=\"$client.Activity.openP4('$1','$2');return false;\" >$2</a>"],
                [/\[link\s+p4=([^\s\[\]\'\"]+)\s*[^\[\]]*\]([^\[\]]+)\[\/link\]/gi, "<a href=\"#\" onclick=\"$client.Activity.openP4('$1','$2');return false;\" >$2</a>"],
                [/(^|[^"'=])((http|https|ftp):\/\/([\w-]+\.)+[\w-]+([\w-.\/?=;!*%$]*)?([\w-&=;!*%$]*)?)/gi, '$1<a href="$2" target="_new">$2</a>'],
                [/(http|ftp|https)_/gi, "$1"]
            ],
            linkPatterns: [
                [/\[link\s+reconnect=([^\s\[\]'"]+)\s*[^\[\]]*]([^\[\]]+)\[\/\s*link]/gi, '<a style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;" href="javascript:void(0);" onclick="nTalk.chatManage.get(\'$1\').reconnect(this);return false;" >$2</a>'],
                [/\[link\s+message=([^\s\[\]'"]+)\s*[^\[\]]\s*source=([^\s\[\]'"]+)\s*[^\[\]]*]([^\[\]]+)\[\/\s*link]/gi, '<a style="' + t.STYLE_BODY + "display:inline-block;color:#005ffb;text-decoration:none;font-size:" + (t.browser.mobile ? 14 : 12) + 'px;" href="javascript:void(0);" onclick="nTalk.chatManage.get(\'$1\').switchUI(\'message\', $2);return false;" >$3</a>'],
                [/\[link\s+cancel=([^\s\[\]'"]+)\s+action=([^\s\[\]'"]+)\s*[^\[\]]*]([^\[\]]+)\[\/\s*link]/gi, '<a style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;" href="javascript:void(0);" onclick="nTalk.chatManage.get(\'$1\').cancelUpload(\'$2\');return false;" >$3</a>'],
                [/\[link\s+resend=([^\s\[\]'"]+)\s+msgid=([^\s\[\]'"]+)\s*[^\[\]]*]([^\[\]]+)\[\/\s*link]/gi, '<a style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;" href="javascript:void(0);" onclick="nTalk.chatManage.get(\'$1\').resend(\'$2\', this);return false;" >$3</a>'],
                [/\[link\s*manual=([^\s\[\]'"]+)](.*?)\[\/link]/gi, '<a style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;" href="javascript:void(0);" onclick="nTalk.chatManage.get(\'$1\').switchServerType(true);return false;" >$2</a>'],
                [/\[link\s*artificial=([^\s\[\]'"]+)](.*?)\[\/link]/gi, '<a style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;" href="javascript:void(0);" onclick="nTalk.chatManage.get(\'$1\').switchServerType(true);return false;" >$2</a>'],
                [/\[link\s*robot](.*?)\[\/link]/gi, '<a style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;" href="javascript:void(0);" onclick="nTalk.chatManage.get().switchServerType(false, 2);return false;" >$1</a>'],
                [/\[link\s*robotindex=([^\s\[\]'"]+)\s*\](.*?)\[\/link]/gi, '<a style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;" href="javascript:void(0);" onclick="nTalk.chatManage.get(\'{$settingid}\').send(\'$1\');return false;">$2</a>'],
                [/\[link\s*rightTag=true\s*url="(.*?)"\s*close=(.*?)\s*title="(.*?)"\s*\](.*?)\[\/link\]/gi, '<span style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;cursor:pointer;" rightTag="true" src="$1" closeBtn="$2" title="$3">$4</span>'],
                [/\[xnlink](.*?)\[\/xnlink]/gi, '<span class="robotQuestion" style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;cursor:pointer;" href="javascript:void(0);" >$1</span>'],
                [/\[xnflowlink\s*flowid=\"([0-9]+)\"\s](.*?)\[\/xnflowlink]/gi, '<span class="robotQuestion" data-flowid="$1" style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;cursor:pointer;" href="javascript:void(0);" >$2</span>'],
                [/\[link\s*href=(.*?)](.*?)\[\/link]/gi, '<a style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;cursor:pointer;" href="$1">$2</a>'],
                [/\[link\s*(.*?)?](.*?)\[\/link]/gi, '<a style="' + t.STYLE_BODY + 'display:inline-block;color:#005ffb;text-decoration:none;cursor:pointer;" href="javascript:void(0);"' + (t.browser.iOS ? ' href="$1" target="_blank"' : " onclick=\"window.open('$1')\"") + ">$2</a>"],
                [/\{\$(\w+)}/gi,
                    function (e, i) {
                        return t.utils.options[i] || ""
                    }
                ]
            ]
        }, toHSL: function (e) {
            return t.isHex(e) ? t.rgb2HSL(t.hex2RGB(e)) : t.isRGB(e) ? t.rgb2HSL(e) : e
        }, isHex: function (t) {
            return "string" == typeof t && /^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi.test(t)
        }, isRGB: function (e) {
            return t.isObject(e) && t.isDefined(e.r) && t.isDefined(e.g) && t.isDefined(e.b)
        }, isHSL: function (e) {
            return t.isObject(e) && t.isDefined(e.h) && t.isDefined(e.s) && t.isDefined(e.l)
        }, hex2RGB: function (t) {
            var e = t.toString().replace("#", ""),
                i = e.split("");
            return 3 == e.length ? {
                r: parseInt(i[0] + i[0], 16),
                g: parseInt(i[1] + i[1], 16),
                b: parseInt(i[2] + i[2], 16)
            } : 6 == e.length ? {
                r: parseInt(i[0] + i[1], 16),
                g: parseInt(i[2] + i[3], 16),
                b: parseInt(i[4] + i[5], 16)
            } : {
                r: 0,
                g: 0,
                b: 0
            }
        }, rgb2HSL: function (t) {
            var e, i, n, s, o, a, r, h, l, c = {};
            return e = t.r / 255, i = t.g / 255, n = t.b / 255, r = Math.min(e, i, n), h = Math.max(e, i, n), l = h - r, c.l = (h + r) / 2, 0 === l ? (c.h = 0, c.s = 0) : (c.l < .5 ? c.s = l / (h + r) : c.s = l / (2 - h - r), s = ((h - e) / 6 + l / 2) / l, o = ((h - i) / 6 + l / 2) / l, a = ((h - n) / 6 + l / 2) / l, e == h ? c.h = a - o : i == h ? c.h = 1 / 3 - a + s : n == h && (c.h = 2 / 3 - s + o), c.h < 0 && (c.h += 1), c.h > 1 && (c.h -= 1)), c
        }
    }), t.fn.extend({
        animate: function (e, i, n) {
            return t.each(this, function (s, o) {
                t.animate(o, e, i, n)
            })
        }, show: function (e, i) {
            return t.isFunction(e) && (i = e, e = 500), this.animate({
                visibility: "visible",
                opacity: {
                    from: 0,
                    to: 1
                }
            }, e || 500, i)
        }, hide: function (e, i) {
            return t.isFunction(e) && (i = e, e = 500), this.animate({
                opacity: {
                    to: 0
                }
            }, e || 500, i)
        }, gradient: function (e, i, n) {
            var s, o;
            return e ? t.each(this, function (a, r) {
                if (t.browser.oldmsie && (s = /top|bottom/.test(e) ? 0 : 1, /right|bottom/.test(e) && (o = i, i = n, n = o)), t.browser.webkit) {
                    switch (e) {
                    case "top":
                        s = "0% 100%,0% 0%";
                        break;
                    case "right":
                        s = "0% 0%,100% 0%";
                        break;
                    case "bottom":
                        s = "0% 0%,0% 100%";
                        break;
                    case "left":
                        s = "100% 0%,0% 0%"
                    }
                    t(r).css("background-image", e ? "-webkit-gradient(linear," + s + ",color-stop(1, " + i + "),color-stop(0, " + n + "))" : "none")
                } else if (t.browser.gecko) t(r).css("background-image", e ? "-moz-linear-gradient(" + e + ", " + i + ", " + n + ")" : "none");
                else if (t.browser.oldmsie) {
                    r.style.filter = r.currentStyle.filter.replace(/progid:DXImageTransform\.Microsoft\.gradient\((.*?)\)\s*/gi, "") + (e ? " progid:DXImageTransform.Microsoft.gradient(GradientType=" + s + ",startColorstr='" + i + "', endColorstr='" + n + "')" : "")
                } else t.browser.msie ? t(r).css("background-image", e ? "-ms-linear-gradient(" + e + ", " + i + ", " + n + ")" : "none") : t(r).css("background-image", e ? "linear-gradient(" + e + ", " + i + ", " + n + ")" : "none")
            }) : t.each(this, function (e, i) {
                t.browser.oldmsie ? t(i).css("filter", "none") : t(i).css("background-image", "none")
            })
        }
    }), t.extend({
        base64: {
            _strKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (e) {
                var i, n, s, o, a, r, h, l = t.base64,
                    c = "",
                    d = 0;
                for (e = l._utf8_encode(e || ""); d < e.length;) o = (i = e.charCodeAt(d++)) >> 2, a = (3 & i) << 4 | (n = e.charCodeAt(d++)) >> 4, r = (15 & n) << 2 | (s = e.charCodeAt(d++)) >> 6, h = 63 & s, isNaN(n) ? r = h = 64 : isNaN(s) && (h = 64), c = c + l._strKey.charAt(o) + l._strKey.charAt(a) + l._strKey.charAt(r) + l._strKey.charAt(h);
                return c
            }, decode: function (e) {
                var i, n, s, o, a, r, h = t.base64,
                    l = "",
                    c = 0;
                for (e = (e || "").replace(/[^A-Za-z0-9\+\/=]/g, ""); c < e.length;) i = h._strKey.indexOf(e.charAt(c++)) << 2 | (o = h._strKey.indexOf(e.charAt(c++))) >> 4, n = (15 & o) << 4 | (a = h._strKey.indexOf(e.charAt(c++))) >> 2, s = (3 & a) << 6 | (r = h._strKey.indexOf(e.charAt(c++))), l += String.fromCharCode(i), 64 != a && (l += String.fromCharCode(n)), 64 != r && (l += String.fromCharCode(s));
                return l = h._utf8_decode(l)
            }, _utf8_encode: function (t) {
                t = t.replace(/\r\n/g, "\n");
                for (var e = "", i = 0; i < t.length; i++) {
                    var n = t.charCodeAt(i);
                    n < 128 ? e += String.fromCharCode(n) : n > 127 && n < 2048 ? (e += String.fromCharCode(n >> 6 | 192), e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224), e += String.fromCharCode(n >> 6 & 63 | 128), e += String.fromCharCode(63 & n | 128))
                }
                return e
            }, _utf8_decode: function (t) {
                for (var e, i, n, s = "", o = 0; o < t.length;)(e = t.charCodeAt(o)) < 128 ? (s += String.fromCharCode(e), o++) : e > 191 && e < 224 ? (i = t.charCodeAt(o + 1), s += String.fromCharCode((31 & e) << 6 | 63 & i), o += 2) : (i = t.charCodeAt(o + 1), n = t.charCodeAt(o + 2), s += String.fromCharCode((15 & e) << 12 | (63 & i) << 6 | 63 & n), o += 3);
                return s
            }
        },
        FORM: {
            createInput: function (e, i, n) {
                for (var s, o, a, r, h = [], l = t.browser.mobile, c = t.extend({
                    id: "",
                    rowspan: 0,
                    style: ""
                }, i), d = '<span class="ntkf-text-red" style="' + t.STYLE_BODY + 'padding:2px 5px 2px 0;color:#f00;">' + (n || "") + "</span>", u = 0; u < e.length; u++) {
                    switch (s = t.extend({
                        titlewidth: "80px",
                        inputwidth: "auto",
                        input: {
                            width: "90%",
                            height: "auto"
                        }
                    }, e[u]), r = l ? s.title : s.title + (s.title.length == t.enLength(s.title) ? ":" : "："), /zh_cn|zh_tw/.test(t.lang.language) && t.enLength(s.title) > 16 || s.multipart || /radio|checkbox/.test(s.type) && s.options.length > 2 ? (s.multipart = !0, h.push(l ? '<tr style="' + t.STYLE_BODY + '"><td style="' + t.STYLE_BODY + 'width:100%;"><div class="nt-mobile-form-title" style="' + t.STYLE_BODY + 'width:100%; line-height:14px; font-size:14px; font-weight:bold; text-align:center; color:#333333; margin: 15px 0px 20px 0px">' + r + "</div>" : ['<tr style="', t.STYLE_BODY, '">', '<td style="', t.STYLE_BODY, 'vertical-align:top;line-height:28px;color:#333;" colspan="2">', '<div style="', t.STYLE_BODY, 'margin:5px 10px 5px 10px;color:#5a5a5a;">', r, !0 === s.required ? d : "", "</div>", "</td>", "</tr>", '<tr style="' + t.STYLE_BODY + '"><td style="', t.STYLE_BODY, 'padding:0 5px 0 0;text-align:right;vertical-align:top;line-height:28px;color:#333;"></td>', '<td style="' + t.STYLE_BODY + "line-height:28px;width:" + s.inputwidth + ';">'].join(""))) : h.push('<tr style="' + t.STYLE_BODY + '">' + (l ? "" : '<td style="' + t.STYLE_BODY + "padding:0 5px 0 0;text-align:right;vertical-align:top;line-height:28px;color:#333;width:" + s.titlewidth + ';"><div style="' + t.STYLE_BODY + 'margin:4px 0 0 0;text-align:right;color:#5a5a5a;">' + (!0 === s.required ? d : "") + r + "</div></td>") + '<td style="' + t.STYLE_BODY + "line-height:28px;width:" + (l ? "100%" : s.inputwidth) + ';">'), s.type) {
                    case "select":
                        h.push('<select data-index="' + u + '" name="' + s.name + '" style="' + t.STYLE_BODY + "border:1px solid #ccc;height:24px;color:#333;margin:0 0 4px;line-height:20px;width:" + (l ? "99%" : s.input.width) + ';">'), h.push('<option value="" style="' + t.STYLE_BODY + 'color:#ccc;">' + s.defaultText + "</option>");
                        for (var p = 0; p < s.options.length; p++) o = "string" == typeof (o = s.options[p]) ? {
                            text: o,
                            value: o
                        } : o, h.push('<option value="' + o.value + '" style="' + t.STYLE_BODY + 'color:#333;">' + o.text + "</option>");
                        h.push("</select>");
                        break;
                    case "radio":
                        h.push('<ul style="' + t.STYLE_BODY + 'list-style:none;">');
                        for (var m, g = 0; g < s.options.length; g++) o = "string" == typeof (o = s.options[g]) ? {
                            text: o,
                            value: o
                        } : o, m = s.name + "_" + g, a = s.defaultText == o.value ? " checked" : "", h.push('<li class="form-item" style="' + t.STYLE_BODY + 'list-style:none;padding:0 2px 0 0;color:#000;float:left;"><input type="radio" name="' + s.name + '"id="' + m + '" value="' + o.value + '" _custom_text="' + o.text + '" style="' + t.STYLE_BODY + 'color:#333;outline:none;-webkit-appearance:radio"' + a + ' /><label for="' + m + '" style="' + t.STYLE_BODY + 'display:inline;color:#000;">' + o.text + "</label></li>");
                        h.push('<li style="' + t.STYLE_BODY + 'list-style:none;clear:both;width:0;height:0;"></li>'), h.push("</ul>");
                        break;
                    case "checkbox":
                        h.push('<ul style="' + t.STYLE_BODY + 'list-style:none;">');
                        for (var f, v = 0; v < s.options.length; v++) o = "string" == typeof (o = s.options[v]) ? {
                            text: o,
                            value: o
                        } : o, f = s.name + "_" + v, a = s.defaultText == o.value ? " checked" : "", h.push('<li class="form-item" style="' + t.STYLE_BODY + 'list-style:none;padding:0 2px 0 0;float:left;"><input type="checkbox" name="' + s.name + '" id="' + f + '" value="' + o.value + '" _custom_text="' + o.text + '" style="' + t.STYLE_BODY + 'color:#333;"' + a + ' /><label for="' + f + '" style="' + t.STYLE_BODY + 'display:inline;color:#000;">' + o.text + "</label></li>");
                        h.push('<li style="' + t.STYLE_BODY + 'list-style:none;clear:both;width:0;height:0;"></li>'), h.push("</ul>");
                        break;
                    case "textarea":
                        h.push('<textarea data-index="' + u + '" name="' + s.name + '" style="' + t.STYLE_BODY + "border:1px solid #ccc;color:#ccc;width:" + (l ? "99%" : s.input.width) + ";height:" + s.input.height + ';"' + (t.browser.html5 ? ' placeholder="' + s.defaultText + '">' : ">" + s.defaultText) + "</textarea>");
                        break;
                    default:
                        h.push('<input data-index="' + u + '" type="text" name="' + s.name + '"' + (t.browser.html5 ? ' placeholder="' + s.defaultText + '" value=""' : ' value="' + s.defaultText + '"') + ' maxlength="32" style="' + t.STYLE_BODY + "border:1px solid #ccc;height:24px;width:" + (l ? "99%" : s.input.width) + ';margin:0 0 4px;color:#ccc;"'), "phone" == s.verification && h.push(" onblur=\"this.value=this.value.replace(/[^0-9-]+/, '');\" onkeyup=\"var keyCode=(event || window.event).keyCode; if( !/16|17|35|36|37|38|39|40/i.test(keyCode) ){this.value=this.value.replace(/[^0-9-]+/, '');}\""), h.push(" />")
                    }
                    s.messageid && (h.push('<div style="' + t.STYLE_BODY + 'display:none;color:#EF7208;" class="form-info ' + s.messageid + '">'), h.push('<div style="' + t.STYLE_BODY + "margin:2px;width:15px;height:15px;float:left;background:transparent url(" + t.sourceURI + '/images/chaticon.png) no-repeat -160px -39px;"></div>'), h.push('<div style="' + t.STYLE_BODY + 'color:#EF7208;float:left;" class="chat-view-info"></div>'), h.push('<div style="' + t.STYLE_BODY + 'clear:both;width:0;height:0;"></div>'), h.push("</div>")), h.push("</td>"), c.style && 0 === u && h.push('<td style="' + t.STYLE_BODY + c.style + '" id="' + c.id + '" rowspan="' + c.rowspan + '"></td></tr>')
                }
                return h.join("")
            }, bindFormEvent: function (e, i) {
                var n = function () {
                        var i = t(this).css({
                                color: "#333",
                                "border-color": t.browser.mobile ? "#0079fe" : "#666"
                            }),
                            n = i.attr("data-index") || 0;
                        e[n].defaultText == i.val() && i.val("")
                    },
                    s = function () {
                        var i = t(this).css("border-color", "#ccc"),
                            n = i.attr("data-index") || 0,
                            s = e[n].defaultText;
                        "" === i.val() && i.val(s), "" !== i.val() && i.val() != s || i.css("color", "#ccc")
                    };
                t(i).find("input[type=text]").bind("focus", n).bind("blur", s), t(i).find("textarea").bind("focus", n).bind("blur", s)
            }, verificationForm: function (e, i, n, s) {
                for (var o, a, r, h, l, c = [], d = !1, u = new RegExp("\\d{6,}", "i"), p = new RegExp("^[a-zA-Z0-9\\._-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$", "i"), m = this, g = 0; g < e.length; g++) {
                    switch (e[g].type) {
                    case "checkbox":
                        l = [], o = t(n).find("input[name=" + e[g].name + "]"), a = t(n).find("input[name=" + e[g].name + "][checked]");
                        for (var f = 0; f < a.length; f++) l.push({
                            value: a.get(f).value,
                            text: t(a.get(f)).attr("_custom_text")
                        });
                        break;
                    case "radio":
                        l = {
                            value: "",
                            text: ""
                        }, o = t(n).find("input[name=" + e[g].name + "]"), t(n).find("input[name=" + e[g].name + "][checked]").each(function (e, i) {
                            i.checked && (l = {
                                value: t(i).val() || "",
                                text: t(i).attr("_custom_text")
                            })
                        });
                        break;
                    case "select":
                        o = t(n).find("select[name=" + e[g].name + "]"), l = t("option[selected]", o).val() || "", l = e[g].defaultText && l == e[g].defaultText ? "" : l;
                        break;
                    case "textarea":
                        o = t(n).find("textarea[name=" + e[g].name + "]"), e[g].defaultText && e[g].defaultText == o.val() ? (l = "", o.val("")) : l = o.val().replace(/(\")|(\')|((^\s*)|(\s*$))/g, "");
                        break;
                    default:
                        o = t(n).find("input[name=" + e[g].name + "]"), e[g].defaultText && e[g].defaultText == o.val() ? (l = "", o.val("")) : l = o.val().replace(/(^\s*)|(\s*$)/g, "")
                    }
                    r = "string" == typeof l ? "" === l || !l.length : t.isArray(l) ? 0 === l.length : "" === l.value, h = !(!e[g].messageid || !e[g].message);
                    var v = t(n).find("." + e[g].messageid),
                        w = t(n).find("." + e[g].messageid + " .chat-view-info");
                    e[g].required && r ? (m.showError(h, e[g].message[0], w, v, o, e[g].type), d = !0) : ("phone" != e[g].verification || r || u.test(l)) && ("email" != e[g].verification || r || p.test(l)) ? e[g].min && !r && t.enLength(l) < e[g].min ? (m.showError(h, e[g].message[1], w, v, o), d = !0) : e[g].max && !r && t.enLength(l) > e[g].max ? (m.showError(h, e[g].message[2], w, v, o), d = !0) : (h ? v.hide(function () {
                        t(this).display()
                    }) : /radio|checkbox/.test(e[g].type) ? o.parent().css("color", "#333") : o.css("border-color", "#DBD8D1"), r || c.push({
                        name: e[g].name,
                        title: e[g].title,
                        value: l
                    })) : (m.showError(h, e[g].message[1], w, v, o), d = !0)
                }
                d ? "function" == typeof s && s() : (t.Log("form submit complete, failCallback is null", 3), "function" == typeof i ? i(c) : t.Log("form submit complete, callback is null", 3))
            }, showError: function (e, i, n, s, o, a) {
                var r = this;
                if (e && i)
                    if (t.browser.mobile) {
                        this.messageErrorToast && (this.messageErrorToast.remove(), this.messageErrorToast = null, this.messageErrorTimeout && clearTimeout(this.messageErrorTimeout));
                        var h = i.length > 10 ? 300 : 250;
                        this.messageErrorToast = new t.Toast('<div id="#message_error" style="position: relative;width: ' + (h - 50) + 'px; height:30px; line-height: 30px;z-index:100; color: #FFF; top: 30px; left: 25px; text-align:center;font-weight:bold">' + i + "</div>", {
                            width: h,
                            height: 90
                        }), this.messageErrorTimeout = setTimeout(function () {
                            r.messageErrorToast.remove(), r.messageErrorToast = null, o.get(0).focus()
                        }, 2e3)
                    } else n.html(i), s.display(1).show(), o.get(0).focus();
                else /radio|checkbox/.test(a) ? o.parent().css("color", "#f00") : o.css("border-color", "#f00").get(0).focus()
            }
        }
    }), t.Transfer = t.Class.create(), t.Transfer.prototype = {
        name: "Transfer",
        button: null,
        element: null,
        form: null,
        iframe: null,
        proxy: null,
        options: null,
        debug: !0,
        fkey: "",
        initialize: function (e, n) {
            this.button = n;
            var s = t.randomChar(16);
            if (this.options = t.extend({
                onError: i,
                onChange: i,
                callback: i,
                name: s,
                curName: "",
                compSize: 512e3,
                params: {},
                target: "iframe-transfer-" + s
            }, e), this.options.server) {
                this.proxy = t({
                    tag: "IFRAME",
                    name: "proxy-" + s,
                    src: this.options.server.substring(0, this.options.server.lastIndexOf("/")) + "/proxy.html?t=" + t.getTime(),
                    style: t.STYLE_NBODY + "width:0px;height:0px;display:none;"
                }).appendTo(t(this.button)).get(0).contentWindow;
                var o = this,
                    a = Math.max(20, this.button.width(), parseFloat(this.button.css("width"))),
                    r = Math.max(20, this.button.height(), parseFloat(this.button.css("height"))),
                    h = t.STYLE_BODY + "width:" + a + "px;height:" + r + "px;overflow:hidden;";
                this.completed = function (t) {
                    var e = this.readyState;
                    /^(?:loaded|complete|undefined)$/.test(e) && (o.iframe.removeEvent("readystatechange", o.completed).removeEvent("load", o.completed), o.transferComplete(t, o.fkey))
                }, this.form = t({
                    tag: "FORM",
                    action: "",
                    method: "POST",
                    target: this.options.target,
                    enctype: "multipart/form-data",
                    style: h
                }).appendTo(this.button, !0), this.iframe = t({
                    tag: "IFRAME",
                    name: this.options.target,
                    src: "about:blank",
                    style: h + "width:0;height:0;display:none;"
                }).appendTo(this.button, !0), this.element = t({
                    tag: "INPUT",
                    type: "file",
                    name: this.options.name,
                    accept: this.options.accept || "*",
                    style: h,
                    title: this.button.attr("title") || ""
                }).appendTo(this.form, !0).css("opacity", 0), this.element.click(function () {
                    "" !== this.value && o.form.get(0).reset(), o.iframe.bind("readystatechange", o.completed).bind("load", o.completed), o.fkey = t.randomChar(16)
                }).bind("change", function (t) {
                    var e = {};
                    this.files ? (e.name = this.files[0].name, e.size = this.files[0].size) : (e.name = this.value.substring(this.value.lastIndexOf("\\") + 1), e.size = ""), e.name && (o.options.onChange(e), o.fileChange(t, this.files || this.value))
                })
            } else t.Log("server is null", 3)
        }, transferComplete: function (e, i) {
            var n = this;
            i && (this.debug && t.Log("$.upload.transferComplete(event, " + i + ")"), t.jsonp(this.options.server + "?" + t.toURI(t.extend({
                getaction: 1,
                fkey: i
            }, this.options.params)) + "#rnd", function (e) {
                n.debug && t.Log("get transfer file info:" + t.JSON.toJSONString(e), 1), e.name = n.options.curName || n.options.name || "", n.options.callback(e)
            }))
        }, fileChange: function (e, i) {
            var n = this;
            this.isMobileCompTransf(i, function (s) {
                s ? t.browser.oldAndroid ? t.require("jpeg_encoder_basic.js?siteid=" + n.options.params.siteid, function (t) {
                    n.mobileCompTransf(e, i)
                }) : t.browser.oldIOS ? t.require("megapix-image.js?siteid=" + n.options.params.siteid, function (t) {
                    n.mobileCompTransf(e, i)
                }) : n.mobileCompTransf(e, i) : n.commonTransf(e, i)
            })
        }, isMobileCompTransf: function (e, i) {
            if (t.browser.mobile && (window.URL || window.webkitURL) && document.createElement("canvas"))
                if (e[0].name.toLowerCase().indexOf("jpg") > -1) i(!0);
                else if (window.FileReader && window.DataView) {
                var n = new FileReader;
                n.onload = function (t) {
                    var e = new DataView(t.target.result);
                    i(255 == e.getUint8(0) && 216 == e.getUint8(1) ? !0 : !1)
                }, n.readAsArrayBuffer(e[0])
            } else i(!1);
            else i(!1)
        }, commonTransf: function (e, i) {
            var n, s, o = "uploadfile" == this.options.params.action;
            try {
                n = o ? this.proxy.fileOptions.fileMaxSize : this.proxy.fileOptions.imageMaxSize, s = o ? this.proxy.fileOptions.fileExt : this.proxy.fileOptions.imageExt
            } catch (l) {
                n = null, s = null
            }
            if ("string" == typeof i) this.debug && t.Log("Name: " + i, 2);
            else
                for (var a = 0; a < i.length; a++) {
                    var r, h = i[a];
                    if (r = h.name.indexOf(".") > -1 ? h.name.match(/\.[^\.]+$/)[0].replace(".", "").toLowerCase() : "", this.options.maxSize && h.size > this.options.maxSize || n && h.size > n) return void this.options.onError({
                        type: 9,
                        name: h.name,
                        size: h.size,
                        etype: "SIZE",
                        maxSize: this.options.maxSize || n
                    });
                    if ("*" != this.options.accept && this.options.accept || s) {
                        if (this.options.accept && this.options.accept.indexOf("/*") > -1) {
                            if (!new RegExp(this.options.accept.replace(/\//, "\\/"), "gi").test(h.type)) return t.Log("accept:" + this.options.accept + ", type:" + h.type, 2), void this.options.onError({
                                type: 9,
                                name: h.name,
                                size: h.size,
                                etype: "TYPE"
                            })
                        } else {
                            if (this.options.accept && this.options.accept.indexOf(h.type) <= -1) return t.Log("accept:" + this.options.accept + ", type:" + h.type, 2), void this.options.onError({
                                type: 9,
                                name: h.name,
                                size: h.size,
                                etype: "TYPE"
                            });
                            if (s && s.indexOf(r) > -1) continue;
                            if (s && -1 == s.indexOf(r)) return void this.options.onError({
                                type: 9,
                                name: h.name,
                                size: h.size,
                                ext: s,
                                etype: "TYPE"
                            })
                        }
                        this.options.curName = h.name, this.debug && t.Log("Name: " + this.options.curName)
                    }
                }
            this.debug && t.Log("$.upload.fileChange()"), this.form.attr("action", this.options.server + "?" + t.toURI(t.extend({
                fkey: this.fkey,
                rnd: t.getTime()
            }, this.options.params))), t.browser.mobile && this.options.callback({
                status: "startUpload",
                oldfile: i[0].name
            }), this.form.get(0).submit()
        }, mobileCompTransf: function (e, i) {
            var n = this;
            this.options.callback({
                status: "startCompress",
                oldfile: i[0].name
            }), this.fkey = t.getTime();
            new t.ImageOrientation(i[0], function (e, s) {
                new t.CompressImg(i[0], {
                    orientation: s
                }, function (e, s) {
                    new t.POST(n.options.server + "?action=uploadimage", t.extend({
                        base64: s,
                        fname: t.getTime() + ".png",
                        fkey: n.fkey,
                        rnd: t.getTime()
                    }, n.options.params), function (t) {
                        n.transferComplete(t, n.fkey)
                    }), n.options.callback({
                        status: "startUpload",
                        oldfile: i[0].name,
                        compress: !0
                    })
                })
            })
        }, base64Transf: function (e) {
            var i = this;
            this.fkey = t.getTime(), new t.POST(this.options.server + "?action=uploadimage", t.extend({
                base64: e,
                fname: t.getTime() + ".png",
                fkey: this.fkey,
                rnd: t.getTime()
            }, this.options.params), function (t) {
                i.transferComplete(t, i.fkey)
            })
        }
    }, t.CompressImg = t.Class.create(), t.CompressImg.prototype = {
        ctx: null,
        canvas: null,
        url: null,
        image: null,
        blob: null,
        compBlob: null,
        dataurl: null,
        resize: {
            width: null,
            height: null
        },
        options: {
            width: null,
            height: null,
            quality: .7
        },
        initialize: function (e, i, n) {
            var s = this;
            this.url = window.URL || window.webkitURL, this.canvas = document.createElement("canvas"), this.blob = "string" == typeof e ? e : this.url.createObjectURL(e), this.options = t.extend(i, this.options), this.image = new Image, this.image.onerror = function () {
                t.Log("加载图片失败！")
            }, this.image.onload = function (e) {
                s.getCompImage(), n(e, s.dataurl);
                var i = t.browser.oldIOS ? 1e4 : 0;
                setTimeout(function () {
                    for (var t in s) s.hasOwnProperty(t) && (s[t] = null)
                }, i)
            }, this.image.crossOrigin = "*", this.image.src = s.blob
        }, drawOldIOSCanvas: function () {
            var t = new MegaPixImage(this.image);
            "5678".indexOf(this.options.orientation) > -1 ? t.render(this.canvas, {
                width: this.canvas.height,
                height: this.canvas.width,
                orientation: this.options.orientation
            }) : t.render(this.canvas, {
                width: this.canvas.width,
                height: this.canvas.height,
                orientation: this.options.orientation
            })
        }, drawCanvas: function () {
            switch (this.options.orientation) {
            case 3:
                this.ctx.rotate(180 * Math.PI / 180), this.ctx.drawImage(this.image, -this.resize.width, -this.resize.height, this.resize.width, this.resize.height);
                break;
            case 6:
                this.ctx.rotate(90 * Math.PI / 180), this.ctx.drawImage(this.image, 0, -this.resize.width, this.resize.height, this.resize.width);
                break;
            case 8:
                this.ctx.rotate(270 * Math.PI / 180), this.ctx.drawImage(this.image, -this.resize.height, 0, this.resize.height, this.resize.width);
                break;
            case 2:
                this.ctx.translate(resize.width, 0), this.ctx.scale(-1, 1), this.ctx.drawImage(this.image, 0, 0, this.resize.width, this.resize.height);
                break;
            case 4:
                this.ctx.translate(resize.width, 0), this.ctx.scale(-1, 1), this.ctx.rotate(180 * Math.PI / 180), this.ctx.drawImage(this.image, -this.resize.width, -this.resize.height, this.resize.width, this.resize.height);
                break;
            case 5:
                this.ctx.translate(resize.width, 0), this.ctx.scale(-1, 1), this.ctx.rotate(90 * Math.PI / 180), this.ctx.drawImage(this.image, 0, -this.resize.width, this.resize.height, this.resize.width);
                break;
            case 7:
                this.ctx.translate(resize.width, 0), this.ctx.scale(-1, 1), this.ctx.rotate(270 * Math.PI / 180), this.ctx.drawImage(this.image, -this.resize.height, 0, this.resize.height, this.resize.width);
                break;
            default:
                this.ctx.drawImage(this.image, 0, 0, this.resize.width, this.resize.height)
            }
        }, getCompImage: function () {
            var e = this;
            if (this.ctx = this.canvas.getContext("2d"), this.resize = this._getResize(), this.canvas.width = this.resize.width, this.canvas.height = this.resize.height, this.ctx.fillStyle = "#fff", this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height), t.browser.oldIOS ? this.drawOldIOSCanvas() : this.drawCanvas(), t.browser.oldAndroid) {
                var i = new JPEGEncoder,
                    n = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                this.dataurl = i.encode(n, 100 * this.options.quality)
            } else this.dataurl = this.canvas.toDataURL("image/jpeg", this.options.quality);
            this.url.revokeObjectURL(e.blob)
        }, _getResize: function () {
            var t = this,
                e = this.image,
                i = this.options.width,
                n = this.options.height,
                s = {
                    width: e.width,
                    height: e.height
                };
            "5678".indexOf(t.options.orientation) > -1 && (s.width = e.height, s.height = e.width);
            var o = s.width / s.height;
            for (i && n ? o >= i / n ? s.width > i && (s.width = i, s.height = Math.ceil(i / o)) : s.height > n && (s.height = n, s.width = Math.ceil(n * o)) : i ? i < s.width && (s.width = i, s.height = Math.ceil(i / o)) : n && n < s.height && (s.width = Math.ceil(n * o), s.height = n); s.width >= 3264 || s.height >= 2448;) s.width *= .8, s.height *= .8;
            return s
        }
    }, t.ImageOrientation = t.Class.create(), t.ImageOrientation.prototype = {
        initialize: function (e, i) {
            if (!window.FileReader || !window.DataView) return 1;
            var n = this,
                s = new FileReader;
            s.onload = function (e) {
                i(t.Event.fixEvent(e), n._readImageOrientation(e.target.result))
            }, s.readAsArrayBuffer(e)
        }, _readImageOrientation: function (t) {
            var e = new DataView(t);
            if (255 != e.getUint8(0) || 216 != e.getUint8(1)) return 1;
            for (var i = 2, n = t.byteLength; i < n;) {
                if (255 != e.getUint8(i)) return 1;
                if (225 == e.getUint8(i + 1)) return this._getOrientationFromExif(e, i + 4, e.getUint16(i + 2) - 2);
                i += 2 + e.getUint16(i + 2)
            }
        }, _getOrientationFromExif: function (t, e) {
            if ("Exif" != this._getStringFromDB(t, e, 4)) return 1;
            var i, n = e + 6;
            if (18761 == t.getUint16(n)) i = !1;
            else {
                if (19789 != t.getUint16(n)) return 1;
                i = !0
            } if (42 != t.getUint16(n + 2, !i)) return 1;
            var s = t.getUint32(n + 4, !i);
            return s < 8 ? 1 : this._getOrientationFromTag(t, n, n + s, i)
        }, _getOrientationFromTag: function (t, e, i, n) {
            var s, o, a = t.getUint16(i, !n);
            for (o = 0; o < a; o++)
                if (s = i + 12 * o + 2, 274 == t.getUint16(s, !n)) return this._getOrientationValue(t, s, e, i, n);
            return 1
        }, _getOrientationValue: function (t, e, i, n, s) {
            var o, a, r, h = t.getUint16(e + 2, !s),
                l = t.getUint32(e + 4, !s),
                c = t.getUint32(e + 8, !s) + i;
            switch (h) {
            case 3:
                if (1 == l) return t.getUint16(e + 8, !s);
                for (o = l > 2 ? c : e + 8, a = [], r = 0; r < l; r++) a[r] = t.getUint16(o + 2 * r, !s);
                return a
            }
        }, _getStringFromDB: function (t, e, i) {
            var s = "";
            for (n = e; n < e + i; n++) s += String.fromCharCode(t.getUint8(n));
            return s
        }
    }, t.DialogChat = new t.Class.create, t.DialogChat.prototype = {
        contains: null,
        background: null,
        iframe: null,
        display: !1,
        selector: "",
        def: {
            close: !1,
            parent: window,
            margin: 10,
            border: 0,
            style: {
                height: "auto"
            },
            resizeFunc: null
        },
        options: null,
        _funcResize: i,
        initialize: function (e, i) {
            var n = this;
            this.options = t.extend({}, this.def, i), this.id = t.randomChar(), this.selector = ".dialog-container-" + this.id, this._create(), this._style(this.options.style), this.display = !0, this.options.close && (e += '<div class="dialog-button-close" style="' + t.STYLE_NBODY + 'font-size:14px;position:absolute;right:10px;top:10px;width:20px;height:20px;line-height:20px;text-align:center;cursor:pointer;">x</div>'), this.container.html(e), setTimeout(function () {
                n.options.top ? n.container.css({
                    top: n.options.top + "px"
                }) : n.container.css({
                    top: Math.max(0, (t(n.options.parent).height() - Math.max(n.container.height(), 200)) / 2) + "px"
                })
            }, 5), this._funcResize = function () {
                n.resize()
            }, this.options.parent == window && t(window).addEvent("resize", this._funcResize), this.container.find(".dialog-button-close").click(function () {
                n.close()
            })
        }, close: function () {
            var e = this;
            this.options.parent == window && t(window).removeEvent("resize", this._funcResize), t(this.selector).hide(function () {
                t(".dialog-iframe-" + e.id + ",.dialog-background-" + e.id).remove(), t(e.selector).remove(), e.display = !1
            })
        }, resize: function (e, i) {
            e = e || t(this.options.parent).width(), i = i || t(this.options.parent).height(), t(".dialog-iframe-" + this.id + ",.dialog-background-" + this.id).css({
                width: e + "px",
                height: i + "px"
            });
            var n = "auto" === this.options.style.height ? "auto" : i - 2 * this.options.margin - 2 * this.options.border;
            this.container.css({
                width: e - 2 * this.options.margin - 2 * this.options.border + "px",
                height: "auto" == n ? "auto" : n + "px",
                "max-width": e + "px",
                "max-height": i - 40 + "px"
            }), this.container.css("top", Math.max(0, (i - Math.max("auto" == n ? this.container.height() : n, 200)) / 2) + "px"), this.options.resizeFunc && this.options.resizeFunc.call()
        }, _create: function () {
            var e = this.options.parent == window ? document.body : this.options.parent,
                i = this.options.parent == window ? "fixed" : "absolute";
            this.iframe = t({
                tag: "IFRAME",
                className: "dialog-iframe-" + this.id,
                style: t.STYLE_NBODY + "position:" + i + ";display:none;left:0;top:0;margin:0;padding:0;border:0;width:100%;z-index:8888;"
            }).appendTo(e), this.background = t({
                tag: "div",
                className: "dialog-background-" + this.id,
                style: t.STYLE_NBODY + "position:" + i + ";left:0;top:0;margin:0;padding:0;border:0;width:100%;background-color:#000;z-index:8888;"
            }).appendTo(e);
            var n = t.browser.mobile ? 9e3 : 2147483647;
            this.container = t({
                tag: "div",
                className: "dialog-container-" + this.id,
                style: t.STYLE_BODY + "position:" + i + ";left:0;top:0;margin:0;min-height:" + (this.options.minHeight ? this.options.minHeight : 200) + "px;border-radius:0px;z-index:" + n + ";background:#fff;overflow-x:hidden;overflow-y:auto;"
            }).appendTo(e), this.background.bind("touchstart", function (e) {
                var i = t.Event.fixEvent(e);
                i.stopPropagation(), i.preventDefault()
            }).bind("touchend", function (e) {
                var i = t.Event.fixEvent(e);
                i.stopPropagation(), i.preventDefault()
            })
        }, _style: function (e) {
            var i = t(this.options.parent).width(),
                n = t(this.options.parent).height();
            t(".dialog-iframe-" + this.id + ",.dialog-background-" + this.id).css({
                width: i + "px",
                height: t(this.options.parent).height() + "px"
            }), this.background.css({
                opacity: .6
            });
            var s = (this.options.margin + "").split(" ");
            1 == s.length && s.push(this.options.margin), this.container.css(e).css({
                left: s[0] + "px",
                top: s[1] + "px",
                width: i - 2 * s[0] - 2 * this.options.border + "px",
                height: "auto" === this.options.style.height ? "auto" : n - 2 * s[1] - 2 * this.options.border + "px"
            })
        }
    }, t.Toast = new t.Class.create, t.Toast.prototype = {
        id: null,
        container: null,
        toast: null,
        options: {},
        initialize: function (e, i) {
            var n = this;
            this.id = t.randomChar(), this.options = t.extend(this.options, i), this.toastOpacity = t({
                tag: "div",
                className: "toast-opacity-" + this.id,
                style: t.STYLE_BODY + "position:absolute;z-index:1000000000;width:" + this.options.width + "px;height:" + this.options.height + "px;left:" + (t(window).width() - this.options.width) / 2 + "px;top:" + (t(window).scrollTop() + (t(window).height() - this.options.height - 100) / 2) + "px;background-color:#000;opacity:0.5;border-radius:5px;font-size:16px;color:white;text-align:center;line-height:" + this.options.height + "px"
            }), this.toast = t({
                tag: "div",
                className: "toast-" + this.id,
                style: t.STYLE_BODY + "position:absolute;z-index:1000000001;width:" + this.options.width + "px;height:" + this.options.height + "px;left:" + (t(window).width() - this.options.width) / 2 + "px;top:" + (t(window).height() - this.options.height - 100) / 2 + "px;border-radius:5px;font-size:16px;color:white;text-align:center;line-height:" + this.options.height + "px"
            }), this.toast.html(e), this._create(), this._funcResize = function () {
                n.resize()
            }, this._funRemove = function () {
                n.remove()
            }, t(window).addEvent("resize", this._funcResize)
        }, _create: function () {
            this.toastOpacity.appendTo(document.body), this.toast.appendTo(document.body)
        }, change: function (e) {
            t(".toast-" + this.id).html(e)
        }, resize: function () {
            var e = t(window).width(),
                i = t(window).height(),
                n = (e - this.options.width) / 2 > 0 ? (e - this.options.width) / 2 : 0,
                s = (i - this.options.height - 100) / 2 > 0 ? t(window).scrollTop() + (i - this.options.height - 100) / 2 : t(window).scrollTop();
            t(".toast-opacity-" + this.id).css({
                "margin-left": n + "px",
                "margin-top": s + "px",
                "max-width": e + "px",
                "max-height": i + "px"
            }), t(".toast-" + this.id).css({
                "margin-left": n + "px",
                "margin-top": -this.options.height + "px",
                "max-width": e + "px",
                "max-height": i + "px"
            })
        }, remove: function () {
            t(".toast-opacity-" + this.id).remove(), t(".toast-" + this.id).remove()
        }
    }, t.GifTimer = t.Class.create(), t.GifTimer.prototype = {
        id: null,
        inter: null,
        timeout: null,
        options: {
            inTimeFunc: null,
            outTimeFunc: null,
            doTime: null,
            allTime: null
        },
        initialize: function (e) {
            var i = this;
            this.options = t.extend(this.options, e), this.inter = setInterval(function () {
                i.options.inTimeFunc.call(i)
            }, this.options.doTime), this.timeout = setTimeout(function () {
                clearInterval(i.inter), i.options.outTimeFunc.call(i)
            }, this.options.allTime)
        }, remove: function () {
            t.Log("giftimer remove"), clearInterval(this.inter), clearTimeout(this.timeout), this.inter = null, this.timeout = null
        }
    }, t.Music = t.Class.create(), t.Music.prototype = {
        msgid: null,
        url: null,
        type: null,
        duration: null,
        audioFlag: !0,
        musicEl: null,
        viewCallback: null,
        eventCallback: null,
        container: null,
        debugStr: "[nTalk Music]: ",
        initialize: function (t, e, i, n, s, o, a) {
            this.msgid = t, this.url = e, this.type = i, this.duration = n, this.viewCallback = s, this.eventCallback = o, this.container = a, this.audioFlag = this.canPlayAudioMP3(), this.audioFlag ? this.createAudioPlayer() : this.createSwfPlayer(), this.viewCallback.call(this, "init"), this.eventCallback.call(this, "init")
        }, createAudioPlayer: function () {
            var e = this;
            this.musicEl = document.createElement("audio"), this.musicEl.src = this.url, this.musicEl.type = this.type, this.musicEl.stop = function () {
                this.pause(), this.currentTime = 0
            }, t.Event.addEvent(this.musicEl, "ended", function () {
                t.Log(e.debugStr + " trigger ended stop mp3"), e.viewCallback.call(e, "stop")
            }), this.musicEl.getPaused = function () {
                return this.paused
            }
        }, createSwfPlayer: function () {
            var e = this,
                i = "ntalker_swf_mp3Player_container_" + this.msgid,
                n = "ntalker_swf_mp3player_" + this.msgid,
                s = t.sourceURI + "fs/music.swf",
                o = t.flashHtml(n, s, "id=" + n);
            this.musicEl = document.createElement("div"), this.musicEl.innerHTML += o, this.musicEl.id = i, this.container.append(this.musicEl.outerHTML);
            var a = t.browser.msie && t.browser.ieversion <= 7 ? window[n] : document[n];
            setTimeout(function () {
                a.emit("load", e.url), a.emit("stop"), e.musicEl.play = function () {
                    a.emit("play")
                }, e.musicEl.stop = function () {
                    a.emit("stop")
                }, e.musicEl.getPaused = function () {
                    return 0 === a.getPaused()
                }
            }, 1e3)
        }, emit: function () {
            this.musicEl.getPaused() ? this.play() : this.stop()
        }, play: function () {
            t.Log(this.debugStr + "play mp3"), this.musicEl.play(), this.viewCallback.call(this, "play")
        }, stop: function () {
            t.Log(this.debugStr + "stop mp3"), this.musicEl.stop(), this.viewCallback.call(this, "stop")
        }, canPlayAudioMP3: function () {
            try {
                var t = document.createElement("audio");
                return !(!t.canPlayType || !t.canPlayType("audio/mpeg;").replace(/no/, ""))
            } catch (e) {
                return !1
            }
        }
    }, t.paste = t.Class.create(), t.paste.prototype = {
        data: null,
        callback: null,
        debugStr: "[nTalk pasteDate]: ",
        initialize: function (t, e) {
            this.data = t.clipboardData || window.clipboardData, this.callback = e
        }, getImgBase64Str: function () {
            var e = this,
                i = this.data;
            if (!i) return null;
            if ("function" == typeof webInfoChanged) this.callback(i.getData("image/x-vnd.adobe.air.bitmap").toDataURL());
            else if (t.browser.chrome || t.browser.opera) {
                var n, s, o = i.items;
                if (o) {
                    n = o[0];
                    for (var a = 0, r = (s = i.types || []).length; a < r; a++)
                        if ("Files" === s[a]) {
                            n = o[a];
                            break
                        }
                    if (n && "file" === n.kind && n.type.match(/^image\//i)) {
                        var h = n.getAsFile(),
                            l = new FileReader;
                        l.onload = function (t) {
                            e.callback(t.target.result)
                        }, l.readAsDataURL(h)
                    } else this.callback()
                }
            } else this.callback()
        }
    })
}(nTalk);
/* @file im.js
 * @date 2018.10.15 15:45:21
 */
! function (e, t) {
    var i = "ntkf_flash_impresence",
        n = "IM_SEND_CURRENT_PAGE_DATA";
    e.im || (e.tipsicon = e.sourceURI + "images/tipsicon." + (e.browser.msie6 ? "gif" : "png"), e.extend({
        CON_LCRM_FIX: "LCRM_",
        currentCount: 0,
        im: {
            connect: null,
            time: 3,
            args: null,
            options: null,
            tipElement: null,
            receiveMsgCount: 0,
            isInvite: !1,
            start: function () {
                var t = this;
                this.connect ? e.Log("im connected", 2) : (this.options = {
                    siteid: e.global.siteid,
                    settingid: e.global.settingid,
                    surl: e.server.flashserver,
                    r: e.baseURI,
                    ref: e.referrer,
                    fsid: e.global.trailid,
                    cid: e.global.pcid,
                    presenceserver: e.server.presenceserver,
                    presencegoserver: e.server.presencegoserver,
                    t2dstatus: e.server.t2dstatus,
                    crmcenter: e.server.crmcenter,
                    coopserver: e.server.coopserver,
                    loadnid: e.CON_LOAD_MODE_NID
                }, e.user.id && (this.options = e.merge(this.options, e.whereGet(e.user, ["id", "name"], ["u", "n"]))), e.require({
                    comet: "nt2.js?siteid=" + e.extParmas.siteid
                }, function (i) {
                    i ? (t.connect = new e.connectPresence(t.options, e.server.close_im_flash || "0", e.server.tchatConnectType), e.IMPRESENCE = t.connect, e.promptwindow.callbackFocus = function () {
                        t.onPageFocus()
                    }, e.promptwindow.callbackBlur = function () {
                        t.onPageBlur()
                    }, e.listenMouseOutEvent(), setInterval(function () {
                        t.intervalVerify()
                    }, 5e3), e.moveCheck = setInterval(function () {
                        0 === e.moveTime && 1 == e.currentCount && e.moveCheckFlag && (e.moveCheckFlag = !1, setTimeout(function () {
                            0 === e.moveTime && 1 == e.currentCount && e.showBeforeLeavePlan(), e.moveCheckFlag = !0
                        }, 2e3))
                    }, 1e3)) : e.Log("Loaded $comet mode failed", 3)
                }))
            }, callReceiveSysMessage: function (t, i, n) {
                var o, s, a;
                if (e.Log("im.callReceiveSysMessage(" + e + ")"), s = t.id || "", !t.settingid && s && (a = s.split("_").splice(0, 2).join("_"), t.settingid = e.global.settingid.indexOf(a) > -1 || a.indexOf("kf_") ? e.global.settingid : a + "_9999"), e.Log("$.IM.callReceiveSysMessage(" + e.JSON.toJSONString(arguments) + ")", 2), e.isEdu)
                    if (e.global.callbacks.ReceiveOfflineMessage) {
                        r = {
                            id: t.id,
                            settingid: t.settingid,
                            name: t.name,
                            userIcon: t.userIcon,
                            message: i
                        };
                        e.base.fire("ReceiveOfflineMessage", [r])
                    } else {
                        if (e.browser.mobile) {
                            if (n) return e.im_openInPageChat("", "", n.wid, {
                                edu_inviteid: n.inviteid,
                                edu_visitid: n.visitid
                            }), void e.fim_offlineMssage(i, n, t);
                            if (!t) return;
                            return void e.fim_offlineMssage(i, n, t)
                        }
                        if (n) return void nTalk.im_openInPageChat("", "", n.wid, {
                            edu_inviteid: n.inviteid,
                            edu_visitid: n.visitid
                        });
                        if (!t) return;
                        e.im.showTips(t, i)
                    } else switch (t.calltype) {
                case 10:
                    if (e.global.callbacks.ReceiveOfflineMessage) {
                        r = {
                            id: t.id,
                            settingid: t.settingid,
                            name: t.name,
                            userIcon: t.userIcon,
                            message: i
                        };
                        e.base.fire("ReceiveOfflineMessage", [r])
                    } else e.browser.mobile && e.global.pageinchat ? e.isFunction(im_receiveMessage) && im_receiveMessage(t.settingid, i) : e.chatManage && (o = e.chatManage.get(t.settingid, s)) ? (o.reconnect(null, s, -1), e.chatManage.callReceive(o.settingid)) : 3 == e.server.isnoim ? e.im_openInPageChat(t.settingid, "", s, {
                        single: -1,
                        autoconnect: !0
                    }, "") : (nTalk.global.siteid == t.eid || e.inArray(t.eid, e.global.sellerid) > -1) && e.im.showTips(t, i);
                    break;
                case 1:
                case 2:
                    e.base.startLCrm(t.content);
                    break;
                default:
                    if (e.global.callbacks.ReceiveOfflineMessage) {
                        var r = {
                            id: t.id,
                            settingid: t.settingid,
                            name: t.name,
                            userIcon: t.userIcon,
                            message: i
                        };
                        e.base.fire("ReceiveOfflineMessage", [r])
                    } else t.autoOpen || 3 == e.server.isnoim ? (e.im && e.im.refuseInvite(s, t.inviteid, 0), e.chatManage && (o = e.chatManage.get(t.settingid, s)) ? (o.reconnect(null, s, -1), e.chatManage.callReceive(o.settingid)) : e.im_openInPageChat && e.im_openInPageChat(t.settingid, "", s, {
                        single: -1,
                        autoconnect: 1
                    }, "")) : this.showTips(t, i, !0)
                }
            }, onPageFocus: function () {
                e.IMPRESENCE.setPageFocus(!0, e.title, e.url, 0), this.intervalVerify()
            }, onPageBlur: function () {
                e.IMPRESENCE.setPageFocus(!1)
            }, intervalVerify: function () {
                var t, i;
                t = e.loadLCrm(), e.each(t, function (t, n) {
                    1 != n.trigger && e.im.connect.currentPage.get() && (i = e.extend(n, {
                        cw: e.currentCount
                    }), e.base.startLCrm(i, !1, !0), e.flashData.remove(e.CON_LCRM_FIX + i.token))
                })
            }, showTips: function (t, i, n) {
                var o;
                this.settingid = t.settingid || e.global.settingid || "", this.destid = t.id || "", this.sessionid = t.sid || "", this.inviteid = t.inviteid || "", this.isInvite = n, "function" == typeof window.webInfoChanged && webInfoChanged(400, '{"num":' + ++this.receiveMsgCount + ', "showNum":1}', !1), o = this.destid.split("_ISME9754_T2D_"), this.sellerid = o[0].indexOf("kf_") > -1 || o[0] == e.global.siteid ? "" : o[0], e.require(e.tipsicon, function (t) {
                    t.error && e.Log("cache chat icon failure", 3)
                }), this._createTips(), this.tipElement.find(".ntalk-tips-body").html(i), this.tipElement.find(".ntalk-tips-button").html("立刻咨询"), e.promptwindow.startPrompt("", e.lang.news_new, !0)
            }, hideTips: function () {
                var t = this;
                this.tipElement && this.tipElement.length && this.tipElement.hide(500, function () {
                    e(this).remove(), t.tipElement = null
                })
            }, openChat: function () {
                this.hideTips(), e.browser.mobile || !e.global.pageinchat ? e.im_openOutPageChat(this.settingid, "", this.destid, {
                    manual: 1
                }, "", this.sellerid) : e.im_openInPageChat(this.settingid, "", this.destid, {
                    single: -1,
                    autoconnect: this.isInvite ? -1 : 1,
                    manual: 1
                }, "")
            }, _createTips: function () {
                var t = this;
                if (!this.tipElement || !this.tipElement.length) {
                    var i = ['<div class="ntalk-tips-background" style="margin:0;padding:10px;border:0;background:url(', e.tipsicon, ') no-repeat 0 0;color:#333333;font:normal 12px/160% Arial,SimSun;text-align:left;height:150px;width:205px;">', '<div class="ntalk-tips-body" style="margin:0;padding:0;border:0;float:left;font:normal 12px/160% Arial,SimSun;color:#333;height:60px;overflow:hidden;text-align:left;white-space:normal;width:156px;word-break:break-all;"></div>', '<div class="ntalk-tips-close" style="background:url(', e.tipsicon, ') no-repeat -7px -120px;margin:5px;padding:0;border:0;cursor:pointer;font:normal 1px/1px Arial;height:20px;left:166px;position:absolute;top:0px;width:20px;"></div>', '<div class="ntalk-tips-button" style="background:#008CD4;margin:0;padding:0;border:0;color:#FFFFFF;cursor:pointer;height:24px;left:105px;font:normal 12px/24px Arial,SimSun;position:absolute;text-align:center;top:78px;width:69px;"></div>', "</div>"].join("");
                    this.tipElement = e({
                        className: "ntalk-tips-container",
                        style: "margin:0;padding:0;border:none;float:none;font:normal normal normal 12px/160% Arial,SimSun;width:206px;height:112px;z-index:99999;"
                    }).appendTo(!0).fixed({
                        right: 0,
                        bottom: 0
                    }).html(i), this.tipElement.click(function (i) {
                        e.Event.fixEvent(i).stopPropagation(), t.openChat()
                    }), this.tipElement.find(".ntalk-tips-button").click(function (i) {
                        e.Event.fixEvent(i).stopPropagation(), t.openChat()
                    }).hover(function (t) {
                        e(this).css("background", "#007AB9")
                    }, function (t) {
                        e(this).css("background", "#008CD4")
                    }), this.tipElement.find(".ntalk-tips-close").click(function (i) {
                        e.Event.fixEvent(i).stopPropagation(), t.hideTips()
                    }).hover(function (t) {
                        e(this).css("background-position", "-27px -120px")
                    }, function (t) {
                        e(this).css("background-position", "-7px -120px")
                    })
                }
            }, refuseInvite: function (t, i, n) {
                if (e.server.presencegoserver)
                    if (t && i) {
                        e.global.callbacks.AcceptInvitation && 1 == n ? e.base.fire("AcceptInvitation", []) : !e.global.callbacks.RefuseInvitation || 0 != n && 2 != n || e.base.fire("RefuseInvitation", []);
                        var o = {
                            action: "",
                            query: "invtrst",
                            suid: e.user.id,
                            duid: t,
                            rst: n,
                            invid: i,
                            tk: e.global.userToken
                        };
                        e.require(e.server.presencegoserver + "?" + e.toURI(o) + "#rnd")
                    } else e.Log("auto invite", 1);
                else e.Log("presencegoserver is null", 2)
            }
        }
    }), e.extend({
        listenMouseEvent: !1,
        lcrmGoAwayClientY: 0,
        lcrmGoAwayView: !1,
        moveTime: 0,
        moveCheck: null,
        moveCheckFlag: !0,
        loadLCrm: function () {
            var t = e.flashData.get(),
                i = {};
            for (var n in t) "function" != typeof t[n] && t[n] && n.indexOf(e.CON_LCRM_FIX) > -1 && (i[n] = t[n]);
            return i
        }, listenMouseOutEvent: function (t) {
            var i = this,
                n = function (t) {
                    var n = e.Event.fixEvent(t);
                    !n.relatedTarget && !n.toElement || i.lcrmGoAwayView || i.setMouseOutWindow(n, !1)
                },
                o = function (t) {
                    var n = e.Event.fixEvent(t);
                    n.relatedTarget || n.toElement || (i.setMouseOutWindow(n, !0), i.moveTime = 0)
                },
                s = function (t) {
                    var n = e.Event.fixEvent(t);
                    i.setMouseOutWindow(n, "mousemove"), null !== e.moveCheck && (e.moveCheck = null), i.moveTime = e.getTime()
                };
            this.listenMouseEvent || e.browser.mobile || (this.listenMouseEvent = !0, !0 === t ? (e(document).removeEvent("mouseover", n), e(document).removeEvent("mouseout", o), e(document).removeEvent("mousemove", s)) : (e(document).addEvent("mouseover", n), e(document).addEvent("mouseout", o), e(document).addEvent("mousemove", s)))
        }, setMouseOutWindow: function (t, i) {
            var n = this;
            if ("mousemove" !== i) {
                if (this.lcrmGoAwayView = i, t.clientY < 0 && n.lcrmGoAwayClientY < 50) {
                    if (1 != e.currentCount) return;
                    setTimeout(function () {
                        0 === e.moveTime && e.showBeforeLeavePlan()
                    }, 500)
                }
            } else this.lcrmGoAwayClientY = t.clientY > 0 ? t.clientY : this.lcrmGoAwayClientY
        }, _getExistPageList: function () {
            try {
                return e.store.get("IM_EXIST_PAGEARR").split(",")
            } catch (t) {
                return []
            }
        }, showBeforeLeavePlan: function () {
            var t, i;
            t = e.loadLCrm(), e.each(t, function (t, n) {
                0 !== n.trigger && (i = e.extend(n, {
                    trigger: 0,
                    cw: e.currentCount
                }), e.base.startLCrm(i, !1, !0), e.flashData.remove(e.CON_LCRM_FIX + i.token))
            })
        }
    }), e.extend({
        fIM_onPresenceReceiveSysMessage: function (t, i) {
            return e.Log('$.fIM_onPresenceReceiveSysMessage("' + t + '", "' + e.JSON.toJSONString(i) + '")', 1), setTimeout(function () {
                var t, n, o;
                if (i.indexOf("ntalker://") > -1) n = e.clearHtml(i.substr(0, i.indexOf("ntalker://"))), a = i.substr(i.indexOf("ntalker://") + 10);
                else
                    for (var s = i.split("&&"), a = null, r = null, c = 0; c < s.length; c++) s[c].indexOf("msg=") > -1 ? a = s[c].replace("msg=", "") : r = s[c].replace("inviteid=", "");
                try {
                    t = e.JSON.parseJSON(a), r && (o = e.JSON.parseJSON(r))
                } catch (l) {
                    return void e.Log("nTalk.fIM_onPresenceReceiveSysMessage():" + l.message, 3)
                }
                e.im.callReceiveSysMessage(t, n, o)
            }, 0), !0
        }, fIM_onGetFlashServer: function (e, t, i, n, o, s, a) {
            return !0
        }, connectStatus: -1,
        fIM_updateUserStatus: function (t, i) {
            return setTimeout(function () {
                if (e.Log("$.fIM_updateUserStatus(" + t + ', "' + i + '")'), e.connectStatus = t, 2 == e.connectStatus) try {
                    e.IMPRESENCE.setPageFocus(!0, e.title, e.url, 1)
                } catch (n) {
                    e.Log(n, 3)
                }
            }, 0), !0
        }, fIM_presenceSetIMSid: function (t) {
            return e.Log("fIM_presenceSetIMSid(userToken:" + t + ")", 1), e.global.userToken = t, !0
        }, fIM_presenceSetMyClientID: function (t) {
            return e.url_presenceFlashGoUrl = t, !0
        }, flashData: {
            debug: !1,
            reNumber: 0,
            sessionData: null,
            checkFlash: function (t) {
                if (e.IMPRESENCE && e.isFunction(e.IMPRESENCE.setJSData)) t.call(this);
                else {
                    if (this.reNumber > 3) return;
                    this.reNumber++, setTimeout(t, 500)
                }
            }, add: function (t, i) {
                i && (i = this.filter(e.JSON.toJSONString(i), !0)), this.debug && e.Log("$.flashData.add(k:" + t + ", v:" + i + ")", 1), this.checkFlash(function () {
                    try {
                        return e.IMPRESENCE.setJSData(e.global.trailid, t, i), !0
                    } catch (n) {
                        return !1
                    }
                })
            }, remove: function (e) {
                this.add(e, null, !1)
            }, clearAll: function () {
                this.checkFlash(function () {
                    try {
                        return NTKF.IMPRESENCE.setJSData("", "", ""), !0
                    } catch (e) {
                        return !1
                    }
                })
            }, get: function (t) {
                var i, n = {};
                if (!e.IMPRESENCE || !e.IMPRESENCE.getJSData) return n;
                i = e.IMPRESENCE.getJSData(e.global.trailid, t || "");
                try {
                    i = e.JSON.parseJSON(i)
                } catch (s) {}
                if ("string" == typeof i) n = e.JSON.parseJSON(this.filter(i, !1) || "{}");
                else
                    for (var o in i)
                        if (!e.isFunction(i[o])) try {
                            n[o] = e.JSON.parseJSON(this.filter(i[o], !1))
                        } catch (s) {}
                        return n
            }, filter: function (e, t) {
                return !0 === t ? e.replace(/\"/gi, "{sy}") : e.replace(/\{sy\}/gi, '"')
            }
        }, fim_offlineMssage: function (t, i, n, o) {
            if (0 == e(".nTalk-window-offLine").length && (e.OfflineChat = new nTalk.ChatOfflineChat(i, n)), !t && !i && !n && o) return e.OfflineChat.count = 0, e.cache.set("imcount", 0), e.OfflineChat.offlineChatCount.css("display", "none").html("0"), void e.OfflineChat.offlineChat.css("display", "none");
            e.OfflineChat.receiveMessage(t, "", n)
        }
    }), e.connectPresence = e.Class.create(), e.connectPresence.prototype = {
        name: "connectPresence",
        options: null,
        manage: null,
        debug: !1,
        data: null,
        switchTimeId: null,
        _connected: !1,
        currentConnectType: "",
        initialize: function (t, i, n) {
            this.data = e.store, this.options = e.extend({
                nullparam: "",
                usemqtt: 0
            }, t), 1 == n && e.server.eduimmqttserver ? this.connect = this._createMqttConnect(this.options) : this.connect = this._createCometConnect(this.options), e.Log("new $.connectPresence(); connect_type: " + n + ", isnoim:" + e.server.isnoim), this.connect.manage ? this.manage = this.connect.manage : this.manage = new e.pageManage, this.manage.options.onChanage = function (t, i) {
                e.currentCount = t, e.Log("page manage callback: current open window number:" + e.currentCount, 1)
            }, e.currentCount = this.manage.count, this.identid = this.manage.identid, this.connect.currentPage ? this.currentPage = this.connect.currentPage : (e.Log("new $.CurrentPage(" + this.identid + ")", 1), this.currentPage = new e.CurrentPage(this.identid, this.manage))
        }, switchConnect: function () {
            this.stopSwitchConnect(), this.currentConnectType != e.CON_CONNECT_COMET ? (e.Log("Flash abnormalities, switch the connection type. this.currentConnectType:" + this.currentConnectType + " > comet", 2), this.connect && e.isFunction(this.connect.remove) && e.flash.remove(this.connect), this.connect && e.isFunction(this.connect.disconnect) && this.connect.disconnect()) : e.Log("Flash abnormalities", 2)
        }, stopSwitchConnect: function () {
            clearTimeout(this.switchTimeId), this.switchTimeId = null
        }, setPageFocus: function (e, t, i, n) {
            e && this.currentPage.set(t, i)
        }, closePresence: function () {
            if (this.connect) try {
                this.connect.closePresence()
            } catch (t) {}
            this.currentConnectType == e.CON_CONNECT_FLASH && e.flash.remove(this.connect), this.connect = null, this.manage = null
        }, setJSData: function (e, t, i) {
            var n;
            if ((e = arguments[0]) && "" !== e) t = "JDATA_" + e + "-" + arguments[1], this.data.set(t, arguments[2]);
            else {
                n = this.data.getAll();
                for (var o in n) n.hasOwnProperty(o) && o.indexOf("JDATA_") > -1 && this.data.remove(o)
            }
        }, getJSData: function (t, i) {
            var n, o = {};
            n = this.data.getAll();
            for (var s in n) "function" != typeof n[s] && s.indexOf("JDATA_") > -1 && (o[s] = n[s]);
            return e.JSON.toJSONString(o)
        }, _createFlashConnect: function (t) {
            e.Log("$.connectPresence._createFlashConnect()", 1);
            var n = e("#nTalk-flash-element"),
                o = e.sourceURI + "fs/impresence.swf?" + e.version.im,
                s = e.flashHtml(i, o, t);
            return this.currentConnectType = e.CON_CONNECT_FLASH, n.length || (n = e(document.body).insert('<div id="nTalk-flash-element" class="nTalk-hidden-element" style="position: absolute; z-index: 9996; top: -200px;"></div>')), n.insert(s), e.browser.msie && n.find("#" + i).display(1), n.find("#" + i).get(0)
        }, _createCometConnect: function (t) {
            return e.Log("$.connectPresence._createCometConnect()", 1), this.currentConnectType = e.CON_CONNECT_COMET, new e.IMPresence(t)
        }, _createMqttConnect: function (t) {
            return e.Log("$.connectPresence._createMqttConnect()", 1), this.currentConnectType = e.CON_CONNECT_COMET, new e.IMConnection.Presence(t)
        }
    }, e.IMPresence = e.Class.create(), e.IMPresence.prototype = {
        name: "IMPresence",
        options: null,
        connectParams: ["userid", "username", "token", "sessionid", "nullparam", "nullparam", "nullparam", "siteid", "nullparam", "nullparam", "connectType", "pcid", "nullparam"],
        connect: null,
        debug: !1,
        login: !1,
        currentPage: null,
        _reCount: 0,
        _waitTime: 500,
        _currentConnected: !1,
        _waitReconnectTimeID: null,
        _mqttFlag: !0,
        initialize: function (t) {
            var i = this;
            this._wsFlag = 1 == t.usemqtt, this.options = e.extend({
                nullparam: ""
            }, e.whereGet(t, ["siteid", "settingid", "cid", "surl", "u", "n", "s", "r", "ref", "fsid"], ["siteid", "settingid", "pcid", "serverurl", "userid", "username", "sessionid", "resourceurl", "referrer", "flashsessionid"])), this.data = e.store, this._reCount = 0, (!this.options.pcid || this.options.pcid.length <= 10) && (this.options.pcid = this.data.get("machineid"), (!this.options.pcid || this.options.pcid.length <= 10) && (this.options.pcid = e.base._createScriptPCID()));
            try {
                this.data.set("machineid", this.options.pcid)
            } catch (o) {
                e.Log(o, 3)
            }
            this.options.userid || (this.options.userid = e.base.userIdFix + this.options.pcid.substr(0, 21)), this._callback("fIM_presenceFlashReady", [this.options.userid, this.options.pcid]);
            var n = {
                onInterval: function (e, t) {
                    i._onInterval.call(i, e, t)
                }, onChanage: function (e, t) {
                    i._onChanage.call(i, e, t)
                }
            };
            this.manage = new e.pageManage(n), this.identid = this.manage.identid, this.currentPage = new e.CurrentPage(this.identid, this.manage), this.setPageFocus(!0, e.title, e.url)
        }, loginConnect: function () {
            var t = this,
                i = "",
                n = this._toArray(this.options, this.connectParams);
            if (this.debug && e.Log("im.loginConnect()"), this._callback("fIM_updateUserStatus", [1, ""]), e.server.presenceserver) {
                for (var o = e.server.presenceserver.split(";"), s = 0; s < o.length; s++) o[s].indexOf("ws://") > -1 && (i = o[s]);
                i || (this._wsFlag = !1), this._wsFlag ? this.connect = new e.mqttws({
                    url: i,
                    siteid: t.options.siteid,
                    pcid: t.options.pcid,
                    onCallback: function () {
                        t._onCallback.apply(t, arguments)
                    }, loginMsg: e.JSON.toJSONString({
                        method: "roomConnect",
                        params: n
                    })
                }) : (this.connect = new e.comet(e.server.presencegoserver, {
                    timeout: 20,
                    onCallback: function () {
                        t._onCallback.apply(t, arguments)
                    }, onComplete: function (e) {
                        t._onComplete.apply(t, arguments)
                    }, onAbnormal: function (e) {
                        t._onAbnormal.apply(t, arguments)
                    }, onTimeout: function (e) {
                        t._onTimeout.apply(t, arguments)
                    }
                }), this.connect.connect({
                    action: "conn",
                    params: n.join(",")
                }, "callback"))
            }
        }, kaliveConnect: function () {
            this.debug && e.Log("$.IMPresence.kaliveConnect()", 1);
            var t, i = this;
            if (this._wsFlag) t = {
                method: "remoteKeepAlive",
                params: [null, this.options.userid, this.options.clientid]
            }, this.connect.kalive(e.JSON.toJSONString(t));
            else {
                var n = this._toArray(this.options, this.connectParams);
                t = {
                    action: "kalive",
                    params: n.join(","),
                    clientid: this.options.clientid,
                    machineid: this.options.pcid,
                    token: this.options.token,
                    uid: this.options.userid
                }, setTimeout(function () {
                    i.connect.kalive(t, "callback")
                }, 1e3)
            }
        }, reconnect: function () {
            var t = this;
            ++this._reCount <= 3 ? this._waitTime = 500 : this._waitTime = 1e3 * +"034567890".charAt(Math.ceil(5 * Math.random())), this.debug && e.Log("$.IMPresence.reconnect() wait:" + this._waitTime, 1), this._waitReconnectTimeID = setTimeout(function () {
                t.connect.reconnect()
            }, this._waitTime)
        }, disconnect: function () {
            var e = this.data.getAll();
            for (var t in e) "function" != typeof e[t] && t.indexOf("JDATA_") > -1 && this.data.remove(t);
            clearTimeout(this._waitReconnectTimeID), this._waitReconnectTimeID = null
        }, LoginResult: function (e, t, i, n) {
            this.login = e, this.options.clientid = i, this.options.token = n, this._callback("fIM_updateUserStatus", [this.login ? 2 : 0, ""]), this._callback("fIM_presenceSetIMSid", [this.login ? this.options.token : ""]), this.login ? this.kaliveConnect("call kalive") : this.reconnect("login relogin")
        }, remoteNotifyChatWithGroup: function (t, i, n, o, s, a, r, c) {
            var l, h;
            if (r) {
                l = e.clearHtml(r.substr(0, r.indexOf("ntalker://"))), h = r.substr(r.indexOf("ntalker://") + 10);
                try {
                    e.JSON.parseJSON(h)
                } catch (d) {}
                e.store.isStorageSupported ? this._sendMessage2CurrenPage(l + "ntalker://" + h) : this._callback("fIM_onPresenceReceiveSysMessage", [1, l + "ntalker://" + h])
            } else this.debug && e.Log("message content is null", 3)
        }, remoteNotifyUserCode: function (t) {
            e.Log("do remoteNotifyUserCode!!!")
        }, remoteConfirmAddFriend: function (t) {
            e.Log("do remoteConfirmAddFriend")
        }, _handleResponse: function (t, i) {
            this[t] ? this[t].apply(this, i) : e.Log("The object of the method '" + t + "' does not exist", 3)
        }, _callback: function (t, i) {
            if (e.hasOwnProperty(t)) try {
                e[t].apply(this, i)
            } catch (n) {} else e.Log("nTalk." + t + "(...)", 2)
        }, _onCallback: function (t, i) {
            var n, o = this;
            if (this.debug && e.Log("$.IMPresence.onCallback(  )"), i.length)
                if (n = i[0], /LoginResult|LoginReslut/gi.test(n)) {
                    if (!t) return;
                    this.LoginResult.apply(o, i.slice(1))
                } else this._handleResponse.call(o, n, i.slice(1)), t && this.kaliveConnect("call kalive")
        }, _onComplete: function () {
            var t = Array.prototype.slice.call(arguments);
            this.debug && e.Log("$.IMPresence.onComplete( " + t[0] + "," + t[1] + "," + t[2] + " )"), "kalive" == t[0] ? this.kaliveConnect("complete kalive") : "login" == t[0] && this.reconnect("abnormal login")
        }, _onAbnormal: function () {
            var t = Array.prototype.slice.call(arguments);
            this.debug && e.Log("$.IMPresence.onAbnormal( " + t[0] + "," + t[1] + "," + t[2] + " )", 3), "login" == t[0] ? this.reconnect("abnormal login") : this.kaliveConnect("abnormal kalive")
        }, _onTimeout: function () {
            var t = Array.prototype.slice.call(arguments);
            this.debug && e.Log("$.IMPresence.onTimeout( " + t[0] + "," + t[1] + "," + t[2] + " )", 3), "login" == t[0] ? this.reconnect("time login") : this.kaliveConnect("timeout kalive")
        }, _onInterval: function (t, i) {
            if (this.currentConn = this.data.get("IM_CUREENT_CONNECT") || {
                identid: "",
                time: 0
            }, this.currentConn.identid && this.currentConn.identid === this.identid) this.currentConn.time = e.getTime(), this.data.set("IM_CUREENT_CONNECT", this.currentConn), this._fireEvent("update");
            else {
                var n;
                if (e.isArray(i))
                    for (var o = 0; o < i.length; o++) page = i[o], page && page[this.currentConn.identid] && (n = !0, this._currentConnected = !0);
                if (this.currentConn.identid && this.currentConn.identid !== this.identid && !n && (this.currentConn.identid = "", this._currentConnected = !1, this._fireEvent("clear")), this.debug && e.Log("currentConnect>>_onInterval:" + e.JSON.toJSONString(this.currentConn) + ", _currentConnected:" + this._currentConnected), this.currentConn.identid && "" !== this.currentConn.identid || this._currentConnected) this._fireEvent("wait");
                else {
                    this.currentConn = {
                        identid: this.identid,
                        time: e.getTime()
                    }, this._currentConnected = !0;
                    try {
                        this.data.set("IM_CUREENT_CONNECT", this.currentConn)
                    } catch (s) {
                        e.Log(s, 3)
                    }
                    this._fireEvent("add"), this.loginConnect()
                }
            }
        }, _onChanage: function (e, t) {
            this.pageCount = e
        }, _fireEvent: function (t) {
            1 != this.temp && this.temp ? this.temp >= 5 && (this.temp = 0) : (this.temp = 1, this.debug && "wait" !== t && e.Log(this.identid + ", " + t + " long connect, curPage:" + this.currentPage.get(), 2)), this.temp++, this._currentGetMessage()
        }, _toArray: function (e, t) {
            var i = [];
            if (!e) return "error";
            for (var n = 0; n < t.length; n++) i.push(e[t[n]] || "");
            return i
        }, _sendMessage2CurrenPage: function (t) {
            var i = this.data.get(n);
            t && (this.Queue || (this.Queue = new e.Queue), i ? this.Queue.enQueue({
                data: t
            }) : this.data.set(n, t))
        }, _currentGetMessage: function () {
            var t = this.data.get(n);
            if (t) {
                try {
                    t = e.JSON.parseJSON(t)
                } catch (o) {}
                if (this.currentPage.get() && t && (this.data.remove(n), this._callback("fIM_onPresenceReceiveSysMessage", [1, t]), this.Queue)) {
                    var i = this.Queue.deQueue();
                    i && this._sendMessage2CurrenPage(i.data)
                }
            }
        }, setPageFocus: function (e, t, i, n) {
            !0 === e && this.currentPage.set(t, i)
        }, closePresence: function () {
            if (this._wsFlag) this.connect.disconnect();
            else try {
                this.cometd.disconnect(!0)
            } catch (e) {}
            this.data.remove("IM_CUREENT_CONNECT")
        }, setJSData: function () {
            var e, t, i = arguments[0];
            if (i && "" !== i) t = "JDATA_" + i + "-" + arguments[1], this.data.set(t, arguments[2]);
            else {
                e = this.data.getAll();
                for (var n in e) "function" != typeof e[n] && n.indexOf("JDATA_") > -1 && this.data.remove(n)
            }
        }, getJSData: function () {
            var t, i = {},
                n = Array.prototype.slice.call(arguments, 0, 2).slice(0, 2).join("-");
            if (n && arguments[1]) return e.JSON.toJSONString(this.data.get(n));
            t = this.data.getAll();
            for (var o in t) "function" != typeof t[o] && o.indexOf("JDATA_") > -1 && (i[o] = t[o]);
            return e.JSON.toJSONString(i)
        }
    }, e.CurrentPage = e.Class.create(), e.CurrentPage.prototype = {
        name: "CurrentPage",
        cachePageData: null,
        identid: "",
        debug: !1,
        manage: null,
        initialize: function (t, i) {
            t ? (this.identid = t, this.manage = i, this.data = e.store) : e.Log("$.CurrentPage params failed", 3)
        }, set: function (t, i) {
            if (!t || !i) return e.Log("title is null, url is null"), !1;
            this.cachePageData = {
                identid: this.identid,
                title: t,
                url: i
            }, this.debug && e.Log("$.CurrentPage.set():" + e.JSON.toJSONString(this.cachePageData), 1), this.data.set("IM_CURRENT_PAGE", this.cachePageData)
        }, get: function () {
            var t = !1;
            if (this.cachePageData = this.data.get("IM_CURRENT_PAGE"), !this.cachePageData || e.isEmptyObject(this.cachePageData)) return !1;
            var i = e._getExistPageList();
            if (i.length > 0) {
                for (var n = 0; n < i.length; n++)
                    if (i[n] == this.cachePageData.identid) {
                        t = !0;
                        break
                    }
                if (!1 === t && this.identid == i[i.length - 1]) return this.set(e.title, e.url), !0
            }
            this.debug && (e.Log("::" + e.JSON.toJSONString(this.cachePageData)), e.Log("cache page identid:" + this.cachePageData.identid + ", identid:" + this.identid + ", currentPage: " + (this.cachePageData.identid == this.identid)));
            try {
                return this.cachePageData.identid == this.identid
            } catch (o) {
                return !1
            }
        }
    }, e.ChatOfflineChat = e.Class.create(), e.ChatOfflineChat.prototype = {
        name: "ChatOfflineChat",
        speed: 0,
        times: 2e3,
        fontSize: 1,
        times: 1,
        running: !1,
        backGround: null,
        chatWidth: null,
        chatHeight: null,
        arrList: [],
        inviteid: "",
        visitid: "",
        wid: "",
        count: 0,
        store: !1,
        eduStoreInfo: {},
        initialize: function (t, i) {
            window.localStorage && (this.store = !0), e.browser.mobile && 0 == e("meta[name=viewport]").length && (this.fontSize = 2), t ? (this.inviteid = t.inviteid, this.visitid = t.visitid, this.wid = t.wid) : this.wid1 = i.id;
            var n = i.userIcon ? i.userIcon : i.usericon ? i.usericon : i.logo;
            i.externalname ? i.externalname : i.name;
            this.offlineChat = e({
                tag: "div",
                className: "nTalk-window-offLine",
                style: "width:94%;height:" + 106 * this.fontSize + "px;background:-webkit-gradient(linear,center top,center bottom,from(#ffffff), to(#ffffff));position:fixed;left:3%;bottom:" + 75 * this.fontSize + "px;box-sizing:border-box;padding:" + 10 * this.fontSize + "px " + 10 * this.fontSize + "px;box-shadow:0 0 " + 10 * this.fontSize + "px " + 2 * this.fontSize + "px #bababa;z-index:10000;border-radius:" + 3 * this.fontSize + "px;"
            }).appendTo(!0), this.offlineChatAngle = e({
                tag: "div",
                className: "nTalk-window-offline-angle",
                style: "width:0;height:0;border:" + 20 * this.fontSize + "px solid #fff;position:absolute;bottom:-" + 20 * this.fontSize + "px;right:" + 10 * this.fontSize + "px;border-top:" + 10 * this.fontSize + "px solid #fff;border-left:" + 5 * this.fontSize + "px solid transparent;border-right:" + 5 * this.fontSize + "px solid transparent;border-bottom:" + 10 * this.fontSize + "px solid transparent;"
            }).appendTo(this.offlineChat), this.offlineChatLogo = e({
                tag: "div",
                className: "nTalk-window-offLine-logo",
                style: "width:100%;height:" + 24 * this.fontSize + "px;background:transparent;float:left;"
            }).appendTo(this.offlineChat), this.headerLogo = e({
                tag: "img",
                className: "nTalk-window-offLine-logo-header",
                style: "width:" + 24 * this.fontSize + "px;height:" + 24 * this.fontSize + "px;border:none;overflow:hidden;border-radius:100%;float:left;",
                src: n
            }).appendTo(this.offlineChatLogo), this.headerName = e({
                tag: "div",
                className: "nTalk-window-offLine-logo-name",
                style: "width:auto;height:" + 30 * this.fontSize + "px;float:left;overflow:hidden;font-size:" + 16 * this.fontSize + "px;line-height:" + 30 * this.fontSize + "px;font-weight:blod;background:transparent;color:#2c2c2c;"
            }).appendTo(this.offlineChat), this.headerClose = e({
                tag: "div",
                className: "nTalk-window-offLine-logo-close",
                style: "width:" + 12 * this.fontSize + "px;height:" + 12 * this.fontSize + "px;float:right;overflow:hidden;background:url(" + e.sourceURI + "images/close.png) no-repeat;background-size:100%;margin-right:0px;margin-top:0px;"
            }).appendTo(this.offlineChatLogo), this.offlineChatContainer = e({
                tag: "div",
                className: "nTalk-window-offline-container",
                style: "width:100%;height:" + 30 * this.fontSize + "px;flot:left;positon:relative;overflow:hidden;background:transparent;"
            }).appendTo(this.offlineChat), this.offlineChatMessage = e({
                tag: "div",
                className: "nTalk-window-offline-message",
                style: "width:100%;height:" + 24 * this.fontSize + "px;font-size:" + 16 * this.fontSize + "px;line-height:" + 24 * this.fontSize + "px;margin:0;padding:0 ;color:#2c2c2c;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;box-sizing:border-box;"
            }).appendTo(this.offlineChatContainer), this.offlineChatBottom = e({
                tag: "div",
                className: "nTalk-window-offLine-bottom",
                style: "width:100%;height:" + 38 * this.fontSize + "px;position:fixed;bottom:0;left:0;background:#007aff;text-align:center;justify-content:center;display:flex;padding:0;margin:0;z-index:10000;"
            }).appendTo(!0), this.offineChatBottomMsg = e({
                tag: "span",
                style: "font-size:" + 16 * this.fontSize + "px;line-height:" + 38 * this.fontSize + "px;color:#fff;display:inline-block;height:100%;vertical-align: middle;background:url(" + e.sourceURI + "images/inviteidicon.png) no-repeat 0 " + 13 * this.fontSize + "px;background-size:" + 17 * this.fontSize + "px " + 16 * this.fontSize + "px;padding-left:" + 20 * this.fontSize + "px;"
            }).appendTo(this.offlineChatBottom).html("来和我聊天吧"), this.offlineChatCount = e({
                tag: "div",
                className: "nTalk-window-offline-count",
                style: "width:" + 20 * this.fontSize + "px;height:" + 20 * this.fontSize + "px;position:absolute;right:" + 10 * this.fontSize + "px;top:-" + 10 * this.fontSize + "px;font-size:" + 12 * this.fontSize + "px;line-height:" + 20 * this.fontSize + "px;background:#ff3b30;color:#fff;text-align:center;border-radius:100%;"
            }).appendTo(this.offlineChatBottom).html(++this.count), this.headerName.html(), this._bind()
        }, receiveMessage: function (e, t, i) {
            this.offlineChat.css("display", "block"), this.offlineChatBottom.css("display", "flex"), e && "string" == typeof e && (this.count = this.count + 1, this.offlineChatMessage.html(e), this.offlineChatCount.css("display", "block").html(this.count)), i && i.logo && this.headerLogo.attr("src") != i.logo && this.headerLogo.attr("src", i.logo), i && i.name && this.headerName.html(i.name)
        }, _bind: function () {
            var t = this;
            this.offlineChat.bind("click", function () {
                t.wid ? e.im_openInPageChat("", "", t.wid, {
                    edu_inviteid: t.inviteid,
                    edu_visitid: t.visitid
                }) : t.wid1 && e.im_openInPageChat("", "", t.wid1), e._showMobileInPageWindow(), t.count = 0, t.offlineChatCount.css("display", "none")
            }), this.offlineChatBottom.bind("click", function () {
                e._showMobileInPageWindow(), e.global.showOffline = !1, 0 == e(".ntalk-mobile-inpage-window").length && e.im_openInPageChat("", "", t.wid)
            }), this.headerClose.bind("click", function (i) {
                (i = e.Event.fixEvent(i)).preventDefault(), i.stopPropagation(), t.offlineChat.css("display", "none"), t.offlineChatCount.css("display", "block !important");
                try {
                    e.chatManage.view._callEndSession(!0, !1), e.chatManage.closeChat(t.wid || t.wid1)
                } catch (n) {
                    e.Log("edu chat is already end")
                }
            })
        }
    })
}(nTalk);