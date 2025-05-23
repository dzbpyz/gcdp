webpackJsonp([8], {
    I9VN: function(e, t, n) {
        t = e.exports = n("UTlt")(!0),
        t.push([e.i, "\n.van-tabbar[data-v-af452f00] {\n  border-top: 1px solid #eee;\n  height: 55px;\n}\n.van-tabbar-item__icon img[data-v-af452f00] {\n  width: 22px;\n  height: 22px;\n}\n.active_tab img[data-v-af452f00] {\n  width: 22px;\n  height: 22px;\n}\n[data-v-af452f00] .van-button  {\n  position:fixed;\n  left: 20px;\n  bottom: 100px;\n}\n", "", {
            version: 3,
            sources: ["/home/docker-compose/nginx/html/modules/tdhc-vue-coding/supplier-self/bpm-app-m/src/view/warranty/warrantyQuery.vue"],
            names: [],
            mappings: ";AACA;EACE,2BAA2B;EAC3B,aAAa;CACd;AACD;EACE,YAAY;EACZ,aAAa;CACd;AACD;EACE,YAAY;EACZ,aAAa;CACd;AACD;EACE,eAAe;EACf,WAAW;EACX,cAAc;CACf",
            file: "warrantyQuery.vue",
            sourcesContent: ["\n.van-tabbar[data-v-af452f00] {\n  border-top: 1px solid #eee;\n  height: 55px;\n}\n.van-tabbar-item__icon img[data-v-af452f00] {\n  width: 22px;\n  height: 22px;\n}\n.active_tab img[data-v-af452f00] {\n  width: 22px;\n  height: 22px;\n}\n[data-v-af452f00] .van-button  {\n  position:fixed;\n  left: 20px;\n  bottom: 100px;\n}\n"],
            sourceRoot: ""
        }])
    },
    Viqi: function(e, t, n) {
        var a = n("I9VN");
        "string" == typeof a && (a = [[e.i, a, ""]]),
        a.locals && (e.exports = a.locals);
        n("FIqI")("6e25e55f", a, !0, {})
    },
    myGX: function(e, t, n) {
        "use strict";
        function a(e) {
            n("Viqi")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = {
            name: "tabbar",
            data: function() {
                return {
                    active: 0,
                    tabbars: [{
                        name: "质检信息",
                        title: "质检信息",
                        icon: "comment-o"
                    }, {
                        name: "联系方式",
                        title: "联系方式",
                        icon: "wap-home-o"
                    }],
                    jh: "",
                    reportUrl: ""
                }
            },
            created: function() {
                this.deviceWidth = document.documentElement.clientWidth,
                this.deviceHeight = document.documentElement.clientHeight,
                this.piece_number = this.$route.query.piece_number,
                this.corp = this.$route.query.corp;
                var e = null;
                "1021" == this.corp ? e = "dgzbs.cpt" : "1450" == this.corp ? e = "1450zbs.cpt" : "SXPZ" == this.corp ? e = "sxzbs.cpt" : "1110" == this.corp && (e = "qfzbs.cpt"),
                this.reportUrl = "http://gys.dhgtgroup.com:8233/WebReport/ReportServer?reportlet=report/supplier/" + e + "&piece_number=" + this.piece_number
            },
            methods: {
                handleTabbarClick: function(e) {
                    var t = {
                        piece_number: this.piece_number,
                        corp: this.corp
                    };
                    this.$router.push({
                        name: e.name,
                        query: t
                    })
                },
                downloadPdf: function() {
                    var e = this.piece_number
                      , t = this.corp
                      , n = "http://gys.dhgtgroup.com:8233/supplierSelf/zbs/downImage?corp=" + t + "&pieceNumber=" + e
                      , a = document.createElement("iframe");
                    a.src = n,
                    a.style.display = "none",
                    document.body.appendChild(a)
                }
            }
        }
          , r = function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", [n("van-button", {
                staticStyle: {},
                attrs: {
                    type: "info"
                },
                on: {
                    click: function(t) {
                        return e.downloadPdf()
                    }
                }
            }, [e._v("PDF下载")]), e._v(" "), n("iframe", {
                style: {
                    height: e.deviceHeight - 60 + "px",
                    width: "100%"
                },
                attrs: {
                    src: e.reportUrl,
                    frameborder: "0"
                }
            }), e._v(" "), n("van-tabbar", {
                attrs: {
                    "inactive-color": "#FFB6C1",
                    "active-color": "#FF69B4"
                },
                model: {
                    value: e.active,
                    callback: function(t) {
                        e.active = t
                    },
                    expression: "active"
                }
            }, e._l(e.tabbars, function(t, a) {
                return n("van-tabbar-item", {
                    key: a,
                    attrs: {
                        icon: t.icon
                    },
                    on: {
                        click: function(n) {
                            return e.handleTabbarClick(t)
                        }
                    }
                }, [n("span", [e._v(e._s(t.title))])])
            }), 1)], 1)
        }
          , o = []
          , c = {
            render: r,
            staticRenderFns: o
        }
          , p = c
          , s = n("C7Lr")
          , d = a
          , u = s(i, p, !1, d, "data-v-af452f00", null);
        t.default = u.exports
    }
});
//# sourceMappingURL=8.796950d0285c376d7022.js.map
