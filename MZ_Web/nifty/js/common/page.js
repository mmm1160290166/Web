; !
function () {
    "use strict";
    var doc = document, id = 'getElementById', tag = 'getElementsByTagName';
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
        if (conf.pages <= 1) { return ''; }
        if (conf.groups > conf.pages) { conf.groups = conf.pages; }
        //计算当前组
        dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0)) / (conf.groups === 0 ? 1 : conf.groups));
        //输出每页记录数
        view.push('<span class="page-total">&#x6BCF;&#x9875; ');
        view.push('<select class="page-sel" id="pagesize">');
        view.push('<option value="10" ' + ((conf.pagesize == 10) ? 'selected="selected"' : '') + '>10</option>');
        view.push('<option value="20" ' + ((conf.pagesize == 20) ? 'selected="selected"' : '') + '>20</option>');
        view.push('<option value="30" ' + ((conf.pagesize == 30) ? 'selected="selected"' : '') + '>30</option>');
        view.push('<option value="40" ' + ((conf.pagesize == 40) ? 'selected="selected"' : '') + '>40</option>');
        view.push('<option value="50" ' + ((conf.pagesize == 50) ? 'selected="selected"' : '') + '>50</option>');
        view.push('<option value="100" ' + ((conf.pagesize == 100) ? 'selected="selected"' : '') + '>100</option>');
        view.push('<option value="500" ' + ((conf.pagesize == 500) ? 'selected="selected"' : '') + '>500</option>');
        view.push('</select> &#x6761;');
        view.push('</span>');
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
            //共 50 页 42222 条
            //+ '<span class="page-total">&#x5171; ' + conf.pages + ' &#x9875; 42222 &#x6761;</span>'
            //当前第 1 页 共 50 页
            //+ '<span class="page-total">&#x5F53;&#x524D;&#x7B2C; ' + conf.curr + ' &#x9875; &#x5171; ' + conf.pages + ' &#x9875;</span>'
            //第 1 页 / 共 50 页
            + '<span class="page-total">&#x7B2C; ' + conf.curr + ' &#x9875; / &#x5171; ' + conf.pages + ' &#x9875;</span>'
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
    "function" == typeof define ? define(function () { return a }) : "undefined" != typeof exports ? module.exports = a : window.page = a
}();