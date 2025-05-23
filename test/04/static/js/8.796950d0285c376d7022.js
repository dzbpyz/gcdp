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
                    // jh: "", // 移除了，因为 piece_number 会代替
                    reportUrl: "", // 将在此处或created中设置
                    pdfFileName: "质保书.pdf", // 默认下载文件名
                    piece_number: "", // 新增，用于下载文件名
                    corp: ""         // 新增，用于下载文件名
                }
            },
            created: function() {
                this.deviceWidth = document.documentElement.clientWidth;
                this.deviceHeight = document.documentElement.clientHeight;

                // 2. 从 window.PDF_APP_CONFIG 获取 PDF 路径和其他参数
                var pdfConfig = window.PDF_APP_CONFIG || {};
                this.reportUrl = pdfConfig.pdfUrl || ""; // 使用 index.html 中定义的路径
                
                // piece_number 和 corp 仍然可以从路由参数获取，作为备选，或从全局配置获取
                this.piece_number = this.$route.query.piece_number || pdfConfig.piece_number || "";
                this.corp = this.$route.query.corp || pdfConfig.corp || "";

                // 根据 piece_number 和 corp 构造一个更具体的下载文件名
                if (this.piece_number && this.corp) {
                    this.pdfFileName = this.corp + "_" + this.piece_number + "_质保书.pdf";
                } else if (this.piece_number) {
                    this.pdfFileName = this.piece_number + "_质保书.pdf";
                } else if (this.reportUrl) { // 如果 piece_number 和 corp 都没有，尝试从 reportUrl 提取文件名
                    var urlParts = this.reportUrl.split('/');
                    var fileNameFromUrl = urlParts[urlParts.length - 1];
                    if (fileNameFromUrl && fileNameFromUrl.toLowerCase().endsWith('.pdf')) {
                        this.pdfFileName = fileNameFromUrl;
                    }
                }
                
                // 确保 reportUrl 有值，否则 iframe 会有问题
                if (!this.reportUrl) {
                    console.error("PDF URL is not configured in window.PDF_APP_CONFIG.pdfUrl or is empty.");
                    // 可以在这里给用户一个提示，或者设置一个默认的无效URL来避免iframe加载错误
                    // this.reportUrl = "about:blank"; // 防止iframe加载错误
                    // 如果 L 存在 (Vant UI 的 Notify 或 Toast)
                    // if (typeof L !== 'undefined' && L.n && L.n.fail) {
                    //     L.n.fail("PDF文件路径未配置，无法显示内容。");
                    // } else {
                    //     alert("PDF文件路径未配置，无法显示内容。");
                    // }
                }
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
                    var pdfSrc = this.reportUrl;
                    if (!pdfSrc) {
                        console.error("PDF source URL for download is not defined.");
                        // 考虑用户提示
                        // if (typeof L !== 'undefined' && L.n && L.n.fail) {
                        //     L.n.fail("无法下载PDF，文件路径未指定。");
                        // } else {
                        //     alert("无法下载PDF，文件路径未指定。");
                        // }
                        return;
                    }

                    var a = document.createElement("a");
                    a.href = pdfSrc;
                    a.download = this.pdfFileName; // 使用data中定义的下载文件名
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
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
                    src: e.reportUrl, // iframe 的 src 依赖 data中的 reportUrl
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