 !function (t, a) {
        t.LiqPayCheckout = new function () {
            var n, e, i = t.encodeURIComponent, o = {}, p = (new Date).getTime().toString();
            this.init = function (t) {
                var e = (t.host || "https://www.liqpay.ua/") + (t.language || "ru") + "/checkoutjs";
                for (var o in e += "?hostname=" + i(location.hostname), e += "&port=" + i(location.port), e += "&protocol=" + i(location.protocol), e += "&uid=" + p, t) e += "&" + i(o) + "=" + i(t[o]);
                (n = a.createElement("iframe")).setAttribute("frameborder", "0"), n.setAttribute("allowtransparency", "true"), n.setAttribute("scrolling", "no"), n.setAttribute("style", "width:100%;height:0px;background-color:transparent;"), n.setAttribute("src", e);
                try {
                    "popup" == t.mode ? this.popup(n) : a.querySelector(t.embedTo || "body").appendChild(n)
                } catch (t) {
                    console.error(t)
                }
                return this
            }, this.popup = function (t) {
                (e = a.createElement("div")).innerHTML = '<div id="liqpay_widget_popup_container" style="position: fixed !important;top: 0 !important;right: 0 !important;bottom: 0 !important;left: 0 !important;z-index: 3000 !important"><div id="liqpay_widget_popup_background" style="width: 100% !important;height: 100% !important;background: #000 !important;opacity: .4 !important"></div><div id="liqpay_widget_popup_iframe" style="-webkit-overflow-scrolling: touch !important; max-height: 100% !important; overflow: auto !important; position: absolute !important;\ttop: 50% !important;left: 50% !important;width: 385px !important;border-radius: 6px !important;\ttransform: translate(-50%, -50%) !important;-moz-transform: translate(-50%, -50%) !important;-ms-transform: translate(-50%, -50%) !important;-webkit-transform: translate(-50%, -50%) !important;-o-transform: translate(-50%, -50%) !important"></div></div>', a.querySelector("body").appendChild(e), a.querySelector("#liqpay_widget_popup_iframe").appendChild(t)
            }, this.on = function (t, a) {
                if ("function" == typeof a) return t in o || (o[t] = []), o[t].push(a), this
            }, this.off = function (t, a) {
                if (t in o) {
                    for (var n = [], e = 0; e < o[t].length; e++) o[t][e] != a && n.push(o[t][e]);
                    return o[t] = n, this
                }
            }, this.call = function (t, a) {
                if (t in o) {
                    for (var n = 0; n < o[t].length; n++) o[t][n](a);
                    return this
                }
            };
            var r = function (t, a) {
                var e = {cmd: t, params: a, uid: p}, i = JSON.stringify(e);
                n.contentWindow.postMessage(i, "*")
            }, s = function (t) {
                if ("object" != typeof t.data) try {
                    var a = JSON.parse(t.data);
                    if (!a) return;
                    if (a.uid != p) return;
                    var n = a.cmd || a.params.cmd;
                    this.call(n, a.params), this.call("_", a.params)
                } catch (t) {
                }
            }.bind(this);
            t.addEventListener ? t.addEventListener("message", s, !1) : t.attachEvent("onmessage", s), this.on("window.resize", function (t) {
                n.style.height = t.height + "px"
            }), this.on("liqpay.close", function () {
                n.parentNode.removeChild(n), e && e.parentNode.removeChild(e)
            });
            var c = void 0;
            this.on("applepay.canUse", function (a) {
                t.ApplePaySession && a.applepay_merchant_id && t === t.parent ? ApplePaySession.canMakePaymentsWithActiveCard(a.applepay_merchant_id).then(function (t) {
                    r("applepay.canUse", t ? {canUse: !0} : {canUse: !1})
                }) : r("applepay.canUse", {canUse: !1})
            }), this.on("applepay.begin", function (n) {
                (c = new t.ApplePaySession(1, n.apple_data)).onvalidatemerchant = function (t) {
                    r("applepay.onvalidatemerchant", {validationURL: t.validationURL, domain: a.location.hostname})
                }, c.onpaymentauthorized = function (t) {
                    r("applepay.onpaymentauthorized", {paymentData: t.payment.token.paymentData})
                }.bind(this), c.oncancel = function (t) {
                    r("applepay.oncancel", {})
                }.bind(this), c.begin()
            }), this.on("applepay.completeMerchantValidation", function (t) {
                c.completeMerchantValidation(t.merchantSession)
            }), this.on("applepay.completePayment", function (t) {
                c.completePayment(t.status)
            }), this.on("applepay.abort", function () {
                c.abort()
            })
        }, t.LiqPayCheckoutCallback && t.LiqPayCheckoutCallback()
    }(window, document);