/* @file mqtt.im.js
 * @date 2018.10.15 15:45:21
 */
! function (t, e) {
    t.IMConnection = {
        name: "IMConnection",
        debug: !1,
        client: null,
        mqttMessageTopic: "",
        mqttWillTopic: "",
        chatRouteTopic: "",
        sessionId: "",
        _urlExp: /(wss?:)\/\/(.*?)((:\d+)?)\/(\w+)/gi,
        _ssl: !1,
        _mqttserver: "",
        _clientId: "",
        _protocol: "",
        _host: "",
        _port: 80,
        _path: "",
        _options: "",
        _conn: !1,
        _reconnectCount: 0,
        _waitTime: 0,
        _timeout: 6,
        _keepAliveInterval: 60,
        eventCallback: {
            onConnectSuccess: {},
            onConnectFailure: {},
            onResponse: {},
            onPublish: {}
        },
        connect: function (t, e) {
            return this._conn = !0, this.client && this.client.isConnected() ? (this._fireEvent("onConnectSuccess", this.mqttMessageTopic), !0) : this._connectMqtt(t, e)
        }, disconnect: function () {
            this._conn = !1, this.client && this.client.isConnected() && this._disconnectMqtt()
        }, publish: function (e, i) {
            var n, s;
            return this.client && this.client.isConnected() ? e && "object" == typeof e ? (n = t.JSON.toJSONString(e), (i = i || this.chatRouteTopic) ? (s = this._mqttMessage(n, i), this.debug && t.Log(this._clientId + " $.IMConnection.publish(" + n + ", " + i + ")", 2), this.client.send(s)) : (this.debug && t.Log(this._clientId + " publish param topic is null>" + n), !1)) : (this.debug && t.Log(this._clientId + " publish param jsonMessage failure", 3), !1) : (this.debug && t.Log(this._clientId + " publish failure, client disconnect", 3), !1)
        }, register: function (e, i, n) {
            var s, o = !1;
            "function" == typeof n ? ("undefined" == typeof this.eventCallback[i] && (this.eventCallback[i] = {}), t.each(this.eventCallback[i], function (t, i) {
                i !== n && e !== t || (o = !0)
            }), !0 !== o && (this.debug && t.Log(this._clientId + " $.IMConnection.reqister(" + i + ")"), this.eventCallback[i][e] = n)) : "string" == typeof n && (s = methodName.split("."), mehtod = t, t.each(s, function (t, e) {
                mehtod = mehtod[e]
            }), "undefined" == typeof this.eventCallback[key] && (this.eventCallback[key] = {}), t.each(this.eventCallback[i], function (t, i) {
                i !== mehtod && e !== t || (o = !0)
            }), !0 !== o && (this.debug && t.Log(this._clientId + " $.IMConnection.reqister(" + methodName + ")"), this.eventCallback[i][e] = mehtod))
        }, unregister: function (e) {
            var i = this;
            t.each(this.eventCallback, function (n, s) {
                t.each(s, function (t, s) {
                    t === e && delete i.eventCallback[n][t]
                })
            })
        }, subscribe: function (e, i) {
            if (!this.client || !this.client.isConnected()) return !1;
            this.debug && t.Log(this._clientId + " $.IMConnection.subscribe(" + e + ")");
            i = t.extend({
                qos: 1
            }, i), this.client.subscribe(e, i)
        }, unsubscribe: function (e) {
            if (!this.client || !this.client.isConnected() || !e) return !1;
            this.debug && t.Log(this._clientId + " $.IMConnection.unsubscribe(" + e + ")"), this.client.unsubscribe(e)
        }, onConnectionLost: function (e) {
            0 !== e.errorCode && (this.debug && t.Log(this._clientId + " $.IMConnection.onConnectionLost() > " + e.errorMessage, 3), this._reconnectMqtt())
        }, onPublish: function (e) {
            var i, n;
            if (!this.client || !this.client.isConnected()) return !1;
            this.debug && t.Log(this._clientId + " $.IMConnection.onPublish() > " + e.payloadString, 2);
            try {
                i = t.JSON.parseJSON(e.payloadString)
            } catch (s) {
                i = {}, t.Log("$.IMConnection.onPublish(): " + s.message, 3)
            }
            "responseServer" === (n = i.method || "") ? this.responseServer.apply(this, Array.prototype.concat.call([e.destinationName], i.params)): n && this._fireEvent("onPublish", Array.prototype.concat.call([e.destinationName, n], i.params))
        }, responseServer: function (e, i, n, s, o) {
            var c = this;
            this.subscribe(n, {
                onSuccess: function (e) {
                    this.debug && t.Log(c._clientId + " $.IMConnection.subscribe()>" + $JSON.toJSONString(e), 2)
                }, onFailure: function (e) {
                    this.debug && t.Log(c._clientId + " $.IMConnection.subscribe()>" + $JSON.toJSONString(e), 3), c._fireEvent("onConnectSuccess", c.mqttMessageTopic)
                }
            }), this.subscribe(s), this._fireEvent("onResponse", e, i, n, s, o)
        }, getRegisterMethod: function () {
            return this.eventCallback
        }, _connectMqtt: function (e, i) {
            var n = this,
                s = e;
            if (!this._mqttserver || this._mqttserver !== s) {
                if (s = s || this._mqttserver, !this._format(s)) return !1;
                this.chatRouteTopic = "S/ROUTE/" + this._path
            }
            if (!this._clientId || this._clientId !== i) {
                if (this._clientId = i || this._clientId, !this._clientId) return !1;
                this.mqttMessageTopic = "C/" + this._clientId, this.mqttWillTopic = "S/WILL/" + this._clientId
            }
            this._options = {
                userName: "ntguest",
                password: "xiaoneng123",
                useSSL: this._ssl,
                timeout: this._timeout,
                keepAliveInterval: this._keepAliveInterval,
                cleanSession: !1,
                willMessage: this._mqttMessage("{}"),
                mqttVersion: 4,
                onSuccess: function () {
                    n._success()
                }, onFailure: function (t) {
                    n._failure(t)
                }
            }, t.browser.supportMqtt ? (this.client ? this.debug && t.Log("reconnect mqtt server", 2) : (this.debug && t.Log("connect mqtt server", 2), this.client = new t.MQTT.Client(this._host, this._port, this._clientId), this.client.onConnectionLost = function (t) {
                n.onConnectionLost(t)
            }, this.client.onMessageArrived = function (t) {
                n.onPublish(t)
            }), this.client.connect(this._options), this.debug && this.client.startTrace()) : (this.client = t.MQTT.flashSock, this.client.onConnectionLost = function (t) {
                n.onConnectionLost(t)
            }, this.client.onMessageArrived = function (t) {
                n.onPublish(t)
            }, this.client.init(this._host, this._port, this._clientId, this._options))
        }, _reconnectMqtt: function () {
            if ((!this.client || !this.client.isConnected()) && this._conn) {
                var e = this;
                ++this._reconnectCount <= 3 ? this._waitTime = 50 : this._waitTime = 1e3 * +"034567890".charAt(Math.ceil(5 * Math.random())), this.debug && t.Log(this._clientId + " wait recontent mqtt:" + this._waitTime, 3), this._fireEvent("onConnectFailure", this.mqttMessageTopic), setTimeout(function () {
                    e._connectMqtt(e._mqttserver, e._clientId)
                }, this._waitTime)
            }
        }, _disconnectMqtt: function () {
            var t = this._mqttMessage("{}");
            this.publish(t, this.mqttWillTopic), this.unsubscribe(this.mqttMessageTopic), this.client && (this.debug && this.client.stopTrace(), this.client.disconnect(), this.client.clear && this.client.clear()), this.client = null
        }, _format: function (e) {
            var i, n;
            return !(!e || "" === e) && (n = t.isObject(e) ? t.browser.supportMqtt ? "http:" === t.protocol && 1 != t.flashserver.usehttps ? e.ws ? e.ws : e.wss.replace(/^wss:/, "ws:") : e.wss ? e.wss : e.ws.replace(/^ws:/, "wss:") : e.tcp : e, (i = this._urlExp.exec(n)) && i.length || (i = n.replace(/(wss?|tcp):\/\//gi, ",$1,").replace(/:(\d+)/gi, ",$1").replace(/\//gi, ",").split(",")) && i.length || t.Log("url:" + n + ", math:" + i, 2), this._protocol = 1 == t.flashserver.usehttps ? "wss:" : i[1] || "ws:", this._ssl = "wss:" === this._protocol, this._host = i[2], this._port = Number(i[4] ? i[4].slice(1) : i[4]) || (this._ssl ? 443 : 80), this._path = i[5] || "mqtt", this._mqttserver = n, !0)
        }, _success: function () {
            this.debug && t.Log(this._clientId + " $.IMConnection connect success."), this._reconnectCount = 0, this.subscribe(this.mqttMessageTopic), this._fireEvent("onConnectSuccess", this.mqttMessageTopic)
        }, _failure: function (e) {
            this.debug && t.Log(this._clientId + " $.IMConnection connect failure."), this._fireEvent("onConnectFailure", this.mqttMessageTopic), this._reconnectMqtt()
        }, _fireEvent: function () {
            var e = this,
                i = Array.prototype.slice.call(arguments),
                n = i[0],
                s = i.slice(1);
            t.each(this.eventCallback[n], function (t, i) {
                "onResponse" === n ? i.apply(e, s.slice(1)) : i.apply(e, s)
            })
        }, _mqttMessage: function (e, i) {
            var n = new t.MQTT.Message(e);
            return i = i || this.mqttWillTopic, n.qos = 1, n.destinationName = i, n
        }
    }, t(window).bind("unload", function () {
        t.IMConnection.disconnect()
    })
}(nTalk),
function (t, e) {
    var i = "IM_SEND_CURRENT_PAGE_DATA";
    t.IMConnection.Presence = t.Class.create(), t.IMConnection.Presence.prototype = {
        name: "Presence",
        debugLevel: 2,
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
        _stopReconnect: !1,
        _roomConnectTimeout: 5e3,
        initialize: function (e) {
            var i = this;
            this.options = t.extend({
                deviceType: t.browser.mobile ? 3 : 0,
                nullparam: ""
            }, t.whereGet(e, ["siteid", "settingid", "cid", "surl", "u", "n", "s", "r", "ref", "fsid", "userlevel"], ["siteid", "settingid", "pcid", "serverurl", "userid", "username", "sessionid", "resourceurl", "referrer", "flashsessionid", "userLevel"])), this.data = t.store, this._reCount = 0, t.Log("IMConnection.Presence start"), (!this.options.pcid || this.options.pcid.length <= 10) && (this.options.pcid = this.data.get("machineid"), (!this.options.pcid || this.options.pcid.length <= 10) && (this.options.pcid = t.base._createScriptPCID()));
            try {
                this.data.set("machineid", this.options.pcid)
            } catch (a) {
                t.Log(a, 3)
            }
            this.options.userid || (this.options.userid = t.base.userIdFix + this.options.pcid.substr(0, 21)), this.clientId = "IM_" + t.randomChar(20).toLowerCase(), this._callback("fIM_presenceFlashReady", [this.options.userid, this.options.pcid]);
            var n = {
                onInterval: function (t, e) {
                    i._onInterval.call(i, t, e)
                }, onChanage: function (t, e) {
                    i._onChanage.call(i, t, e)
                }
            };
            this.manage = new t.pageManage(n), this.identid = this.manage.identid, this.currentPage = new t.CurrentPage(this.identid, this.manage), this.setPageFocus(!0, t.title, t.url);
            var s = t.server.eduimmqttserver.toString().split(";");
            this.eduimmqttserver = {};
            for (var o = 0; o < s.length; o++) s[o] && (s[o].indexOf("ws:") > -1 ? this.eduimmqttserver.ws = s[o] : s[o].indexOf("wss:") > -1 ? this.eduimmqttserver.wss = s[o] : s[o].indexOf("tcp") > -1 && (this.eduimmqttserver.tcp = s[o]));
            var c = localStorage.getItem("gustInfo");
            if (c) r = JSON.parse(c);
            else var r = new Object;
            this.identid in r || (r[this.identid] = {
                userid: this.options.userid,
                loginname: t.global.uname,
                userlevel: this.options.userLevel ? this.options.userLevel : 0,
                isvip: t.global.isvip,
                time: (new Date).getTime()
            }, this.guestInfoJson = r, localStorage.setItem("gustInfo", JSON.stringify(r)))
        }, loginConnect: function () {
            var e = this;
            this.debug && t.Log("im.loginConnect()", this.debugLevel), this._callback("fIM_updateUserStatus", [1, ""]), this.connect = t.IMConnection, this.connect.register(this.options.settingId, "onConnectSuccess", function () {
                e.requestServer()
            }), this.connect.register(this.options.settingId, "onConnectFailure", function () {
                e._onAbnormal.apply(e, arguments), t.Log("mqtt:abnormal")
            }), this.connect.register(this.options.settingId, "onResponse", function (t, i, n, s) {
                e.roomConnect(t, i, n, s)
            }), this.connect.register(this.options.settingId, "onPublish", function () {
                e._onCallback.apply(e, arguments)
            }), this.connect.connect(this.eduimmqttserver, this.clientId)
        }, requestServer: function () {
            var e = this;
            if (this.connected) return !1;
            t.Log("$.IMConnection.Presence.requestServer()", 2), this.connected = !0, this.options.targetId = "", this.connect.publish({
                method: "requestServer",
                params: [this.options.userid, this.clientId, this.options.settingid, this.options.targetId, this.options.sessionid]
            }, this.connect.chatRouteTopic), this._roomConnectTimeID = setTimeout(function () {
                e.reconnect(0)
            }, this._roomConnectTimeout)
        }, roomConnect: function (e, i, n, s) {
            if (this.options.settingid !== s) return !1;
            var o = '{"pcid":' + this.options.pcid + ',"loginname":"' + nTalk.global.uname + '","devicetype":"' + this.options.deviceType + '","userlevel":' + (this.options.userLevel ? this.options.userLevel : 0) + ',"isvip":' + nTalk.global.isvip + "}";
            t.Log("$.IMConnection.Presence.roomConnect(" + e + ", " + i + ", " + n + ", " + s + ")", 2), this.clientTopic = e, this.clientWillTopic = i, this.serverTopic = n, this.deviceType = 0, this.connect.publish({
                method: "roomConnect",
                params: [this.options.userid, this.options.siteid, this.options.pcid, this.options.settingid, "", this.options.username, o]
            }, this.clientTopic)
        }, stopReroomConnect: function () {
            clearTimeout(this._roomConnectTimeID), this._roomConnectTimeID = null
        }, startKaliveConnect: function () {
            var e = this;
            this.stopKaliveConnect(), this.kaliveTimeId = setInterval(function () {
                t.Log("$.IMConnection.Presence.kaliveConnect()", 1), e.connect.publish({
                    method: "remoteKeepAlive",
                    params: [e.options.connectId, e.options.userid, e.options.siteid, e.options.pcid]
                }, e.clientTopic)
            }, 1e4)
        }, stopKaliveConnect: function () {
            clearInterval(this.kaliveTimeId), this.kaliveTimeId = null
        }, reconnect: function (e) {
            var i = this;
            this.connected = !1, 0 === e && (this.connect.unsubscribe(this.clientWillTopic), this.connect.unsubscribe(this.serverTopic), this.connect.unregister(this.options.settingId)), ++this._reconnect_tchat_count <= 3 ? this._waitTime = 500 : this._waitTime = 1e3 * +"034567890".charAt(Math.ceil(5 * Math.random())), this._waitReconnectTimeID = setTimeout(function () {
                t.Log("$.IMConnection.Presence.reconnect(): waitTime:" + i._waitTime, 2), 0 == e ? i.loginConnect() : i.roomConnect(i.clientTopic, i.clientWillTopic, i.serverTopic, i.options.settingid)
            }, this._waitTime)
        }, disconnect: function () {
            t.Log("$.IMConnection.Presence.disconnect()");
            var e = this.data.getAll();
            for (var i in e) "function" != typeof e[i] && i.indexOf("JDATA_") > -1 && this.data.remove(i);
            this.stopReroomConnect(), this.stopKaliveConnect()
        }, LoginResult: function (e, i, n) {
            this.login = e, this.options.connectId = n, t.Log("$.IMConnection.Presence.LoginResult(" + t.JSON.toJSONString(arguments) + ")", 2), this._callback("fIM_updateUserStatus", [this.login ? 2 : 0, ""]), this.login ? this.startKaliveConnect("call kalive") : this.reconnect("login relogin"), this.stopReroomConnect()
        }, remoteNotifyChatWithGroup: function (e, i, n, s, o) {
            var c, r;
            if (s) {
                t.Log("$.IMConnection.Presence.remoteNotifyChatWithGroup(" + t.JSON.toJSONString(arguments) + ")", 2), c = t.clearHtml(s.substr(0, s.indexOf("ntalker://"))), r = s.substr(s.indexOf("ntalker://") + 10);
                try {
                    t.JSON.parseJSON(r)
                } catch (a) {}
                isStorageSupported = function () {
                    var e = null;
                    try {
                        e = window.localStorage
                    } catch (a) {
                        return t.Log("localStorage:" + a.message, 3), !1
                    }
                    if (e) {
                        var i = "test";
                        try {
                            return null !== localStorage.getItem(i) && localStorage.removeItem(i), localStorage.setItem(i, i), localStorage.getItem(i) == i && (localStorage.removeItem(i), !0)
                        } catch (a) {
                            return t.Log("The browser localStorage is unavailable. " + a.message, 3), !1
                        }
                    }
                }, isStorageSupported() ? this._sendMessage2CurrenPage(c + "ntalker://" + r) : this._callback("fIM_onPresenceReceiveSysMessage", [1, c + "ntalker://" + r])
            } else this.debug && t.Log("message content is null", 3)
        }, remoteNotifyReverseChat: function (e, i, n, s, o) {
            if (s) {
                var c = "msg=" + s + "&&inviteid=" + o,
                    r = (t.JSON.parseJSON(o), t.JSON.parseJSON(s));
                r.ReverseChat = 1, s = t.JSON.toJSONString(r), r = null, t.Log("$.IMConnection.Presence.remoteNotifyReverseChat(" + t.JSON.toJSONString(arguments) + ")", 2);
                try {
                    t.JSON.parseJSON(void 0)
                } catch (a) {}
                isStorageSupported = function () {
                    var e = null;
                    try {
                        e = window.localStorage
                    } catch (a) {
                        return t.Log("localStorage:" + a.message, 3), !1
                    }
                    if (e) {
                        var i = "test";
                        try {
                            return null !== localStorage.getItem(i) && localStorage.removeItem(i), localStorage.setItem(i, i), localStorage.getItem(i) == i && (localStorage.removeItem(i), !0)
                        } catch (a) {
                            return t.Log("The browser localStorage is unavailable. " + a.message, 3), !1
                        }
                    }
                }, isStorageSupported() ? this._sendMessage2CurrenPage(c) : this._callback("fIM_onPresenceReceiveSysMessage", [1, c])
            } else this.debug && t.Log("message content is null", 3)
        }, remoteNotifyUserCode: function (e) {
            t.Log("do remoteNotifyUserCode!!!")
        }, remoteConfirmAddFriend: function (e) {
            t.Log("do remoteConfirmAddFriend")
        }, _handleResponse: function (e, i) {
            this[e] ? this[e].apply(this, i) : t.Log("The object of the method '" + e + "' does not exist", 3)
        }, _callback: function (e, i) {
            if (t.hasOwnProperty(e)) try {
                t[e].apply(this, i)
            } catch (n) {} else t.Log("nTalk." + e + "(...)", 2)
        }, _onCallback: function (e) {
            var i, n = this;
            if (this.debug && t.Log("$.Presence.onCallback(  )"), e.length) {
                if (topic = e[0], i = e[1], topic === this.clientWillTopic && "reconnect" === i) return this.reconnect(), !1;
                if (topic !== this.serverTopic) return !1;
                t.Log("$.Presence.onCallback(" + i + ")"), "connectResult" === i ? this.LoginResult.apply(n, e.slice(2)) : "remoteNotifyChatWithGroup" === i ? this.remoteNotifyChatWithGroup.apply(n, e.slice(5)) : "remoteNotifyReverseChat" === i ? this.remoteNotifyReverseChat.apply(n, e.slice(2)) : this._handleResponse.call(n, i, e.slice(2))
            }
        }, _onAbnormal: function () {
            var e = Array.prototype.slice.call(arguments);
            this.debug && t.Log("$.Presence.onAbnormal( " + e[0] + "," + e[1] + "," + e[2] + " )", 3), this.reconnect("abnormal login")
        }, _handleResponse: function (e, i) {
            this[e] ? this[e].apply(this, i) : t.Log("The object of the method '" + e + "' does not exist", 3)
        }, _onInterval: function (e, i) {
            if (this.currentConn = this.data.get("IM_CUREENT_CONNECT") || {
                identid: "",
                time: 0
            }, this.currentConn.identid && this.currentConn.identid === this.identid) this.currentConn.time = t.getTime(), this.data.set("IM_CUREENT_CONNECT", this.currentConn), this._fireEvent("update");
            else {
                var n;
                if (t.isArray(i))
                    for (var s = 0; s < i.length; s++) page = i[s], page && page[this.currentConn.identid] && (n = !0, this._currentConnected = !0);
                if (this.currentConn.identid && this.currentConn.identid !== this.identid && !n && (this.currentConn.identid = "", this._currentConnected = !1, this._fireEvent("clear")), this.debug && t.Log("currentConnect>>_onInterval:" + t.JSON.toJSONString(this.currentConn) + ", _currentConnected:" + this._currentConnected), this.currentConn.identid && "" !== this.currentConn.identid || this._currentConnected) this._fireEvent("wait");
                else {
                    this.currentConn = {
                        identid: this.identid,
                        time: t.getTime()
                    }, this._currentConnected = !0;
                    try {
                        this.data.set("IM_CUREENT_CONNECT", this.currentConn)
                    } catch (a) {
                        t.Log(a, 3)
                    }
                    this._fireEvent("add"), this.loginConnect()
                }
            } if (this.connected) {
                var o = localStorage.getItem("gustInfo");
                if (o) c = JSON.parse(o);
                else var c = new Object;
                for (var r in c) r == this.clientId ? (c[r].userid == this.options.userid && c[r].loginname == nTalk.global.uname && c[r].userlevel == (this.options.userLevel ? this.options.userLevel : 0) || (this.options.userid = c[r].userid, t.global.name = c[r].loginname, this.options.userLevel = c[r].userLevel, this.options.isvip = c[r].isvip, this.reconnect(0)), localStorage.removeItem("gustInfo")) : (c[r].userid == this.options.userid && c[r].loginname == nTalk.global.uname && c[r].userlevel == (this.options.userLevel ? this.options.userLevel : 0) || (this.options.userid = c[r].userid, this.options.loginname = c[r].loginname, this.options.userLevel = c[r].userLevel, this.reconnect(0)), localStorage.removeItem("gustInfo"))
            }
        }, _onChanage: function (t, e) {
            this.pageCount = t
        }, _fireEvent: function (e) {
            1 != this.temp && this.temp ? this.temp >= 5 && (this.temp = 0) : (this.temp = 1, this.debug && "wait" !== e && t.Log(this.identid + ", " + e + " long connect, curPage:" + this.currentPage.get(), 2)), this.temp++, this._currentGetMessage()
        }, _toArray: function (t, e) {
            var i = [];
            if (!t) return "error";
            for (var n = 0; n < e.length; n++) i.push(t[e[n]] || "");
            return i
        }, _sendMessage2CurrenPage: function (e) {
            var n = this.data.get(i);
            e && (this.Queue || (this.Queue = new t.Queue), n ? this.Queue.enQueue({
                data: e
            }) : this.data.set(i, e))
        }, _currentGetMessage: function () {
            var e = this.data.get(i);
            if (e) {
                try {
                    e = t.JSON.parseJSON(e)
                } catch (s) {}
                if ("undefined" != typeof document.hidden) {
                    if (1 == document.hidden) return
                } else if (!this.currentPage.get() || !e) return;
                if (this.data.remove(i), this._callback("fIM_onPresenceReceiveSysMessage", [1, e]), this.Queue) {
                    var n = this.Queue.deQueue();
                    n && this._sendMessage2CurrenPage(n.data)
                }
            }
        }, setPageFocus: function (t, e, i, n) {
            !0 === t && this.currentPage.set(e, i)
        }, closePresence: function () {
            if (this._wsFlag) this.connect.disconnect();
            else try {
                this.cometd.disconnect(!0)
            } catch (t) {}
            this.data.remove("IM_CUREENT_CONNECT")
        }, setJSData: function () {
            var t, e, i = arguments[0];
            if (i && "" !== i) e = "JDATA_" + i + "-" + arguments[1], this.data.set(e, arguments[2]);
            else {
                t = this.data.getAll();
                for (var n in t) "function" != typeof t[n] && n.indexOf("JDATA_") > -1 && this.data.remove(n)
            }
        }, getJSData: function () {
            var e, i = {},
                n = Array.prototype.slice.call(arguments, 0, 2).slice(0, 2).join("-");
            if (n && arguments[1]) return t.JSON.toJSONString(this.data.get(n));
            e = this.data.getAll();
            for (var s in e) "function" != typeof e[s] && s.indexOf("JDATA_") > -1 && (i[s] = e[s]);
            return t.JSON.toJSONString(i)
        }
    }
}(nTalk);