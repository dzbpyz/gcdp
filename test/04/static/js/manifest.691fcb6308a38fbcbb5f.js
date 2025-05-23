!function(e) {
    function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n),
        o.l = !0,
        o.exports
    }
    var r = window.webpackJsonp;
    window.webpackJsonp = function(t, a, c) {
        for (var f, u, i, d = 0, s = []; d < t.length; d++)
            u = t[d],
            o[u] && s.push(o[u][0]),
            o[u] = 0;
        for (f in a)
            Object.prototype.hasOwnProperty.call(a, f) && (e[f] = a[f]);
        for (r && r(t, a, c); s.length; )
            s.shift()();
        if (c)
            for (d = 0; d < c.length; d++)
                i = n(n.s = c[d]);
        return i
    }
    ;
    var t = {}
      , o = {
        12: 0
    };
    n.e = function(e) {
        function r() {
            f.onerror = f.onload = null,
            clearTimeout(u);
            var n = o[e];
            0 !== n && (n && n[1](new Error("Loading chunk " + e + " failed.")),
            o[e] = void 0)
        }
        var t = o[e];
        if (0 === t)
            return new Promise(function(e) {
                e()
            }
            );
        if (t)
            return t[2];
        var a = new Promise(function(n, r) {
            t = o[e] = [n, r]
        }
        );
        t[2] = a;
        var c = document.getElementsByTagName("head")[0]
          , f = document.createElement("script");
        f.type = "text/javascript",
        f.charset = "utf-8",
        f.async = !0,
        f.timeout = 12e4,
        n.nc && f.setAttribute("nonce", n.nc),
        f.src = n.p + "static/js/" + e + "." + { // 注意这里的拼接，n.p 后面直接跟 static
            0: "f92ac3a9f02ec5163f48",
            1: "d08a8892fb2896efdb91",
            2: "60beb24bb24b7d3a5568",
            3: "63e58972dfbf03faa112",
            4: "f78ead91973afbe498ff", // 这个是报错的 chunk 4
            5: "5b5b5be4fcd5a2683fc3",
            6: "413dc34506648c0a1b7c",
            7: "f6b16870e1a23ae73fea",
            8: "796950d0285c376d7022",
            9: "0b2c23e8a364d5ac27a9"
        }[e] + ".js";
        var u = setTimeout(r, 12e4);
        return f.onerror = f.onload = r,
        c.appendChild(f),
        a
    }
    ,
    n.m = e,
    n.c = t,
    n.d = function(e, r, t) {
        n.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: t
        })
    }
    ,
    n.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(r, "a", r),
        r
    }
    ,
    n.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }
    ,
    // !!! 修改点: 将 n.p 的值从 "/modules/wx/" 改为 "../"
    // 这是因为 manifest.js 本身位于 static/js/ 目录下
    // 它需要先跳出到 static/，再跳出到项目根目录 (your_project_root)，然后再进入 static/ 文件夹
    // 因此，如果 manifest.js 在 static/js/ 下，而它需要加载 static/js/chunk.js，
    // 那么 n.p 应该是 "" (如果 manifest.js 和其他 chunks 在同一个目录)
    // 或者，更通用的做法是，如果你的 index.html 是从 /index/index.html 访问，
    // 而 chunks 是从 /static/js/ 访问，那么 `n.p` 应该设置为 `../` (相对于 manifest.js 自身的位置)
    // 或者是相对于 index.html 的绝对路径或相对路径。
    // 假设 manifest.js 在 static/js/ 下，而它要加载其他 static/js/ 下的 chunks，n.p 应该为空字符串 ""
    // 但如果 manifest.js 在 static/js/ 下，而 index.html 在 index/ 下，
    // `index.html` 引用 manifest.js 的路径是 `../static/js/manifest...js`
    // 那么 manifest.js 内部的 publicPath (n.p) 应该是相对于 `index.html` 的 `../static/`
    // **最稳妥的 publicPath 是相对于 index.html 的路径，或者服务器绝对路径（如果部署结构固定）。**
    // 考虑到 manifest.js 自身位于 `../static/js/` (相对于 index.html)，
    // 而它加载的 chunks 也位于 `../static/js/` (相对于 index.html)
    // 那么 `n.p` 应该设置为 `../` (从 manifest.js 自己的位置出发，回到上一级，再进入 static)
    // 但 manifest.js 代码中是 `f.src = n.p + "static/js/" + ...`
    // 所以，如果 `index.html` 引用 `../static/js/manifest...js`
    // 而 manifest 又要加载 `../static/js/chunk...js`
    // 那么 `n.p` 应该设置成 `../`，这样拼接后就是 `../static/js/chunk...js`，这是正确的。
    n.p = "../", // <--- 修改点
    n.oe = function(e) {
        throw console.error(e),
        e
    }
}([]);
//# sourceMappingURL=manifest.691fcb6308a38fbcbb5f.js.map