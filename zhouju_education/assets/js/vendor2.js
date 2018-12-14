! function (h, k) {
    var r, n, y = typeof k,
        g = h.document,
        e = h.location,
        t = h.jQuery,
        i = h.$,
        o = {},
        A = [],
        a = "1.9.1",
        v = A.concat,
        f = A.push,
        p = A.slice,
        s = A.indexOf,
        l = o.toString,
        m = o.hasOwnProperty,
        b = a.trim,
        me = function (e, t) {
            return new me.fn.init(e, t, n)
        },
        u = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        E = /\S+/g,
        c = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        d = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        S = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        x = /^[\],:{}\s]*$/,
        T = /(?:^|:|,)(?:\s*\[)+/g,
        w = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        C = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        N = /^-ms-/,
        j = /-([\da-z])/gi,
        D = function (e, t) {
            return t.toUpperCase()
        },
        L = function (e) {
            (g.addEventListener || "load" === e.type || "complete" === g.readyState) && (H(), me.ready())
        },
        H = function () {
            g.addEventListener ? (g.removeEventListener("DOMContentLoaded", L, !1), h.removeEventListener("load", L, !1)) : (g.detachEvent("onreadystatechange", L), h.detachEvent("onload", L))
        };

    function _(e) {
        var t = e.length,
            n = me.type(e);
        return !me.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || "function" !== n && (0 === t || "number" == typeof t && 0 < t && t - 1 in e)))
    }
    me.fn = me.prototype = {
        jquery: a,
        constructor: me,
        init: function (e, t, n) {
            var r, i;
            if (!e) return this;
            if ("string" == typeof e) {
                if (!(r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && 3 <= e.length ? [null, e, null] : d.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof me ? t[0] : t, me.merge(this, me.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : g, !0)), S.test(r[1]) && me.isPlainObject(t))
                        for (r in t) me.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                if ((i = g.getElementById(r[2])) && i.parentNode) {
                    if (i.id !== r[2]) return n.find(e);
                    this.length = 1, this[0] = i
                }
                return this.context = g, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : me.isFunction(e) ? n.ready(e) : (e.selector !== k && (this.selector = e.selector, this.context = e.context), me.makeArray(e, this))
        }, selector: "",
        length: 0,
        size: function () {
            return this.length
        }, toArray: function () {
            return p.call(this)
        }, get: function (e) {
            return null == e ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        }, pushStack: function (e) {
            var t = me.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return me.each(this, e, t)
        }, ready: function (e) {
            return me.ready.promise().done(e), this
        }, slice: function () {
            return this.pushStack(p.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        }, map: function (n) {
            return this.pushStack(me.map(this, function (e, t) {
                return n.call(e, t, e)
            }))
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: f,
        sort: [].sort,
        splice: [].splice
    }, me.fn.init.prototype = me.fn, me.extend = me.fn.extend = function () {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            l = arguments.length,
            u = !1;
        for ("boolean" == typeof a && (u = a, a = arguments[1] || {}, s = 2), "object" == typeof a || me.isFunction(a) || (a = {}), l === s && (a = this, --s); s < l; s++)
            if (null != (i = arguments[s]))
                for (r in i) e = a[r], a !== (n = i[r]) && (u && n && (me.isPlainObject(n) || (t = me.isArray(n))) ? (t ? (t = !1, o = e && me.isArray(e) ? e : []) : o = e && me.isPlainObject(e) ? e : {}, a[r] = me.extend(u, o, n)) : n !== k && (a[r] = n));
        return a
    }, me.extend({
        noConflict: function (e) {
            return h.$ === me && (h.$ = i), e && h.jQuery === me && (h.jQuery = t), me
        }, isReady: !1,
        readyWait: 1,
        holdReady: function (e) {
            e ? me.readyWait++ : me.ready(!0)
        }, ready: function (e) {
            if (!0 === e ? !--me.readyWait : !me.isReady) {
                if (!g.body) return setTimeout(me.ready);
                (me.isReady = !0) !== e && 0 < --me.readyWait || (r.resolveWith(g, [me]), me.fn.trigger && me(g).trigger("ready").off("ready"))
            }
        }, isFunction: function (e) {
            return "function" === me.type(e)
        }, isArray: Array.isArray || function (e) {
            return "array" === me.type(e)
        }, isWindow: function (e) {
            return null != e && e == e.window
        }, isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? o[l.call(e)] || "object" : typeof e
        }, isPlainObject: function (e) {
            if (!e || "object" !== me.type(e) || e.nodeType || me.isWindow(e)) return !1;
            try {
                if (e.constructor && !m.call(e, "constructor") && !m.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (r) {
                return !1
            }
            var t;
            for (t in e);
            return t === k || m.call(e, t)
        }, isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        }, error: function (e) {
            throw Error(e)
        }, parseHTML: function (e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || g;
            var r = S.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = me.buildFragment([e], t, i), i && me(i).remove(), me.merge([], r.childNodes))
        }, parseJSON: function (e) {
            return h.JSON && h.JSON.parse ? h.JSON.parse(e) : null === e ? e : "string" == typeof e && ((e = me.trim(e)) && x.test(e.replace(w, "@").replace(C, "]").replace(T, ""))) ? Function("return " + e)() : (me.error("Invalid JSON: " + e), k)
        }, parseXML: function (e) {
            var t;
            if (!e || "string" != typeof e) return null;
            try {
                h.DOMParser ? t = (new DOMParser).parseFromString(e, "text/xml") : ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e))
            } catch (g) {
                t = k
            }
            return t && t.documentElement && !t.getElementsByTagName("parsererror").length || me.error("Invalid XML: " + e), t
        }, noop: function () {}, globalEval: function (e) {
            e && me.trim(e) && (h.execScript || function (e) {
                h.eval.call(h, e)
            })(e)
        }, camelCase: function (e) {
            return e.replace(N, "ms-").replace(j, D)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, n) {
            var r = 0,
                i = e.length,
                o = _(e);
            if (n) {
                if (o)
                    for (; r < i && !1 !== t.apply(e[r], n); r++);
                else
                    for (r in e)
                        if (!1 === t.apply(e[r], n)) break
            } else if (o)
                for (; r < i && !1 !== t.call(e[r], r, e[r]); r++);
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break; return e
        }, trim: b && !b.call("\ufeff ") ? function (e) {
            return null == e ? "" : b.call(e)
        } : function (e) {
            return null == e ? "" : (e + "").replace(c, "")
        }, makeArray: function (e, t) {
            var n = t || [];
            return null != e && (_(Object(e)) ? me.merge(n, "string" == typeof e ? [e] : e) : f.call(n, e)), n
        }, inArray: function (e, t, n) {
            var r;
            if (t) {
                if (s) return s.call(t, e, n);
                for (r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        }, merge: function (e, t) {
            var n = t.length,
                r = e.length,
                i = 0;
            if ("number" == typeof n)
                for (; i < n; i++) e[r++] = t[i];
            else
                for (; t[i] !== k;) e[r++] = t[i++];
            return e.length = r, e
        }, grep: function (e, t, n) {
            var r = [],
                i = 0,
                o = e.length;
            for (n = !!n; i < o; i++) n !== !!t(e[i], i) && r.push(e[i]);
            return r
        }, map: function (e, t, n) {
            var r, i = 0,
                o = e.length,
                a = [];
            if (_(e))
                for (; i < o; i++) null != (r = t(e[i], i, n)) && (a[a.length] = r);
            else
                for (i in e) null != (r = t(e[i], i, n)) && (a[a.length] = r);
            return v.apply([], a)
        }, guid: 1,
        proxy: function (e, t) {
            var n, r, i;
            return "string" == typeof t && (i = e[t], t = e, e = i), me.isFunction(e) ? (n = p.call(arguments, 2), (r = function () {
                return e.apply(t || this, n.concat(p.call(arguments)))
            }).guid = e.guid = e.guid || me.guid++, r) : k
        }, access: function (e, t, n, r, i, o, a) {
            var s = 0,
                l = e.length,
                u = null == n;
            if ("object" === me.type(n))
                for (s in i = !0, n) me.access(e, t, s, n[s], !0, o, a);
            else if (r !== k && (i = !0, me.isFunction(r) || (a = !0), u && (a ? (t.call(e, r), t = null) : (u = t, t = function (e, t, n) {
                return u.call(me(e), n)
            })), t))
                for (; s < l; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : u ? t.call(e) : l ? t(e[0], n) : o
        }, now: function () {
            return (new Date).getTime()
        }
    }), me.ready.promise = function (e) {
        if (!r)
            if (r = me.Deferred(), "complete" === g.readyState) setTimeout(me.ready);
            else if (g.addEventListener) g.addEventListener("DOMContentLoaded", L, !1), h.addEventListener("load", L, !1);
        else {
            g.attachEvent("onreadystatechange", L), h.attachEvent("onload", L);
            var t = !1;
            try {
                t = null == h.frameElement && g.documentElement
            } catch (y) {}
            t && t.doScroll && function n() {
                if (!me.isReady) {
                    try {
                        t.doScroll("left")
                    } catch (h) {
                        return setTimeout(n, 50)
                    }
                    H(), me.ready()
                }
            }()
        }
        return r.promise(e)
    }, me.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        o["[object " + t + "]"] = t.toLowerCase()
    }), n = me(g);
    var M = {};
    me.Callbacks = function (i) {
        i = "string" == typeof i ? M[i] || function e(e) {
            var n = M[e] = {};
            return me.each(e.match(E) || [], function (e, t) {
                n[t] = !0
            }), n
        }(i) : me.extend({}, i);
        var o, t, n, a, r, s, l = [],
            u = !i.once && [],
            c = function (e) {
                for (t = i.memory && e, n = !0, r = s || 0, s = 0, a = l.length, o = !0; l && r < a; r++)
                    if (!1 === l[r].apply(e[0], e[1]) && i.stopOnFalse) {
                        t = !1;
                        break
                    }
                o = !1, l && (u ? u.length && c(u.shift()) : t ? l = [] : f.disable())
            },
            f = {
                add: function () {
                    if (l) {
                        var e = l.length;
                        (function r(e) {
                            me.each(e, function (e, t) {
                                var n = me.type(t);
                                "function" === n ? i.unique && f.has(t) || l.push(t) : t && t.length && "string" !== n && r(t)
                            })
                        })(arguments), o ? a = l.length : t && (s = e, c(t))
                    }
                    return this
                }, remove: function () {
                    return l && me.each(arguments, function (e, t) {
                        for (var n; - 1 < (n = me.inArray(t, l, n));) l.splice(n, 1), o && (n <= a && a--, n <= r && r--)
                    }), this
                }, has: function (e) {
                    return e ? -1 < me.inArray(e, l) : !(!l || !l.length)
                }, empty: function () {
                    return l = [], this
                }, disable: function () {
                    return l = u = t = k, this
                }, disabled: function () {
                    return !l
                }, lock: function () {
                    return u = k, t || f.disable(), this
                }, locked: function () {
                    return !u
                }, fireWith: function (e, t) {
                    return t = [e, (t = t || []).slice ? t.slice() : t], !l || n && !u || (o ? u.push(t) : c(t)), this
                }, fire: function () {
                    return f.fireWith(this, arguments), this
                }, fired: function () {
                    return !!n
                }
            };
        return f
    }, me.extend({
        Deferred: function (e) {
            var a = [
                    ["resolve", "done", me.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", me.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", me.Callbacks("memory")]
                ],
                i = "pending",
                s = {
                    state: function () {
                        return i
                    }, always: function () {
                        return l.done(arguments).fail(arguments), this
                    }, then: function () {
                        var o = arguments;
                        return me.Deferred(function (i) {
                            me.each(a, function (e, t) {
                                var n = t[0],
                                    r = me.isFunction(o[e]) && o[e];
                                l[t[1]](function () {
                                    var e = r && r.apply(this, arguments);
                                    e && me.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[n + "With"](this === s ? i.promise() : this, r ? [e] : arguments)
                                })
                            }), o = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? me.extend(e, s) : s
                    }
                },
                l = {};
            return s.pipe = s.then, me.each(a, function (e, t) {
                var n = t[2],
                    r = t[3];
                s[t[1]] = n.add, r && n.add(function () {
                    i = r
                }, a[1 ^ e][2].disable, a[2][2].lock), l[t[0]] = function () {
                    return l[t[0] + "With"](this === l ? s : this, arguments), this
                }, l[t[0] + "With"] = n.fireWith
            }), s.promise(l), e && e.call(l, l), l
        }, when: function (e) {
            var i, t, n, r = 0,
                o = p.call(arguments),
                a = o.length,
                s = 1 !== a || e && me.isFunction(e.promise) ? a : 0,
                l = 1 === s ? e : me.Deferred(),
                u = function (t, n, r) {
                    return function (e) {
                        n[t] = this, r[t] = 1 < arguments.length ? p.call(arguments) : e, r === i ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                    }
                };
            if (1 < a)
                for (i = Array(a), t = Array(a), n = Array(a); r < a; r++) o[r] && me.isFunction(o[r].promise) ? o[r].promise().done(u(r, n, o)).fail(l.reject).progress(u(r, t, i)) : --s;
            return s || l.resolveWith(n, o), l.promise()
        }
    }), me.support = function () {
        var o, e, t, n, r, i, a, s, l, u, c = g.createElement("div");
        if (c.setAttribute("className", "t"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = c.getElementsByTagName("*"), t = c.getElementsByTagName("a")[0], !e || !t || !e.length) return {};
        a = (r = g.createElement("select")).appendChild(g.createElement("option")), n = c.getElementsByTagName("input")[0], t.style.cssText = "top:1px;float:left;opacity:.5", o = {
            getSetAttribute: "t" !== c.className,
            leadingWhitespace: 3 === c.firstChild.nodeType,
            tbody: !c.getElementsByTagName("tbody").length,
            htmlSerialize: !!c.getElementsByTagName("link").length,
            style: /top/.test(t.getAttribute("style")),
            hrefNormalized: "/a" === t.getAttribute("href"),
            opacity: /^0.5/.test(t.style.opacity),
            cssFloat: !!t.style.cssFloat,
            checkOn: !!n.value,
            optSelected: a.selected,
            enctype: !!g.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== g.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === g.compatMode,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, n.checked = !0, o.noCloneChecked = n.cloneNode(!0).checked, r.disabled = !0, o.optDisabled = !a.disabled;
        try {
            delete c.test
        } catch (p) {
            o.deleteExpando = !1
        }
        for (u in (n = g.createElement("input")).setAttribute("value", ""), o.input = "" === n.getAttribute("value"), n.value = "t", n.setAttribute("type", "radio"), o.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), (i = g.createDocumentFragment()).appendChild(n), o.appendChecked = n.checked, o.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, c.attachEvent && (c.attachEvent("onclick", function () {
            o.noCloneEvent = !1
        }), c.cloneNode(!0).click()), {
            submit: !0,
            change: !0,
            focusin: !0
        }) c.setAttribute(s = "on" + u, "t"), o[u + "Bubbles"] = s in h || !1 === c.attributes[s].expando;
        return c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === c.style.backgroundClip, me(function () {
            var e, t, n, r = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                i = g.getElementsByTagName("body")[0];
            i && ((e = g.createElement("div")).style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", i.appendChild(e).appendChild(c), c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", (n = c.getElementsByTagName("td"))[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === n[0].offsetHeight, n[0].style.display = "", n[1].style.display = "none", o.reliableHiddenOffsets = l && 0 === n[0].offsetHeight, c.innerHTML = "", c.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", o.boxSizing = 4 === c.offsetWidth, o.doesNotIncludeMarginInBodyOffset = 1 !== i.offsetTop, h.getComputedStyle && (o.pixelPosition = "1%" !== (h.getComputedStyle(c, null) || {}).top, o.boxSizingReliable = "4px" === (h.getComputedStyle(c, null) || {
                width: "4px"
            }).width, (t = c.appendChild(g.createElement("div"))).style.cssText = c.style.cssText = r, t.style.marginRight = t.style.width = "0", c.style.width = "1px", o.reliableMarginRight = !parseFloat((h.getComputedStyle(t, null) || {}).marginRight)), typeof c.style.zoom !== y && (c.innerHTML = "", c.style.cssText = r + "width:1px;padding:1px;display:inline;zoom:1", o.inlineBlockNeedsLayout = 3 === c.offsetWidth, c.style.display = "block", c.innerHTML = "<div></div>", c.firstChild.style.width = "5px", o.shrinkWrapBlocks = 3 !== c.offsetWidth, o.inlineBlockNeedsLayout && (i.style.zoom = 1)), i.removeChild(e), e = c = n = t = null)
        }), e = r = i = a = t = n = null, o
    }();
    var q = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        O = /([A-Z])/g;

    function F(e, t, n, r) {
        if (me.acceptData(e)) {
            var i, o, a = me.expando,
                s = "string" == typeof t,
                l = e.nodeType,
                u = l ? me.cache : e,
                c = l ? e[a] : e[a] && a;
            if (c && u[c] && (r || u[c].data) || !s || n !== k) return c || (l ? e[a] = c = A.pop() || me.guid++ : c = a), u[c] || (u[c] = {}, l || (u[c].toJSON = me.noop)), ("object" == typeof t || "function" == typeof t) && (r ? u[c] = me.extend(u[c], t) : u[c].data = me.extend(u[c].data, t)), i = u[c], r || (i.data || (i.data = {}), i = i.data), n !== k && (i[me.camelCase(t)] = n), s ? null == (o = i[t]) && (o = i[me.camelCase(t)]) : o = i, o
        }
    }

    function B(e, t, n) {
        if (me.acceptData(e)) {
            var r, i, o, a = e.nodeType,
                s = a ? me.cache : e,
                l = a ? e[me.expando] : me.expando;
            if (s[l]) {
                if (t && (o = n ? s[l] : s[l].data)) {
                    me.isArray(t) ? t = t.concat(me.map(t, me.camelCase)) : t in o ? t = [t] : t = (t = me.camelCase(t)) in o ? [t] : t.split(" ");
                    for (r = 0, i = t.length; r < i; r++) delete o[t[r]];
                    if (!(n ? P : me.isEmptyObject)(o)) return
                }(n || (delete s[l].data, P(s[l]))) && (a ? me.cleanData([e], !0) : me.support.deleteExpando || s != s.window ? delete s[l] : s[l] = null)
            }
        }
    }

    function R(e, t, n) {
        if (n === k && 1 === e.nodeType) {
            var r = "data-" + t.replace(O, "-$1").toLowerCase();
            if ("string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : q.test(n) ? me.parseJSON(n) : n)
                } catch (g) {}
                me.data(e, t, n)
            } else n = k
        }
        return n
    }

    function P(e) {
        var t;
        for (t in e)
            if (("data" !== t || !me.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }
    me.extend({
        cache: {},
        expando: "jQuery" + (a + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (e) {
            return !!(e = e.nodeType ? me.cache[e[me.expando]] : e[me.expando]) && !P(e)
        }, data: function (e, t, n) {
            return F(e, t, n)
        }, removeData: function (e, t) {
            return B(e, t)
        }, _data: function (e, t, n) {
            return F(e, t, n, !0)
        }, _removeData: function (e, t) {
            return B(e, t, !0)
        }, acceptData: function (e) {
            if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
            var t = e.nodeName && me.noData[e.nodeName.toLowerCase()];
            return !t || !0 !== t && e.getAttribute("classid") === t
        }
    }), me.fn.extend({
        data: function (t, e) {
            var n, r, i = this[0],
                o = 0,
                a = null;
            if (t === k) {
                if (this.length && (a = me.data(i), 1 === i.nodeType && !me._data(i, "parsedAttrs"))) {
                    for (n = i.attributes; n.length > o; o++)(r = n[o].name).indexOf("data-") || (r = me.camelCase(r.slice(5)), R(i, r, a[r]));
                    me._data(i, "parsedAttrs", !0)
                }
                return a
            }
            return "object" == typeof t ? this.each(function () {
                me.data(this, t)
            }) : me.access(this, function (e) {
                return e === k ? i ? R(i, t, me.data(i, t)) : null : (this.each(function () {
                    me.data(this, t, e)
                }), k)
            }, null, e, 1 < arguments.length, null, !0)
        }, removeData: function (e) {
            return this.each(function () {
                me.removeData(this, e)
            })
        }
    }), me.extend({
        queue: function (e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = me._data(e, t), n && (!r || me.isArray(n) ? r = me._data(e, t, me.makeArray(n)) : r.push(n)), r || []) : k
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = me.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = me._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(), r--), (o.cur = i) && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
                me.dequeue(e, t)
            }, o)), !r && o && o.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return me._data(e, n) || me._data(e, n, {
                empty: me.Callbacks("once memory").add(function () {
                    me._removeData(e, t + "queue"), me._removeData(e, n)
                })
            })
        }
    }), me.fn.extend({
        queue: function (t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), e > arguments.length ? me.queue(this[0], t) : n === k ? this : this.each(function () {
                var e = me.queue(this, t, n);
                me._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && me.dequeue(this, t)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                me.dequeue(this, e)
            })
        }, delay: function (r, e) {
            return r = me.fx && me.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) {
                var n = setTimeout(e, r);
                t.stop = function () {
                    clearTimeout(n)
                }
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, r = 1,
                i = me.Deferred(),
                o = this,
                a = this.length,
                s = function () {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = k), e = e || "fx"; a--;)(n = me._data(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var I, W, $ = /[\t\r\n]/g,
        z = /\r/g,
        X = /^(?:input|select|textarea|button|object)$/i,
        U = /^(?:a|area)$/i,
        J = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
        V = /^(?:checked|selected)$/i,
        Y = me.support.getSetAttribute,
        Q = me.support.input;
    me.fn.extend({
        attr: function (e, t) {
            return me.access(this, me.attr, e, t, 1 < arguments.length)
        }, removeAttr: function (e) {
            return this.each(function () {
                me.removeAttr(this, e)
            })
        }, prop: function (e, t) {
            return me.access(this, me.prop, e, t, 1 < arguments.length)
        }, removeProp: function (e) {
            return e = me.propFix[e] || e, this.each(function () {
                try {
                    this[e] = k, delete this[e]
                } catch (r) {}
            })
        }, addClass: function (t) {
            var e, n, r, i, o, a = 0,
                s = this.length,
                l = "string" == typeof t && t;
            if (me.isFunction(t)) return this.each(function (e) {
                me(this).addClass(t.call(this, e, this.className))
            });
            if (l)
                for (e = (t || "").match(E) || []; a < s; a++)
                    if (r = 1 === (n = this[a]).nodeType && (n.className ? (" " + n.className + " ").replace($, " ") : " ")) {
                        for (o = 0; i = e[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        n.className = me.trim(r)
                    }
            return this
        }, removeClass: function (t) {
            var e, n, r, i, o, a = 0,
                s = this.length,
                l = 0 === arguments.length || "string" == typeof t && t;
            if (me.isFunction(t)) return this.each(function (e) {
                me(this).removeClass(t.call(this, e, this.className))
            });
            if (l)
                for (e = (t || "").match(E) || []; a < s; a++)
                    if (r = 1 === (n = this[a]).nodeType && (n.className ? (" " + n.className + " ").replace($, " ") : "")) {
                        for (o = 0; i = e[o++];)
                            for (; 0 <= r.indexOf(" " + i + " ");) r = r.replace(" " + i + " ", " ");
                        n.className = t ? me.trim(r) : ""
                    }
            return this
        }, toggleClass: function (o, a) {
            var s = typeof o,
                l = "boolean" == typeof a;
            return me.isFunction(o) ? this.each(function (e) {
                me(this).toggleClass(o.call(this, e, this.className, a), a)
            }) : this.each(function () {
                if ("string" === s)
                    for (var e, t = 0, n = me(this), r = a, i = o.match(E) || []; e = i[t++];) r = l ? r : !n.hasClass(e), n[r ? "addClass" : "removeClass"](e);
                else(s === y || "boolean" === s) && (this.className && me._data(this, "__className__", this.className), this.className = this.className || !1 === o ? "" : me._data(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, r = this.length; n < r; n++)
                if (1 === this[n].nodeType && 0 <= (" " + this[n].className + " ").replace($, " ").indexOf(t)) return !0;
            return !1
        }, val: function (r) {
            var e, i, o, t = this[0];
            return arguments.length ? (o = me.isFunction(r), this.each(function (e) {
                var t, n = me(this);
                1 === this.nodeType && (null == (t = o ? r.call(this, e, n.val()) : r) ? t = "" : "number" == typeof t ? t += "" : me.isArray(t) && (t = me.map(t, function (e) {
                    return null == e ? "" : e + ""
                })), (i = me.valHooks[this.type] || me.valHooks[this.nodeName.toLowerCase()]) && "set" in i && i.set(this, t, "value") !== k || (this.value = t))
            })) : t ? (i = me.valHooks[t.type] || me.valHooks[t.nodeName.toLowerCase()]) && "get" in i && (e = i.get(t, "value")) !== k ? e : "string" == typeof (e = t.value) ? e.replace(z, "") : null == e ? "" : e : void 0
        }
    }), me.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function (e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, l = i < 0 ? s : o ? i : 0; l < s; l++)
                        if (!(!(n = r[l]).selected && l !== i || (me.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && me.nodeName(n.parentNode, "optgroup"))) {
                            if (t = me(n).val(), o) return t;
                            a.push(t)
                        }
                    return a
                }, set: function (e, t) {
                    var n = me.makeArray(t);
                    return me(e).find("option").each(function () {
                        this.selected = 0 <= me.inArray(me(this).val(), n)
                    }), n.length || (e.selectedIndex = -1), n
                }
            }
        },
        attr: function (e, t, n) {
            var r, i, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === y ? me.prop(e, t, n) : ((i = 1 !== a || !me.isXMLDoc(e)) && (t = t.toLowerCase(), r = me.attrHooks[t] || (J.test(t) ? W : I)), n === k ? r && i && "get" in r && null !== (o = r.get(e, t)) ? o : (typeof e.getAttribute !== y && (o = e.getAttribute(t)), null == o ? k : o) : null !== n ? r && i && "set" in r && (o = r.set(e, n, t)) !== k ? o : (e.setAttribute(t, n + ""), n) : (me.removeAttr(e, t), k))
        }, removeAttr: function (e, t) {
            var n, r, i = 0,
                o = t && t.match(E);
            if (o && 1 === e.nodeType)
                for (; n = o[i++];) r = me.propFix[n] || n, J.test(n) ? !Y && V.test(n) ? e[me.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : me.attr(e, n, ""), e.removeAttribute(Y ? n : r)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!me.support.radioValue && "radio" === t && me.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }, propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, prop: function (e, t, n) {
            var r, i, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return (1 !== o || !me.isXMLDoc(e)) && (t = me.propFix[t] || t, i = me.propHooks[t]), n !== k ? i && "set" in i && (r = i.set(e, n, t)) !== k ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = e.getAttributeNode("tabindex");
                    return t && t.specified ? parseInt(t.value, 10) : X.test(e.nodeName) || U.test(e.nodeName) && e.href ? 0 : k
                }
            }
        }
    }), W = {
        get: function (e, t) {
            var n = me.prop(e, t),
                r = "boolean" == typeof n && e.getAttribute(t),
                i = "boolean" == typeof n ? Q && Y ? null != r : V.test(t) ? e[me.camelCase("default-" + t)] : !!r : e.getAttributeNode(t);
            return i && !1 !== i.value ? t.toLowerCase() : k
        }, set: function (e, t, n) {
            return !1 === t ? me.removeAttr(e, n) : Q && Y || !V.test(n) ? e.setAttribute(!Y && me.propFix[n] || n, n) : e[me.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, Q && Y || (me.attrHooks.value = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            return me.nodeName(e, "input") ? e.defaultValue : n && n.specified ? n.value : k
        }, set: function (e, t, n) {
            return me.nodeName(e, "input") ? (e.defaultValue = t, k) : I && I.set(e, t, n)
        }
    }), Y || (I = me.valHooks.button = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            return n && ("id" === t || "name" === t || "coords" === t ? "" !== n.value : n.specified) ? n.value : k
        }, set: function (e, t, n) {
            var r = e.getAttributeNode(n);
            return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : k
        }
    }, me.attrHooks.contenteditable = {
        get: I.get,
        set: function (e, t, n) {
            I.set(e, "" !== t && t, n)
        }
    }, me.each(["width", "height"], function (e, n) {
        me.attrHooks[n] = me.extend(me.attrHooks[n], {
            set: function (e, t) {
                return "" === t ? (e.setAttribute(n, "auto"), t) : k
            }
        })
    })), me.support.hrefNormalized || (me.each(["href", "src", "width", "height"], function (e, n) {
        me.attrHooks[n] = me.extend(me.attrHooks[n], {
            get: function (e) {
                var t = e.getAttribute(n, 2);
                return null == t ? k : t
            }
        })
    }), me.each(["href", "src"], function (e, t) {
        me.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    })), me.support.style || (me.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || k
        }, set: function (e, t) {
            return e.style.cssText = t + ""
        }
    }), me.support.optSelected || (me.propHooks.selected = me.extend(me.propHooks.selected, {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), me.support.enctype || (me.propFix.enctype = "encoding"), me.support.checkOn || me.each(["radio", "checkbox"], function () {
        me.valHooks[this] = {
            get: function (e) {
                return null === e.getAttribute("value") ? "on" : e.value
            }
        }
    }), me.each(["radio", "checkbox"], function () {
        me.valHooks[this] = me.extend(me.valHooks[this], {
            set: function (e, t) {
                return me.isArray(t) ? e.checked = 0 <= me.inArray(me(e).val(), t) : k
            }
        })
    });
    var G = /^(?:input|select|textarea)$/i,
        K = /^key/,
        Z = /^(?:mouse|contextmenu)|click/,
        ye = /^(?:focusinfocus|focusoutblur)$/,
        ee = /^([^.]*)(?:\.(.+)|)$/;

    function te() {
        return !0
    }

    function ne() {
        return !1
    }
    me.event = {
            global: {},
            add: function (e, t, n, r, i) {
                var o, a, s, l, u, c, f, p, d, h, g, m = me._data(e);
                if (m) {
                    for (n.handler && (n = (l = n).handler, i = l.selector), n.guid || (n.guid = me.guid++), (a = m.events) || (a = m.events = {}), (c = m.handle) || ((c = m.handle = function (e) {
                        return typeof me === y || e && me.event.triggered === e.type ? k : me.event.dispatch.apply(c.elem, arguments)
                    }).elem = e), s = (t = (t || "").match(E) || [""]).length; s--;) d = g = (o = ee.exec(t[s]) || [])[1], h = (o[2] || "").split(".").sort(), u = me.event.special[d] || {}, d = (i ? u.delegateType : u.bindType) || d, u = me.event.special[d] || {}, f = me.extend({
                        type: d,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && me.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, l), (p = a[d]) || ((p = a[d] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, r, h, c) || (e.addEventListener ? e.addEventListener(d, c, !1) : e.attachEvent && e.attachEvent("on" + d, c))), u.add && (u.add.call(e, f), f.handler.guid || (f.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, f) : p.push(f), me.event.global[d] = !0;
                    e = null
                }
            }, remove: function (e, t, n, r, i) {
                var o, a, s, l, u, c, f, p, d, h, g, m = me.hasData(e) && me._data(e);
                if (m && (c = m.events)) {
                    for (u = (t = (t || "").match(E) || [""]).length; u--;)
                        if (d = g = (s = ee.exec(t[u]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
                            for (f = me.event.special[d] || {}, p = c[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = p.length; o--;) a = p[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, f.remove && f.remove.call(e, a));
                            l && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, m.handle) || me.removeEvent(e, d, m.handle), delete c[d])
                        } else
                            for (d in c) me.event.remove(e, d + t[u], n, r, !0);
                    me.isEmptyObject(c) && (delete m.handle, me._removeData(e, "events"))
                }
            }, trigger: function (e, t, n, r) {
                var i, o, a, s, l, u, c, f = [n || g],
                    p = m.call(e, "type") ? e.type : e,
                    d = m.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = u = n = n || g, 3 !== n.nodeType && 8 !== n.nodeType && !ye.test(p + me.event.triggered) && (0 <= p.indexOf(".") && (p = (d = p.split(".")).shift(), d.sort()), o = p.indexOf(":") < 0 && "on" + p, (e = e[me.expando] ? e : new me.Event(p, "object" == typeof e && e)).isTrigger = !0, e.namespace = d.join("."), e.namespace_re = e.namespace ? RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = k, e.target || (e.target = n), t = null == t ? [e] : me.makeArray(t, [e]), l = me.event.special[p] || {}, r || !l.trigger || !1 !== l.trigger.apply(n, t))) {
                    if (!r && !l.noBubble && !me.isWindow(n)) {
                        for (s = l.delegateType || p, ye.test(s + p) || (a = a.parentNode); a; a = a.parentNode) f.push(a), u = a;
                        u === (n.ownerDocument || g) && f.push(u.defaultView || u.parentWindow || h)
                    }
                    for (c = 0;
                        (a = f[c++]) && !e.isPropagationStopped();) e.type = 1 < c ? s : l.bindType || p, (i = (me._data(a, "events") || {})[e.type] && me._data(a, "handle")) && i.apply(a, t), (i = o && a[o]) && me.acceptData(a) && i.apply && !1 === i.apply(a, t) && e.preventDefault();
                    if (e.type = p, !(r || e.isDefaultPrevented() || l._default && !1 !== l._default.apply(n.ownerDocument, t) || "click" === p && me.nodeName(n, "a")) && me.acceptData(n) && o && n[p] && !me.isWindow(n)) {
                        (u = n[o]) && (n[o] = null), me.event.triggered = p;
                        try {
                            n[p]()
                        } catch (b) {}
                        me.event.triggered = k, u && (n[o] = u)
                    }
                    return e.result
                }
            }, dispatch: function (e) {
                e = me.event.fix(e);
                var t, n, r, i, o, a = [],
                    s = p.call(arguments),
                    l = (me._data(this, "events") || {})[e.type] || [],
                    u = me.event.special[e.type] || {};
                if ((s[0] = e).delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                    for (a = me.event.handlers.call(this, e, l), t = 0;
                        (i = a[t++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = i.elem, o = 0;
                            (r = i.handlers[o++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, (n = ((me.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, s)) !== k && !1 === (e.result = n) && (e.preventDefault(), e.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, e), e.result
                }
            }, handlers: function (e, t) {
                var n, r, i, o, a = [],
                    s = t.delegateCount,
                    l = e.target;
                if (s && l.nodeType && (!e.button || "click" !== e.type))
                    for (; l != this; l = l.parentNode || this)
                        if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                            for (i = [], o = 0; o < s; o++) i[n = (r = t[o]).selector + " "] === k && (i[n] = r.needsContext ? 0 <= me(n, this).index(l) : me.find(n, this, null, [l]).length), i[n] && i.push(r);
                            i.length && a.push({
                                elem: l,
                                handlers: i
                            })
                        }
                return t.length > s && a.push({
                    elem: this,
                    handlers: t.slice(s)
                }), a
            }, fix: function (e) {
                if (e[me.expando]) return e;
                var t, n, r, i = e.type,
                    o = e,
                    a = this.fixHooks[i];
                for (a || (this.fixHooks[i] = a = Z.test(i) ? this.mouseHooks : K.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new me.Event(o), t = r.length; t--;) e[n = r[t]] = o[n];
                return e.target || (e.target = o.srcElement || g), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
            }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (e, t) {
                    var n, r, i, o = t.button,
                        a = t.fromElement;
                    return null == e.pageX && null != t.clientX && (i = (r = e.target.ownerDocument || g).documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || o === k || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    trigger: function () {
                        return me.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : k
                    }
                },
                focus: {
                    trigger: function () {
                        if (this !== g.activeElement && this.focus) try {
                            return this.focus(), !1
                        } catch (h) {}
                    }, delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        return this === g.activeElement && this.blur ? (this.blur(), !1) : k
                    }, delegateType: "focusout"
                },
                beforeunload: {
                    postDispatch: function (e) {
                        e.result !== k && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function (e, t, n, r) {
                var i = me.extend(new me.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                r ? me.event.trigger(i, null, t) : me.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
            }
        }, me.removeEvent = g.removeEventListener ? function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        } : function (e, t, n) {
            var r = "on" + t;
            e.detachEvent && (typeof e[r] === y && (e[r] = null), e.detachEvent(r, n))
        }, me.Event = function (e, t) {
            return this instanceof me.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || !1 === e.returnValue || e.getPreventDefault && e.getPreventDefault() ? te : ne) : this.type = e, t && me.extend(this, t), this.timeStamp = e && e.timeStamp || me.now(), this[me.expando] = !0, k) : new me.Event(e, t)
        }, me.Event.prototype = {
            isDefaultPrevented: ne,
            isPropagationStopped: ne,
            isImmediatePropagationStopped: ne,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = te, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            }, stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = te, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            }, stopImmediatePropagation: function () {
                this.isImmediatePropagationStopped = te, this.stopPropagation()
            }
        }, me.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function (e, i) {
            me.event.special[e] = {
                delegateType: i,
                bindType: i,
                handle: function (e) {
                    var t, n = e.relatedTarget,
                        r = e.handleObj;
                    return (!n || n !== this && !me.contains(this, n)) && (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t
                }
            }
        }), me.support.submitBubbles || (me.event.special.submit = {
            setup: function () {
                return !me.nodeName(this, "form") && (me.event.add(this, "click._submit keypress._submit", function (e) {
                    var t = e.target,
                        n = me.nodeName(t, "input") || me.nodeName(t, "button") ? t.form : k;
                    n && !me._data(n, "submitBubbles") && (me.event.add(n, "submit._submit", function (e) {
                        e._submit_bubble = !0
                    }), me._data(n, "submitBubbles", !0))
                }), k)
            }, postDispatch: function (e) {
                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && me.event.simulate("submit", this.parentNode, e, !0))
            }, teardown: function () {
                return !me.nodeName(this, "form") && (me.event.remove(this, "._submit"), k)
            }
        }), me.support.changeBubbles || (me.event.special.change = {
            setup: function () {
                return G.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (me.event.add(this, "propertychange._change", function (e) {
                    "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                }), me.event.add(this, "click._change", function (e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1), me.event.simulate("change", this, e, !0)
                })), !1) : (me.event.add(this, "beforeactivate._change", function (e) {
                    var t = e.target;
                    G.test(t.nodeName) && !me._data(t, "changeBubbles") && (me.event.add(t, "change._change", function (e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || me.event.simulate("change", this.parentNode, e, !0)
                    }), me._data(t, "changeBubbles", !0))
                }), k)
            }, handle: function (e) {
                var t = e.target;
                return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : k
            }, teardown: function () {
                return me.event.remove(this, "._change"), !G.test(this.nodeName)
            }
        }), me.support.focusinBubbles || me.each({
            focus: "focusin",
            blur: "focusout"
        }, function (e, t) {
            var n = 0,
                r = function (e) {
                    me.event.simulate(t, e.target, me.event.fix(e), !0)
                };
            me.event.special[t] = {
                setup: function () {
                    0 == n++ && g.addEventListener(e, r, !0)
                }, teardown: function () {
                    0 == --n && g.removeEventListener(e, r, !0)
                }
            }
        }), me.fn.extend({
            on: function (e, t, n, r, i) {
                var o, a;
                if ("object" == typeof e) {
                    for (o in "string" != typeof t && (n = n || t, t = k), e) this.on(o, t, n, e[o], i);
                    return this
                }
                if (null == n && null == r ? (r = t, n = t = k) : null == r && ("string" == typeof t ? (r = n, n = k) : (r = n, n = t, t = k)), !1 === r) r = ne;
                else if (!r) return this;
                return 1 === i && (a = r, (r = function (e) {
                    return me().off(e), a.apply(this, arguments)
                }).guid = a.guid || (a.guid = me.guid++)), this.each(function () {
                    me.event.add(this, e, r, n, t)
                })
            }, one: function (e, t, n, r) {
                return this.on(e, t, n, r, 1)
            }, off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj) return r = e.handleObj, me(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof e) {
                    for (i in e) this.off(i, t, e[i]);
                    return this
                }
                return (!1 === t || "function" == typeof t) && (n = t, t = k), !1 === n && (n = ne), this.each(function () {
                    me.event.remove(this, e, n, t)
                })
            }, bind: function (e, t, n) {
                return this.on(e, null, t, n)
            }, unbind: function (e, t) {
                return this.off(e, null, t)
            }, delegate: function (e, t, n, r) {
                return this.on(t, e, n, r)
            }, undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }, trigger: function (e, t) {
                return this.each(function () {
                    me.event.trigger(e, t, this)
                })
            }, triggerHandler: function (e, t) {
                var n = this[0];
                return n ? me.event.trigger(e, t, n, !0) : k
            }
        }),
        function (n, r) {
            var i, T, w, o, t, g, u, C, m, N, a, y, v, s, c, b, f, x = "sizzle" + -new Date,
                k = n.document,
                A = {},
                E = 0,
                p = 0,
                l = ee(),
                d = ee(),
                h = ee(),
                S = typeof r,
                e = [],
                j = e.pop,
                D = e.push,
                L = e.slice,
                H = e.indexOf || function (e) {
                    for (var t = 0, n = this.length; t < n; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                _ = "[\\x20\\t\\r\\n\\f]",
                M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                q = M.replace("w", "w#"),
                O = "\\[" + _ + "*(" + M + ")" + _ + "*(?:([*^$|!~]?=)" + _ + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + q + ")|)|)" + _ + "*\\]",
                F = ":(" + M + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + O.replace(3, 8) + ")*)|.*)\\)|)",
                B = RegExp("^" + _ + "+|((?:^|[^\\\\])(?:\\\\.)*)" + _ + "+$", "g"),
                R = RegExp("^" + _ + "*," + _ + "*"),
                P = RegExp("^" + _ + "*([\\x20\\t\\r\\n\\f>+~])" + _ + "*"),
                I = RegExp(F),
                W = RegExp("^" + q + "$"),
                $ = {
                    ID: RegExp("^#(" + M + ")"),
                    CLASS: RegExp("^\\.(" + M + ")"),
                    NAME: RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
                    TAG: RegExp("^(" + M.replace("w", "w*") + ")"),
                    ATTR: RegExp("^" + O),
                    PSEUDO: RegExp("^" + F),
                    CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + _ + "*(even|odd|(([+-]|)(\\d*)n|)" + _ + "*(?:([+-]|)" + _ + "*(\\d+)|))" + _ + "*\\)|)", "i"),
                    needsContext: RegExp("^" + _ + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + _ + "*((?:-\\d)?\\d*)" + _ + "*\\)|)(?=[^-]|$)", "i")
                },
                z = /[\x20\t\r\n\f]*[+~]/,
                X = /^[^{]+\{\s*\[native code/,
                U = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                J = /^(?:input|select|textarea|button)$/i,
                V = /^h\d$/i,
                Y = /'|\\/g,
                Q = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                G = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
                K = function (e, t) {
                    var n = "0x" + t - 65536;
                    return n != n ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)
                };
            try {
                L.call(k.documentElement.childNodes, 0)[0].nodeType
            } catch (ye) {
                L = function (e) {
                    for (var t, n = []; t = this[e++];) n.push(t);
                    return n
                }
            }

            function Z(e) {
                return X.test(e + "")
            }

            function ee() {
                var n, r = [];
                return n = function (e, t) {
                    return r.push(e += " ") > w.cacheLength && delete n[r.shift()], n[e] = t
                }
            }

            function te(e) {
                return e[x] = !0, e
            }

            function ne(e) {
                var t = N.createElement("div");
                try {
                    return e(t)
                } catch (i) {
                    return !1
                } finally {
                    t = null
                }
            }

            function re(e, t, n, r) {
                var i, o, a, s, l, u, c, f, p, d;
                if ((t ? t.ownerDocument || t : k) !== N && m(t), n = n || [], !e || "string" != typeof e) return n;
                if (1 !== (s = (t = t || N).nodeType) && 9 !== s) return [];
                if (!y && !r) {
                    if (i = U.exec(e))
                        if (a = i[1]) {
                            if (9 === s) {
                                if (!(o = t.getElementById(a)) || !o.parentNode) return n;
                                if (o.id === a) return n.push(o), n
                            } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && b(t, o) && o.id === a) return n.push(o), n
                        } else {
                            if (i[2]) return D.apply(n, L.call(t.getElementsByTagName(e), 0)), n;
                            if ((a = i[3]) && A.getByClassName && t.getElementsByClassName) return D.apply(n, L.call(t.getElementsByClassName(a), 0)), n
                        }
                    if (A.qsa && !v.test(e)) {
                        if (c = !0, f = x, p = t, d = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                            for (u = le(e), (c = t.getAttribute("id")) ? f = c.replace(Y, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = u.length; l--;) u[l] = f + ue(u[l]);
                            p = z.test(e) && t.parentNode || t, d = u.join(",")
                        }
                        if (d) try {
                            return D.apply(n, L.call(p.querySelectorAll(d), 0)), n
                        } catch (me) {} finally {
                            c || t.removeAttribute("id")
                        }
                    }
                }
                return function h(e, t, n, r) {
                    var i, o, a, s, l, u = le(e);
                    if (!r && 1 === u.length) {
                        if (2 < (o = u[0] = u[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && !y && w.relative[o[1].type]) {
                            if (!(t = w.find.ID(a.matches[0].replace(G, K), t)[0])) return n;
                            e = e.slice(o.shift().value.length)
                        }
                        for (i = $.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !w.relative[s = a.type]);)
                            if ((l = w.find[s]) && (r = l(a.matches[0].replace(G, K), z.test(o[0].type) && t.parentNode || t))) {
                                if (o.splice(i, 1), !(e = r.length && ue(o))) return D.apply(n, L.call(r, 0)), n;
                                break
                            }
                    }
                    return g(e, u)(r, t, y, n, z.test(e)), n
                }(e.replace(B, "$1"), t, n, r)
            }

            function ie(e, t) {
                var n = t && e,
                    r = n && (~t.sourceIndex || 1 << 31) - (~e.sourceIndex || 1 << 31);
                if (r) return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function oe(t) {
                return function (e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }

            function ae(n) {
                return function (e) {
                    var t = e.nodeName.toLowerCase();
                    return ("input" === t || "button" === t) && e.type === n
                }
            }

            function se(a) {
                return te(function (o) {
                    return o = +o, te(function (e, t) {
                        for (var n, r = a([], e.length, o), i = r.length; i--;) e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                    })
                })
            }
            for (i in t = re.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }, m = re.setDocument = function (e) {
                var l = e ? e.ownerDocument || e : k;
                return l !== N && 9 === l.nodeType && l.documentElement && (a = (N = l).documentElement, y = t(l), A.tagNameNoComments = ne(function (e) {
                    return e.appendChild(l.createComment("")), !e.getElementsByTagName("*").length
                }), A.attributes = ne(function (e) {
                    e.innerHTML = "<select></select>";
                    var t = typeof e.lastChild.getAttribute("multiple");
                    return "boolean" !== t && "string" !== t
                }), A.getByClassName = ne(function (e) {
                    return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !(!e.getElementsByClassName || !e.getElementsByClassName("e").length) && (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length)
                }), A.getByName = ne(function (e) {
                    e.id = x + 0, e.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>", a.insertBefore(e, a.firstChild);
                    var t = l.getElementsByName && l.getElementsByName(x).length === 2 + l.getElementsByName(x + 0).length;
                    return A.getIdNotName = !l.getElementById(x), a.removeChild(e), t
                }), w.attrHandle = ne(function (e) {
                    return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== S && "#" === e.firstChild.getAttribute("href")
                }) ? {} : {
                    href: function (e) {
                        return e.getAttribute("href", 2)
                    }, type: function (e) {
                        return e.getAttribute("type")
                    }
                }, A.getIdNotName ? (w.find.ID = function (e, t) {
                    if (typeof t.getElementById !== S && !y) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, w.filter.ID = function (e) {
                    var t = e.replace(G, K);
                    return function (e) {
                        return e.getAttribute("id") === t
                    }
                }) : (w.find.ID = function (e, t) {
                    if (typeof t.getElementById !== S && !y) {
                        var n = t.getElementById(e);
                        return n ? n.id === e || typeof n.getAttributeNode !== S && n.getAttributeNode("id").value === e ? [n] : r : []
                    }
                }, w.filter.ID = function (e) {
                    var n = e.replace(G, K);
                    return function (e) {
                        var t = typeof e.getAttributeNode !== S && e.getAttributeNode("id");
                        return t && t.value === n
                    }
                }), w.find.TAG = A.tagNameNoComments ? function (e, t) {
                    return typeof t.getElementsByTagName !== S ? t.getElementsByTagName(e) : r
                } : function (e, t) {
                    var n, r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, w.find.NAME = A.getByName && function (e, t) {
                    return typeof t.getElementsByName !== S ? t.getElementsByName(name) : r
                }, w.find.CLASS = A.getByClassName && function (e, t) {
                    return typeof t.getElementsByClassName === S || y ? r : t.getElementsByClassName(e)
                }, s = [], v = [":focus"], (A.qsa = Z(l.querySelectorAll)) && (ne(function (e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || v.push("\\[" + _ + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || v.push(":checked")
                }), ne(function (e) {
                    e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && v.push("[*^$]=" + _ + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
                })), (A.matchesSelector = Z(c = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ne(function (e) {
                    A.disconnectedMatch = c.call(e, "div"), c.call(e, "[s!='']:x"), s.push("!=", F)
                }), v = RegExp(v.join("|")), s = RegExp(s.join("|")), b = Z(a.contains) || a.compareDocumentPosition ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function (e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, f = a.compareDocumentPosition ? function (e, t) {
                    var n;
                    return e === t ? (u = !0, 0) : (n = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & n || e.parentNode && 11 === e.parentNode.nodeType ? e === l || b(k, e) ? -1 : t === l || b(k, t) ? 1 : 0 : 4 & n ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                } : function (e, t) {
                    var n, r = 0,
                        i = e.parentNode,
                        o = t.parentNode,
                        a = [e],
                        s = [t];
                    if (e === t) return u = !0, 0;
                    if (!i || !o) return e === l ? -1 : t === l ? 1 : i ? -1 : o ? 1 : 0;
                    if (i === o) return ie(e, t);
                    for (n = e; n = n.parentNode;) a.unshift(n);
                    for (n = t; n = n.parentNode;) s.unshift(n);
                    for (; a[r] === s[r];) r++;
                    return r ? ie(a[r], s[r]) : a[r] === k ? -1 : s[r] === k ? 1 : 0
                }, u = !1, [0, 0].sort(f), A.detectDuplicates = u), N
            }, re.matches = function (e, t) {
                return re(e, null, null, t)
            }, re.matchesSelector = function (e, t) {
                if ((e.ownerDocument || e) !== N && m(e), t = t.replace(Q, "='$1']"), !(!A.matchesSelector || y || s && s.test(t) || v.test(t))) try {
                    var n = c.call(e, t);
                    if (n || A.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                } catch (T) {}
                return 0 < re(t, N, null, [e]).length
            }, re.contains = function (e, t) {
                return (e.ownerDocument || e) !== N && m(e), b(e, t)
            }, re.attr = function (e, t) {
                var n;
                return (e.ownerDocument || e) !== N && m(e), y || (t = t.toLowerCase()), (n = w.attrHandle[t]) ? n(e) : y || A.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && !0 === e[t] ? t : n && n.specified ? n.value : null
            }, re.error = function (e) {
                throw Error("Syntax error, unrecognized expression: " + e)
            }, re.uniqueSort = function (e) {
                var t, n = [],
                    r = 1,
                    i = 0;
                if (u = !A.detectDuplicates, e.sort(f), u) {
                    for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
                    for (; i--;) e.splice(n[i], 1)
                }
                return e
            }, o = re.getText = function (e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                    } else if (3 === i || 4 === i) return e.nodeValue
                } else
                    for (; t = e[r]; r++) n += o(t);
                return n
            }, w = re.selectors = {
                cacheLength: 50,
                createPseudo: te,
                match: $,
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function (e) {
                        return e[1] = e[1].replace(G, K), e[3] = (e[4] || e[5] || "").replace(G, K), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    }, CHILD: function (e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || re.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && re.error(e[0]), e
                    }, PSEUDO: function (e) {
                        var t, n = !e[5] && e[2];
                        return $.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && I.test(n) && (t = le(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (t) {
                        return "*" === t ? function () {
                            return !0
                        } : (t = t.replace(G, K).toLowerCase(), function (e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        })
                    }, CLASS: function (e) {
                        var t = l[e + " "];
                        return t || (t = RegExp("(^|" + _ + ")" + e + "(" + _ + "|$)")) && l(e, function (e) {
                            return t.test(e.className || typeof e.getAttribute !== S && e.getAttribute("class") || "")
                        })
                    }, ATTR: function (n, r, i) {
                        return function (e) {
                            var t = re.attr(e, n);
                            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                        }
                    }, CHILD: function (d, e, t, h, g) {
                        var m = "nth" !== d.slice(0, 3),
                            y = "last" !== d.slice(-4),
                            v = "of-type" === e;
                        return 1 === h && 0 === g ? function (e) {
                            return !!e.parentNode
                        } : function (e, t, n) {
                            var r, i, o, a, s, l, u = m !== y ? "nextSibling" : "previousSibling",
                                c = e.parentNode,
                                f = v && e.nodeName.toLowerCase(),
                                p = !n && !v;
                            if (c) {
                                if (m) {
                                    for (; u;) {
                                        for (o = e; o = o[u];)
                                            if (v ? o.nodeName.toLowerCase() === f : 1 === o.nodeType) return !1;
                                        l = u = "only" === d && !l && "nextSibling"
                                    }
                                    return !0
                                }
                                if (l = [y ? c.firstChild : c.lastChild], y && p) {
                                    for (s = (r = (i = c[x] || (c[x] = {}))[d] || [])[0] === E && r[1], a = r[0] === E && r[2], o = s && c.childNodes[s]; o = ++s && o && o[u] || (a = s = 0) || l.pop();)
                                        if (1 === o.nodeType && ++a && o === e) {
                                            i[d] = [E, s, a];
                                            break
                                        }
                                } else if (p && (r = (e[x] || (e[x] = {}))[d]) && r[0] === E) a = r[1];
                                else
                                    for (;
                                        (o = ++s && o && o[u] || (a = s = 0) || l.pop()) && ((v ? o.nodeName.toLowerCase() !== f : 1 !== o.nodeType) || !++a || (p && ((o[x] || (o[x] = {}))[d] = [E, a]), o !== e)););
                                return (a -= g) === h || 0 == a % h && 0 <= a / h
                            }
                        }
                    }, PSEUDO: function (e, o) {
                        var t, a = w.pseudos[e] || w.setFilters[e.toLowerCase()] || re.error("unsupported pseudo: " + e);
                        return a[x] ? a(o) : 1 < a.length ? (t = [e, e, "", o], w.setFilters.hasOwnProperty(e.toLowerCase()) ? te(function (e, t) {
                            for (var n, r = a(e, o), i = r.length; i--;) e[n = H.call(e, r[i])] = !(t[n] = r[i])
                        }) : function (e) {
                            return a(e, 0, t)
                        }) : a
                    }
                },
                pseudos: {
                    not: te(function (e) {
                        var r = [],
                            i = [],
                            s = g(e.replace(B, "$1"));
                        return s[x] ? te(function (e, t, n, r) {
                            for (var i, o = s(e, null, r, []), a = e.length; a--;)(i = o[a]) && (e[a] = !(t[a] = i))
                        }) : function (e, t, n) {
                            return r[0] = e, s(r, null, n, i), !i.pop()
                        }
                    }),
                    has: te(function (t) {
                        return function (e) {
                            return 0 < re(t, e).length
                        }
                    }),
                    contains: te(function (t) {
                        return function (e) {
                            return -1 < (e.textContent || e.innerText || o(e)).indexOf(t)
                        }
                    }),
                    lang: te(function (n) {
                        return W.test(n || "") || re.error("unsupported lang: " + n), n = n.replace(G, K).toLowerCase(),
                            function (e) {
                                var t;
                                do {
                                    if (t = y ? e.getAttribute("xml:lang") || e.getAttribute("lang") : e.lang) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function (e) {
                        var t = n.location && n.location.hash;
                        return t && t.slice(1) === e.id
                    }, root: function (e) {
                        return e === a
                    }, focus: function (e) {
                        return e === N.activeElement && (!N.hasFocus || N.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    }, enabled: function (e) {
                        return !1 === e.disabled
                    }, disabled: function (e) {
                        return !0 === e.disabled
                    }, checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    }, selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    }, empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if ("@" < e.nodeName || 3 === e.nodeType || 4 === e.nodeType) return !1;
                        return !0
                    }, parent: function (e) {
                        return !w.pseudos.empty(e)
                    }, header: function (e) {
                        return V.test(e.nodeName)
                    }, input: function (e) {
                        return J.test(e.nodeName)
                    }, button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    }, text: function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                    }, first: se(function () {
                        return [0]
                    }),
                    last: se(function (e, t) {
                        return [t - 1]
                    }),
                    eq: se(function (e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: se(function (e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: se(function (e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: se(function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; 0 <= --r;) e.push(r);
                        return e
                    }),
                    gt: se(function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; t > ++r;) e.push(r);
                        return e
                    })
                }
            }, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) w.pseudos[i] = oe(i);
            for (i in {
                submit: !0,
                reset: !0
            }) w.pseudos[i] = ae(i);

            function le(e, t) {
                var n, r, i, o, a, s, l, u = d[e + " "];
                if (u) return t ? 0 : u.slice(0);
                for (a = e, s = [], l = w.preFilter; a;) {
                    for (o in (!n || (r = R.exec(a))) && (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = P.exec(a)) && (n = r.shift(), i.push({
                        value: n,
                        type: r[0].replace(B, " ")
                    }), a = a.slice(n.length)), w.filter)!(r = $[o].exec(a)) || l[o] && !(r = l[o](r)) || (n = r.shift(), i.push({
                        value: n,
                        type: o,
                        matches: r
                    }), a = a.slice(n.length));
                    if (!n) break
                }
                return t ? a.length : a ? re.error(e) : d(e, s).slice(0)
            }

            function ue(e) {
                for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                return r
            }

            function ce(s, e, t) {
                var l = e.dir,
                    u = t && "parentNode" === l,
                    c = p++;
                return e.first ? function (e, t, n) {
                    for (; e = e[l];)
                        if (1 === e.nodeType || u) return s(e, t, n)
                } : function (e, t, n) {
                    var r, i, o, a = E + " " + c;
                    if (n) {
                        for (; e = e[l];)
                            if ((1 === e.nodeType || u) && s(e, t, n)) return !0
                    } else
                        for (; e = e[l];)
                            if (1 === e.nodeType || u)
                                if ((i = (o = e[x] || (e[x] = {}))[l]) && i[0] === a) {
                                    if (!0 === (r = i[1]) || r === T) return !0 === r
                                } else if ((i = o[l] = [a])[1] = s(e, t, n) || T, !0 === i[1]) return !0
                }
            }

            function fe(i) {
                return 1 < i.length ? function (e, t, n) {
                    for (var r = i.length; r--;)
                        if (!i[r](e, t, n)) return !1;
                    return !0
                } : i[0]
            }

            function pe(e, t, n, r, i) {
                for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
                return a
            }

            function de(h, g, m, y, v, e) {
                return y && !y[x] && (y = de(y)), v && !v[x] && (v = de(v, e)), te(function (e, t, n, r) {
                    var i, o, a, s = [],
                        l = [],
                        u = t.length,
                        c = e || function f(e, t, n) {
                            for (var r = 0, i = t.length; r < i; r++) re(e, t[r], n);
                            return n
                        }(g || "*", n.nodeType ? [n] : n, []),
                        p = !h || !e && g ? c : pe(c, s, h, n, r),
                        d = m ? v || (e ? h : u || y) ? [] : t : p;
                    if (m && m(p, d, n, r), y)
                        for (i = pe(d, l), y(i, [], n, r), o = i.length; o--;)(a = i[o]) && (d[l[o]] = !(p[l[o]] = a));
                    if (e) {
                        if (v || h) {
                            if (v) {
                                for (i = [], o = d.length; o--;)(a = d[o]) && i.push(p[o] = a);
                                v(null, d = [], i, r)
                            }
                            for (o = d.length; o--;)(a = d[o]) && -1 < (i = v ? H.call(e, a) : s[o]) && (e[i] = !(t[i] = a))
                        }
                    } else d = pe(d === t ? d.splice(u, d.length) : d), v ? v(null, t, d, r) : D.apply(t, d)
                })
            }

            function he(e) {
                for (var r, t, n, i = e.length, o = w.relative[e[0].type], a = o || w.relative[" "], s = o ? 1 : 0, l = ce(function (e) {
                    return e === r
                }, a, !0), u = ce(function (e) {
                    return -1 < H.call(r, e)
                }, a, !0), c = [
                    function (e, t, n) {
                        return !o && (n || t !== C) || ((r = t).nodeType ? l(e, t, n) : u(e, t, n))
                    }
                ]; s < i; s++)
                    if (t = w.relative[e[s].type]) c = [ce(fe(c), t)];
                    else {
                        if ((t = w.filter[e[s].type].apply(null, e[s].matches))[x]) {
                            for (n = ++s; n < i && !w.relative[e[n].type]; n++);
                            return de(1 < s && fe(c), 1 < s && ue(e.slice(0, s - 1)).replace(B, "$1"), t, s < n && he(e.slice(s, n)), n < i && he(e = e.slice(n)), n < i && ue(e))
                        }
                        c.push(t)
                    }
                return fe(c)
            }

            function ge() {}
            g = re.compile = function (e, t) {
                var n, r = [],
                    i = [],
                    o = h[e + " "];
                if (!o) {
                    for (t || (t = le(e)), n = t.length; n--;)(o = he(t[n]))[x] ? r.push(o) : i.push(o);
                    o = h(e, function a(m, y) {
                        var v = 0,
                            b = 0 < y.length,
                            x = 0 < m.length,
                            e = function (e, t, n, r, i) {
                                var o, a, s, l = [],
                                    u = 0,
                                    c = "0",
                                    f = e && [],
                                    p = null != i,
                                    d = C,
                                    h = e || x && w.find.TAG("*", i && t.parentNode || t),
                                    g = E += null == d ? 1 : Math.random() || .1;
                                for (p && (C = t !== N && t, T = v); null != (o = h[c]); c++) {
                                    if (x && o) {
                                        for (a = 0; s = m[a++];)
                                            if (s(o, t, n)) {
                                                r.push(o);
                                                break
                                            }
                                        p && (E = g, T = ++v)
                                    }
                                    b && ((o = !s && o) && u--, e && f.push(o))
                                }
                                if (u += c, b && c !== u) {
                                    for (a = 0; s = y[a++];) s(f, l, t, n);
                                    if (e) {
                                        if (0 < u)
                                            for (; c--;) f[c] || l[c] || (l[c] = j.call(r));
                                        l = pe(l)
                                    }
                                    D.apply(r, l), p && !e && 0 < l.length && 1 < u + y.length && re.uniqueSort(r)
                                }
                                return p && (E = g, C = d), f
                            };
                        return b ? te(e) : e
                    }(i, r))
                }
                return o
            }, w.pseudos.nth = w.pseudos.eq, w.filters = ge.prototype = w.pseudos, w.setFilters = new ge, m(), re.attr = me.attr, me.find = re, me.expr = re.selectors, me.expr[":"] = me.expr.pseudos, me.unique = re.uniqueSort, me.text = re.getText, me.isXMLDoc = re.isXML, me.contains = re.contains
        }(h);
    var re = /Until$/,
        ie = /^(?:parents|prev(?:Until|All))/,
        oe = /^.[^:#\[\.,]*$/,
        ae = me.expr.match.needsContext,
        se = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function le(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function ue(e, n, r) {
        if (n = n || 0, me.isFunction(n)) return me.grep(e, function (e, t) {
            return !!n.call(e, t, e) === r
        });
        if (n.nodeType) return me.grep(e, function (e) {
            return e === n === r
        });
        if ("string" == typeof n) {
            var t = me.grep(e, function (e) {
                return 1 === e.nodeType
            });
            if (oe.test(n)) return me.filter(n, t, !r);
            n = me.filter(n, t)
        }
        return me.grep(e, function (e) {
            return 0 <= me.inArray(e, n) === r
        })
    }

    function ce(e) {
        var t = fe.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;) n.createElement(t.pop());
        return n
    }
    me.fn.extend({
        find: function (e) {
            var t, n, r, i = this.length;
            if ("string" != typeof e) return (r = this).pushStack(me(e).filter(function () {
                for (t = 0; t < i; t++)
                    if (me.contains(r[t], this)) return !0
            }));
            for (n = [], t = 0; t < i; t++) me.find(e, this[t], n);
            return (n = this.pushStack(1 < i ? me.unique(n) : n)).selector = (this.selector ? this.selector + " " : "") + e, n
        }, has: function (e) {
            var t, n = me(e, this),
                r = n.length;
            return this.filter(function () {
                for (t = 0; t < r; t++)
                    if (me.contains(this, n[t])) return !0
            })
        }, not: function (e) {
            return this.pushStack(ue(this, e, !1))
        }, filter: function (e) {
            return this.pushStack(ue(this, e, !0))
        }, is: function (e) {
            return !!e && ("string" == typeof e ? ae.test(e) ? 0 <= me(e, this.context).index(this[0]) : 0 < me.filter(e, this).length : 0 < this.filter(e).length)
        }, closest: function (e, t) {
            for (var n, r = 0, i = this.length, o = [], a = ae.test(e) || "string" != typeof e ? me(e, t || this.context) : 0; r < i; r++)
                for (n = this[r]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
                    if (a ? -1 < a.index(n) : me.find.matchesSelector(n, e)) {
                        o.push(n);
                        break
                    }
                    n = n.parentNode
                }
            return this.pushStack(1 < o.length ? me.unique(o) : o)
        }, index: function (e) {
            return e ? "string" == typeof e ? me.inArray(this[0], me(e)) : me.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            var n = "string" == typeof e ? me(e, t) : me.makeArray(e && e.nodeType ? [e] : e),
                r = me.merge(this.get(), n);
            return this.pushStack(me.unique(r))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), me.fn.andSelf = me.fn.addBack, me.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return me.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return me.dir(e, "parentNode", n)
        }, next: function (e) {
            return le(e, "nextSibling")
        }, prev: function (e) {
            return le(e, "previousSibling")
        }, nextAll: function (e) {
            return me.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return me.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return me.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return me.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return me.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return me.sibling(e.firstChild)
        }, contents: function (e) {
            return me.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : me.merge([], e.childNodes)
        }
    }, function (r, i) {
        me.fn[r] = function (e, t) {
            var n = me.map(this, i, e);
            return re.test(r) || (t = e), t && "string" == typeof t && (n = me.filter(t, n)), n = 1 < this.length && !se[r] ? me.unique(n) : n, 1 < this.length && ie.test(r) && (n = n.reverse()), this.pushStack(n)
        }
    }), me.extend({
        filter: function (e, t, n) {
            return n && (e = ":not(" + e + ")"), 1 === t.length ? me.find.matchesSelector(t[0], e) ? [t[0]] : [] : me.find.matches(e, t)
        }, dir: function (e, t, n) {
            for (var r = [], i = e[t]; i && 9 !== i.nodeType && (n === k || 1 !== i.nodeType || !me(i).is(n));) 1 === i.nodeType && r.push(i), i = i[t];
            return r
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var fe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        pe = / jQuery\d+="(?:null|\d+)"/g,
        de = RegExp("<(?:" + fe + ")[\\s/>]", "i"),
        he = /^\s+/,
        ge = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ve = /<([\w:]+)/,
        be = /<tbody/i,
        xe = /<|&#?\w+;/,
        Te = /<(?:script|style|link)/i,
        we = /^(?:checkbox|radio)$/i,
        Ce = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ne = /^$|\/(?:java|ecma)script/i,
        ke = /^true\/(.*)/,
        Ae = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Ee = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: me.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Se = ce(g).appendChild(g.createElement("div"));

    function je(e) {
        var t = e.getAttributeNode("type");
        return e.type = (t && t.specified) + "/" + e.type, e
    }

    function De(e) {
        var t = ke.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function Le(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++) me._data(n, "globalEval", !t || me._data(t[r], "globalEval"))
    }

    function He(e, t) {
        if (1 === t.nodeType && me.hasData(e)) {
            var n, r, i, o = me._data(e),
                a = me._data(t, o),
                s = o.events;
            if (s)
                for (n in delete a.handle, a.events = {}, s)
                    for (r = 0, i = s[n].length; r < i; r++) me.event.add(t, n, s[n][r]);
            a.data && (a.data = me.extend({}, a.data))
        }
    }

    function _e(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !me.support.noCloneEvent && t[me.expando]) {
                for (r in (i = me._data(t)).events) me.removeEvent(t, r, i.handle);
                t.removeAttribute(me.expando)
            }
            "script" === n && t.text !== e.text ? (je(t).text = e.text, De(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), me.support.html5Clone && e.innerHTML && !me.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && we.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function Me(e, t) {
        var n, r, i = 0,
            o = typeof e.getElementsByTagName !== y ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== y ? e.querySelectorAll(t || "*") : k;
        if (!o)
            for (o = [], n = e.childNodes || e; null != (r = n[i]); i++)!t || me.nodeName(r, t) ? o.push(r) : me.merge(o, Me(r, t));
        return t === k || t && me.nodeName(e, t) ? me.merge([e], o) : o
    }

    function qe(e) {
        we.test(e.type) && (e.defaultChecked = e.checked)
    }
    Ee.optgroup = Ee.option, Ee.tbody = Ee.tfoot = Ee.colgroup = Ee.caption = Ee.thead, Ee.th = Ee.td, me.fn.extend({
        text: function (e) {
            return me.access(this, function (e) {
                return e === k ? me.text(this) : this.empty().append((this[0] && this[0].ownerDocument || g).createTextNode(e))
            }, null, e, arguments.length)
        }, wrapAll: function (t) {
            if (me.isFunction(t)) return this.each(function (e) {
                me(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = me(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (n) {
            return me.isFunction(n) ? this.each(function (e) {
                me(this).wrapInner(n.call(this, e))
            }) : this.each(function () {
                var e = me(this),
                    t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        }, wrap: function (t) {
            var n = me.isFunction(t);
            return this.each(function (e) {
                me(this).wrapAll(n ? t.call(this, e) : t)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                me.nodeName(this, "body") || me(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (e) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (e) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild)
            })
        }, before: function () {
            return this.domManip(arguments, !1, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, !1, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var n, r = 0; null != (n = this[r]); r++)(!e || 0 < me.filter(e, [n]).length) && (t || 1 !== n.nodeType || me.cleanData(Me(n)), n.parentNode && (t && me.contains(n.ownerDocument, n) && Le(Me(n, "script")), n.parentNode.removeChild(n)));
            return this
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && me.cleanData(Me(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && me.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        }, clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return me.clone(this, e, t)
            })
        }, html: function (e) {
            return me.access(this, function (e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === k) return 1 === t.nodeType ? t.innerHTML.replace(pe, "") : k;
                if (!("string" != typeof e || Te.test(e) || !me.support.htmlSerialize && de.test(e) || !me.support.leadingWhitespace && he.test(e) || Ee[(ve.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(ge, "<$1></$2>");
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (me.cleanData(Me(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (g) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function (e) {
            return me.isFunction(e) || "string" == typeof e || (e = me(e).not(this).detach()), this.domManip([e], !0, function (e) {
                var t = this.nextSibling,
                    n = this.parentNode;
                n && (me(this).remove(), n.insertBefore(e, t))
            })
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (n, r, i) {
            n = v.apply([], n);
            var e, t, o, a, s, l, u, c, f = 0,
                p = this.length,
                d = this,
                h = p - 1,
                g = n[0],
                m = me.isFunction(g);
            if (m || !(p <= 1 || "string" != typeof g || me.support.checkClone) && Ce.test(g)) return this.each(function (e) {
                var t = d.eq(e);
                m && (n[0] = g.call(this, e, r ? t.html() : k)), t.domManip(n, r, i)
            });
            if (p && (e = (l = me.buildFragment(n, this[0].ownerDocument, !1, this)).firstChild, 1 === l.childNodes.length && (l = e), e)) {
                for (r = r && me.nodeName(e, "tr"), o = (a = me.map(Me(l, "script"), je)).length; f < p; f++) t = l, f !== h && (t = me.clone(t, !0, !0), o && me.merge(a, Me(t, "script"))), i.call(r && me.nodeName(this[f], "table") ? (u = this[f], c = "tbody", u.getElementsByTagName(c)[0] || u.appendChild(u.ownerDocument.createElement(c))) : this[f], t, f);
                if (o)
                    for (s = a[a.length - 1].ownerDocument, me.map(a, De), f = 0; f < o; f++) t = a[f], Ne.test(t.type || "") && !me._data(t, "globalEval") && me.contains(s, t) && (t.src ? me.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : me.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Ae, "")));
                l = e = null
            }
            return this
        }
    }), me.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, a) {
        me.fn[e] = function (e) {
            for (var t, n = 0, r = [], i = me(e), o = i.length - 1; n <= o; n++) t = n === o ? this : this.clone(!0), me(i[n])[a](t), f.apply(r, t.get());
            return this.pushStack(r)
        }
    }), me.extend({
        clone: function (e, t, n) {
            var r, i, o, a, s, l = me.contains(e.ownerDocument, e);
            if (me.support.html5Clone || me.isXMLDoc(e) || !de.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Se.innerHTML = e.outerHTML, Se.removeChild(o = Se.firstChild)), !(me.support.noCloneEvent && me.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || me.isXMLDoc(e)))
                for (r = Me(o), s = Me(e), a = 0; null != (i = s[a]); ++a) r[a] && _e(i, r[a]);
            if (t)
                if (n)
                    for (s = s || Me(e), r = r || Me(o), a = 0; null != (i = s[a]); a++) He(i, r[a]);
                else He(e, o);
            return 0 < (r = Me(o, "script")).length && Le(r, !l && Me(e, "script")), r = s = i = null, o
        }, buildFragment: function (e, t, n, r) {
            for (var i, o, a, s, l, u, c, f = e.length, p = ce(t), d = [], h = 0; h < f; h++)
                if ((o = e[h]) || 0 === o)
                    if ("object" === me.type(o)) me.merge(d, o.nodeType ? [o] : o);
                    else if (xe.test(o)) {
                for (s = s || p.appendChild(t.createElement("div")), l = (ve.exec(o) || ["", ""])[1].toLowerCase(), c = Ee[l] || Ee._default, s.innerHTML = c[1] + o.replace(ge, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
                if (!me.support.leadingWhitespace && he.test(o) && d.push(t.createTextNode(he.exec(o)[0])), !me.support.tbody)
                    for (i = (o = "table" !== l || be.test(o) ? "<table>" !== c[1] || be.test(o) ? 0 : s : s.firstChild) && o.childNodes.length; i--;) me.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u);
                for (me.merge(d, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = p.lastChild
            } else d.push(t.createTextNode(o));
            for (s && p.removeChild(s), me.support.appendChecked || me.grep(Me(d, "input"), qe), h = 0; o = d[h++];)
                if ((!r || -1 === me.inArray(o, r)) && (a = me.contains(o.ownerDocument, o), s = Me(p.appendChild(o), "script"), a && Le(s), n))
                    for (i = 0; o = s[i++];) Ne.test(o.type || "") && n.push(o);
            return s = null, p
        }, cleanData: function (e, t) {
            for (var n, r, i, o, a = 0, s = me.expando, l = me.cache, u = me.support.deleteExpando, c = me.event.special; null != (n = e[a]); a++)
                if ((t || me.acceptData(n)) && (o = (i = n[s]) && l[i])) {
                    if (o.events)
                        for (r in o.events) c[r] ? me.event.remove(n, r) : me.removeEvent(n, r, o.handle);
                    l[i] && (delete l[i], u ? delete n[s] : typeof n.removeAttribute !== y ? n.removeAttribute(s) : n[s] = null, A.push(i))
                }
        }
    });
    var Oe, Fe, Be, Re = /alpha\([^)]*\)/i,
        Pe = /opacity\s*=\s*([^)]*)/,
        Ie = /^(top|right|bottom|left)$/,
        We = /^(none|table(?!-c[ea]).+)/,
        $e = /^margin/,
        ze = RegExp("^(" + u + ")(.*)$", "i"),
        Xe = RegExp("^(" + u + ")(?!px)[a-z%]+$", "i"),
        Ue = RegExp("^([+-])=(" + u + ")", "i"),
        Je = {
            BODY: "block"
        },
        Ve = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ye = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Qe = ["Top", "Right", "Bottom", "Left"],
        Ge = ["Webkit", "O", "Moz", "ms"];

    function Ke(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Ge.length; i--;)
            if ((t = Ge[i] + n) in e) return t;
        return r
    }

    function Ze(e, t) {
        return e = t || e, "none" === me.css(e, "display") || !me.contains(e.ownerDocument, e)
    }

    function et(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; a < s; a++)(r = e[a]).style && (o[a] = me._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ze(r) && (o[a] = me._data(r, "olddisplay", it(r.nodeName)))) : o[a] || (i = Ze(r), (n && "none" !== n || !i) && me._data(r, "olddisplay", i ? n : me.css(r, "display"))));
        for (a = 0; a < s; a++)(r = e[a]).style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }

    function tt(e, t, n) {
        var r = ze.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function nt(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += me.css(e, n + Qe[o], !0, i)), r ? ("content" === n && (a -= me.css(e, "padding" + Qe[o], !0, i)), "margin" !== n && (a -= me.css(e, "border" + Qe[o] + "Width", !0, i))) : (a += me.css(e, "padding" + Qe[o], !0, i), "padding" !== n && (a += me.css(e, "border" + Qe[o] + "Width", !0, i)));
        return a
    }

    function rt(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = Fe(e),
            a = me.support.boxSizing && "border-box" === me.css(e, "boxSizing", !1, o);
        if (i <= 0 || null == i) {
            if (((i = Be(e, t, o)) < 0 || null == i) && (i = e.style[t]), Xe.test(i)) return i;
            r = a && (me.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + nt(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }

    function it(e) {
        var t = g,
            n = Je[e];
        return n || ("none" !== (n = ot(e, t)) && n || ((t = ((Oe = (Oe || me("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement))[0].contentWindow || Oe[0].contentDocument).document).write("<!doctype html><html><body>"), t.close(), n = ot(e, t), Oe.detach()), Je[e] = n), n
    }

    function ot(e, t) {
        var n = me(t.createElement(e)).appendTo(t.body),
            r = me.css(n[0], "display");
        return n.remove(), r
    }
    me.fn.extend({
        css: function (e, t) {
            return me.access(this, function (e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (me.isArray(t)) {
                    for (i = Fe(e), r = t.length; a < r; a++) o[t[a]] = me.css(e, t[a], !1, i);
                    return o
                }
                return n !== k ? me.style(e, t, n) : me.css(e, t)
            }, e, t, 1 < arguments.length)
        }, show: function () {
            return et(this, !0)
        }, hide: function () {
            return et(this)
        }, toggle: function (e) {
            var t = "boolean" == typeof e;
            return this.each(function () {
                (t ? e : Ze(this)) ? me(this).show(): me(this).hide()
            })
        }
    }), me.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = Be(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": me.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = me.camelCase(t),
                    l = e.style;
                if (t = me.cssProps[s] || (me.cssProps[s] = Ke(l, s)), a = me.cssHooks[t] || me.cssHooks[s], n === k) return a && "get" in a && (i = a.get(e, !1, r)) !== k ? i : l[t];
                if ("string" === (o = typeof n) && (i = Ue.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(me.css(e, t)), o = "number"), !(null == n || "number" === o && isNaN(n) || ("number" !== o || me.cssNumber[s] || (n += "px"), me.support.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && (n = a.set(e, n, r)) === k))) try {
                    l[t] = n
                } catch (A) {}
            }
        }, css: function (e, t, n, r) {
            var i, o, a, s = me.camelCase(t);
            return t = me.cssProps[s] || (me.cssProps[s] = Ke(e.style, s)), (a = me.cssHooks[t] || me.cssHooks[s]) && "get" in a && (o = a.get(e, !0, n)), o === k && (o = Be(e, t, r)), "normal" === o && t in Ye && (o = Ye[t]), "" === n || n ? (i = parseFloat(o), !0 === n || me.isNumeric(i) ? i || 0 : o) : o
        }, swap: function (e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            for (o in i = n.apply(e, r || []), t) e.style[o] = a[o];
            return i
        }
    }), h.getComputedStyle ? (Fe = function (e) {
        return h.getComputedStyle(e, null)
    }, Be = function (e, t, n) {
        var r, i, o, a = n || Fe(e),
            s = a ? a.getPropertyValue(t) || a[t] : k,
            l = e.style;
        return a && ("" !== s || me.contains(e.ownerDocument, e) || (s = me.style(e, t)), Xe.test(s) && $e.test(t) && (r = l.width, i = l.minWidth, o = l.maxWidth, l.minWidth = l.maxWidth = l.width = s, s = a.width, l.width = r, l.minWidth = i, l.maxWidth = o)), s
    }) : g.documentElement.currentStyle && (Fe = function (e) {
        return e.currentStyle
    }, Be = function (e, t, n) {
        var r, i, o, a = n || Fe(e),
            s = a ? a[t] : k,
            l = e.style;
        return null == s && l && l[t] && (s = l[t]), Xe.test(s) && !Ie.test(t) && (r = l.left, (o = (i = e.runtimeStyle) && i.left) && (i.left = e.currentStyle.left), l.left = "fontSize" === t ? "1em" : s, s = l.pixelLeft + "px", l.left = r, o && (i.left = o)), "" === s ? "auto" : s
    }), me.each(["height", "width"], function (e, i) {
        me.cssHooks[i] = {
            get: function (e, t, n) {
                return t ? 0 === e.offsetWidth && We.test(me.css(e, "display")) ? me.swap(e, Ve, function () {
                    return rt(e, i, n)
                }) : rt(e, i, n) : k
            }, set: function (e, t, n) {
                var r = n && Fe(e);
                return tt(0, t, n ? nt(e, i, n, me.support.boxSizing && "border-box" === me.css(e, "boxSizing", !1, r), r) : 0)
            }
        }
    }), me.support.opacity || (me.cssHooks.opacity = {
        get: function (e, t) {
            return Pe.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        }, set: function (e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = me.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                o = r && r.filter || n.filter || "";
            ((n.zoom = 1) <= t || "" === t) && "" === me.trim(o.replace(Re, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = Re.test(o) ? o.replace(Re, i) : o + " " + i)
        }
    }), me(function () {
        me.support.reliableMarginRight || (me.cssHooks.marginRight = {
            get: function (e, t) {
                return t ? me.swap(e, {
                    display: "inline-block"
                }, Be, [e, "marginRight"]) : k
            }
        }), !me.support.pixelPosition && me.fn.position && me.each(["top", "left"], function (e, n) {
            me.cssHooks[n] = {
                get: function (e, t) {
                    return t ? (t = Be(e, n), Xe.test(t) ? me(e).position()[n] + "px" : t) : k
                }
            }
        })
    }), me.expr && me.expr.filters && (me.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !me.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || me.css(e, "display"))
    }, me.expr.filters.visible = function (e) {
        return !me.expr.filters.hidden(e)
    }), me.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (i, o) {
        me.cssHooks[i + o] = {
            expand: function (e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + Qe[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        }, $e.test(i) || (me.cssHooks[i + o].set = tt)
    });
    var at = /%20/g,
        st = /\[\]$/,
        lt = /\r?\n/g,
        ut = /^(?:submit|button|image|reset|file)$/i,
        ct = /^(?:input|select|textarea|keygen)/i;

    function ft(n, e, r, i) {
        var t;
        if (me.isArray(e)) me.each(e, function (e, t) {
            r || st.test(n) ? i(n, t) : ft(n + "[" + ("object" == typeof t ? e : "") + "]", t, r, i)
        });
        else if (r || "object" !== me.type(e)) i(n, e);
        else
            for (t in e) ft(n + "[" + t + "]", e[t], r, i)
    }
    me.fn.extend({
        serialize: function () {
            return me.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = me.prop(this, "elements");
                return e ? me.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !me(this).is(":disabled") && ct.test(this.nodeName) && !ut.test(e) && (this.checked || !we.test(e))
            }).map(function (e, t) {
                var n = me(this).val();
                return null == n ? null : me.isArray(n) ? me.map(n, function (e) {
                    return {
                        name: t.name,
                        value: e.replace(lt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(lt, "\r\n")
                }
            }).get()
        }
    }), me.param = function (e, t) {
        var n, r = [],
            i = function (e, t) {
                t = me.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (t === k && (t = me.ajaxSettings && me.ajaxSettings.traditional), me.isArray(e) || e.jquery && !me.isPlainObject(e)) me.each(e, function () {
            i(this.name, this.value)
        });
        else
            for (n in e) ft(n, e[n], t, i);
        return r.join("&").replace(at, "+")
    }, me.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, n) {
        me.fn[n] = function (e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    }), me.fn.hover = function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    };
    var pt, dt, ht = me.now(),
        gt = /\?/,
        mt = /#.*$/,
        yt = /([?&])_=[^&]*/,
        vt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        bt = /^(?:GET|HEAD)$/,
        xt = /^\/\//,
        Tt = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        wt = me.fn.load,
        Ct = {},
        Nt = {},
        kt = "*/".concat("*");
    try {
        dt = e.href
    } catch (Yt) {
        (dt = g.createElement("a")).href = "", dt = dt.href
    }

    function At(o) {
        return function (e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, r = 0,
                i = e.toLowerCase().match(E) || [];
            if (me.isFunction(t))
                for (; n = i[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }

    function Et(t, i, o, a) {
        var s = {},
            l = t === Nt;

        function u(e) {
            var r;
            return s[e] = !0, me.each(t[e] || [], function (e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || l || s[n] ? l ? !(r = n) : k : (i.dataTypes.unshift(n), u(n), !1)
            }), r
        }
        return u(i.dataTypes[0]) || !s["*"] && u("*")
    }

    function St(e, t) {
        var n, r, i = me.ajaxSettings.flatOptions || {};
        for (r in t) t[r] !== k && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && me.extend(!0, e, n), e
    }
    pt = Tt.exec(dt.toLowerCase()) || [], me.fn.load = function (e, t, n) {
        if ("string" != typeof e && wt) return wt.apply(this, arguments);
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return 0 <= s && (r = e.slice(s, e.length), e = e.slice(0, s)), me.isFunction(t) ? (n = t, t = k) : t && "object" == typeof t && (o = "POST"), 0 < a.length && me.ajax({
            url: e,
            type: o,
            dataType: "html",
            data: t
        }).done(function (e) {
            i = arguments, a.html(r ? me("<div>").append(me.parseHTML(e)).find(r) : e)
        }).complete(n && function (e, t) {
            a.each(n, i || [e.responseText, t, e])
        }), this
    }, me.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        me.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), me.each(["get", "post"], function (e, i) {
        me[i] = function (e, t, n, r) {
            return me.isFunction(t) && (r = r || n, n = t, t = k), me.ajax({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            })
        }
    }), me.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: dt,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(pt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": kt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": h.String,
                "text html": !0,
                "text json": me.parseJSON,
                "text xml": me.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (e, t) {
            return t ? St(St(e, me.ajaxSettings), t) : St(me.ajaxSettings, e)
        }, ajaxPrefilter: At(Ct),
        ajaxTransport: At(Nt),
        ajax: function (e, t) {
            "object" == typeof e && (t = e, e = k), t = t || {};
            var n, r, p, d, h, g, m, i, y = me.ajaxSetup({}, t),
                v = y.context || y,
                b = y.context && (v.nodeType || v.jquery) ? me(v) : me.event,
                x = me.Deferred(),
                T = me.Callbacks("once memory"),
                w = y.statusCode || {},
                o = {},
                a = {},
                C = 0,
                s = "canceled",
                N = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (2 === C) {
                            if (!i)
                                for (i = {}; t = vt.exec(d);) i[t[1].toLowerCase()] = t[2];
                            t = i[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    }, getAllResponseHeaders: function () {
                        return 2 === C ? d : null
                    }, setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return C || (e = a[n] = a[n] || e, o[e] = t), this
                    }, overrideMimeType: function (e) {
                        return C || (y.mimeType = e), this
                    }, statusCode: function (e) {
                        var t;
                        if (e)
                            if (C < 2)
                                for (t in e) w[t] = [w[t], e[t]];
                            else N.always(e[N.status]);
                        return this
                    }, abort: function (e) {
                        var t = e || s;
                        return m && m.abort(t), l(0, t), this
                    }
                };
            if (x.promise(N).complete = T.add, N.success = N.done, N.error = N.fail, y.url = ((e || y.url || dt) + "").replace(mt, "").replace(xt, pt[1] + "//"), y.type = t.method || t.type || y.method || y.type, y.dataTypes = me.trim(y.dataType || "*").toLowerCase().match(E) || [""], null == y.crossDomain && (n = Tt.exec(y.url.toLowerCase()), y.crossDomain = !(!n || n[1] === pt[1] && n[2] === pt[2] && (n[3] || ("http:" === n[1] ? 80 : 443)) == (pt[3] || ("http:" === pt[1] ? 80 : 443)))), y.data && y.processData && "string" != typeof y.data && (y.data = me.param(y.data, y.traditional)), Et(Ct, y, t, N), 2 === C) return N;
            for (r in (g = y.global) && 0 == me.active++ && me.event.trigger("ajaxStart"), y.type = y.type.toUpperCase(), y.hasContent = !bt.test(y.type), p = y.url, y.hasContent || (y.data && (p = y.url += (gt.test(p) ? "&" : "?") + y.data, delete y.data), !1 === y.cache && (y.url = yt.test(p) ? p.replace(yt, "$1_=" + ht++) : p + (gt.test(p) ? "&" : "?") + "_=" + ht++)), y.ifModified && (me.lastModified[p] && N.setRequestHeader("If-Modified-Since", me.lastModified[p]), me.etag[p] && N.setRequestHeader("If-None-Match", me.etag[p])), (y.data && y.hasContent && !1 !== y.contentType || t.contentType) && N.setRequestHeader("Content-Type", y.contentType), N.setRequestHeader("Accept", y.dataTypes[0] && y.accepts[y.dataTypes[0]] ? y.accepts[y.dataTypes[0]] + ("*" !== y.dataTypes[0] ? ", " + kt + "; q=0.01" : "") : y.accepts["*"]), y.headers) N.setRequestHeader(r, y.headers[r]);
            if (y.beforeSend && (!1 === y.beforeSend.call(v, N, y) || 2 === C)) return N.abort();
            for (r in s = "abort", {
                success: 1,
                error: 1,
                complete: 1
            }) N[r](y[r]);
            if (m = Et(Nt, y, t, N)) {
                N.readyState = 1, g && b.trigger("ajaxSend", [N, y]), y.async && 0 < y.timeout && (h = setTimeout(function () {
                    N.abort("timeout")
                }, y.timeout));
                try {
                    C = 1, m.send(o, l)
                } catch (S) {
                    if (!(C < 2)) throw S;
                    l(-1, S)
                }
            } else l(-1, "No Transport");

            function l(e, t, n, r) {
                var i, o, a, s, l, u = t;
                2 !== C && (C = 2, h && clearTimeout(h), m = k, d = r || "", N.readyState = 0 < e ? 4 : 0, n && (s = function c(e, t, n) {
                    var r, i, o, a, s = e.contents,
                        l = e.dataTypes,
                        u = e.responseFields;
                    for (a in u) a in n && (t[u[a]] = n[a]);
                    for (;
                        "*" === l[0];) l.shift(), i === k && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (i)
                        for (a in s)
                            if (s[a] && s[a].test(i)) {
                                l.unshift(a);
                                break
                            }
                    if (l[0] in n) o = l[0];
                    else {
                        for (a in n) {
                            if (!l[0] || e.converters[a + " " + l[0]]) {
                                o = a;
                                break
                            }
                            r || (r = a)
                        }
                        o = o || r
                    }
                    return o ? (o !== l[0] && l.unshift(o), n[o]) : k
                }(y, N, n)), 200 <= e && e < 300 || 304 === e ? (y.ifModified && ((l = N.getResponseHeader("Last-Modified")) && (me.lastModified[p] = l), (l = N.getResponseHeader("etag")) && (me.etag[p] = l)), 204 === e ? (i = !0, u = "nocontent") : 304 === e ? (i = !0, u = "notmodified") : (u = (i = function f(e, t) {
                    var n, r, i, o, a = {},
                        s = 0,
                        l = e.dataTypes.slice(),
                        u = l[0];
                    if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), l[1])
                        for (i in e.converters) a[i.toLowerCase()] = e.converters[i];
                    for (; r = l[++s];)
                        if ("*" !== r) {
                            if ("*" !== u && u !== r) {
                                if (!(i = a[u + " " + r] || a["* " + r]))
                                    for (n in a)
                                        if ((o = n.split(" "))[1] === r && (i = a[u + " " + o[0]] || a["* " + o[0]])) {
                                            !0 === i ? i = a[n] : !0 !== a[n] && (r = o[0], l.splice(s--, 0, r));
                                            break
                                        }
                                if (!0 !== i)
                                    if (i && e["throws"]) t = i(t);
                                    else try {
                                        t = i(t)
                                    } catch (A) {
                                        return {
                                            state: "parsererror",
                                            error: i ? A : "No conversion from " + u + " to " + r
                                        }
                                    }
                            }
                            u = r
                        }
                    return {
                        state: "success",
                        data: t
                    }
                }(y, s)).state, o = i.data, i = !(a = i.error))) : (a = u, (e || !u) && (u = "error", e < 0 && (e = 0))), N.status = e, N.statusText = (t || u) + "", i ? x.resolveWith(v, [o, u, N]) : x.rejectWith(v, [N, u, a]), N.statusCode(w), w = k, g && b.trigger(i ? "ajaxSuccess" : "ajaxError", [N, y, i ? o : a]), T.fireWith(v, [N, u]), g && (b.trigger("ajaxComplete", [N, y]), --me.active || me.event.trigger("ajaxStop")))
            }
            return N
        }, getScript: function (e, t) {
            return me.get(e, k, t, "script")
        }, getJSON: function (e, t, n) {
            return me.get(e, t, n, "json")
        }
    }), me.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (e) {
                return me.globalEval(e), e
            }
        }
    }), me.ajaxPrefilter("script", function (e) {
        e.cache === k && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), me.ajaxTransport("script", function (t) {
        if (t.crossDomain) {
            var r, i = g.head || me("head")[0] || g.documentElement;
            return {
                send: function (e, n) {
                    (r = g.createElement("script")).async = !0, t.scriptCharset && (r.charset = t.scriptCharset), r.src = t.url, r.onload = r.onreadystatechange = function (e, t) {
                        (t || !r.readyState || /loaded|complete/.test(r.readyState)) && (r.onload = r.onreadystatechange = null, r.parentNode && r.parentNode.removeChild(r), r = null, t || n(200, "success"))
                    }, i.insertBefore(r, i.firstChild)
                }, abort: function () {
                    r && r.onload(k, !0)
                }
            }
        }
    });
    var jt = [],
        Dt = /(=)\?(?=&|$)|\?\?/;
    me.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = jt.pop() || me.expando + "_" + ht++;
            return this[e] = !0, e
        }
    }), me.ajaxPrefilter("json jsonp", function (e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (Dt.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Dt.test(e.data) && "data");
        return a || "jsonp" === e.dataTypes[0] ? (r = e.jsonpCallback = me.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Dt, "$1" + r) : !1 !== e.jsonp && (e.url += (gt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
            return o || me.error(r + " was not called"), o[0]
        }, e.dataTypes[0] = "json", i = h[r], h[r] = function () {
            o = arguments
        }, n.always(function () {
            h[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, jt.push(r)), o && me.isFunction(i) && i(o[0]), o = i = k
        }), "script") : k
    });
    var Lt, Ht, _t = 0,
        Mt = h.ActiveXObject && function () {
            var e;
            for (e in Lt) Lt[e](k, !0)
        };

    function qt() {
        try {
            return new h.XMLHttpRequest
        } catch (k) {}
    }
    me.ajaxSettings.xhr = h.ActiveXObject ? function () {
        return !this.isLocal && qt() || function e() {
            try {
                return new h.ActiveXObject("Microsoft.XMLHTTP")
            } catch (k) {}
        }()
    } : qt, Ht = me.ajaxSettings.xhr(), me.support.cors = !!Ht && "withCredentials" in Ht, (Ht = me.support.ajax = !!Ht) && me.ajaxTransport(function (u) {
        var c;
        if (!u.crossDomain || me.support.cors) return {
            send: function (e, a) {
                var s, t, l = u.xhr();
                if (u.username ? l.open(u.type, u.url, u.async, u.username, u.password) : l.open(u.type, u.url, u.async), u.xhrFields)
                    for (t in u.xhrFields) l[t] = u.xhrFields[t];
                u.mimeType && l.overrideMimeType && l.overrideMimeType(u.mimeType), u.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (t in e) l.setRequestHeader(t, e[t])
                } catch (o) {}
                l.send(u.hasContent && u.data || null), c = function (e, t) {
                    var n, r, i, o;
                    try {
                        if (c && (t || 4 === l.readyState))
                            if (c = k, s && (l.onreadystatechange = me.noop, Mt && delete Lt[s]), t) 4 !== l.readyState && l.abort();
                            else {
                                o = {}, n = l.status, r = l.getAllResponseHeaders(), "string" == typeof l.responseText && (o.text = l.responseText);
                                try {
                                    i = l.statusText
                                } catch (v) {
                                    i = ""
                                }
                                n || !u.isLocal || u.crossDomain ? 1223 === n && (n = 204) : n = o.text ? 200 : 404
                            }
                    } catch (f) {
                        t || a(-1, f)
                    }
                    o && a(n, i, o, r)
                }, u.async ? 4 === l.readyState ? setTimeout(c) : (s = ++_t, Mt && (Lt || (Lt = {}, me(h).unload(Mt)), Lt[s] = c), l.onreadystatechange = c) : c()
            }, abort: function () {
                c && c(k, !0)
            }
        }
    });
    var Ot, Ft, Bt = /^(?:toggle|show|hide)$/,
        Rt = RegExp("^(?:([+-])=|)(" + u + ")([a-z%]*)$", "i"),
        Pt = /queueHooks$/,
        It = [
            function Wt(t, e, n) {
                var r, i, o, a, s, l, u, c, f, p = this,
                    d = t.style,
                    h = {},
                    g = [],
                    m = t.nodeType && Ze(t);
                for (i in n.queue || (null == (c = me._queueHooks(t, "fx")).unqueued && (c.unqueued = 0, f = c.empty.fire, c.empty.fire = function () {
                    c.unqueued || f()
                }), c.unqueued++, p.always(function () {
                    p.always(function () {
                        c.unqueued--, me.queue(t, "fx").length || c.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === me.css(t, "display") && "none" === me.css(t, "float") && (me.support.inlineBlockNeedsLayout && "inline" !== it(t.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", me.support.shrinkWrapBlocks || p.always(function () {
                    d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
                })), e)
                    if (a = e[i], Bt.exec(a)) {
                        if (delete e[i], l = l || "toggle" === a, a === (m ? "hide" : "show")) continue;
                        g.push(i)
                    }
                if (o = g.length) {
                    "hidden" in (s = me._data(t, "fxshow") || me._data(t, "fxshow", {})) && (m = s.hidden), l && (s.hidden = !m), m ? me(t).show() : p.done(function () {
                        me(t).hide()
                    }), p.done(function () {
                        var e;
                        for (e in me._removeData(t, "fxshow"), h) me.style(t, e, h[e])
                    });
                    for (i = 0; i < o; i++) r = g[i], u = p.createTween(r, m ? s[r] : 0), h[r] = s[r] || me.style(t, r), r in s || (s[r] = u.start, m && (u.end = u.start, u.start = "width" === r || "height" === r ? 1 : 0))
                }
            }
        ],
        $t = {
            "*": [
                function (e, t) {
                    var n, r, i = this.createTween(e, t),
                        o = Rt.exec(t),
                        a = i.cur(),
                        s = +a || 0,
                        l = 1,
                        u = 20;
                    if (o) {
                        if (n = +o[2], "px" !== (r = o[3] || (me.cssNumber[e] ? "" : "px")) && s)
                            for (s = me.css(i.elem, e, !0) || n || 1; s /= l = l || ".5", me.style(i.elem, e, s + r), l !== (l = i.cur() / a) && 1 !== l && --u;);
                        i.unit = r, i.start = s, i.end = o[1] ? s + (o[1] + 1) * n : n
                    }
                    return i
                }
            ]
        };

    function zt() {
        return setTimeout(function () {
            Ot = k
        }), Ot = me.now()
    }

    function Xt(o, e, t) {
        var n, a, r = 0,
            i = It.length,
            s = me.Deferred().always(function () {
                delete l.elem
            }),
            l = function () {
                if (a) return !1;
                for (var e = Ot || zt(), t = Math.max(0, u.startTime + u.duration - e), n = 1 - (t / u.duration || 0), r = 0, i = u.tweens.length; r < i; r++) u.tweens[r].run(n);
                return s.notifyWith(o, [u, n, t]), n < 1 && i ? t : (s.resolveWith(o, [u]), !1)
            },
            u = s.promise({
                elem: o,
                props: me.extend({}, e),
                opts: me.extend(!0, {
                    specialEasing: {}
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: Ot || zt(),
                duration: t.duration,
                tweens: [],
                createTween: function (e, t) {
                    var n = me.Tween(o, u.opts, e, t, u.opts.specialEasing[e] || u.opts.easing);
                    return u.tweens.push(n), n
                }, stop: function (e) {
                    var t = 0,
                        n = e ? u.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; t < n; t++) u.tweens[t].run(1);
                    return e ? s.resolveWith(o, [u, e]) : s.rejectWith(o, [u, e]), this
                }
            }),
            c = u.props;
        for (function f(e, t) {
            var n, r, i, o, a;
            for (i in e)
                if (r = me.camelCase(i), o = t[r], n = e[i], me.isArray(n) && (o = n[1], n = e[i] = n[0]), i !== r && (e[r] = n, delete e[i]), (a = me.cssHooks[r]) && "expand" in a)
                    for (i in n = a.expand(n), delete e[r], n) i in e || (e[i] = n[i], t[i] = o);
                else t[r] = o
        }(c, u.opts.specialEasing); r < i; r++)
            if (n = It[r].call(u, o, c, u.opts)) return n;
        return function p(o, e) {
            me.each(e, function (e, t) {
                for (var n = ($t[e] || []).concat($t["*"]), r = 0, i = n.length; r < i; r++)
                    if (n[r].call(o, e, t)) return
            })
        }(u, c), me.isFunction(u.opts.start) && u.opts.start.call(o, u), me.fx.timer(me.extend(l, {
            elem: o,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function Ut(e, t, n, r, i) {
        return new Ut.prototype.init(e, t, n, r, i)
    }

    function Jt(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        for (t = t ? 1 : 0; i < 4; i += 2 - t) r["margin" + (n = Qe[i])] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function Vt(e) {
        return me.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }
    me.Animation = me.extend(Xt, {
        tweener: function (e, t) {
            me.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], $t[n] = $t[n] || [], $t[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? It.unshift(e) : It.push(e)
        }
    }), ((me.Tween = Ut).prototype = {
        constructor: Ut,
        init: function (e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (me.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = Ut.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ut.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = Ut.propHooks[this.prop];
            return this.pos = t = this.options.duration ? me.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ut.propHooks._default.set(this), this
        }
    }).init.prototype = Ut.prototype, (Ut.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = me.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0 : e.elem[e.prop]
            }, set: function (e) {
                me.fx.step[e.prop] ? me.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[me.cssProps[e.prop]] || me.cssHooks[e.prop]) ? me.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }).scrollTop = Ut.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, me.each(["toggle", "show", "hide"], function (e, r) {
        var i = me.fn[r];
        me.fn[r] = function (e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(Jt(r, !0), e, t, n)
        }
    }), me.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(Ze).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        }, animate: function (t, e, n, r) {
            var i = me.isEmptyObject(t),
                o = me.speed(e, n, r),
                a = function () {
                    var e = Xt(this, me.extend({}, t), o);
                    a.finish = function () {
                        e.stop(!0)
                    }, (i || me._data(this, "finish")) && e.stop(!0)
                };
            return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        }, stop: function (i, e, o) {
            var a = function (e) {
                var t = e.stop;
                delete e.stop, t(o)
            };
            return "string" != typeof i && (o = e, e = i, i = k), e && !1 !== i && this.queue(i || "fx", []), this.each(function () {
                var e = !0,
                    t = null != i && i + "queueHooks",
                    n = me.timers,
                    r = me._data(this);
                if (t) r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r) r[t] && r[t].stop && Pt.test(t) && a(r[t]);
                for (t = n.length; t--;) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                (e || !o) && me.dequeue(this, i)
            })
        }, finish: function (a) {
            return !1 !== a && (a = a || "fx"), this.each(function () {
                var e, t = me._data(this),
                    n = t[a + "queue"],
                    r = t[a + "queueHooks"],
                    i = me.timers,
                    o = n ? n.length : 0;
                for (t.finish = !0, me.queue(this, a, []), r && r.cur && r.cur.finish && r.cur.finish.call(this), e = i.length; e--;) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
                for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }), me.each({
        slideDown: Jt("show"),
        slideUp: Jt("hide"),
        slideToggle: Jt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, r) {
        me.fn[e] = function (e, t, n) {
            return this.animate(r, e, t, n)
        }
    }), me.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? me.extend({}, e) : {
            complete: n || !n && t || me.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !me.isFunction(t) && t
        };
        return r.duration = me.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in me.fx.speeds ? me.fx.speeds[r.duration] : me.fx.speeds._default, (null == r.queue || !0 === r.queue) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            me.isFunction(r.old) && r.old.call(this), r.queue && me.dequeue(this, r.queue)
        }, r
    }, me.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, me.timers = [], me.fx = Ut.prototype.init, me.fx.tick = function () {
        var e, t = me.timers,
            n = 0;
        for (Ot = me.now(); t.length > n; n++)(e = t[n])() || t[n] !== e || t.splice(n--, 1);
        t.length || me.fx.stop(), Ot = k
    }, me.fx.timer = function (e) {
        e() && me.timers.push(e) && me.fx.start()
    }, me.fx.interval = 13, me.fx.start = function () {
        Ft || (Ft = setInterval(me.fx.tick, me.fx.interval))
    }, me.fx.stop = function () {
        clearInterval(Ft), Ft = null
    }, me.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, me.fx.step = {}, me.expr && me.expr.filters && (me.expr.filters.animated = function (t) {
        return me.grep(me.timers, function (e) {
            return t === e.elem
        }).length
    }), me.fn.offset = function (t) {
        if (arguments.length) return t === k ? this : this.each(function (e) {
            me.offset.setOffset(this, t, e)
        });
        var e, n, r = {
                top: 0,
                left: 0
            },
            i = this[0],
            o = i && i.ownerDocument;
        return o ? (e = o.documentElement, me.contains(e, i) ? (typeof i.getBoundingClientRect !== y && (r = i.getBoundingClientRect()), n = Vt(o), {
            top: r.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
            left: r.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
        }) : r) : void 0
    }, me.offset = {
        setOffset: function (e, t, n) {
            var r = me.css(e, "position");
            "static" === r && (e.style.position = "relative");
            var i, o, a = me(e),
                s = a.offset(),
                l = me.css(e, "top"),
                u = me.css(e, "left"),
                c = {},
                f = {};
            ("absolute" === r || "fixed" === r) && -1 < me.inArray("auto", [l, u]) ? (i = (f = a.position()).top, o = f.left) : (i = parseFloat(l) || 0, o = parseFloat(u) || 0), me.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (c.top = t.top - s.top + i), null != t.left && (c.left = t.left - s.left + o), "using" in t ? t.using.call(e, c) : a.css(c)
        }
    }, me.fn.extend({
        position: function () {
            if (this[0]) {
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    r = this[0];
                return "fixed" === me.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), me.nodeName(e[0], "html") || (n = e.offset()), n.top += me.css(e[0], "borderTopWidth", !0), n.left += me.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - me.css(r, "marginTop", !0),
                    left: t.left - n.left - me.css(r, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || g.documentElement; e && !me.nodeName(e, "html") && "static" === me.css(e, "position");) e = e.offsetParent;
                return e || g.documentElement
            })
        }
    }), me.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (t, i) {
        var o = /Y/.test(i);
        me.fn[t] = function (e) {
            return me.access(this, function (e, t, n) {
                var r = Vt(e);
                return n === k ? r ? i in r ? r[i] : r.document.documentElement[t] : e[t] : (r ? r.scrollTo(o ? me(r).scrollLeft() : n, o ? n : me(r).scrollTop()) : e[t] = n, k)
            }, t, e, arguments.length, null)
        }
    }), me.each({
        Height: "height",
        Width: "width"
    }, function (o, a) {
        me.each({
            padding: "inner" + o,
            content: a,
            "": "outer" + o
        }, function (r, e) {
            me.fn[e] = function (e, t) {
                var n = arguments.length && (r || "boolean" != typeof e),
                    i = r || (!0 === e || !0 === t ? "margin" : "border");
                return me.access(this, function (e, t, n) {
                    var r;
                    return me.isWindow(e) ? e.document.documentElement["client" + o] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + o], r["scroll" + o], e.body["offset" + o], r["offset" + o], r["client" + o])) : n === k ? me.css(e, t, i) : me.style(e, t, n, i)
                }, a, n ? e : k, n, null)
            }
        })
    }), h.jQuery = h.$ = me, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return me
    })
}(window),
function (s, r, i, l) {
    var u = s(r);
    s.fn.lazyload = function (e) {
        function t() {
            var t = 0;
            o.each(function () {
                var e = s(this);
                if (!a.skip_invisible || e.is(":visible"))
                    if (s.abovethetop(this, a) || s.leftofbegin(this, a));
                    else if (s.belowthefold(this, a) || s.rightoffold(this, a)) {
                    if (++t > a.failure_limit) return !1
                } else e.trigger("appear"), t = 0
            })
        }
        var n, o = this,
            a = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: r,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        return e && (l !== e.failurelimit && (e.failure_limit = e.failurelimit, delete e.failurelimit), l !== e.effectspeed && (e.effect_speed = e.effectspeed, delete e.effectspeed), s.extend(a, e)), n = a.container === l || a.container === r ? u : s(a.container), 0 === a.event.indexOf("scroll") && n.bind(a.event, function () {
            return t()
        }), this.each(function () {
            var r = this,
                i = s(r);
            r.loaded = !1, (i.attr("src") === l || !1 === i.attr("src")) && i.is("img") && i.attr("src", a.placeholder), i.one("appear", function () {
                if (!this.loaded) {
                    if (a.appear) {
                        var e = o.length;
                        a.appear.call(r, e, a)
                    }
                    s("<img />").bind("load", function () {
                        var e = i.attr("data-" + a.data_attribute);
                        i.hide(), i.is("img") ? i.attr("src", e) : i.css("background-image", "url('" + e + "')"), i[a.effect](a.effect_speed), r.loaded = !0;
                        var t = s.grep(o, function (e) {
                            return !e.loaded
                        });
                        if (o = s(t), a.load) {
                            var n = o.length;
                            a.load.call(r, n, a)
                        }
                    }).attr("src", i.attr("data-" + a.data_attribute))
                }
            }), 0 !== a.event.indexOf("scroll") && i.bind(a.event, function () {
                r.loaded || i.trigger("appear")
            })
        }), u.bind("resize", function () {
            t()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && u.bind("pageshow", function (e) {
            e.originalEvent && e.originalEvent.persisted && o.each(function () {
                s(this).trigger("appear")
            })
        }), s(i).ready(function () {
            t()
        }), this
    }, s.belowthefold = function (e, t) {
        return (t.container === l || t.container === r ? (r.innerHeight ? r.innerHeight : u.height()) + u.scrollTop() : s(t.container).offset().top + s(t.container).height()) <= s(e).offset().top - t.threshold
    }, s.rightoffold = function (e, t) {
        return (t.container === l || t.container === r ? u.width() + u.scrollLeft() : s(t.container).offset().left + s(t.container).width()) <= s(e).offset().left - t.threshold
    }, s.abovethetop = function (e, t) {
        return (t.container === l || t.container === r ? u.scrollTop() : s(t.container).offset().top) >= s(e).offset().top + t.threshold + s(e).height()
    }, s.leftofbegin = function (e, t) {
        return (t.container === l || t.container === r ? u.scrollLeft() : s(t.container).offset().left) >= s(e).offset().left + t.threshold + s(e).width()
    }, s.inviewport = function (e, t) {
        return !(s.rightoffold(e, t) || s.leftofbegin(e, t) || s.belowthefold(e, t) || s.abovethetop(e, t))
    }, s.extend(s.expr[":"], {
        "below-the-fold": function (e) {
            return s.belowthefold(e, {
                threshold: 0
            })
        }, "above-the-top": function (e) {
            return !s.belowthefold(e, {
                threshold: 0
            })
        }, "right-of-screen": function (e) {
            return s.rightoffold(e, {
                threshold: 0
            })
        }, "left-of-screen": function (e) {
            return !s.rightoffold(e, {
                threshold: 0
            })
        }, "in-viewport": function (e) {
            return s.inviewport(e, {
                threshold: 0
            })
        }, "above-the-fold": function (e) {
            return !s.belowthefold(e, {
                threshold: 0
            })
        }, "right-of-fold": function (e) {
            return s.rightoffold(e, {
                threshold: 0
            })
        }, "left-of-fold": function (e) {
            return !s.rightoffold(e, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document), $.extend({
    getParam: function (e) {
        var t = document.location.search,
            n = new RegExp("[?&]" + e + "=([^&]+)", "g").exec(t),
            r = null;
        if (null != n) try {
            r = decodeURIComponent(decodeURIComponent(n[1]))
        } catch (i) {
            try {
                r = decodeURIComponent(n[1])
            } catch (i) {
                r = n[1]
            }
        }
        return r
    }, sendReq: function (e, t, n, r, a) {
        $.ajax({
            url: e,
            type: t,
            asasync: !1,
            dataType: "json",
            data: n,
            success: function (e) {
                r(e)
            }, error: function (e, t, n) {
                a && a();
                var r = $(".error-close");
                r.find(".infor").html("网络请求超时！"), r.css("margin-left", "0px");
                var i = parseInt(r.outerWidth(!0) / 2);
                r.css("margin-left", -i + "px"), r.slideDown();
                var o = setTimeout(function () {
                    r.fadeOut(), clearTimeout(o)
                }, 1e3)
            }
        })
    }, addCookie: function (e, t, n) {
        var r = e + "=" + escape(t);
        if (0 < n) {
            var i = new Date,
                o = 3600 * n * 1e3;
            i.setTime(i.getTime() + o), r += "; expires=" + i.toGMTString()
        }
        document.cookie = r
    }, getCookie: function (e) {
        for (var t = document.cookie.split("; "), n = 0; n < t.length; n++) {
            var r = t[n].split("=");
            if (r[0] == e) return unescape(r[1])
        }
    }, delCookie: function (e) {
        var t = new Date;
        t.setTime(t.getTime() - 1e4), document.cookie = e + "=a; expires=" + t.toGMTString()
    }, setStorage: function (e, t) {
        var n = {
            value: t
        };
        localStorage[e] = encodeURIComponent(JSON.stringify(n))
    }, getStorage: function (e) {
        var t = localStorage[e],
            n = null;
        if (!t || "null" === t) return null;
        try {
            n = decodeURIComponent(decodeURIComponent(t))
        } catch (r) {
            try {
                n = decodeURIComponent(t)
            } catch (r) {
                n = t
            }
        }
        return JSON.parse(n).value
    }, removeLocalStorage: function (e) {
        localStorage.removeItem(e)
    }, setSession: function (e, t) {
        var n = {
            value: t
        };
        sessionStorage[e] = encodeURIComponent(JSON.stringify(n))
    }, getSession: function (e) {
        var t = sessionStorage[e],
            n = null;
        if (!t || "null" === t) return null;
        try {
            n = decodeURIComponent(decodeURIComponent(t))
        } catch (r) {
            try {
                n = decodeURIComponent(t)
            } catch (r) {
                n = t
            }
        }
        return JSON.parse(n).value
    }, removeSessionStorage: function (e) {
        sessionStorage.removeItem(e)
    }, lazyImg: function (e) {
        $("img." + e).lazyload({
            placeholder: "assets/images/logoBd2.svg",
            effect: "fadeIn",
            threshold: 200
        })
    }
});