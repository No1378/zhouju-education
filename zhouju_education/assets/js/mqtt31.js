/* @file mqtt31.js
 * @date 2018.10.15 15:45:21
 */
"undefined" == typeof nTalk && (nTalk = {}), nTalk.MQTT = function (e) {
    function t(e, t) {
        var s = t,
            n = e[t],
            o = n >> 4,
            r = n &= 15;
        t += 1;
        var a, d = 0,
            u = 1;
        do {
            if (t == e.length) return [null, s];
            d += (127 & (a = e[t++])) * u, u *= 128
        } while (0 != (128 & a));
        var f = t + d;
        if (f > e.length) return [null, s];
        var l = new I(o);
        switch (o) {
        case h.CONNACK:
            1 & e[t++] && (l.sessionPresent = !0), l.returnCode = e[t++];
            break;
        case h.PUBLISH:
            var g = r >> 1 & 3,
                _ = i(e, t),
                p = c(e, t += 2, _);
            t += _, g > 0 && (l.messageIdentifier = i(e, t), t += 2);
            var y = new nTalk.MQTT.Message(e.subarray(t, f));
            1 == (1 & r) && (y.retained = !0), 8 == (8 & r) && (y.duplicate = !0), y.qos = g, y.destinationName = p, l.payloadMessage = y;
            break;
        case h.PUBACK:
        case h.PUBREC:
        case h.PUBREL:
        case h.PUBCOMP:
        case h.UNSUBACK:
            l.messageIdentifier = i(e, t);
            break;
        case h.SUBACK:
            l.messageIdentifier = i(e, t), t += 2, l.returnCode = e.subarray(t, f)
        }
        return [l, f]
    }

    function s(e, t, s) {
        return t[s++] = e >> 8, t[s++] = e % 256, s
    }

    function n(e, t, n, i) {
        return i = s(t, n, i), a(e, n, i), i + t
    }

    function i(e, t) {
        return 256 * e[t] + e[t + 1]
    }

    function o(e) {
        var t = new Array(1),
            s = 0;
        do {
            var n = e % 128;
            (e >>= 7) > 0 && (n |= 128), t[s++] = n
        } while (e > 0 && s < 4);
        return t
    }

    function r(e) {
        for (var t = 0, s = 0; s < e.length; s++) {
            var n = e.charCodeAt(s);
            n > 2047 ? (55296 <= n && n <= 56319 && (s++, t++), t += 3) : n > 127 ? t += 2 : t++
        }
        return t
    }

    function a(e, t, s) {
        for (var n = s, i = 0; i < e.length; i++) {
            var o = e.charCodeAt(i);
            if (55296 <= o && o <= 56319) {
                var r = e.charCodeAt(++i);
                if (isNaN(r)) throw new Error(g(f.MALFORMED_UNICODE, [o, r]));
                o = r - 56320 + (o - 55296 << 10) + 65536
            }
            o <= 127 ? t[n++] = o : o <= 2047 ? (t[n++] = o >> 6 & 31 | 192, t[n++] = 63 & o | 128) : o <= 65535 ? (t[n++] = o >> 12 & 15 | 224, t[n++] = o >> 6 & 63 | 128, t[n++] = 63 & o | 128) : (t[n++] = o >> 18 & 7 | 240, t[n++] = o >> 12 & 63 | 128, t[n++] = o >> 6 & 63 | 128, t[n++] = 63 & o | 128)
        }
        return t
    }

    function c(e, t, s) {
        for (var n, i = "", o = t; o < t + s;) {
            var r = e[o++];
            if (r < 128) n = r;
            else {
                var a = e[o++] - 128;
                if (a < 0) throw new Error(g(f.MALFORMED_UTF, [r.toString(16), a.toString(16), ""]));
                if (r < 224) n = 64 * (r - 192) + a;
                else {
                    var c = e[o++] - 128;
                    if (c < 0) throw new Error(g(f.MALFORMED_UTF, [r.toString(16), a.toString(16), c.toString(16)]));
                    if (r < 240) n = 4096 * (r - 224) + 64 * a + c;
                    else {
                        var h = e[o++] - 128;
                        if (h < 0) throw new Error(g(f.MALFORMED_UTF, [r.toString(16), a.toString(16), c.toString(16), h.toString(16)]));
                        if (!(r < 248)) throw new Error(g(f.MALFORMED_UTF, [r.toString(16), a.toString(16), c.toString(16), h.toString(16)]));
                        n = 262144 * (r - 240) + 4096 * a + 64 * c + h
                    }
                }
            }
            n > 65535 && (n -= 65536, i += String.fromCharCode(55296 + (n >> 10)), n = 56320 + (1023 & n)), i += String.fromCharCode(n)
        }
        return i
    }
    var h = {
            CONNECT: 1,
            CONNACK: 2,
            PUBLISH: 3,
            PUBACK: 4,
            PUBREC: 5,
            PUBREL: 6,
            PUBCOMP: 7,
            SUBSCRIBE: 8,
            SUBACK: 9,
            UNSUBSCRIBE: 10,
            UNSUBACK: 11,
            PINGREQ: 12,
            PINGRESP: 13,
            DISCONNECT: 14
        },
        d = function (e, t) {
            var s, n;
            for (s in e)
                if (e.hasOwnProperty(s)) {
                    if (!t.hasOwnProperty(s)) {
                        var i = "Unknown property, " + s + ". Valid properties are:";
                        for (n in t) t.hasOwnProperty(n) && (i = i + " " + n);
                        throw new Error(i)
                    }
                    if (typeof e[s] !== t[s]) throw new Error(g(f.INVALID_TYPE, [typeof e[s], s]))
                }
        },
        u = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        },
        f = {
            OK: {
                code: 0,
                text: "AMQJSC0000I OK."
            },
            CONNECT_TIMEOUT: {
                code: 1,
                text: "AMQJSC0001E Connect timed out."
            },
            SUBSCRIBE_TIMEOUT: {
                code: 2,
                text: "AMQJS0002E Subscribe timed out."
            },
            UNSUBSCRIBE_TIMEOUT: {
                code: 3,
                text: "AMQJS0003E Unsubscribe timed out."
            },
            PING_TIMEOUT: {
                code: 4,
                text: "AMQJS0004E Ping timed out."
            },
            INTERNAL_ERROR: {
                code: 5,
                text: "AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"
            },
            CONNACK_RETURNCODE: {
                code: 6,
                text: "AMQJS0006E Bad Connack return code:{0} {1}."
            },
            SOCKET_ERROR: {
                code: 7,
                text: "AMQJS0007E Socket error:{0}."
            },
            SOCKET_CLOSE: {
                code: 8,
                text: "AMQJS0008I Socket closed."
            },
            MALFORMED_UTF: {
                code: 9,
                text: "AMQJS0009E Malformed UTF data:{0} {1} {2}."
            },
            UNSUPPORTED: {
                code: 10,
                text: "AMQJS0010E {0} is not supported by this browser."
            },
            INVALID_STATE: {
                code: 11,
                text: "AMQJS0011E Invalid state {0}."
            },
            INVALID_TYPE: {
                code: 12,
                text: "AMQJS0012E Invalid type {0} for {1}."
            },
            INVALID_ARGUMENT: {
                code: 13,
                text: "AMQJS0013E Invalid argument {0} for {1}."
            },
            UNSUPPORTED_OPERATION: {
                code: 14,
                text: "AMQJS0014E Unsupported operation."
            },
            INVALID_STORED_DATA: {
                code: 15,
                text: "AMQJS0015E Invalid data in local storage key={0} value={1}."
            },
            INVALID_MQTT_MESSAGE_TYPE: {
                code: 16,
                text: "AMQJS0016E Invalid MQTT message type {0}."
            },
            MALFORMED_UNICODE: {
                code: 17,
                text: "AMQJS0017E Malformed Unicode string:{0} {1}."
            }
        },
        l = {
            0: "Connection Accepted",
            1: "Connection Refused: unacceptable protocol version",
            2: "Connection Refused: identifier rejected",
            3: "Connection Refused: server unavailable",
            4: "Connection Refused: bad user name or password",
            5: "Connection Refused: not authorized"
        },
        g = function (e, t) {
            var s = e.text;
            if (t)
                for (var n, i, o = 0; o < t.length; o++)
                    if (n = "{" + o + "}", (i = s.indexOf(n)) > 0) {
                        var r = s.substring(0, i),
                            a = s.substring(i + n.length);
                        s = r + t[o] + a
                    }
            return s
        },
        _ = [0, 6, 77, 81, 73, 115, 100, 112, 3],
        p = [0, 4, 77, 81, 84, 84, 4],
        I = function (e, t) {
            this.type = e;
            for (var s in t) t.hasOwnProperty(s) && (this[s] = t[s])
        };
    I.prototype.encode = function () {
        var e, t, i = (15 & this.type) << 4,
            a = 0,
            c = [],
            d = 0;
        switch (this.messageIdentifier !== undefined && (a += 2), this.type) {
        case h.CONNECT:
            switch (this.mqttVersion) {
            case 3:
                a += _.length + 3;
                break;
            case 4:
                a += p.length + 3
            }
            a += r(this.clientId) + 2, this.willMessage !== undefined && (a += r(this.willMessage.destinationName) + 2, (t = this.willMessage.payloadBytes) instanceof Uint8Array || (t = new Uint8Array(u)), a += t.byteLength + 2), this.userName !== undefined && (a += r(this.userName) + 2), this.password !== undefined && (a += r(this.password) + 2);
            break;
        case h.SUBSCRIBE:
            for (i |= 2, e = 0; e < this.topics.length; e++) c[e] = r(this.topics[e]), a += c[e] + 2;
            a += this.requestedQos.length;
            break;
        case h.UNSUBSCRIBE:
            for (i |= 2, e = 0; e < this.topics.length; e++) c[e] = r(this.topics[e]), a += c[e] + 2;
            break;
        case h.PUBREL:
            i |= 2;
            break;
        case h.PUBLISH:
            this.payloadMessage.duplicate && (i |= 8), i = i |= this.payloadMessage.qos << 1, this.payloadMessage.retained && (i |= 1), a += (d = r(this.payloadMessage.destinationName)) + 2;
            var u = this.payloadMessage.payloadBytes;
            a += u.byteLength, u instanceof ArrayBuffer ? u = new Uint8Array(u) : u instanceof Uint8Array || (u = new Uint8Array(u.buffer));
            break;
        case h.DISCONNECT:
        }
        var f = o(a),
            l = f.length + 1,
            g = new ArrayBuffer(a + l),
            I = new Uint8Array(g);
        if (I[0] = i, I.set(f, 1), this.type == h.PUBLISH) l = n(this.payloadMessage.destinationName, d, I, l);
        else if (this.type == h.CONNECT) {
            switch (this.mqttVersion) {
            case 3:
                I.set(_, l), l += _.length;
                break;
            case 4:
                I.set(p, l), l += p.length
            }
            var y = 0;
            this.cleanSession && (y = 2), this.willMessage !== undefined && (y |= 4, y |= this.willMessage.qos << 3, this.willMessage.retained && (y |= 32)), this.userName !== undefined && (y |= 128), this.password !== undefined && (y |= 64), I[l++] = y, l = s(this.keepAliveInterval, I, l)
        }
        switch (this.messageIdentifier !== undefined && (l = s(this.messageIdentifier, I, l)), this.type) {
        case h.CONNECT:
            l = n(this.clientId, r(this.clientId), I, l), this.willMessage !== undefined && (l = n(this.willMessage.destinationName, r(this.willMessage.destinationName), I, l), l = s(t.byteLength, I, l), I.set(t, l), l += t.byteLength), this.userName !== undefined && (l = n(this.userName, r(this.userName), I, l)), this.password !== undefined && (l = n(this.password, r(this.password), I, l));
            break;
        case h.PUBLISH:
            I.set(u, l);
            break;
        case h.SUBSCRIBE:
            for (e = 0; e < this.topics.length; e++) l = n(this.topics[e], c[e], I, l), I[l++] = this.requestedQos[e];
            break;
        case h.UNSUBSCRIBE:
            for (e = 0; e < this.topics.length; e++) l = n(this.topics[e], c[e], I, l)
        }
        return g
    };
    var y = function (e, t, s) {
            this._client = e, this._window = t, this._keepAliveInterval = 1e3 * s, this.isReset = !1;
            var n = new I(h.PINGREQ).encode(),
                i = function (e) {
                    return function () {
                        return o.apply(e)
                    }
                },
                o = function () {
                    this.isReset ? (this.isReset = !1, this._client._trace("Pinger.doPing", "send PINGREQ"), this._client.socket.send(n), this.timeout = this._window.setTimeout(i(this), this._keepAliveInterval)) : (this._client._trace("Pinger.doPing", "Timed out"), this._client._disconnected(f.PING_TIMEOUT.code, g(f.PING_TIMEOUT)))
                };
            this.reset = function () {
                this.isReset = !0, this._window.clearTimeout(this.timeout), this._keepAliveInterval > 0 && (this.timeout = setTimeout(i(this), this._keepAliveInterval))
            }, this.cancel = function () {
                this._window.clearTimeout(this.timeout)
            }
        },
        E = function (e, t, s, n, i) {
            this._window = t, s || (s = 30);
            this.timeout = setTimeout(function (e, t, s) {
                return function () {
                    return e.apply(t, s)
                }
            }(n, e, i), 1e3 * s), this.cancel = function () {
                this._window.clearTimeout(this.timeout)
            }
        },
        w = function (t, s, n, i, o) {
            if (!("WebSocket" in e && null !== e.WebSocket)) throw new Error(g(f.UNSUPPORTED, ["WebSocket"]));
            if (!("localStorage" in e && null !== e.localStorage)) throw new Error(g(f.UNSUPPORTED, ["localStorage"]));
            if (!("ArrayBuffer" in e && null !== e.ArrayBuffer)) throw new Error(g(f.UNSUPPORTED, ["ArrayBuffer"]));
            this._trace("nTalk.MQTT.Client", t, s, n, i, o), this.host = s, this.port = n, this.path = i, this.uri = t, this.clientId = o, this._localKey = s + ":" + n + ("/mqtt" != i ? ":" + i : "") + ":" + o + ":", this._msg_queue = [], this._sentMessages = {}, this._receivedMessages = {}, this._notify_msg_sent = {}, this._message_identifier = 1, this._sequence = 0;
            for (var r in localStorage) 0 !== r.indexOf("Sent:" + this._localKey) && 0 !== r.indexOf("Received:" + this._localKey) || this.restore(r)
        };
    w.prototype.host = "", w.prototype.port = 0, w.prototype.path = "", w.prototype.uri = "", w.prototype.clientId = "", w.prototype.socket = null, w.prototype.connected = !1, w.prototype.maxMessageIdentifier = 65536, w.prototype.connectOptions = {}, w.prototype.hostIndex = 0, w.prototype.onConnectionLost = function () {}, w.prototype.onMessageDelivered = function () {}, w.prototype.onMessageArrived = function () {}, w.prototype.traceFunction = function () {}, w.prototype._msg_queue = null, w.prototype._connectTimeout = null, w.prototype.sendPinger = null, w.prototype.receivePinger = null, w.prototype.receiveBuffer = null, w.prototype._traceBuffer = null, w.prototype._MAX_TRACE_ENTRIES = 100, w.prototype.connect = function (e) {
        var t = this._traceMask(e, "password");
        if (this._trace("Client.connect", t, this.socket, this.connected), this.connected) throw new Error(g(f.INVALID_STATE, ["already connected"]));
        if (this.socket) throw new Error(g(f.INVALID_STATE, ["already connected"]));
        this.connectOptions = e, e.uris ? (this.hostIndex = 0, this._doConnect(e.uris[0])) : this._doConnect(this.uri)
    }, w.prototype.subscribe = function (e, t) {
        if (this._trace("Client.subscribe", e, t), !this.connected) throw new Error(g(f.INVALID_STATE, ["not connected"]));
        var s = new I(h.SUBSCRIBE);
        s.topics = [e], t.qos !== undefined ? s.requestedQos = [t.qos] : s.requestedQos = [0], t.onSuccess && (s.onSuccess = function (e) {
            t.onSuccess({
                invocationContext: t.invocationContext,
                grantedQos: e
            })
        }), t.onFailure && (s.onFailure = function (e) {
            t.onFailure({
                invocationContext: t.invocationContext,
                errorCode: e
            })
        }), t.timeout && (s.timeOut = new E(this, window, t.timeout, t.onFailure, [{
            invocationContext: t.invocationContext,
            errorCode: f.SUBSCRIBE_TIMEOUT.code,
            errorMessage: g(f.SUBSCRIBE_TIMEOUT)
        }])), this._requires_ack(s), this._schedule_message(s)
    }, w.prototype.unsubscribe = function (e, t) {
        if (this._trace("Client.unsubscribe", e, t), !this.connected) throw new Error(g(f.INVALID_STATE, ["not connected"]));
        var s = new I(h.UNSUBSCRIBE);
        s.topics = [e], t.onSuccess && (s.callback = function () {
            t.onSuccess({
                invocationContext: t.invocationContext
            })
        }), t.timeout && (s.timeOut = new E(this, window, t.timeout, t.onFailure, [{
            invocationContext: t.invocationContext,
            errorCode: f.UNSUBSCRIBE_TIMEOUT.code,
            errorMessage: g(f.UNSUBSCRIBE_TIMEOUT)
        }])), this._requires_ack(s), this._schedule_message(s)
    }, w.prototype.send = function (e) {
        if (this._trace("Client.send", e), !this.connected) throw new Error(g(f.INVALID_STATE, ["not connected"]));
        wireMessage = new I(h.PUBLISH), wireMessage.payloadMessage = e, e.qos > 0 ? this._requires_ack(wireMessage) : this.onMessageDelivered && (this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage)), this._schedule_message(wireMessage)
    }, w.prototype.disconnect = function () {
        if (this._trace("Client.disconnect"), !this.socket) throw new Error(g(f.INVALID_STATE, ["not connecting or connected"]));
        wireMessage = new I(h.DISCONNECT), this._notify_msg_sent[wireMessage] = u(this._disconnected, this), this._schedule_message(wireMessage)
    }, w.prototype.getTraceLog = function () {
        var e;
        if (null !== this._traceBuffer) {
            this._trace("Client.getTraceLog", new Date), this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
            for (e in this._sentMessages) this._trace("_sentMessages ", e, this._sentMessages[e]);
            for (e in this._receivedMessages) this._trace("_receivedMessages ", e, this._receivedMessages[e]);
            return this._traceBuffer
        }
    }, w.prototype.startTrace = function () {
        null === this._traceBuffer && (this._traceBuffer = []), this._trace("Client.startTrace", new Date, "@VERSION@")
    }, w.prototype.stopTrace = function () {
        delete this._traceBuffer
    }, w.prototype._doConnect = function (e) {
        if (this.connectOptions.useSSL) {
            var t = e.split(":");
            t[0] = "wss", e = t.join(":")
        }
        this.connected = !1;
        try {
            this.connectOptions.mqttVersion < 4 ? this.socket = new WebSocket(e, ["mqttv3.1"]) : this.socket = new WebSocket(e, ["mqtt"])
        } catch (s) {}
        this.socket.binaryType = "arraybuffer", this.socket.onopen = u(this._on_socket_open, this), this.socket.onmessage = u(this._on_socket_message, this), this.socket.onerror = u(this._on_socket_error, this), this.socket.onclose = u(this._on_socket_close, this), this.sendPinger = new y(this, window, this.connectOptions.keepAliveInterval), this.receivePinger = new y(this, window, this.connectOptions.keepAliveInterval), this._connectTimeout = new E(this, window, this.connectOptions.timeout, this._disconnected, [f.CONNECT_TIMEOUT.code, g(f.CONNECT_TIMEOUT)])
    }, w.prototype._schedule_message = function (e) {
        this._msg_queue.push(e), this.connected && this._process_queue()
    }, w.prototype.store = function (e, t) {
        var s = {
            type: t.type,
            messageIdentifier: t.messageIdentifier,
            version: 1
        };
        switch (t.type) {
        case h.PUBLISH:
            t.pubRecReceived && (s.pubRecReceived = !0), s.payloadMessage = {};
            for (var n = "", i = t.payloadMessage.payloadBytes, o = 0; o < i.length; o++) i[o] <= 15 ? n = n + "0" + i[o].toString(16) : n += i[o].toString(16);
            s.payloadMessage.payloadHex = n, s.payloadMessage.qos = t.payloadMessage.qos, s.payloadMessage.destinationName = t.payloadMessage.destinationName, t.payloadMessage.duplicate && (s.payloadMessage.duplicate = !0), t.payloadMessage.retained && (s.payloadMessage.retained = !0), 0 === e.indexOf("Sent:") && (t.sequence === undefined && (t.sequence = ++this._sequence), s.sequence = t.sequence);
            break;
        default:
            throw Error(g(f.INVALID_STORED_DATA, [key, s]))
        }
        localStorage.setItem(e + this._localKey + t.messageIdentifier, JSON.stringify(s))
    }, w.prototype.clear = function () {
        for (var e in localStorage) 0 !== e.indexOf("Sent:" + this._localKey) && 0 !== e.indexOf("Received:" + this._localKey) || localStorage.removeItem(e)
    }, w.prototype.restore = function (e) {
        var t = localStorage.getItem(e),
            s = JSON.parse(t),
            n = new I(s.type, s);
        switch (s.type) {
        case h.PUBLISH:
            for (var i = s.payloadMessage.payloadHex, o = new ArrayBuffer(i.length / 2), r = new Uint8Array(o), a = 0; i.length >= 2;) {
                var c = parseInt(i.substring(0, 2), 16);
                i = i.substring(2, i.length), r[a++] = c
            }
            var d = new nTalk.MQTT.Message(r);
            d.qos = s.payloadMessage.qos, d.destinationName = s.payloadMessage.destinationName, s.payloadMessage.duplicate && (d.duplicate = !0), s.payloadMessage.retained && (d.retained = !0), n.payloadMessage = d;
            break;
        default:
            throw Error(g(f.INVALID_STORED_DATA, [e, t]))
        }
        0 === e.indexOf("Sent:" + this._localKey) ? (n.payloadMessage.duplicate = !0, this._sentMessages[n.messageIdentifier] = n) : 0 === e.indexOf("Received:" + this._localKey) && (this._receivedMessages[n.messageIdentifier] = n)
    }, w.prototype._process_queue = function () {
        for (var e = null, t = this._msg_queue.reverse(); e = t.pop();) this._socket_send(e), this._notify_msg_sent[e] && (this._notify_msg_sent[e](), delete this._notify_msg_sent[e])
    }, w.prototype._requires_ack = function (e) {
        var t = Object.keys(this._sentMessages).length;
        if (t > this.maxMessageIdentifier) throw Error("Too many messages:" + t);
        for (; this._sentMessages[this._message_identifier] !== undefined;) this._message_identifier++;
        e.messageIdentifier = this._message_identifier, this._sentMessages[e.messageIdentifier] = e, e.type === h.PUBLISH && this.store("Sent:", e), this._message_identifier === this.maxMessageIdentifier && (this._message_identifier = 1)
    }, w.prototype._on_socket_open = function () {
        var e = new I(h.CONNECT, this.connectOptions);
        e.clientId = this.clientId, this._socket_send(e)
    }, w.prototype._on_socket_message = function (e) {
        this._trace("Client._on_socket_message", e.data), this.receivePinger.reset();
        for (var t = this._deframeMessages(e.data), s = 0; s < t.length; s += 1) this._handleMessage(t[s])
    }, w.prototype._deframeMessages = function (e) {
        var s = [],
            n = 0,
            i = new Uint8Array(e);
        if (this.receiveBuffer) {
            var o = new Uint8Array(this.receiveBuffer.length + i.length);
            o.set(this.receiveBuffer), o.set(i, this.receiveBuffer.length), i = o, delete this.receiveBuffer
        }
        try {
            for (; n < i.length;) {
                var r = t(i, n),
                    a = r[0];
                if (n = r[1], null === a) break;
                s.push(a)
            }
            n < i.length && (this.receiveBuffer = i.subarray(n))
        } catch (c) {
            return void this._disconnected(f.INTERNAL_ERROR.code, g(f.INTERNAL_ERROR, [c.message, c.stack.toString()]))
        }
        return s
    }, w.prototype._handleMessage = function (e) {
        var t, s, n, i;
        this._trace("Client._handleMessage", e);
        try {
            switch (e.type) {
            case h.CONNACK:
                if (this._connectTimeout.cancel(), this.connectOptions.cleanSession) {
                    for (t in this._sentMessages) s = this._sentMessages[t], localStorage.removeItem("Sent:" + this._localKey + s.messageIdentifier);
                    this._sentMessages = {};
                    for (t in this._receivedMessages) n = this._receivedMessages[t], localStorage.removeItem("Received:" + this._localKey + n.messageIdentifier);
                    this._receivedMessages = {}
                }
                if (0 !== e.returnCode) {
                    this._disconnected(f.CONNACK_RETURNCODE.code, g(f.CONNACK_RETURNCODE, [e.returnCode, l[e.returnCode]]));
                    break
                }
                this.connected = !0, this.connectOptions.uris && (this.hostIndex = this.connectOptions.uris.length);
                var o = [];
                for (var r in this._sentMessages) this._sentMessages.hasOwnProperty(r) && o.push(this._sentMessages[r]);
                for (var a = 0, c = (o = o.sort(function (e, t) {
                    return e.sequence - t.sequence
                })).length; a < c; a++)(s = o[a]).type == h.PUBLISH && s.pubRecReceived ? (i = new I(h.PUBREL, {
                    messageIdentifier: s.messageIdentifier
                }), this._schedule_message(i)) : this._schedule_message(s);
                this.connectOptions.onSuccess && this.connectOptions.onSuccess({
                    invocationContext: this.connectOptions.invocationContext
                }), this._process_queue();
                break;
            case h.PUBLISH:
                this._receivePublish(e);
                break;
            case h.PUBACK:
                (s = this._sentMessages[e.messageIdentifier]) && (delete this._sentMessages[e.messageIdentifier], localStorage.removeItem("Sent:" + this._localKey + e.messageIdentifier), this.onMessageDelivered && this.onMessageDelivered(s.payloadMessage));
                break;
            case h.PUBREC:
                (s = this._sentMessages[e.messageIdentifier]) && (s.pubRecReceived = !0, i = new I(h.PUBREL, {
                    messageIdentifier: e.messageIdentifier
                }), this.store("Sent:", s), this._schedule_message(i));
                break;
            case h.PUBREL:
                n = this._receivedMessages[e.messageIdentifier], localStorage.removeItem("Received:" + this._localKey + e.messageIdentifier), n && (this._receiveMessage(n), delete this._receivedMessages[e.messageIdentifier]);
                var d = new I(h.PUBCOMP, {
                    messageIdentifier: e.messageIdentifier
                });
                this._schedule_message(d);
                break;
            case h.PUBCOMP:
                s = this._sentMessages[e.messageIdentifier], delete this._sentMessages[e.messageIdentifier], localStorage.removeItem("Sent:" + this._localKey + e.messageIdentifier), this.onMessageDelivered && this.onMessageDelivered(s.payloadMessage);
                break;
            case h.SUBACK:
                (s = this._sentMessages[e.messageIdentifier]) && (s.timeOut && s.timeOut.cancel(), e.returnCode.indexOf = Array.prototype.indexOf, e.returnCode.indexOf && -1 !== e.returnCode.indexOf(128) ? s.onFailure && s.onFailure(e.returnCode) : s.onSuccess && s.onSuccess(e.returnCode), delete this._sentMessages[e.messageIdentifier]);
                break;
            case h.UNSUBACK:
                (s = this._sentMessages[e.messageIdentifier]) && (s.timeOut && s.timeOut.cancel(), s.callback && s.callback(), delete this._sentMessages[e.messageIdentifier]);
                break;
            case h.PINGRESP:
                this.sendPinger.reset();
                break;
            case h.DISCONNECT:
                this._disconnected(f.INVALID_MQTT_MESSAGE_TYPE.code, g(f.INVALID_MQTT_MESSAGE_TYPE, [e.type]));
                break;
            default:
                this._disconnected(f.INVALID_MQTT_MESSAGE_TYPE.code, g(f.INVALID_MQTT_MESSAGE_TYPE, [e.type]))
            }
        } catch (u) {
            return void this._disconnected(f.INTERNAL_ERROR.code, g(f.INTERNAL_ERROR, [u.message, u.stack.toString()]))
        }
    }, w.prototype._on_socket_error = function (e) {
        this._disconnected(f.SOCKET_ERROR.code, g(f.SOCKET_ERROR, [e.data]))
    }, w.prototype._on_socket_close = function () {
        this._disconnected(f.SOCKET_CLOSE.code, g(f.SOCKET_CLOSE))
    }, w.prototype._socket_send = function (e) {
        if (1 == e.type) {
            var t = this._traceMask(e, "password");
            this._trace("Client._socket_send", t)
        } else this._trace("Client._socket_send", e);
        try {
            this.socket.send(e.encode())
        } catch (s) {
            this._on_socket_error(s)
        }
        this.sendPinger.reset()
    }, w.prototype._receivePublish = function (e) {
        switch (e.payloadMessage.qos) {
        case "undefined":
        case 0:
            this._receiveMessage(e);
            break;
        case 1:
            var t = new I(h.PUBACK, {
                messageIdentifier: e.messageIdentifier
            });
            this._schedule_message(t), this._receiveMessage(e);
            break;
        case 2:
            this._receivedMessages[e.messageIdentifier] = e, this.store("Received:", e);
            var s = new I(h.PUBREC, {
                messageIdentifier: e.messageIdentifier
            });
            this._schedule_message(s);
            break;
        default:
            throw Error("Invaild qos=" + wireMmessage.payloadMessage.qos)
        }
    }, w.prototype._receiveMessage = function (e) {
        this.onMessageArrived && this.onMessageArrived(e.payloadMessage)
    }, w.prototype._disconnected = function (e, t) {
        this._trace("Client._disconnected", e, t), this.sendPinger.cancel(), this.receivePinger.cancel(), this._connectTimeout && this._connectTimeout.cancel(), this._msg_queue = [], this._notify_msg_sent = {}, this.socket && (this.socket.onopen = null, this.socket.onmessage = null, this.socket.onerror = null, this.socket.onclose = null, 1 === this.socket.readyState && this.socket.close(), delete this.socket), this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1 ? (this.hostIndex++, this._doConnect(this.connectOptions.uris[this.hostIndex])) : (e === undefined && (e = f.OK.code, t = g(f.OK)), this.connected ? (this.connected = !1, this.onConnectionLost && this.onConnectionLost({
            errorCode: e,
            errorMessage: t
        })) : 4 === this.connectOptions.mqttVersion && !1 === this.connectOptions.mqttVersionExplicit ? (this._trace("Failed to connect V4, dropping back to V3"), this.connectOptions.mqttVersion = 3, this.connectOptions.uris ? (this.hostIndex = 0, this._doConnect(this.connectOptions.uris[0])) : this._doConnect(this.uri)) : this.connectOptions.onFailure && this.connectOptions.onFailure({
            invocationContext: this.connectOptions.invocationContext,
            errorCode: e,
            errorMessage: t
        }))
    }, w.prototype._trace = function () {
        var e, t = arguments;
        if (this.traceFunction) {
            for (e in t) "undefined" != typeof t[e] && (t[e] = JSON.stringify(t[e]));
            var s = Array.prototype.slice.call(t).join("");
            this.traceFunction({
                severity: "Debug",
                message: s
            })
        }
        if (null !== this._traceBuffer)
            for (e = 0, max = t.length; e < max; e++) this._traceBuffer.length == this._MAX_TRACE_ENTRIES && this._traceBuffer.shift(), 0 === e ? this._traceBuffer.push(t[e]) : "undefined" == typeof t[e] ? this._traceBuffer.push(t[e]) : this._traceBuffer.push("  " + JSON.stringify(t[e]))
    }, w.prototype._traceMask = function (e, t) {
        var s = {};
        for (var n in e) e.hasOwnProperty(n) && (s[n] = n == t ? "******" : e[n]);
        return s
    };
    var M = function (e, t, s, n) {
        var i;
        if ("string" != typeof e) throw new Error(g(f.INVALID_TYPE, [typeof e, "host"]));
        if (2 == arguments.length) {
            n = t;
            var o = (i = e).match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
            if (!o) throw new Error(g(f.INVALID_ARGUMENT, [e, "host"]));
            e = o[4] || o[2], t = parseInt(o[7]), s = o[8]
        } else {
            if (3 == arguments.length && (n = s, s = "/mqtt"), "number" != typeof t || t < 0) throw new Error(g(f.INVALID_TYPE, [typeof t, "port"]));
            if ("string" != typeof s) throw new Error(g(f.INVALID_TYPE, [typeof s, "path"]));
            var r = -1 != e.indexOf(":") && "[" != e.slice(0, 1) && "]" != e.slice(-1);
            i = "ws://" + (r ? "[" + e + "]" : e) + ":" + t + s
        }
        for (var a = 0, c = 0; c < n.length; c++) {
            var h = n.charCodeAt(c);
            55296 <= h && h <= 56319 && c++, a++
        }
        if ("string" != typeof n || a > 65535) throw new Error(g(f.INVALID_ARGUMENT, [n, "clientId"]));
        var u = new w(i, e, t, s, n);
        this._getHost = function () {
            return e
        }, this._setHost = function () {
            throw new Error(g(f.UNSUPPORTED_OPERATION))
        }, this._getPort = function () {
            return t
        }, this._setPort = function () {
            throw new Error(g(f.UNSUPPORTED_OPERATION))
        }, this._getPath = function () {
            return s
        }, this._setPath = function () {
            throw new Error(g(f.UNSUPPORTED_OPERATION))
        }, this._getURI = function () {
            return i
        }, this._setURI = function () {
            throw new Error(g(f.UNSUPPORTED_OPERATION))
        }, this._getClientId = function () {
            return u.clientId
        }, this._setClientId = function () {
            throw new Error(g(f.UNSUPPORTED_OPERATION))
        }, this._getOnConnectionLost = function () {
            return u.onConnectionLost
        }, this._setOnConnectionLost = function (e) {
            if ("function" != typeof e) throw new Error(g(f.INVALID_TYPE, [typeof e, "onConnectionLost"]));
            u.onConnectionLost = e
        }, this._getOnMessageDelivered = function () {
            return u.onMessageDelivered
        }, this._setOnMessageDelivered = function (e) {
            if ("function" != typeof e) throw new Error(g(f.INVALID_TYPE, [typeof e, "onMessageDelivered"]));
            u.onMessageDelivered = e
        }, this._getOnMessageArrived = function () {
            return u.onMessageArrived
        }, this._setOnMessageArrived = function (e) {
            if ("function" != typeof e) throw new Error(g(f.INVALID_TYPE, [typeof e, "onMessageArrived"]));
            u.onMessageArrived = e
        }, this._getTrace = function () {
            return u.traceFunction
        }, this._setTrace = function (e) {
            if ("function" != typeof e) throw new Error(g(f.INVALID_TYPE, [typeof e, "onTrace"]));
            u.traceFunction = e
        }, this.connect = function (e) {
            var t;
            if (e = e || {}, d(e, {
                timeout: "number",
                userName: "string",
                password: "string",
                willMessage: "object",
                keepAliveInterval: "number",
                cleanSession: "boolean",
                useSSL: "boolean",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                hosts: "object",
                ports: "object",
                mqttVersion: "number"
            }), e.keepAliveInterval === undefined && (e.keepAliveInterval = 60), e.mqttVersion > 4 || e.mqttVersion < 3) throw new Error(g(f.INVALID_ARGUMENT, [e.mqttVersion, "connectOptions.mqttVersion"]));
            if (e.mqttVersion === undefined ? (e.mqttVersionExplicit = !1, e.mqttVersion = 4) : e.mqttVersionExplicit = !0, e.password === undefined && e.userName !== undefined) throw new Error(g(f.INVALID_ARGUMENT, [e.password, "connectOptions.password"]));
            if (e.willMessage) {
                if (!(e.willMessage instanceof m)) throw new Error(g(f.INVALID_TYPE, [e.willMessage, "connectOptions.willMessage"]));
                if (e.willMessage.stringPayload = "", "undefined" == typeof e.willMessage.destinationName) throw new Error(g(f.INVALID_TYPE, [typeof e.willMessage.destinationName, "connectOptions.willMessage.destinationName"]))
            }
            if ("undefined" == typeof e.cleanSession && (e.cleanSession = !0), e.hosts) {
                if (!(e.hosts instanceof Array)) throw new Error(g(f.INVALID_ARGUMENT, [e.hosts, "connectOptions.hosts"]));
                if (e.hosts.length < 1) throw new Error(g(f.INVALID_ARGUMENT, [e.hosts, "connectOptions.hosts"]));
                var n = !1;
                for (t = 0; t < e.hosts.length; t++) {
                    if ("string" != typeof e.hosts[t]) throw new Error(g(f.INVALID_TYPE, [typeof e.hosts[t], "connectOptions.hosts[" + t + "]"]));
                    if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(e.hosts[t])) {
                        if (0 === t) n = !0;
                        else if (!n) throw new Error(g(f.INVALID_ARGUMENT, [e.hosts[t], "connectOptions.hosts[" + t + "]"]))
                    } else if (n) throw new Error(g(f.INVALID_ARGUMENT, [e.hosts[t], "connectOptions.hosts[" + t + "]"]))
                }
                if (n) e.uris = e.hosts;
                else {
                    if (!e.ports) throw new Error(g(f.INVALID_ARGUMENT, [e.ports, "connectOptions.ports"]));
                    if (!(e.ports instanceof Array)) throw new Error(g(f.INVALID_ARGUMENT, [e.ports, "connectOptions.ports"]));
                    if (e.hosts.length != e.ports.length) throw new Error(g(f.INVALID_ARGUMENT, [e.ports, "connectOptions.ports"]));
                    for (e.uris = [], t = 0; t < e.hosts.length; t++) {
                        if ("number" != typeof e.ports[t] || e.ports[t] < 0) throw new Error(g(f.INVALID_TYPE, [typeof e.ports[t], "connectOptions.ports[" + t + "]"]));
                        var o = e.hosts[t],
                            r = e.ports[t],
                            a = -1 != o.indexOf(":");
                        i = "ws://" + (a ? "[" + o + "]" : o) + ":" + r + s, e.uris.push(i)
                    }
                }
            }
            u.connect(e)
        }, this.subscribe = function (e, t) {
            if ("string" != typeof e) throw new Error("Invalid argument:" + e);
            if (t = t || {}, d(t, {
                qos: "number",
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            }), t.timeout && !t.onFailure) throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
            if ("undefined" != typeof t.qos && 0 !== t.qos && 1 !== t.qos && 2 !== t.qos) throw new Error(g(f.INVALID_ARGUMENT, [t.qos, "subscribeOptions.qos"]));
            u.subscribe(e, t)
        }, this.unsubscribe = function (e, t) {
            if ("string" != typeof e) throw new Error("Invalid argument:" + e);
            if (t = t || {}, d(t, {
                invocationContext: "object",
                onSuccess: "function",
                onFailure: "function",
                timeout: "number"
            }), t.timeout && !t.onFailure) throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
            u.unsubscribe(e, t)
        }, this.send = function (e, t, s, n) {
            var i;
            if (0 === arguments.length) throw new Error("Invalid argument.length");
            if (1 == arguments.length) {
                if (!(e instanceof m) && "string" != typeof e) throw new Error("Invalid argument:" + typeof e);
                if ("undefined" == typeof (i = e).destinationName) throw new Error(g(f.INVALID_ARGUMENT, [i.destinationName, "Message.destinationName"]));
                u.send(i)
            } else(i = new m(t)).destinationName = e, arguments.length >= 3 && (i.qos = s), arguments.length >= 4 && (i.retained = n), u.send(i)
        }, this.disconnect = function () {
            u.disconnect()
        }, this.getTraceLog = function () {
            return u.getTraceLog()
        }, this.startTrace = function () {
            u.startTrace()
        }, this.stopTrace = function () {
            u.stopTrace()
        }, this.isConnected = function () {
            return u.connected
        }
    };
    M.prototype = {
        get host() {
            return this._getHost()
        }, set host(e) {
            this._setHost(e)
        }, get port() {
            return this._getPort()
        }, set port(e) {
            this._setPort(e)
        }, get path() {
            return this._getPath()
        }, set path(e) {
            this._setPath(e)
        }, get clientId() {
            return this._getClientId()
        }, set clientId(e) {
            this._setClientId(e)
        }, get onConnectionLost() {
            return this._getOnConnectionLost()
        }, set onConnectionLost(e) {
            this._setOnConnectionLost(e)
        }, get onMessageDelivered() {
            return this._getOnMessageDelivered()
        }, set onMessageDelivered(e) {
            this._setOnMessageDelivered(e)
        }, get onMessageArrived() {
            return this._getOnMessageArrived()
        }, set onMessageArrived(e) {
            this._setOnMessageArrived(e)
        }, get trace() {
            return this._getTrace()
        }, set trace(e) {
            this._setTrace(e)
        }
    };
    var m = function (e) {
        this.payloadString = undefined, this.payloadBytes = undefined, this.destinationName = undefined, this.qos = 0, this.retained = !1, this.duplicate = !1;
        var t;
        if (!("string" == typeof e || e instanceof ArrayBuffer || e instanceof Int8Array || e instanceof Uint8Array || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array)) throw g(f.INVALID_ARGUMENT, [e, "newPayload"]);
        t = e, this.payloadString = "string" == typeof t ? t : c(t, 0, t.length);
        var s, n;
        "string" == typeof t ? (s = new ArrayBuffer(r(t)), a(t, n = new Uint8Array(s), 0), this.payloadBytes = n) : this.payloadBytes = t
    };
    return m.prototype = {
        setDestinationName: function (e) {
            if ("string" != typeof e) throw new Error(g(f.INVALID_ARGUMENT, [e, "newDestinationName"]));
            this.destinationName = e
        }, setQos: function (e) {
            if (0 !== e && 1 !== e && 2 !== e) throw new Error("Invalid argument:" + e);
            qos = e
        }, setRetained: function (e) {
            if ("boolean" != typeof e) throw new Error(g(f.INVALID_ARGUMENT, [e, "newRetained"]));
            this.retained = e
        }, setDuplicate: function (e) {
            this.duplicate = e
        }
    }, {
        Client: M,
        Message: m
    }
}(window);