; (function ($, w) {
    "use strict";


    //Options
    var _em_options = {
        /** array-option **/
        ArrayToString: function (Array, JoinChar, callback) {
            try {
                if (typeof (Array) != 'object' && typeof (Array) != 'Array') {
                    var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "ArrayToString", "ICO": "2", "MSG": "转换对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                    return Array;
                }
                return Array.join(JoinChar);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "ArrayToString", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return [];
            }
        },//数组转换字符串
        /** bootstrap-option **/
        ShowColumnsFresh_BootStrap: function (ColJson, callback) {
            try {
                _em_options.CreateHiddenInput([
                    "ShowColumn_BootStrap"
                ]);
                var ColJson = ColJson, F = [];
                for (var i = 0; i < ColJson.length; i++) {
                    for (var j = 0; j < ColJson[i].length; j++) {
                        var Field = ColJson[i][j].field || "";
                        if (ColJson[i][j].visible)
                            if (Field != "")
                                F.push(Field);
                    }
                }
                $("#ShowColumn_BootStrap").val(this.ArrayToString(F, ','));
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "ShowColumnsFresh_BootStrap", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return [];
            }
        },//获取数据源显示列
        /** browser-option **/
        browsers: {
            weixin: /micromessenger(\/[\d\.]+)*/   //微信内置浏览器
            , mqq: /mqqbrowser(\/[\d\.]+)*/       //手机QQ浏览器
            , uc: /ucbrowser(\/[\d\.]+)*/            //UC浏览器
            , chrome: /(?:chrome|crios)(\/[\d\.]+)*/  //chrome浏览器
            , firefox: /firefox(\/[\d\.]+)*/          //火狐浏览器
            , opera: /opera(\/|\s)([\d\.]+)*/     //欧朋浏览器
            , sougou: /sogoumobilebrowser(\/[\d\.]+)*/   //搜狗手机浏览器
            , baidu: /baidubrowser(\/[\d\.]+)*/          //百度手机浏览器
            , 360: /360browser([\d\.]*)/                         //360浏览器
            , safari: /safari(\/[\d\.]+)*/        //苹果浏览器
            , ie: /msie\s([\d\.]+)*/    // ie 浏览器
        },//浏览器内核类别
        /** json-option **/
        JsonEval: "",//Json计算表达式
        JsonMsg: "",//Json方法提示信息
        JsonStatus: "",//Json状态
        JsonKeyArr: [],//JSON键数组
        JsonValueArr: [],//JSON值数组
        /** open-option **/
        Sub_i: 1,//单身索引
        /** cookie-option **/
        get: function (Name, callback) {
            try {
                var reg = new RegExp("(^| )" + Name + "(?:=([^;]*))?(;|$)")
                    , val = document.cookie.match(reg)
                ;
                return val ? (val[2] ? unescape(val[2]) : "") : '';
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "get", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//读取 cookie
        /** check-option **/
        CheckNumber: function (Value, callback) {
            try {
                return typeof Value === 'number' && isFinite(Value);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CheckNumber", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//检测整数类型
        CheckString: function (Value, callback) {
            try {
                return typeof Value === 'string';
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CheckString", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//检测字符串类型
        CheckObj: function (Value, callback) {
            try {
                if (Value === null || typeof Value === 'undefined') {
                    return false;
                }
                return typeof Value === 'object';
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CheckObj", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//检测obj
        CheckUndefined: function (Value, callback) {
            try {
                return typeof Value === 'undefined';
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CheckUndefined", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//检测Undefined
        CheckBoolean: function (Value, callback) {
            try {
                return typeof Value === 'boolean';
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CheckBoolean", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//检测布尔类型
        CheckArray: function (arr, callback) {
            try {
                if (arr === null || typeof arr === 'undefined') {
                    return false;
                }
                return arr.constructor === Array && arr.length > 0;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CheckArray", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//检测是否数组
        CheckArrayLength: function (Array, Array1, callback) {
            try {
                if (Array.length != Array1.length) {
                    return false;
                }
                else {
                    return true;
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CheckArrayLength", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//检测数组数目是否匹配
        CheckJson: function (Json, callback) {
            try {
                if (typeof (Json) == "object" && Json.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CheckJson", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json检测
        CheckJsonIsNull: function (Json, callback) {
            try {
                if (typeof (Json) == "object" && Json.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CheckJson", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json检测
        /** date-option **/
        parse: function (date, callback) {
            try {
                return Date.parse(date); //.replace(/-/g, '/')
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "parse", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//把 字符转化为 毫秒
        /** float-option **/
        Fixed_2: function (Float, callback) {
            try {
                return parseFloat(Float).toFixed(2);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Fixed_2", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//字符串回弹两位数字小数位数
        /** extendchildren-option **/
        calcTotalAdd: function (tableobj, ActionCol, StartRowCol, Colspan, callback) {
            try {
                var Colspan = Colspan || 0, StartRowCol = StartRowCol || 1;
                if (!_em_options.CheckArray(ActionCol) && ActionCol != '*') {
                    var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "calcTotalAdd", "ICO": "2", "MSG": "合计列对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else if (ActionCol == '*') {
                    var table = tableobj[0];
                    for (var j = 0; j < table.rows[0].cells.length; j++) {
                        var total = 0;
                        for (var i = StartRowCol; i < table.rows.length - 1; i++) {
                            var td = table.rows[i].cells[j];
                            if (td.getAttribute("data-none") != '1') {
                                var t = 0;
                                if ($(td).find("input").length != 0) {
                                    t = parseFloat($(td).find("input").val());
                                }
                                else {
                                    t = parseFloat(td.innerHTML);
                                }
                            }

                        }
                        table.rows[table.rows.length - 1].getElementsByTagName('td')[j].innerHTML = _em_options.Fixed_2(total);
                    }
                }
                else {
                    var table = tableobj[0];
                    var indexArray = ActionCol;
                    for (var q = 0; q < indexArray.length; q++) {
                        var total = 0;
                        for (var i = StartRowCol; i < table.rows.length - 1; i++) {
                            var td = table.rows[i].cells[indexArray[q]];
                            if (td.getAttribute("data-none") != '1') {
                                var t = 0;
                                if ($(td).find("input").length != 0) {
                                    t = parseFloat($(td).find("input").val());
                                }
                                else {
                                    t = parseFloat(td.innerHTML);
                                }

                                if (t) total += t;
                            }

                        }
                        table.rows[table.rows.length - 1].getElementsByTagName('td')[indexArray[q] - Colspan].innerHTML = _em_options.Fixed_2(total);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "calcTotalAdd", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//表体Y轴累加合计
        calcTotalAvg: function (tableobj, ActionCol, StartRowCol, ColSpan, callback) {
            try {
                var Colspan = Colspan || 0, StartRowCol = StartRowCol || 1;
                if (!_em_options.CheckArray(ActionCol) && ActionCol != '*') {
                    var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "calcTotalAvg", "ICO": "2", "MSG": "合计列对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else if (ActionCol == '*') {
                    var table = tableobj[0];
                    for (var j = 0; j < table.rows[0].cells.length; j++) {
                        var avgnum = 0;
                        var total = 0;
                        for (var i = StartRowCol; i < table.rows.length - 1; i++) {
                            var td = table.rows[i].getElementsByTagName('td')[j];
                            if (td.getAttribute("data-none") != '1') {
                                var t = 0;
                                if ($(td).find("input").length != 0) {
                                    t = parseFloat($(td).find("input").val());
                                }
                                else {
                                    t = parseFloat(td.innerHTML);
                                }
                                total = parseFloat(total) + t;
                                avgnum += 1;
                            }
                        }
                        if (total.toString().indexOf(".") != -1) {
                            total = total / avgnum;
                            table.rows[table.rows.length - 1].getElementsByTagName('td')[j].innerHTML = total.toString().substring(0, total.toString().indexOf(".") + 3);
                        }
                        else {
                            total = total / avgnum;
                            table.rows[table.rows.length - 1].getElementsByTagName('td')[j].innerHTML = total;
                        }
                    }
                }
                else {
                    var table = tableobj[0];
                    var indexArray = ActionCol;
                    for (var q = 0; q < indexArray.length; q++) {
                        var avgnum = 0;
                        var total = 0;
                        for (var i = StartRowCol; i < table.rows.length - 1; i++) {
                            var td = table.rows[i].getElementsByTagName('td')[indexArray[q]];
                            if (td.getAttribute("data-none") != '1') {
                                var t = 0;
                                if ($(td).find("input").length != 0) {
                                    t = parseFloat($(td).find("input").val());
                                }
                                else {
                                    t = parseFloat(td.innerHTML);
                                }
                                total = parseFloat(total) + t;
                                avgnum += 1;
                            }
                        }
                        if (total.toString().indexOf(".") != -1) {
                            total = total / avgnum;
                            table.rows[table.rows.length - 1].getElementsByTagName('td')[indexArray[q] - Colspan].innerHTML = total.toString().substring(0, total.toString().indexOf(".") + 3);
                        }
                        else {
                            total = total / avgnum;
                            table.rows[table.rows.length - 1].getElementsByTagName('td')[indexArray[q] - Colspan].innerHTML = total;
                        }
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "calcTotalAvg", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//表体Y轴平均合计
        ChangeMoney_Clidren: function (String, callback) {
            try {
                String = this.trim(String.replace(/,/g, ''));
                if (String == '0') {
                    return '0.00';
                }
                else if (String.indexOf("-") != -1) {
                    String = String.substring(String.indexOf("-") + 1, String.length);
                    if (/[^0-9\.]/.test(String)) return "invalid value";
                    String = String.replace(/^(\d*)$/, "$1.");
                    String = (String + "00").replace(/(\d*\.\d\d)\d*/, "$1");
                    String = String.replace(".", ",");
                    var re = /(\d)(\d{3},)/;
                    while (re.test(String))
                        String = String.replace(re, "$1,$2");
                    String = String.replace(/,(\d\d)$/, ".$1");
                    return '-' + String.replace(/^\./, "0.")
                }
                else {
                    if (/[^0-9\.]/.test(String)) return "invalid value";
                    String = String.replace(/^(\d*)$/, "$1.");
                    String = (String + "00").replace(/(\d*\.\d\d)\d*/, "$1");
                    String = String.replace(".", ",");
                    var re = /(\d)(\d{3},)/;
                    while (re.test(String))
                        String = String.replace(re, "$1,$2");
                    String = String.replace(/,(\d\d)$/, ".$1");
                    return String.replace(/^\./, "0.")
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "ChangeMoney_Clidren", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//金额变换千分符
        ChangeMoney: function (tableobj, ActionCol, StartRowCol, callback) {
            try {
                var StartRowCol = StartRowCol || 1;
                if (!_em_options.CheckArray(ActionCol) && ActionCol != '*') {
                    var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "ChangeMoney", "ICO": "2", "MSG": "变换列对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else if (ActionCol == '*') {
                    var table = tableobj[0];
                    for (var i = StartRowCol; i < table.rows.length; i++) {
                        for (var j = 0; j < table.rows[i].cells.length; j++) {
                            table.rows[i].cells[j].innerText = this.ChangeMoney_Clidren(table.rows[i].cells[j].innerText);
                        }
                    }
                }
                else {
                    var table = tableobj[0];
                    var indexArray = ActionCol;
                    for (var q = 0; q < indexArray.length; q++) {
                        for (var i = StartRowCol; i < table.rows.length; i++) {
                            table.rows[i].cells[indexArray[q]].innerText = this.ChangeMoney_Clidren(table.rows[i].cells[indexArray[q]].innerText);
                        }
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "ChangeMoney", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//变换千分符
        ChangeZero: function (tableobj, StartRowCol, callback) {
            try {
                var StartRowCol = StartRowCol || 1, table = tableobj[0];
                for (var i = StartRowCol; i < table.rows.length; i++) {
                    for (var j = 0; j < table.rows[i].cells.length; j++) {
                        if (_em_options.trim(table.rows[i].cells[j].innerText) == '0.00' || _em_options.trim(table.rows[i].cells[j].innerText) == '0') {
                            table.rows[i].cells[j].innerText = '';
                        }
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "ChangeZero", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//变换0
        /** json-option **/
        Json_Resolve_Single: function (Json, callback) {
            try {
                if (!_em_options.CheckJson(Json)) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象类型不符";
                }
                else if (Json.length > 1) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象长度大于1";
                }
                else {
                    _em_options.VarJsonRemove();
                    for (var i in Json) {
                        var Key = [];
                        var Value = [];
                        for (var j in Json[i]) {
                            Key.push(j);
                            Value.push(Json[i][j]);
                        }
                    }
                    _em_options.JsonKeyArr.push(Key);
                    _em_options.JsonValueArr.push(Value);
                    _em_options.JsonStatus = "1";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Json_Resolve_Single", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json解析所有键值对
        Json_Resolve_Multiple: function (Json, callback) {
            try {
                if (!_em_options.CheckJson(Json)) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象类型不符";
                }
                else if (Json.length == 1) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象长度不大于1";
                }
                else {
                    _em_options.VarJsonRemove();
                    for (var i in Json) {
                        var Key = [];
                        var Value = [];
                        for (var j in Json[i]) {
                            Key.push(j);
                            Value.push(Json[i][j]);
                        }
                        _em_options.JsonKeyArr.push(Key);
                        _em_options.JsonValueArr.push(Value);
                    }
                    _em_options.JsonStatus = "1";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Json_Resolve_Multiple", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json解析所有键值对
        Json_Eval_Col_Single: function (Json, callback) {
            try {
                if (!_em_options.CheckJson(Json)) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象类型不符";
                }
                else if (Json.length > 1) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象长度大于1";
                }
                else {
                    for (var i in Json) {
                        var Key = [];
                        var Value = [];
                        for (var j in Json[i]) {
                            _em_options.JsonEval += j + " = '" + Json[i][j] + "',"
                        }
                    }
                    _em_options.JsonEval = _em_options.JsonEval.substring(0, _em_options.JsonEval.length - 1);
                    _em_options.JsonStatus = "1";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Json_Eval_Col_Single", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json键值对表达式单数组
        Json_Eval_Col_Multiple: function (Json, SplitChar, callback) {
            try {
                if (!_em_options.CheckJson(Json)) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象类型不符";
                }
                else if (Json.length == 1) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象长度不大于1";
                }
                else {
                    for (var i in Json) {
                        for (var j in Json[i]) {
                            _em_options.JsonEval += j + " = '" + Json[i][j] + "',"
                        }
                        _em_options.JsonEval = _em_options.JsonEval.substring(0, _em_options.JsonEval.length - 1);
                        _em_options.JsonEval += SplitChar;
                    }
                    _em_options.JsonStatus = "1";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Json_Eval_Col_Multiple", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json键值对表达式多数组
        Json_Eval_Col_Single_Novalue: function (Json, callback) {
            try {
                if (!_em_options.CheckJson(Json)) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象类型不符";
                }
                else if (Json.length > 1) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象长度大于1";
                }
                else {
                    for (var i in Json) {
                        var Key = [];
                        var Value = [];
                        for (var j in Json[i]) {
                            _em_options.JsonEval += j + " = " + Json[i][j] + ","
                        }
                    }
                    _em_options.JsonEval = _em_options.JsonEval.substring(0, _em_options.JsonEval.length - 1);
                    _em_options.JsonStatus = "1";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Json_Eval_Col_Single_Novalue", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json键值对表达式单数组
        Json_Eval_Col_Multiple_Novalue: function (Json, SplitChar, callback) {
            try {
                if (!_em_options.CheckJson(Json)) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象类型不符";
                }
                else if (Json.length == 1) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象长度不大于1";
                }
                else {
                    for (var i in Json) {
                        for (var j in Json[i]) {
                            _em_options.JsonEval += j + " = " + Json[i][j] + ","
                        }
                        _em_options.JsonEval = _em_options.JsonEval.substring(0, _em_options.JsonEval.length - 1);
                        _em_options.JsonEval += SplitChar;
                    }
                    _em_options.JsonStatus = "1";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Json_Eval_Col_Single_Novalue", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json键值对表达式多数组
        Json_Eval_Where_Single: function (Json, callback) {
            try {
                if (!_em_options.CheckJson(Json)) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象类型不符";
                }
                else if (Json.length > 1) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象长度大于1";
                }
                else {
                    for (var i in Json) {
                        for (var j in Json[i]) {
                            _em_options.JsonEval += j + " = '" + Json[i][j] + "' and "
                        }
                    }
                    _em_options.JsonEval += "1 = 1";
                    _em_options.JsonStatus = "1";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Json_Eval_Where_Single", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json键值对表达式单数组条件
        Json_Eval_Where_Multiple: function (Json, SplitChar, callback) {
            try {
                if (!_em_options.CheckJson(Json)) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象类型不符";
                }
                else if (Json.length == 1) {
                    _em_options.JsonStatus = "0";
                    _em_options.JsonMsg = "解析Json对象长度不大于1";
                }
                else {
                    for (var i in Json) {
                        for (var j in Json[i]) {
                            _em_options.JsonEval += j + " = '" + Json[i][j] + "' and "
                        }
                        _em_options.JsonEval += "1 = 1";
                        _em_options.JsonEval += SplitChar;
                    }
                    _em_options.JsonStatus = "1";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Json_Eval_Where_Multiple", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json键值对表达式多数组条件
        VarJsonRemove: function (callback) {
            try {
                _em_options.JsonKeyArr = [];
                _em_options.JsonValueArr = [];
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "VarJsonRemove", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//清空常量Json
        VarJsonEvalRemove: function (callback) {
            try {
                _em_options.JsonEval = "";
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "VarJsonEvalRemove", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//清空JsonEval
        /** openchildren-option **/
        AddSubDeleteClick: function (SubTableID, BackSpace, callback) {
            try {
                var BackSpace = BackSpace || "";
                //删除
                $("#" + SubTableID + " tbody tr td button[name='btn_del']").click(function () {
                    //更新删除
                    if ($(this).parent("td").parent("tr").attr("trtype") == 'update') {
                        if ($(this).parent("td").parent("tr").attr("add-type") == 'open') {
                            _em_options.CreateHiddenInput([
                                "HaveDeleteGuid_" + BackSpace
                            ]);
                            var guidvalue = $(this).parent("td").parent("tr").attr("guidvalue");
                            ($("#HaveDeleteGuid_" + BackSpace).val() == '') ? $("#HaveDeleteGuid_" + BackSpace).val(guidvalue) : $("#HaveDeleteGuid_" + BackSpace).val($("#HaveDeleteGuid_" + BackSpace).val() + ',' + guidvalue);
                            $(this).parent("td").parent("tr").attr("trtype", "delete");
                            $(this).parent("td").parent("tr").hide();
                        }
                        else {
                            $(this).parent("td").parent("tr").attr("trtype", "delete");
                            $(this).parent("td").parent("tr").hide();
                        }
                    }
                    //添加移除
                    if ($(this).parent("td").parent("tr").attr("trtype") == 'add') {
                        if ($(this).parent("td").parent("tr").attr("add-type") == 'open') {
                            var SelectArr = JSON.parse($("#MutiOpenBackBack_" + BackSpace).val());
                            var idguid = $(this).parent("td").parent("tr").attr("idguid");
                            var guidvalue = $(this).parent("td").parent("tr").attr("guidvalue");
                            var delindex = '';
                            $.each(SelectArr, function (index, value) {
                                if (eval('value.' + idguid) == guidvalue)
                                    delindex = index;
                            });
                            SelectArr.splice(delindex, 1);
                            $("#MutiOpenBackBack_" + BackSpace).val(JSON.stringify(SelectArr));
                            $(this).parent("td").parent("tr").remove();
                        }
                        else {
                            $(this).parent("td").parent("tr").remove();
                        }
                    }
                    //合计删除
                    var Arr = $(this).parent("td").parent("tr").find("input[issum = 1]");
                    for (var i = 0; i < Arr.length; i++) {
                        var sumId = $(Arr[i]).attr("data-sum");
                        var inputvalue = (isNaN(parseFloat(Arr[i].value))) ? 0 : parseFloat(Arr[i].value);
                        var SumValue = (isNaN(parseFloat($("#" + sumId).val()))) ? 0 : parseFloat($("#" + sumId).val());
                        $("#" + sumId).val(SumValue - inputvalue);
                    }
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "AddSubDeleteClick", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//添加单身删除按钮事件
        /** string-option **/
        addPre: function (Pre, Word, Size, callback) {
            try {
                Pre = Pre || '0';
                Size = parseInt(Size) || 0;
                Word = String(Word || '');
                var length = Math.max(0, Size - Word.length);
                return this.Repeat(Pre, length, Word);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "addPre", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//补齐。如给数字前 加 0
        Repeat: function (Word, Length, End, callback) {
            try {
                End = End || ''; //加在末位
                Length = ~~Length;
                return new Array(Length * 1 + 1).join(Word) + '' + End;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "Repeat", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//插入重复字符串
        rtrim: function (String, callback) {
            try {
                return String.replace(/(\s*$)/g, '');
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "rtrim", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return String;
            }
        },//去掉右空格
        ltrim: function (String, callback) {
            try {
                return String.replace(/(\s*$)/g, '');
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "ltrim", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return String;
            }
        },//去掉左空格
        trim: function (String, callback) { //# 
            try {
                return (String || '').replace(/(^\s*)|(\s*$)/g, '');
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "trim", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return String;
            }
        },//去掉空格
        IsNull: function (String, Type, callback) {
            try {
                var Type = Type || "String";
                if (typeof (String) == undefined || String == null || String == undefined || String == 'undefined') {
                    if (Type == 'String') return '';
                    if (Type == 'Decimal') return '0';
                } else
                    return String;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "IsNull", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//空值转换
        IsNullBool: function (String, callback) {
            try {
                if (typeof (String) == undefined || String == null || String == undefined || String == 'undefined') {
                    return true
                } else
                    return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "IsNull", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//非空判断
        isEmpty: function (String, callback) {
            try {
                if (String != null && String.length > 0) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "isEmpty", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//非空判断
        GetSubString: function (String, len, callback) {
            try {
                return String.substring(0, String.length - len);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "GetSubString", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//去掉尾字符
        /** input-option **/
        CreateHiddenInput: function (InputIDArr, callback) {
            try {
                if ($("body").find("div#HiddenElement").length == '0') {
                    var hiddendiv = '<div id="HiddenElement" style="display:none;"></div>';
                    $("body").append(hiddendiv);
                }
                var DivHidden = $("div#HiddenElement");
                for (var i = 0; i < InputIDArr.length; i++) {
                    if (DivHidden.find($("#" + InputIDArr[i])).length == '0') {
                        var hiddeninput = '<input type="hidden" id="' + InputIDArr[i] + '">';
                        DivHidden.append(hiddeninput);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "CreateHiddenInput", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//创建隐藏元素
        ClearHiddenInput: function (InputIDArr, callback) {
            try {
                if ($("body").find("div#HiddenElement").length != '0') {
                    var DivHidden = $("div#HiddenElement");
                    for (var i = 0; i < InputIDArr.length; i++) {
                        if (DivHidden.find($("#" + InputIDArr[i])).length != '0') {
                            $("#" + InputIDArr[i]).val("");
                        }
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "_em_options", "FuncName": "ClearHiddenInput", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//清空隐藏元素
        /** default-option **/
        f: function () { },
        a: function () {
            return new this.f();
        },
        defaultcallback: function (d) {
            if (d.RST == 'ERR') alert("【接口:" + d.ApiName + "】-【方法:" + d.FuncName + "】抛出错误:" + d.MSG);
        },
        GeneraCallBack: function (d, callback) {
            var d = d;
            (callback) ? callback(d) : this.defaultcallback(d);
            return;
        },
    }

    //API
    /** val-api **/
    var _em_val_api = {
        /** array-val **/
        Array_Distinct: function (options, callback) {
            try {
                var defaults = {
                    Array: [],//数组
                }, opts = $.extend(defaults, options), Array = opts.Array;
                if (typeof (Array) != 'object' && typeof (Array) != 'Array') {
                    var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "Array_Distinct", "ICO": "2", "MSG": "去重对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                    return Array;
                }
                else {
                    for (var i = 0; i < Array.length - 1; i++) {
                        for (var j = i + 1; j < Array.length; j++) {
                            if (Array[i] == Array[j]) {
                                Array.splice(j, 1);
                                j--;
                            }
                        }
                    }
                    var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "Array_Distinct", "ICO": "1", "MSG": "操作成功" };
                    _em_options.GeneraCallBack(d, callback);
                    return Array;
                }
            }
            catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "Array_Distinct", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return [];
            }
        },//数组去重
        ArrayToString: function (options, callback) {
            try {
                var defaults = {
                    Array: [],//数组
                    JoinChar: ",",//值
                }, opts = $.extend(defaults, options), Array = opts.Array, JoinChar = opts.JoinChar;
                if (typeof (Array) != 'object' && typeof (Array) != 'Array') {
                    var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ArrayToString", "ICO": "2", "MSG": "转换对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                    return Array;
                }
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "ArrayToString", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return Array.join(JoinChar);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ArrayToString", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//数组转换字符串
        ValueIndex: function (options, callback) {
            try {
                var defaults = {
                    Array: [],//数组
                    Value: "",//值
                }, opts = $.extend(defaults, options), Array = opts.Array, Value = opts.Value;
                if (Array.indexOf) {
                    var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "ValueIndex", "ICO": "1", "MSG": "操作成功" };
                    _em_options.GeneraCallBack(d, callback);
                    return Array.indexOf(Value);
                }
                for (var i = Array.length ; i--;) {
                    if (Array[i] === Value) {
                        return i * 1;
                    }
                };
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "ValueIndex", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return -1;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ValueIndex", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return -1;
            }
        },//返回当前值所在数组的位置
        max: function (options, callback) {
            try {
                var defaults = {
                    Array: [],//数组
                }, opts = $.extend(defaults, options), Array = opts.Array, d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "max", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return Math.max.apply(null, Array);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "max", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return 0;
            }
        },//数组中最大的项
        min: function (options, callback) {
            try {
                var defaults = {
                    Array: [],//数组
                }, opts = $.extend(defaults, options), Array = opts.Array, d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "min", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return Math.min.apply(null, Array);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "min", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return 0;
            }
        },//数组中最小的项
        remove: function (options, callback) {
            try {
                var defaults = {
                    Array: [],//数组
                    Value: "",//数值
                }, opts = $.extend(defaults, options), Array = opts.Array, Value = opts.Value, length = Array.length;
                while (length--) {
                    if (Value === Array[length]) {
                        Array.splice(length, 1);
                    }
                }
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "remove", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return Array;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "remove", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return [];
            }
        },//移除数组中某值
        empty: function (options, callback) {
            try {
                var defaults = {
                    Array: [],//数组
                }, opts = $.extend(defaults, options), Array = opts.Array;
                (Array || []).length = 0;
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "empty", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return [];
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "empty", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return [];
            }
        },//清空数组
        removeAt: function (options, callback) {
            try {
                var defaults = {
                    Array: [],//数组
                    Index: 0,//索引
                }, opts = $.extend(defaults, options), Array = opts.Array, Index = opts.Index;
                Array.splice(Index, 1);
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "removeAt", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return Array;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "removeAt", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return [];
            }
        },//删除数组中 指定位置的值
        /** action-val **/
        GenaraParam: function (options, callback) {
            try {
                var defaults = {
                    FormID: "form1",//提交表单ID
                    Param: {
                        //导出存储过程参数
                        //"ProName": "proc_test",
                        //"ParamCount": "3",
                        //"Param": [
                        //    { "key": "Key", "value": "工号", "type": "String" },
                        //    { "key": "PageIndex", "value": "1", "type": "Int32" },
                        //    { "key": "PageSize", "value": "10000", "type": "Int32" }
                        //]
                    }
                }, opts = $.extend(defaults, options), FormID = opts.FormID, Param = opts.Param, FORM = $("form#" + opts.FormID);
                if (!_em_options.isEmpty(FormID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "val-api", "FuncName": "GenaraParam", "MSG": "表单ID不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                $("#ParamCount").val(Param.ParamCount);
                $("#FIELD").val(parent.$("#ShowColumn_BootStrap").val());
                for (var i = 0; i < Param.length; i++) {
                    if (FORM.find($("#Param[" + i + "][key]")).length == '0') {
                        var paraminput_key = '<input type="hidden" id="Param[' + i + '][key]" name="Param[' + i + '][key]" value="' + Param[i]["key"] + '">';
                        FORM.append(paraminput_key);
                    }
                    else {
                        $("#Param[" + i + "][key]").val(Param[i]["key"]);
                    }
                    if (FORM.find($("#Param[" + i + "][value]")).length == '0') {
                        var paraminput_value = '<input type="hidden" id="Param[' + i + '][value]" name="Param[' + i + '][value]" value="' + Param[i]["value"] + '">';
                        FORM.append(paraminput_value);
                    }
                    else {
                        $("#Param[" + i + "][value]").val(Param[i]["value"]);
                    }
                    if (FORM.find($("#Param[" + i + "][key]")).length == '0') {
                        var paraminput_type = '<input type="hidden" id="Param[' + i + '][type]" name="Param[' + i + '][type]" value="' + Param[i]["type"] + '">';
                        FORM.append(paraminput_type);
                    }
                    else {
                        $("#Param[" + i + "][type]").val(Param[i]["type"]);
                    }
                }
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "GenaraParam", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "GenaraParam", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//生成POST参数
        ColJoinT: function (options, callback) {
            try {
                var defaults = {
                    ViewName: "",//视图名
                    isSort: "0",//是否排序
                }, opts = $.extend(defaults, options), ViewName = opts.ViewName, isSort = opts.isSort, Field = "", questioncloumn = [];
                if (!_em_options.isEmpty(ViewName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "val-api", "FuncName": "ColJoinT", "MSG": "视图名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                $.P8.common().postJSON({
                    url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                    data: {
                        "ProName": "sp_sqlexec",
                        "ParamCount": "1",
                        "Param": [
                            { "key": "p1", "value": "select * from sys.columns where object_id = object_id('" + ViewName + "')", "type": "String" }
                        ]
                    },
                    async: true
                }, function (d) {
                    for (var i = 0; i < d.DATA.length; i++) {
                        if (i == d.DATA.length - 1) {
                            Field += d.DATA[i].name;
                        }
                        else {
                            Field += d.DATA[i].name + ',';
                        }
                    }
                    var colString = '[', FieldArr = Field.split(",");
                    for (var i = 0; i < FieldArr.length; i++) {
                        if (i == FieldArr.length - 1) {
                            (isSort == '1') ? colString += '{title:\'' + FieldArr[i] + '\',field:\'' + FieldArr[i] + '\',sortable:true,align:\'center\',valign: \'middle\',width: \'10%\',height: \'10px\'}' : colString += '{title:\'' + FieldArr[i] + '\',field:\'' + FieldArr[i] + '\',align:\'center\',valign: \'middle\',width: \'10%\',height: \'10px\'}';
                        }
                        else {
                            (isSort == '1') ? colString += '{title:\'' + FieldArr[i] + '\',field:\'' + FieldArr[i] + '\',sortable:true,align:\'center\',valign: \'middle\',width: \'10%\',height: \'10px\'},' : colString += '{title:\'' + FieldArr[i] + '\',field:\'' + FieldArr[i] + '\',align:\'center\',valign: \'middle\',width: \'10%\',height: \'10px\'},';
                        }
                    }
                    colString += ']';
                    questioncloumn.push(eval('(' + colString + ')'));
                    var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "ColJoinT", "ICO": "1", "MSG": "操作成功" };
                    _em_options.GeneraCallBack(d, callback);
                });
                return questioncloumn;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ColJoinT", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return [];
            }
        },//动态拼接列
        /** browser-val **/
        coreInit: function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options), i = null, browsers = this.browsers, ua = w.navigator.userAgent.toLowerCase(), brower = '', pos = 1;
                for (i in browsers) {
                    if (brower = ua.match(browsers[i])) {
                        if (i == 'opera') {
                            pos = 2;
                        } else {
                            pos = 1;
                        }
                        this.version = (brower[pos] || '').replace(/[\/\s]+/, '');
                        this.core = i;
                        var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "coreInit", "ICO": "1", "MSG": "操作成功" };
                        _em_options.GeneraCallBack(d, callback);
                        return i;
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "coreInit", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//浏览器版本
        ie: function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options), v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
                while (
                    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                        all[0]
                    );
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "ie", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return v > 4 ? v : false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ie", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//检测IE版本 ！仅支: ie5,6,7,8,9
        myBrowser: function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options), userAgent = navigator.userAgent, isOpera = userAgent.indexOf("Opera") > -1, d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "ie", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                if (isOpera) {
                    return "Opera"
                }; //判断是否Opera浏览器
                if (userAgent.indexOf("Firefox") > -1) {
                    return "FF";
                } //判断是否Firefox浏览器
                if (userAgent.indexOf("Chrome") > -1) {
                    return "Chrome";
                }
                if (userAgent.indexOf("Safari") > -1) {
                    return "Safari";
                } //判断是否Safari浏览器
                if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                    return "IE";
                }; //判断是否IE浏览器
                if (userAgent.indexOf("Trident") > -1) {
                    return "Edge";
                } //判断是否Edge浏览器
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "myBrowser", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        }, //浏览器的userAgent字符串
        /** bootstrap-val **/
        ReturnWhere: function (options, callback) {
            try {
                var defaults = {
                    inputs: $("#temp_search div.tdk-xml input[data-search='1'],#temp_search div.tdk-xml  select[data-search='1']"),//查询元素
                }, opts = $.extend(defaults, options), inputs = opts.inputs, temp_S = '', temp_E = '', tempMoney_S = '', tempMoney_E = '', where_search = '';
                for (var i = 0; i < inputs.length; i++) {
                    //下拉框查询模板 select元素
                    if (inputs[i].type.indexOf('select') != -1 && inputs[i].value == 'all') {

                    }
                    else if (inputs[i].type.indexOf('select') != -1 && inputs[i].value != 'all') {
                        where_search += 'ISNULL(' + inputs[i].id + ',\'\') = \'' + inputs[i].value + '\' and ';
                    }
                    else if (inputs[i].type.indexOf('hidden') != -1) {
                        if (inputs[i].value == '') {
                            //where_search += 'ISNULL(' + inputs[i].id + ',\'\') like  \'%' + inputs[i].value + '%\' and ';
                        }
                        else {
                            where_search += 'ISNULL(' + inputs[i].id + ',\'\') =  \'' + inputs[i].value + '\' and ';
                        }
                    }
                        //多字段起止日期 设置name[date1] 制定 [起字段_S] [止字段_E]
                    else if (inputs[i].name == 'date1') {
                        if (inputs[i].id.substring(inputs[i].id.indexOf("_") + 1, inputs[i].id.length) == 'S') {
                            //获取ID
                            var temp1 = inputs[i].id.substring(0, inputs[i].id.indexOf("_"));
                            //获取起日期
                            let _name_S = "$('#" + temp1 + "_S').val()";
                            temp_S = eval(_name_S);
                        }
                        //结束标识
                        if (inputs[i].id.substring(inputs[i].id.indexOf("_") + 1, inputs[i].id.length) == 'E') {
                            //获取ID
                            var temp2 = inputs[i].id.substring(0, inputs[i].id.indexOf("_"));
                            //获取止日期
                            let _name_E = "$('#" + temp2 + "_E').val()";
                            temp_E = eval(_name_E);
                            if (temp_S == '' && temp_E == '') {

                            }
                            else if (temp_S == '' || temp_E == '') {
                                temp_S == '' ? where_search += ' ISNULL(' + temp2 + ',\'\') <= \'' + temp_E + '\' and ' : where_search += ' ISNULL(' + temp1 + ',\'\') >= \'' + temp_S + '\' and '
                            }
                            else {
                                where_search += 'ISNULL(' + temp1 + ',\'\') >= \'' + temp_S + '\' and ISNULL(' + temp2 + ',\'\') <= \'' + temp_E + '\' and ';
                            }
                        }
                    }
                        //单字段起止日期 设置name[date] 制定 [字段_S] [字段_E]
                    else if (inputs[i].name == 'date') {
                        //获取ID
                        var temp1 = inputs[i].id.substring(0, inputs[i].id.indexOf("_"));
                        //获取起日期
                        let _name_S = "$('#" + temp1 + "_S').val()";
                        temp_S = eval(_name_S);
                        //获取止日期
                        let _name_E = "$('#" + temp1 + "_E').val()";
                        temp_E = eval(_name_E);
                        //结束标识
                        if (inputs[i].id.substring(inputs[i].id.indexOf("_") + 1, inputs[i].id.length) == 'E') {
                            if (temp_S == '' && temp_E == '') {

                            }
                            else if (temp_S == '' || temp_E == '') {
                                temp_S == '' ? where_search += 'ISNULL(' + temp1 + ',\'\') <= \'' + temp_E + '\' and ' : where_search += 'ISNULL(' + temp1 + ',\'\') >= \'' + temp_S + '\' and '
                            }
                            else {
                                where_search += 'ISNULL(' + temp1 + ',\'\') >= \'' + temp_S + '\' and ISNULL(' + temp1 + ',\'\') <= \'' + temp_E + '\' and ';
                            }
                        }
                    }
                        //文本查询
                    else {
                        //多条件in查询
                        if (inputs[i].getAttribute("isNoSingle") == '1') {
                            if (inputs[i].value != '') {
                                where_search += 'ISNULL(' + inputs[i].id + ',\'\') in  (\'' + inputs[i].value.replace(/,/g, "','") + '\') and ';
                            }
                            else {
                                //where_search += 'ISNULL(' + inputs[i].id + ',\'\') like  \'%' + inputs[i].value + '%\' and ';
                            }
                        }
                            //数额区间查询
                        else if (inputs[i].getAttribute("isMoney") == '1') {
                            //获取ID
                            var temp1 = inputs[i].id.substring(0, inputs[i].id.indexOf("_"));
                            //获取起金额
                            let _name_S = "$('#" + temp1 + "_S').val()";
                            tempMoney_S = eval(_name_S);
                            //获取止金额
                            let _name_E = "$('#" + temp1 + "_E').val()";
                            tempMoney_E = eval(_name_E);
                            if (((!isNaN(parseFloat(tempMoney_S)) && tempMoney_S != '') || tempMoney_S == '') && ((!isNaN(parseFloat(tempMoney_E)) && tempMoney_E != '') || tempMoney_E == '')) {
                                //结束标识
                                if (inputs[i].id.substring(inputs[i].id.indexOf("_") + 1, inputs[i].id.length) == 'E') {
                                    if (tempMoney_S == '' && tempMoney_E == '') {

                                    }
                                    else if (tempMoney_S == '' || tempMoney_E == '') {
                                        tempMoney_S == '' ? where_search += 'ISNULL(' + temp1 + ',0) <= ' + tempMoney_E + ' and ' : where_search += 'ISNULL(' + temp1 + ',0) >= ' + tempMoney_S + ' and '
                                    }
                                    else {
                                        where_search += 'ISNULL(' + temp1 + ',0) >= ' + tempMoney_S + ' and ISNULL(' + temp1 + ',0) <= ' + tempMoney_E + ' and ';
                                    }
                                }
                            }
                        }
                            //单条件like
                        else {
                            if (inputs[i].value != '') {
                                where_search += 'ISNULL(' + inputs[i].id + ',\'\') like  \'%' + inputs[i].value + '%\' and ';
                            }
                        }
                    }
                }
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "ReturnWhere", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return where_search;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ReturnWhere", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//返回条件
        ShowColumnsFresh: function (options, callback) {
            try {
                var defaults = {
                    ColJson: [],//列Json
                }, opts = $.extend(defaults, options), ColJson = opts.ColJson, F = [], OrderVal = '';
                _em_options.CreateHiddenInput([
                    "ShowColumn",
                    "Order_ShowColumn"
                ]);
                if (!_em_options.CheckArray(ColJson)) {
                    var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ShowColumnsFresh", "ICO": "2", "MSG": "列Json长度为0或对象类型不为数组" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                for (var i = 0; i < ColJson.length; i++) {
                    for (var j = 0; j < ColJson[i].length; j++) {
                        var Field = ColJson[i][j].field || "";
                        if (ColJson[i][j].visible)
                            if (Field != "")
                                F.push(Field);
                    }
                }
                $("#ShowColumn").val(' and name in (\'' + _em_options.ArrayToString(F, '\',\'') + '\')');
                for (var i = 0; i < F.length; i++) {
                    if (i == 0) {
                        OrderVal += 'order by case name ';
                    }
                    OrderVal += ' when \'' + F[i] + '\' then ' + eval(i + 1) + ' ';
                    if (i == F.length - 1) {
                        OrderVal += ' else 0 end asc';
                    }
                }
                $("#Order_ShowColumn").val(OrderVal);
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "ShowColumnsFresh", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ShowColumnsFresh", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//获取数据源显示列
        ShowColumnsFresh_BootStrap: function (options, callback) {
            try {
                var defaults = {
                    ColJson: [],//列Json
                };
                var opts = $.extend(defaults, options), ColJson = opts.ColJson, F = [];
                _em_options.CreateHiddenInput([
                    "ShowColumn_BootStrap"
                ]);
                if (!_em_options.CheckArray(ColJson)) {
                    var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ShowColumnsFresh_BootStrap", "ICO": "2", "MSG": "列Json长度为0或对象类型不为数组" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                for (var i = 0; i < ColJson.length; i++) {
                    for (var j = 0; j < ColJson[i].length; j++) {
                        var Field = ColJson[i][j].field || "";
                        if (ColJson[i][j].visible)
                            if (Field != "")
                                F.push(Field);
                    }
                }
                $("#ShowColumn_BootStrap").val(_em_options.ArrayToString(F, ','));
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "ShowColumnsFresh_BootStrap", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ShowColumnsFresh_BootStrap", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        }, //获取数据源显示列-BootStrap
        /** cookie-val **/
        enable: !!navigator.cookieEnabled,//Cookie启用状态
        get: function (options, callback) {
            try {
                var defaults = {
                    Name: "",//cookie名
                }, opts = $.extend(defaults, options), Name = opts.Name, reg = new RegExp("(^| )" + Name + "(?:=([^;]*))?(;|$)")
                    , val = document.cookie.match(reg)
                ;
                if (!_em_options.isEmpty(Name)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "val-api", "FuncName": "get", "MSG": "cookie名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "get", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
                return val ? (val[2] ? unescape(val[2]) : "") : '';
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "get", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//读取 cookie
        /** common-val **/
        newGuid: function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options);
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "newGuid", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//GUID
        getDeviceOSType: function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options), _return = "pc", ua = navigator.userAgent.toLowerCase();
                if (/iphone|ipad|ipod/.test(ua)) {
                    _return = "ios"
                }
                else if (/android/.test(ua)) {
                    _return = "android"
                }

                return _return;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "getDeviceOSType", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//获取设备系统类型
        strToUtf8: function (options, callback) {
            try {
                var defaults = {
                    text: ""//原始字符串
                }, opts = $.extend(defaults, options), text = opts.text, out, i, len, c;
                out = "";
                len = text.length;
                for (i = 0; i < len; i++) {
                    c = text.charCodeAt(i);
                    if ((c >= 0x0001) && (c <= 0x007F)) {
                        out += text.charAt(i);
                    }
                    else if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                    else {
                        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                }
                return out;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "strToUtf8", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//将字符串转换为UTF-8编码
        alltrim: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                return String.replace(/\s/g, '');
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "trim", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//全空格替换
        trim: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                return String.replace(/(^\s*)|(\s*$)/g, '');
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "trim", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//左右空格替换
        rtrim: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                return String.replace(/\s*$/, '');
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "rtrim", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//右空格替换
        ltrim: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                return String.replace(/^\s*/g, '');
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ltrim", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//左空格替换
        isEmpty: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                if (String != null && String.length > 0) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isEmpty", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//非空判断
        equals: function (options, callback) {
            try {
                var defaults = {
                    String1: "",//字符串1
                    String2: ""//字符串2
                }, opts = $.extend(defaults, options), String1 = opts.String1, String2 = opts.String2;
                if (String1 == String2) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "equals", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//比较
        equalsIgnoreCase: function (options, callback) {
            try {
                var defaults = {
                    String1: "",//字符串1
                    String2: ""//字符串2
                }, opts = $.extend(defaults, options), String1 = opts.String1, String2 = opts.String2;
                if (String1.toUpperCase() == String2.toUpperCase()) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "equalsIgnoreCase", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//忽略大小写比较
        isChinese: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String, String = String.replace(/(^\s*)|(\s*$)/g, '');
                if (!(/^[\u4E00-\uFA29]*$/.test(String)
                        && (!/^[\uE7C7-\uE7F3]*$/.test(String)))) {
                    return false;
                }
                return true;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isChinese", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//中文判断
        isEmail: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(String)) {
                    return true
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isEmail", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//邮箱判断
        isImg: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String, objReg = new RegExp("[.]+(jpg|jpeg|swf|gif)$", "gi");
                if (objReg.test(String)) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isImg", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//图片判断
        isInteger: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                if (/^-?\d+$/.test(String)) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isInteger", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//数字判断
        isFloat: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                if (/^(-?\d+)(\.\d+)?$/.test(String)) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isFloat", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//浮点判断
        isPost: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                if (/^\d{1,6}$/.test(String)) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isPost", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//座机判断
        isMobile: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                if (/^1[35]\d{9}/.test(String)) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isMobile", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//移动判断
        isQQ: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String;
                if (/^\d{5,9}$/.test(String)) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isQQ", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//QQ判断
        isIP: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String, reg = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
                if (reg.test(String)) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isIP", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//IP判断
        isDate: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String, reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
                if (reg.test(String)) {
                    return true;
                }
                return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isDate", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//日期判断
        isIdCardNo: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                }, opts = $.extend(defaults, options), String = opts.String, factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1), varArray = new Array(), lngProduct = 0, intCheckDigit;
                if ((String.length != 15) && (String.length != 18)) {
                    return false;
                }
                for (i = 0; i < String.length; i++) {
                    varArray[i] = String.charAt(i);
                    if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                        return false;
                    }
                    else if (i < 17) {
                        varArray[i] = varArray[i] * factorArr[i];
                    }
                }
                if (String.length == 18) {
                    var date8 = String.substring(6, 14);
                    if (checkDate(date8) == false) {
                        return false;
                    }
                    for (i = 0; i < 17; i++) {
                        lngProduct = lngProduct + varArray[i];
                    }
                    intCheckDigit = 12 - lngProduct % 11;
                    switch (intCheckDigit) {
                        case 10:
                            intCheckDigit = 'X';
                            break;
                        case 11:
                            intCheckDigit = 0;
                            break;
                        case 12:
                            intCheckDigit = 1;
                            break;
                    }
                    if (varArray[17].toUpperCase() != intCheckDigit) {
                        return false;
                    }
                }
                else {
                    var date6 = String.substring(6, 12);
                    if (checkDate(date6) == false) {
                        return false;
                    }
                }
                return true;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "isIdCardNo", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return false;
            }
        },//身份证判断
        /** date-val **/
        getFirstAndLastMonthDay: function (options, callback) {
            try {
                var defaults = {
                    year: "1990",//年
                    month: "1",//月
                }, opts = $.extend(defaults, options), year = opts.year, month = opts.month, day = new Date(year, month, 0), lastdate = year + '-' + _em_options.addPre('0', month, '2') + '-' + day.getDate();//获取当月最后一天日期
                return lastdate;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "getFirstAndLastMonthDay", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//获取当月的最后一天
        GetTime: function (options, callback) {
            try {
                var defaults = {
                    Format: "yyyy-MM-dd",//格式
                }, opts = $.extend(defaults, options), Format = opts.Format, date = new Date(), year = date.getFullYear(), month = date.getMonth() + 1;
                if (month < 10) { month = '0' + (date.getMonth() + 1); }
                var day = date.getDate();
                if (day < 10) { day = '0' + (date.getDate()); }
                var hour = date.getHours();
                if (hour < 10) { hour = '0' + (date.getHours()); }
                var minute = date.getMinutes();
                if (minute < 10) { minute = '0' + (date.getMinutes()); }
                var second = date.getSeconds();
                if (second < 10) { second = '0' + (date.getSeconds()); }
                if (Format == 'yyyy-MM-dd')
                    var TheTime = year + "-" + month + "-" + day;
                else if (Format == 'yyyy-MM-dd HH:mm:ss')
                    var TheTime = year + "-" + month + "-" + day + "   " + hour + ":" + minute + ":" + second;
                else if (Format == 'yyyy-MM-dd HH:mm')
                    var TheTime = year + "-" + month + "-" + day + "   " + hour + ":" + minute;
                else if (Format == 'yyyy-MM-dd HH')
                    var TheTime = year + "-" + month + "-" + day + "   " + hour;
                return TheTime;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "GetTime", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//获取时间指定格式
        getWeek: function (options, callback) {
            try {
                var defaults = {
                    time: this.GetTime(),//开始时间
                    pre: "周",//星期前缀 如 周 星期
                    nums: "日一二三四五六",//时间排序
                }, opts = $.extend(defaults, options), time = opts.time, pre = opts.pre, nums = opts.nums;
                return pre + nums[new Date(time).getDay()];
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "getWeek", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//获取星期几
        format: function (options, callback) {
            try {
                var defaults = {
                    formatType: 'YYYY-MM-DD',//开始时间
                    time: new Date(),//星期前缀 如 周 星期
                    weeks: "日一二三四五六",//时间排序
                }, opts = $.extend(defaults, options), weeks = opts.weeks, time = opts.time, formatType = opts.formatType, pre = '0';
                return (formatType)
                    .replace(/yyyy|YYYY/g, new Date(time).getFullYear())
                    .replace(/yy|YY/g, _em_options.addPre(pre, new Date(time).getFullYear() % 100), 2)
                    .replace(/mm|MM/g, _em_options.addPre(pre, new Date(time).getMonth() + 1, 2))
                    .replace(/m|M/g, new Date(time).getMonth() + 1)
                    .replace(/dd|DD/g, _em_options.addPre(pre, new Date(time).getDate(), 2))
                    .replace(/d|D/g, new Date(time).getDate())
                    .replace(/hh|HH/g, _em_options.addPre(pre, new Date(time).getHours(), 2))
                    .replace(/h|H/g, new Date(time).getHours())
                    .replace(/ii|II/g, _em_options.addPre(pre, new Date(time).getMinutes(), 2))
                    .replace(/i|I/g, new Date(time).getMinutes())
                    .replace(/ss|SS/g, _em_options.addPre(pre, new Date(time).getSeconds(), 2))
                    .replace(/s|S/g, new Date(time).getSeconds())
                    .replace(/w/g, new Date(time).getDay())
                    .replace(/W/g, weeks[new Date(time).getDay()])
                ;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "format", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//格式化时间
        CompareTime: function (options, callback) {
            try {
                var defaults = {
                    begintime: '1900-01-01',//开始时间
                    endtime: this.GetTime(),//结束时间
                    Format: 0,//格式化
                }, opts = $.extend(defaults, options), begintime = opts.begintime, endtime = opts.endtime, Format = opts.Format;
                var begintime_ms = _em_options.parse(begintime.replace(/-/g, "/")); //begintime 为开始时间
                var endtime_ms = _em_options.parse(endtime.replace(/-/g, "/"));   // endtime 为结束时间
                if (Format == '0') {
                    var date3 = endtime_ms - begintime_ms  //时间差的毫秒数
                    //计算出相差天数
                    var days = Math.floor(date3 / (24 * 3600 * 1000))
                    //计算出小时数
                    var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
                    var hours = Math.floor(leave1 / (3600 * 1000))
                    //计算相差分钟数
                    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
                    var minutes = Math.floor(leave2 / (60 * 1000))
                    //计算相差秒数
                    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
                    var seconds = Math.round(leave3 / 1000);
                    return days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒";
                }
                else {
                    var date3 = endtime_ms - begintime_ms  //时间差的毫秒数
                    //计算出相差天数
                    var days = Math.floor(date3 / (24 * 3600 * 1000))
                    var hours = Math.floor(date3 / (3600 * 1000))
                    var minutes = Math.floor(date3 / (60 * 1000))
                    var seconds = Math.round(date3 / 1000);
                    //计算出小时数
                    var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
                    var hours1 = Math.floor(leave1 / (3600 * 1000))
                    //计算相差分钟数
                    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
                    var minutes1 = Math.floor(leave2 / (60 * 1000))
                    //计算相差秒数
                    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
                    var seconds1 = Math.round(leave3 / 1000);
                    if (Format == 'DAY')
                        return days;
                    else if (Format == 'HOUR')
                        return hours;
                    else if (Format == 'MIN')
                        return minutes;
                    else if (Format == 'SECOND')
                        return seconds;
                    else if (Format == 'DAY:HOUR:MIN:SECOND')
                        return days + "天 " + hours1 + "小时 " + minutes1 + " 分钟" + seconds1 + " 秒";
                    else if (Format == 'DAY:HOUR:MIN')
                        return days + "天 " + hours1 + "小时 " + minutes1 + " 分钟";
                    else if (Format == 'DAY:HOUR')
                        return days + "天 " + hours1 + "小时 ";
                    else
                        return '格式错误';
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "CompareTime", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//时间差计算
        /** replace-val **/
        ReplaceHavote: function (options, callback) {
            try {
                var defaults = {
                    Value: "",//原始值
                }, opts = $.extend(defaults, options), Value = opts.Value, value = _em_options.IsNull(Value);
                if (value.indexOf("\"") != -1) {
                    value = value.replace(/"/g, "\\\"");
                    if (value.indexOf("\'") != -1) {
                        value = value.replace(/'/g, "\\\'");
                    }
                }
                else if (value.indexOf("\'") != -1) {
                    value = value.replace(/'/g, "\\\'");
                    if (value.indexOf("\"") != -1) {
                        value = value.replace(/"/g, "\\\"");
                    }
                }
                return value;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "ReplaceHavote", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//替换引号
        /** float-val **/
        FormatFloat: function (options, callback) {
            try {
                var defaults = {
                    Float: "0",//原始值
                    Size: 2//位数
                };
                var opts = $.extend(defaults, options), Float = opts.Float, Size = opts.Size;
                var varchar = '';
                if (Float == null || isNaN(Float))
                    Float = "0";
                var aa = Float.toString().split("");
                var num = 0, k = 0;
                //num是已得小数点位数，K用来作是否到小数点控制
                for (var i = 0; i < aa.length; i++) {
                    varchar += aa[i];
                    if (aa[i] == ".") {
                        k = 1;
                    }
                    if (k == 1) {
                        num++;
                        if (num > Size) break;
                    }
                }
                num--;
                for (; num < Size; num++) //如果位数不够，则补0
                {
                    varchar += "0";
                }
                if (Size == '0')
                    varchar = Float.toString().substring(0, Float.toString().indexOFloat('.'));
                return varchar;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "FormatFloat", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//字符串回弹自定义数字小数位数
        /** json-val **/
        String_Json: function (options, callback) {
            try {
                var defaults = {
                    String: ""//原始字符串
                };
                var opts = $.extend(defaults, options), String = opts.String;
                return eval("(" + String + ")");
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "String_Json", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
                return "";
            }
        },//String => Json
        Json_GetKeyByOtherKey: function (options, callback) {
            try {
                var defaults = {
                    Json: [{}],//Json对象
                    Return: "", //需要返回的键名
                    Key: "",//Json筛选的键
                    Value: "",//Json筛选的值
                };
                var opts = $.extend(defaults, options), Json = opts.Json, Return = opts.Return, Key = opts.Key, Value = opts.Value;
                if ((typeof (Key) != 'object' && typeof (Value) != 'object') || (typeof (Key) != 'Array' && typeof (Value) != 'Array')) {
                    var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "Json_GetKeyByOtherKey", "ICO": "2", "MSG": "筛选键或者筛选值类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else if (Key.length != Value.length) {
                    var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "Json_GetKeyByOtherKey", "ICO": "2", "MSG": "筛选键与筛选值数目不匹配" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    var result = '';
                    for (var i in Json) {
                        var condition = '';
                        for (var ki = 0; ki < Key.length; ki++) {
                            if (ki == Key.length - 1) {
                                condition += eval("Json[i]." + Key[ki]) + ' == \'' + Value[ki] + '\'';
                            }
                            else {
                                condition += eval("Json[i]." + Key[ki]) + ' == \'' + Value[ki] + '\' && ';
                            }
                        }
                        if (condition) {
                            var result = eval("Json[i]." + Return);
                            break;
                        }
                    }
                    var d = { "RST": "SUC", "ApiName": "val-api", "FuncName": "Json_GetKeyByOtherKey", "ICO": "1", "MSG": "成功", "data": result };
                    _em_options.GeneraCallBack(d, callback);
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "Json_GetKeyByOtherKey", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Json串多条件筛选
        /** string-val **/
        StringToArray: function (options, callback) {
            try {
                var defaults = {
                    String: "",//原始字符串
                    SplitChar: ","//分隔字符
                };
                var opts = $.extend(defaults, options), String = opts.String, SplitChar = opts.SplitChar;
                if (typeof (String) != 'string') {
                    var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "StringToArray", "ICO": "2", "MSG": "转换对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                    return '';
                }
                return String.split(SplitChar);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "StringToArray", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//字符串转换数组
        replace: function (options, callback) {
            try {
                var defaults = {
                    String: "",//原始字符串
                    repString: ""//{替换数组}       替换字符{"1":"3","4":"2"}
                };
                var opts = $.extend(defaults, options), String = opts.String, repString = opts.repString;
                for (var key in repString) {
                    replace(key, repString[key]);
                };
                function replace(a, b) {
                    var arr = String.split(a);
                    String = arr.join(b);
                };
                return String;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "replace", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//字符串替换
        CodeHtml: function (options, callback) {
            try {
                var defaults = {
                    String: "",//原始字符串
                };
                var opts = $.extend(defaults, options), String = opts.String;
                return this.replace(String, {
                    '&': "&amp;"
                    , '"': "&quot;"
                    , "'": '&#39;'
                    , '<': "&lt;"
                    , '>': "&gt;"
                    , ' ': "&nbsp;"
                    , '\t': "&#09;"
                    , '(': "&#40;"
                    , ')': "&#41;"
                    , '*': "&#42;"
                    , '+': "&#43;"
                    , ',': "&#44;"
                    , '-': "&#45;"
                    , '.': "&#46;"
                    , '/': "&#47;"
                    , '?': "&#63;"
                    , '\\': "&#92;"
                    , '·': "&#183;"
                    , '\n': "<br>"
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "CodeHtml", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//转义 HTML 字符  
        Repeat: function (options, callback) {
            try {
                var defaults = {
                    Word: "",//插入字符串
                    Length: 0,//插入长度
                    End: "",//末位字符串
                };
                var opts = $.extend(defaults, options), Word = opts.Word, Length = opts.Length, End = opts.End;
                return new Array(Length * 1 + 1).join(Word) + '' + End;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "Repeat", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//插入重复字符串
        addPre: function (options, callback) {
            try {
                var defaults = {
                    Pre: "0",//插入字符串
                    Size: 0,//插入个数
                    Word: "",//字符
                };
                var opts = $.extend(defaults, options), Pre = opts.Pre, Size = opts.Size, Word = opts.Word;
                var length = Math.max(0, Size - Word.length);
                return _em_options.Repeat(Pre, length, Word);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "addPre", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//补齐。如给数字前 加 0
        IsNullToString: function (options, callback) {
            try {
                var defaults = {
                    String: null,//插入字符串
                    ChangeString: ""//转换字符
                };
                var opts = $.extend(defaults, options), String = opts.String, ChangeString = opts.ChangeString;
                if (typeof (String) == undefined || String == null || String == undefined || String == 'undefined') {
                    return ChangeString
                } else
                    return String;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "IsNullToString", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//空值转换
        IsNull: function (options, callback) {
            try {
                var defaults = {
                    String: "",//插入字符串
                };
                var opts = $.extend(defaults, options), String = opts.String;
                if (typeof (String) == undefined || String == null || String == undefined || String == 'undefined') {
                    return true
                } else
                    return false;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "IsNull", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//Null判断（不包含空串）
        xss: function (options, callback) { //# 
            try {
                var defaults = {
                    String: "",//转义字符串
                    type: "html"//类型
                };
                var opts = $.extend(defaults, options), String = opts.String, type = opts.type;
                //空过滤
                if (!String) {
                    return String === 0 ? "0" : "";
                }
                switch (type) {
                    case "html": //过滤html字符串中的XSS
                        return String.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function (r) {
                            return "&#" + r.charCodeAt(0) + ";"
                        }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
                        break;
                    case "htmlEp": //过滤DOM节点属性中的XSS
                        return String.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function (r) {
                            return "&#" + r.charCodeAt(0) + ";"
                        });
                        break;
                    case "url": //过滤url
                        return escape(String).replace(/\+/g, "%2B");
                        break;
                    case "miniUrl":
                        return String.replace(/%/g, "%25");
                        break;
                    case "script":
                        return String.replace(/[\\"']/g, function (r) {
                            return "\\" + r;
                        }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
                        break;
                    case "reg":
                        return String.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function (a) {
                            return "\\" + a;
                        });
                        break;
                    default:
                        return escape(String).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function (r) {
                            return "&#" + r.charCodeAt(0) + ";"
                        }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
                        break;
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "xss", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//XSS 转义
        badWord: function (options, callback) {
            try {
                var defaults = {
                    text: "",//要过滤的文本 , 类型 ：字符串
                    words: []//敏感词 ，类型，数组, 如 ： ['你妹', '我丢' ,'我靠']
                };
                var opts = $.extend(defaults, options), text = opts.text, words = opts.words;
                var reg = new RegExp(words.join('|'), 'g')
                    , _options = _em_options;
                return text.replace(reg, function ($0) {
                    var length = String($0 || '').length;
                    return _options.Repeat('*', length);
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "badWord", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//过滤敏感词
        GetSubString: function (options, callback) {
            try {
                var defaults = {
                    String: "",//要切割的文本
                    len: 0//长度
                };
                var opts = $.extend(defaults, options), String = opts.String, len = opts.len;
                return String.substring(0, String.length - len);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "GetSubString", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//去掉尾字符
        GetStringByteLength: function (options, callback) {
            try {
                var defaults = {
                    val: "",//值
                };
                var opts = $.extend(defaults, options), val = opts.val;
                var Zhlength = 0;// 全角
                var Enlength = 0;// 半角

                for (var i = 0; i < val.length; i++) {
                    if (val.substring(i, i + 1).match(/[^\x00-\xff]/ig) != null)
                        Zhlength += 1;
                    else
                        Enlength += 1;
                }
                // 返回当前字符串字节长度
                return (Zhlength * 2) + Enlength;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "GetStringByteLength", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//获取字符串字节数
        /** url-val **/
        GetUrlParam: function (options, callback) {
            try {
                var defaults = {};
                var opts = $.extend(defaults, options), _arr = location.search.substr(1).split('&'), _obj = {};
                for (var i = 0; i < _arr.length; i++) {
                    _obj[_arr[i].split('=')[0]] = _arr[i].split('=')[1]
                };
                return _obj;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "GetUrlParam", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//获取请求参数（Get）所有
        GetQueryString: function (options, callback) {
            try {
                var defaults = {
                    QueryName: "",//指定参数名
                };
                var opts = $.extend(defaults, options),
                    QueryName = opts.QueryName,
                    reg = new RegExp("(^|&)" + QueryName + "=([^&]*)(&|$)", "i"),
                    r = w.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "GetQueryString", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//获取请求参数（Get）指定
        /** input-val **/
        MultipleChoiceCheckBox: function (options, callback) {
            try {
                var defaults = {
                    checkBoxName: "name",//复选框name
                }, opts = $.extend(defaults, options), checkBoxName = opts.checkBoxName, content = '', serids = document.getElementsByName(checkBoxName);
                for (var i = 0; i < serids.length; i++) {
                    if (serids[i].checked) {
                        content += serids[i].value + ",";
                    }
                }
                content = content.substr(0, content.length - 1);
                return content;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "MultipleChoiceCheckBox", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//获取选中复选框的值
        GetTableInputValueArr: function (options, callback) {
            try {
                var defaults = {
                    TableID: "",//单身表格ID
                    InputName: "", //元素Name
                };
                var opts = $.extend(defaults, options),
                    TableID = opts.TableID,
                    InputName = opts.InputName;
                if (!_em_options.isEmpty(TableID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "val-api", "FuncName": "GetTableInputValueArr", "MSG": "单身表格ID不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(InputName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "val-api", "FuncName": "GetTableInputValueArr", "MSG": "元素Name不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                var Arr = [],
                subinput = $("#" + TableID + " tbody tr[trtype!='delete'] input[name='" + InputName + "']");
                for (var notini = 0; notini < subinput.length; notini++) {
                    Arr.push(subinput[notini].value);
                }
                return Arr;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "val-api", "FuncName": "GetTableInputValueArr", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//获取单身表格元素值数组
    }

    /** action-api **/
    var _em_action_api = {
        "exportExcel_Proc": function (options, callback) {
            try {
                var defaults = {
                    obj: "#tb_departments",//列名拿取表格ID
                    ProcName: '',//临时数据存储过程
                    ExcelName: '', //导出Excel名称        
                    PageType: '1',  //是否分页存储过程
                }, opts = $.extend(defaults, options), obj = opts.obj, ProcName = opts.ProcName, ExcelName = opts.ExcelName, PageType = opts.PageType;
                if (!_em_options.isEmpty(ProcName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "exportExcel_Proc", "MSG": "存储过程名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (PageType != '1' && PageType != '0') {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "exportExcel_Proc", "MSG": "存储过程是否分页不能为除1（分页） 0（不分页）以外的值" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(obj)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "exportExcel_Proc", "MSG": "表格ID不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                _em_options.ShowColumnsFresh_BootStrap($(obj).bootstrapTable("getOptions").columns);
                layer.open({
                    type: 2,
                    title: ['导出Excel设置', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                    shade: [0.3, '#393D49'],
                    closeBtn: 1,
                    area: ['600px', '400px'],
                    content: '/excel/exportprocdata?ExcelName=' + ExcelName + '&ProcName=' + ProcName + '&type=' + PageType,
                    btn: ['关闭'],
                    btnAlign: 'c',
                    yes: function (index, layero) { layer.close(index); },
                    success: function (layero, index) {
                        $(layero).find(".layui-layer-btn").css("border-top", "1px solid rgb(218, 222, 219)");
                        $(layero).find(".layui-layer-btn a").eq(0).css("color", "#fff").css("background-color", "#ffa31c").css("border-color", "#ffa726");
                        var d = { "RST": "SUC", "ApiName": "action-api", "FuncName": "exportExcel_Proc", "ICO": "1", "MSG": "操作成功" }; _em_options.GeneraCallBack(d, callback);
                    }
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "exportExcel_Proc", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//存储过程临时数据导出Excel
        "exportExcel_Table": function (options, callback) {
            try {
                var defaults = {
                    obj: "#tb_departments",//列名拿取表格ID
                    TableName: '',//导出数据表
                    ExcelName: '', //导出Excel名称   
                }, opts = $.extend(defaults, options), obj = opts.obj, TableName = opts.TableName, ExcelName = opts.ExcelName;
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "exportExcel_Table", "MSG": "数据表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(obj)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "exportExcel_Table", "MSG": "表格ID不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                _em_options.CreateHiddenInput([
                    "ExportExcelByTable_TableName",
                    "ExportExcelByTable_FILTER",
                    "ExportExcelByTable_ORDER"
                ])
                $("#ExportExcelByTable_TableName").val(TableName);
                $("#ExportExcelByTable_FILTER").val(FILTER);
                $("#ExportExcelByTable_ORDER").val($(obj).bootstrapTable("getOptions").sortName + " " + $(obj).bootstrapTable("getOptions").sortOrder)
                _em_options.ShowColumnsFresh_BootStrap($(obj).bootstrapTable("getOptions").columns);
                layer.open({
                    type: 2,
                    title: ['导出Excel设置', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                    shade: [0.3, '#393D49'],
                    closeBtn: 1,
                    area: ['600px', '400px'],
                    content: '/excel/exporttabledata?ExcelName=' + ExcelName,
                    btn: ['关闭'],
                    btnAlign: 'c',
                    yes: function (index, layero) { layer.close(index); },
                    success: function (layero, index) {
                        $(layero).find(".layui-layer-btn").css("border-top", "1px solid rgb(218, 222, 219)");
                        $(layero).find(".layui-layer-btn a").eq(0).css("color", "#fff").css("background-color", "#ffa31c").css("border-color", "#ffa726");
                        var d = { "RST": "SUC", "ApiName": "action-api", "FuncName": "exportExcel_Table", "ICO": "1", "MSG": "操作成功" }; _em_options.GeneraCallBack(d, callback);
                    }
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "exportExcel_Table", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//表数据导出Excel
        "Add_Single": function (options, callback) {
            try {
                var defaults = {
                    TableName: "",//添加表名
                    AddJson: [//添加Json
                        //{
                        //    CREATEUSER: Session.UserCode,
                        //    CRAATEDATE: ""
                        //}
                    ]
                }, opts = $.extend(defaults, options), TableName = opts.TableName, AddJson = opts.AddJson;
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Add_Single", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.CheckJson(AddJson)) {
                    var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "Add_Single", "ICO": "2", "MSG": "添加字段Json对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    _em_options.Json_Resolve_Single(AddJson);
                    if (_em_options.JsonStatus == '1') {
                        var AddField = _em_options.JsonKeyArr[0].join(",");
                        var AddValue = "\'" + _em_options.JsonValueArr[0].join("\',\'") + "\'";
                        _em_options.VarJsonRemove();
                        $.P8.common().postJSON({
                            url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                            data: {
                                "ProName": "proc_Action_Add",
                                "ParamCount": "4",
                                "Param": [
                                    { "key": "tabname", "value": TableName, "type": "String" },
                                    { "key": "fields", "value": AddField, "type": "String" },
                                    { "key": "values", "value": AddValue, "type": "String" },
                                    { "key": "IsSingle", "value": "0", "type": "String" }
                                ]
                            },
                            async: true
                        }, function (d) {
                            d.FuncName = "Add_Single";
                            d.ApiName = "action-api";
                            _em_options.GeneraCallBack(d, callback);
                        });
                    }
                    else {
                        var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "Add_Single", "ICO": "2", "MSG": _em_options.JsonMsg };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "Add_Single", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//动态单条增
        "Add_Multiple": function (options, callback) {
            try {
                var defaults = {
                    TableName: "",//添加表名
                    AddJson: [//添加Json
                        //{
                        //    CREATEUSER: Session.UserCode,
                        //    CRAATEDATE: "1997-12-13"
                        //},
                        //{
                        //    CREATEUSER: Session.UserCode,
                        //    CRAATEDATE: "1997-12-13"
                        //}
                    ]
                }, opts = $.extend(defaults, options), TableName = opts.TableName, AddJson = opts.AddJson;
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Add_Multiple", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.CheckJson(AddJson)) {
                    var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "Add_Multiple", "ICO": "2", "MSG": "添加字段Json对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    _em_options.Json_Resolve_Multiple(AddJson);
                    if (_em_options.JsonStatus == '1') {
                        var AddField = _em_options.JsonKeyArr[0].join(",");
                        var AddValue = "";
                        for (var i = 0; i < _em_options.JsonValueArr.length; i++) {
                            AddValue += "\'" + _em_options.JsonValueArr[i].join("\',\'") + "\'|";
                        }
                        _em_options.VarJsonRemove();
                        $.P8.common().postJSON({
                            url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                            data: {
                                "ProName": "proc_Action_Add",
                                "ParamCount": "4",
                                "Param": [
                                    { "key": "tabname", "value": TableName, "type": "String" },
                                    { "key": "fields", "value": AddField, "type": "String" },
                                    { "key": "values", "value": AddValue, "type": "String" },
                                    { "key": "IsSingle", "value": "1", "type": "String" }
                                ]
                            },
                            async: true
                        }, function (d) {
                            d.FuncName = "Add_Multiple";
                            d.ApiName = "action-api";
                            _em_options.GeneraCallBack(d, callback);
                        });
                    }
                    else {
                        var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "Add_Multiple", "ICO": "2", "MSG": _em_options.JsonMsg };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "Add_Multiple", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//动态多条增
        "Update_Single": function (options, callback) {
            try {
                var defaults = {
                    TableName: "",//更新表名
                    UpdateJson: [//更新Json
                        //{
                        //    MODIUSER: Session.UserCode,
                        //    MODIDATE: "1997-12-13"
                        //}
                    ],
                    UpdateWhereJson: [//更新条件
                        //{
                        //    ID: "0"
                        //}
                    ],
                    IsValue: "1"//是否字符串
                }, opts = $.extend(defaults, options), TableName = opts.TableName, UpdateJson = opts.UpdateJson, UpdateWhereJson = opts.UpdateWhereJson, IsValue = opts.IsValue;
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Single", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.CheckJson(UpdateJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Single", "MSG": "更新字段Json对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else if (!_em_options.CheckJson(UpdateWhereJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Single", "MSG": "更新条件Json对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    if (IsValue == '1')
                        _em_options.Json_Eval_Col_Single(UpdateJson);
                    else
                        _em_options.Json_Eval_Col_Single_Novalue(UpdateJson);
                    if (_em_options.JsonStatus == '1') {
                        var UpdateContent = _em_options.JsonEval;
                        _em_options.VarJsonEvalRemove();
                        _em_options.Json_Eval_Where_Single(UpdateWhereJson);
                        if (_em_options.JsonStatus == '1') {
                            var Where = _em_options.JsonEval;
                            _em_options.VarJsonEvalRemove();
                            $.P8.common().postJSON({
                                url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                                data: {
                                    "ProName": "proc_Action_Update",
                                    "ParamCount": "5",
                                    "Param": [
                                        { "key": "tabname", "value": TableName, "type": "String" },
                                        { "key": "updateaction", "value": UpdateContent, "type": "String" },
                                        { "key": "from", "value": "-1", "type": "String" },
                                        { "key": "where", "value": Where, "type": "String" },
                                        { "key": "IsSingle", "value": "0", "type": "String" }
                                    ]
                                },
                                async: true
                            }, function (d) {
                                d.ApiName = "action-api";
                                d.FuncName = "Update_Single";
                                _em_options.GeneraCallBack(d, callback);
                            });
                        }
                        else {
                            var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Single", "MSG": _em_options.JsonMsg };
                            _em_options.GeneraCallBack(d, callback);
                        }
                    }
                    else {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Single", "MSG": _em_options.JsonMsg };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "Update_Single", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//动态单条修改
        "Update_Multiple": function (options, callback) {
            try {
                var defaults = {
                    TableName: "",//更新表名
                    UpdateJson: [//更新Json
                        //{
                        //    MODIUSER: Session.UserCode,
                        //    MODIDATE: "1997-12-13"
                        //},
                        //{
                        //    MODIUSER: Session.UserCode,
                        //    MODIDATE: "1997-12-13"
                        //}
                    ],
                    UpdateWhereJson: [//更新条件
                        //{
                        //    ID: "0"
                        //},
                        //{
                        //    ID: "0"
                        //},
                    ],
                    IsValue: "1"//是否字符串
                }, opts = $.extend(defaults, options), TableName = opts.TableName, UpdateJson = opts.UpdateJson, UpdateWhereJson = opts.UpdateWhereJson, IsValue = opts.IsValue;
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Multiple", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.CheckJson(UpdateJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Multiple", "MSG": "更新字段Json对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else if (!_em_options.CheckJson(UpdateWhereJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Multiple", "MSG": "更新条件Json对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    if (IsValue == '1')
                        _em_options.Json_Eval_Col_Multiple(UpdateJson, "|");
                    else
                        _em_options.Json_Eval_Col_Multiple_Novalue(UpdateJson, "|");
                    if (_em_options.JsonStatus == '1') {
                        var UpdateContent = _em_options.JsonEval;
                        _em_options.VarJsonEvalRemove();
                        _em_options.Json_Eval_Where_Multiple(UpdateWhereJson, "|");
                        if (_em_options.JsonStatus == '1') {
                            var Where = _em_options.JsonEval;
                            _em_options.VarJsonEvalRemove();
                            $.P8.common().postJSON({
                                url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                                data: {
                                    "ProName": "proc_Action_Update",
                                    "ParamCount": "5",
                                    "Param": [
                                        { "key": "tabname", "value": TableName, "type": "String" },
                                        { "key": "updateaction", "value": UpdateContent, "type": "String" },
                                        { "key": "from", "value": "-1", "type": "String" },
                                        { "key": "where", "value": Where, "type": "String" },
                                        { "key": "IsSingle", "value": "1", "type": "String" }
                                    ]
                                },
                                async: true
                            }, function (d) {
                                d.ApiName = "action-api";
                                d.FuncName = "Update_Multiple";
                                _em_options.GeneraCallBack(d, callback);
                            });
                        }
                        else {
                            var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Multiple", "MSG": _em_options.JsonMsg };
                            _em_options.GeneraCallBack(d, callback);
                        }
                    }
                    else {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Update_Multiple", "MSG": _em_options.JsonMsg };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "Update_Multiple", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//动态多条修改
        "Delete_Single": function (options, callback) {
            try {
                var defaults = {
                    TableName: "",//删除表名
                    DeleteKey: "",//删除键
                    DeleteValue: ""//删除值
                }, opts = $.extend(defaults, options), TableName = opts.TableName, DeleteKey = opts.DeleteKey, DeleteValue = opts.DeleteValue;
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Delete_Single", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(DeleteKey)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Delete_Single", "MSG": "删除键不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(DeleteValue)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Delete_Single", "MSG": "删除值不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                $.P8.common().postJSON({
                    url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                    data: {
                        "ProName": "proc_Action_Delete",
                        "ParamCount": "4",
                        "Param": [
                            { "key": "tabname", "value": TableName, "type": "String" },
                            { "key": "id", "value": DeleteKey, "type": "String" },
                            { "key": "idvalue", "value": DeleteValue, "type": "String" },
                            { "key": "IsSingle", "value": "0", "type": "String" }
                        ]
                    },
                    async: true
                }, function (d) {
                    d.ApiName = "action-api";
                    d.FuncName = "Delete_Single";
                    _em_options.GeneraCallBack(d, callback);
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "action-api", "FuncName": "Delete_Single", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//动态单条件删除
        "Delete_Multiple": function (options, callback) {
            try {
                var defaults = {
                    TableName: "",//删除表名
                    DeleteJson: [//删除Json
                        //{
                        //    ID: "0",
                        //    ID1: "0"
                        //}
                    ]
                }, opts = $.extend(defaults, options), TableName = opts.TableName, DeleteJson = opts.DeleteJson;
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Delete_Multiple", "MSG": "删除值不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.CheckJson(DeleteJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "Delete_Multiple", "MSG": "删除条件Json对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    _em_options.Json_Resolve_Single(DeleteJson);
                    if (_em_options.JsonStatus == '1') {
                        var ID = "";
                        var IDValue = "";
                        for (var i = 0; i < _em_options.JsonKeyArr[0].length; i++) {
                            ID += _em_options.JsonKeyArr[0][i] + '|';
                            IDValue += '\'' + _em_options.JsonValueArr[0][i] + '\'|';
                        }
                        _em_options.VarJsonRemove();
                        $.P8.common().postJSON({
                            url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                            data: {
                                "ProName": "proc_Action_Delete",
                                "ParamCount": "4",
                                "Param": [
                                    { "key": "tabname", "value": TableName, "type": "String" },
                                    { "key": "id", "value": ID, "type": "String" },
                                    { "key": "idvalue", "value": IDValue, "type": "String" },
                                    { "key": "IsSingle", "value": "1", "type": "String" }
                                ]
                            },
                            async: true
                        }, function (d) {
                            d.ApiName = "action-api";
                            d.FuncName = "Delete_Multiple";
                            _em_options.GeneraCallBack(d, callback);
                        });
                    }
                    else {
                        var d = { "RST": "ERR", "ICO": "2", "FuncName": "Delete_Multiple", "ApiName": "action-api", "MSG": _em_options.JsonMsg };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "FuncName": "Delete_Multiple", "ApiName": "action-api", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//动态多条件删除
        "ExecProcedure": function (options, callback) {
            try {
                var defaults = {
                    ProcName: "",//存储过程名
                    ProcParam: [//存储过程参数Json
                        //{
                        //    Param1: "0",
                        //    Param2: "0"
                        //}
                    ]
                }, opts = $.extend(defaults, options), ProcName = opts.ProcName, ProcParam = opts.ProcParam;
                if (!_em_options.isEmpty(ProcName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "ExecProcedure", "MSG": "存储过程名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.CheckJson(ProcParam)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "ExecProcedure", "MSG": "存储过程参数Json对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    _em_options.Json_Resolve_Single(ProcParam);
                    if (_em_options.JsonStatus == '1') {
                        var ParamCount = _em_options.JsonKeyArr[0].length;
                        var Param = [];
                        for (var i = 0; i < ParamCount; i++) {
                            Param.push({ "key": _em_options.JsonKeyArr[0][i], "value": _em_options.JsonValueArr[0][i], "type": "String" });
                        }
                        _em_options.VarJsonRemove();
                        $.P8.common().postJSON({
                            url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                            data: {
                                "ProName": ProcName,
                                "ParamCount": ParamCount,
                                "Param": Param
                            }, async: true //异步请求
                        }, function (d) {
                            d.ApiName = "action-api";
                            d.FuncName = "ExecProcedure";
                            _em_options.GeneraCallBack(d, callback);
                        });
                    }
                    else {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "ExecProcedure", "MSG": _em_options.JsonMsg };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "FuncName": "ExecProcedure", "ApiName": "action-api", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//动态执行存储过程
        "ExecSqlText": function (options, callback) {
            try {
                var defaults = {
                    SqlString: "",//执行SQL语句
                }, opts = $.extend(defaults, options), SqlString = opts.SqlString;
                if (!_em_options.isEmpty(SqlString)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "ExecSqlText", "MSG": "SQL语句不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                $.P8.common().postJSON({
                    url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                    data: {
                        "ProName": "sp_sqlexec",
                        "ParamCount": "1",
                        "Param": [
                            { "key": "p1", "value": SqlString, "type": "String" }
                        ]
                    },
                    async: true
                }, function (d) {
                    d.ApiName = "action-api";
                    d.FuncName = "ExecSqlText";
                    _em_options.GeneraCallBack(d, callback);
                });
            } catch (e) {
                var d = { "RST": "ERR", "FuncName": "ExecSqlText", "ApiName": "action-api", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//执行SQL语句
        "QueryRender_Token": function (options, callback) {
            try {
                var defaults = {
                    TableName: "",//查询表名
                    Filter: "",//查询条件
                    Order: "",//排序
                    RenderHtmlID: "",//渲染HTML元素标识
                    BeRenderHtmlID: ""//被渲染元素标识
                }, opts = $.extend(defaults, options), TableName = opts.TableName, Filter = opts.Filter, Order = opts.Order, RenderHtmlID = opts.RenderHtmlID, BeRenderHtmlID = opts.BeRenderHtmlID;
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryRender_Token", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(RenderHtmlID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryRender_Token", "MSG": "渲染HTML元素标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(BeRenderHtmlID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryRender_Token", "MSG": "被渲染元素标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                $.P8.common().postJSON({
                    url: 'api/datainterface/getdatabytable', usercode: Session.UserCode,
                    data: {
                        "TabName": TableName,
                        "Filter": Filter,
                        "Order": Order,
                    }, async: true
                }, function (d) {
                    //渲染
                    $.P8.laytpl($("#" + RenderHtmlID + "").html()).render(d, function (html) {
                        $("#" + BeRenderHtmlID + "").html(html);
                        top.layer.closeAll('loading');
                    });
                    d.ApiName = "action-api";
                    d.FuncName = "QueryRender_Token";
                    _em_options.GeneraCallBack(d, callback);
                });
            } catch (e) {
                var d = { "RST": "ERR", "FuncName": "QueryRender_Token", "ApiName": "action-api", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//查询渲染模板（Token验证）
        "QueryRender_NoToken": function (options, callback) {
            try {
                var defaults = {
                    SYSURL: "",//接口路径
                    TableName: "",//查询表名
                    Filter: "",//查询条件
                    Order: "",//排序
                    RenderHtmlID: "",//渲染HTML元素标识
                    BeRenderHtmlID: ""//被渲染元素标识
                }, opts = $.extend(defaults, options), SYSURL = opts.SYSURL, TableName = opts.TableName, Filter = opts.Filter, Order = opts.Order, RenderHtmlID = opts.RenderHtmlID, BeRenderHtmlID = opts.BeRenderHtmlID;
                if (!_em_options.isEmpty(SYSURL)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryRender_NoToken", "MSG": "接口路径不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryRender_NoToken", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(RenderHtmlID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryRender_NoToken", "MSG": "渲染HTML元素标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(BeRenderHtmlID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryRender_NoToken", "MSG": "被渲染元素标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                $.ajax({
                    url: SYSURL + 'api/flowreport/GetDataByDataSource',
                    type: 'post',
                    dataType: 'json',
                    async: true,
                    contentType: "application/json",
                    data: JSON.stringify({
                        "TabName": TableName,
                        "Filter": Filter,
                        "Order": Order,
                    }),
                    success: function (d) {
                        $.P8.laytpl($("#" + RenderHtmlID + "").html()).render(d, function (html) {
                            $("#" + BeRenderHtmlID + "").html(html);
                            top.layer.closeAll('loading');
                        });
                        d.ApiName = "action-api";
                        d.FuncName = "QueryRender_NoToken";
                        _em_options.GeneraCallBack(d, callback);
                    },
                    error: function () {
                        var d = { "RST": "ERR", "ICO": "2", "FuncName": "QueryRender_NoToken", "ApiName": "action-api", "MSG": "请求失败" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                });
            } catch (e) {
                var d = { "RST": "ERR", "FuncName": "QueryRender_NoToken", "ApiName": "action-api", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//查询渲染模板（无Token验证）
        "QueryBind_Token": function (options, callback) {
            try {
                var defaults = {
                    TableName: "",//查询表名
                    Filter: "",//查询条件
                    Order: "",//排序
                    BindHtmlPanel: "",//赋值HTML元素容器标识
                    DataColAttr: "ID"//赋值元素依赖属性
                }, opts = $.extend(defaults, options), TableName = opts.TableName, Filter = opts.Filter, Order = opts.Order, BindHtmlPanel = opts.BindHtmlPanel, DataColAttr = opts.DataColAttr;
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryBind_Token", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(BindHtmlPanel)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryBind_Token", "MSG": "赋值HTML元素容器标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(DataColAttr)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryBind_Token", "MSG": "赋值元素依赖属性不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                //数据获取
                $.P8.common().postJSON({
                    url: 'api/datainterface/getdatabytable', usercode: Session.UserCode,
                    data: {
                        "TabName": TableName,
                        "Filter": Filter,
                        "Order": Order,
                    },
                    async: true //同步请求
                }, function (d) {
                    if (d.RST == "SUC") {
                        var BindHtml = BindHtmlPanel;
                        for (var i = 0; i < BindHtml.length; i++) {
                            let _name = "d.DATA[0]." + BindHtml.eq(i).attr(DataColAttr);
                            if (BindHtml.eq(i).val() != undefined) {
                                BindHtml.eq(i).val(unescape(eval(_name)));
                            }
                            else if (BindHtml.eq(i).html() != undefined) {
                                BindHtml.eq(i).html(unescape(eval(_name)));
                            }
                            else {
                                alert("绑定元素异常！");
                            }
                        }
                    }
                    d.ApiName = "action-api";
                    d.FuncName = "QueryBind_Token";
                    _em_options.GeneraCallBack(d, callback);
                });
            } catch (e) {
                var d = { "RST": "ERR", "FuncName": "QueryBind_Token", "ApiName": "action-api", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//数据绑定（Token验证）
        "QueryBind_NoToken": function (options, callback) {
            try {
                var defaults = {
                    SYSURL: "",//接口路径
                    TableName: "",//查询表名
                    Filter: "",//查询条件
                    Order: "",//排序
                    BindHtmlPanel: "",//赋值HTML元素容器标识
                    DataColAttr: "ID"//赋值元素依赖属性
                }, opts = $.extend(defaults, options), SYSURL = opts.SYSURL, TableName = opts.TableName, Filter = opts.Filter, Order = opts.Order, BindHtmlPanel = opts.BindHtmlPanel, DataColAttr = opts.DataColAttr;
                if (!_em_options.isEmpty(SYSURL)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryBind_NoToken", "MSG": "接口路径不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryBind_NoToken", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(BindHtmlPanel)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryBind_NoToken", "MSG": "赋值HTML元素容器标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(DataColAttr)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "action-api", "FuncName": "QueryBind_NoToken", "MSG": "赋值元素依赖属性不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                $.ajax({
                    url: SYSURL + 'api/flowreport/GetDataByDataSource',
                    type: 'post',
                    dataType: 'json',
                    async: true,
                    contentType: "application/json",
                    data: JSON.stringify({
                        "TabName": TableName,
                        "Filter": Filter,
                        "Order": Order,
                    }),
                    success: function (d) {
                        if (d.RST == "SUC") {
                            var BindHtml = BindHtmlPanel;
                            for (var i = 0; i < BindHtml.length; i++) {
                                let _name = "d.DATA[0]." + BindHtml.eq(i).attr(DataColAttr);
                                if (BindHtml.eq(i).val() != undefined) {
                                    BindHtml.eq(i).val(unescape(eval(_name)));
                                }
                                else if (BindHtml.eq(i).html() != undefined) {
                                    BindHtml.eq(i).html(unescape(eval(_name)));
                                }
                                else {
                                    alert("绑定元素异常！");
                                }
                            }
                        }
                        d.ApiName = "action-api";
                        d.FuncName = "QueryBind_NoToken";
                        _em_options.GeneraCallBack(d, callback);
                    },
                    error: function () {
                        var d = { "RST": "ERR", "ICO": "2", "FuncName": "QueryBind_NoToken", "ApiName": "action-api", "MSG": "请求失败" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                });
            } catch (e) {
                var d = { "RST": "ERR", "FuncName": "QueryBind_NoToken", "ApiName": "action-api", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//数据绑定（无Token验证）
    }

    /** browser-api **/
    var _em_browser_api = {
        "addFav": function (options, callback) {
            try {
                var defaults = {
                    url: "www.baidu.com",//地址
                    title: '百度一下',//标题
                }, opts = $.extend(defaults, options), url = opts.url, title = opts.title;
                if (document.all) {
                    w.external.addFavorite(url, title);
                } else if (w.sidebar) {
                    w.sidebar.addPanel(url, title, '');
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "browser-api", "FuncName": "addFav", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//加入收藏夹
    }

    /** convert-api **/
    var _em_convert_api = {
        "ConvertNull": function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options), val_null = $("input,textarea"), html_null = $("td,font");
                for (var i = 0; i < val_null.length; i++) {
                    ($(val_null[i]).val() == 'null') ? $(val_null[i]).val('') : "";
                }
                for (var i = 0; i < html_null.length; i++) {
                    ($(html_null[i]).html() == 'null') ? $(html_null[i]).html('') : "";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "convert-api", "FuncName": "ConvertNull", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//空值转换空串
        "ConvertNull_CustomVal": function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options), val_null = $("input[null-convert='1'],textarea[null-convert='1']"), html_null = $("td[null-convert='1'],font[null-convert='1']");
                for (var i = 0; i < val_null.length; i++) {
                    ($(val_null[i]).val() == 'null' || $(val_null[i]).val() == '') ? $(val_null[i]).val($(val_null[i]).attr('convert-val')) : "";
                }
                for (var i = 0; i < html_null.length; i++) {
                    ($(html_null[i]).html() == 'null' || $(html_null[i]).html() == '') ? $(html_null[i]).html($(html_null[i]).attr('convert-val')) : "";
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "convert-api", "FuncName": "ConvertNull_CustomVal", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//空值转换自定义字符（需添加自定义属性null-convert='1' convert-val='无' ）
        "ConvertTrim": function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options), val_Trim = $("input,textarea"), html_Trim = $("td,font");
                for (var i = 0; i < val_Trim.length; i++) {
                    $(val_Trim[i]).val(_em_options.trim($(val_Trim[i]).val()));
                }
                for (var i = 0; i < html_Trim.length; i++) {
                    $(html_Trim[i]).html(_em_options.trim($(html_Trim[i]).html()));
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "convert-api", "FuncName": "ConvertTrim", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//去掉左右空格
    }

    /** table-api **/
    var _em_table_api = {
        "NoEditTable": function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options), NoeditTable = $("table[table-noeidt='1']");
                for (var i = 0; i < NoeditTable.length; i++) {
                    $(NoeditTable[i]).find("input").attr("readonly", "readonly");
                    $(NoeditTable[i]).find("select").attr("disabled", "disabled");
                    $(NoeditTable[i]).find("textarea").attr("readonly", "readonly");
                    $(NoeditTable[i]).find("input").attr("onclick", "");
                    $(NoeditTable[i]).find("button").remove();
                    $("button[tbname='" + $(NoeditTable[i]).attr("id") + "']").remove();
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "table-api", "FuncName": "NoEditTable", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//编辑不能修改表格[table-noeidt='1'];
        "RemoveNoneTd": function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options);
                $("td[data-none='1']").remove();
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "table-api", "FuncName": "RemoveNoneTd", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//移除[data-none='1']表格
    }

    /** extend-api **/
    var _em_extend_api = {
        "ComBine": function (options, callback) {
            try {
                var defaults = {
                    SYSURL: window.apiurl,//页面表格是否变换金额
                    Page_ICM: 0,//页面表格是否变换金额
                    Page_ICZ: 0,//页面表格是否变换0 => 0.00
                    Page_AC: [],//页面表格操作列
                    TableObj: $("#tb_departments tbody"),//表体对象
                    EndRow: "0",//结束行
                    ICB: 0,//是否合并
                    ICB_AC: [],//是否合并_合并列
                    ICBRely: 0,//是否依赖合并
                    ICBRely_RC: [],//是否依赖合并_依赖列
                    ICBRely_AC: [],//是否依赖合并_合并列
                    ICBSRely: 0,//是否依赖合并计算
                    ICBSRely_RC: [],//是否依赖合并计算_依赖列
                    ICBSRely_AC: [],//是否依赖合并计算_合并列
                    ITotal: 0,//是否页合计
                    Total_M: "页合计",//页合计意思
                    Total_M_I: 0,//页合计所在索引
                    Total_M_ColS: 1,//页合计列合并
                    Total_M_CA: "center",//页合计内容对齐方式
                    Total_M_CC: "black",//页合计显示颜色,
                    Total_M_AT: "append",//页合计追加方式
                    Total_AC: [],//页合计_合并列
                    Total_SR: 0,//页合计开始行
                    Total_ICM: 0,//页合计数据是否变换金额
                    Total_ICZ: 0,//页合计数据是否变换0 || 0.00=> ""
                    ITotalD: 0,//是否总合计
                    TotalD_M: "总合计",//总合计意思
                    TotalD_M_I: 0,//总合计所在索引
                    TotalD_M_ColS: 1,//总合计列合并
                    TotalD_M_CA: "center",//总合计内容对齐方式
                    TotalD_M_CC: "black",//总合计显示颜色,
                    TotalD_M_AT: "append",//总合计追加方式
                    TotalD_AC: [],//总合计_合并列
                    TotalD_SR: 0,//总合计开始行
                    TotalD_ICM: 0,//总合计数据是否变换金额
                    TotalD_ICZ: 0,//总合计数据是否变换0 || 0.00=> ""
                    TotalD_DS: "",//总合计取值数据源
                    TotalD_Filter: "",//总合计取值数据源条件
                    TotalD_Json: [
                        //{
                            //"Col1":"0",
                            //"Col2":"1",
                        //}
                    ]
                },
                    opts = $.extend(defaults, options),
                    TableObj = opts.TableObj,
                    EndRow = opts.EndRow,
                    Page_ICM = opts.Page_ICM,
                    Page_ICZ = opts.Page_ICZ,
                    Page_AC = opts.Page_AC,
                    ICB = opts.ICB,
                    ICBRely = opts.ICBRely,
                    ICBSRely = opts.ICBSRely,
                    ITotal = opts.ITotal,
                    SYSURL = opts.SYSURL,
                    ITotalD = opts.ITotalD;
                if (TableObj.length == 0) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "找不到指定表格" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (Page_ICM == '1' || Page_ICZ == '1') {
                    if (!_em_options.CheckArray(Page_AC)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "当指定了页面变更时 需设置Page_AC指定列属性" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                }
                if (ITotal == '1') {
                    if (0 > opts.Total_M_I || opts.Total_M_I >= TableObj[0].rows[0].cells.length) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "页合计显示索引不正确" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                    if (1 > opts.Total_M_ColS || opts.Total_M_ColS > TableObj[0].rows[0].cells.length) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "页合计合并列不正确" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                    if (opts.Total_SR >= TableObj[0].rows.length) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "页合计开始行大于表格长度" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                    if (!_em_options.CheckArray(opts.Total_AC)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "页合计操作列值错误" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                }
                if (ITotalD == '1') {
                    if (0 > opts.TotalD_M_I || opts.TotalD_M_I >= TableObj[0].rows[0].cells.length) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "总合计显示索引不正确" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                    if (1 > opts.TotalD_M_ColS || opts.TotalD_M_ColS > TableObj[0].rows[0].cells.length) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "总合计合并列不正确" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                    if (opts.TotalD_SR >= TableObj[0].rows.length) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "总合计开始行大于表格长度" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                    if (!_em_options.CheckArray(opts.TotalD_AC)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "总合计操作列值错误" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                }
                if (ICBRely == '1') {
                    if (!_em_options.CheckArray(opts.ICBRely_RC) && isNaN(opts.ICBRely_RC)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "依赖合并依赖列值错误" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                    if (!_em_options.CheckArray(opts.ICBRely_AC)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "依赖合并合并列值错误" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                }
                if (ICBSRely == '1') {
                    if (!_em_options.CheckArray(opts.ICBSRely_RC) && isNaN(opts.ICBSRely_RC)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "依赖计算合并依赖列值错误" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                    if (!_em_options.CheckArray(opts.ICBSRely_AC)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "依赖计算合并合并列值错误" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                }
                if (ICB == '1') {
                    if (!_em_options.CheckArray(opts.ICB_AC)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ComBine", "MSG": "相同合并合并列值错误" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                }
                //============================== Step 1 页合计列添加 ====================================//
                if (ITotal == '1') {
                    //=================== Step 1.1 元素赋值  ===================//
                    var Total_M = opts.Total_M,
                        Total_M_I = opts.Total_M_I,
                        Total_M_ColS = opts.Total_M_ColS,
                        Total_M_CC = opts.Total_M_CC,
                        Total_M_CA = opts.Total_M_CA,
                        Total_M_AT = opts.Total_M_AT,
                        Total_AC = opts.Total_AC,
                        Total_SR = opts.Total_SR,
                        Total_ICM = opts.Total_ICM,
                        Total_ICZ = opts.Total_ICZ;
                    var Total_template = "<tr data-as='Total'>";
                    for (var i = 0; i < TableObj[0].rows[0].cells.length + 1 - Total_M_ColS; i++)
                        (i == Total_M_I) ?
                            Total_template += "<td colspan='" + Total_M_ColS + "' style='text-align:" + Total_M_CA + ";font-weight:bold;color:" + Total_M_CC + ";'>" + Total_M + "</td>" :
                            Total_template += "<td style='text-align:" + Total_M_CA + ";font-weight:bold;color:" + Total_M_CC + ";'></td>";
                    Total_template += "</tr>";
                    var append = "TableObj." + Total_M_AT + "(\"" + Total_template + "\")";
                    eval(append);

                    //=================== Step 1.2 数值合计  ===================//
                    //页合计行
                    var tr_Total = TableObj.find("tr[data-as='Total']");
                    //除页合计行
                    var tr_NoTotal = TableObj.find("tr[data-as!='Total']");
                    for (var q = 0; q < Total_AC.length; q++) {
                        var total = 0;
                        for (var i = Total_SR; i < tr_NoTotal.length; i++) {
                            var td = tr_NoTotal[i].cells[Total_AC[q]];
                            if (td.getAttribute("data-none") != '1') {
                                var t = 0;
                                if ($(td).find("input").length != 0) {
                                    t = parseFloat($(td).find("input").val());
                                }
                                else if ($(td).find("textarea").length != 0) {
                                    t = parseFloat($(td).find("textarea").val());
                                }
                                else {
                                    t = parseFloat(td.innerHTML);
                                }

                                if (t) total += t;
                            }
                        }
                        var td = tr_Total[0].cells[Total_AC[q] + 1 - Total_M_ColS];
                        if ($(td).find("input").length != 0) {
                            $(td).find("input").val(_em_options.Fixed_2(total));
                        }
                        else if ($(td).find("textarea").length != 0) {
                            $(td).find("textarea").val(_em_options.Fixed_2(total));
                        }
                        else {
                            td.innerHTML = _em_options.Fixed_2(total);
                        }
                    }
                    //=================== Step 1.3 金额变换  ===================//
                    if (Total_ICM == '1') {
                        for (var i = 0; i < Total_AC.length; i++) {
                            tr_Total[0].cells[Total_AC[i] + 1 - Total_M_ColS].innerText = _em_options.ChangeMoney_Clidren(tr_Total[0].cells[Total_AC[i] + 1 - Total_M_ColS].innerText);
                        }
                    }
                    //=================== Step 1.4 0 || 0.00=> ""  ===================//
                    if (Total_ICZ == '1') {
                        for (var i = 0; i < Total_AC.length; i++) {
                            if (_em_options.trim(tr_Total[0].cells[Total_AC[i]].innerText) == '0.00' || _em_options.trim(tr_Total[0].cells[Total_AC[i]].innerText) == '0') {
                                tr_Total[0].cells[Total_AC[i] + 1 - Total_M_ColS].innerText = '';
                            }
                        }
                    }
                }
                //============================== Step 2 总合计列添加 ====================================//
                if (ITotalD == '1') {
                    //=================== Step 2.1 元素赋值  ===================//
                    var TotalD_M = opts.TotalD_M,
                        TotalD_M_I = opts.TotalD_M_I,
                        TotalD_M_ColS = opts.Total_M_ColS,
                        TotalD_M_CA = opts.TotalD_M_CA,
                        TotalD_M_CC = opts.TotalD_M_CC,
                        TotalD_M_AT = opts.TotalD_M_AT,
                        TotalD_SR = opts.TotalD_SR,
                        TotalD_AC = opts.TotalD_AC,
                        TotalD_DS = opts.TotalD_DS,
                        TotalD_Filter = opts.TotalD_Filter,
                        TotalD_Json = opts.TotalD_Json,
                        TotalD_ICM = opts.TotalD_ICM,
                        TotalD_ICZ = opts.TotalD_ICZ;
                    //=================== Step 2.2 元素创建  ===================//
                    var TotalD_template = "<tr data-as='TotalD'>";
                    for (var i = 0; i < TableObj[0].rows[0].cells.length + 1 - TotalD_M_ColS; i++)
                        (i == TotalD_M_I) ?
                            TotalD_template += "<td colspan='" + TotalD_M_ColS + "' style='text-align:" + TotalD_M_CA + ";font-weight:bold;color:" + TotalD_M_CC + ";'>" + TotalD_M + "</td>" :
                            TotalD_template += "<td style='text-align:" + TotalD_M_CA + ";font-weight:bold;color:" + TotalD_M_CC + ";'></td>";
                    TotalD_template += "</tr>";
                    var append = "TableObj." + TotalD_M_AT + "(\"" + TotalD_template + "\")";
                    eval(append);
                    //总合计行
                    var tr_TotalD = TableObj.find("tr[data-as='TotalD']");
                    //除总合计行,页合计行
                    var tr_NoTotalD_NoTotal = TableObj.find("tr[data-as!='Total'][data-as!='TotalD']");
                    //=================== Step 2.3 合计计算  ===================//
                    var Field = "";
                    for (var i = 0; i < TotalD_Json.length; i++) {
                        var j = 1;
                        for (var key in TotalD_Json[i]) {
                            Field += "sum(" + key + ") as Col" + j + ","
                            j++;
                        }
                    }
                    var SqlString = "select " + $String.GetSubString(Field, 1) + " from " + TotalD_DS + " where " + TotalD_Filter + "";
                    $.ajax({
                        url: SYSURL + 'api/flowreport/GetDataByProcedure',
                        type: 'post',
                        dataType: 'json',
                        async: false,
                        contentType: "application/json",
                        data: JSON.stringify({
                            "ProName": "sp_sqlexec",
                            "ParamCount": "1",
                            "Param": [
                                { "key": "p1", "value": SqlString, "type": "String" }
                            ]
                        }),
                        success: function (d) {
                            //★
                            for (var i = 0; i < TotalD_Json.length; i++) {
                                var j = 1;
                                for (var key in TotalD_Json[i]) {
                                    var td = tr_TotalD[0].cells[parseFloat(TotalD_Json[i][key]) + 1 - parseFloat(TotalD_M_ColS)];
                                    if ($(td).find("input").length != 0) {
                                        $(td).find("input").val(_em_options.Fixed_2(eval("d.DATA[0].Col" + j)));
                                    }
                                    else if ($(td).find("textarea").length != 0) {
                                        $(td).find("textarea").val(_em_options.Fixed_2(eval("d.DATA[0].Col" + j)));
                                    }
                                    else {
                                        td.innerHTML = _em_options.Fixed_2(eval("d.DATA[0].Col" + j));
                                    }
                                    j++;
                                }
                            }
                            //=================== Step 2.4 金额变换  ===================//
                            if (TotalD_ICM == '1') {
                                for (var i = 0; i < TotalD_AC.length; i++) {
                                    tr_TotalD[0].cells[parseFloat(TotalD_AC[i]) + 1 - parseFloat(TotalD_M_ColS)].innerText = _em_options.ChangeMoney_Clidren(tr_TotalD[0].cells[parseFloat(TotalD_AC[i]) + 1 - parseFloat(TotalD_M_ColS)].innerText);
                                }
                            }
                            //=================== Step 2.5 0 || 0.00=> ""  ===================//
                            if (TotalD_ICZ == '1') {
                                for (var i = 0; i < TotalD_AC.length; i++) {
                                    if (_em_options.trim(tr_TotalD[0].cells[TotalD_AC[i]].innerText) == '0.00' || _em_options.trim(tr_TotalD[0].cells[TotalD_AC[i]].innerText) == '0') {
                                        tr_TotalD[0].cells[TotalD_AC[i] + 1 - TotalD_M_ColS].innerText = '';
                                    }
                                }
                            }
                        },
                        error: function () {
                            top.layer.msg('请求失败', { icon: 2, time: 2000 }, function () { });
                        }
                    });
                }
                //============================== Step 3 依赖合并 ====================================//
                if (ICBRely == '1') {
                    var EndRow = opts.EndRow,
                        RelyCol = opts.ICBRely_RC,
                        ActionCol = opts.ICBRely_AC;
                    var indexArray = ActionCol;
                    var NoTotaltr = TableObj.find("tr[data-as!='Total'][data-as!='TotalD']");
                    var NoTotaltrlength = TableObj.find("tr[data-as!='Total'][data-as!='TotalD']").length;
                    //设置为0时,检索所有行
                    if (EndRow == 0) {
                        EndRow = NoTotaltrlength - 1;
                    }
                    //指定数据行索引大于表格行数
                    if (EndRow >= NoTotaltrlength) {
                        return;
                    }
                    for (var q = 0; q < indexArray.length; q++) {
                        //检测指定的列索引是否超出表格列数
                        if (indexArray[q] >= NoTotaltr[0].cells.length) {
                            return;
                        }
                    }
                    for (var q = 0; q < indexArray.length; q++) {
                        var StartRow = 0;
                        //循环需要判断的数据行
                        for (var i = 0; i < EndRow; i++) {
                            var td = NoTotaltr[i].cells[indexArray[q]];
                            var td_next = NoTotaltr[i + 1].cells[indexArray[q]];
                            if ($(td).find("input").length != 0) {
                                if ($(td).find("input").val() == $(td_next).find("input").val()) {
                                    var Same = true;
                                    if (typeof (RelyCol) == 'number') {
                                        if ($(NoTotaltr[i].cells[RelyCol]).find("input").val() != $(NoTotaltr[i + 1].cells[RelyCol]).find("input").val()) {
                                            Same = false;
                                        }
                                    }
                                    else if (typeof (RelyCol) == 'object') {
                                        for (var yli = 0; yli < RelyCol.length; yli++) {
                                            if ($(NoTotaltr[i].cells[RelyCol[yli]]).find("input").val() != $(NoTotaltr[i + 1].cells[RelyCol[yli]]).find("input").val()) {
                                                Same = false;
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        Same = false;
                                    }
                                }
                                else {
                                    StartRow = i + 1;
                                    Same = true;
                                }
                            }
                            else if ($(td).find("textarea").length != 0) {
                                if ($(td).find("textarea").val() == $(td_next).find("textarea").val()) {
                                    var Same = true;
                                    if (typeof (RelyCol) == 'number') {
                                        if ($(NoTotaltr[i].cells[RelyCol]).find("textarea").val() != $(NoTotaltr[i + 1].cells[RelyCol]).find("textarea").val()) {
                                            Same = false;
                                        }
                                    }
                                    else if (typeof (RelyCol) == 'object') {
                                        for (var yli = 0; yli < RelyCol.length; yli++) {
                                            if ($(NoTotaltr[i].cells[RelyCol[yli]]).find("textarea").val() != $(NoTotaltr[i + 1].cells[RelyCol[yli]]).find("textarea").val()) {
                                                Same = false;
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        Same = false;
                                    }
                                }
                                else {
                                    StartRow = i + 1;
                                    Same = true;
                                }
                            }
                            else {
                                if (td.innerHTML == td_next.innerHTML) {
                                    var Same = true;
                                    if (typeof (RelyCol) == 'number') {
                                        if (NoTotaltr[i].cells[RelyCol].innerHTML != NoTotaltr[i + 1].cells[RelyCol].innerHTML) {
                                            Same = false;
                                        }
                                    }
                                    else if (typeof (RelyCol) == 'object') {
                                        for (var yli = 0; yli < RelyCol.length; yli++) {
                                            if (NoTotaltr[i].cells[RelyCol[yli]].innerHTML != NoTotaltr[i + 1].cells[RelyCol[yli]].innerHTML) {
                                                Same = false;
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        Same = false;
                                    }
                                }
                                else {
                                    StartRow = i + 1;
                                    Same = true;
                                }
                            }
                            //如果前面的同级数据行的值均相同，则进行单元格的合并
                            if (true == Same) {
                                //隐藏
                                NoTotaltr[i + 1].cells[indexArray[q]].style.display = 'none';
                                //如果记录要移除的行列索引
                                NoTotaltr[i + 1].cells[indexArray[q]].setAttribute("data-none", "1");
                                //更新rowSpan属性
                                NoTotaltr[StartRow].cells[indexArray[q]].rowSpan = (NoTotaltr[StartRow].cells[indexArray[q]].rowSpan | 0) + 1;
                            }
                            else {
                                StartRow = i + 1;
                            }
                        }
                    }
                }
                //============================== Step 4 依赖合并计算 ====================================//
                if (ICBSRely == '1') {
                    var EndRow = opts.EndRow,
                        RelyCol = opts.ICBSRely_RC,
                        ActionCol = opts.ICBSRely_AC;
                    var indexArray = ActionCol;
                    var NoTotaltr = TableObj.find("tr[data-as!='Total'][data-as!='TotalD']");
                    var NoTotaltrlength = TableObj.find("tr[data-as!='Total'][data-as!='TotalD']").length;
                    //设置为0时,检索所有行
                    if (EndRow == 0) {
                        EndRow = NoTotaltrlength - 1;
                    }
                    //指定数据行索引大于表格行数
                    if (EndRow >= NoTotaltrlength) {
                        return;
                    }
                    for (var q = 0; q < indexArray.length; q++) {
                        //检测指定的列索引是否超出表格列数
                        if (indexArray[q] >= NoTotaltr[0].cells.length) {
                            return;
                        }
                    }
                    for (var q = 0; q < indexArray.length; q++) {
                        var StartRow = 0;
                        var Same = true;
                        //循环需要判断的数据行
                        for (var i = 0; i < EndRow; i++) {
                            var td = NoTotaltr[i].cells[indexArray[q]];
                            var td_next = NoTotaltr[i + 1].cells[indexArray[q]];
                            if ($(td).find("input").length != 0) {
                                if (typeof (RelyCol) == 'number') {
                                    if ($(NoTotaltr[i].cells[RelyCol]).find("input").val() != $(NoTotaltr[i + 1].cells[RelyCol]).find("input").val()) {
                                        Same = false;
                                    }
                                }
                                else if (typeof (RelyCol) == 'object') {
                                    for (var yli = 0; yli < RelyCol.length; yli++) {
                                        if ($(NoTotaltr[i].cells[RelyCol]).find("input").val() != $(NoTotaltr[i + 1].cells[RelyCol]).find("input").val()) {
                                            Same = false;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    Same = false;
                                }
                            }
                            else if ($(td).find("textarea").length != 0) {
                                if (typeof (RelyCol) == 'number') {
                                    if ($(NoTotaltr[i].cells[RelyCol]).find("textarea").val() != $(NoTotaltr[i + 1].cells[RelyCol]).find("textarea").val()) {
                                        Same = false;
                                    }
                                }
                                else if (typeof (RelyCol) == 'object') {
                                    for (var yli = 0; yli < RelyCol.length; yli++) {
                                        if ($(NoTotaltr[i].cells[RelyCol]).find("textarea").val() != $(NoTotaltr[i + 1].cells[RelyCol]).find("textarea").val()) {
                                            Same = false;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    Same = false;
                                }
                            }
                            else {
                                if (typeof (RelyCol) == 'number') {
                                    if (NoTotaltr[i].cells[RelyCol].innerHTML != NoTotaltr[i + 1].cells[RelyCol].innerHTML) {
                                        Same = false;
                                    }
                                }
                                else if (typeof (RelyCol) == 'object') {
                                    for (var yli = 0; yli < RelyCol.length; yli++) {
                                        if (NoTotaltr[i].cells[RelyCol[yli]].innerHTML != NoTotaltr[i + 1].cells[RelyCol[yli]].innerHTML) {
                                            Same = false;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    Same = false;
                                }
                            }
                            //如果前面的同级数据行的值均相同，则进行单元格的合并
                            if (true == Same) {
                                //隐藏
                                NoTotaltr[i + 1].cells[indexArray[q]].style.display = 'none';
                                //如果记录要移除的行列索引
                                NoTotaltr[i + 1].cells[indexArray[q]].setAttribute("data-none", "1");
                                //更新rowSpan属性
                                NoTotaltr[StartRow].cells[indexArray[q]].rowSpan = (NoTotaltr[StartRow].cells[indexArray[q]].rowSpan | 0) + 1;
                                var t = 0;
                                if ($(NoTotaltr[StartRow].cells[indexArray[q]]).find("input").length != 0) {
                                    t = _em_options.Fixed_Size(parseFloat($(NoTotaltr[StartRow].cells[indexArray[q]]).find("input").val()) + parseFloat($(NoTotaltr[i + 1].cells[indexArray[q]]).find("input").val()), 2);
                                }
                                else if ($(NoTotaltr[StartRow].cells[indexArray[q]]).find("textarea").length != 0) {
                                    t = _em_options.Fixed_Size(parseFloat($(NoTotaltr[StartRow].cells[indexArray[q]]).find("textarea").val()) + parseFloat($(NoTotaltr[i + 1].cells[indexArray[q]]).find("textarea").val()), 2);
                                }
                                else {
                                    t = _em_options.Fixed_Size(parseFloat(NoTotaltr[StartRow].cells[indexArray[q]].innerHTML) + parseFloat(NoTotaltr[i + 1].cells[indexArray[q]].innerHTML), 2);
                                }
                                NoTotaltr[StartRow].cells[indexArray[q]].innerHTML = t;
                            }
                            else {
                                StartRow = i + 1;
                            }
                        }
                    }
                }
                //============================== Step 5 相同合并 ====================================//
                if (ICB == '1') {
                    var EndRow = opts.EndRow,
                        ActionCol = opts.ICB_AC;
                    var indexArray = ActionCol;
                    var NoTotaltr = TableObj.find("tr[data-as!='Total'][data-as!='TotalD']");
                    //设置为0时,检索所有行
                    if (EndRow == 0) {
                        EndRow = NoTotaltr.length - 1;
                    }
                    //指定数据行索引大于表格行数
                    if (EndRow >= NoTotaltr.length) {
                        return;
                    }
                    for (var q = 0; q < indexArray.length; q++) {
                        //检测指定的列索引是否超出表格列数
                        if (indexArray[q] >= NoTotaltr[0].cells.length) {
                            return;
                        }
                    }
                    for (var q = 0; q < indexArray.length; q++) {
                        var StartRow = 0;
                        //循环需要判断的数据行
                        for (var i = 0; i < EndRow; i++) {
                            if (NoTotaltr[i].cells[indexArray[q]].innerHTML == NoTotaltr[i + 1].cells[indexArray[q]].innerHTML) {
                                //隐藏
                                NoTotaltr[i + 1].cells[indexArray[q]].style.display = 'none';
                                //如果记录要移除的行列索引
                                NoTotaltr[i + 1].cells[indexArray[q]].setAttribute("data-none", "1");
                                //更新rowSpan属性
                                NoTotaltr[StartRow].cells[indexArray[q]].rowSpan = (NoTotaltr[StartRow].cells[indexArray[q]].rowSpan | 0) + 1;
                            }
                            else {
                                StartRow = i + 1;
                            }
                        }
                    }
                }
                //============================== Step 6 表格金额变换 ====================================//
                if (Page_ICM == '1') {
                    //除页、总合计行
                    var NoTotaltr = TableObj.find("tr[data-as!='Total'][data-as!='TotalD']");
                    for (var i = 0; i < Page_AC.length; i++) {
                        for (var j = 0; j < NoTotaltr.length; j++) {
                            var td = NoTotaltr[j].cells[Page_AC[i]];
                            if ($(td).find("input").length != 0) {
                                $(td).find("input").val(_em_options.ChangeMoney_Clidren($(td).find("input").val()));
                            }
                            else if ($(td).find("textarea").length != 0) {
                                $(td).find("textarea").val(_em_options.ChangeMoney_Clidren($(td).find("textarea").val()));
                            }
                            else {
                                td.innerHTML = _em_options.ChangeMoney_Clidren(td.innerHTML);
                            }
                        }
                    }
                }
                //============================== Step 7 0.00\0 => ""变换 ====================================//
                if (Page_ICZ == '1') {
                    //除页、总合计行
                    var NoTotaltr = TableObj.find("tr[data-as!='Total'][data-as!='TotalD']");
                    for (var i = 0; i < Page_AC.length; i++) {
                        for (var j = 0; j < NoTotaltr.length; j++) {
                            var td = NoTotaltr[j].cells[Page_AC[i]];
                            if ($(td).find("input").length != 0) {
                                if (_em_options.trim($(td).find("input").val()) == '0.00' || _em_options.trim($(td).find("input").val()) == '0') {
                                    $(td).find("input").val("");
                                }
                            }
                            else if ($(td).find("textarea").length != 0) {
                                if (_em_options.trim($(td).find("textarea").val()) == '0.00' || _em_options.trim($(td).find("textarea").val()) == '0') {
                                    $(td).find("textarea").val("");
                                }
                            }
                            else {
                                if (_em_options.trim(td.innerHTML) == '0.00' || _em_options.trim(td.innerHTML) == '0') {
                                    td.innerHTML = "";
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "extend-api", "FuncName": "ComBine", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },
        "MergeTableCell": function (options, callback) {
            try {
                var defaults = {
                    TableObj: $("#tb_departments tbody"),//表体对象
                    EndRow: "0",//结束行
                    RelyCol: [],//依赖列
                    ActionCol: []//合并列
                }, opts = $.extend(defaults, options), TableObj = opts.TableObj, EndRow = opts.EndRow, RelyCol = opts.RelyCol, ActionCol = opts.ActionCol;
                if (!_em_options.CheckArray(ActionCol)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "MergeTableCell", "MSG": "合并列对象类型不符或没有设置值" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.CheckArray(RelyCol)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "MergeTableCell", "MSG": "依赖列对象类型不符或没有设置值" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                var indexArray = ActionCol;
                var tb = TableObj[0];
                //设置为0时,检索所有行
                if (EndRow == 0) {
                    EndRow = tb.rows.length - 1;
                }
                //指定数据行索引大于表格行数
                if (EndRow >= tb.rows.length) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "MergeTableCell", "MSG": "指定数据行索引大于表格行数" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    for (var q = 0; q < indexArray.length; q++) {
                        //检测指定的列索引是否超出表格列数
                        if (indexArray[q] >= tb.rows[0].cells.length) {
                            var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "MergeTableCell", "MSG": "指定的列索引超出表格列数" };
                            _em_options.GeneraCallBack(d, callback);
                            $("td[data-none='1']").show();
                            return;
                        }
                    }

                    for (var q = 0; q < indexArray.length; q++) {
                        var StartRow = 0;
                        var Same = true;
                        //循环需要判断的数据行
                        for (var i = 0; i < EndRow; i++) {
                            if (typeof (RelyCol) == 'number') {
                                if (tb.rows[i].cells[RelyCol].innerHTML != tb.rows[i + 1].cells[RelyCol].innerHTML) {
                                    Same = false;
                                }
                            }
                            else if (typeof (RelyCol) == 'object') {
                                for (var yli = 0; yli < RelyCol.length; yli++) {
                                    if (tb.rows[i].cells[RelyCol[yli]].innerHTML != tb.rows[i + 1].cells[RelyCol[yli]].innerHTML) {
                                        Same = false;
                                        break;
                                    }
                                }
                            }
                            else {
                                Same = false;
                            }
                            //如果前面的同级数据行的值均相同，则进行单元格的合并
                            if (true == Same) {
                                //隐藏
                                tb.rows[i + 1].cells[indexArray[q]].style.display = 'none';
                                //如果记录要移除的行列索引
                                tb.rows[i + 1].cells[indexArray[q]].setAttribute("data-none", "1");
                                //更新rowSpan属性
                                tb.rows[StartRow].cells[indexArray[q]].rowSpan = (tb.rows[StartRow].cells[indexArray[q]].rowSpan | 0) + 1;
                                tb.rows[StartRow].cells[indexArray[q]].innerHTML = parseFloat(tb.rows[StartRow].cells[indexArray[q]].innerHTML) + parseFloat(tb.rows[i + 1].cells[indexArray[q]].innerHTML)
                            }
                            else {
                                StartRow = i + 1;
                                Same = true;
                            }
                        }
                        var d = { "RST": "SUC", "ICO": "1", "ApiName": "extend-api", "FuncName": "MergeTableSum", "MSG": "合并成功" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "extend-api", "FuncName": "MergeTableCell", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//单元格依赖合并
        "CombineCell": function (options, callback) {
            try {
                var defaults = {
                    TableObj: $("#tb_departments tbody"),//表体对象
                    EndRow: "0",//结束行
                    ActionCol: []//合并列
                }, opts = $.extend(defaults, options), TableObj = opts.TableObj, EndRow = opts.EndRow, ActionCol = opts.ActionCol;
                if (!_em_options.CheckArray(ActionCol)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "MergeTableCell", "MSG": "合并列对象类型不符或没有设置值" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    var indexArray = ActionCol;
                    var tb = TableObj[0];
                    //设置为0时,检索所有行
                    if (EndRow == 0) {
                        EndRow = tb.rows.length - 1;
                    }
                    //指定数据行索引大于表格行数
                    if (EndRow >= tb.rows.length) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "CombineCell", "MSG": "指定数据行索引大于表格行数" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                    else {
                        for (var q = 0; q < indexArray.length; q++) {
                            //检测指定的列索引是否超出表格列数
                            if (indexArray[q] >= tb.rows[0].cells.length) {
                                var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "CombineCell", "MSG": "指定的列索引超出表格列数" };
                                _em_options.GeneraCallBack(d, callback);
                                return
                            }
                            else {
                                var StartRow = 0;
                                //循环需要判断的数据行
                                for (var i = 0; i < EndRow; i++) {
                                    if (tb.rows[i].cells[indexArray[q]].innerHTML == tb.rows[i + 1].cells[indexArray[q]].innerHTML) {
                                        //隐藏
                                        tb.rows[i + 1].cells[indexArray[q]].style.display = 'none';
                                        //如果记录要移除的行列索引
                                        tb.rows[i + 1].cells[indexArray[q]].setAttribute("data-none", "1");
                                        //更新rowSpan属性
                                        tb.rows[StartRow].cells[indexArray[q]].rowSpan = (tb.rows[StartRow].cells[indexArray[q]].rowSpan | 0) + 1;
                                    }
                                    else {
                                        StartRow = i + 1;
                                    }
                                }
                                var d = { "RST": "SUC", "ICO": "1", "ApiName": "extend-api", "FuncName": "CombineCell", "MSG": "合并成功" };
                                _em_options.GeneraCallBack(d, callback);
                            }
                        }
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "extend-api", "FuncName": "CombineCell", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//单元格合并
        "MergeTableSum": function (options, callback) {
            try {
                var defaults = {
                    TableObj: $("#tb_departments tbody"),//表体对象
                    EndRow: "0",//结束行
                    RelyCol: [],//依赖列
                    ActionCol: []//合并列
                }, opts = $.extend(defaults, options), TableObj = opts.TableObj, EndRow = opts.EndRow, RelyCol = opts.RelyCol, ActionCol = opts.ActionCol;
                if (!_em_options.CheckArray(ActionCol)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "MergeTableSum", "MSG": "合并列对象类型不符或没有设置值" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.CheckArray(RelyCol)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "MergeTableSum", "MSG": "依赖列对象类型不符或没有设置值" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                var indexArray = ActionCol;
                var tb = TableObj[0];
                //设置为0时,检索所有行
                if (EndRow == 0) {
                    EndRow = tb.rows.length - 1;
                }
                //指定数据行索引大于表格行数
                if (EndRow >= tb.rows.length) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "MergeTableSum", "MSG": "指定数据行索引大于表格行数" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    for (var q = 0; q < indexArray.length; q++) {
                        //检测指定的列索引是否超出表格列数
                        if (indexArray[q] >= tb.rows[0].cells.length) {
                            var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "MergeTableSum", "MSG": "指定的列索引超出表格列数" };
                            _em_options.GeneraCallBack(d, callback);
                            return;
                        }
                    }
                    for (var q = 0; q < indexArray.length; q++) {
                        var StartRow = 0;
                        var Same = true;
                        //循环需要判断的数据行
                        for (var i = 0; i < EndRow; i++) {
                            if (typeof (RelyCol) == 'number') {
                                if (tb.rows[i].cells[RelyCol].innerHTML != tb.rows[i + 1].cells[RelyCol].innerHTML) {
                                    Same = false;
                                }
                            }
                            else if (typeof (RelyCol) == 'object') {
                                for (var yli = 0; yli < RelyCol.length; yli++) {
                                    if (tb.rows[i].cells[RelyCol[yli]].innerHTML != tb.rows[i + 1].cells[RelyCol[yli]].innerHTML) {
                                        Same = false;
                                        break;
                                    }
                                }
                            }
                            else {
                                Same = false;
                            }
                            //如果前面的同级数据行的值均相同，则进行单元格的合并
                            if (true == Same) {
                                //隐藏
                                tb.rows[i + 1].cells[indexArray[q]].style.display = 'none';
                                //如果记录要移除的行列索引
                                tb.rows[i + 1].cells[indexArray[q]].setAttribute("data-none", "1");
                                //更新rowSpan属性
                                tb.rows[StartRow].cells[indexArray[q]].rowSpan = (tb.rows[StartRow].cells[indexArray[q]].rowSpan | 0) + 1;
                                tb.rows[StartRow].cells[indexArray[q]].innerHTML = parseFloat(tb.rows[StartRow].cells[indexArray[q]].innerHTML) + parseFloat(tb.rows[i + 1].cells[indexArray[q]].innerHTML)
                            }
                            else {
                                StartRow = i + 1;
                                Same = true;
                            }
                        }
                        var d = { "RST": "SUC", "ICO": "1", "ApiName": "extend-api", "FuncName": "MergeTableSum", "MSG": "合并成功" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "extend-api", "FuncName": "MergeTableSum", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//单元格依赖合并（计算）
        "AddSubRow": function (options, callback) {
            try {
                var defaults = {
                    SubTableID: "tb_departments",//表格ID
                    InputJson: [
                        //{//说明
                        //    InputType: "hidden",//表单元素类型        ★必传
                        //    InputName: "SHUOMING",//表单元素Name 索引ID ★必传
                        //    isOpen: 0,//是否开窗 默认不开窗0
                        //    OpenFunctionName: null,//开窗方法名称 默认无
                        //    OpenFunctionArr: null,//开窗方法追加参数 默认无
                        //    children: "",//子元素HTML内容 默认空
                        //    isAdd: "1",//是否提交数据 默认提交数据1  0为不提交数据
                        //    readonly: "1",//是否只读 1 只读 0 可写 默认可写
                        //    defaultvalue: $("#MC001").val(),//默认值字段
                        //    isGuid: 0,//是否为自动标识 默认为不是自动标识0  1为设置自动标识
                        //    Guidlength: 4,//自动标识长度 默认标识长度0
                        //    isRequired: 0,//是否必填 默认不必填0 必填 1
                        //    RequiredInfo: "",//未填提示信息 默认空
                        //    DateFormat: "yyyy-MM-dd",//日期表单时 日期格式 默认yyyy-MM-dd
                        //    SumID: "",//数字表单汇总的元素标识 默认空
                        //},
                        //{//标识元素
                        //    InputType: "text",
                        //    readonly: "1",
                        //    InputName: "BIAOSHI",
                        //    isGuid: "1",//是否为自动标识
                        //    Guidlength: "4"//自动标识长度
                        //},
                        //{//开窗元素
                        //    InputType: "text",
                        //    isOpen: "1",
                        //    OpenFunctionName: "Open",
                        //    OpenFunctionArr: [],
                        //    readonly: "1",
                        //    InputName: "KAICHUANG",
                        //    isRequired: "1",
                        //    RequiredInfo: "请选择数据表"
                        //},
                        //{//下拉框元素
                        //    InputType: "select",
                        //    InputName: "XIALA",
                        //    children: '<option value="Y" selected="selected">Y</option>\
                        //      <option value="N">N</option>'
                        //},
                        //{//隐藏元素
                        //    InputType: "hidden",
                        //    InputName: "YINCANG"
                        //},
                        //{//文本框元素
                        //    InputType: "text",
                        //    InputName: "WENBENKUANG",
                        //},
                        //{//时间元素
                        //    InputType: "date",
                        //    readonly: "1",
                        //    InputName: "SHIJIAN",
                        //    DateFormat: "yyyy-MM-dd",
                        //    defaultvalue: "1997-12-13"
                        //},
                        //{//数字元素
                        //    InputType: "number",
                        //    readonly: "0",
                        //    InputName: "SHUZI",
                        //    SumID: "SUMID"
                        //},
                        //{//文本域元素
                        //    InputType: "textarea",
                        //    InputName: "WENBENYU",
                        //    readonly: "0"
                        //}
                    ],//生成表单Json
                    MaxSub: 1,//开窗序号 默认'1'
                    BeChangeNameJson: [
                        //{
                        //    //变换元素Name:被变换元素Name 用于数字表单元素
                        //    "Change": "BeChange"
                        //}
                    ],//关联变更
                    IsBeforeOrAfter: 1,//单身行显示位置默认后（append）1 0(prepend)前 
                    IsHaveDelete: 1//单身行删除按钮 默认有删除按钮 1 无 0
                }, opts = $.extend(defaults, options), SubTableID = opts.SubTableID, InputJson = opts.InputJson, MaxSub = opts.MaxSub, BeChangeNameJson = opts.BeChangeNameJson, IsBeforeOrAfter = opts.IsBeforeOrAfter, IsHaveDelete = opts.IsHaveDelete;
                if (!_em_options.isEmpty(SubTableID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "AddSubRow", "MSG": "表格ID不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.isEmpty(MaxSub)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "AddSubRow", "MSG": "开窗序号不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.CheckJson(InputJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "AddSubRow", "MSG": "表单Json对象类型不符" };
                    _em_options.GeneraCallBack(d, callback);
                }
                    //else if (!_em_options.CheckJson(BeChangeNameJson)) {
                    //    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "AddSubRow", "MSG": "关联Json对象类型不符" };
                    //    _em_options.GeneraCallBack(d, callback);
                    //}
                else {
                    _em_options.Sub_i = MaxSub;
                    var addhtml = '<tr class="template" trtype="add" add-type="click" sub-index="' + _em_options.Sub_i + '" prepend-index="' + _em_options.Sub_i + '" append-index = "' + _em_options.Sub_i + '">';
                    for (var i = 0; i < InputJson.length; i++) {
                        var InputType = InputJson[i].InputType;//表单元素类型        ★必传
                        var InputName = InputJson[i].InputName;//表单元素Name 索引ID ★必传
                        var isOpen = InputJson[i].isOpen || 0;//是否开窗(默认不开窗)
                        var OpenFunctionName = InputJson[i].OpenFunctionName || null;//开窗方法名称(默认无)
                        var OpenFunctionArr = InputJson[i].OpenFunctionArr || null;//开窗方法追加参数(默认无)
                        var readonly = InputJson[i].readonly || 0;//是否只读 (默认可写)
                        var children = InputJson[i].children || "";//子元素Html//默认值 ("")
                        var isAdd = InputJson[i].isAdd || "1";//是否提交数据//默认值 (提交数据)
                        var defaultvalue = InputJson[i].defaultvalue || "";//默认值 (默认空值)
                        var isGuid = InputJson[i].isGuid || 0;//是否自动标识 (默认0)
                        var Guidlength = InputJson[i].Guidlength || 0;//自动标识长度 (默认0)
                        var isRequired = InputJson[i].isRequired || 0;//是否必填 (默认不必填)
                        var RequiredInfo = InputJson[i].RequiredInfo || "";//提示信息 (默认空值)
                        var DateFormat = InputJson[i].DateFormat || "yyyy-MM-dd";//日期格式
                        var SumID = InputJson[i].SumID || "";//汇总ID
                        var IsSum = (SumID == '') ? 0 : 1;
                        /* ---------------------------Hidden:隐藏元素------------------------------------*/
                        if (InputType == 'hidden') {
                            //默认值(自动标识)
                            if (isGuid == '1') {
                                addhtml +=
                                    '<td style="display:none;">\
                                <input type="hidden" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" >\
                            </td>';
                            }
                                //默认值(不是自动标识)
                            else {
                                addhtml +=
                                    '<td style="display:none;">\
                                <input type="hidden" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                            </td>';
                            }
                        }
                            /* ---------------------------Text:文本元素------------------------------------*/
                        else if (InputType == 'text') {
                            //开窗
                            if (isOpen == '1') {
                                var ClickString = '';
                                if (OpenFunctionArr.length == 0) {
                                    ClickString = OpenFunctionName + '("' + _em_options.Sub_i + '")';
                                }
                                else {
                                    ClickString += OpenFunctionName + '("' + _em_options.Sub_i + ',';
                                    for (var j = 0; j < OpenFunctionArr.length; j++) {
                                        if (j == OpenFunctionArr.length - 1)
                                            ClickString += '"' + OpenFunctionArr[j] + '")'
                                        else
                                            ClickString += '"' + OpenFunctionArr[j] + '",'
                                    }
                                }
                                //只读 开窗
                                if (readonly == '1') {
                                    //只读 开窗 默认值（自动标识）
                                    if (isGuid == '1') {
                                        addhtml +=
                                            '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                    }
                                        //只读 开窗 默认值（非自动标识）
                                    else {
                                        addhtml +=
                                            '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                    }
                                }
                                    //可写 开窗
                                else {
                                    //可写 开窗 默认值（自动标识）
                                    if (isGuid == '1') {
                                        addhtml +=
                                            '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                    }
                                        //可写 开窗 默认值（非自动标识）
                                    else {
                                        addhtml +=
                                            '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                    }
                                }
                            }
                                //非开窗
                            else {
                                //只读 非开窗
                                if (readonly == '1') {
                                    //只读 非开窗 默认值（自动标识）
                                    if (isGuid == '1') {
                                        addhtml +=
                                            '<td>\
                                        <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                    }
                                        //只读 非开窗 默认值（非自动标识）
                                    else {
                                        addhtml +=
                                            '<td>\
                                        <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                    }
                                }
                                    //可写 非开窗
                                else {
                                    //可写 非开窗 默认值（自动标识）
                                    if (isGuid == '1') {
                                        addhtml +=
                                            '<td>\
                                        <input type="text"  class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                    }
                                        //可写 非开窗 默认值（非自动标识）
                                    else {
                                        addhtml +=
                                            '<td>\
                                        <input type="text"  class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                    }
                                }
                            }
                        }
                            /* ---------------------------Select:下拉元素------------------------------------*/
                        else if (InputType == 'select') {
                            addhtml += '<td><select name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" class="form-control" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">' + children + '</select></td>';
                        }
                            /* ---------------------------textarea:多行文本元素------------------------------------*/
                        else if (InputType == 'textarea') {
                            //只读 非开窗
                            if (readonly == '1') {
                                //只读 非开窗 默认值（自动标识）
                                if (isGuid == '1') {
                                    addhtml +=
                                        '<td>\
                                        <textarea class="form-control text-xml" readonly  name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '"></textarea>\
                                    </td>';
                                }
                                    //只读 非开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <textarea class="form-control text-xml" readonly  name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '"></textarea>\
                                    </td>';
                                }
                            }
                                //可写 非开窗
                            else {
                                //可写 非开窗 默认值（自动标识）
                                if (isGuid == '1') {
                                    addhtml +=
                                        '<td>\
                                        <textarea class="form-control text-xml"  name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '"></textarea>\
                                    </td>';
                                }
                                    //可写 非开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <textarea class="form-control text-xml"  name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '"></textarea>\
                                    </td>';
                                }
                            }
                        }
                            /* ---------------------------date:日期元素------------------------------------*/
                        else if (InputType == 'date') {
                            //只读 非开窗
                            if (readonly == '1') {
                                addhtml +=
                                    '<td>\
                                        <div id="demo-dp-component date-picker">\
                                            <div class="input-group date ">\
                                                <input type="text" readonly  name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" class="form-control" onclick="WdatePicker({el:this,dateFmt:\'' + DateFormat + '\',autoPickDate:true})"><span class="input-group-addon"><i class="demo-pli-calendar-4"></i></span>\
                                            </div>\
                                         </div>\
                                    </td>';
                            }
                                //可写 非开窗
                            else {
                                addhtml +=
                                    '<td>\
                                         <div id="demo-dp-component date-picker">\
                                            <div class="input-group date ">\
                                                <input type="text" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" class="form-control" onclick="WdatePicker({el:this,dateFmt:\'' + DateFormat + '\',autoPickDate:true})"><span class="input-group-addon"><i class="demo-pli-calendar-4"></i></span>\
                                            </div>\
                                         </div>\
                                    </td>';
                            }
                        }
                            /* ---------------------------number:数字元素------------------------------------*/
                        else if (InputType == 'number') {
                            //只读 非开窗
                            if (readonly == '1') {
                                addhtml +=
                                    '<td>\
                                        <input type="number" readonly issum="' + IsSum + '" data-sum="' + SumID + '" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" class="form-control text-xml" >\
                                    </td>';
                            }
                                //可写 非开窗
                            else {
                                addhtml +=
                                    '<td>\
                                        <input type="number" issum="' + IsSum + '" data-sum="' + SumID + '" name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" class="form-control text-xml" >\
                                </td>';
                            }
                        }
                    }
                    if (IsHaveDelete == '1') {
                        addhtml +=
                            '<td>\
                        <button type="button" name="btn_del" id="btn_del_' + _em_options.Sub_i + '" class="delrow demo-delete-row btn btn-danger btn-xs">\
                            <i class="demo-pli-cross"></i>\
                        </button>\
                    </td>\
                </tr>';
                        if (IsBeforeOrAfter == '1') {
                            $("#" + SubTableID + " tbody").append(addhtml);
                        }
                        else {
                            $("#" + SubTableID + " tbody").prepend(addhtml);
                        }
                        //删除
                        $("#" + SubTableID + " tbody tr td #btn_del_" + _em_options.Sub_i).click(function () {
                            //更新删除
                            if ($(this).parent("td").parent("tr").attr("trtype") == 'update') {
                                $(this).parent("td").parent("tr").attr("trtype", "delete");
                                $(this).parent("td").parent("tr").hide();
                            }
                            //添加移除
                            if ($(this).parent("td").parent("tr").attr("trtype") == 'add') {
                                $(this).parent("td").parent("tr").remove();
                            }
                            //合计删除
                            var Arr = $(this).parent("td").parent("tr").find("input[issum = 1]");
                            for (var i = 0; i < Arr.length; i++) {
                                var sumId = $(Arr[i]).attr("data-sum");
                                var inputvalue = (isNaN(parseFloat(Arr[i].value))) ? 0 : parseFloat(Arr[i].value);
                                var SumValue = (isNaN(parseFloat($("#" + sumId).val()))) ? 0 : parseFloat($("#" + sumId).val());
                                $("#" + sumId).val(SumValue - inputvalue);
                            }
                        });
                    }
                    else {
                        addhtml += '<td>\
                          </td>\
                    </tr>';
                        if (IsBeforeOrAfter == '1') {
                            $("#" + SubTableID + " tbody").append(addhtml);
                        }
                        else {
                            $("#" + SubTableID + " tbody").prepend(addhtml);
                        }
                    }
                    _em_options.Sub_i++;
                    var SumInput = $("input[issum = '1']");
                    for (var i = 0; i < SumInput.length; i++) {
                        $("input[name='" + $(SumInput[i]).attr("name") + "']").change(function () {
                            var SumID = $(this).attr("data-sum");
                            var Arr = $("input[name='" + $(this).attr("name") + "']");
                            var result = 0;
                            for (var j = 0; j < Arr.length; j++) {
                                result += (isNaN(parseFloat(Arr[j].value))) ? 0 : parseFloat(Arr[j].value);
                            }
                            $("#" + SumID).val(result);
                        });
                    }
                    for (var key in BeChangeNameJson) {
                        $("input[name='" + key + "']").change(function () {
                            var SumID = $(this).parents("tr").find("input[name='" + BeChangeNameJson[key] + "']").attr("data-sum");
                            $(this).parents("tr").find("input[name='" + BeChangeNameJson[key] + "']").val($(this).val());
                            if (SumID != '') {
                                var Arr = $("input[name='" + BeChangeNameJson[key] + "']");
                                var result = 0;
                                for (var j = 0; j < Arr.length; j++) {
                                    result += (isNaN(parseFloat($(Arr[j]).val()))) ? 0 : parseFloat($(Arr[j]).val());
                                }
                                $("#" + SumID).val(result);
                            }
                        })
                    }
                    var d = { "RST": "SUC", "ICO": "1", "ApiName": "extend-api", "FuncName": "AddSubRow", "MSG": "操作成功" };
                    _em_options.GeneraCallBack(d, callback);
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "extend-api", "FuncName": "AddSubRow", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//添加单身行
        "AddTableTotalCol": function (options, callback) {
            try {
                var defaults = {
                    TableID: "tb_departments",//表格ID
                    TotalMean: "页合计",//合计列意思
                    TotalMeanIndex: 0,//合计列索引
                    TotalMeanColspan: 1,//合计列合并
                    ContentAlign: 'center',//内容对齐
                    ContentColor: 'black',//内容颜色
                    appendType: 'append',//追加方式 append 后 prepend 前
                    ActionCol: [],//操作列
                    StartRow: 1,//合并计算开始行
                    IsChangeMoney: 1,//是否变换金额 1转换  0不转换
                    IsChangeZero: 1,//是否替换0 1替换  0不替换
                    HaveDataTotal: 0,//是否进行数据合计 0不进行 1进行
                    DataTotalMean: '总合计',//总计列意思
                    DataTotalMeanIndex: 0,//总计列索引
                    DataTotalDataSrouce: "",//总计数据源
                    DataTotalFilter: "1 = 1",//总计数据源过滤条件
                    DataTotalJson: [
                        //{
                        //    //数据别名:表格索引
                        //    Col1: "1",
                        //    Col2: "2",
                        //    Col3: "3",
                        //}
                    ]//总计数据绑定关系Json
                }, opts = $.extend(defaults, options), TableID = opts.TableID,
                    TotalMean = opts.TotalMean, TotalMeanIndex = opts.TotalMeanIndex, TotalMeanColspan = opts.TotalMeanColspan,
                    ContentAlign = opts.ContentAlign, ContentColor = opts.ContentColor,
                    appendType = opts.appendType, ActionCol = opts.ActionCol, StartRow = opts.StartRow,
                    IsChangeMoney = opts.IsChangeMoney, IsChangeZero = opts.IsChangeZero, HaveDataTotal = opts.HaveDataTotal,
                    DataTotalMean = opts.DataTotalMean, DataTotalMeanIndex = opts.DataTotalMeanIndex, DataTotalDataSrouce = opts.DataTotalDataSrouce,
                    DataTotalFilter = opts.DataTotalFilter, DataTotalJson = opts.DataTotalJson, tableObj = document.getElementById(TableID);
                if (!_em_options.isEmpty(TableID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "AddSubRow", "MSG": "表格ID不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (HaveDataTotal == 1) {
                    if (!_em_options.CheckJson(DataTotalJson)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "AddTableTotalCol", "MSG": "总计数据绑定关系Json对象类型不符" };
                        _em_options.GeneraCallBack(d, callback);
                        return;
                    }
                }
                if (!_em_options.CheckJson(ActionCol) && ActionCol != '*') {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "AddTableTotalCol", "MSG": "操作列类型不符或无设置值" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (HaveDataTotal == '0') {
                    var hjtr = "<tr>";
                    for (var i = 0; i < $(tableObj).find("tbody")[0].rows[0].cells.length + 1 - TotalMeanColspan; i++)
                        (i == TotalMeanIndex) ?
                            hjtr += "<td colspan='" + TotalMeanColspan + "' style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'>" + TotalMean + "</td>" :
                            hjtr += "<td style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'></td>";
                    hjtr += "</tr>";
                    var append = "$(\"#" + TableID + " tbody\")." + appendType + "(\"" + hjtr + "\")";
                    eval(append);
                    _em_options.calcTotalAdd($("#" + TableID), ActionCol, StartRow, TotalMeanColspan - 1);
                    (IsChangeMoney == '1') ? _em_options.ChangeMoney($("#" + TableID), ActionCol) : "";
                    (IsChangeZero == '1') ? _em_options.ChangeZero($("#" + TableID)) : "";
                }
                else {
                    var hjtr = "<tr>";
                    for (var i = 0; i < tableObj.rows[0].cells.length + 1 - TotalMeanColspan; i++)
                        (i == TotalMeanIndex) ? hjtr += "<td colspan='" + TotalMeanColspan + "' style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'>" + TotalMean + "</td>" : hjtr += "<td style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'></td>";
                    hjtr += "</tr>";
                    var append = "$(\"#" + TableID + " tbody\")." + appendType + "(\"" + hjtr + "\")";
                    eval(append);
                    _em_options.calcTotalAdd($("#" + TableID), ActionCol, StartRow, TotalMeanColspan - 1);


                    $.P8.common().postJSON({
                        url: 'api/datainterface/getdatabytable', usercode: Session.UserCode,
                        data: {
                            "TabName": DataTotalDataSrouce,
                            "Filter": DataTotalFilter
                        },
                        async: true //同步请求
                    }, function (d) {
                        if (d.RST == "SUC") {
                            var hjtr1 = "<tr>";
                            for (var i = 0; i < tableObj.rows[0].cells.length; i++)
                                (i == DataTotalMeanIndex) ? hjtr1 += "<td style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'>" + DataTotalMean + "</td>" : hjtr1 += "<td style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'></td>";
                            hjtr1 += "</tr>";
                            var append1 = "$(\"#" + TableID + " tbody\")." + appendType + "(\"" + hjtr1 + "\")";
                            eval(append1);
                            _em_options.Json_Resolve_Single(DataTotalJson);

                            var DataTotalLength = _em_options.JsonKeyArr[0].length;
                            for (var i = 0; i < DataTotalLength; i++) {
                                var result = 0;
                                for (var datai = 0; datai < d.DATA.length; datai++) {
                                    var _data = "d.DATA[" + datai + "]." + _em_options.JsonKeyArr[0][i];
                                    result += parseFloat(_em_options.IsNull(eval(_data), "Decimal"));
                                }
                                tableObj.rows[tableObj.rows.length - 1].cells[_em_options.JsonValueArr[0][i]].innerText = _em_options.Fixed_2(result);
                            }
                            _em_options.VarJsonRemove();
                            (IsChangeMoney == '1') ? _em_options.ChangeMoney($("#" + TableID), ActionCol) : "";
                            (IsChangeZero == '1') ? _em_options.ChangeZero($("#" + TableID)) : "";
                        }
                        else {
                            var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "AddTableTotalCol", "MSG": d.MSG };
                            _em_options.GeneraCallBack(d, callback);
                        }
                    });
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "extend-api", "FuncName": "AddTableTotalCol", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//添加页合计与数据合计
        "ConvertColIndex": function (options, callback) {
            try {
                var defaults = {
                    TableID: "tb_departments",//表格ID
                    HeadTitle: [
                        //"列1", "列2"
                    ],//表格标题数组
                    IndexVar: [
                        //"colvar1", 'colvar2'
                    ]//索引变量数组
                }, opts = $.extend(defaults, options), TableID = opts.TableID, HeadTitle = opts.HeadTitle, IndexVar = opts.IndexVar;
                if (!_em_options.isEmpty(TableID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ConvertColIndex", "MSG": "表格ID不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (!_em_options.CheckArray(HeadTitle)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ConvertColIndex", "MSG": "表格标题数组类型不符或无数据" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.CheckArray(IndexVar)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ConvertColIndex", "MSG": "索引变量数组类型不符或无数据" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (HeadTitle.length != IndexVar.length) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ConvertColIndex", "MSG": "索引变量数量与标题数量不一致" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                var tableObj = document.getElementById(TableID);
                for (var i = 0; i < HeadTitle.length; i++) {
                    for (var tabi = 0; tabi < tableObj.rows[0].cells.length; tabi++) {
                        if (tableObj.rows[0].cells[tabi].innerText.indexOf(HeadTitle[i]) != -1) {
                            eval("w." + IndexVar[i] + " = " + tabi);
                            break;
                        }
                    }
                }
                var d = { "RST": "SUC", "ICO": "1", "ApiName": "extend-api", "FuncName": "ConvertColIndex", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "extend-api", "FuncName": "ConvertColIndex", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//自动创建表格对应列索引变量
        "ImportExcel": function (options, callback) {
            try {
                var defaults = {
                    TableName: "",//表名
                    ExcelName: "",//Excel名
                    TemplateName: "",//Excel模板名
                    NoCreate: 0,//是否有创建时间 创建用户字段 0无 1有
                };
                var opts = $.extend(defaults, options), TableName = opts.TableName, ExcelName = opts.ExcelName, TemplateName = opts.TemplateName, NoCreate = opts.NoCreate;
                _em_options.CreateHiddenInput([
                        "ToExcelTableName",
                        "ToExcelName",
                        "ToExcelTemplateName",
                        "ToExcelApiName"
                ]);
                if (!_em_options.isEmpty(TableName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ImportExcel", "MSG": "表名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else if (!_em_options.isEmpty(ExcelName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ImportExcel", "MSG": "Excel名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else if (!_em_options.isEmpty(TemplateName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "extend-api", "FuncName": "ImportExcel", "MSG": "Excel模板名不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    $("#ToExcelTableName").val(TableName);
                    $("#ToExcelName").val(ExcelName);
                    $("#ToExcelTemplateName").val(TemplateName);
                    (NoCreate == '0') ? $("#ToExcelApiName").val("/Import/Upload_NoCreate?TableName=") : $("#ToExcelApiName").val("/Import/Upload_NoCreate1?TableName=");
                    layer.open({
                        type: 2,
                        title: ["", 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                        shade: [0.3, '#393D49'],
                        closeBtn: 1,
                        area: ['90%', '90%'],
                        content: '../import/index_DataSource',
                        end: function () {
                            var d = { "RST": "RST", "ICO": "1", "ApiName": "extend-api", "FuncName": "ImportExcel", "MSG": "操作成功" };
                            _em_options.GeneraCallBack(d, callback);
                        }
                    });
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "extend-api", "FuncName": "ImportExcel", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        }//导入Excel数据
    }

    /** require-api **/
    var _em_require_api = {
        "ReturnRequired": function (options, callback) {
            try {
                var defaults = {}, opts = $.extend(defaults, options), required = $("select[data-required='1'],input[data-required='1'],textarea[data-required='1']"), requiredmsg = '', isOk = "SUC", isOk1 = 0;
                for (var i = 0; i < required.length; i++) {
                    if (required[i].value == '') {
                        i == required.length - 1 ? requiredmsg += required[i].getAttribute("data-required-info").toString() : requiredmsg += required[i].getAttribute("data-required-info").toString() + '</br>';
                        isOk = "ERR";
                        isOk1 = 1;
                    }
                    if (i == required.length - 1 && isOk1 == 0 && requiredmsg == '') {
                        isOk = "SUC";
                    }
                }
                var d = { "RST": isOk, "ApiName": "require-api", "FuncName": "ReturnRequired", "ICO": "1", "MSG": (isOk == "SUC") ? "验证通过" : requiredmsg };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "require-api", "FuncName": "ReturnRequired", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//返回必填 (data-required='1'【必填】 data-required-info='提示信息')【单头】
        "ReturnSubRequired": function (options, callback) {
            try {
                var defaults = {
                    TableID: "",//单身表格ID
                }, opts = $.extend(defaults, options), TableID = opts.TableID, SubMSG = '', sub_notnull = $("#" + TableID).attr("sub-notnull");
                if (!_em_options.isEmpty(TableID)) {
                    var d = { "RST": "ERR", "ApiName": "require-api", "FuncName": "ReturnSubRequired", "ICO": "2", "MSG": "单身表格标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                if (sub_notnull == '0') {
                    var d = { "RST": "SUC", "ApiName": "require-api", "FuncName": "ReturnSubRequired", "ICO": "1", "MSG": "验证通过" };
                    _em_options.GeneraCallBack(d, callback);
                    return;
                }
                var subtable = $("#" + TableID + " tbody tr");
                if (subtable.length == 0) {
                    SubMSG = '请填写单身信息!';
                }
                else {
                    var isOk = true;
                    for (var i = 0; i < subtable.length; i++) {
                        var requiredmsg = '第' + eval(i + 1) + '条单身:';
                        var requireInput = $(subtable[i]).find("input[sub-required='1']");
                        for (var j = 0; j < requireInput.length; j++) {
                            if (requireInput[j].value == '') {
                                j == requireInput.length - 1 ? requiredmsg += requireInput[j].getAttribute("sub-required-info").toString() : requiredmsg += requireInput[j].getAttribute("sub-required-info").toString() + ',';
                                isOk = false;
                            }
                            if (j == requireInput.length - 1) {
                                if (!isOk) {
                                    SubMSG += requiredmsg + "</br>";
                                }
                            }
                        }
                    }
                }
                if (SubMSG == '') {
                    var d = { "RST": "SUC", "ApiName": "require-api", "FuncName": "ReturnSubRequired", "ICO": "1", "MSG": "验证通过" };
                    _em_options.GeneraCallBack(d, callback);
                }
                else {
                    var d = { "RST": "ERR", "ApiName": "require-api", "FuncName": "ReturnSubRequired", "ICO": "1", "MSG": SubMSG };
                    _em_options.GeneraCallBack(d, callback);
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "require-api", "FuncName": "ReturnSubRequired", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//返回必填 (sub-required='1'【必填】 sub-required-info='提示信息')【单身】
    }

    /** cookie-api **/
    var _em_cookie_api = {
        "set": function (options, callback) {
            try {
                var defaults = {
                    Name: "",//cookie名
                    Value: "",//cookie值
                    Expires: null,//过期时间
                    Path: "/",//路径
                    Domain: null,//域
                    Secure: false
                }, opts = $.extend(defaults, options), Name = opts.Name, Value = opts.Value, Expires = opts.Expires, Path = opts.Path, Domain = opts.Domain, Secure = opts.Secure, exp = new Date();
                Expires ? exp.setMinutes(exp.getMinutes() + parseInt(Expires)) : "";
                document.cookie = Name + '=' + escape(Value) + (Expires ? ';expires=' + exp.toGMTString() : '') + (Path ? ';path=' + Path : '') + (Domain ? ';domain=' + Domain : '') + (Secure ? ';secure' : '');
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "cookie-api", "FuncName": "set", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },
        "del": function (options, callback) {
            try {
                var defaults = {
                    Name: "",//cookie名
                    Path: "/",//路径
                    Domain: null,//域
                    Secure: false
                }, opts = $.extend(defaults, options), value = _em_options.get(opts.Name), Name = opts.Name, Path = opts.Path, Domain = opts.Domain, Secure = opts.Secure;
                if (value != null) {
                    var exp = new Date();
                    exp.setMinutes(exp.getMinutes() - 1000);
                    Path = Path || "/";
                    document.cookie = Name + '=;expires=' + exp.toGMTString() + (Path ? ';path=' + Path : '') + (Domain ? ';domain=' + Domain : '') + (Secure ? ';secure' : '');
                }
                var d = { "RST": "SUC", "ApiName": "cookie-api", "FuncName": "del", "ICO": "1", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "cookie-api", "FuncName": "del", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        }
    }

    /** open-api **/
    var _em_open_api = {
        "PublicOpen_Mutiple": function (options, callback) {
            try {
                var defaults = {
                    OpenTabName: "",//数据源名
                    OpenGuid: "",//多选单身开窗标识
                    FieldJson: [
                       //{//说明
                       //    field: "COL1",//字段名
                       //    title: "列1",//标题,
                       //    SubInputName: "COL1",//单身表单标识Name,
                       //    isShow: 1,//是否显示 0显示 1显示
                       //}
                    ],//开窗字段Json
                    OpenTitle: "开窗",//开窗弹出窗口名称
                    WhereJson: "",//开窗条件Json
                    //[
                    //    {//说明
                    //        wherekey: "ID",//条件列名
                    //        wherevalue: ['1', '2', '3'].join(","),//条件列值
                    //        wheretype: "in",//条件类型
                    //        IsSingle: 1, //条件条数 1单条 0多条
                    //        MutipleType: "and",//多条件连接 and or
                    //    }
                    //]
                    OrderJson: "",//开窗排序Json
                    //[
                    //{
                    //    SortName: "OrderCol",//排序字段
                    //    SortDesc: "asc",//排序类型
                    //}
                    //]
                    OpenWidth: "90%",//开窗宽度
                    OpenHeight: "90%",//开窗高度
                    BackSpace: "",//开窗所属域
                }, opts = $.extend(defaults, options), OpenTabName = opts.OpenTabName, OpenGuid = opts.OpenGuid, FieldJson = opts.FieldJson, OpenTitle = opts.OpenTitle;
                WhereJson = opts.WhereJson, OrderJson = opts.OrderJson, OpenWidth = opts.OpenWidth, OpenHeight = opts.OpenHeight, BackSpace = opts.BackSpace;
                if (!_em_options.CheckJson(FieldJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Mutiple", "MSG": "字段Json格式不符" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(OpenTabName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Mutiple", "MSG": "开窗数据源不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(OpenGuid)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Mutiple", "MSG": "开窗标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Mutiple", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (WhereJson != "") {
                    if (!_em_options.CheckJson(WhereJson)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Mutiple", "MSG": "条件Json格式不符" };
                        _em_options.GeneraCallBack(d, callback);
                        return
                    }
                }
                if (OrderJson != "") {
                    if (!_em_options.CheckJson(OrderJson) && OrderJson != "") {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Mutiple", "MSG": "排序Json格式不符" };
                        _em_options.GeneraCallBack(d, callback);
                        return
                    }
                }
                _em_options.CreateHiddenInput([
                        "IsMutiChange_" + BackSpace,
                        "MutiBackSpace",
                        "MutiSubLength",
                        "MutiOpenField",
                        "MutiOpenTitle",
                        "MutiOpenTabName",
                        "MutiOpenSet",
                        "MutiOpenWhere",
                        "MutiOpenOrder",
                        "MutiOpenBackBack_" + BackSpace,
                        "MutiOpenBackSet_" + BackSpace,
                        "MutiOpenID"
                ]);
                var Field_F = '';
                var Field_T = '';
                var set = '';
                var Where = '';
                var Order = '';
                for (var i = 0; i < FieldJson.length; i++) {
                    var SubInput = FieldJson[i].SubInputName;//必传★
                    var field = FieldJson[i].field;//必传★
                    var title = FieldJson[i].title || field;//默认为字段名
                    var isShow = FieldJson[i].isShow || '1';//默认显示  
                    Field_F += field + ","; set += SubInput + ",";
                    if (isShow == '1') {
                        Field_T += title + ',';
                    }
                    else {
                        Field_T += title + '·,';
                    }
                }
                for (var i = 0; i < WhereJson.length; i++) {
                    var Key = WhereJson[i].wherekey;//条件列名★必传
                    var Value = WhereJson[i].wherevalue;//条件列值 ★必传
                    var wheretype = WhereJson[i].wheretype;//条件类型 ★必传
                    var IsSingle = WhereJson[i].IsSingle || 1;//条件条数(默认单条)
                    var MutipleType = WhereJson[i].MutipleType || 'and';
                    //条件多条时类型(默认 and【and or】仅 IsSingle == '0'生效 且wheretype 不等于not in 和in 时生效)
                    if (wheretype == '<>') {/***不等***/
                        if (IsSingle == '1') {/***单条***/
                            Where += Key + " <> \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " <> \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " <> \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '=') {/***等于***/
                        if (IsSingle == '1') {/***单条***/
                            Where += Key + " = \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " = \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " = \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '>') {/***大于***/
                        if (IsSingle == '1') {
                            Where += Key + " > \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " > \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " > \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '<') {/***小于***/
                        if (IsSingle == '1') {
                            Where += Key + " < \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " < \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " < \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '>=') {/***大等于***/
                        if (IsSingle == '1') {/******单条大等于带引号******/
                            Where += Key + " >= \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " >= \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " >= \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '<=') {/***小等于***/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " <= \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " <= \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " <= \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'leftlike') {/******左模糊******/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " like \'%" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'rightlike') {/******右模糊******/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " like \'" + Value + "%\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " like \'" + ValueArr[Keyi] + "%\') and " : Where += KeyArr[Keyi] + " like \'" + ValueArr[Keyi] + "%\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'alllike') {/******全模糊******/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " like \'%" + Value + "%\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "%\') and " : Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "%\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'in') {/******in******/
                        (Value.indexOf(",") == -1) ? Where += Key + " in (\'" + Value + "\') and " : Where += Key + " in (\'" + _em_options.ArrayToString(Value.split(','), "\',\'") + "\') and ";
                    }
                    else if (wheretype == 'not in') {/******not in******/
                        (Value.indexOf(",") == -1) ? Where += Key + " not in (\'" + Value + "\') and " : Where += Key + " not in (\'" + _em_options.ArrayToString(Value.split(','), "\',\'") + "\') and ";;
                    }
                }
                for (var i = 0; i < OrderJson.length; i++) {
                    var SortName = OrderJson[i].SortName;
                    var SortDesc = OrderJson[i].SortDesc;
                    (i == OrderJson.length - 1) ? Order += SortName + " " + OrderJson[i].SortDesc : Order += SortName + " " + OrderJson[i].SortDesc + ",";
                }
                $("#MutiOpenField").val(_em_options.trim(_em_options.GetSubString(Field_F, 1)));
                $("#MutiOpenTitle").val(_em_options.trim(_em_options.GetSubString(Field_T, 1)));
                $("#MutiOpenTabName").val(_em_options.trim(OpenTabName));
                $("#MutiOpenSet").val(_em_options.trim(_em_options.GetSubString(set, 1)));
                $("#MutiOpenWhere").val(Where);
                $("#MutiOpenOrder").val(Order);
                $("#MutiBackSpace").val(_em_options.trim(BackSpace));
                $("#MutiOpenID").val(_em_options.trim(OpenGuid));
                $("IsMutiChange_" + BackSpace).val("0");
                layer.open({
                    type: 2,
                    title: ["", 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                    shade: [0.3, '#393D49'],
                    closeBtn: 1,
                    area: [OpenWidth, OpenHeight],
                    content: '../publicopen/opendata_new2?&title=' + OpenTitle,
                    end: function () {
                        var d = { "RST": "RST", "ICO": "1", "ApiName": "open-api", "FuncName": "PublicOpen_Mutiple", "MSG": "操作成功" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "PublicOpen_Mutiple", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//单身多选开窗
        "Open_AddSubRow": function (options, callback) {
            try {
                var defaults = {
                    SubTableID: "",//单身表格ID
                    OpenGuid: "",//开窗标识
                    InputJson: [
                       //{//说明
                       //    InputType: "hidden",//表单元素类型        ★必传
                       //    InputName: "SHUOMING",//表单元素Name 索引ID ★必传
                       //    isOpen: 0,//是否开窗 默认不开窗0
                       //    OpenFunctionName: null,//开窗方法名称 默认无
                       //    OpenFunctionArr: null,//开窗方法追加参数 默认无
                       //    children: "",//子元素HTML内容 默认空
                       //    isAdd: "1",//是否提交数据 默认提交数据1  0为不提交数据
                       //    readonly: "1",//是否只读 1 只读 0 可写 默认可写
                       //    defaultvalue: $("#MC001").val(),//默认值字段
                       //    isGuid: 0,//是否为自动标识 默认为不是自动标识0  1为设置自动标识
                       //    Guidlength: 4,//自动标识长度 默认标识长度0
                       //    isRequired: 0,//是否必填 默认不必填0 必填 1
                       //    RequiredInfo: "",//未填提示信息 默认空
                       //    IsSet: 0,//是否赋值 默认不赋值
                       //},
                    ],//表单Json
                    BackSpace: "",//开窗域
                    IsHaveDelete: "1",//是否有删除按钮 1 有 0无
                }, opts = $.extend(defaults, options), SubTableID = opts.SubTableID, OpenGuid = opts.OpenGuid, InputJson = opts.InputJson, BackSpace = opts.BackSpace, IsHaveDelete = opts.IsHaveDelete;
                if (!_em_options.isEmpty(SubTableID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "Open_AddSubRow", "MSG": "单身表格标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(OpenGuid)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "Open_AddSubRow", "MSG": "开窗标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "Open_AddSubRow", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.CheckJson(InputJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "Open_AddSubRow", "MSG": "表单Json格式不符" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                //******更新数组存储
                var HaveGuid_UpdateArr = [];
                for (var i = 0; i < $("#" + SubTableID + " tbody tr[trtype='update']").length; i++) {
                    HaveGuid_UpdateArr.push($($("#" + SubTableID + " tbody tr[trtype='update']")[i]).attr("guidvalue"));
                }

                //开窗后反弹长度
                var SubLength = $("#MutiSubLength").val();

                var SubTableOpentr = $("#" + SubTableID + " tbody tr[add-type='open']");
                //原始值存储
                var NoSetArr = [];
                for (var i = 0; i < SubTableOpentr.length; i++) {
                    var notsetinput = $(SubTableOpentr[i]).find("input[isSet='0'],select[isSet='0']");
                    var bb = "{";
                    for (var j = 0; j < notsetinput.length; j++) {
                        if (j == notsetinput.length - 1) {
                            bb += "InputName:\"" + $(notsetinput[j]).attr('name') + "\"," + OpenGuid + ":\"" + $(SubTableOpentr[i]).attr("guidvalue") + "\",LASTVALUE:\"" + $(notsetinput[j]).val() + "\"}";
                            NoSetArr.push(eval('(' + bb + ')'));
                        }
                        else {
                            bb += "InputName:\"" + $(notsetinput[j]).attr('name') + "\"," + OpenGuid + ":\"" + $(SubTableOpentr[i]).attr("guidvalue") + "\",LASTVALUE:\"" + $(notsetinput[j]).val() + "\",";
                        }
                    }
                }

                var SubDataJson = JSON.parse($("#MutiOpenBackSet_" + BackSpace).val());
                var XzData = JSON.parse($("#MutiOpenBackBack_" + BackSpace).val());

                var addhtml = '';
                for (var subi = 0; subi < SubLength; subi++) {
                    var Guid = eval("XzData[" + subi + "]." + OpenGuid);
                    _em_options.Sub_i = subi + 1;
                    ($.inArray(Guid, HaveGuid_UpdateArr) == -1) ? addhtml += '<tr class="template" trtype="add" add-type="open" idguid="' + OpenGuid + '" guidvalue="' + Guid + '" sub-index="' + _em_options.Sub_i + '" prepend-index="' + _em_options.Sub_i + '" append-index = "' + _em_options.Sub_i + '">' : addhtml += '<tr class="template" trtype="update" add-type="open"  idguid="' + OpenGuid + '" guidvalue="' + Guid + '" sub-index="' + _em_options.Sub_i + '" prepend-index="' + _em_options.Sub_i + '" append-index = "' + _em_options.Sub_i + '">';
                    for (var i = 0; i < InputJson.length; i++) {
                        var InputType = InputJson[i].InputType;//表单元素类型        ★必传
                        var InputName = InputJson[i].InputName;//表单元素Name 索引ID ★必传
                        var IsSet = InputJson[i].IsSet || 0;//是否赋值 默认不赋值
                        var isOpen = InputJson[i].isOpen || 0;//是否开窗(默认不开窗)
                        var OpenFunctionName = InputJson[i].OpenFunctionName || null;//开窗方法名称(默认无)
                        var OpenFunctionArr = InputJson[i].OpenFunctionArr || null;//开窗方法追加参数(默认无)
                        var readonly = InputJson[i].readonly || 0;//是否只读 (默认可写)
                        var children = InputJson[i].children || "";//子元素Html//默认值 ("")
                        var isAdd = InputJson[i].isAdd || "1";//是否提交数据//默认值 (提交数据)
                        var defaultvalue = InputJson[i].defaultvalue || "";//默认值 (默认空值)
                        var isGuid = InputJson[i].isGuid || 0;//是否自动标识 (默认0)
                        var Guidlength = InputJson[i].Guidlength || 0;//自动标识长度 (默认0)
                        var isRequired = InputJson[i].isRequired || 0;//是否必填 (默认不必填)
                        var RequiredInfo = InputJson[i].RequiredInfo || "";//提示信息 (默认空值)
                        /* ---------------------------Hidden:隐藏元素------------------------------------*/
                        if (InputType == 'hidden') {
                            //默认值(自动标识)
                            if (isGuid == '1') {
                                addhtml +=
                                    '<td style="display:none;">\
                                <input type="hidden" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" >\
                            </td>';
                            }
                                //默认值(不是自动标识)
                            else {
                                addhtml +=
                                    '<td style="display:none;">\
                                <input type="hidden" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                            </td>';
                            }
                        }
                            /* ---------------------------Text:文本元素------------------------------------*/
                        else if (InputType == 'text') {
                            //开窗
                            if (isOpen == '1') {
                                var ClickString = '';
                                if (OpenFunctionArr.length == 0) {
                                    ClickString = OpenFunctionName + '("' + _em_options.Sub_i + '")';
                                }
                                else {
                                    ClickString += OpenFunctionName + '("' + _em_options.Sub_i + ',';
                                    for (var j = 0; j < OpenFunctionArr.length; j++) {
                                        if (j == OpenFunctionArr.length - 1)
                                            ClickString += '"' + OpenFunctionArr[j] + '")'
                                        else
                                            ClickString += '"' + OpenFunctionArr[j] + '",'
                                    }
                                }
                                //只读 开窗
                                if (readonly == '1') {
                                    //只读 开窗 默认值（自动标识）
                                    if (isGuid == '1') {
                                        addhtml +=
                                            '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                    }
                                        //只读 开窗 默认值（非自动标识）
                                    else {
                                        addhtml +=
                                            '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                    }
                                }
                                    //可写 开窗
                                else {
                                    //可写 开窗 默认值（自动标识）
                                    if (isGuid == '1') {
                                        addhtml +=
                                            '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                    }
                                        //可写 开窗 默认值（非自动标识）
                                    else {
                                        addhtml +=
                                            '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                    }
                                }
                            }
                                //非开窗
                            else {
                                //只读 非开窗
                                if (readonly == '1') {
                                    //只读 非开窗 默认值（自动标识）
                                    if (isGuid == '1') {
                                        addhtml +=
                                            '<td>\
                                        <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                    }
                                        //只读 非开窗 默认值（非自动标识）
                                    else {
                                        addhtml +=
                                            '<td>\
                                        <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                    }
                                }
                                    //可写 非开窗
                                else {
                                    //可写 非开窗 默认值（自动标识）
                                    if (isGuid == '1') {
                                        addhtml +=
                                            '<td>\
                                        <input type="text"  class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + _em_options.addPre("0", _em_options.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                    }
                                        //可写 非开窗 默认值（非自动标识）
                                    else {
                                        addhtml +=
                                            '<td>\
                                        <input type="text"  class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + _em_options.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                    }
                                }
                            }
                        }
                            /* ---------------------------Select:下拉元素------------------------------------*/
                        else if (InputType == 'select') {
                            addhtml += '<td><select name="' + InputName + '" id="' + InputName + '_' + _em_options.Sub_i + '" IsSet="' + IsSet + '" sub-data-add="' + isAdd + '" class="form-control" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">' + children + '</select></td>';
                        }
                    }
                    if (IsHaveDelete == '1') {
                        addhtml +=
                            '<td>\
                        <button type="button" name="btn_del" id="btn_del_' + _em_options.Sub_i + '" class="delrow demo-delete-row btn btn-danger btn-xs">\
                            <i class="demo-pli-cross"></i>\
                        </button>\
                    </td>\
                </tr>';
                    }
                    else {
                        addhtml += '<td>\
                          </td>\
                    </tr>';
                    }
                }

                $("#" + SubTableID + " tbody").html(addhtml);
                _em_options.AddSubDeleteClick(SubTableID, BackSpace);
                for (var subdatai = 0; subdatai < SubDataJson.length; subdatai++) {
                    for (var key in SubDataJson[subdatai]) {
                        $("#" + SubTableID + " tbody tr[sub-index='" + eval(subdatai + 1) + "'] input[IsSet='1'][name='" + key + "']").val(SubDataJson[subdatai][key]);
                        $("#" + SubTableID + " tbody tr[sub-index='" + eval(subdatai + 1) + "'] select[IsSet='1'][name='" + key + "']").val(SubDataJson[subdatai][key]);
                    }
                }
                for (var subnoi = 0; subnoi < NoSetArr.length; subnoi++) {
                    var Guid = eval("NoSetArr[" + subnoi + "]." + OpenGuid);
                    $("#" + SubTableID + " tbody tr[guidvalue='" + Guid + "'] input[IsSet='0'][name='" + NoSetArr[subnoi].InputName + "']").val(NoSetArr[subnoi].LASTVALUE);
                    $("#" + SubTableID + " tbody tr[guidvalue='" + Guid + "'] select[IsSet='0'][name='" + NoSetArr[subnoi].InputName + "']").val(NoSetArr[subnoi].LASTVALUE);
                }
                var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "Open_AddSubRow", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "Open_AddSubRow", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//开窗添加单身行
        "EditMutiSubLoad": function (options, callback) {
            try {
                var defaults = {
                    SubTableID: "",//单身表格ID
                    SubGuid: "",//标识
                    BackSpace: "",//开窗域
                }, opts = $.extend(defaults, options), SubTableID = opts.SubTableID, SubGuid = opts.SubGuid, BackSpace = opts.BackSpace;
                if (!_em_options.isEmpty(SubTableID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "EditMutiSubLoad", "MSG": "单身表格标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(SubGuid)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "EditMutiSubLoad", "MSG": "标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "EditMutiSubLoad", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                _em_options.CreateHiddenInput([
                    "MutiOpenBackBack_" + BackSpace,
                ]);
                var tr = $("#" + SubTableID + " tbody tr"), Json = "";
                (tr.length > 0) ? Json = "[{" : Json = "}]"
                for (var i = 0; i < tr.length; i++) {
                    var input = $(tr[i]).find("input[isset='1']");
                    for (var j = 0; j < input.length; j++) {
                        if (j == input.length - 1) {
                            Json += "\"" + $(input[j]).attr("MutiPleCol") + "\":\"" + $(input[j]).val() + "\",\"" + SubGuid + "\":" + $(tr[i]).attr(SubGuid) + "}"
                        }
                        else {
                            Json += "\"" + $(input[j]).attr("MutiPleCol") + "\":\"" + $(input[j]).val() + "\","
                        }
                    }
                    if (i == tr.length - 1) {
                        Json += "]";
                    }
                    else {
                        Json += ",{";
                    }
                }
                $("#MutiOpenBackBack_" + BackSpace).val(Json);
                var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "EditMutiSubLoad", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "EditMutiSubLoad", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//编辑多行单身自动载入数据
        "SubLoadSelect": function (options, callback) {
            try {
                var defaults = {
                    TableID: "",//单身表格ID
                    BackSpace: "",//开窗域
                    ViewFiledArr: [
                        //"Col1",
                        //"Col2",
                        //"Col3",
                        //"Col4",
                    ],//别名数组
                    InputFiledArr: [
                        //"input_Col1",
                        //"input_Col2",
                        //"input_Col3",
                        //"input_Col4",
                    ],//表单数组
                }, opts = $.extend(defaults, options), TableID = opts.TableID, BackSpace = opts.BackSpace, ViewFiledArr = opts.ViewFiledArr, InputFiledArr = opts.InputFiledArr;
                if (!_em_options.isEmpty(TableID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "SubLoadSelect", "MSG": "单身表格ID不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "SubLoadSelect", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.CheckArray(ViewFiledArr)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "SubLoadSelect", "MSG": "别名数组数据类型不符或无数据" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.CheckArray(InputFiledArr)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "SubLoadSelect", "MSG": "表单数组数据类型不符或无数据" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                _em_options.CreateHiddenInput([
                    "MutiOpenBackBack_" + BackSpace
                ]);
                var tableObj = $("#" + TableID + " tbody")[0], InSelectValue = '';
                (tableObj.rows.length > 0) ? InSelectValue = '[' : InSelectValue = '[]';
                for (var i = 0; i < tableObj.rows.length; i++) {
                    var inputvalue = '{';
                    for (var j = 0; j < ViewFiledArr.length; j++) {
                        if (j == ViewFiledArr.length - 1) {
                            inputvalue += '\"' + ViewFiledArr[j] + '\":\"' + $(tableObj.rows[i]).find("input[name='" + InputFiledArr[j] + "']")[0].value + '\",\"' + $(tableObj.rows[i]).attr("idguid") + '\":\"' + $(tableObj.rows[i]).attr("guidvalue") + '\",\"ROWID\":\"' + eval(i + 1) + '\"},';
                            InSelectValue += inputvalue;
                        }
                        else {
                            inputvalue += '\"' + ViewFiledArr[j] + '\":\"' + $(tableObj.rows[i]).find("input[name='" + InputFiledArr[j] + "']")[0].value + '\",';
                        }
                    }
                    if (i == tableObj.rows.length - 1) {
                        InSelectValue = _em_options.GetSubString(InSelectValue, 1) + ']';
                    }
                }
                $("#MutiOpenBackBack_" + BackSpace).val(InSelectValue);
                var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "SubLoadSelect", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "SubLoadSelect", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//单身载入数据
        "PublicOpen_Main": function (options, callback) {
            try {
                var defaults = {
                    OpenGuid: "",//开窗标识
                    OpenTabName: "",//开窗数据源
                    FieldJson: [
                        //{//说明
                        //    field: "COL",
                        //    title: "列",
                        //    setElement: "COLELE",
                        //    isShow: "1",
                        //    IsBack: "1"
                        //}
                    ],//开窗字段
                    WhereJson: "",//开窗条件
                    //[
                    //    {//说明
                    //        wherekey:"WHERECOL",//条件列名
                    //        wherevalue:"WHEREVALUE",//条件列值
                    //        wheretype:"=",//条件类型
                    //        IsSingle:"1",//条件条数 1 单条 0 多条
                    //        MutipleType:"and" //条件多条时类型
                    //    }
                    //]
                    OrderJson: "",//开窗排序
                    //[
                    //    {//说明
                    //        SortName:"SORTCOL",//排序列名
                    //        SortDesc:"SORTTYPE",//排序类型
                    //    }
                    //]
                    OpenTitle: "开窗",//开窗弹出窗口名称
                    OpenIsSingle: 1,//开窗类型 1 单选 0 多选
                    OpenWidth: "90%",//开窗宽度
                    OpenHeight: "90%",//开窗高度
                    BackSpace: "",//开窗高度
                    IsBeRelate: 0,//开窗字段是否有其他开窗关联 0 不关联 1关联
                    BackNulledRelateField: "", //更改时清空关联字段数组字段
                }, opts = $.extend(defaults, options), OpenGuid = opts.OpenGuid, OpenTabName = opts.OpenTabName, FieldJson = opts.FieldJson,
                    OpenTitle = opts.OpenTitle, OpenIsSingle = opts.OpenIsSingle, WhereJson = opts.WhereJson, OrderJson = opts.OrderJson,
                    OpenWidth = opts.OpenWidth, OpenHeight = opts.OpenHeight, BackSpace = opts.BackSpace,
                    IsBeRelate = opts.IsBeRelate, BackNulledRelateField = opts.BackNulledRelateField;
                if (!_em_options.isEmpty(OpenTabName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "MSG": "开窗数据源不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(OpenGuid)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "MSG": "开窗标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (IsBeRelate == '1') {
                    if (!_em_options.isEmpty(BackNulledRelateField)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "MSG": "清空关联字段数组字段不能为空" };
                        _em_options.GeneraCallBack(d, callback);
                        return
                    }
                }
                if (!_em_options.CheckJson(FieldJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "MSG": "字段Json格式不符" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (WhereJson != "") {
                    if (!_em_options.CheckJson(WhereJson)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "MSG": "条件Json格式不符" };
                        _em_options.GeneraCallBack(d, callback);
                        return
                    }
                }
                if (OrderJson != "") {
                    if (!_em_options.CheckJson(OrderJson) && OrderJson != "") {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "MSG": "排序Json格式不符" };
                        _em_options.GeneraCallBack(d, callback);
                        return
                    }
                }
                if (IsBeRelate == '1') {
                    _em_options.CreateHiddenInput([
                        BackSpace + "_BackNulledRelateField"
                    ]);
                    var BackNulledRelateField = BackNulledRelateField || [];
                    $("#" + BackSpace + "_BackNulledRelateField").val(BackNulledRelateField.join(','));
                }
                _em_options.CreateHiddenInput([
                        "BackSpace",
                        "OpenField",
                        "OpenTitle",
                        "OpenSetName",
                        "OpenIsSingle",
                        "OpenTabName",
                        "OpenWhere",
                        "OpenOrder",
                        "OpenBack",
                        "OpenBackBack_" + BackSpace,
                        "OpenGuid_" + BackSpace,
                        "OpenIsChange_" + BackSpace
                ]);
                var Field_F = '', Field_T = ''; setName = '', Where = '', Order = '', BackArr = [];
                for (var i = 0; i < FieldJson.length; i++) {
                    var field = FieldJson[i].field;//必传★
                    var setElement = FieldJson[i].setElement || 'null';//赋值元素 默认null
                    var setValue = $("#" + FieldJson[i].setElement).val();//赋值元素 默认null
                    var title = FieldJson[i].title || field;//默认为字段名
                    var IsBack = FieldJson[i].IsBack || '0';//默认不回弹
                    var isShow = FieldJson[i].isShow || '1';//默认显示  
                    //添加返回值
                    BackArr.push({ LastValue: $("#" + setElement).val() || "", IsBack: IsBack, BackSpace: BackSpace });
                    Field_F += field + ","; setName += setElement + ",";
                    if (isShow == '1') {
                        Field_T += title + ',';
                    }
                    else {
                        Field_T += title + '·,';
                    }
                }
                for (var i = 0; i < WhereJson.length; i++) {
                    var Key = WhereJson[i].wherekey;//条件列名★必传
                    var Value = WhereJson[i].wherevalue;//条件列值 ★必传
                    var wheretype = WhereJson[i].wheretype;//条件类型 ★必传
                    var IsSingle = WhereJson[i].IsSingle || 1;//条件条数(默认单条)
                    var MutipleType = WhereJson[i].MutipleType || 'and';
                    //条件多条时类型(默认 and【and or】仅 IsSingle == '0'生效 且wheretype 不等于not in 和in 时生效)
                    if (wheretype == '<>') {/***不等***/
                        if (IsSingle == '1') {/***单条***/
                            Where += Key + " <> \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " <> \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " <> \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '=') {/***等于***/
                        if (IsSingle == '1') {/***单条***/
                            Where += Key + " = \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " = \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " = \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '>') {/***大于***/
                        if (IsSingle == '1') {
                            Where += Key + " > \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " > \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " > \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '<') {/***小于***/
                        if (IsSingle == '1') {
                            Where += Key + " < \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " < \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " < \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '>=') {/***大等于***/
                        if (IsSingle == '1') {/******单条大等于带引号******/
                            Where += Key + " >= \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " >= \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " >= \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '<=') {/***小等于***/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " <= \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " <= \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " <= \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'leftlike') {/******左模糊******/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " like \'%" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'rightlike') {/******右模糊******/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " like \'" + Value + "%\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " like \'" + ValueArr[Keyi] + "%\') and " : Where += KeyArr[Keyi] + " like \'" + ValueArr[Keyi] + "%\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'alllike') {/******全模糊******/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " like \'%" + Value + "%\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "%\') and " : Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "%\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'in') {/******in******/
                        (Value.indexOf(",") == -1) ? Where += Key + " in (\'" + Value + "\') and " : Where += Key + " in (\'" + _em_options.ArrayToString(Value.split(','), "\',\'") + "\') and ";
                    }
                    else if (wheretype == 'not in') {/******not in******/
                        (Value.indexOf(",") == -1) ? Where += Key + " not in (\'" + Value + "\') and " : Where += Key + " not in (\'" + _em_options.ArrayToString(Value.split(','), "\',\'") + "\') and ";;
                    }
                }
                for (var i = 0; i < OrderJson.length; i++) {
                    var SortName = OrderJson[i].SortName;
                    var SortDesc = OrderJson[i].SortDesc;
                    (i == OrderJson.length - 1) ? Order += SortName + " " + OrderJson[i].SortDesc : Order += SortName + " " + OrderJson[i].SortDesc + ",";
                }
                $("#OpenField").val(_em_options.GetSubString(Field_F, 1));
                $("#OpenTitle").val(_em_options.GetSubString(Field_T, 1));
                $("#OpenSetName").val(_em_options.GetSubString(setName, 1));
                $("#OpenIsSingle").val(OpenIsSingle);
                $("#OpenTabName").val(OpenTabName);
                $("#OpenWhere").val(Where);
                $("#OpenOrder").val(Order);
                $("#BackSpace").val(BackSpace);
                $("#OpenBack").val(JSON.stringify(BackArr));
                $("#OpenGuid_" + BackSpace).val(_em_options.trim(OpenGuid));
                $("#OpenIsChange_" + BackSpace).val("0");
                layer.open({
                    type: 2,
                    title: ["", 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                    shade: [0.3, '#393D49'],
                    closeBtn: 1,
                    area: [OpenWidth, OpenHeight],
                    content: '../publicopen/opendata_new?&title=' + OpenTitle,
                    end: function () {
                        if ($("#OpenIsChange_" + BackSpace).val() == '1') {
                            var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "MSG": "操作成功，变换" };
                            _em_options.GeneraCallBack(d, callback);
                        }
                        else {
                            var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "MSG": "操作成功，未变换" };
                            _em_options.GeneraCallBack(d, callback);
                        }
                    }
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "PublicOpen_Main", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//单头开窗
        "PublicOpen_Sub": function (options, callback) {
            try {
                var defaults = {
                    OpenGuid: "",//开窗标识
                    OpenTabName: "",//开窗数据源
                    FieldJson: [
                        //{//说明
                        //    field: "COL",
                        //    title: "列",
                        //    setElement: "COLELE",
                        //    isShow: "1",
                        //    IsBack: "1"
                        //}
                    ],//开窗字段
                    WhereJson: "",//开窗条件
                    //[
                    //    {//说明
                    //        wherekey:"WHERECOL",//条件列名
                    //        wherevalue:"WHEREVALUE",//条件列值
                    //        wheretype:"=",//条件类型
                    //        IsSingle:"1",//条件条数 1 单条 0 多条
                    //        MutipleType:"and" //条件多条时类型
                    //    }
                    //]
                    OrderJson: "",//开窗排序
                    //[
                    //    {//说明
                    //        SortName:"SORTCOL",//排序列名
                    //        SortDesc:"SORTTYPE",//排序类型
                    //    }
                    //]
                    OpenTitle: "开窗",//开窗弹出窗口名称
                    OpenIsSingle: 1,//开窗类型 1 单选 0 多选
                    OpenWidth: "90%",//开窗宽度
                    OpenHeight: "90%",//开窗高度
                    BackSpace: "",//开窗高度
                    SubIndex: "0",//单身开窗索引
                    IsBeRelate: 0,//开窗字段是否有其他开窗关联 0 不关联 1关联
                    BackNulledRelateField: "", //更改时清空关联字段数组字段
                }, opts = $.extend(defaults, options), OpenGuid = opts.OpenGuid, OpenTabName = opts.OpenTabName, FieldJson = opts.FieldJson, OpenTitle = opts.OpenTitle, OpenIsSingle = opts.OpenIsSingle, WhereJson = opts.WhereJson, OrderJson = opts.OrderJson, OpenWidth = opts.OpenWidth, OpenHeight = opts.OpenHeight, BackSpace = opts.BackSpace, SubIndex = opts.SubIndex, IsBeRelate = opts.IsBeRelate, BackNulledRelateField = opts.BackNulledRelateField;
                if (!_em_options.isEmpty(OpenTabName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "MSG": "开窗数据源不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(OpenGuid)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "MSG": "开窗标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (IsBeRelate == '1') {
                    if (!_em_options.isEmpty(BackNulledRelateField)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "MSG": "清空关联字段数组字段不能为空" };
                        _em_options.GeneraCallBack(d, callback);
                        return
                    }
                }
                if (!_em_options.CheckJson(FieldJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "MSG": "字段Json格式不符" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (WhereJson != "") {
                    if (!_em_options.CheckJson(WhereJson)) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "MSG": "条件Json格式不符" };
                        _em_options.GeneraCallBack(d, callback);
                        return
                    }
                }
                if (OrderJson != "") {
                    if (!_em_options.CheckJson(OrderJson) && OrderJson != "") {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "MSG": "排序Json格式不符" };
                        _em_options.GeneraCallBack(d, callback);
                        return
                    }
                }
                _em_options.CreateHiddenInput([
                        "BackSpace",
                        "OpenField",
                        "OpenTitle",
                        "OpenSetName",
                        "OpenIsSingle",
                        "OpenTabName",
                        "OpenWhere",
                        "OpenOrder",
                        "OpenBack",
                        "OpenBackBack_" + BackSpace + "_" + SubIndex,
                        "OpenGuid_" + BackSpace + "_" + SubIndex,
                        "OpenIsChange_" + BackSpace + "_" + SubIndex
                ]);
                if (IsBeRelate == '1') {
                    _em_options.CreateHiddenInput([
                        BackSpace + "_BackNulledRelateField_" + SubIndex
                    ]);
                    var BackNulledRelateField = BackNulledRelateField || [];
                    $("#" + BackSpace + "_BackNulledRelateField_" + SubIndex).val(BackNulledRelateField.join(','));
                }
                var Field_F = '', Field_T = '', setName = '', Where = '', Order = '', BackArr = [];
                for (var i = 0; i < FieldJson.length; i++) {
                    var field = FieldJson[i].field;//必传★
                    var setElement = FieldJson[i].setElement || 'null';//赋值元素 默认null
                    var setValue = $("#" + FieldJson[i].setElement).val();//赋值元素 默认null
                    var title = FieldJson[i].title || field;//默认为字段名
                    var IsBack = FieldJson[i].IsBack || '0';//默认不回弹
                    var isShow = FieldJson[i].isShow || '1';//默认显示  
                    //添加返回值
                    BackArr.push({ LastValue: $("#" + setElement).val() || "", IsBack: IsBack, BackSpace: BackSpace });
                    Field_F += field + ","; setName += setElement + ",";
                    if (isShow == '1') {
                        Field_T += title + ',';
                    }
                    else {
                        Field_T += title + '·,';
                    }
                }
                for (var i = 0; i < WhereJson.length; i++) {
                    var Key = WhereJson[i].wherekey;//条件列名★必传
                    var Value = WhereJson[i].wherevalue;//条件列值 ★必传
                    var wheretype = WhereJson[i].wheretype;//条件类型 ★必传
                    var IsSingle = WhereJson[i].IsSingle || 1;//条件条数(默认单条)
                    var MutipleType = WhereJson[i].MutipleType || 'and';
                    //条件多条时类型(默认 and【and or】仅 IsSingle == '0'生效 且wheretype 不等于not in 和in 时生效)
                    if (wheretype == '<>') {/***不等***/
                        if (IsSingle == '1') {/***单条***/
                            Where += Key + " <> \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " <> \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " <> \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '=') {/***等于***/
                        if (IsSingle == '1') {/***单条***/
                            Where += Key + " = \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " = \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " = \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '>') {/***大于***/
                        if (IsSingle == '1') {
                            Where += Key + " > \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " > \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " > \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '<') {/***小于***/
                        if (IsSingle == '1') {
                            Where += Key + " < \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " < \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " < \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '>=') {/***大等于***/
                        if (IsSingle == '1') {/******单条大等于带引号******/
                            Where += Key + " >= \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " >= \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " >= \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == '<=') {/***小等于***/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " <= \'" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " <= \'" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " <= \'" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'leftlike') {/******左模糊******/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " like \'%" + Value + "\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "\') and " : Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'rightlike') {/******右模糊******/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " like \'" + Value + "%\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " like \'" + ValueArr[Keyi] + "%\') and " : Where += KeyArr[Keyi] + " like \'" + ValueArr[Keyi] + "%\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'alllike') {/******全模糊******/
                        if (IsSingle == '1') {/******单条******/
                            Where += Key + " like \'%" + Value + "%\' and ";
                        }
                        else {/***多条***/
                            var KeyArr = Key.split(",");
                            var ValueArr = Value.split(",");
                            Where += "(";
                            for (var Keyi = 0; Keyi < KeyArr.length; Keyi++) (Keyi == KeyArr.length - 1) ? Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "%\') and " : Where += KeyArr[Keyi] + " like \'%" + ValueArr[Keyi] + "%\' " + MutipleType + " ";
                        }
                    }
                    else if (wheretype == 'in') {/******in******/
                        (Value.indexOf(",") == -1) ? Where += Key + " in (\'" + Value + "\') and " : Where += Key + " in (\'" + _em_options.ArrayToString(Value.split(','), "\',\'") + "\') and ";
                    }
                    else if (wheretype == 'not in') {/******not in******/
                        (Value.indexOf(",") == -1) ? Where += Key + " not in (\'" + Value + "\') and " : Where += Key + " not in (\'" + _em_options.ArrayToString(Value.split(','), "\',\'") + "\') and ";;
                    }
                }
                for (var i = 0; i < OrderJson.length; i++) {
                    var SortName = OrderJson[i].SortName;
                    var SortDesc = OrderJson[i].SortDesc;
                    (i == OrderJson.length - 1) ? Order += SortName + " " + OrderJson[i].SortDesc : Order += SortName + " " + OrderJson[i].SortDesc + ",";
                }
                $("#OpenField").val(_em_options.GetSubString(Field_F, 1));
                $("#OpenTitle").val(_em_options.GetSubString(Field_T, 1));
                $("#OpenSetName").val(_em_options.GetSubString(setName, 1));
                $("#OpenIsSingle").val(OpenIsSingle);
                $("#OpenTabName").val(OpenTabName);
                $("#OpenWhere").val(Where);
                $("#OpenOrder").val(Order);
                $("#BackSpace").val(BackSpace);
                $("#OpenBack").val(JSON.stringify(BackArr));
                $("#OpenGuid_" + BackSpace).val(_em_options.trim(OpenGuid));
                $("#OpenIsChange_" + BackSpace).val("0");
                layer.open({
                    type: 2,
                    title: ["", 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                    shade: [0.3, '#393D49'],
                    closeBtn: 1,
                    area: [OpenWidth, OpenHeight],
                    content: '../publicopen/opendata_new?&title=' + OpenTitle,
                    end: function () {
                        if ($("#OpenIsChange_" + BackSpace).val() == '1') {
                            var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "MSG": "操作成功，变换" };
                            _em_options.GeneraCallBack(d, callback);
                        }
                        else {
                            var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "MSG": "操作成功，未变换" };
                            _em_options.GeneraCallBack(d, callback);
                        }
                    }
                });
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "PublicOpen_Sub", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//单身开窗
        "PublickOpenBack_Main": function (options, callback) {
            try {
                var defaults = {
                    BackSpace: "",//开窗域
                }, opts = $.extend(defaults, options), BackSpace = opts.BackSpace;
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublickOpenBack_Main", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                //区域_是否返回
                var open_back = "isback_" + BackSpace;
                //区域_上次值
                var lastvalue = "lastvalue_" + BackSpace;
                var backinputs = $("input[" + open_back + "='1']");
                for (var i = 0; i < backinputs.length; i++)
                    $(backinputs[i]).val($(backinputs[i]).attr(lastvalue));
                var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "PublickOpenBack_Main", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "PublickOpenBack_Main", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//单头数据回弹
        "PublickOpenBack_Sub": function (options, callback) {
            try {
                var defaults = {
                    SubTableId: "",//单身表ID标识
                    SubIndex: 0,//单身索引
                    BackSpace: ""//开窗域
                };
                var opts = $.extend(defaults, options), SubTableId = opts.SubTableId, SubIndex = opts.SubIndex, BackSpace = opts.BackSpace;
                if (!_em_options.isEmpty(SubTableId)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublickOpenBack_Sub", "MSG": "单身表ID标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "PublickOpenBack_Sub", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                //区域_是否返回
                var open_back = "isback_" + BackSpace;
                //区域_上次值
                var lastvalue = "lastvalue_" + BackSpace;
                var backinputs = $("#" + SubTableId + " tbody tr[sub-index='" + SubIndex + "'] input[" + open_back + "='1']");
                for (var i = 0; i < backinputs.length; i++) {
                    if ($(backinputs[i]).attr(open_back) == '1') {
                        $(backinputs[i]).val($(backinputs[i]).attr(lastvalue));
                    }
                }
                var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "PublickOpenBack_Sub", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "PublickOpenBack_Sub", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//单身数据回弹
        "Public_BackNulledRelateField": function (options, callback) {
            try {
                var defaults = {
                    BackSpace: "",//开窗域
                    OpenType: "main",//开窗类型
                    SubIndex: 0,//单身索引
                }, opts = $.extend(defaults, options), SubIndex = opts.SubIndex,
                    OpenType = opts.OpenType,
                    BackSpace = opts.BackSpace;
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "Public_BackNulledRelateField", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (OpenType == 'main') {
                    var NullElementValue;
                    if ($("#" + BackSpace + "_BackNulledRelateField").length == 0) {
                        var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "Public_BackNulledRelateField", "MSG": BackSpace + "-开窗区域:未找到元素" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                    else {
                        NullElementValue = $("#" + BackSpace + "_BackNulledRelateField").val();
                        var NullArr = NullElementValue.split(',');
                        for (var i = 0; i < NullArr.length; i++) {
                            $("#" + NullArr[i]).val("");
                        }
                        var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "Public_BackNulledRelateField", "MSG": "操作成功" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
                else if (OpenType = 'sub') {
                    var NullElementValue;
                    if ($("#" + BackSpace + "_BackNulledRelateField_" + SubIndex).length == 0) {
                        var d = { "RST": "ERR", "ICO": "2", "MSG": BackSpace + "-开窗区域:索引未找到" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                    else {
                        NullElementValue = $("#" + BackSpace + "_BackNulledRelateField_" + SubIndex).val()
                        var NullArr = NullElementValue.split(',');
                        for (var i = 0; i < NullArr.length; i++) {
                            $("#" + NullArr[i]).val("");
                        }
                        var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "Public_BackNulledRelateField", "MSG": "操作成功" };
                        _em_options.GeneraCallBack(d, callback);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "Public_BackNulledRelateField", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//关联数据清空
        "CleanTbodySub": function (options, callback) {
            try {
                var defaults = {
                    TableID: "",//表ID标识
                    BackSpace: "",//开窗域
                    SubOpenType: 0//开窗类型 多选 单选
                }, opts = $.extend(defaults, options), TableID = opts.TableID, BackSpace = opts.BackSpace, SubOpenType = opts.SubOpenType;
                if (!_em_options.isEmpty(TableID)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "CleanTbodySub", "MSG": "表标识不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(BackSpace)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "open-api", "FuncName": "CleanTbodySub", "MSG": "开窗域不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                $("#" + TableID + " tbody").html("");
                if (SubOpenType == '1') {
                    _em_options.ClearHiddenInput([
                        "HaveDeleteGuid_" + BackSpace,
                        "IsMutiChange_" + BackSpace,
                        "MutiBackSpace",
                        "MutiSubLength",
                        "MutiOpenField",
                        "MutiOpenTitle",
                        "MutiOpenTabName",
                        "MutiOpenSet",
                        "MutiOpenWhere",
                        "MutiOpenOrder",
                        "MutiOpenBackBack_" + BackSpace,
                        "MutiOpenBackSet_" + BackSpace,
                        "MutiOpenID"
                    ]);
                }
                else {

                }
                var d = { "RST": "SUC", "ICO": "1", "ApiName": "open-api", "FuncName": "CleanTbodySub", "MSG": "操作成功" };
                _em_options.GeneraCallBack(d, callback);
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "open-api", "FuncName": "CleanTbodySub", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//清除表格表体数据
    }

    /** input-api **/
    var _em_input_api = {
        "ReverseCheckedCheckBox": function (options, callback) {
            try {
                var defaults = {
                    checkBoxName: "",//checkbox的name
                    parentName: "",//控制反选按钮的id
                }, opts = $.extend(defaults, options), checkBoxName = opts.checkBoxName, parentName = opts.parentName;
                if (!_em_options.isEmpty(checkBoxName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "input-api", "FuncName": "ReverseCheckedCheckBox", "MSG": "checkbox的name不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(parentName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "input-api", "FuncName": "ReverseCheckedCheckBox", "MSG": "控制反选按钮的id不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                var bool = $("#" + parentName).prop("checked"), serids = document.getElementsByName(checkBoxName), result = true;
                for (var i = 0; i < serids.length; i++) {
                    if (!serids[i].checked) {
                        result = false;
                    }
                }
                $("#" + parentName)[0].checked = result;
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "input-api", "FuncName": "ReverseCheckedCheckBox", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//复选框--子反选父
        "CheckAllCheckBox": function (options, callback) {
            try {
                var defaults = {
                    checkBoxName: "",//checkbox的name
                    parentName: "",//控制反选按钮的id
                }, opts = $.extend(defaults, options), checkBoxName = opts.checkBoxName, parentName = opts.parentName;
                if (!_em_options.isEmpty(checkBoxName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "input-api", "FuncName": "CheckAllCheckBox", "MSG": "checkbox的name不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if (!_em_options.isEmpty(parentName)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "input-api", "FuncName": "CheckAllCheckBox", "MSG": "控制反选按钮的id不能为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                var serids = document.getElementsByName(checkBoxName), bool = $("#" + parentName).prop("checked");
                if (bool) {
                    for (var i = 0; i < serids.length; i++) {
                        serids[i].checked = true;
                    }
                } else {
                    for (var i = 0; i < serids.length; i++) {
                        serids[i].checked = false;
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "input-api", "FuncName": "CheckAllCheckBox", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//复选框--父全选子
        "CreateHiddenInput": function (options, callback) {
            try {
                var defaults = {
                    InputIDArr: [],//元素ID数组
                }, opts = $.extend(defaults, options), InputIDArr = opts.InputIDArr;
                if (!_em_options.CheckArray(InputIDArr)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "input-api", "FuncName": "CreateHiddenInput", "MSG": "元素ID数组类型不符或者为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if ($("body").find("div#HiddenElement").length == '0') {
                    var hiddendiv = '<div id="HiddenElement" style="display:none;"></div>';
                    $("body").append(hiddendiv);
                }
                var DivHidden = $("div#HiddenElement");
                for (var i = 0; i < InputIDArr.length; i++) {
                    if (DivHidden.find($("#" + InputIDArr[i])).length == '0') {
                        var hiddeninput = '<input type="hidden" id="' + InputIDArr[i] + '">';
                        DivHidden.append(hiddeninput);
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "input-api", "FuncName": "CreateHiddenInput", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//创建隐藏元素
        "RemoveHiddenInput": function (options, callback) {
            try {
                var defaults = {
                    InputIDArr: [],//元素ID数组
                }, opts = $.extend(defaults, options), InputIDArr = opts.InputIDArr;
                if (!_em_options.CheckArray(InputIDArr)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "input-api", "FuncName": "RemoveHiddenInput", "MSG": "元素ID数组类型不符或者为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if ($("body").find("div#HiddenElement").length != '0') {
                    var DivHidden = $("div#HiddenElement");
                    for (var i = 0; i < InputIDArr.length; i++) {
                        if (DivHidden.find($("#" + InputIDArr[i])).length != '0') {
                            $("#" + InputIDArr[i]).remove()
                        }
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "input-api", "FuncName": "RemoveHiddenInput", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//移除隐藏元素
        "ClearHiddenInput": function (options, callback) {
            try {
                var defaults = {
                    InputIDArr: [],//元素ID数组
                }, opts = $.extend(defaults, options), InputIDArr = opts.InputIDArr;
                if (!_em_options.CheckArray(InputIDArr)) {
                    var d = { "RST": "ERR", "ICO": "2", "ApiName": "input-api", "FuncName": "ClearHiddenInput", "MSG": "元素ID数组类型不符或者为空" };
                    _em_options.GeneraCallBack(d, callback);
                    return
                }
                if ($("body").find("div#HiddenElement").length != '0') {
                    var DivHidden = $("div#HiddenElement");
                    for (var i = 0; i < InputIDArr.length; i++) {
                        if (DivHidden.find($("#" + InputIDArr[i])).length != '0') {
                            $("#" + InputIDArr[i]).val("");
                        }
                    }
                }
            } catch (e) {
                var d = { "RST": "ERR", "ApiName": "input-api", "FuncName": "ClearHiddenInput", "ICO": "2", "MSG": "异常:" + e };
                _em_options.GeneraCallBack(d, callback);
            }
        },//清空隐藏元素
    }

    //Open Object
    $._Em_Val = _em_val_api;//值对象
    $._Em_Action = _em_action_api;//数据操作对象
    $._Em_Browser = _em_browser_api;//浏览器操作对象
    $._Em_Extend = _em_extend_api;//拓展操作对象
    $._Em_Table = _em_table_api;//表格操作对象
    $._Em_Convert = _em_convert_api;//转换操作对象
    $._Em_Require = _em_require_api;//验证操作对象
    $._Em_Cookie = _em_cookie_api;//Cookie操作对象
    $._Em_Open = _em_open_api;//开窗操作对象
    $._Em_Input = _em_input_api;//表单操作对象




})(jQuery, window)