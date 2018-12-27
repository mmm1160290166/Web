(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require("jquery"));
    else if (typeof define === 'function' && define.amd)
        define(["jquery"], factory);
    else if (typeof exports === 'object')
        exports["P8"] = factory(require("jquery"));
    else
        root["P8"] = factory(root["jQuery"]);
})(this, function (__WEBPACK_EXTERNAL_MODULE_1__) {
    return (function (modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId])
                return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "";
        return __webpack_require__(0);
    })
([
    /* 0 入口 */
    function (module, exports, __webpack_require__) {
        'use strict';
        var $ = __webpack_require__(1), P8 = __webpack_require__(2);
        __webpack_require__(3);
        __webpack_require__(4);
        __webpack_require__(5);
        __webpack_require__(6);
        module.exports = $.P8 = P8;
    },
    /* 1 jQuery*/
    function (module, exports) { module.exports = __WEBPACK_EXTERNAL_MODULE_1__; },
    /* 2 P8*/
    function (module, exports, __webpack_require__) {
        'use strict';
        var $ = __webpack_require__(1);
        if (typeof $ === 'undefined') { throw new Error('P8 1.0 requires jQuery'); }
        var P8 = $.P8 || {}; P8.VERSION = '1.0'; module.exports = P8;
    },
    /* 3 laytpl 模版引擎*/
    function (module, exports, __webpack_require__) {
        "use strict";
        var P8 = __webpack_require__(2), f, b = { open: "{{", close: "}}" },
        c = {
            exp: function (a) {
                return new RegExp(a, "g")
            },
            query: function (a, c, e) {
                var f = ["#([\\s\\S])+?", "([^{#}])*?"][a || 0];
                return d((c || "") + b.open + f + b.close + (e || ""))
            },
            escape: function (a) {
                return String(a || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
            },
            error: function (a, b) {
                var c = "Laytpl Error：";
                return "object" == typeof console && console.error(c + a + "\n" + (b || "")),
                c + a
            }
        },
        d = c.exp,
        e = function (a) {
            this.tpl = a
        };
        e.pt = e.prototype,
        e.pt.parse = function (a, e) {
            var f = this,
            g = a,
            h = d("^" + b.open + "#", ""),
            i = d(b.close + "$", "");
            a = a.replace(/[\r\t\n]/g, " ").replace(d(b.open + "#"), b.open + "# ").replace(d(b.close + "}"), "} " + b.close).replace(/\\/g, "\\\\").replace(/(?="|')/g, "\\").replace(c.query(),
            function (a) {
                return a = a.replace(h, "").replace(i, ""),
                '";' + a.replace(/\\/g, "") + '; view+="'
            }).replace(c.query(1),
            function (a) {
                var c = '"+(';
                return a.replace(/\s/g, "") === b.open + b.close ? "" : (a = a.replace(d(b.open + "|" + b.close), ""), /^=/.test(a) && (a = a.replace(/^=/, ""), c = '"+_escape_('), c + a.replace(/\\/g, "") + ')+"')
            }),
            a = '"use strict";var view = "' + a + '";return view;';
            try {
                return f.cache = a = new Function("d, _escape_", a),
                a(e, c.escape)
            } catch (j) {
                return delete f.cache,
                c.error(j, g)
            }
        },
        e.pt.render = function (a, b) {
            var e, d = this;
            return a ? (e = d.cache ? d.cache(a, c.escape) : d.parse(d.tpl, a), b ? (b(e), void 0) : e) : c.error("no data")
        },
        f = function (a) {
            return "string" != typeof a ? c.error("Template not found") : new e(a)
        },
        f.config = function (a) {
            a = a || {};
            for (var c in a) b[c] = a[c]
        },
        f.v = "1.1",
        module.exports = P8.laytpl = f;
    },
    /* 4 page 分页组件*/
    function (module, exports, __webpack_require__) {
        "use strict";
        var P8 = __webpack_require__(2), doc = document, id = 'getElementById', tag = 'getElementsByTagName';
        function a(d) {
            var e = "pagecss";
            a.dir = "dir" in a ? a.dir : Page.getpath + "css/page.css",
            new Page(d), a.dir && !doc[id](e) && Page.use(a.dir, e)
        }
        var index = 0, Page = function (options) {
            var that = this;
            var conf = that.config = options || {};
            conf.item = index++;
            that.render(true);
        };
        Page.on = function (elem, even, fn) {
            elem.attachEvent ? elem.attachEvent('on' + even, function () {
                fn.call(elem, window.even);
            }) : elem.addEventListener(even, fn, false);
            return Page;
        };
        Page.getpath = function () { var a = doc.scripts, b = a[a.length - 1].src; return b.substring(0, b.lastIndexOf("/") + 1) }();
        Page.use = function (c, e) { var f = doc.createElement("link"); f.type = "text/css", f.rel = "stylesheet", f.href = c, e && (f.id = e), doc[tag]("head")[0].appendChild(f), f = null };
        //判断传入的容器类型
        Page.prototype.type = function () {
            var conf = this.config;
            if (typeof conf.cont === 'object') {
                return conf.cont.length === undefined ? 2 : 3;
            }
        };
        //分页视图
        Page.prototype.view = function () {
            var that = this, conf = that.config, view = [], dict = {};
            conf.pagesize = conf.pagesize;
            conf.pages = conf.pages | 0;
            conf.curr = (conf.curr | 0) || 1;
            conf.groups = 'groups' in conf ? (conf.groups | 0) : 5;
            conf.prev = 'prev' in conf ? conf.prev : '&#x4E0A;&#x4E00;&#x9875;';
            conf.next = 'next' in conf ? conf.next : '&#x4E0B;&#x4E00;&#x9875;';
            //输出每页记录数
            view.push('<span class="page-total">&#x6BCF;&#x9875; ');
            view.push('<select class="page-sel pagesize">');
            view.push('<option value="10" ' + ((conf.pagesize == 10) ? 'selected="selected"' : '') + '>10</option>');
            view.push('<option value="25" ' + ((conf.pagesize == 25) ? 'selected="selected"' : '') + '>25</option>');
            view.push('<option value="50" ' + ((conf.pagesize == 50) ? 'selected="selected"' : '') + '>50</option>');
            view.push('<option value="100" ' + ((conf.pagesize == 100) ? 'selected="selected"' : '') + '>100</option>');
            view.push('<option value="500" ' + ((conf.pagesize == 500) ? 'selected="selected"' : '') + '>500</option>');
            view.push('<option value="1000" ' + ((conf.pagesize == 1000) ? 'selected="selected"' : '') + '>1000</option>');
            view.push('</select> &#x6761;');
            view.push('</span>');
            if (conf.pages < 1) {
                return '';
            }
            if (conf.pages == 1) {
                return '<div class="layui-box page page-' + (conf.skin ? (function (skin) {
                    return /^#/.test(skin) ? 'molv' : skin;
                }(conf.skin)) : 'default') + '" id="page-' + that.config.item + '">' + view.join('') + function () {
                    //如果 skip:true 加入跳转页
                    return conf.skip
                    ? '<span class="page-total">&#x5230;&#x7B2C; <input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" value="' + conf.curr + '" class="page-skip"> &#x9875; '
                    + '<button type="button" class="page-btn">&#x786e;&#x5b9a;</button></span>'
                    : '';
                }()
                //当前第 1 页 共 1 页
                + '<span class="page-total">&#x5F53;&#x524D;&#x7B2C; 1 &#x9875; &#x5171; 1 &#x9875;</span>'
                + '</div>';
            }
            if (conf.groups > conf.pages) { conf.groups = conf.pages; }
            //计算当前组
            dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0)) / (conf.groups === 0 ? 1 : conf.groups));

            //当前页非首页，则输出上一页
            if (conf.curr > 1 && conf.prev) {
                view.push('<a href="javascript:;" class="page-prev" data-page="' + (conf.curr - 1) + '">' + conf.prev + '</a>');
            }
            //输出当前页组
            dict.poor = Math.floor((conf.groups - 1) / 2);
            dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
            dict.end = dict.index > 1 ? (function () {
                var max = conf.curr + (conf.groups - dict.poor - 1);
                return max > conf.pages ? conf.pages : max;
            }()) : conf.groups;
            //最后一组状态
            if (dict.end - dict.start < conf.groups - 1) {
                dict.start = dict.end - conf.groups + 1;
            }
            for (; dict.start <= dict.end; dict.start++) {
                if (dict.start === conf.curr) {
                    view.push('<span class="page-curr"><em class="page-em" ' + (/^#/.test(conf.skin) ? 'style="background-color:' + conf.skin + ';"' : '') + '></em><em>' + dict.start + '</em></span>');
                } else {
                    view.push('<a href="javascript:;" data-page="' + dict.start + '">' + dict.start + '</a>');
                }
            }
            //当前页不为尾页时，输出下一页
            dict.flow = !conf.prev && conf.groups === 0;
            if (conf.curr !== conf.pages && conf.next || dict.flow) {
                view.push((function () {
                    return (dict.flow && conf.curr === conf.pages)
                    ? '<span class="page-nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">' + conf.next + '</span>'
                    : '<a href="javascript:;" class="page-next" data-page="' + (conf.curr + 1) + '">' + conf.next + '</a>';
                }()));
            }
            return '<div class="layui-box page page-' + (conf.skin ? (function (skin) {
                return /^#/.test(skin) ? 'molv' : skin;
            }(conf.skin)) : 'default') + '" id="page-' + that.config.item + '">' + view.join('') + function () {
                //如果 skip:true 加入跳转页
                return conf.skip
                ? '<span class="page-total">&#x5230;&#x7B2C; <input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" value="' + conf.curr + '" class="page-skip"> &#x9875; '
                + '<button type="button" class="page-btn">&#x786e;&#x5b9a;</button></span>'
                : '';
            }()
            //当前第 1 页 共 50 页
            + '<span class="page-total">&#x5F53;&#x524D;&#x7B2C; ' + conf.curr + ' &#x9875; &#x5171; ' + conf.pages + ' &#x9875;</span>'
            + '</div>';
        };

        //跳页
        Page.prototype.jump = function (elem) {
            if (!elem) return;
            var that = this, conf = that.config, childs = elem.children;
            var sel = elem[tag]('select')[0];
            var btn = elem[tag]('button')[0];
            var input = elem[tag]('input')[0];
            for (var i = 0, len = childs.length; i < len; i++) {
                if (childs[i].nodeName.toLowerCase() === 'a') {
                    Page.on(childs[i], 'click', function () {
                        var curr = this.getAttribute('data-page') | 0;
                        conf.curr = curr;
                        that.render();

                    });
                }
            }
            //添加每页记录数
            if (sel) {
                Page.on(sel, 'change', function () {
                    conf.pagesize = sel.value;
                    conf.curr = 1;
                    that.render();
                });
            }
            if (btn) {
                Page.on(btn, 'click', function () {
                    var curr = input.value.replace(/\s|\D/g, '') | 0;
                    if (curr && curr <= conf.pages) {
                        conf.curr = curr;
                        that.render();
                    }
                });
            }
        };
        //渲染分页
        Page.prototype.render = function (load) {
            var that = this, conf = that.config, type = that.type();
            var view = that.view();
            if (type === 2) {
                conf.cont.innerHTML = view;
            } else if (type === 3) {
                conf.cont.html(view);
            } else {
                doc[id](conf.cont).innerHTML = view;
            }
            conf.jump && conf.jump(conf, load);
            that.jump(doc[id]('page-' + conf.item));
        };
        module.exports = P8.page = a;
    },
    /* 5 layer 弹窗组件*/
    function (module, exports, __webpack_require__) {
        "use strict";
        var P8 = __webpack_require__(2), lay = function () { };
        lay.prototype.layer = function (e, t) {
            "use strict";
            var i, n, a = e.layui && layui.define,
            o = {
                getPath: function () {
                    var e = document.scripts,
                    t = e[e.length - 1],
                    i = t.src;
                    if (!t.getAttribute("merge")) return i.substring(0, i.lastIndexOf("/") + 1)
                }(),
                config: {},
                end: {},
                minIndex: 0,
                minLeft: [],
                btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
                type: ["dialog", "page", "iframe", "loading", "tips"]
            },
            r = {
                v: "3.0.1",
                ie: function () {
                    var t = navigator.userAgent.toLowerCase();
                    return !!(e.ActiveXObject || "ActiveXObject" in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11")
                }(),
                index: e.layer && e.layer.v ? 1e5 : 0,
                path: o.getPath,
                config: function (e, t) {
                    return e = e || {},
                    r.cache = o.config = i.extend({},
                    o.config, e),
                    r.path = o.config.path || r.path,
                    "string" == typeof e.extend && (e.extend = [e.extend]),
                    o.config.path && r.ready(),
                    e.extend ? (a ? layui.addcss("css/layer/modules/layer/" + e.extend) : r.link("css/layer/skin/" + e.extend), this) : this
                },
                link: function (t, n, a) {
                    if (r.path) {
                        var o = i("head")[0],
                        l = document.createElement("link");
                        "string" == typeof n && (a = n);
                        var s = (a || t).replace(/\.|\//g, ""),
                        f = "layuicss-" + s,
                        c = 0;
                        l.rel = "stylesheet",
                        l.href = r.path + t,
                        l.id = f,
                        i("#" + f)[0] || o.appendChild(l),
                        "function" == typeof n && !
                        function d() {
                            return ++c > 80 ? e.console && console.error("layer.css: Invalid") : void (1989 === parseInt(i("#" + f).css("width")) ? n() : setTimeout(d, 100))
                        }()
                    }
                },
                ready: function (e) {
                    var t = "skinlayercss",
                    i = "1110";
                    return a ? layui.addcss("css/layer/modules/layer/default/layer.css?v=" + r.v + i, e, t) : r.link("css/layer/skin/default/layer.css?v=" + r.v + i, e, t),
                    this
                },
                alert: function (e, t, n) {
                    var a = "function" == typeof t;
                    return a && (n = t),
                    r.open(i.extend({
                        content: e,
                        yes: n
                    },
                    a ? {} : t))
                },
                confirm: function (e, t, n, a) {
                    var l = "function" == typeof t;
                    return l && (a = n, n = t),
                    r.open(i.extend({
                        content: e,
                        btn: o.btn,
                        yes: n,
                        btn2: a
                    },
                    l ? {} : t))
                },
                msg: function (e, n, a) {
                    var l = "function" == typeof n,
                    f = o.config.skin,
                    c = (f ? f + " " + f + "-msg" : "") || "layui-layer-msg",
                    d = s.anim.length - 1;
                    return l && (a = n),
                    r.open(i.extend({
                        content: e,
                        time: 3e3,
                        shade: !1,
                        skin: c,
                        title: !1,
                        closeBtn: !1,
                        btn: !1,
                        resize: !1,
                        end: a
                    },
                    l && !o.config.skin ? {
                        skin: c + " layui-layer-hui",
                        anim: d
                    } : function () {
                        return n = n || {},
                        (n.icon === -1 || n.icon === t && !o.config.skin) && (n.skin = c + " " + (n.skin || "layui-layer-hui")),
                        n
                    }()))
                },
                load: function (e, t) {
                    return r.open(i.extend({
                        type: 3,
                        icon: e || 0,
                        resize: !1,
                        shade: .01
                    },
                    t))
                },
                tips: function (e, t, n) {
                    return r.open(i.extend({
                        type: 4,
                        content: [e, t],
                        closeBtn: !1,
                        time: 3e3,
                        shade: !1,
                        resize: !1,
                        fixed: !1,
                        maxWidth: 210
                    },
                    n))
                }
            },
            l = function (e) {
                var t = this;
                t.index = ++r.index,
                t.config = i.extend({},
                t.config, o.config, e),
                document.body ? t.creat() : setTimeout(function () {
                    t.creat()
                },
                50)
            };
            l.pt = l.prototype;
            var s = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
            s.anim = ["layer-anim", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"],
            l.pt.config = {
                type: 0,
                shade: .3,
                fixed: !0,
                move: s[1],
                title: "&#x4FE1;&#x606F;",
                offset: "auto",
                area: "auto",
                closeBtn: 1,
                time: 0,
                zIndex: 19891014,
                maxWidth: 360,
                anim: 0,
                icon: -1,
                moveType: 1,
                resize: !0,
                scrollbar: !0,
                tips: 2
            },
            l.pt.vessel = function (e, t) {
                var n = this,
                a = n.index,
                r = n.config,
                l = r.zIndex + a,
                f = "object" == typeof r.title,
                c = r.maxmin && (1 === r.type || 2 === r.type),
                d = r.title ? '<div class="layui-layer-title" style="' + (f ? r.title[1] : "") + '">' + (f ? r.title[0] : r.title) + "</div>" : "";
                return r.zIndex = l,
                t([r.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + a + '" times="' + a + '" style="' + ("z-index:" + (l - 1) + "; background-color:" + (r.shade[1] || "#000") + "; opacity:" + (r.shade[0] || r.shade) + "; filter:alpha(opacity=" + (100 * r.shade[0] || 100 * r.shade) + ");") + '"></div>' : "", '<div class="' + s[0] + (" layui-layer-" + o.type[r.type]) + (0 != r.type && 2 != r.type || r.shade ? "" : " layui-layer-border") + " " + (r.skin || "") + '" id="' + s[0] + a + '" type="' + o.type[r.type] + '" times="' + a + '" showtime="' + r.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + l + "; width:" + r.area[0] + ";height:" + r.area[1] + (r.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != r.type ? "" : d) + '<div id="' + (r.id || "") + '" class="layui-layer-content' + (0 == r.type && r.icon !== -1 ? " layui-layer-padding" : "") + (3 == r.type ? " layui-layer-loading" + r.icon : "") + '">' + (0 == r.type && r.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + r.icon + '"></i>' : "") + (1 == r.type && e ? "" : r.content || "") + '</div><span class="layui-layer-setwin">' +
                function () {
                    var e = c ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
                    return r.closeBtn && (e += '<a class="layui-layer-ico ' + s[7] + " " + s[7] + (r.title ? r.closeBtn : 4 == r.type ? "1" : "2") + '" href="javascript:;"></a>'),
                    e
                }() + "</span>" + (r.btn ?
                function () {
                    var e = "";
                    "string" == typeof r.btn && (r.btn = [r.btn]);
                    for (var t = 0,
                    i = r.btn.length; t < i; t++) e += '<a class="' + s[6] + t + '">' + r.btn[t] + "</a>";
                    return '<div class="' + s[6] + " layui-layer-btn-" + (r.btnAlign || "") + '">' + e + "</div>"
                }() : "") + (r.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], d, i('<div class="layui-layer-move"></div>')),
                n
            },
            l.pt.creat = function () {
                var e = this,
                t = e.config,
                a = e.index,
                l = t.content,
                f = "object" == typeof l,
                c = i("body");
                if (!i("#" + t.id)[0]) {
                    switch ("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]), t.shift && (t.anim = t.shift), 6 == r.ie && (t.fixed = !1), t.type) {
                        case 0:
                            t.btn = "btn" in t ? t.btn : o.btn[0],
                            r.closeAll("dialog");
                            break;
                        case 2:
                            var l = t.content = f ? t.content : [t.content || "http://p8.la", "auto"];
                            t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + s[4] + a + '" name="' + s[4] + a + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
                            break;
                        case 3:
                            delete t.title,
                            delete t.closeBtn,
                            t.icon === -1 && 0 === t.icon,
                            r.closeAll("loading");
                            break;
                        case 4:
                            f || (t.content = [t.content, "body"]),
                            t.follow = t.content[1],
                            t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>',
                            delete t.title,
                            t.tips = "object" == typeof t.tips ? t.tips : [t.tips, !0],
                            t.tipsMore || r.closeAll("tips")
                    }
                    e.vessel(f,
                    function (n, r, d) {
                        c.append(n[0]),
                        f ?
                        function () {
                            2 == t.type || 4 == t.type ?
                            function () {
                                i("body").append(n[1])
                            }() : function () {
                                l.parents("." + s[0])[0] || (l.data("display", l.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]), i("#" + s[0] + a).find("." + s[5]).before(r))
                            }()
                        }() : c.append(n[1]),
                        i(".layui-layer-move")[0] || c.append(o.moveElem = d),
                        e.layero = i("#" + s[0] + a),
                        t.scrollbar || s.html.css("overflow", "hidden").attr("layer-full", a)
                    }).auto(a),
                    2 == t.type && 6 == r.ie && e.layero.find("iframe").attr("src", l[0]),
                    4 == t.type ? e.tips() : e.offset(),
                    t.fixed && n.on("resize",
                    function () {
                        e.offset(),
                        (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(a),
                        4 == t.type && e.tips()
                    }),
                    t.time <= 0 || setTimeout(function () {
                        r.close(e.index)
                    },
                    t.time),
                    e.move().callback(),
                    s.anim[t.anim] && e.layero.addClass(s.anim[t.anim]).data("anim", !0)
                }
            },
            l.pt.auto = function (e) {
                function t(e) {
                    e = l.find(e),
                    e.height(f[1] - c - d - 2 * (0 | parseFloat(e.css("padding"))))
                }
                var a = this,
                o = a.config,
                l = i("#" + s[0] + e);
                "" === o.area[0] && o.maxWidth > 0 && (r.ie && r.ie < 8 && o.btn && l.width(l.innerWidth()), l.outerWidth() > o.maxWidth && l.width(o.maxWidth));
                var f = [l.innerWidth(), l.innerHeight()],
                c = l.find(s[1]).outerHeight() || 0,
                d = l.find("." + s[6]).outerHeight() || 0;
                switch (o.type) {
                    case 2:
                        t("iframe");
                        break;
                    default:
                        "" === o.area[1] ? o.fixed && f[1] >= n.height() && (f[1] = n.height(), t("." + s[5])) : t("." + s[5])
                }
                return a
            },
            l.pt.offset = function () {
                var e = this,
                t = e.config,
                i = e.layero,
                a = [i.outerWidth(), i.outerHeight()],
                o = "object" == typeof t.offset;
                e.offsetTop = (n.height() - a[1]) / 2,
                e.offsetLeft = (n.width() - a[0]) / 2,
                o ? (e.offsetTop = t.offset[0], e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - a[0] : "b" === t.offset ? e.offsetTop = n.height() - a[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = n.width() - a[0]) : "rb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = n.width() - a[0]) : e.offsetTop = t.offset),
                t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ? n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += n.scrollTop(), e.offsetLeft += n.scrollLeft()),
                i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(s[1]).outerHeight() || 0), e.offsetLeft = i.css("left")),
                i.css({
                    top: e.offsetTop,
                    left: e.offsetLeft
                })
            },
            l.pt.tips = function () {
                var e = this,
                t = e.config,
                a = e.layero,
                o = [a.outerWidth(), a.outerHeight()],
                r = i(t.follow);
                r[0] || (r = i("body"));
                var l = {
                    width: r.outerWidth(),
                    height: r.outerHeight(),
                    top: r.offset().top,
                    left: r.offset().left
                },
                f = a.find(".layui-layer-TipsG"),
                c = t.tips[0];
                t.tips[1] || f.remove(),
                l.autoLeft = function () {
                    l.left + o[0] - n.width() > 0 ? (l.tipLeft = l.left + l.width - o[0], f.css({
                        right: 12,
                        left: "auto"
                    })) : l.tipLeft = l.left
                },
                l.where = [function () {
                    l.autoLeft(),
                    l.tipTop = l.top - o[1] - 10,
                    f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1])
                },
                function () {
                    l.tipLeft = l.left + l.width + 10,
                    l.tipTop = l.top,
                    f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1])
                },
                function () {
                    l.autoLeft(),
                    l.tipTop = l.top + l.height + 10,
                    f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1])
                },
                function () {
                    l.tipLeft = l.left - o[0] - 10,
                    l.tipTop = l.top,
                    f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1])
                }],
                l.where[c - 1](),
                1 === c ? l.top - (n.scrollTop() + o[1] + 16) < 0 && l.where[2]() : 2 === c ? n.width() - (l.left + l.width + o[0] + 16) > 0 || l.where[3]() : 3 === c ? l.top - n.scrollTop() + l.height + o[1] + 16 - n.height() > 0 && l.where[0]() : 4 === c && o[0] + 16 - l.left > 0 && l.where[1](),
                a.find("." + s[5]).css({
                    "background-color": t.tips[1],
                    "padding-right": t.closeBtn ? "30px" : ""
                }),
                a.css({
                    left: l.tipLeft - (t.fixed ? n.scrollLeft() : 0),
                    top: l.tipTop - (t.fixed ? n.scrollTop() : 0)
                })
            },
            l.pt.move = function () {
                var e = this,
                t = e.config,
                a = i(document),
                l = e.layero,
                s = l.find(t.move),
                f = l.find(".layui-layer-resize"),
                c = {};
                return t.move && s.css("cursor", "move"),
                s.on("mousedown",
                function (e) {
                    e.preventDefault(),
                    t.move && (c.moveStart = !0, c.offset = [e.clientX - parseFloat(l.css("left")), e.clientY - parseFloat(l.css("top"))], o.moveElem.css("cursor", "move").show())
                }),
                f.on("mousedown",
                function (e) {
                    e.preventDefault(),
                    c.resizeStart = !0,
                    c.offset = [e.clientX, e.clientY],
                    c.area = [l.outerWidth(), l.outerHeight()],
                    o.moveElem.css("cursor", "se-resize").show()
                }),
                a.on("mousemove",
                function (i) {
                    if (c.moveStart) {
                        var a = i.clientX - c.offset[0],
                        o = i.clientY - c.offset[1],
                        s = "fixed" === l.css("position");
                        if (i.preventDefault(), c.stX = s ? 0 : n.scrollLeft(), c.stY = s ? 0 : n.scrollTop(), !t.moveOut) {
                            var f = n.width() - l.outerWidth() + c.stX,
                            d = n.height() - l.outerHeight() + c.stY;
                            a < c.stX && (a = c.stX),
                            a > f && (a = f),
                            o < c.stY && (o = c.stY),
                            o > d && (o = d)
                        }
                        l.css({
                            left: a,
                            top: o
                        })
                    }
                    if (t.resize && c.resizeStart) {
                        var a = i.clientX - c.offset[0],
                        o = i.clientY - c.offset[1];
                        i.preventDefault(),
                        r.style(e.index, {
                            width: c.area[0] + a,
                            height: c.area[1] + o
                        }),
                        c.isResize = !0
                    }
                }).on("mouseup",
                function (e) {
                    c.moveStart && (delete c.moveStart, o.moveElem.hide(), t.moveEnd && t.moveEnd()),
                    c.resizeStart && (delete c.resizeStart, o.moveElem.hide())
                }),
                e
            },
            l.pt.callback = function () {
                function e() {
                    var e = a.cancel && a.cancel(t.index, n);
                    e === !1 || r.close(t.index)
                }
                var t = this,
                n = t.layero,
                a = t.config;
                t.openLayer(),
                a.success && (2 == a.type ? n.find("iframe").on("load",
                function () {
                    a.success(n, t.index)
                }) : a.success(n, t.index)),
                6 == r.ie && t.IE6(n),
                n.find("." + s[6]).children("a").on("click",
                function () {
                    var e = i(this).index();
                    if (0 === e) a.yes ? a.yes(t.index, n) : a.btn1 ? a.btn1(t.index, n) : r.close(t.index);
                    else {
                        var o = a["btn" + (e + 1)] && a["btn" + (e + 1)](t.index, n);
                        o === !1 || r.close(t.index)
                    }
                }),
                n.find("." + s[7]).on("click", e),
                a.shadeClose && i("#layui-layer-shade" + t.index).on("click",
                function () {
                    r.close(t.index)
                }),
                n.find(".layui-layer-min").on("click",
                function () {
                    var e = a.min && a.min(n);
                    e === !1 || r.min(t.index, a)
                }),
                n.find(".layui-layer-max").on("click",
                function () {
                    i(this).hasClass("layui-layer-maxmin") ? (r.restore(t.index), a.restore && a.restore(n)) : (r.full(t.index, a), setTimeout(function () {
                        a.full && a.full(n)
                    },
                    100))
                }),
                a.end && (o.end[t.index] = a.end)
            },
            o.reselect = function () {
                i.each(i("select"),
                function (e, t) {
                    var n = i(this);
                    n.parents("." + s[0])[0] || 1 == n.attr("layer") && i("." + s[0]).length < 1 && n.removeAttr("layer").show(),
                    n = null
                })
            },
            l.pt.IE6 = function (e) {
                i("select").each(function (e, t) {
                    var n = i(this);
                    n.parents("." + s[0])[0] || "none" === n.css("display") || n.attr({
                        layer: "1"
                    }).hide(),
                    n = null
                })
            },
            l.pt.openLayer = function () {
                var e = this;
                r.zIndex = e.config.zIndex,
                r.setTop = function (e) {
                    var t = function () {
                        r.zIndex++,
                        e.css("z-index", r.zIndex + 1)
                    };
                    return r.zIndex = parseInt(e[0].style.zIndex),
                    e.on("mousedown", t),
                    r.zIndex
                }
            },
            o.record = function (e) {
                var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
                e.find(".layui-layer-max").addClass("layui-layer-maxmin"),
                e.attr({
                    area: t
                })
            },
            o.rescollbar = function (e) {
                s.html.attr("layer-full") == e && (s.html[0].style.removeProperty ? s.html[0].style.removeProperty("overflow") : s.html[0].style.removeAttribute("overflow"), s.html.removeAttr("layer-full"))
            },
            e.layer = r,
            r.getChildFrame = function (e, t) {
                return t = t || i("." + s[4]).attr("times"),
                i("#" + s[0] + t).find("iframe").contents().find(e)
            },
            r.getFrameIndex = function (e) {
                return i("#" + e).parents("." + s[4]).attr("times")
            },
            r.iframeAuto = function (e) {
                if (e) {
                    var t = r.getChildFrame("html", e).outerHeight(),
                    n = i("#" + s[0] + e),
                    a = n.find(s[1]).outerHeight() || 0,
                    o = n.find("." + s[6]).outerHeight() || 0;
                    n.css({
                        height: t + a + o
                    }),
                    n.find("iframe").css({
                        height: t
                    })
                }
            },
            r.iframeSrc = function (e, t) {
                i("#" + s[0] + e).find("iframe").attr("src", t)
            },
            r.style = function (e, t, n) {
                var a = i("#" + s[0] + e),
                r = a.find(".layui-layer-content"),
                l = a.attr("type"),
                f = a.find(s[1]).outerHeight() || 0,
                c = a.find("." + s[6]).outerHeight() || 0;
                a.attr("minLeft");
                l !== o.type[3] && l !== o.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - f - c <= 64 && (t.height = 64 + f + c)), a.css(t), c = a.find("." + s[6]).outerHeight(), l === o.type[2] ? a.find("iframe").css({
                    height: parseFloat(t.height) - f - c
                }) : r.css({
                    height: parseFloat(t.height) - f - c - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom"))
                }))
            },
            r.min = function (e, t) {
                var a = i("#" + s[0] + e),
                l = a.find(s[1]).outerHeight() || 0,
                f = a.attr("minLeft") || 181 * o.minIndex + "px",
                c = a.css("position");
                o.record(a),
                o.minLeft[0] && (f = o.minLeft[0], o.minLeft.shift()),
                a.attr("position", c),
                r.style(e, {
                    width: 180,
                    height: l,
                    left: f,
                    top: n.height() - l,
                    position: "fixed",
                    overflow: "hidden"
                },
                !0),
                a.find(".layui-layer-min").hide(),
                "page" === a.attr("type") && a.find(s[4]).hide(),
                o.rescollbar(e),
                a.attr("minLeft") || o.minIndex++,
                a.attr("minLeft", f)
            },
            r.restore = function (e) {
                var t = i("#" + s[0] + e),
                n = t.attr("area").split(",");
                t.attr("type");
                r.style(e, {
                    width: parseFloat(n[0]),
                    height: parseFloat(n[1]),
                    top: parseFloat(n[2]),
                    left: parseFloat(n[3]),
                    position: t.attr("position"),
                    overflow: "visible"
                },
                !0),
                t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),
                t.find(".layui-layer-min").show(),
                "page" === t.attr("type") && t.find(s[4]).show(),
                o.rescollbar(e)
            },
            r.full = function (e) {
                var t, a = i("#" + s[0] + e);
                o.record(a),
                s.html.attr("layer-full") || s.html.css("overflow", "hidden").attr("layer-full", e),
                clearTimeout(t),
                t = setTimeout(function () {
                    var t = "fixed" === a.css("position");
                    r.style(e, {
                        top: t ? 0 : n.scrollTop(),
                        left: t ? 0 : n.scrollLeft(),
                        width: n.width(),
                        height: n.height()
                    },
                    !0),
                    a.find(".layui-layer-min").hide()
                },
                100)
            },
            r.title = function (e, t) {
                var n = i("#" + s[0] + (t || r.index)).find(s[1]);
                n.html(e)
            },
            r.close = function (e) {
                var t = i("#" + s[0] + e),
                n = t.attr("type"),
                a = "layer-anim-close";
                if (t[0]) {
                    var l = "layui-layer-wrap",
                    f = function () {
                        if (n === o.type[1] && "object" === t.attr("conType")) {
                            t.children(":not(." + s[5] + ")").remove();
                            for (var a = t.find("." + l), r = 0; r < 2; r++) a.unwrap();
                            a.css("display", a.data("display")).removeClass(l)
                        } else {
                            if (n === o.type[2]) try {
                                var f = i("#" + s[4] + e)[0];
                                f.contentWindow.document.write(""),
                                f.contentWindow.close(),
                                t.find("." + s[5])[0].removeChild(f)
                            } catch (c) { }
                            t[0].innerHTML = "",
                            t.remove()
                        }
                        "function" == typeof o.end[e] && o.end[e](),
                        delete o.end[e]
                    };
                    t.data("anim") && t.addClass(a),
                    i("#layui-layer-moves, #layui-layer-shade" + e).remove(),
                    6 == r.ie && o.reselect(),
                    o.rescollbar(e),
                    t.attr("minLeft") && (o.minIndex--, o.minLeft.push(t.attr("minLeft"))),
                    setTimeout(function () {
                        f()
                    },
                    r.ie && r.ie < 10 || !t.data("anim") ? 0 : 200)
                }
            },
            r.closeAll = function (e) {
                i.each(i("." + s[0]),
                function () {
                    var t = i(this),
                    n = e ? t.attr("type") === e : 1;
                    n && r.close(t.attr("times")),
                    n = null
                })
            };
            var f = r.cache || {},
            c = function (e) {
                return f.skin ? " " + f.skin + " " + f.skin + "-" + e : ""
            };
            r.prompt = function (e, t) {
                var a = "";
                if (e = e || {},
                "function" == typeof e && (t = e), e.area) {
                    var o = e.area;
                    a = 'style="width: ' + o[0] + "; height: " + o[1] + ';"',
                    delete e.area
                }
                var l, s = 2 == e.formType ? '<textarea class="layui-layer-input"' + a + ">" + (e.value || "") + "</textarea>" : function () {
                    return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (e.value || "") + '">'
                }();
                return r.open(i.extend({
                    type: 1,
                    btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
                    content: s,
                    skin: "layui-layer-prompt" + c("prompt"),
                    maxWidth: n.width(),
                    success: function (e) {
                        l = e.find(".layui-layer-input"),
                        l.focus()
                    },
                    resize: !1,
                    yes: function (i) {
                        var n = l.val();
                        "" === n ? l.focus() : n.length > (e.maxlength || 500) ? r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", l, {
                            tips: 1
                        }) : t && t(n, i, l)
                    }
                },
                e))
            },
            r.tab = function (e) {
                e = e || {};
                var t = e.tab || {};
                return r.open(i.extend({
                    type: 1,
                    skin: "layui-layer-tab" + c("tab"),
                    resize: !1,
                    title: function () {
                        var e = t.length,
                        i = 1,
                        n = "";
                        if (e > 0) for (n = '<span class="layui-layer-tabnow">' + t[0].title + "</span>"; i < e; i++) n += "<span>" + t[i].title + "</span>";
                        return n
                    }(),
                    content: '<ul class="layui-layer-tabmain">' +
                    function () {
                        var e = t.length,
                        i = 1,
                        n = "";
                        if (e > 0) for (n = '<li class="layui-layer-tabli xubox_tab_layer">' + (t[0].content || "no content") + "</li>"; i < e; i++) n += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>";
                        return n
                    }() + "</ul>",
                    success: function (t) {
                        var n = t.find(".layui-layer-title").children(),
                        a = t.find(".layui-layer-tabmain").children();
                        n.on("mousedown",
                        function (t) {
                            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                            var n = i(this),
                            o = n.index();
                            n.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"),
                            a.eq(o).show().siblings().hide(),
                            "function" == typeof e.change && e.change(o)
                        })
                    }
                },
                e))
            },
            r.photos = function (t, n, a) {
                function o(e, t, i) {
                    var n = new Image;
                    return n.src = e,
                    n.complete ? t(n) : (n.onload = function () {
                        n.onload = null,
                        t(n)
                    },
                    void (n.onerror = function (e) {
                        n.onerror = null,
                        i(e)
                    }))
                }
                var l = {};
                if (t = t || {},
                t.photos) {
                    var s = t.photos.constructor === Object,
                    f = s ? t.photos : {},
                    d = f.data || [],
                    u = f.start || 0;
                    if (l.imgIndex = (0 | u) + 1, t.img = t.img || "img", s) {
                        if (0 === d.length) return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
                    } else {
                        var y = i(t.photos),
                        p = function () {
                            d = [],
                            y.find(t.img).each(function (e) {
                                var t = i(this);
                                t.attr("layer-index", e),
                                d.push({
                                    alt: t.attr("alt"),
                                    pid: t.attr("layer-pid"),
                                    src: t.attr("layer-src") || t.attr("src"),
                                    thumb: t.attr("src")
                                })
                            })
                        };
                        if (p(), 0 === d.length) return;
                        if (n || y.on("click", t.img,
                        function () {
                            var e = i(this),
                            n = e.attr("layer-index");
                            r.photos(i.extend(t, {
                            photos: {
                            start: n,
                            data: d,
                            tab: t.tab
                        },
                            full: t.full
                        }), !0),
                            p()
                        }), !n) return
                    }
                    l.imgprev = function (e) {
                        l.imgIndex--,
                        l.imgIndex < 1 && (l.imgIndex = d.length),
                        l.tabimg(e)
                    },
                    l.imgnext = function (e, t) {
                        l.imgIndex++,
                        l.imgIndex > d.length && (l.imgIndex = 1, t) || l.tabimg(e)
                    },
                    l.keyup = function (e) {
                        if (!l.end) {
                            var t = e.keyCode;
                            e.preventDefault(),
                            37 === t ? l.imgprev(!0) : 39 === t ? l.imgnext(!0) : 27 === t && r.close(l.index)
                        }
                    },
                    l.tabimg = function (e) {
                        d.length <= 1 || (f.start = l.imgIndex - 1, r.close(l.index), r.photos(t, !0, e))
                    },
                    l.event = function () {
                        l.bigimg.hover(function () {
                            l.imgsee.show()
                        },
                        function () {
                            l.imgsee.hide()
                        }),
                        l.bigimg.find(".layui-layer-imgprev").on("click",
                        function (e) {
                            e.preventDefault(),
                            l.imgprev()
                        }),
                        l.bigimg.find(".layui-layer-imgnext").on("click",
                        function (e) {
                            e.preventDefault(),
                            l.imgnext()
                        }),
                        i(document).on("keyup", l.keyup)
                    },
                    l.loadi = r.load(1, {
                        shade: !("shade" in t) && .9,
                        scrollbar: !1
                    }),
                    o(d[u].src,
                    function (n) {
                        r.close(l.loadi),
                        l.index = r.open(i.extend({
                            type: 1,
                            area: function () {
                                var a = [n.width, n.height],
                                o = [i(e).width() - 100, i(e).height() - 100];
                                if (!t.full && (a[0] > o[0] || a[1] > o[1])) {
                                    var r = [a[0] / o[0], a[1] / o[1]];
                                    r[0] > r[1] ? (a[0] = a[0] / r[0], a[1] = a[1] / r[0]) : r[0] < r[1] && (a[0] = a[0] / r[1], a[1] = a[1] / r[1])
                                }
                                return [a[0] + "px", a[1] + "px"]
                            }(),
                            title: !1,
                            shade: .9,
                            shadeClose: !0,
                            closeBtn: !1,
                            move: ".layui-layer-phimg img",
                            moveType: 1,
                            scrollbar: !1,
                            moveOut: !0,
                            anim: 5 * Math.random() | 0,
                            skin: "layui-layer-photos" + c("photos"),
                            content: '<div class="layui-layer-phimg"><img src="' + d[u].src + '" alt="' + (d[u].alt || "") + '" layer-pid="' + d[u].pid + '"><div class="layui-layer-imgsee">' + (d.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (a ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (d[u].alt || "") + "</a><em>" + l.imgIndex + "/" + d.length + "</em></span></div></div></div>",
                            success: function (e, i) {
                                l.bigimg = e.find(".layui-layer-phimg"),
                                l.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"),
                                l.event(e),
                                t.tab && t.tab(d[u], e)
                            },
                            end: function () {
                                l.end = !0,
                                i(document).off("keyup", l.keyup)
                            }
                        },
                        t))
                    },
                    function () {
                        r.close(l.loadi),
                        r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                            time: 3e4,
                            btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
                            yes: function () {
                                d.length > 1 && l.imgnext(!0, !0)
                            }
                        })
                    })
                }
            },
            o.run = function (t) {
                i = t,
                n = i(e),
                s.html = i("html"),
                r.open = function (e) {
                    var t = new l(e);
                    return t.index
                }
            },
            e.layui && layui.define ? (r.ready(), layui.define("jquery",
            function (t) {
                r.path = layui.cache.dir,
                o.run(layui.jquery),
                e.layer = r,
                t("layer", r)
            })) : "function" == typeof define ? define(["jquery"],
            function () {
                return o.run(e.jQuery),
                r
            }) : function () {
                o.run(e.jQuery),
                r.ready()
            }()
        }(window);
        module.exports = P8.lay = lay;
    },
    /* 6 common */
    function (module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(1),
            P8 = __webpack_require__(2),
            laytpl = __webpack_require__(3),
            pdpage = __webpack_require__(4),
            f = function () { };
        function a() { return new f(); }
        f.pt = f.prototype,
        f.pt.gettop = function () { var p = window; while (p != p.parent) { p = p.parent; } return p; }
        /* iframe弹出固定大小窗口 */
        f.pt.pop = function (options, callback) {
            var defaults = {
                hidtitle: false,
                title: '弹出窗口',
                url: '',         //pop.aspx?key1=&key2=
                width: '600px',  //弹窗宽度
                height: '400px'  //弹窗高度
            };
            var opts = $.extend(defaults, options);
            var top = f.pt.gettop();
            top.layer.open({
                type: 2,
                title: [opts.title, 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                shade: [0.3, '#393D49'],
                closeBtn: (opts.hidtitle) ? 0 : 1,
                area: [opts.width, opts.height],
                content: opts.url,
                end: function () { callback(); }
            });
        },
        /* iframe弹出全屏窗口 */
        f.pt.pop_full = function (options, callback) {
            var defaults = {
                hidtitle: false,
                title: '弹出窗口',
                url: '',          //pop.aspx?key1=&key2=
            };
            var opts = $.extend(defaults, options);
            var top = f.pt.gettop();
            var popindex = top.layer.open({
                type: 2,
                title: (opts.hidtitle) ? false : [opts.title, 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                shade: [0.3, '#393D49'],
                closeBtn: (opts.hidtitle) ? 0 : 1,
                content: opts.url,
                end: function () { callback(); }
            });
            top.layer.full(popindex); window.onresize = function () { top.layer.full(popindex); }
        },
        /* iframe弹出全屏窗口 含关闭按钮 */
        f.pt.pop_full_close = function (options, callback) {
            var defaults = { url: '' };
            var opts = $.extend(defaults, options);
            var top = f.pt.gettop();
            var popindex = top.layer.open({
                type: 2,
                title: false,
                shade: [0.3, '#393D49'],
                closeBtn: 0,
                area: ['316px', '550px'],
                content: opts.url,
                end: function () { callback(); },
                btn: ['关闭'],
                btnAlign: 'c',
                success: function (layero, index) {
                    $(layero).find(".layui-layer-btn").css("border-top", "1px solid rgb(218, 222, 219)");
                }
            });
            top.layer.full(popindex); window.onresize = function () { top.layer.full(popindex); }
        },
        /* iframe弹出没有标题栏的窗口、多用于选项卡 */
        f.pt.pop_custom = function (options, callback) {
            var defaults = {
                url: '',       //pop.aspx?key1=&key2=
                width: '600px',//弹窗宽度
                height: '400px'//弹窗高度
            };
            var opts = $.extend(defaults, options);
            var top = f.pt.gettop();
            top.layer.open({
                type: 2,
                title: false,
                shade: [0.3, '#393D49'],
                closeBtn: 0,
                content: opts.url,
                area: [opts.width, opts.height],
                end: function () { callback(); }
            });
        },
        f.pt.pop_close = function () {
            try {
                parent.layer.close(parent.layer.getFrameIndex(window.name));
            } catch (e) { }
        },
        /* 加了token验证的get请求 */
        f.pt.get = function (options, callback) {
            var defaults = { url: '', usercode: '', async: true, data: {} };
            var opts = $.extend(defaults, options);
            var top = f.pt.gettop();
            $.ajax({
                type: "GET",
                url: "/ajax/get",
                headers: { "action": opts.url, "usercode": opts.usercode },
                data: opts.data,
                async: opts.async,
                dataType: "json",
                contentType: 'application/json',
                success: function (d, textStatus) {
                    callback(d);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status != 0) {
                        top.layer.msg("请求失败", { icon: 0, time: 2000 });
                    }
                }
            });
        },
        /* 加了token验证的post请求 */
        f.pt.post = function (options, callback) {
            var defaults = { url: '', usercode: '', async: true, data: {} };
            var opts = $.extend(defaults, options);
            var top = f.pt.gettop();
            $.ajax({
                type: "POST",
                url: "/ajax/post",
                headers: { "action": opts.url, "usercode": opts.usercode },
                data: opts.data,
                async: opts.async,
                dataType: "json",
                success: function (d, textStatus) {
                    callback(d);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status != 0) {
                        top.layer.msg("请求失败", { icon: 0, time: 2000 });
                    }
                }
            });
        },
        /* 加了token验证的post请求 */
        f.pt.postJSON = function (options, callback) {
            var defaults = { url: '', usercode: '', async: true, data: {} };
            var opts = $.extend(defaults, options);
            var top = f.pt.gettop();
            $.ajax({
                type: "POST",
                url: "/ajax/postjson",
                headers: { "action": opts.url, "usercode": opts.usercode },
                data: opts.data,
                async: opts.async,
                dataType: "json",
                success: function (d, textStatus) {
                    callback(d);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status != 0) {
                        top.layer.msg("请求失败", { icon: 0, time: 2000 });
                    }
                }
            });
        },
        /* 提交数据前确认,可以url或data传参，ajax采用post方式提交 */
        f.pt.post_confirm = function (options, callback) {
            var defaults = {
                url: '',
                usercode: '',
                data: {},
                msg: '确定要执行该操作吗？'
            };
            var opts = $.extend(defaults, options);
            var top = f.pt.gettop();
            top.layer.confirm(opts.msg, { icon: 3, title: ['温馨提示', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'], closeBtn: 0 }, function (confirm) {
                top.layer.close(confirm);
                f.pt.postJSON({ url: opts.url, usercode: opts.usercode, data: opts.data }, function (d) {
                    if (d.RST == "SUC") { callback(d); } else {
                        top.layer.msg(d.MSG, { icon: d.ICO, time: 2000 }, function () { eval(d.CALLBACK); });
                    }
                });
            }, function (confirm) { top.layer.close(confirm); });
        },
        /* 提交数据前确认,可以url或data传参，ajax采用post方式提交 */
        f.pt.post1_confirm = function (options, callback) {
            var defaults = {
                url: '',
                usercode: '',
                data: {},
                msg: '确定要执行该操作吗？'
            };
            var opts = $.extend(defaults, options);
            var top = f.pt.gettop();
            top.layer.confirm(opts.msg, { icon: 3, title: ['温馨提示', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'], closeBtn: 0 }, function (confirm) {
                top.layer.close(confirm);
                f.pt.post({ url: opts.url, usercode: opts.usercode, data: opts.data }, function (d) {
                    if (d.RST == "SUC") { callback(d); } else {
                        top.layer.msg(d.MSG, { icon: d.ICO, time: 2000 }, function () { eval(d.CALLBACK); });
                    }
                });
            }, function (confirm) { top.layer.close(confirm); });
        },
        /* 获取数据并通过模版绑定 */
        f.pt.getdata = function (options, callback) {
            var defaults = {
                url: '',
                usercode: '',
                data: {},
                tmp_html: $('#template_list').html(), //模版html
                tmp_element: '#list',                 //模版绑定元素
                isappend: false,
                async: true,
                callbackhtml: false
            };
            var opts = $.extend(defaults, options);
            f.pt.post({ url: opts.url, usercode: opts.usercode, async: opts.async, data: opts.data }, function (d) {
                if (d.RST == "ERR") {
                    //top.layer.msg(d.MSG, { time: 2000 });
                    callback(d);
                }
                else {
                    laytpl(opts.tmp_html).render(d, function (html) {

                        if (typeof opts.tmp_element == 'string') {
                            if (opts.isappend) {
                                $(opts.tmp_element).append(html);
                            }
                            else {
                                $(opts.tmp_element).html(html);
                            }
                        } else {
                            if (opts.isappend) {
                                opts.tmp_element.append(html);
                            }
                            else {
                                opts.tmp_element.html(html);
                            }
                        }
                        if (opts.callbackhtml) { d.html = html; }
                        callback(d);
                    });
                }
            });
        },
        /* 图片无效、加载预设图片 */
        f.pt.nopic = function (nopicsrc) { event.srcElement.src = nopicsrc; event.srcElement.onerror = null; },
        /* 点击回车后执行方法 */
        f.pt.keyload = function (callback) { document.onkeydown = function (event) { var e = event || window.event || arguments.callee.caller.arguments[0]; if (e && e.keyCode == 13) { callback(); } }; },
        /* 得到checkbox选中值 */
        f.pt.getchk = function getchk(obj) { return $('#' + obj + ' input[type="checkbox"]:checked').map(function () { return this.value; }).get().join(','); },
        /* 得到checkbox选中对象 */
        f.pt.getchkobj = function getchkobj(obj) { return $('#' + obj + ' input[type="checkbox"]:checked').map(function () { return this.value; }).get(); },
        /* 跳转到登录页面 */
        f.pt.relogin = function relogin() { top.window.location.href = '/login'; },
        f.pt.setmainhtml = function (options, callback) {
            var defaults = {
                data: '',
                datavalue: '',
                keyfield: '',
                Level: 0,
                tmp_element: '#temp_table_main', //模版绑定元素,
                tmp_element_hide: '#temp_table_hide' //模版隐藏元素,
            };
            var opts = $.extend(defaults, options);

            var htmlPage = "";
            var strchosen = "";
            if (opts.data.length != 0) {
                var stepindex = 0;
                var stepcount = 0;
                var stepend = 0;
                $.each(opts.data, function (index, obj) {

                    obj["isEdit"] = opts.isEdit;

                    if (index == 0) {
                        $(opts.tmp_element).attr("name", obj.MA001);
                    }

                    if (obj.MB036 == 0) {
                        var hide_element = f.pt.getctype(obj, opts.datavalue, opts.keyfield, opts.Level, function (s, w) { if (s == "A") { stepindex = 1; } else if (s == "S") { if (strchosen == "") { strchosen = w; } else { strchosen += "," + w; } } });
                        $(opts.tmp_element_hide).html($(opts.tmp_element_hide).html() + hide_element);
                        return true;
                    }

                    if (obj.MB006 == "A" || obj.MB006 == "X" || obj.MB006 == "Z" || obj.udf01 == "1") {
                        if (stepcount == 1) {
                            if (stepend == 1) {
                                stepend = 0;
                                htmlPage += "<td class='odd-xml'></td><td class='even-xml'></td></tr>";
                            }
                            else {
                                htmlPage += "</tr>";
                            }

                        }
                        htmlPage += "<tr>";
                        htmlPage += "<td class='odd-xml'>" + obj.MB002 + "</td>";

                        htmlPage += f.pt.getctype(obj, opts.datavalue, opts.keyfield, opts.Level, function (s, w) { if (s == "A") { } else if (s == "S") { if (strchosen == "") { strchosen = w; } else { strchosen += "," + w; } } });//if (parseInt(stepindex) <= 3) { stepindex = 2; } else { }
                        htmlPage += "</tr>";

                        stepindex = 0;
                        stepcount = 2;
                    }
                    else {
                        if (parseInt(stepindex) % 2 == 0) {
                            stepend = 0;
                            htmlPage += "<tr>";
                        }
                        htmlPage += "<td class='odd-xml'>" + obj.MB002 + "</td>";

                        htmlPage += f.pt.getctype(obj, opts.datavalue, opts.keyfield, opts.Level, function (s, w) { if (s == "A") { } else if (s == "S") { if (strchosen == "") { strchosen = w; } else { strchosen += "," + w; } } });//if (parseInt(stepindex) <= 3) { stepindex = 2; } else { }

                        if ((stepindex + 1) % 2 == 0) {
                            stepcount = 0;
                            //stepend = 2;
                            htmlPage += "</tr>";
                        }
                        else {

                            stepcount = 1;
                        }
                        stepend++;
                        stepindex++;
                    }

                    if ((index + 1) == opts.data.length && stepcount != 2) {

                        if (stepend == 1) {
                            htmlPage += "<td class='odd-xml'></td><td class='even-xml'></td></tr>";
                        }
                        else {
                            htmlPage += "</tr>";
                        }


                        stepindex = 0;
                    }

                    /*
                    if (parseInt(stepindex) % 2 == 0) {
                        htmlPage += "<tr>";
                    }
                    if (obj.MB006 == "A" || obj.MB006 == "X" || obj.MB006 == "Z" || obj.udf01 == "1") {

                        htmlPage += "</tr><tr>";
                    }

                    htmlPage += "<td class='odd-xml'>" + obj.MB002 + "</td>";

                    htmlPage += f.pt.getctype(obj, opts.datavalue, opts.keyfield, opts.Level, function (s, w) { if (s == "A") { stepindex = 1; } else if (s == "S") { if (strchosen == "") { strchosen = w; } else { strchosen += "," + w; } } });//if (parseInt(stepindex) <= 3) { stepindex = 2; } else { }
                    if ((parseInt(stepindex) + 1) % 2 == 0) {
                        htmlPage += "</tr>";
                    }
                    else if ((parseInt(stepcount) + 1) == opts.data.length) {
                        htmlPage += "<td class='odd-xml'></td><td class='even-xml'></td></tr>";
                    }

                    if (obj.MB006 == "A" || obj.MB006 == "X" || obj.MB006 == "Z" || obj.udf01 == "1") {

                        stepindex = parseInt(stepindex) + 2;
                        stepcount = parseInt(stepcount) + 2;
                    } else {
                        stepindex = parseInt(stepindex) + 1;
                        stepcount = parseInt(stepcount) + 1;
                    }
                    */

                });
            }
            $(opts.tmp_element).html(htmlPage);
            callback(strchosen);
        },
        f.pt.getctype = function (obj, datavalue, keyfield, Level, d) {
            var a = obj.MB006, b = obj.MB001, c = obj.MB028, e = obj.MB017, t = "", r = obj.MB003, m = obj.MB022, v = obj.MB032, x = obj.MB031, h = obj.MB039;

            //if (obj.MB036 == 0) return "";
            //if (c == "R") h = "";
            
            if (obj.isEdit == 1) {//编辑状态

                if (h == "R") {
                    c = "R";
                } else {
                    c = "W";
                }
            }

            if (m != "0" && m != "" && m != undefined && m != null) {
                t = f.pt.getdefault(m, keyfield);
            }
            if (v == "1") {
                if (keyfield != "" && keyfield != undefined && keyfield != null) {
                    t = keyfield;
                }
            }
            if (x != "" && x != undefined && x != null) {
                t = x;
            }

            if (datavalue != "") {
                if (datavalue[0][b] != null && datavalue[0][b] != "undefined")
                    t = datavalue[0][b];
            }

            var colspan = "";
            if (obj.MB006 == "A" || obj.MB006 == "X" || obj.MB006 == "Z" || obj.udf01 == "1") {
                colspan = "colspan='3'";
            }
            switch (a) {
                case "T"://单行文本框

                    return "<td  " + colspan + "  class='even-xml'><div class='form-group' style='margin-bottom:0px'><input type='" + f.pt.getdatatype(r) + "' " + (r == "C" ? "step='0.01'" : "") + " class='form-control text-xml' id='" + b + "' name='" + b + "' value='" + t + "'   onblur='LimitsScope(this," + obj.MB044 + ")'   " + (c == "R" ? "disabled='true'" : "") + " /></div></td>";
                    break;
                case "F"://密码框
                    return "<td  " + colspan + "  class='even-xml'><div class='form-group' style='margin-bottom:0px'><input type='password' class='form-control text-xml' id='" + b + "'  name='" + b + "' value='" + t + "'  " + (c == "R" ? "disabled='true'" : "") + " /></div></td>";
                    break;
                case "A"://多行文本框
                    d("A", "");
                    return "<td " + colspan + " class='form-group' style='margin-bottom:0px'><textarea id='" + b + "' name='" + b + "'  rows='3' class='form-control text-xml' " + (c == "R" ? "disabled='true'" : "") + " >" + t + "</textarea></td>";
                    break;
                case "D"://日期
                    //return "<td  " + colspan + "  class='even-xml'><div id='demo-dp-component date-picker' ><div class='input-group date date-picker ' ><input type='text' class='form-control' id='" + b + "' name='" + b + "' value='" + t + "' " + (c == "R" ? "readonly" : "") + " ><span class='input-group-addon'><i class='demo-pli-calendar-4'></i></span></div></div></td>";
                    return "<td  " + colspan + "  class='even-xml'><div id='demo-dp-component date-picker' ><div class='input-group date ' ><input type='text' class='form-control' onClick=\"WdatePicker({el:this,dateFmt:'yyyy-MM-dd',autoPickDate:true})\" id='" + b + "' name='" + b + "' value='" + t + "' " + (c == "R" ? "disabled='true'" : "") + " ><span class='input-group-addon'><i class='demo-pli-calendar-4'></i></span></div></div></td>";
                    break;
                case "M"://长日期
                    //return "<td  " + colspan + "  class='even-xml'><div class='input-group date datetimepicker2 '><input type='text'  placeholder='请选择日期' class='form-control' id='" + b + "' name='" + b + "' value='" + t + "' " + (c == "R" ? "readonly" : "") + " > <span class=\"input-group-addon addon1\"><span class=\"demo-pli-calendar-4\"></span></span></div></td>";
                    return "<td  " + colspan + "  class='even-xml'><div class='input-group '><input type='text'  placeholder='请选择日期' onClick=\"WdatePicker({el:this,dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})\" class='form-control' id='" + b + "' name='" + b + "' value='" + t + "' " + (c == "R" ? "disabled='true'" : "") + " > <span class=\"input-group-addon addon1\"><span class=\"demo-pli-calendar-4\"></span></span></div></td>";
                    break;
                case "S"://下拉框
                    var reValue = "";

                    var multiple = (obj.MB016 == 0 ? "" : "multiple");
                    if (obj.MB014 == "0") {
                        f.pt.get({ url: 'api/sysform/sysselectsource', usercode: Session.UserCode, data: { MB017: e } }, function (k) {

                            $.each(k.datasource, function (index, obj) {
                                var checked = "";
                                if (t == obj[k.value])
                                    checked = "selected";
                                $("#" + b).append("<option value='" + obj[k.value] + "' " + checked + " >" + obj[k.text] + "</option>");
                            });
                            $('#' + b).chosen();
                        });

                        reValue = "<td  " + colspan + "  class='even-xml'><select id='" + b + "' name='" + b + "' " + multiple + " class='demo-chosen-select' ></select></td>";
                    }
                    else {
                        reValue = "<td  " + colspan + "  class='even-xml'><select id='" + b + "' name='" + b + "' " + multiple + "  class='demo-chosen-select' >";
                        if (("MB009" in obj)) {
                            if (obj.MB009 != null && obj.MB009 != "") {
                                var arrlist = obj.MB009.split(',');
                                for (var i = 0; i < arrlist.length; i++) {
                                    var checked = "";
                                    var value = "";
                                    var text = "";

                                    var alist = arrlist[i].split('-');//自定义数据
                                    if (alist.length > 0) {
                                        text = alist[0];
                                        value = alist[1];
                                    }
                                    else {
                                        text = value = arrlist[i];
                                    }

                                    if (t == value)
                                        checked = "selected";
                                    reValue += "<option value='" + value + "' " + checked + " >" + text + "</option>";
                                }
                            }
                        }
                        reValue += "</select></td>";

                        d("S", b);
                    }
                    return reValue;
                    break;
                case "C"://多选框
                    var revalue = "<td  " + colspan + "  class='even-xml'>";
                    if (("MB020" in obj)) {
                        if (obj.MB020 != null && obj.MB020 != "") {
                            var arrlist = obj.MB020.split(',');

                            for (var i = 0; i < arrlist.length; i++) {
                                var showName = "";
                                var showVal = "";
                                if (arrlist[i].lastIndexOf('-') >= 0) {
                                    showName = arrlist[i].split('-')[0];//名称
                                    showVal = arrlist[i].split('-')[1];//值
                                } else {
                                    showName = arrlist[i];
                                    showVal = arrlist[i];//值
                                }

                                var checked = "";
                                if (t != "") {
                                    var arr = t.toString().split(',');
                                    for (var p = 0; p < arr.length; p++) {
                                        showVal = "";
                                        if (arrlist[i].lastIndexOf('-') >= 0) {
                                            showVal = arrlist[i].split('-')[1];//值
                                            if (showVal == arr[p]) {
                                                checked = "checked";
                                            }
                                        } else {
                                            showVal = arrlist[i];
                                            if (arrlist[i] == arr[p]) {
                                                checked = "checked";
                                            }
                                        }
                                    }
                                }
                                revalue += "<input type='checkbox' id='" + b + i + "' name='" + b + "' class='magic-checkbox' value='" + showVal + "' " + checked + " " + (c == "R" ? "readonly" : "") + " /><label for='" + b + i + "'>" + showName + "</label>";
                            }
                        }
                    }
                    return revalue + "</td>";
                    break;
                case "R"://单选框
                    var revalue = "<td  " + colspan + "  class='even-xml'>";

                    if (("MB020" in obj)) {
                        if (obj.MB020 != null && obj.MB020 != "") {
                            var arrlist = obj.MB020.split(',');
                            var showName = "";
                            var showVal = "";
                            for (var i = 0; i < arrlist.length; i++) {

                                if (arrlist[i].lastIndexOf('-') >= 0) {
                                    showName = arrlist[i].split('-')[0];//名称
                                    showVal = arrlist[i].split('-')[1];//值
                                } else {
                                    showName = arrlist[i];
                                    showVal = arrlist[i];//值
                                }

                                var checked = "";
                                //if (t == arrlist[i]) {
                                if (t == showVal) {
                                    checked = "checked";
                                }
                                revalue += "<input type='radio' id='" + b + i + "' name='" + b + "' class='magic-radio' value='" + showVal + "' " + checked + " " + (c == "R" ? "readonly" : "") + " /><label for='" + b + i + "'>" + showName + "</label>";
                            }
                        }
                    }
                    return revalue + "</td>";
                    break;
                case "P"://浏览按钮

                    if (obj.MB014 == "0") {//系统数据源
                        return "<td  " + colspan + "  class='even-xml'><div class='input-group'><input type='text' id='" + b + "' name='" + b + "'  value='" + t + "' " + (c == "R" ? "readonly" : "") + "  class='form-control' placeholder='选择' autocomplete='off'><span class='input-group-btn'><button type='button' class='btn btn-success' onclick='getPublicWindow(\"" + (obj.MB017 == null ? "" : obj.MB017) + "\", \"" + obj.MA001 + "\", \"" + b + "\", \"" + (obj.MB016 == null ? "0" : obj.MB016) + "\"," + Level + ") '><i class='demo-pli-add'></i></button></span></div></td>";

                    } else {//自定义数据源

                        return "<td  " + colspan + "  class='even-xml'><div class='input-group'><input type='text' id='" + b + "' name='" + b + "'  value='" + t + "' " + (c == "R" ? "readonly" : "") + "  class='form-control' placeholder='选择' autocomplete='off'><span class='input-group-btn'><button type='button' class='btn btn-success' onclick='getPublicWindowCur(\"" + (obj.MB041 == null ? "" : obj.MB041) + "\", \"" + obj.MB042 + "\",\"" + obj.MB043 + "\") '><i class='demo-pli-add'></i></button></span></div></td>";
                    }

                    break;
                case "U"://上传
                    return "<td  " + colspan + "  class='even-xml'><input type='hidden' id='file_up' /><button type='button'  class='btn btn-primary' onclick=\"setUpload('file_up','file_num'," + Level + ")\" ><i class='ti-upload'></i> 上传</button>&nbsp;<button type='button' class='btn btn-success' onclick=\"getUpload('file_up','file_num'," + Level + ")\" ><i class='ti-search'></i> 查阅 <font id='file_num' class='file_num'></font></button></td>";
                    break;
                case "X"://缩略图
                    return "<td  " + colspan + "  class='even-xml' tag='slt' sltid='" + b + "'><input type='hidden' id='file_img_" + b + "' value='" + t + "'/></div><table id='tb_cp_" + b + "' class='tc_table_cp' border='0' style='width:100%; margin-right:20px'><tr><td class='form-group'><div id='fileList_" + b + "' name='fileList_" + b + "' ></div><div class='cp_img_jia' id='filePicker_" + b + "'></td></tr></table></td>";
                    break;
                case "Y"://自动编码
                    return "<td  " + colspan + "  class='even-xml'><div class='form-group' style='margin-bottom:0px'><input type='text' disabled='true' tt='" + obj.MB035 + "' zdbm='XX' class='form-control text-xml' id='" + b + "' name='" + b + "' value='" + t + "'  " + (c == "R" ? "readonly" : "") + " /></div></td>";
                    break;
                case "Z"://文本编辑器
                    return "<td  " + colspan + "  class='even-xml' ><div class='form-group' style='margin-bottom:0px'><input type='hidden' name='Uedit' uid='" + b + "' ><script id='" + b + "' name='content' type='text/plain'>" + t + "</script></div></td>";
                    break;

            }
        },
        f.pt.setsubhtml = function (options, callback) {
            var defaults = {
                data: '',
                datavalue: '',
                Level: 0,
                tmp_element: '#temp_table_sub' //模版绑定元素   
            };
            var opts = $.extend(defaults, options);
            var htmlPage = "";
            var strchosen = "";
            if (opts.data.length != 0) {
                var stepindex = 0;
                $.each(opts.data, function (index, obj) {
                    htmlPage += "<div class='formtitle'><span>" + opts.data[index][0].MA002 + "</span></div>";
                    htmlPage += "<div class='demo-custom-toolbar2 table-toolbar-left'><button class='listAdd btn btn-purple' tbname=\"" + index + "\"><i class='demo-pli-plus'></i>增加一行</button></div>";
                    htmlPage += "<table id='" + index + "' class='table-xml table table-bordered border-xml' bindtable='true' name='" + index + "' >";
                    var htmlthead = "<thead><tr>";
                    var htmltheadtd = "";
                    var htmltbody = "<tbody><tr class=\"template\">";
                    var htmltbodytd = "";
                    $.each(obj, function (k, objsub) {

                        if (objsub.MB036 == 0) {

                            //var hide_element = f.pt.getctype(obj, opts.datavalue, opts.keyfield, opts.Level, function (s, w) { if (s == "A") { stepindex = 1; } else if (s == "S") { if (strchosen == "") { strchosen = w; } else { strchosen += "," + w; } } });
                            //$(opts.tmp_element_hide).html($(opts.tmp_element_hide).html() + hide_element);
                            return true;
                        }
                        if (objsub.MB004 == 1) {

                            htmltheadtd += "<th>" + objsub.MB002 + "</th>";
                            htmltbodytd += "<td>" + f.pt.getmtype(objsub, objsub.FORMNO, "", objsub.MB006, objsub.MB001, objsub.MB028, objsub.MB017, objsub.MB014, objsub.MB009, '', objsub.MB003, opts.Level, objsub.MA001, objsub.MB016, objsub.MB022, objsub.MB031, function (l) { if (strchosen == "") { strchosen = l; } else { strchosen += "," + l; } }); + "</td>";
                        }
                    });
                    htmlthead = htmlthead + htmltheadtd + "<th>操作</th></tr></thead>";//<td><button class=\"listAdd\" type=\"button\" tbname=\"" + index + "\">添加一行</button></td>
                    htmltbody = htmltbody + htmltbodytd + "<td><button type='button' class='delrow demo-delete-row btn btn-danger btn-xs' taname=\"" + index + "\"><i class='demo-pli-cross'></i></button></td></tr></tbody>";
                    htmlPage += htmlthead + htmltbody + "</table>";
                });
            }
            $(opts.tmp_element).html(htmlPage);
            callback(strchosen);
        },
        f.pt.setaddsubhtml = function (options, callback) {
            var defaults = {
                data: '',
                datavalue: '',
                Level: 0,
                tmp_element: '#temp_table_sub' //模版绑定元素   
            };
            var opts = $.extend(defaults, options);
            var htmlPage = "";
            var strchosen = "";
            if (opts.data.length != 0) {
                var stepindex = 0;
                $.each(opts.data, function (index, obj) {
                    htmlPage += "<div class='formtitle'><span>" + opts.data[index][0].MA002 + "</span></div>";
                    htmlPage += "<div class='demo-custom-toolbar2 table-toolbar-left'><button class='listAdd btn btn-purple' tbname=\"" + index + "\"><i class='demo-pli-plus'></i>增加一行</button></div>";
                    htmlPage += "<table id='" + index + "' class='table-xml table table-bordered border-xml' bindtable='true' name='" + index + "' >";
                    var htmlthead = "<thead><tr>";
                    var htmltheadtd = "";
                    var htmltbody = "<tbody>";
                    var htmltbodyth = "";
                    if (opts.datavalue != "") {
                        $.each(obj, function (k, objsub) {
                            if (objsub.MB036 == 0) {//排除掉不显示的标题
                                return true;
                            }
                            htmltheadtd += "<th>" + objsub.MB002 + "</th>";
                        });
                        $.each(opts.datavalue, function (u, uvalue) {
                            if (u == index) {
                                if (uvalue.length > 0) {
                                    $.each(uvalue, function (w, wvalue) {
                                        var htmltbodytd = "";
                                        htmltbodyth += "<tr class=\"template\">";
                                        $.each(obj, function (k, objsub) {
                                            if (objsub.MB036 == 0) {//排除掉不显示的列
                                                return true;
                                            }
                                            htmltbodytd += "<td>" + f.pt.getmtype(objsub,objsub.FORMNO, wvalue["ID"], objsub.MB006, objsub.MB001, objsub.MB028, objsub.MB017, objsub.MB014, objsub.MB009, wvalue[objsub.MB001], objsub.MB003, opts.Level, objsub.MA001, objsub.MB016, objsub.MB022, objsub.MB031, function (l) { if (strchosen == "") { strchosen = l; } else { strchosen += "," + l; } }) + "</td>";
                                        });
                                        htmltbodyth = htmltbodyth + htmltbodytd + "<td><button type='button' class='delrow demo-delete-row btn btn-danger btn-xs' taname=\"" + index + "\"><i class='demo-pli-cross'></i></button></td></tr>";
                                    });
                                }
                                else {
                                    var htmltbodytd = "";
                                    htmltbodyth += "<tr class=\"template\">";
                                    $.each(obj, function (k, objsub) {
                                        if (objsub.MB036 == 0) {//排除掉不显示的列
                                            return true;
                                        }
                                        htmltbodytd += "<td>" + f.pt.getmtype(objsub,objsub.FORMNO, "", objsub.MB006, objsub.MB001, objsub.MB028, objsub.MB017, objsub.MB014, objsub.MB009, '', objsub.MB003, opts.Level, objsub.MA001, objsub.MB016, objsub.MB022, objsub.MB031, function (l) { if (strchosen == "") { strchosen = l; } else { strchosen += "," + l; } }) + "</td>";
                                    });
                                    htmltbodyth = htmltbodyth + htmltbodytd + "<td><button type='button' class='delrow demo-delete-row btn btn-danger btn-xs' taname=\"" + index + "\"><i class='demo-pli-cross'></i></button></td></tr>";
                                }
                            }
                        });
                    }
                    htmlthead = htmlthead + htmltheadtd + "<th style='width:4%;'>操作</th></tr></thead>";
                    htmltbody = htmltbody + htmltbodyth + "</tbody>";
                    htmlPage += htmlthead + htmltbody + "</table>";
                });
            }
            $(opts.tmp_element).html(htmlPage);
            callback(strchosen);
        },
        f.pt.seteditsubhtml = function (options, callback) {
            var defaults = {
                data: '',
                datavalue: '',
                Level: 0,
                tmp_element: '#temp_table_sub' //模版绑定元素   
            };
            var opts = $.extend(defaults, options);
            var htmlPage = "";
            var strchosen = "";
            if (opts.data.length != 0) {
                var stepindex = 0;
                $.each(opts.data, function (index, obj) {

                    htmlPage += "<div class='formtitle'><span>" + opts.data[index][0].MA002 + "</span></div>";
                    htmlPage += "<div class='demo-custom-toolbar2 table-toolbar-left'><button class='listAdd btn btn-purple' tbname=\"" + index + "\"><i class='demo-pli-plus'></i>增加一行</button></div>";
                    htmlPage += "<table id='" + index + "' class='table-xml table table-bordered border-xml' bindtable='true' name='" + index + "' >";
                    var htmlthead = "<thead><tr>";
                    var htmltheadtd = "";
                    var htmltbody = "<tbody>";
                    var htmltbodyth = "";

                    if (opts.datavalue != "") {
                        $.each(obj, function (k, objsub) {
                            if (objsub.MB036 == 0) {//排除掉不显示的标题
                                return true;
                            }
                            htmltheadtd += "<th>" + objsub.MB002 + "</th>";
                        });

                        $.each(opts.datavalue, function (u, uvalue) {
                            if (u == index) {
                                if (uvalue.length > 0) {
                                    $.each(uvalue, function (w, wvalue) {
                                        var htmltbodytd = "";
                                        htmltbodyth += "<tr class=\"template\">";
                                        htmltbodytd += "<td><input type='text' class='form-control text-xml'  name='ID' value='" + (wvalue["ID"] == undefined ? "" : wvalue["ID"]) + "' readonly /></td>";
                                        $.each(obj, function (k, objsub) {
                                            if (objsub.MB036 == 0) {//排除掉不显示的列
                                                return true;
                                            }
                                            htmltbodytd += "<td>" + f.pt.getmtype(objsub, objsub.FORMNO, wvalue["ID"], objsub.MB006, objsub.MB001, objsub.MB028, objsub.MB017, objsub.MB014, objsub.MB009, wvalue[objsub.MB001], objsub.MB003, opts.Level, objsub.MA001, objsub.MB016, objsub.MB022, objsub.MB031, function (l) { if (strchosen == "") { strchosen = l; } else { strchosen += "," + l; } }) + "</td>";
                                        });
                                        htmltbodyth = htmltbodyth + htmltbodytd + "<td><button type='button' class='delrow demo-delete-row btn btn-danger btn-xs' taname=\"" + index + "\"><i class='demo-pli-cross'></i></button></td></tr>";
                                    });
                                }
                                else {
                                    var htmltbodytd = "";
                                    htmltbodyth += "<tr class=\"template\">";
                                    htmltbodytd += "<td><input type='text' class='form-control text-xml'  name='ID' value='' readonly /></td>";
                                    $.each(obj, function (k, objsub) {
                                        if (objsub.MB036 == 0) {//排除掉不显示的列
                                            return true;
                                        }
                                        htmltbodytd += "<td>" + f.pt.getmtype(objsub, objsub.FORMNO, "", objsub.MB006, objsub.MB001, objsub.MB028, objsub.MB017, objsub.MB014, objsub.MB009, '', objsub.MB003, opts.Level, objsub.MA001, objsub.MB016, objsub.MB022, objsub.MB031, function (l) { if (strchosen == "") { strchosen = l; } else { strchosen += "," + l; } }) + "</td>";
                                    });
                                    htmltbodyth = htmltbodyth + htmltbodytd + "<td><button type='button' class='delrow demo-delete-row btn btn-danger btn-xs' taname=\"" + index + "\"><i class='demo-pli-cross'></i></button></td></tr>";
                                }
                            }
                        });
                    }
                    htmlthead = htmlthead + "<th style='width:4%;'>ID</th>" + htmltheadtd + "<th style='width:4%;'>操作</th></tr></thead>";//<td><button class=\"listAdd\" type=\"button\" tbname=\"" + index + "\">添加一行</button></td>
                    htmltbody = htmltbody + htmltbodyth + "</tbody>";
                    htmlPage += htmlthead + htmltbody + "</table>";
                });
            }
            $(opts.tmp_element).html(htmlPage);
            callback(strchosen);
        },
        f.pt.getmtype = function (objsub, FORMNO, ID, a, b, c, e, n, h, y, r, Level, z, s, m, x, k) {
            if (y != "" && y != undefined && y != null) {
            }
            else {

                if (m != "" && m != undefined && m != null) {

                    y = f.pt.getdefault(m);
                }
                if (x != "" && x != undefined && x != null) {
                    y = x;
                }
            }

            switch (a) {
                case "T"://单行文本框

                    return "<input type='" + f.pt.getdatatype(r) + "' class='form-control text-xml'  " + (y == "" || y == undefined ? "def='0'" : "") + "  name='" + b + "' value='" + y + "'  " + (c == "R" ? "readonly" : "") + " />";
                    break;
                case "F"://密码框

                    return "<input type='password' class='form-control text-xml'  name='" + b + "'  value='" + y + "'  " + (c == "R" ? "readonly" : "") + " />";
                    break;

                case "A"://多行文本框
                    return "<textarea  name='" + b + "' rows='2' class='form-control text-xml'  " + (c == "R" ? "readonly" : "") + " >" + y + "</textarea>";
                    break;
                case "D"://日期
                    //return "<div><div class='input-group date'><input type='text' class='form-control date-picker'  name='" + b + "' value='" + y + "' " + (c == "R" ? "readonly" : "") + " ><span class='input-group-addon'><i class='demo-pli-calendar-4'></i></span></div></div>";
                    return "<div><div class='input-group date'><input type='text' class='form-control' onClick=\"WdatePicker({el:this,dateFmt:'yyyy-MM-dd',autoPickDate:true})\" name='" + b + "' value='" + y + "' " + (c == "R" ? "readonly" : "") + " ></div></div>";
                    break;
                case "M"://长日期
                    //return "<div class='input-group date datetimepicker3 '><input type='text'  placeholder='请选择日期' class='form-control' name='" + b + "' value='" + y + "' " + (c == "R" ? "readonly" : "") + " > <span class=\"input-group-addon addon3\"><span class=\"demo-pli-calendar-4\"></span></span></div>";
                    return "<div class='input-group date'><input type='text'  placeholder='请选择日期' class='form-control' onClick=\"WdatePicker({el:this,dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})\" name='" + b + "' value='" + y + "' " + (c == "R" ? "readonly" : "") + " > <span class=\"input-group-addon addon3\"><span class=\"demo-pli-calendar-4\"></span></span></div>";
                    break;
                case "S"://下拉框
                    var reValue = "";
                    if (n == "0") {
                        f.pt.get({ url: 'api/sysform/sysselectsource', usercode: Session.UserCode, data: { MB017: e } }, function (k) {

                            $.each(k.datasource, function (index, obj) {
                                var checked = "";
                                if (y == obj[k.value])
                                    checked = "selected";
                                //$("#" + b).append("<option value='" + obj[k.value] + "'>" + obj[k.text] + "</option>");
                                $("select[name='" + b + "']").append("<option value='" + obj[k.value] + "' " + checked + ">" + obj[k.text] + "</option>");
                            });
                        });

                        reValue = "<select name='" + b + "' class='sel-xml dandu-xml'  ></select>";
                    }
                    else {
                        reValue = "<select name='" + b + "'  class='sel-xml dandu-xml'  >";
                        if (h != null && h != "") {
                            var arrlist = h.split(',');
                            for (var i = 0; i < arrlist.length; i++) {
                                var checked = "";
                                var value = "";
                                var text = "";

                                var alist = arrlist[i].split('-');
                                if (alist.length > 0) {
                                    text = alist[0];
                                    value = alist[1];
                                }
                                else {
                                    text = value = arrlist[i];
                                }

                                if (y == value)
                                    checked = "selected";
                                reValue += "<option value='" + value + "' " + checked + ">" + text + "</option>";
                            }
                        }
                        reValue += "</select>";

                        //k(b);
                    }
                    return reValue;
                    break;
                case "P"://浏览按钮
                    //return "<div class='input-group'><input type='text' name='" + b + "' " + (c == "R" ? "readonly" : "") + "  value='" + y + "' class='form-control' placeholder='选择' autocomplete='off'><span class='input-group-btn'><button type='button' class='btn btn-success' onclick='getSubPublicWindow(\"" + (e == null ? "" : e) + "\", \"" + z + "\", \"" + b + "\", \"" + (s == null ? "0" : s) + "\"," + Level + ",this) '  ><i class='demo-pli-add'></i></button></span></div>";
                    if (objsub.MB014 == "0") {//系统数据源
                        return "<div class='input-group'><input type='text' name='" + b + "' " + (c == "R" ? "readonly" : "") + "  value='" + y + "' class='form-control' placeholder='选择' autocomplete='off'><span class='input-group-btn'><button type='button' class='btn btn-success' onclick='getSubPublicWindow(\"" + (e == null ? "" : e) + "\", \"" + z + "\", \"" + b + "\", \"" + (s == null ? "0" : s) + "\"," + Level + ",this) '  ><i class='demo-pli-add'></i></button></span></div>";

                    } else {//自定义数据源

                        //return "<td  " + colspan + "  class='even-xml'><div class='input-group'><input type='text' id='" + b + "' name='" + b + "'  value='" + t + "' " + (c == "R" ? "readonly" : "") + "  class='form-control' placeholder='选择' autocomplete='off'><span class='input-group-btn'><button type='button' class='btn btn-success' onclick='getPublicWindowCur(\"" + (obj.MB041 == null ? "" : obj.MB041) + "\", \"" + obj.MB042 + "\",\"" + obj.MB043 + "\") '><i class='demo-pli-add'></i></button></span></div></td>";
                        return "<div class='input-group'><input type='text' name='" + b + "' " + (c == "R" ? "readonly" : "") + "  value='" + y + "' class='form-control' placeholder='选择' autocomplete='off'><span class='input-group-btn'><button type='button' class='btn btn-success' onclick='getSubPublicWindowCur(\"" + (objsub.MB041 == null ? "" : objsub.MB041) + "\", \"" + objsub.MB042 + "\",\"" + objsub.MB043 + "\",this) '  ><i class='demo-pli-add'></i></button></span></div>";

                    }

                    break;
                case "U"://上传
                    var file_up = "";
                    var file_num = "";

                    if (ID != "") {
                        $.P8.common().get({ url: 'api/upload/getlist', usercode: Session.UserCode, data: { MV003: FORMNO, MV004: ID, MV005: 1, MV008: z }, async: false }, function (dd) {
                            dd = dd.DATA;
                            if (!jQuery.isEmptyObject(dd)) {
                                var num = 0;
                                var strfile = "";

                                $.each(dd, function (index, obj) {

                                    if (strfile == "") {
                                        strfile = obj.MV001 + ":" + obj.MV002;
                                    }
                                    else {
                                        strfile += "|" + obj.MV001 + ":" + obj.MV002;
                                    }
                                    num++;
                                });

                                file_up = strfile;
                                file_num = "[" + num + "]";
                            }
                        });
                    }
                    return "<input type='hidden' name='file_up' value='" + file_up + "' /><button type='button'  class='btn btn-primary' onclick=\"setSubUpload('file_up','file_num'," + Level + ",this)\" ><i class='ti-upload'></i> 上传</button>&nbsp;<button type='button' class='btn btn-success' onclick=\"getSubUpload('file_up','file_num'," + Level + ",this)\" ><i class='ti-search'></i> 查阅 <font name='file_num' class='file_num'>" + file_num + "</font></button>";
                    break;
                default:
                    return "";
                    break;

            }
        },
        f.pt.setsearchhtml = function (options, callback) {
            var defaults = {
                data: '',
                datavalue: '',
                tmp_element: '#temp_search' //模版绑定元素
            };
            var opts = $.extend(defaults, options);
            var htmlPage = "";
            var strchosen = "";
            if (opts.data.length != 0) {
                var stepcount = 0;
                $.each(opts.data, function (index, obj) {
                    htmlPage += "<div class='tdz-xml'><span>" + obj.MO007 + "</span></div>";
                    htmlPage += "<div class='tdk-xml'>";
                    htmlPage += "<div class='form-group'>";
                    htmlPage += f.pt.getstype(obj.MB006, obj.MB001, obj.MB028, obj.MB017, obj.MB014, obj.MB009, '', obj.MB003, obj.MO003, obj.MA001, obj.MB016, function (l) { if (strchosen == "") { strchosen = l; } else { strchosen += "," + l; } });;
                    htmlPage += "</div>";
                    htmlPage += "</div>";
                });
            }
            $(opts.tmp_element).html(htmlPage);
            callback(strchosen);
        },
        f.pt.getstype = function (a, b, c, e, n, h, y, r, p, z, s, k) {
            b = z + '.' + b;

            switch (a) {
                case "T"://单行文本框
                    return "<input type='" + f.pt.getdatatype(r) + "' id='" + b + "' class='form-control text-xml'  name='" + b + "' data-p='" + p + "' value='" + y + "'  />";
                    break;
                case "T"://密码框
                    return "<input type='password' id='" + b + "' class='form-control text-xml'  name='" + b + "' data-p='" + p + "' value='" + y + "'  />";
                    break;
                case "A"://多行文本框
                    return "<textarea  name='" + b + "' rows='3' class='form-control text-xml' id='" + b + "'  data-p='" + p + "'  >" + y + "</textarea>";
                    break;
                case "D"://短日期
                    //return "<div id='demo-dp-component date-picker' style='width:100%;'><div class='input-group date date-picker'  style='width:89%;'><input type='text' class='form-control text-xml' id='" + b + "'  name='" + b + "' value='" + y + "'  data-p='" + p + "' ><span class='input-group-addon' style='display:inline-block;padding:3px 4px;padding-bottom:6px'><i class='demo-pli-calendar-4'></i></span></div></div>";
                    return "<div style='width:100%;'><div class='input-group date' style='width:89%;'><input type='text' class='form-control text-xml' onClick=\"WdatePicker({el:this,dateFmt:'yyyy-MM-dd',autoPickDate:true})\" id='" + b + "'  name='" + b + "' value='" + y + "'  data-p='" + p + "' ><span class='input-group-addon' style='display:inline-block;padding:3px 4px;padding-bottom:6px'><i class='demo-pli-calendar-4'></i></span></div></div>";
                    break;
                case "M"://长日期
                    return "<div style='width:100%;'><div class='input-group date' style='width:89%;'><input type='text' class='form-control text-xml' onClick=\"WdatePicker({el:this,dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})\" id='" + b + "'  name='" + b + "' value='" + y + "'  data-p='" + p + "' ><span class='input-group-addon' style='display:inline-block;padding:3px 4px;padding-bottom:6px'><i class='demo-pli-calendar-4'></i></span></div></div>";
                    break;
                case "S"://下拉框
                    var reValue = "";
                   
                    if (n == "0") {


                        //f.pt.get({ url: 'api/sysform/sysselectsource', usercode: Session.UserCode,async:false, data: { MB017: e } }, function (k) {

                        //    $.each(k.datasource, function (index, obj) {
                        //        debugger
                        //        if (index == 0) {
                        //            $("#" + b).append("<option value='' >--请选择--</option>");
                        //        }
                        //        $("#" + b).append("<option value='" + obj[k.value] + "' >" + obj[k.text] + "</option>");
                        //        //$("select[name='" + b + "']").append("<option value='" + obj[k.value] + "' " + checked + ">" + obj[k.text] + "</option>");
                        //    });

                        //    $('#' + b).chosen();
                        //});

                        //reValue = "<select id='" + b + "' name='" + b + "' class='demo-chosen-select'  data-p='" + p + "'  ></select>";


                        //-----------2018-7-9 ZHM修改

                        f.pt.get({ url: 'api/sysform/sysselectsource', usercode: Session.UserCode, async: false, data: { MB017: e } }, function (k) {
                            reValue = "<select id='" + b + "' name='" + b + "' class='demo-chosen-select'  data-p='" + p + "'  >";
                            reValue += "<option value='' >--请选择--</option>";
                            $.each(k.datasource, function (index, obj) {
                               
                                if (index == 0) {
                                    return true;
                                }
                                reValue += "<option value='" + obj[k.value] + "' >" + obj[k.text] + "</option>";
                              
                            });
                            reValue += "</select>";
                            //$('#' + b).chosen();
                        });

                       






                    }
                    else {
                        reValue = "<select id='" + b + "' name='" + b + "' class='demo-chosen-select'  data-p='" + p + "'  >";
                        if (h != null && h != "") {
                            var arrlist = h.split(',');
                            for (var i = 0; i < arrlist.length; i++) {
                                var value = "";
                                var text = "";

                                var alist = arrlist[i].split('-');
                                if (alist.length > 0) {
                                    text = alist[0];
                                    value = alist[1];
                                }
                                else {
                                    text = value = arrlist[i];
                                }

                                if (i == 0) {
                                    reValue += "<option value='' >--请选择--</option>";
                                }
                                reValue += "<option value='" + value + "' >" + text + "</option>";
                            }
                        }
                        reValue += "</select>";

                        k(b);
                    }
                    
                    return reValue;
                    break;
                case "P"://浏览按钮
                    return "<div class='input-group'><input type='text' id='" + b + "' name='" + b + "' data-p='" + p + "' value='" + y + "' class='form-control' placeholder='选择' autocomplete='off'><span class='input-group-btn kaichuangSpan'><button type='button' class='btn btn-success' onclick='getPublicWindow(\"" + (e == null ? "" : e) + "\", \"" + z + "\", \"" + b + "\", \"" + (s == null ? "0" : s) + "\",0) ' ><i class='demo-pli-add'></i></button></span></div>";
                    //return "<input type='" + f.pt.getdatatype(r) + "' id='" + b + "' class='form-control text-xml'  name='" + b + "' data-p='" + p + "' value='" + y + "'  />";
                    break;
                default:
                    return "";
                    break;

            }
        },
        f.pt.getdatatype = function (a) {

            switch (a) {
                case "I":
                    return "number";
                    break
                case "C":
                    return "number";
                    break;
                default:
                    return "text";
                    break;
            }
        },
        f.pt.getdefault = function (a) {
            switch (a) {
                case "1":
                    return Session.UserCode;
                    break;
                case "2":
                    return Session.DeptGuid;
                    break;
                case "3":
                    return f.pt.getNowFormatDate("H");
                    break;
                case "4":
                    return f.pt.getNowFormatDate("Y");
                    break;
                case "7":
                    return Session.DisplayName;
                    break;
                case "8":
                    return Session.DeptName;
                    break;
                case "9":
                    return Session.Para0;
                    break;
                case "10":
                    return Session.Levels;
                    break;
                default:
                    return "";
                    break;
            }

        },
        f.pt.getNowFormatDate = function (a) {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

            if (a == "Y") {
                currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            }
            else if (a == "H") {
                currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes();
            }
            return currentdate;
        },
        //禁用回车键
        f.pt.DisableEnter = function () {
            document.onkeydown = function () {
                if (window.event && window.event.keyCode == 13) {
                    window.event.returnValue = false;
                }
            }
        },
        module.exports = P8.common = a;
    }
])
});