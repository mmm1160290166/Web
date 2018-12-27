; (function ($, w) {
    "use strict";
    var f = function () { };
    function a() { return new f(); }
    function defaultcallback(d) { if (d.RST == 'ERR') alert("【" + d.FuncName + "】方法错误:" + d.MSG); }
    //
    $._em = {
        "CreateObj": function (objtype, type) {
            if (!isNaN(objtype)) return a();
            if (!isNaN(type)) return a();
            if (eval("$" + objtype + "." + type) == undefined) return a();
            return eval("$" + objtype + "." + type) || a();
        },
    }














    var $Action = {
        // options: 参数
        // callback: 回调函数
        "exportExcel_Proc": function (options, callback) {
            var defaults = {
                obj: "#tb_departments",//列名拿取表格ID
                ProcName: 'proc_test',//临时数据存储过程
                ExcelName: '测试-Excel', //导出Excel名称        
                PageType: '1',  //是否分页存储过程
            };
            var opts = $.extend(defaults, options);
            $BootStrap.ShowColumnsFresh_BootStrap($(opts.obj).bootstrapTable("getOptions").columns);
            layer.open({
                type: 2,
                title: ['导出Excel', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                shade: [0.3, '#393D49'],
                closeBtn: 1,
                area: ['316px', '550px'],
                content: '/excel/exportprocdata?ExcelName=' + opts.ExcelName + '&ProcName=' + opts.ProcName + '&type=' + opts.PageType,
                end: function () { var d = { "RST": "SUC", "FuncName": "exportExcel_Proc", "ICO": "1", "MSG": "操作成功" }; $Common.GeneraCallBack(d, callback); }
            });
        },
        //
        // options: 参数
        "GetProcParam": function (options, callback) {
            var defaults = {
                FormID: "form1",//提交表单ID
                Param: {//导出存储过程参数
                    "ProName": "proc_test",
                    "ParamCount": "3",
                    "Param": [
                        { "key": "Key", "value": "工号", "type": "String" },
                        { "key": "PageIndex", "value": "1", "type": "Int32" },
                        { "key": "PageSize", "value": "10000", "type": "Int32" }
                    ]
                }
            };
            var opts = $.extend(defaults, options);
            var FORM = $("form#" + opts.FormID);
            var Param = opts.Param;
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
            var d = { "RST": "SUC", "FuncName": "GetProcParam", "ICO": "1", "MSG": "操作成功" }; $Common.GeneraCallBack(d, callback);
        },
        // options: 参数
        // callback: 回调函数
        "Add_Single": function (options, callback) {
            var defaults = {
                TableName: "TEST",//添加表名
                AddJson: [{//添加Json
                    CREATEUSER: Session.UserCode,
                    CRAATEDATE: $Date.format("yyyy-mm-dd")
                }]
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName;
            var AddJson = opts.AddJson;
            if (!$Check.CheckJson(AddJson)) {
                var d = { "RST": "ERR", "FuncName": "Add_Single", "ICO": "2", "MSG": "添加字段Json对象类型不符" }; $Common.GeneraCallBack(d, callback);
            }
            else {
                $Json.Json_Resolve_Single(AddJson);
                if ($Var.JsonStatus == '1') {
                    var AddField = $Var.JsonKeyArr[0].join(",");
                    var AddValue = "\'" + $Var.JsonValueArr[0].join("\',\'") + "\'";
                    $Json.VarJsonRemove();
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
                        $Common.GeneraCallBack(d, callback);
                    });
                }
                else {
                    var d = { "RST": "ERR", "FuncName": "Add_Single", "ICO": "2", "MSG": $Var.JsonMsg };
                    $Common.GeneraCallBack(d, callback);
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "Add_Multiple": function (options, callback) {
            var defaults = {
                TableName: "TEST",//添加表名
                AddJson: [//添加Json
                    {
                        CREATEUSER: Session.UserCode,
                        CRAATEDATE: $Date.format("yyyy-mm-dd")
                    },
                    {
                        CREATEUSER: Session.UserCode,
                        CRAATEDATE: $Date.format("yyyy-mm-dd")
                    }
                ]
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName;
            var AddJson = opts.AddJson;
            if (!$Check.CheckJson(AddJson)) {
                var d = { "RST": "ERR", "FuncName": "Add_Multiple", "ICO": "2", "MSG": "添加字段Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else {
                $Json.Json_Resolve_Multiple(AddJson);
                if ($Var.JsonStatus == '1') {
                    var AddField = $Var.JsonKeyArr[0].join(",");
                    var AddValue = "";
                    for (var i = 0; i < $Var.JsonValueArr.length; i++) {
                        AddValue += "\'" + $Var.JsonValueArr[i].join("\',\'") + "\'|";
                    }
                    $Json.VarJsonRemove();
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
                        $Common.GeneraCallBack(d, callback);
                    });
                }
                else {
                    var d = { "RST": "ERR", "FuncName": "Add_Multiple", "ICO": "2", "MSG": $Var.JsonMsg };
                    $Common.GeneraCallBack(d, callback);
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "Update_Single": function (options, callback) {
            var defaults = {
                TableName: "TEST",//更新表名
                UpdateJson: [{//更新Json
                    MODIUSER: Session.UserCode,
                    MODIDATE: $Date.format("yyyy-mm-dd")
                }],
                UpdateWhereJson: [{//更新条件
                    ID: "0"
                }],
                IsValue: "1"//是否字符串
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName;
            var UpdateJson = opts.UpdateJson;
            var UpdateWhereJson = opts.UpdateWhereJson;
            var IsValue = opts.IsValue;
            if (!$Check.CheckJson(UpdateJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "Update_Single", "MSG": "更新字段Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else if (!$Check.CheckJson(UpdateWhereJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "Update_Single", "MSG": "更新条件Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else {
                if (IsValue == '1')
                    $Json.Json_Eval_Col_Single(UpdateJson);
                else
                    $Json.Json_Eval_Col_Single_Novalue(UpdateJson);
                if ($Var.JsonStatus == '1') {
                    var UpdateContent = $Var.JsonEval;
                    $Json.VarJsonEvalRemove();
                    $Json.Json_Eval_Where_Single(UpdateWhereJson);
                    if ($Var.JsonStatus == '1') {
                        var Where = $Var.JsonEval;
                        $Json.VarJsonEvalRemove();
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
                            d.FuncName = "Update_Single";
                            $Common.GeneraCallBack(d, callback);
                        });
                    }
                    else {
                        var d = { "RST": "ERR", "ICO": "2", "FuncName": "Update_Single", "MSG": $Var.JsonMsg };
                        $Common.GeneraCallBack(d, callback);
                    }
                }
                else {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "Update_Single", "MSG": $Var.JsonMsg };
                    $Common.GeneraCallBack(d, callback);
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "Update_Multiple": function (options, callback) {
            var defaults = {
                TableName: "TEST",//更新表名
                UpdateJson: [//更新Json
                    {
                        MODIUSER: Session.UserCode,
                        MODIDATE: $Date.format("yyyy-mm-dd")
                    },
                    {
                        MODIUSER: Session.UserCode,
                        MODIDATE: $Date.format("yyyy-mm-dd")
                    }
                ],
                UpdateWhereJson: [//更新条件
                    {
                        ID: "0"
                    },
                    {
                        ID: "0"
                    },
                ],
                IsValue: "1"//是否字符串
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName;
            var UpdateJson = opts.UpdateJson;
            var UpdateWhereJson = opts.UpdateWhereJson;
            var IsValue = opts.IsValue;
            if (!$Check.CheckJson(UpdateJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "Update_Multiple", "MSG": "更新字段Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else if (!$Check.CheckJson(UpdateWhereJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "Update_Multiple", "MSG": "更新条件Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else {
                if (IsValue == '1')
                    $Json.Json_Eval_Col_Multiple(UpdateJson, "|");
                else
                    $Json.Json_Eval_Col_Multiple_Novalue(UpdateJson, "|");
                if ($Var.JsonStatus == '1') {
                    var UpdateContent = $Var.JsonEval;
                    $Json.VarJsonEvalRemove();
                    $Json.Json_Eval_Where_Multiple(UpdateWhereJson, "|");
                    if ($Var.JsonStatus == '1') {
                        var Where = $Var.JsonEval;
                        $Json.VarJsonEvalRemove();
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
                            d.FuncName = "Update_Multiple";
                            $Common.GeneraCallBack(d, callback);
                        });
                    }
                    else {
                        var d = { "RST": "ERR", "ICO": "2", "FuncName": "Update_Multiple", "MSG": $Var.JsonMsg };
                        $Common.GeneraCallBack(d, callback);
                    }
                }
                else {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "Update_Multiple", "MSG": $Var.JsonMsg };
                    $Common.GeneraCallBack(d, callback);
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "Delete_Single": function (options, callback) {
            var defaults = {
                TableName: "TEST",//删除表名
                DeleteKey: "ID",//删除键
                DeleteValue: "0"//删除值
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName;
            var DeleteKey = opts.DeleteKey;
            var DeleteValue = opts.DeleteValue;
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
                d.FuncName = "Delete_Single";
                $Common.GeneraCallBack(d, callback);
            });
        },
        // options: 参数
        // callback: 回调函数
        "Delete_Multiple": function (options, callback) {
            var defaults = {
                TableName: "TEST",//删除表名
                DeleteJson: [{//删除Json
                    ID: "0",
                    ID1: "0"
                }]
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName;
            var DeleteJson = opts.DeleteJson;
            if (!$Check.CheckJson(DeleteJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "Delete_Multiple", "MSG": "删除条件Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else {
                $Json.Json_Resolve_Single(DeleteJson);
                if ($Var.JsonStatus == '1') {
                    var ID = "";
                    var IDValue = "";
                    for (var i = 0; i < $Var.JsonKeyArr.length; i++) {
                        ID += $Var.JsonKeyArr + '|';
                        IDValue += '\'' + $Var.JsonValueArr + '\'|';
                    }
                    $Json.VarJsonRemove();
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
                        d.FuncName = "Delete_Multiple";
                        $Common.GeneraCallBack(d, callback);
                    });
                }
                else {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "Delete_Multiple", "MSG": $Var.JsonMsg };
                    $Common.GeneraCallBack(d, callback);
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "ExecProcedure": function (options, callback) {
            var defaults = {
                ProcName: "TEST",//存储过程名
                ProcParam: [{//存储过程参数Json
                    Param1: "0",
                    Param2: "0"
                }]
            };
            var opts = $.extend(defaults, options);
            var ProcName = opts.ProcName;
            var ProcParam = opts.ProcParam;
            if (!$Check.CheckJson(ProcParam)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "ExecProcedure", "MSG": "存储过程参数Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else {
                $Json.Json_Resolve_Single(ProcParam);
                if ($Var.JsonStatus == '1') {
                    var ParamCount = $Var.JsonKeyArr[0].length;
                    var Param = [];
                    for (var i = 0; i < ParamCount; i++) {
                        Param.push({ "key": $Var.JsonKeyArr[0][i], "value": $Var.JsonValueArr[0][i], "type": "String" });
                    }
                    $Json.VarJsonRemove();
                    $.P8.common().postJSON({
                        url: 'api/datainterface/getdatabyprocedure', usercode: Session.UserCode,
                        data: {
                            "ProName": ProcName,
                            "ParamCount": ParamCount,
                            "Param": Param
                        }, async: true //异步请求
                    }, function (d) {
                        d.FuncName = "ExecProcedure";
                        $Common.GeneraCallBack(d, callback);
                    });
                }
                else {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "ExecProcedure", "MSG": $Var.JsonMsg };
                    $Common.GeneraCallBack(d, callback);
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "ExecSqlText": function (options, callback) {
            var defaults = {
                SqlString: "select * from TEST",//执行SQL语句
            };
            var opts = $.extend(defaults, options);
            var SqlString = opts.SqlString;
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
                d.FuncName = "ExecSqlText";
                $Common.GeneraCallBack(d, callback);
            });
        },
        // options: 参数
        // callback: 回调函数
        "QueryRender_Token": function (options, callback) {
            var defaults = {
                TableName: "TEST",//查询表名
                Filter: "",//查询条件
                Order: "",//排序
                RenderHtmlID: "Render",//渲染HTML元素标识
                BeRenderHtmlID: "BeRender"//被渲染元素标识
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName;
            var Filter = opts.Filter;
            var Order = opts.Order;
            var RenderHtmlID = opts.RenderHtmlID;
            var BeRenderHtmlID = opts.BeRenderHtmlID;
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
                d.FuncName = "QueryRender_Token";
                $Common.GeneraCallBack(d, callback);
            });
        },
        // options: 参数
        // callback: 回调函数
        "QueryRender_NoToken": function (options, callback) {
            var defaults = {
                SYSURL: "",//接口路径
                TableName: "TEST",//查询表名
                Filter: "",//查询条件
                Order: "",//排序
                RenderHtmlID: "Render",//渲染HTML元素标识
                BeRenderHtmlID: "BeRender"//被渲染元素标识
            };
            var opts = $.extend(defaults, options);
            var SYSURL = opts.SYSURL;
            var TableName = opts.TableName;
            var Filter = opts.Filter;
            var Order = opts.Order;
            var RenderHtmlID = opts.RenderHtmlID;
            var BeRenderHtmlID = opts.BeRenderHtmlID;
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
                    d.FuncName = "QueryRender_NoToken";
                    $Common.GeneraCallBack(d, callback);
                },
                error: function () {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "QueryRender_NoToken", "MSG": "请求失败" };
                    $Common.GeneraCallBack(d, callback);
                }
            });
        },
        // options: 参数
        // callback: 回调函数
        "QueryBind_Token": function (options, callback) {
            var defaults = {
                TableName: "TEST",//查询表名
                Filter: "",//查询条件
                Order: "",//排序
                BindHtmlPanel: "Render",//赋值HTML元素容器标识
                DataColAttr: "ID"//赋值元素依赖属性
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName;
            var Filter = opts.Filter;
            var Order = opts.Order;
            var BindHtmlPanel = opts.BindHtmlPanel;
            var DataColAttr = opts.DataColAttr;
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
                d.FuncName = "QueryBind_Token";
                $Common.GeneraCallBack(d, callback);
            });
        },
        // options: 参数
        // callback: 回调函数
        "QueryBind_NoToken": function (options, callback) {
            var defaults = {
                SYSURL: "",//接口路径
                TableName: "TEST",//查询表名
                Filter: "",//查询条件
                Order: "",//排序
                BindHtmlPanel: "Render",//赋值HTML元素容器标识
                DataColAttr: "ID"//赋值元素依赖属性
            };
            var opts = $.extend(defaults, options);
            var SYSURL = opts.SYSURL;
            var TableName = opts.TableName;
            var Filter = opts.Filter;
            var Order = opts.Order;
            var BindHtmlPanel = opts.BindHtmlPanel;
            var DataColAttr = opts.DataColAttr;
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
                    d.FuncName = "QueryBind_NoToken";
                    $Common.GeneraCallBack(d, callback);
                },
                error: function () {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "QueryBind_NoToken", "MSG": "请求失败" };
                    $Common.GeneraCallBack(d, callback);
                }
            });
        },
        //
        // options: 参数
        "ColJoinT": function (options) {
            var defaults = {
                ViewName: "Vw_SYSUSER",//视图名
                isSort: "0",//是否排序
            };
            var opts = $.extend(defaults, options);
            var ViewName = opts.ViewName;
            var isSort = opts.isSort;
            var Field = "";
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
            });
            var colString = '[';
            var questioncloumn = [];
            var FieldArr = Field.split(",");
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
            return questioncloumn;
        },
    }

    var $Array = {
        /*
         * 数组去重
         * ---------------------------------------------------------------
         * @arr       {数组对象}         数组对象
         */
        "Array_Distinct": function (Array) {
            if (typeof (Array) != 'object' && typeof (Array) != 'Array') {
                alert("去重对象类型不符");
                return 'error';
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
                return Array;
            }
        },
        /*
         * 数组转换字符串
         * ---------------------------------------------------------------
         * @Array       {数组对象}         转换数组对象
         * @JoinChar    {字符串}           分隔字符
         */
        "ArrayToString": function (Array, JoinChar) {
            if (typeof (Array) != 'object' && typeof (Array) != 'Array') {
                alert("转换对象类型不符");
                return 'error';
            }
            return Array.join(JoinChar);
        },
        /*
         * 返回当前值所在数组的位置
         * ---------------------------------------------------------------
         * @Value       {字符串}           当前值
         * @Array       {数组}             所在数组
         */
        "ValueIndex": function (Value, Array) {
            if (Array.indexOf) {
                return Array.indexOf(Value);
            }
            for (var i = Array.length ; i--;) {
                if (Array[i] === Value) {
                    return i * 1;
                }
            };
            return -1;
        },
        /*
         * 数组中最大的项
         * ---------------------------------------------------------------
         * @Array       {数组}             所在数组
         */
        "max": function (Array) {
            return Math.max.apply(null, Array);
        },
        /*
         * 数组中最小的项
         * ---------------------------------------------------------------
         * @Array       {数组}             所在数组
         */
        "min": function (Array) {
            return Math.min.apply(null, Array);
        },
        /*
         * 移除数组中某值
         * ---------------------------------------------------------------
         * @Array       {数组}             所在数组
         * @Value       {字符串}           某值
         */
        "remove": function (Array, Value) {
            var length = Array.length;
            while (length--) {
                if (Value === Array[length]) {
                    Array.splice(length, 1);
                }
            }
            return Array;
        },
        /*
         *  清空数组
         * ---------------------------------------------------------------
         * @Array       {数组}             所在数组
         */
        "empty": function (Array) {
            (Array || []).length = 0;
            return Array;
        },
        /*
         *  删除数组中 指定位置的值
         * ---------------------------------------------------------------
         * @Array       {数组}             所在数组
         * @Index       {字符串}           索引
         */
        "removeAt": function (Array, Index) {
            Array.splice(Index, 1);
            return Array;
        },
        /*
         * 打乱数组排序
         * ---------------------------------------------------------------
         * @Array       {数组}             所在数组
         */
        "shuffle": function (Array) {
            var array = (Array || []).concat()
                , length = array.length
                , i = length //遍历
                , tmp = null // 临时
                , rand = Angela.math.randInt //位置
                , pos = 0
            ;
            while (i--) {
                pos = rand(0, length);
                //交换随机位置
                tmp = array[pos];
                array[pos] = array[i];
                array[i] = tmp;
            }
            return array;
        },
    }

    var $Browser = {
        /*
         * 浏览器内核类别
         * ---------------------------------------------------------------
         */
        "browsers": {
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
        },
        /*
         * 加入收藏夹
         * ---------------------------------------------------------------
         * @url : 地址
         * @title : 标题
         * @errCall : 错误回调
         */
        "addFav": function (url, title, errCall) {
            try {
                window.external.addFavorite(url, title);
            } catch (e) {
                try {
                    window.sidebar.addPanel(title, url, '');
                } catch (e) {
                    //errCall();
                }
            }
        },
        /*
         * 浏览器版本
         * ---------------------------------------------------------------
         */
        "coreInit": function () {
            var i = null
                , browsers = this.browsers
                , ua = window.navigator.userAgent.toLowerCase()
                , brower = ''
                , pos = 1
            ;
            for (i in browsers) {
                if (brower = ua.match(browsers[i])) {
                    if (i == 'opera') {
                        pos = 2;
                    } else {
                        pos = 1;
                    }
                    this.version = (brower[pos] || '').replace(/[\/\s]+/, '');
                    this.core = i;
                    return i;
                }
            }
        },
        /*
         * 检测IE版本 ！仅支: ie5,6,7,8,9
         * ---------------------------------------------------------------
         */
        "ie": (function () {
            var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
            while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );
            return v > 4 ? v : false;
        })(),
        "isWebkit": /webkit/i.test(navigator.userAgent),
        /*
         *取得浏览器的userAgent字符串
         * ---------------------------------------------------------------
         * @ConvertColIndex       {json}    转换Json
         */
        "myBrowser": function () {
            var userAgent = navigator.userAgent;
            var isOpera = userAgent.indexOf("Opera") > -1;
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
        },
    }

    var $BootStrap = {
        /*
         * 返回条件
         * ---------------------------------------------------------------
         * @inputs       {input:拼接对象}    拼接对象
         */
        "ReturnWhere": function (inputs) {
            var temp_S = '';
            var temp_E = '';
            var tempMoney_S = '';
            var tempMoney_E = '';
            var where_search = '';
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
            return where_search;
        },
        /*
         *获取数据源显示列
         *---------------------------------------------------------------
         *ColJson：列Json
         */
        "ShowColumnsFresh": function (ColJson) {
            $Input.CreateHiddenInput([
                "ShowColumn",
                "Order_ShowColumn"
            ]);
            var ColJson = ColJson;
            var F = [];
            for (var i = 0; i < ColJson.length; i++) {
                for (var j = 0; j < ColJson[i].length; j++) {
                    var Field = ColJson[i][j].field || "";
                    if (ColJson[i][j].visible)
                        if (Field != "")
                            F.push(Field);
                }
            }
            $("#ShowColumn").val(' and name in (\'' + $Array.ArrayToString(F, '\',\'') + '\')');
            var OrderVal = '';
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
        },
        /*
         *获取数据源显示列
         *---------------------------------------------------------------
         *ColJson：列Json
         */
        "ShowColumnsFresh_BootStrap": function (ColJson) {
            $Input.CreateHiddenInput([
                "ShowColumn_BootStrap"
            ]);
            var ColJson = ColJson;
            var F = [];
            for (var i = 0; i < ColJson.length; i++) {
                for (var j = 0; j < ColJson[i].length; j++) {
                    var Field = ColJson[i][j].field || "";
                    if (ColJson[i][j].visible)
                        if (Field != "")
                            F.push(Field);
                }
            }
            $("#ShowColumn_BootStrap").val($Array.ArrayToString(F, ','));
        },
    }

    var $Check = {
        /*
         * 检测整数类型
         * ---------------------------------------------------------------
         * @Value : 值
         */
        "CheckNumber": function (Value) {
            return typeof Value === 'number' && isFinite(Value);
        },
        /*
         * 检测字符串类型
         * ---------------------------------------------------------------
         * @Value : 值
         */
        "CheckString": function (Value) {
            return typeof Value === 'string';
        },
        /*
         * 检测null
         * ---------------------------------------------------------------
         * @Value : 值
         */
        "CheckObj": function (Value) {
            return val === null;
        },
        /*
         * 检测对象类型
         * ---------------------------------------------------------------
         * @Value : 值
         */
        "CheckObj": function (Value) {
            if (Value === null || typeof Value === 'undefined') {
                return false;
            }
            return typeof Value === 'object';
        },
        /*
         * 检测Undefined
         * ---------------------------------------------------------------
         * @Value : 值
         */
        "CheckUndefined": function (Value) {
            return typeof Value === 'undefined';
        },
        /*
         * 检测布尔类型
         * ---------------------------------------------------------------
         * @Value : 值
         */
        "CheckBoolean": function (Value) {
            return typeof Value === 'boolean';
        },
        /*
         * 检测是否数组
         * ---------------------------------------------------------------
         * @Value : 值
         */
        "CheckArray": function (Value) {
            if (arr === null || typeof arr === 'undefined') {
                return false;
            }
            return arr.constructor === Value;
        },
        /*
         * 检测数组数目是否匹配
         * ---------------------------------------------------------------
         * @Array       {数组对象}         转换数组对象
         * @Array1      {数组对象}         转换数组对象
         */
        "CheckArrayLength": function (Array, Array1) {
            if (Array.length != Array1.length) {
                return false;
            }
            else {
                return true;
            }
        },
        /*
         * Json检测
         * ---------------------------------------------------------------
         * @Json       {Json对象}        Json对象
         */
        "CheckJson": function (Json) {
            if (typeof (Json) == "object" && Json.length > 0) {
                return true;
            }
            else {
                return false;
            }
        },
    }

    var $Cookie = {
        /*
         * Cookie启用状态
         * ---------------------------------------------------------------
         */
        "enable": !!navigator.cookieEnabled,
        /*
         * 读取 cookie
         * ---------------------------------------------------------------
         * @Name       {数组}             所在数组
         */
        "get": function (Name) {
            var reg = new RegExp("(^| )" + Name + "(?:=([^;]*))?(;|$)")
                , val = document.cookie.match(reg)
            ;
            return val ? (val[2] ? unescape(val[2]) : "") : '';
        },
        /*
         * 写入 cookie
         * ---------------------------------------------------------------
         * @Name         {数组}             名称
         * @Value        {数组}             值
         * @Expires      {数组}             过期时间
         * @Path         {数组}             地址
         * @Domain       {数组}             域
         * @Secure       {数组}             标识
         */
        "set": function (Name, Value, Expires, Path, Domain, Secure) {
            var exp = new Date()
        , Expires = arguments[2] || null
        , Path = arguments[3] || "/"
        , Domain = arguments[4] || null
        , Secure = arguments[5] || false
            ;
            Expires ? exp.setMinutes(exp.getMinutes() + parseInt(Expires)) : "";
            document.cookie = Name + '=' + escape(Value) + (Expires ? ';expires=' + exp.toGMTString() : '') + (Path ? ';path=' + Path : '') + (Domain ? ';domain=' + Domain : '') + (Secure ? ';secure' : '');
        },
        /*
         * 删除 cookie
         * ---------------------------------------------------------------
         * @Name       {数组}             名称
         * @Path       {数组}             地址
         * @Domain     {数组}             域
         * @Secure     {数组}             标识
         */
        del: function (Name, Path, Domain, Secure) {
            var value = $Cookie.get(Name);
            if (value != null) {
                var exp = new Date();
                exp.setMinutes(exp.getMinutes() - 1000);
                Path = Path || "/";
                document.cookie = Name + '=;expires=' + exp.toGMTString() + (Path ? ';path=' + Path : '') + (Domain ? ';domain=' + Domain : '') + (Secure ? ';secure' : '');
            }
        }
    }

    var $Common = {
        //
        //匿名回调定义
        "GeneraCallBack": function (d, callback) {
            var d = d;
            (callback) ? callback(d) : defaultcallback(d);
        },
        /*
         * js克隆
         * ---------------------------------------------------------------
         * @obj    {任何类型}    需要克隆的对象
         */
        "clone": function (obj) {
            var o;
            switch (typeof obj) {
                case 'undefined':
                    break;
                case 'string':
                    o = obj + '';
                    break;
                case 'number':
                    o = obj - 0;
                    break;
                case 'boolean':
                    o = obj;
                    break;
                case 'object':
                    if (obj === null) {
                        o = null;
                    }
                    else {
                        o = JSON.parse(JSON.stringify(obj));
                    }
                    break;
                default:
                    o = obj;
                    break;
            }
            return o;
        },
        /*
         * 新建一个GUID（唯一标识）
         * ---------------------------------------------------------------
         */
        "newGuid": function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        /*
         * 获取设备系统类型，主要区分ios与android
         * ---------------------------------------------------------------
         */
        "getDeviceOSType": function () {
            var _return = "pc";

            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                _return = "ios"
            }
            else if (/android/.test(ua)) {
                _return = "android"
            }

            return _return;
        },
        /*
         * 将字符串转换为UTF-8编码
         * ---------------------------------------------------------------
         * @text    {string}    原始字符串
         */
        "strToUtf8": function (text) {
            var out, i, len, c;
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
        },
        /*
         * 获取对象
         * ---------------------------------------------------------------
         * @ID    {string}    ID选择器
         */
        "obj$": function (ID) {
            return document.getElementById(id);
        },
        /*
         * 获取值
         * ---------------------------------------------------------------
         * @ID    {string}    ID选择器
         */
        "val$": function (ID) {
            var obj = document.getElementById(ID);
            if (obj != null) {
                return obj.value;
            }
            return null;
        },
        /*
         * 全空格替换
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "trim": function (String) {
            return String.replace(/(^\s*)|(\s*$)/g, '');
        },
        /*
         * 右空格替换
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "rtrim": function (String) {
            return String.replace(/\s*$/, '');
        },
        /*
         * 左空格替换
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "ltrim": function (String) {
            return String.replace(/^\s*/g, '');
        },
        /*
         * 非空判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isEmpty": function (String) {
            if (String != null && String.length > 0) {
                return true;
            }
            return false;
        },
        /*
         * 比较
         * ---------------------------------------------------------------
         * @String1    {string}    字符串1
         * @String2    {string}    字符串2
         */
        "equals": function (String1, String2) {
            if (String1 == String2) {
                return true;
            }
            return false;
        },
        /*
         * 忽略大小写比较
         * ---------------------------------------------------------------
         * @String1    {string}    字符串1
         * @String2    {string}    字符串2
         */
        "equalsIgnoreCase": function (String1, String2) {
            if (String1.toUpperCase() == String2.toUpperCase()) {
                return true;
            }
            return false;
        },
        /*
         * 中文判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isChinese": function (String) {
            var String = String.replace(/(^\s*)|(\s*$)/g, '');
            if (!(/^[\u4E00-\uFA29]*$/.test(String)
                    && (!/^[\uE7C7-\uE7F3]*$/.test(String)))) {
                return false;
            }
            return true;
        },
        /*
         * 邮箱判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isEmail": function (String) {
            if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(String)) {
                return true
            }
            return false;
        },
        /*
         * 图片判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isImg": function (String) {
            var objReg = new RegExp("[.]+(jpg|jpeg|swf|gif)$", "gi");
            if (objReg.test(String)) {
                return true;
            }
            return false;
        },
        /*
         * 数字判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isInteger": function (String) {
            if (/^-?\d+$/.test(String)) {
                return true;
            }
            return false;
        },
        /*
         * 浮点判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isFloat": function (String) {
            if (/^(-?\d+)(\.\d+)?$/.test(String)) {
                return true;
            }
            return false;
        },
        /*
         * 座机判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isPost": function (String) {
            if (/^\d{1,6}$/.test(String)) {
                return true;
            }
            return false;
        },
        /*
         * 移动判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isMobile": function (String) {
            if (/^1[35]\d{9}/.test(String)) {
                return true;
            }
            return false;
        },
        /*
         * QQ判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isQQ": function (String) {
            if (/^\d{5,9}$/.test(String)) {
                return true;
            }
            return false;
        },
        /*
         * IP判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isIP": function (String) {
            var reg = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
            if (reg.test(String)) {
                return true;
            }
            return false;
        },
        /*
         * 日期判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isDate": function (String) {
            var reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
            if (reg.test(String)) {
                return true;
            }
            return false;
        },
        /*
         * 身份证判断
         * ---------------------------------------------------------------
         * @String    {string}    字符串
         */
        "isIdCardNo": function (String) {
            var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
            var varArray = new Array();
            var lngProduct = 0;
            var intCheckDigit;
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
        },
        /*
         * 对象扩展
         * ---------------------------------------------------------------
         */
        "Extend": function () {
            var target = arguments[0] || {}
            , i = 1
            , length = arguments.length
            , options
            ;
            if (typeof target != "object" && typeof target != "function")
                target = {};
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (var name in options) {
                        var copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        },
    }

    var $ExtendChildren = {
        /*
         * 表体Y轴累加合计
         * ---------------------------------------------------------------
         * @tableobj     {tbody:表体Jquery对象}    要合并的表格
         * @ActionCol    {数组类型:多[0,1]|单[1]}   合计列集合
         * @StartRowCol  开始行  开始行
         * @Colspan      合并列数
         */
        "calcTotalAdd": function (tableobj, ActionCol, StartRowCol, Colspan) {
            var Colspan = Colspan || 0;
            var StartRowCol = StartRowCol || 1;
            if (typeof (ActionCol) != "object" && typeof (ActionCol) != "Array") {
                alert("合计列对象类型不符");
                return;
            }
            else if (ActionCol == '*') {
                var table = tableobj[0];
                for (var j = 0; j < table.rows[0].cells.length; j++) {
                    var total = 0;
                    for (var i = StartRowCol; i < table.rows.length - 1; i++) {
                        var td = table.rows[i].cells[j];
                        if (td.getAttribute("data-none") != '1') {
                            console.log($(td).find("input").val());
                            var t = 0;
                            if ($(td).find("input").length != 0) {
                                t = parseFloat($(td).find("input").val());
                            }
                            else {
                                t = parseFloat(td.innerHTML);
                            }
                        }

                    }
                    table.rows[table.rows.length - 1].getElementsByTagName('td')[j].innerHTML = $Float.Fixed_2(total);
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
                            console.log($(td).find("input").val());
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
                    table.rows[table.rows.length - 1].getElementsByTagName('td')[indexArray[q] - Colspan].innerHTML = $Float.Fixed_2(total);
                }
            }
        },
        /*
         * 表体Y轴平均合计
         * ---------------------------------------------------------------
         * @tableobj     {tbody:表体Jquery对象}    要合并的表格
         * @ActionCol    {数组类型:多[0,1]|单[1]}   合计列集合
         */
        "calcTotalAvg": function (tableobj, ActionCol, StartRowCol, ColSpan) {
            var Colspan = Colspan || 0;
            var StartRowCol = StartRowCol || 1;
            if (typeof (ActionCol) != "object" && typeof (ActionCol) != "Array") {
                alert("合计列对象类型不符");
                return;
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
        },
        /*
         * 变换千分符
         * ---------------------------------------------------------------
         * @tableobj     {tbody:表体Jquery对象}    要合并的表格
         * @ActionCol    {数组类型:多[0,1]|单[1]}   合计列集合
         * @StartRowCol  开始行  开始行
         */
        "ChangeMoney": function (tableobj, ActionCol, StartRowCol) {
            var StartRowCol = StartRowCol || 1;
            if (typeof (ActionCol) != "object" && typeof (ActionCol) != "Array") {
                alert("变换列对象类型不符");
                return;
            }
            else if (ActionCol == '*') {
                var table = tableobj[0];
                for (var i = StartRowCol; i < table.rows.length; i++) {
                    for (var j = 0; j < table.rows[i].cells.length; j++) {
                        table.rows[i].cells[j].innerText = $Money.ChangeMoney(table.rows[i].cells[j].innerText);
                    }
                }
            }
            else {
                var table = tableobj[0];
                var indexArray = ActionCol;
                for (var q = 0; q < indexArray.length; q++) {
                    for (var i = StartRowCol; i < table.rows.length; i++) {
                        table.rows[i].cells[indexArray[q]].innerText = $Money.ChangeMoney(table.rows[i].cells[indexArray[q]].innerText);
                    }
                }
            }
        },
        /*
         * 变换千分符
         * ---------------------------------------------------------------
         * @tableobj     {tbody:表体Jquery对象}    要合并的表格
         * @StartRowCol  开始行  开始行
         */
        "ChangeZero": function (tableobj, StartRowCol) {
            var StartRowCol = StartRowCol || 1;
            var table = tableobj[0];
            for (var i = StartRowCol; i < table.rows.length; i++) {
                for (var j = 0; j < table.rows[i].cells.length; j++) {
                    if ($String.trim(table.rows[i].cells[j].innerText) == '0.00' || $String.trim(table.rows[i].cells[j].innerText) == '0') {
                        table.rows[i].cells[j].innerText = '';
                    }
                }
            }
        },
    }

    var $Date = {
        /*
         * 获取当月的最后一天
         * ---------------------------------------------------------------
         * @year        {字符串}             年份
         * @month       {字符串}             月份
         */
        "getFirstAndLastMonthDay": function (year, month) {
            var day = new Date(year, month, 0);
            var lastdate = year + month + day.getDate();//获取当月最后一天日期
            return lastdate;
        },
        /*
         * 获取时间指定格式
         * ---------------------------------------------------------------
         * @Format        {string}             格式(例子):'yyyy-MM-dd'
         */
        "GetTime": function (Format) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
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
        },
        /*
         * 判断时间区域
         * ---------------------------------------------------------------
         * @s : 开始时间
         * @e : 结束时间
         * @n : 当前时间 , n 的格式为 毫秒数
         */
        "isInArea": function (s, e, n) {
            var start = $Date.parse(s),
                end = $Date.parse(e),
                now = parseFloat(n) || new Date()
            ;
            start = Math.min(start, end);
            end = Math.max(start, end);
            return now >= start && now <= end ? true : false;
        },
        /*
         * 把 字符窜转化为 毫秒
         * ---------------------------------------------------------------
         * @date : 2013-03-02 1:2:2
         */
        "parse": function (date) {
            return Date.parse(date); //.replace(/-/g, '/')
        },
        /*
         * 获取星期几
         * ---------------------------------------------------------------
         * @time : 时间 , 如 '2013/11/10 0:12:12')
         * @pre : 星期的 前缀，如：周 ，星期
         * @nums : 如：一二三四五六日
         */
        "getWeek": function (time, pre, nums) {
            time = typeof time == 'string' ? $Date.parse(time) : (time || new Date());
            pre = pre || '星期'; //周
            nums = '日一二三四五六';
            return pre + nums[new Date(time).getDay()];
        },
        /*
         * 获取星期几
         * ---------------------------------------------------------------
         * @formatType : YYYY, YY, MM
         * @time : '2013/11/12'
         * @weeks : 日一二三四五六
         */
        "format": function (formatType, time, weeks) {
            var pre = '0';
            formatType = formatType || 'YYYY-MM-DD'
            weeks = weeks || '日一二三四五六';
            time = time || new Date();
            //格式化时间
            return (formatType || '')
                .replace(/yyyy|YYYY/g, new Date(time).getFullYear())
                .replace(/yy|YY/g, $String.addPre(pre, new Date(time).getFullYear() % 100), 2)
                .replace(/mm|MM/g, $String.addPre(pre, new Date(time).getMonth() + 1, 2))
                .replace(/m|M/g, new Date(time).getMonth() + 1)
                .replace(/dd|DD/g, $String.addPre(pre, new Date(time).getDate(), 2))
                .replace(/d|D/g, new Date(time).getDate())
                .replace(/hh|HH/g, $String.addPre(pre, new Date(time).getHours(), 2))
                .replace(/h|H/g, new Date(time).getHours())
                .replace(/ii|II/g, $String.addPre(pre, new Date(time).getMinutes(), 2))
                .replace(/i|I/g, new Date(time).getMinutes())
                .replace(/ss|SS/g, $String.addPre(pre, new Date(time).getSeconds(), 2))
                .replace(/s|S/g, new Date(time).getSeconds())
                .replace(/w/g, new Date(time).getDay())
                .replace(/W/g, weeks[new Date(time).getDay()])
            ;
        },
        /*
         * 倒计时
         * ---------------------------------------------------------------
         * @opt : 参数
         */
        "countDown": function (opt) {
            var option = {
                nowTime: 0    //        当前时间, ，2013/02/01 18:30:30
                    , endTime: 0            //截止时间 ，2013/02/01 18:30:30
                    , interval: 1            //间隔回调时间，秒
                    , called: function (day, hour, second, minute) { }//每次回调
                    , finaled: function () { } //完成后回调
            }
                , opts = {}
                , timer = null
            ;
            opts = $Common.Extend(option, opt);

            //当前时间
            if (!opts.nowTime) {
                opts.nowTime = (new Date()).getTime();
            } else {
                opts.nowTime = this.parse(opts.nowTime);
            }
            //当前时间
            if (!opts.endTime) {
                opts.endTime = (new Date()).getTime();
            } else {
                opts.endTime = this.parse(opts.endTime);
            }

            timer = setInterval(loop, opts.interval * 1e3);
            // 循环
            function loop() {
                var ts = opts.endTime - opts.nowTime //计算剩余的毫秒数
                    , dd = parseInt(ts / 8.64e7)    //计算剩余的天数
                    , hh = parseInt(ts / 3.6e7 % 24)//计算剩余的小时数
                    , mm = parseInt(ts / 6e4 % 60)//计算剩余的分钟数
                    , ss = parseInt(ts / 1e3 % 60)//计算剩余的秒数
                ;
                //当前时间递减
                opts.nowTime += opts.interval * 1e3;
                if (ts <= 0) {
                    clearInterval(timer);
                    opts.finaled();
                } else {
                    opts.called(dd, hh, mm, ss);
                }
            }
        },
        /*
         * 时间差计算
         * ---------------------------------------------------------------
         * @begintime : 开始时间
         * @endtime : 结束时间
         * @Format : 格式化   0 即 默认格式
         */
        "CompareTime": function (begintime, endtime, Format) {
            var begintime_ms = $Date.parse(begintime.replace(/-/g, "/")); //begintime 为开始时间
            var endtime_ms = $Date.parse(endtime.replace(/-/g, "/"));   // endtime 为结束时间
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
        },
        "DateDiff": function (interval, d1, d2) {
            switch (interval) {
                case "d": //天
                case "w":
                    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
                    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
                    break;  //w
                case "h":
                    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours());
                    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours());
                    break; //h
                case "n":
                    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes());
                    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes());
                    break;
                case "s":
                    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds());
                    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes(), d2.getSeconds());
                    break;
            }
            var t1 = d1.getTime(), t2 = d2.getTime();
            var diff = NaN;
            switch (interval) {
                case "y": diff = d2.getFullYear() - d1.getFullYear(); break; //y
                case "m": diff = (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth(); break;    //m
                case "d": diff = Math.floor(t2 / 86400000) - Math.floor(t1 / 86400000); break;
                case "w": diff = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t1 + 345600000) / (604800000)); break; //w
                case "h": diff = Math.floor(t2 / 3600000) - Math.floor(t1 / 3600000); break; //h
                case "n": diff = Math.floor(t2 / 60000) - Math.floor(t1 / 60000); break; //
                case "s": diff = Math.floor(t2 / 1000) - Math.floor(t1 / 1000); break; //s
                case "l": diff = t2 - t1; break;
            }
            return diff;
        },
        strtodate: function (str) {
            var arr = str.split(" ");
            var arr2 = arr[0].split('-');
            var arr3 = arr[1].split(":");

            var y = arr2[0];
            var m = arr2[1].indexOf("0") == 0 ? arr2[1].substr(1, 1) : arr2[1];
            var d = arr2[2].indexOf("0") == 0 ? arr2[2].substr(1, 1) : arr2[2];
            var h = arr3[0].indexOf("0") == 0 ? arr3[0].substr(1, 1) : arr3[0];
            var n = arr3[1].indexOf("0") == 0 ? arr3[1].substr(1, 1) : arr3[1];
            return new Date(y, parseInt(m) - 1, d, h, n);
        }
    }

    var $Convert = {
        /*
         * 空值转换空串
         * ---------------------------------------------------------------
         */
        "ConvertNull": function () {
            var inputs_null = $("input,textarea,font");
            for (var i = 0; i < inputs_null.length; i++) {
                ($(inputs_null[i]).val() == 'null') ? $(inputs_null[i]).val('') : "";
            }
            var td_null = $("td");
            for (var i = 0; i < td_null.length; i++) {
                ($(td_null[i]).html() == 'null') ? $(td_null[i]).html('') : "";
            }
        },
        /*
         * 空值转换自定义字符（需添加自定义属性null-convert='1' convert-val='无' ）
         * ---------------------------------------------------------------
         */
        "ConvertNull_CustomVal": function () {
            var inputs_null = $("input[null-convert='1'],textarea[null-convert='1']");
            for (var i = 0; i < inputs_null.length; i++) {
                ($(inputs_null[i]).val() == 'null' || $(inputs_null[i]).val() == '') ? $(inputs_null[i]).val($(inputs_null[i]).attr('convert-val')) : "";
            }
            var td_null = $("td");
            for (var i = 0; i < td_null.length; i++) {
                ($(inputs_null[i]).val() == 'null' || $(inputs_null[i]).val() == '') ? $(td_null[i]).html($(inputs_null[i]).attr('convert-val')) : "";
            }
        },
        /*
         * 去掉右空格
         * ---------------------------------------------------------------
         */
        "ConvertRTrim": function () {
            var inputs_Trim = $("input,textarea");
            for (var i = 0; i < inputs_Trim.length; i++) {
                $(inputs_Trim[i]).val($String.rtrim($(inputs_Trim[i]).val()));
            }
        },
    }

    var $Table = {
        /*
        *编辑不能修改表格
        *---------------------------------------------------------------
        */
        "NoEditTable": function () {
            var NoeditTable = $("table[table-noeidt='1']");
            for (var i = 0; i < NoeditTable.length; i++) {
                $(NoeditTable[i]).find("input").attr("readonly", "readonly");
                $(NoeditTable[i]).find("select").attr("disabled", "disabled");
                $(NoeditTable[i]).find("textarea").attr("readonly", "readonly");
                $(NoeditTable[i]).find("input").attr("onclick", "");
                $(NoeditTable[i]).find("button").remove();
                $("button[tbname='" + $(NoeditTable[i]).attr("id") + "']").remove();
            }
        },
    }

    var $Replace = {
        /*
         *替换动态拼接Json里面的引号
         *---------------------------------------------------------------
         *Value
         */
        "ReplaceHavote": function (Value) {
            value = $String.IsNull(Value);
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
        },
        /*
         *
         *---------------------------------------------------------------
         *Value
         */
        "ReplaceHavote1": function (Value) {
            return value.replace(/'/g, "’");
        },
    }

    var $Extend = {
        // options: 参数
        // callback: 回调函数
        "MergeTableCell": function (options, callback) {
            var defaults = {
                TableObj: $("#tb_departments tbody"),//表体对象
                EndRow: "0",//结束行
                RelyCol: [0],//依赖列
                ActionCol: [1, 2, 3]//合并列
            };
            var opts = $.extend(defaults, options);
            var TableObj = opts.TableObj;
            var EndRow = opts.EndRow;
            var RelyCol = opts.RelyCol;
            var ActionCol = opts.ActionCol;
            if (typeof (ActionCol) != "object" && typeof (ActionCol) != "Array") {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "MergeTableCell", "MSG": "合并列对象类型不符" };
                $Common.GeneraCallBack(d, callback);
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
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "MergeTableCell", "MSG": "指定数据行索引大于表格行数" };
                    $Common.GeneraCallBack(d, callback);
                }
                else {
                    for (var q = 0; q < indexArray.length; q++) {
                        //检测指定的列索引是否超出表格列数
                        if (indexArray[q] >= tb.rows[0].cells.length) {
                            var d = { "RST": "ERR", "ICO": "2", "FuncName": "MergeTableCell", "MSG": "指定的列索引超出表格列数" };
                            $Common.GeneraCallBack(d, callback);
                            return;
                        }
                        else {
                            var StartRow = 0;
                            //循环需要判断的数据行
                            for (var i = 0; i < EndRow; i++) {
                                if (tb.rows[i].cells[indexArray[q]].innerHTML == tb.rows[i + 1].cells[indexArray[q]].innerHTML) {
                                    var Same = true;
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
                                    }
                                    else {
                                        StartRow = i + 1;
                                    }
                                }
                                else {
                                    StartRow = i + 1;
                                    Same = true;
                                }
                            }
                            var d = { "RST": "SUC", "ICO": "1", "FuncName": "MergeTableCell", "MSG": "合并成功" };
                            $Common.GeneraCallBack(d, callback);
                        }
                    }
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "CombineCell": function (options, callback) {
            var defaults = {
                TableObj: $("#tb_departments tbody"),//表体对象
                EndRow: "0",//结束行
                ActionCol: [1, 2, 3]//合并列
            };
            var opts = $.extend(defaults, options);
            var TableObj = opts.TableObj;
            var EndRow = opts.EndRow;
            var ActionCol = opts.ActionCol;
            if (typeof (ActionCol) != "object" && typeof (ActionCol) != "Array") {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "CombineCell", "MSG": "合并列对象类型不符" };
                $Common.GeneraCallBack(d, callback);
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
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "CombineCell", "MSG": "指定数据行索引大于表格行数" };
                    $Common.GeneraCallBack(d, callback);
                }
                else {
                    for (var q = 0; q < indexArray.length; q++) {
                        //检测指定的列索引是否超出表格列数
                        if (indexArray[q] >= tb.rows[0].cells.length) {
                            var d = { "RST": "ERR", "ICO": "2", "FuncName": "CombineCell", "MSG": "指定的列索引超出表格列数" };
                            $Common.GeneraCallBack(d, callback);
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
                            var d = { "RST": "SUC", "ICO": "1", "FuncName": "CombineCell", "MSG": "合并成功" };
                            $Common.GeneraCallBack(d, callback);
                        }
                    }
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "MergeTableSum": function (options, callback) {
            var defaults = {
                TableObj: $("#tb_departments tbody"),//表体对象
                EndRow: "0",//结束行
                RelyCol: [0],//依赖列
                ActionCol: [1, 2, 3]//合并列
            };
            var opts = $.extend(defaults, options);
            var TableObj = opts.TableObj;
            var EndRow = opts.EndRow;
            var RelyCol = opts.RelyCol;
            var ActionCol = opts.ActionCol;
            if (typeof (ActionCol) != "object" && typeof (ActionCol) != "Array") {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "MergeTableSum", "MSG": "合并列对象类型不符" };
                $Common.GeneraCallBack(d, callback);
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
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "MergeTableSum", "MSG": "指定数据行索引大于表格行数" };
                    $Common.GeneraCallBack(d, callback);
                }
                else {
                    for (var q = 0; q < indexArray.length; q++) {
                        //检测指定的列索引是否超出表格列数
                        if (indexArray[q] >= tb.rows[0].cells.length) {
                            var d = { "RST": "ERR", "ICO": "2", "FuncName": "MergeTableSum", "MSG": "指定的列索引超出表格列数" };
                            $Common.GeneraCallBack(d, callback);
                            return;
                        }
                        else {
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
                            var d = { "RST": "SUC", "ICO": "1", "FuncName": "MergeTableSum", "MSG": "合并成功" };
                            $Common.GeneraCallBack(d, callback);
                        }
                    }
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "AddSubRow": function (options, callback) {
            var defaults = {
                SubTableID: "tb_departments",//表格ID
                InputJson: [
                    {//说明
                        InputType: "hidden",//表单元素类型        ★必传
                        InputName: "SHUOMING",//表单元素Name 索引ID ★必传
                        isOpen: 0,//是否开窗 默认不开窗0
                        OpenFunctionName: null,//开窗方法名称 默认无
                        OpenFunctionArr: null,//开窗方法追加参数 默认无
                        children: "",//子元素HTML内容 默认空
                        isAdd: "1",//是否提交数据 默认提交数据1  0为不提交数据
                        readonly: "1",//是否只读 1 只读 0 可写 默认可写
                        defaultvalue: $("#MC001").val(),//默认值字段
                        isGuid: 0,//是否为自动标识 默认为不是自动标识0  1为设置自动标识
                        Guidlength: 4,//自动标识长度 默认标识长度0
                        isRequired: 0,//是否必填 默认不必填0 必填 1
                        RequiredInfo: "",//未填提示信息 默认空
                        DateFormat: "yyyy-MM-dd",//日期表单时 日期格式 默认yyyy-MM-dd
                        SumID: "",//数字表单汇总的元素标识 默认空
                    },
                    {//标识元素
                        InputType: "text",
                        readonly: "1",
                        InputName: "BIAOSHI",
                        isGuid: "1",//是否为自动标识
                        Guidlength: "4"//自动标识长度
                    },
                    {//开窗元素
                        InputType: "text",
                        isOpen: "1",
                        OpenFunctionName: "Open",
                        OpenFunctionArr: [],
                        readonly: "1",
                        InputName: "KAICHUANG",
                        isRequired: "1",
                        RequiredInfo: "请选择数据表"
                    },
                    {//下拉框元素
                        InputType: "select",
                        InputName: "XIALA",
                        children: '<option value="Y" selected="selected">Y</option>\
                              <option value="N">N</option>'
                    },
                    {//隐藏元素
                        InputType: "hidden",
                        InputName: "YINCANG"
                    },
                    {//文本框元素
                        InputType: "text",
                        InputName: "WENBENKUANG",
                    },
                    {//时间元素
                        InputType: "date",
                        readonly: "1",
                        InputName: "SHIJIAN",
                        DateFormat: "yyyy-MM-dd",
                        defaultvalue: $Date.format("yyyy-mm-dd")
                    },
                    {//数字元素
                        InputType: "number",
                        readonly: "0",
                        InputName: "SHUZI",
                        SumID: "SUMID"
                    },
                    {//文本域元素
                        InputType: "textarea",
                        InputName: "WENBENYU",
                        readonly: "0"
                    }
                ],//生成表单Json
                MaxSub: 1,//开窗序号 默认'1'
                BeChangeNameJson: [{
                    //变换元素Name:被变换元素Name 用于数字表单元素
                    "Change": "BeChange"
                }],//关联变更
                IsBeforeOrAfter: 1,//单身行显示位置默认后（append）1 0(prepend)前 
                IsHaveDelete: 1//单身行删除按钮 默认有删除按钮 1 无 0
            };
            var opts = $.extend(defaults, options);
            var SubTableID = opts.SubTableID;
            var InputJson = opts.InputJson;
            var MaxSub = opts.MaxSub;
            var BeChangeNameJson = opts.BeChangeNameJson;
            var IsBeforeOrAfter = opts.IsBeforeOrAfter;
            var IsHaveDelete = opts.IsHaveDelete;
            if (!$Check.CheckJson(InputJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "AddSubRow", "MSG": "表单Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else if (!$Check.CheckJson(BeChangeNameJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "AddSubRow", "MSG": "关联Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else {
                $Var.Sub_i = MaxSub;
                var addhtml = '<tr class="template" trtype="add" add-type="click" sub-index="' + $Var.Sub_i + '" prepend-index="' + $Var.Sub_i + '" append-index = "' + $Var.Sub_i + '">';
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
                                <input type="hidden" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" >\
                            </td>';
                        }
                            //默认值(不是自动标识)
                        else {
                            addhtml +=
                                '<td style="display:none;">\
                                <input type="hidden" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                            </td>';
                        }
                    }
                        /* ---------------------------Text:文本元素------------------------------------*/
                    else if (InputType == 'text') {
                        //开窗
                        if (isOpen == '1') {
                            var ClickString = '';
                            if (OpenFunctionArr.length == 0) {
                                ClickString = OpenFunctionName + '("' + $Var.Sub_i + '")';
                            }
                            else {
                                ClickString += OpenFunctionName + '("' + $Var.Sub_i + ',';
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
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                }
                                    //只读 开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
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
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                }
                                    //可写 开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
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
                                        <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                }
                                    //只读 非开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <input type="text" readonly class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                }
                            }
                                //可写 非开窗
                            else {
                                //可写 非开窗 默认值（自动标识）
                                if (isGuid == '1') {
                                    addhtml +=
                                        '<td>\
                                        <input type="text"  class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                }
                                    //可写 非开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <input type="text"  class="form-control text-xml" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                }
                            }
                        }
                    }
                        /* ---------------------------Select:下拉元素------------------------------------*/
                    else if (InputType == 'select') {
                        addhtml += '<td><select name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" class="form-control" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">' + children + '</select></td>';
                    }
                        /* ---------------------------textarea:多行文本元素------------------------------------*/
                    else if (InputType == 'textarea') {
                        //只读 非开窗
                        if (readonly == '1') {
                            //只读 非开窗 默认值（自动标识）
                            if (isGuid == '1') {
                                addhtml +=
                                    '<td>\
                                        <textarea class="form-control text-xml" readonly  name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '"></textarea>\
                                    </td>';
                            }
                                //只读 非开窗 默认值（非自动标识）
                            else {
                                addhtml +=
                                    '<td>\
                                        <textarea class="form-control text-xml" readonly  name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '"></textarea>\
                                    </td>';
                            }
                        }
                            //可写 非开窗
                        else {
                            //可写 非开窗 默认值（自动标识）
                            if (isGuid == '1') {
                                addhtml +=
                                    '<td>\
                                        <textarea class="form-control text-xml"  name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '"></textarea>\
                                    </td>';
                            }
                                //可写 非开窗 默认值（非自动标识）
                            else {
                                addhtml +=
                                    '<td>\
                                        <textarea class="form-control text-xml"  name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '"></textarea>\
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
                                                <input type="text" readonly  name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" class="form-control" onclick="WdatePicker({el:this,dateFmt:\'' + DateFormat + '\',autoPickDate:true})"><span class="input-group-addon"><i class="demo-pli-calendar-4"></i></span>\
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
                                                <input type="text" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" class="form-control" onclick="WdatePicker({el:this,dateFmt:\'' + DateFormat + '\',autoPickDate:true})"><span class="input-group-addon"><i class="demo-pli-calendar-4"></i></span>\
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
                                        <input type="number" readonly issum="' + IsSum + '" data-sum="' + SumID + '" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" class="form-control text-xml" >\
                                    </td>';
                        }
                            //可写 非开窗
                        else {
                            addhtml +=
                                '<td>\
                                        <input type="number" issum="' + IsSum + '" data-sum="' + SumID + '" name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" class="form-control text-xml" >\
                                </td>';
                        }
                    }
                }
                if (IsHaveDelete == '1') {
                    addhtml +=
                        '<td>\
                        <button type="button" name="btn_del" id="btn_del_' + $Var.Sub_i + '" class="delrow demo-delete-row btn btn-danger btn-xs">\
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
                    $("#" + SubTableID + " tbody tr td #btn_del_" + $Var.Sub_i).click(function () {
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
                $Var.Sub_i++;
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
                var d = { "RST": "SUC", "ICO": "1", "FuncName": "AddSubRow", "MSG": "操作成功" };
                $Common.GeneraCallBack(d, callback);
            }
        },
        // options: 参数
        // callback: 回调函数
        "AddTableTotalCol": function (options, callback) {
            var defaults = {
                TableID: "tb_departments",//表格ID
                TotalMean: "页合计",//合计列意思
                TotalMeanIndex: 0,//合计列索引
                TotalMeanColspan: 1,//合计列合并
                ContentAlign: 'center',//内容对齐
                ContentColor: 'black',//内容颜色
                appendType: 'append',//追加方式 append 后 prepend 前
                ActionCol: [1, 2, 3],//操作列
                StartRow: 1,//合并计算开始行
                IsChangeMoney: 1,//是否变换金额 1转换  0不转换
                IsChangeZero: 1,//是否替换0 1替换  0不替换
                HaveDataTotal: 0,//是否进行数据合计 0不进行 1进行
                DataTotalMean: '总合计',//总计列意思
                DataTotalMeanIndex: 0,//总计列索引
                DataTotalDataSrouce: "",//总计数据源
                DataTotalFilter: "1 = 1",//总计数据源过滤条件
                DataTotalJson: [{
                    //数据别名:表格索引
                    Col1: "1",
                    Col2: "2",
                    Col3: "3",
                }]//总计数据绑定关系Json
            };
            var opts = $.extend(defaults, options),
                TableID = opts.TableID,
                TotalMean = opts.TotalMean,
                TotalMeanIndex = opts.TotalMeanIndex,
                TotalMeanColspan = opts.TotalMeanColspan,
                ContentAlign = opts.ContentAlign,
                ContentColor = opts.ContentColor,
                appendType = opts.appendType,
                ActionCol = opts.ActionCol,
                StartRow = opts.StartRow,
                IsChangeMoney = opts.IsChangeMoney,
                IsChangeZero = opts.IsChangeZero,
                HaveDataTotal = opts.HaveDataTotal,
                DataTotalMean = opts.DataTotalMean,
                DataTotalMeanIndex = opts.DataTotalMeanIndex,
                DataTotalDataSrouce = opts.DataTotalDataSrouce,
                DataTotalFilter = opts.DataTotalFilter,
                DataTotalJson = opts.DataTotalJson,
                tableObj = document.getElementById(TableID);
            if (!$Check.CheckJson(DataTotalJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "AddTableTotalCol", "MSG": "总计数据绑定关系Json对象类型不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else {
                if (HaveDataTotal == '0') {
                    var hjtr = "<tr>";
                    for (var i = 0; i < $(tableObj).find("tbody")[0].rows[0].cells.length + 1 - TotalMeanColspan; i++)
                        (i == TotalMeanIndex) ?
                            hjtr += "<td colspan='" + TotalMeanColspan + "' style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'>" + TotalMean + "</td>" :
                            hjtr += "<td style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'></td>";
                    hjtr += "</tr>";
                    var append = "$(\"#" + TableID + " tbody\")." + appendType + "(\"" + hjtr + "\")";
                    eval(append);
                    $ExtendChildren.calcTotalAdd($("#" + TableID), ActionCol, StartRow, TotalMeanColspan - 1);
                    (IsChangeMoney == '1') ? $ExtendChildren.ChangeMoney($("#" + TableID), ActionCol) : "";
                    (IsChangeZero == '1') ? $ExtendChildren.ChangeZero($("#" + TableID)) : "";
                }
                else {
                    var hjtr = "<tr>";
                    for (var i = 0; i < tableObj.rows[0].cells.length + 1 - TotalMeanColspan; i++)
                        (i == TotalMeanIndex) ? hjtr += "<td colspan='" + TotalMeanColspan + "' style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'>" + TotalMean + "</td>" : hjtr += "<td style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'></td>";
                    hjtr += "</tr>";
                    var append = "$(\"#" + TableID + " tbody\")." + appendType + "(\"" + hjtr + "\")";
                    eval(append);
                    $ExtendChildren.calcTotalAdd($("#" + TableID), ActionCol, StartRow, TotalMeanColspan - 1);


                    $.P8.common().postJSON({
                        url: 'api/datainterface/getdatabytable', usercode: Session.UserCode,
                        data: {
                            "TabName": DataTotalDataSrouce,
                            "Filter": DataTotalFilter
                        },
                        async: true //同步请求
                    }, function (d) {
                        var hjtr1 = "<tr>";
                        for (var i = 0; i < tableObj.rows[0].cells.length; i++)
                            (i == DataTotalMeanIndex) ? hjtr1 += "<td style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'>" + DataTotalMean + "</td>" : hjtr1 += "<td style='text-align:" + ContentAlign + ";font-weight:bold;color:" + ContentColor + ";'></td>";
                        hjtr1 += "</tr>";
                        var append1 = "$(\"#" + TableID + " tbody\")." + appendType + "(\"" + hjtr1 + "\")";
                        eval(append1);
                        $Json.Json_Resolve_Single(DataTotalJson);

                        var DataTotalLength = $Var.JsonKeyArr[0].length;
                        for (var i = 0; i < DataTotalLength; i++) {
                            var result = 0;
                            for (var datai = 0; datai < d.DATA.length; datai++) {
                                var _data = "d.DATA[" + datai + "]." + $Var.JsonKeyArr[0][i];
                                result += parseFloat($String.IsNull(eval(_data), "Decimal"));
                            }
                            tableObj.rows[tableObj.rows.length - 1].cells[$Var.JsonValueArr[0][i]].innerText = $Float.Fixed_2(result);
                        }
                        $Json.VarJsonRemove();
                        (IsChangeMoney == '1') ? $ExtendChildren.ChangeMoney($("#" + TableID), ActionCol) : "";
                        (IsChangeZero == '1') ? $ExtendChildren.ChangeZero($("#" + TableID)) : "";
                    });
                }
                var d = { "RST": "SUC", "ICO": "1", "FuncName": "AddTableTotalCol", "MSG": "操作成功" };
                $Common.GeneraCallBack(d, callback);
            }
        },
        // options: 参数
        // callback: 回调函数
        "ConvertColIndex": function (options, callback) {
            var defaults = {
                TableID: "tb_departments",//表格ID
                HeadTitle: ["列1", "列2"],//表格标题数组
                IndexVar: ["colvar1", 'colvar2']//索引变量数组
            };
            var opts = $.extend(defaults, options);
            var TableObj = opts.TableObj;
            var HeadTitle = opts.HeadTitle;
            var IndexVar = opts.IndexVar;
            if (HeadTitle.length != IndexVar.length) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "ConvertColIndex", "MSG": "索引变量数量与标题数量不一致" };
                $Common.GeneraCallBack(d, callback);
            }
            else {
                for (var i = 0; i < HeadTitle.length; i++) {
                    var tableObj = document.getElementById(TableID);
                    var _name = "let " + IndexVar[i] + " = 0";
                    eval(_name);
                    for (var tabi = 0; tabi < tableObj.rows[0].cells.length; tabi++) {
                        if (tableObj.rows[0].cells[tabi].innerText.indexOf(HeadTitle[i]) != -1) {
                            eval(IndexVar[i] + " = " + tabi);
                            break;
                        }
                    }
                }
                var d = { "RST": "SUC", "ICO": "1", "FuncName": "ConvertColIndex", "MSG": "操作成功" };
                $Common.GeneraCallBack(d, callback);
            }
        },
        // options: 参数
        // callback: 回调函数
        "ImportExcel": function (options, callback) {
            var defaults = {
                TableName: "TESTTableName",//表名
                ExcelName: "TESTExcelName",//Excel名
                TemplateName: "TESTTemplateName",//Excel模板名
                NoCreate: 0,//是否有创建时间 创建用户字段 0无 1有
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName;
            var ExcelName = opts.ExcelName;
            var TemplateName = opts.TemplateName;
            var NoCreate = opts.NoCreate;
            $Input.CreateHiddenInput([
                    "ToExcelTableName",
                    "ToExcelName",
                    "ToExcelTemplateName",
                    "ToExcelApiName"
            ]);
            if ($String.IsNullBool(TableName)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "ImportExcel", "MSG": "表名不能为空" };
                $Common.GeneraCallBack(d, callback);
            }
            else if ($String.IsNullBool(ExcelName)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "ImportExcel", "MSG": "Excel名不能为空" };
                $Common.GeneraCallBack(d, callback);
            }
            else if ($String.IsNullBool(TemplateName)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "ImportExcel", "MSG": "Excel模板名不能为空" };
                $Common.GeneraCallBack(d, callback);
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
                        var d = { "RST": "RST", "ICO": "1", "FuncName": "ImportExcel", "MSG": "操作成功" };
                        $Common.GeneraCallBack(d, callback);
                    }
                });
            }
        }
    }

    var $Eval = {
        /*
         * 冒泡排序
         * ---------------------------------------------------------------
         * @Array        {数组对象}             数组
         */
        "bSort": function (Array) {
            if (typeof (Array) != 'object' && typeof (Array) != 'Array') {
                alert("转换对象类型不符");
                return 'error';
            }
            else {
                var tmp;
                Array.forEach(function (item, i) {
                    Array.forEach(function (item, i) {
                        if (item > Array[i + 1]) {
                            //换位置
                            tmp = Array[i + 1];
                            Array[i + 1] = Array[i];
                            Array[i] = tmp;
                        }
                    })
                })
            }
            return Array;
        },
    }

    var $Encryption = {
        /*
         * md5 加密
         * ---------------------------------------------------------------
         * @words       {字符串}         加密字符串
         */
        md5: function (words) {
            var CryptoJS = function (s, p) {
                var m = {}, l = m.lib = {}, n = function () { }, r = l.Base = { extend: function (b) { n.prototype = this; var h = new n; b && h.mixIn(b); h.hasOwnProperty("init") || (h.init = function () { h.$super.init.apply(this, arguments) }); h.init.prototype = h; h.$super = this; return h }, create: function () { var b = this.extend(); b.init.apply(b, arguments); return b }, init: function () { }, mixIn: function (b) { for (var h in b) b.hasOwnProperty(h) && (this[h] = b[h]); b.hasOwnProperty("toString") && (this.toString = b.toString) }, clone: function () { return this.init.prototype.extend(this) } }, q = l.WordArray = r.extend({ init: function (b, h) { b = this.words = b || []; this.sigBytes = h != p ? h : 4 * b.length }, toString: function (b) { return (b || t).stringify(this) }, concat: function (b) { var h = this.words, a = b.words, j = this.sigBytes; b = b.sigBytes; this.clamp(); if (j % 4) for (var g = 0; g < b; g++) h[j + g >>> 2] |= (a[g >>> 2] >>> 24 - 8 * (g % 4) & 255) << 24 - 8 * ((j + g) % 4); else if (65535 < a.length) for (g = 0; g < b; g += 4) h[j + g >>> 2] = a[g >>> 2]; else h.push.apply(h, a); this.sigBytes += b; return this }, clamp: function () { var b = this.words, h = this.sigBytes; b[h >>> 2] &= 4294967295 << 32 - 8 * (h % 4); b.length = s.ceil(h / 4) }, clone: function () { var b = r.clone.call(this); b.words = this.words.slice(0); return b }, random: function (b) { for (var h = [], a = 0; a < b; a += 4) h.push(4294967296 * s.random() | 0); return new q.init(h, b) } }), v = m.enc = {}, t = v.Hex = { stringify: function (b) { var a = b.words; b = b.sigBytes; for (var g = [], j = 0; j < b; j++) { var k = a[j >>> 2] >>> 24 - 8 * (j % 4) & 255; g.push((k >>> 4).toString(16)); g.push((k & 15).toString(16)) } return g.join("") }, parse: function (b) { for (var a = b.length, g = [], j = 0; j < a; j += 2) g[j >>> 3] |= parseInt(b.substr(j, 2), 16) << 24 - 4 * (j % 8); return new q.init(g, a / 2) } }, a = v.Latin1 = { stringify: function (b) { var a = b.words; b = b.sigBytes; for (var g = [], j = 0; j < b; j++) g.push(String.fromCharCode(a[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return g.join("") }, parse: function (b) { for (var a = b.length, g = [], j = 0; j < a; j++) g[j >>> 2] |= (b.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new q.init(g, a) } }, u = v.Utf8 = { stringify: function (b) { try { return decodeURIComponent(escape(a.stringify(b))) } catch (g) { throw Error("Malformed UTF-8 data"); } }, parse: function (b) { return a.parse(unescape(encodeURIComponent(b))) } },
                    g = l.BufferedBlockAlgorithm = r.extend({ reset: function () { this._data = new q.init; this._nDataBytes = 0 }, _append: function (b) { "string" == typeof b && (b = u.parse(b)); this._data.concat(b); this._nDataBytes += b.sigBytes }, _process: function (b) { var a = this._data, g = a.words, j = a.sigBytes, k = this.blockSize, m = j / (4 * k), m = b ? s.ceil(m) : s.max((m | 0) - this._minBufferSize, 0); b = m * k; j = s.min(4 * b, j); if (b) { for (var l = 0; l < b; l += k) this._doProcessBlock(g, l); l = g.splice(0, b); a.sigBytes -= j } return new q.init(l, j) }, clone: function () { var b = r.clone.call(this); b._data = this._data.clone(); return b }, _minBufferSize: 0 }); l.Hasher = g.extend({ cfg: r.extend(), init: function (b) { this.cfg = this.cfg.extend(b); this.reset() }, reset: function () { g.reset.call(this); this._doReset() }, update: function (b) { this._append(b); this._process(); return this }, finalize: function (b) { b && this._append(b); return this._doFinalize() }, blockSize: 16, _createHelper: function (b) { return function (a, g) { return (new b.init(g)).finalize(a) } }, _createHmacHelper: function (b) { return function (a, g) { return (new k.HMAC.init(b, g)).finalize(a) } } }); var k = m.algo = {}; return m
            }(Math);
            (function (s) {
                function p(a, k, b, h, l, j, m) { a = a + (k & b | ~k & h) + l + m; return (a << j | a >>> 32 - j) + k } function m(a, k, b, h, l, j, m) { a = a + (k & h | b & ~h) + l + m; return (a << j | a >>> 32 - j) + k } function l(a, k, b, h, l, j, m) { a = a + (k ^ b ^ h) + l + m; return (a << j | a >>> 32 - j) + k } function n(a, k, b, h, l, j, m) { a = a + (b ^ (k | ~h)) + l + m; return (a << j | a >>> 32 - j) + k } for (var r = CryptoJS, q = r.lib, v = q.WordArray, t = q.Hasher, q = r.algo, a = [], u = 0; 64 > u; u++) a[u] = 4294967296 * s.abs(s.sin(u + 1)) | 0; q = q.MD5 = t.extend({
                    _doReset: function () { this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878]) }, _doProcessBlock: function (g, k) {
                        for (var b = 0; 16 > b; b++) { var h = k + b, w = g[h]; g[h] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360 } var b = this._hash.words, h = g[k + 0], w = g[k + 1], j = g[k + 2], q = g[k + 3], r = g[k + 4], s = g[k + 5], t = g[k + 6], u = g[k + 7], v = g[k + 8], x = g[k + 9], y = g[k + 10], z = g[k + 11], A = g[k + 12], B = g[k + 13], C = g[k + 14], D = g[k + 15], c = b[0], d = b[1], e = b[2], f = b[3], c = p(c, d, e, f, h, 7, a[0]), f = p(f, c, d, e, w, 12, a[1]), e = p(e, f, c, d, j, 17, a[2]), d = p(d, e, f, c, q, 22, a[3]), c = p(c, d, e, f, r, 7, a[4]), f = p(f, c, d, e, s, 12, a[5]), e = p(e, f, c, d, t, 17, a[6]), d = p(d, e, f, c, u, 22, a[7]), c = p(c, d, e, f, v, 7, a[8]), f = p(f, c, d, e, x, 12, a[9]), e = p(e, f, c, d, y, 17, a[10]), d = p(d, e, f, c, z, 22, a[11]), c = p(c, d, e, f, A, 7, a[12]), f = p(f, c, d, e, B, 12, a[13]), e = p(e, f, c, d, C, 17, a[14]), d = p(d, e, f, c, D, 22, a[15]), c = m(c, d, e, f, w, 5, a[16]), f = m(f, c, d, e, t, 9, a[17]), e = m(e, f, c, d, z, 14, a[18]), d = m(d, e, f, c, h, 20, a[19]), c = m(c, d, e, f, s, 5, a[20]), f = m(f, c, d, e, y, 9, a[21]), e = m(e, f, c, d, D, 14, a[22]), d = m(d, e, f, c, r, 20, a[23]), c = m(c, d, e, f, x, 5, a[24]), f = m(f, c, d, e, C, 9, a[25]), e = m(e, f, c, d, q, 14, a[26]), d = m(d, e, f, c, v, 20, a[27]), c = m(c, d, e, f, B, 5, a[28]), f = m(f, c, d, e, j, 9, a[29]), e = m(e, f, c, d, u, 14, a[30]), d = m(d, e, f, c, A, 20, a[31]), c = l(c, d, e, f, s, 4, a[32]), f = l(f, c, d, e, v, 11, a[33]), e = l(e, f, c, d, z, 16, a[34]), d = l(d, e, f, c, C, 23, a[35]), c = l(c, d, e, f, w, 4, a[36]), f = l(f, c, d, e, r, 11, a[37]), e = l(e, f, c, d, u, 16, a[38]), d = l(d, e, f, c, y, 23, a[39]), c = l(c, d, e, f, B, 4, a[40]), f = l(f, c, d, e, h, 11, a[41]), e = l(e, f, c, d, q, 16, a[42]), d = l(d, e, f, c, t, 23, a[43]), c = l(c, d, e, f, x, 4, a[44]), f = l(f, c, d, e, A, 11, a[45]), e = l(e, f, c, d, D, 16, a[46]), d = l(d, e, f, c, j, 23, a[47]), c = n(c, d, e, f, h, 6, a[48]), f = n(f, c, d, e, u, 10, a[49]), e = n(e, f, c, d,
                                    C, 15, a[50]), d = n(d, e, f, c, s, 21, a[51]), c = n(c, d, e, f, A, 6, a[52]), f = n(f, c, d, e, q, 10, a[53]), e = n(e, f, c, d, y, 15, a[54]), d = n(d, e, f, c, w, 21, a[55]), c = n(c, d, e, f, v, 6, a[56]), f = n(f, c, d, e, D, 10, a[57]), e = n(e, f, c, d, t, 15, a[58]), d = n(d, e, f, c, B, 21, a[59]), c = n(c, d, e, f, r, 6, a[60]), f = n(f, c, d, e, z, 10, a[61]), e = n(e, f, c, d, j, 15, a[62]), d = n(d, e, f, c, x, 21, a[63]); b[0] = b[0] + c | 0; b[1] = b[1] + d | 0; b[2] = b[2] + e | 0; b[3] = b[3] + f | 0
                    }, _doFinalize: function () { var a = this._data, k = a.words, b = 8 * this._nDataBytes, h = 8 * a.sigBytes; k[h >>> 5] |= 128 << 24 - h % 32; var l = s.floor(b / 4294967296); k[(h + 64 >>> 9 << 4) + 15] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360; k[(h + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360; a.sigBytes = 4 * (k.length + 1); this._process(); a = this._hash; k = a.words; for (b = 0; 4 > b; b++) h = k[b], k[b] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360; return a }, clone: function () { var a = t.clone.call(this); a._hash = this._hash.clone(); return a }
                }); r.MD5 = t._createHelper(q); r.HmacMD5 = t._createHmacHelper(q)
            })(Math);
            return CryptoJS.MD5(words).toString();
        },
        /*
         * sha1  哈希加密
         * ---------------------------------------------------------------
         * @words       {字符串}         加密字符串
         */
        sha1: function (words) {
            var CryptoJS = function (e, m) { var p = {}, j = p.lib = {}, l = function () { }, f = j.Base = { extend: function (a) { l.prototype = this; var c = new l; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } }, n = j.WordArray = f.extend({ init: function (a, c) { a = this.words = a || []; this.sigBytes = c != m ? c : 4 * a.length }, toString: function (a) { return (a || h).stringify(this) }, concat: function (a) { var c = this.words, q = a.words, d = this.sigBytes; a = a.sigBytes; this.clamp(); if (d % 4) for (var b = 0; b < a; b++) c[d + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((d + b) % 4); else if (65535 < q.length) for (b = 0; b < a; b += 4) c[d + b >>> 2] = q[b >>> 2]; else c.push.apply(c, q); this.sigBytes += a; return this }, clamp: function () { var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4); a.length = e.ceil(c / 4) }, clone: function () { var a = f.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * e.random() | 0); return new n.init(c, a) } }), b = p.enc = {}, h = b.Hex = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], d = 0; d < a; d++) { var f = c[d >>> 2] >>> 24 - 8 * (d % 4) & 255; b.push((f >>> 4).toString(16)); b.push((f & 15).toString(16)) } return b.join("") }, parse: function (a) { for (var c = a.length, b = [], d = 0; d < c; d += 2) b[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8); return new n.init(b, c / 2) } }, g = b.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], d = 0; d < a; d++) b.push(String.fromCharCode(c[d >>> 2] >>> 24 - 8 * (d % 4) & 255)); return b.join("") }, parse: function (a) { for (var c = a.length, b = [], d = 0; d < c; d++) b[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4); return new n.init(b, c) } }, r = b.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(g.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return g.parse(unescape(encodeURIComponent(a))) } }, k = j.BufferedBlockAlgorithm = f.extend({ reset: function () { this._data = new n.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = r.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, b = c.words, d = c.sigBytes, f = this.blockSize, h = d / (4 * f), h = a ? e.ceil(h) : e.max((h | 0) - this._minBufferSize, 0); a = h * f; d = e.min(4 * a, d); if (a) { for (var g = 0; g < a; g += f) this._doProcessBlock(b, g); g = b.splice(0, a); c.sigBytes -= d } return new n.init(g, d) }, clone: function () { var a = f.clone.call(this); a._data = this._data.clone(); return a }, _minBufferSize: 0 }); j.Hasher = k.extend({ cfg: f.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { k.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (c, b) { return (new a.init(b)).finalize(c) } }, _createHmacHelper: function (a) { return function (b, f) { return (new s.HMAC.init(a, f)).finalize(b) } } }); var s = p.algo = {}; return p }(Math);
            (function () { var e = CryptoJS, m = e.lib, p = m.WordArray, j = m.Hasher, l = [], m = e.algo.SHA1 = j.extend({ _doReset: function () { this._hash = new p.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (f, n) { for (var b = this._hash.words, h = b[0], g = b[1], e = b[2], k = b[3], j = b[4], a = 0; 80 > a; a++) { if (16 > a) l[a] = f[n + a] | 0; else { var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16]; l[a] = c << 1 | c >>> 31 } c = (h << 5 | h >>> 27) + j + l[a]; c = 20 > a ? c + ((g & e | ~g & k) + 1518500249) : 40 > a ? c + ((g ^ e ^ k) + 1859775393) : 60 > a ? c + ((g & e | g & k | e & k) - 1894007588) : c + ((g ^ e ^ k) - 899497514); j = k; k = e; e = g << 30 | g >>> 2; g = h; h = c } b[0] = b[0] + h | 0; b[1] = b[1] + g | 0; b[2] = b[2] + e | 0; b[3] = b[3] + k | 0; b[4] = b[4] + j | 0 }, _doFinalize: function () { var f = this._data, e = f.words, b = 8 * this._nDataBytes, h = 8 * f.sigBytes; e[h >>> 5] |= 128 << 24 - h % 32; e[(h + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296); e[(h + 64 >>> 9 << 4) + 15] = b; f.sigBytes = 4 * e.length; this._process(); return this._hash }, clone: function () { var e = j.clone.call(this); e._hash = this._hash.clone(); return e } }); e.SHA1 = j._createHelper(m); e.HmacSHA1 = j._createHmacHelper(m) })();
            return CryptoJS.SHA1(words).toString();
        },
        /*
         * time33 哈希加密
         * ---------------------------------------------------------------
         * @words       {字符串}         加密字符串
         */
        time33: function (words) {
            words = words || '';
            for (var i = 0, len = words.length, hash = 5381; i < len; ++i) {
                hash += (hash << 5) + words.charAt(i).charCodeAt();
            };
            return hash & 0x7fffffff;
        },
    }

    var $FlowReport = {
        /*
         * 流程报表打印模板加载
         * ---------------------------------------------------------------
         * @TASKID    {字符串}    单号
         * @SYSURL    {字符串}    系统路径
         */
        "ReloadReport": function (TASKID, SYSURL) {
            //单头加载
            var ptable = $("table[D-TBType = 'Parent']")[0];
            top.layer.load(2);
            $.ajax({
                url: SYSURL + 'api/flowreport/GetDataByDataSource',
                type: 'post',
                dataType: 'json',
                async: true,
                contentType: "application/json",
                data: JSON.stringify({
                    "TabName": ptable.getAttribute("D-TBName"),
                    "Filter": "taskid = " + TASKID
                }),
                success: function (d) {
                    if (d.RST == "SUC") {
                        var inputs_Parent = $("table[D-TBType = 'Parent'] input[D-SET='1'],table[D-TBType = 'Parent'] select[D-SET='1'],table[D-TBType = 'Parent'] textarea[D-SET='1']");
                        for (var i = 0; i < inputs_Parent.length; i++) {
                            let _name = "d.DATA[0]." + inputs_Parent.eq(i).attr("D-TCOLName");
                            inputs_Parent.eq(i).val(unescape(eval(_name)));
                        }
                    }
                    else {
                        top.layer.msg('打印失败', { icon: 2, time: 2000 }, function () { });
                    }
                },
                error: function () {
                    top.layer.msg('请求失败', { icon: 2, time: 2000 }, function () { });
                }
            });

            //单身加载
            var ctable = $("table[D-TBType = 'Children']");
            for (var cti = 0; cti < ctable.length; cti++) {
                var ctableobj = $("table[D-TBName='" + ctable[cti].getAttribute("D-TBName") + "'] tbody");
                var ctablename = ctable[cti].getAttribute("D-TBName");
                $.ajax({
                    url: SYSURL + 'api/flowreport/GetDataByDataSource',
                    type: 'post',
                    async: true,
                    dataType: 'json',
                    contentType: "application/json",
                    data: JSON.stringify({
                        "TabName": ctablename,
                        "Filter": "taskid = " + TASKID
                    }),
                    success: function (d) {
                        if (d.RST == "SUC") {
                            $.P8.laytpl($("#" + ctablename + "").html()).render(d, function (html) {
                                ctableobj.html(html);
                            });
                        }
                        else {
                            top.layer.msg('打印失败', { icon: 2, time: 2000 }, function () { });
                        }
                    },
                    error: function () {
                        top.layer.msg('请求失败', { icon: 2, time: 2000 }, function () { });
                    }
                });
            }

            //审批步骤加载
            $.ajax({
                url: SYSURL + 'api/flowreport/GetDataByDataSource',
                type: 'post',
                dataType: 'json',
                async: true,
                contentType: "application/json",
                data: JSON.stringify({
                    "TabName": "SYSBPMISteps",
                    "Filter": "NodeType <> '42' and taskid = " + TASKID,
                    "Order": "NodeId"
                }),
                success: function (d) {
                    if (d.RST == "SUC") {
                        $.P8.laytpl($("#SYSBPMISteps_template").html()).render(d, function (html) {
                            $("#SYSBPMISteps tbody").html(html);
                        });
                    }
                    else {
                        top.layer.msg('打印失败', { icon: 2, time: 2000 }, function () { });
                    }
                },
                error: function () {
                    top.layer.msg('请求失败', { icon: 2, time: 2000 }, function () { });
                }
            });
            top.layer.closeAll('loading');
            window.print();
        }
    }

    var $Float = {
        /*
         * 字符串回弹自定义数字小数位数
         * ---------------------------------------------------------------
         * @Float        {数值}             数值
         * @Size         {字符串}           保留小数位数
         */
        "FormatFloat": function (Float, Size) {
            var varchar = '';
            if (Float == null || isNaN(Float))
                Float = "0";
            aa = Float.split("");
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
        },
        /*
         * 字符串回弹自定义数字小数位数
         * ---------------------------------------------------------------
         * @Float        {数值}             数值
         * @Size         {字符串}           保留小数位数
         */
        "Fixed_2": function (Float) {
            return parseFloat(Float).toFixed(2);
        },
        /*
         * 字符串回弹自定义数字小数位数
         * ---------------------------------------------------------------
         * @Float        {数值}             数值
         * @Size         {字符串}           保留小数位数
         */
        "Fixed_Size": function (Float, Size) {
            return parseFloat(Float).toFixed(Size);
        },
    }

    var $Require = {
        /*
         * 返回必填 (data-required='1'【必填】 data-required-info='提示信息')
         * ---------------------------------------------------------------
         */
        "ReturnRequired": function () {
            $Var.RequiredMsg = '';
            var required = $("select[data-required='1'],input[data-required='1'],textarea[data-required='1']");
            var requiredmsg = '';
            var isOk = true;
            var isOk1 = 0;
            for (var i = 0; i < required.length; i++) {
                if (required[i].value == '') {
                    i == required.length - 1 ? requiredmsg += required[i].getAttribute("data-required-info").toString() : requiredmsg += required[i].getAttribute("data-required-info").toString() + '</br>';
                    isOk = false;
                    isOk1 = 1;
                }
                if (i == required.length - 1 && isOk1 == 0 && requiredmsg == '') {
                    isOk = true;
                }
            }
            $Var.RequiredMsg = requiredmsg;
            return isOk;
        },
        /*
         * 返回单身必填 (sub-required='1'【必填】 sub-required-info='提示信息')
         * ---------------------------------------------------------------
         * @TableID       {字符串}    单身表格ID
         */
        "ReturnSubRequired": function (TableID) {
            $Var.SubRequiredMsg = '';
            var sub_notnull = $("#" + TableID).attr("sub-notnull");
            if (sub_notnull == '0')
                return true
            else {
                var subtable = $("#" + TableID + " tbody tr");
                if (subtable.length == 0) {
                    $Var.SubRequiredMsg = '请填写单身信息!';
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
                                    $Var.SubRequiredMsg += requiredmsg + "</br>";
                                }
                            }
                        }
                    }
                }
                if ($Var.SubRequiredMsg == '')
                    return true
                else
                    return false
            }
        },
    }

    var $Http = {
        /*
         * 字符串回弹自定义数字小数位数
         * ---------------------------------------------------------------
         * @Float        {数值}             数值
         * @Size         {字符串}           保留小数位数
         */
        "Ajax": function (Type, Url) {
            $.ajax({
                type: Type,
                url: Url,
                beforeSend: function (XMLHttpRequest) {

                },
                success: function (data, textStatus) {

                },
                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function () {

                }
            });
        },
    }

    var $HTML = {
        /*
         * ---------------------------------------------------------------
         */
        "RemoveNoneTd": function () {
            $("td[data-none='1']").remove();
        },
    }

    var $Json = {
        /*
         * String => Json
         * ---------------------------------------------------------------
         * @String      {字符串}                                                         Json对象
         */
        "String_Json": function (String) {
            return eval("(" + String + ")");
        },
        /*
         * Json串多条件筛选
         * ---------------------------------------------------------------
         * @Json      {Json}                                                         Json对象
         * @Return    {Json_Key}                                                     需要返回的键名
         * @Key       {数组对象:单["用户工号"],多["用户工号","用户在职状态"]}        Json筛选的键
         * @Value     {数组对象:单["mmm"],多["mmm","1"]}                             Json筛选的值
         */
        "Json_GetKeyByOtherKey": function (Json, Return, Key, Value) {
            if ((typeof (Key) != 'object' && typeof (Value) != 'object') || (typeof (Key) != 'Array' && typeof (Value) != 'Array')) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "筛选键或者筛选值类型不符";
            }
            else if (Key.length != Value.length) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "筛选键与筛选值数目不匹配";
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
                $Var.JsonStatus = "1";
                $Var.JsonReturnData = result;
            }
        },
        /*
         * Json解析所有键值对
         * ---------------------------------------------------------------
         * @Json      {Json}                      Json对象
         */
        "Json_Resolve_Single": function (Json) {
            if (!$Check.CheckJson(Json)) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象类型不符";
            }
            else if (Json.length > 1) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象长度大于1";
            }
            else {
                $Json.VarJsonRemove();
                for (var i in Json) {
                    var Key = [];
                    var Value = [];
                    for (var j in Json[i]) {
                        Key.push(j);
                        Value.push(Json[i][j]);
                    }
                }
                $Var.JsonKeyArr.push(Key);
                $Var.JsonValueArr.push(Value);
                $Var.JsonStatus = "1";
            }
        },
        /*
         * Json解析所有键值对
         * ---------------------------------------------------------------
         * @Json      {Json}                      Json对象
         */
        "Json_Resolve_Multiple": function (Json) {
            if (!$Check.CheckJson(Json)) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象类型不符";
            }
            else if (Json.length == 1) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象长度不大于1";
            }
            else {
                $Json.VarJsonRemove();
                for (var i in Json) {
                    var Key = [];
                    var Value = [];
                    for (var j in Json[i]) {
                        Key.push(j);
                        Value.push(Json[i][j]);
                    }
                    $Var.JsonKeyArr.push(Key);
                    $Var.JsonValueArr.push(Value);
                }
                $Var.JsonStatus = "1";
            }
        },
        /*
         * Json键值对表达式单数组
         * ---------------------------------------------------------------
         * @Json      {Json}                      Json对象
         */
        "Json_Eval_Col_Single": function (Json) {
            if (!$Check.CheckJson(Json)) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象类型不符";
            }
            else if (Json.length > 1) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象长度大于1";
            }
            else {
                for (var i in Json) {
                    var Key = [];
                    var Value = [];
                    for (var j in Json[i]) {
                        $Var.JsonEval += j + " = '" + Json[i][j] + "',"
                    }
                }
                $Var.JsonEval = $Var.JsonEval.substring(0, $Var.JsonEval.length - 1);
                $Var.JsonStatus = "1";
            }
        },
        /*
         * Json键值对表达式多数组
         * ---------------------------------------------------------------
         * @Json      {Json}                      Json对象
         * @SplitChar {字符串}                    分隔符
         */
        "Json_Eval_Col_Multiple": function (Json, SplitChar) {
            if (!$Check.CheckJson(Json)) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象类型不符";
            }
            else if (Json.length == 1) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象长度不大于1";
            }
            else {
                for (var i in Json) {
                    for (var j in Json[i]) {
                        $Var.JsonEval += j + " = '" + Json[i][j] + "',"
                    }
                    $Var.JsonEval = $Var.JsonEval.substring(0, $Var.JsonEval.length - 1);
                    $Var.JsonEval += SplitChar;
                }
                $Var.JsonStatus = "1";
            }
        },
        /*
         * Json键值对表达式单数组
         * ---------------------------------------------------------------
         * @Json      {Json}                      Json对象
         */
        "Json_Eval_Col_Single_Novalue": function (Json) {
            if (!$Check.CheckJson(Json)) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象类型不符";
            }
            else if (Json.length > 1) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象长度大于1";
            }
            else {
                for (var i in Json) {
                    var Key = [];
                    var Value = [];
                    for (var j in Json[i]) {
                        $Var.JsonEval += j + " = " + Json[i][j] + ","
                    }
                }
                $Var.JsonEval = $Var.JsonEval.substring(0, $Var.JsonEval.length - 1);
                $Var.JsonStatus = "1";
            }
        },
        /*
         * Json键值对表达式多数组
         * ---------------------------------------------------------------
         * @Json      {Json}                      Json对象
         * @SplitChar {字符串}                    分隔符
         */
        "Json_Eval_Col_Multiple_Novalue": function (Json, SplitChar) {
            if (!$Check.CheckJson(Json)) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象类型不符";
            }
            else if (Json.length == 1) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象长度不大于1";
            }
            else {
                for (var i in Json) {
                    for (var j in Json[i]) {
                        $Var.JsonEval += j + " = " + Json[i][j] + ","
                    }
                    $Var.JsonEval = $Var.JsonEval.substring(0, $Var.JsonEval.length - 1);
                    $Var.JsonEval += SplitChar;
                }
                $Var.JsonStatus = "1";
            }
        },
        /*
         * Json键值对表达式单数组条件
         * ---------------------------------------------------------------
         * @Json      {Json}                      Json对象
         */
        "Json_Eval_Where_Single": function (Json) {
            if (!$Check.CheckJson(Json)) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象类型不符";
            }
            else if (Json.length > 1) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象长度大于1";
            }
            else {
                for (var i in Json) {
                    for (var j in Json[i]) {
                        $Var.JsonEval += j + " = '" + Json[i][j] + "' and "
                    }
                }
                $Var.JsonEval += "1 = 1";
                $Var.JsonStatus = "1";
            }
        },
        /*
         * Json键值对表达式多数组条件
         * ---------------------------------------------------------------
         * @Json      {Json}                      Json对象
         * @SplitChar {字符串}                    分隔符
         */
        "Json_Eval_Where_Multiple": function (Json, SplitChar) {
            if (!$Check.CheckJson(Json)) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象类型不符";
            }
            else if (Json.length == 1) {
                $Var.JsonStatus = "0";
                $Var.JsonMsg = "解析Json对象长度不大于1";
            }
            else {
                for (var i in Json) {
                    for (var j in Json[i]) {
                        $Var.JsonEval += j + " = '" + Json[i][j] + "' and "
                    }
                    $Var.JsonEval += "1 = 1";
                    $Var.JsonEval += SplitChar;
                }
                $Var.JsonStatus = "1";
            }
        },
        /*
         * 清空常量Json
         * ---------------------------------------------------------------
         */
        "VarJsonRemove": function () {
            $Var.JsonKeyArr = [];
            $Var.JsonValueArr = [];
        },
        /*
         * 清空JsonEval
         * ---------------------------------------------------------------
         */
        "VarJsonEvalRemove": function () {
            $Var.JsonEval = "";
        },
        /*
         * 格式化字符串，变为 json 对象
         * ---------------------------------------------------------------
         * @data      {Json}                      Json对象
         */
        "parse": function (data) {
            var // JSON RegExp
                rvalidchars = /^[\],:{}\s]*$/
                , rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g
                , rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g
                , rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g
            ;
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data);
            }
            if (data === null) {
                return data;
            }
            if (typeof data === "string") {
                data = data.replace(/^\s+|\s+$/g, '');
                if (data && rvalidchars.test(data.replace(rvalidescape, "@")
                    .replace(rvalidtokens, "]")
                    .replace(rvalidbraces, ""))) {
                    return (new Function("return " + data))();
                }
            }
            return '';
        },
        /*
     * JSON数组去重
     * @param: [array] json Array
     * @param: [string] 唯一的key名，根据此键名进行去重
     */
        "uniqueArray": function (array, key) {
            var result = [array[0]];
            for (var i = 1; i < array.length; i++) {
                var item = array[i];
                var repeat = false;
                for (var j = 0; j < result.length; j++) {
                    if (item[key] == result[j][key]) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    result.push(item);
                }
            }
            return result;
        }
    }

    var $String = {
        /*
         * 字符串转换数组
         * ---------------------------------------------------------------
         * @String       {数组对象}         转换数组对象
         * @SplitChar     {字符串}           分隔字符
         */
        "StringToArray": function (String, SplitChar) {
            if (typeof (String) != 'string') {
                alert("转换对象类型不符");
                return 'error';
            }
            return String.split(SplitChar);
        },
        /*
         * 转义 HTML 字符
         * ---------------------------------------------------------------
         * @String       {字符串}         字符串
         */
        "CodeHtml": function (String) {
            return $String.replace(String, {
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
        },
        /*
         * 插入重复字符串
         * ---------------------------------------------------------------
         * @Word       {字符串}         字符串
         * @Length     {字符串}         字符串
         * @End        {字符串}         字符串
         */
        "Repeat": function (Word, Length, End) {
            End = End || ''; //加在末位
            Length = ~~Length;
            return new Array(Length * 1 + 1).join(Word) + '' + End;
        },
        /*
         * 补齐。如给数字前 加 0
         * ---------------------------------------------------------------
         * @Pre       {字符串}         前缀字符
         * @Word      {字符串}         字符
         * @Size      {字符串}         长度
         */
        "addPre": function (Pre, Word, Size) {
            Pre = Pre || '0';
            Size = parseInt(Size) || 0;
            Word = String(Word || '');
            var length = Math.max(0, Size - Word.length);
            return $String.Repeat(Pre, length, Word);
        },
        /*
         * 去除全部
         * ---------------------------------------------------------------
         * @String       {字符串}         替换字符
         */
        "trim": function (String) { //# 
            return (String || '').replace(/\s*/g, '');
        },
        /*
         * 去除两边空格
         * ---------------------------------------------------------------
         * @String       {字符串}         替换字符
         */
        "qhtrim": function (String) { //# 
            return (String || '').replace(/^\s+|\s$/g, '');
        },
        /*
         * 去掉右空格
         * ---------------------------------------------------------------
         * @String       {字符串}         替换字符
         */
        "rtrim": function (String) {
            return String.replace(/(\s*$)/g, '');
        },
        /*
         * 去掉左空格
         * ---------------------------------------------------------------
         * @String       {字符串}         替换字符
         */
        "ltrim": function (String) {
            return String.replace(/^\s*/, '');
        },
        /*
         * 去掉右空格
         * ---------------------------------------------------------------
         * @String       {字符串}         替换字符
         */
        "IsNull": function (String, Type) {
            var Type = Type || "String";
            if (typeof (String) == undefined || String == null || String == undefined || String == 'undefined') {
                if (Type == 'String') return '';
                if (Type == 'Decimal') return '0';
            } else
                return String;
        },
        /*
         * 非空判断
         * ---------------------------------------------------------------
         * @String       {字符串}         替换字符
         */
        "IsNullBool": function (String) {
            if (typeof (String) == undefined || String == null || String == undefined || String == 'undefined') {
                return true
            } else
                return false;
        },
        /*
         * 字符串替换
         * ---------------------------------------------------------------
         * @String       {字符串}         字符串
         * @repString    {替换数组}       替换字符{"1":"3","4":"2"}
         */
        "replace": function (String, repString) {
            String = String || '';
            for (var key in repString) {
                replace(key, repString[key]);
            };
            function replace(a, b) {
                var arr = String.split(a);
                String = arr.join(b);
            };
            return String;
        },
        /*
         * XSS 转义
         * ---------------------------------------------------------------
         * @String       {字符串}         转义字符串
         * @Type         {字符串}       类型
         */
        "xss": function (String, Type) { //# 
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
        },
        /*
         * 过滤敏感词
         * ---------------------------------------------------------------
         * @text : 要过滤的文本 , 类型 ：字符串
         * @words : 敏感词 ，类型，数组, 如 ： ['你妹', '我丢' ,'我靠']
         */
        "badWord": function (text, words) {
            text = String(text || '');
            words = words || [];
            var reg = new RegExp(words.join('|'), 'g')
                , _self = this;
            return text.replace(reg, function ($0) {
                var length = String($0 || '').length;
                return _self.repeat('*', length);
            });
        },
        /*
         * 去掉尾字符
         * ---------------------------------------------------------------
         * @String : 要切割的文本 , 类型 ：字符串
         * @len : 长度
         */
        "GetSubString": function (String, len) {
            return String.substring(0, String.length - len);
        },
        /*
         * 获取字符串字节数
         * ---------------------------------------------------------------
         * @val : 要获取的字符串 , 类型 ：字符串
         */
        "GetStringByteLength": function (val) {
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
        },
    }

    var $Money = {
        /*
         * 金额大写
         * ---------------------------------------------------------------
         * @String        {string}             变换字符
         */
        "MoneyUpperCase": function (String) {
            try {
                var i = 1;
                var dw2 = new Array("", "万", "亿"); //大单位
                var dw1 = new Array("拾", "佰", "仟"); //小单位
                var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
                //以下是小写转换成大写显示在合计大写的文本框中     
                //分离整数与小数
                var source = splits(String);
                var num = source[0];
                var dig = source[1];
                //转换整数部分
                var k1 = 0; //计小单位
                var k2 = 0; //计大单位
                var sum = 0;
                var str = "";
                var len = source[0].length; //整数的长度
                for (i = 1; i <= len; i++) {
                    var n = source[0].charAt(len - i); //取得某个位数上的数字
                    var bn = 0;
                    if (len - i - 1 >= 0) {
                        bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
                    }
                    sum = sum + Number(n);
                    if (sum != 0) {
                        str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
                        if (n == '0') sum = 0;
                    }
                    if (len - i - 1 >= 0) { //在数字范围内
                        if (k1 != 3) { //加小单位
                            if (bn != 0) {
                                str = dw1[k1].concat(str);
                            }
                            k1++;
                        } else { //不加小单位，加大单位
                            k1 = 0;
                            var temp = str.charAt(0);
                            if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
                                str = str.substr(1, str.length - 1);
                            str = dw2[k2].concat(str);
                            sum = 0;
                        }
                    }
                    if (k1 == 3) { //小单位到千则大单位进一
                        k2++;
                    }
                }
                //转换小数部分
                var strdig = "";
                if (dig != "") {
                    var n = dig.charAt(0);
                    if (n != 0) {
                        strdig += dw[Number(n)] + "角"; //加数字
                    }
                    var n = dig.charAt(1);
                    if (n != 0) {
                        strdig += dw[Number(n)] + "分"; //加数字
                    }
                }
                str += "元" + strdig;
            } catch (e) {
                return "0元";
            }
            return str;
        },
        /*
         * 金额变换千分符
         * ---------------------------------------------------------------
         * @String        {string}             变换字符
         */
        "ChangeMoney": function (String) {
            String = $String.trim(String.replace(/,/g, ''));
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
        },
    }

    var $Url = {
        /*
         * 获取请求参数（Get）所有
         * ---------------------------------------------------------------
         */
        "GetUrlParam": function () {
            var _arr = location.search.substr(1).split('&');
            var _obj = {};
            for (var i = 0; i < _arr.length; i++) {
                _obj[_arr[i].split('=')[0]] = _arr[i].split('=')[1]
            };
            return _obj;
        },
        /*
         * 获取请求参数（Get）指定
         * ---------------------------------------------------------------
         * @QueryName        {string}             指定参数名
         */
        "GetQueryString": function (QueryName) {
            var reg = new RegExp("(^|&)" + QueryName + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        /*
         * 路径检测
         * ---------------------------------------------------------------
         * @url  路径
         */
        "CheckUrl": function (url) {
            $.ajax({
                type: "GET",
                cache: false,
                url: url,
                data: "",
                success: function () {
                    return true;
                },
                error: function () {
                    return false;
                }
            });
        }
    }

    var $OpenChildren = {
        /*
        *添加单身删除按钮事件
        *---------------------------------------------------------------
        *SubTableID：单身表格
        */
        "AddSubDeleteClick": function (SubTableID, BackSpace) {
            var BackSpace = BackSpace || "";
            //删除
            $("#" + SubTableID + " tbody tr td button[name='btn_del']").click(function () {
                //更新删除
                if ($(this).parent("td").parent("tr").attr("trtype") == 'update') {
                    if ($(this).parent("td").parent("tr").attr("add-type") == 'open') {
                        $Input.CreateHiddenInput([
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
        },
    }

    var $Open = {
        // options: 参数
        // callback: 回调函数
        "PublicOpen_Mutiple": function (options, callback) {
            var defaults = {
                OpenTabName: "TESTOpenTabName",//数据源名
                OpenGuid: "ROWID",//多选单身开窗标识
                FieldJson: [
                   {//说明
                       field: "COL1",//字段名
                       title: "列1",//标题,
                       SubInputName: "COL1",//单身表单标识Name,
                       isShow: 1,//是否显示 0显示 1显示
                   }
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
                BackSpace: "BackSpace",//开窗所属域
            };
            var opts = $.extend(defaults, options);
            var OpenTabName = opts.OpenTabName;
            var OpenGuid = opts.OpenGuid;
            var FieldJson = opts.FieldJson;
            var OpenTitle = opts.OpenTitle;
            var WhereJson = opts.WhereJson;
            var OrderJson = opts.OrderJson;
            var OpenWidth = opts.OpenWidth;
            var OpenHeight = opts.OpenHeight;
            var BackSpace = opts.BackSpace;
            $Input.CreateHiddenInput([
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
            if (!$Check.CheckJson(FieldJson)) {
                (callback) ? callback({ "RST": "ERR", "ICO": "2", "FuncName": "PublicOpen_Mutiple", "MSG": "字段Json格式不符" }) : defaultcallback(d);
            }
            else if (WhereJson != "") {
                if (!$Check.CheckJson(WhereJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "PublicOpen_Mutiple", "MSG": "条件Json格式不符" };
                    $Common.GeneraCallBack(d, callback);
                }
            }
            else if (OrderJson != "") {
                if (!$Check.CheckJson(OrderJson) && OrderJson != "") {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "PublicOpen_Mutiple", "MSG": "排序Json格式不符" };
                    $Common.GeneraCallBack(d, callback);
                }
            }
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
                    (Value.indexOf(",") == -1) ? Where += Key + " in (\'" + Value + "\') and " : Where += Key + " in (\'" + $Array.ArrayToString(Value.split(','), "\',\'") + "\') and ";
                }
                else if (wheretype == 'not in') {/******not in******/
                    (Value.indexOf(",") == -1) ? Where += Key + " not in (\'" + Value + "\') and " : Where += Key + " not in (\'" + $Array.ArrayToString(Value.split(','), "\',\'") + "\') and ";;
                }
            }
            for (var i = 0; i < OrderJson.length; i++) {
                var SortName = OrderJson[i].SortName;
                var SortDesc = OrderJson[i].SortDesc;
                (i == OrderJson.length - 1) ? Order += SortName + " " + OrderJson[i].SortDesc : Order += SortName + " " + OrderJson[i].SortDesc + ",";
            }
            $("#MutiOpenField").val($String.trim($String.GetSubString(Field_F, 1)));
            $("#MutiOpenTitle").val($String.trim($String.GetSubString(Field_T, 1)));
            $("#MutiOpenTabName").val($String.trim(OpenTabName));
            $("#MutiOpenSet").val($String.trim($String.GetSubString(set, 1)));
            $("#MutiOpenWhere").val(Where);
            $("#MutiOpenOrder").val(Order);
            $("#MutiBackSpace").val($String.trim(BackSpace));
            $("#MutiOpenID").val($String.trim(OpenGuid));
            $("IsMutiChange_" + BackSpace).val("0");
            layer.open({
                type: 2,
                title: ["", 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
                shade: [0.3, '#393D49'],
                closeBtn: 1,
                area: [OpenWidth, OpenHeight],
                content: '../publicopen/opendata_new2?&title=' + OpenTitle,
                end: function () {
                    var d = { "RST": "RST", "ICO": "1", "FuncName": "PublicOpen_Mutiple", "MSG": "操作成功" };
                    $Common.GeneraCallBack(d, callback);
                }
            });
        },
        // options: 参数
        // callback: 回调函数
        "Open_AddSubRow": function (options, callback) {
            var defaults = {
                SubTableID: "temp_table_sub",//单身表格ID
                OpenGuid: "ROWID",//开窗标识
                InputJson: [
                   {//说明
                       InputType: "hidden",//表单元素类型        ★必传
                       InputName: "SHUOMING",//表单元素Name 索引ID ★必传
                       isOpen: 0,//是否开窗 默认不开窗0
                       OpenFunctionName: null,//开窗方法名称 默认无
                       OpenFunctionArr: null,//开窗方法追加参数 默认无
                       children: "",//子元素HTML内容 默认空
                       isAdd: "1",//是否提交数据 默认提交数据1  0为不提交数据
                       readonly: "1",//是否只读 1 只读 0 可写 默认可写
                       defaultvalue: $("#MC001").val(),//默认值字段
                       isGuid: 0,//是否为自动标识 默认为不是自动标识0  1为设置自动标识
                       Guidlength: 4,//自动标识长度 默认标识长度0
                       isRequired: 0,//是否必填 默认不必填0 必填 1
                       RequiredInfo: "",//未填提示信息 默认空
                       IsSet: 0,//是否赋值 默认不赋值
                   },
                ],//表单Json
                BackSpace: "BackSpace",//开窗域
                IsHaveDelete: "1",//是否有删除按钮 1 有 0无
            };
            var opts = $.extend(defaults, options);
            var SubTableID = opts.SubTableID;
            var OpenGuid = opts.OpenGuid;
            var InputJson = opts.InputJson;
            var BackSpace = opts.BackSpace;
            var IsHaveDelete = opts.IsHaveDelete;
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
                $Var.Sub_i = subi + 1;
                ($.inArray(Guid, HaveGuid_UpdateArr) == -1) ? addhtml += '<tr class="template" trtype="add" add-type="open" idguid="' + OpenGuid + '" guidvalue="' + Guid + '" sub-index="' + $Var.Sub_i + '" prepend-index="' + $Var.Sub_i + '" append-index = "' + $Var.Sub_i + '">' : addhtml += '<tr class="template" trtype="update" add-type="open"  idguid="' + OpenGuid + '" guidvalue="' + Guid + '" sub-index="' + $Var.Sub_i + '" prepend-index="' + $Var.Sub_i + '" append-index = "' + $Var.Sub_i + '">';
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
                                <input type="hidden" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '" >\
                            </td>';
                        }
                            //默认值(不是自动标识)
                        else {
                            addhtml +=
                                '<td style="display:none;">\
                                <input type="hidden" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                            </td>';
                        }
                    }
                        /* ---------------------------Text:文本元素------------------------------------*/
                    else if (InputType == 'text') {
                        //开窗
                        if (isOpen == '1') {
                            var ClickString = '';
                            if (OpenFunctionArr.length == 0) {
                                ClickString = OpenFunctionName + '("' + $Var.Sub_i + '")';
                            }
                            else {
                                ClickString += OpenFunctionName + '("' + $Var.Sub_i + ',';
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
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                }
                                    //只读 开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
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
                                            <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                            <span class="input-group-btn"><button type="button" class="btn btn-success" onclick=\'' + ClickString + '\' ><i class="demo-pli-add"></i></button></span>\
                                        </div>\
                                    </td>';
                                }
                                    //可写 开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <div class ="input-group" style="margin-bottom:0px;">\
                                            <input type="text" class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
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
                                        <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                }
                                    //只读 非开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <input type="text" readonly class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                }
                            }
                                //可写 非开窗
                            else {
                                //可写 非开窗 默认值（自动标识）
                                if (isGuid == '1') {
                                    addhtml +=
                                        '<td>\
                                        <input type="text"  class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + $String.addPre("0", $Var.Sub_i, Guidlength) + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                }
                                    //可写 非开窗 默认值（非自动标识）
                                else {
                                    addhtml +=
                                        '<td>\
                                        <input type="text"  class="form-control text-xml" name="' + InputName + '" IsSet="' + IsSet + '" id="' + InputName + '_' + $Var.Sub_i + '" sub-data-add="' + isAdd + '" value="' + defaultvalue + '" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">\
                                    </td>';
                                }
                            }
                        }
                    }
                        /* ---------------------------Select:下拉元素------------------------------------*/
                    else if (InputType == 'select') {
                        addhtml += '<td><select name="' + InputName + '" id="' + InputName + '_' + $Var.Sub_i + '" IsSet="' + IsSet + '" sub-data-add="' + isAdd + '" class="form-control" sub-required="' + isRequired + '" sub-required-info="' + RequiredInfo + '">' + children + '</select></td>';
                    }
                }
                if (IsHaveDelete == '1') {
                    addhtml +=
                        '<td>\
                        <button type="button" name="btn_del" id="btn_del_' + $Var.Sub_i + '" class="delrow demo-delete-row btn btn-danger btn-xs">\
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
            $OpenChildren.AddSubDeleteClick(SubTableID, BackSpace);
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
            var d = { "RST": "SUC", "ICO": "1", "FuncName": "Open_AddSubRow", "MSG": "操作成功" };
            $Common.GeneraCallBack(d, callback);
        },
        // options: 参数
        // callback: 回调函数
        "EditMutiSubLoad": function (options, callback) {
            var defaults = {
                SubTableID: "temp_table_sub",//单身表格ID
                SubGuid: "ROWID",//标识
                BackSpace: "BackSpace",//开窗域
            };
            var opts = $.extend(defaults, options);
            var SubTableID = opts.SubTableID;
            var SubGuid = opts.SubGuid;
            var BackSpace = opts.BackSpace;
            $Input.CreateHiddenInput([
                "MutiOpenBackBack_" + BackSpace,
            ]);

            var tr = $("#" + SubTableID + " tbody tr");
            var Json = "[{"
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
            var d = { "RST": "SUC", "ICO": "1", "FuncName": "EditMutiSubLoad", "MSG": "操作成功" };
            $Common.GeneraCallBack(d, callback);
        },
        // options: 参数
        // callback: 回调函数
        "SubLoadSelect": function (options, callback) {
            var defaults = {
                TableID: "temp_table_sub",//单身表格ID
                BackSpace: "BackSpace",//开窗域
                ViewFiledArr: [
                    "Col1",
                    "Col2",
                    "Col3",
                    "Col4",
                ],//别名数组
                InputFiledArr: [
                    "input_Col1",
                    "input_Col2",
                    "input_Col3",
                    "input_Col4",
                ],//表单数组
            };
            var opts = $.extend(defaults, options);
            var TableID = opts.TableID;
            var BackSpace = opts.BackSpace;
            var ViewFiledArr = opts.ViewFiledArr;
            var InputFiledArr = opts.InputFiledArr;
            $Input.CreateHiddenInput([
                "MutiOpenBackBack_" + BackSpace
            ]);
            var tableObj = $("#" + TableID + " tbody")[0];
            var InSelectValue = '[';
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
                    InSelectValue = $String.GetSubString(InSelectValue, 1) + ']';
                }
            }
            $("#MutiOpenBackBack_" + BackSpace).val(InSelectValue);
            var d = { "RST": "SUC", "ICO": "1", "FuncName": "SubLoadSelect", "MSG": "操作成功" };
            $Common.GeneraCallBack(d, callback);
        },
        // options: 参数
        // callback: 回调函数
        "PublicOpen_Main": function (options, callback) {
            var defaults = {
                OpenGuid: "ROWID",//开窗标识
                OpenTabName: "ROWID",//开窗数据源
                FieldJson: [
                    {//说明
                        field: "COL",
                        title: "列",
                        setElement: "COLELE",
                        isShow: "1",
                        IsBack: "1"
                    }
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
                BackSpace: "BackSpace",//开窗高度
                IsBeRelate: 0,//开窗字段是否有其他开窗关联 0 不关联 1关联
                BackNulledRelateField: "", //更改时清空关联字段数组字段
            };
            var opts = $.extend(defaults, options);
            var OpenGuid = opts.OpenGuid,
                OpenTabName = opts.OpenTabName,
                FieldJson = opts.FieldJson,
                OpenTitle = opts.OpenTitle,
                OpenIsSingle = opts.OpenIsSingle,
                WhereJson = opts.WhereJson,
                OrderJson = opts.OrderJson,
                OpenWidth = opts.OpenWidth,
                OpenHeight = opts.OpenHeight,
                callback = opts.callback,
                callbackArgArr = opts.callbackArgArr,
                BackSpace = opts.BackSpace,
                IsBeRelate = opts.IsBeRelate,
                BackNulledRelateField = opts.BackNulledRelateField;
            $Input.CreateHiddenInput([
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
            if (IsBeRelate == '1') {
                $Input.CreateHiddenInput([
                    BackSpace + "_BackNulledRelateField"
                ]);
                var BackNulledRelateField = BackNulledRelateField || [];
                $("#" + BackSpace + "_BackNulledRelateField").val(BackNulledRelateField.join(','));
            }
            if (!$Check.CheckJson(FieldJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "PublicOpen_Main", "MSG": "字段Json格式不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else if (WhereJson != "") {
                if (!$Check.CheckJson(WhereJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "PublicOpen_Main", "MSG": "条件Json格式不符" };
                    $Common.GeneraCallBack(d, callback);
                }
            }
            else if (OrderJson != "") {
                if (!$Check.CheckJson(OrderJson) && OrderJson != "") {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "PublicOpen_Main", "MSG": "排序Json格式不符" };
                    $Common.GeneraCallBack(d, callback);
                }
            }
            var Field_F = '';
            var Field_T = '';
            var setName = '';
            var Where = '';
            var Order = '';
            var BackArr = [];
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
                    (Value.indexOf(",") == -1) ? Where += Key + " in (\'" + Value + "\') and " : Where += Key + " in (\'" + $Array.ArrayToString(Value.split(','), "\',\'") + "\') and ";
                }
                else if (wheretype == 'not in') {/******not in******/
                    (Value.indexOf(",") == -1) ? Where += Key + " not in (\'" + Value + "\') and " : Where += Key + " not in (\'" + $Array.ArrayToString(Value.split(','), "\',\'") + "\') and ";;
                }
            }
            for (var i = 0; i < OrderJson.length; i++) {
                var SortName = OrderJson[i].SortName;
                var SortDesc = OrderJson[i].SortDesc;
                (i == OrderJson.length - 1) ? Order += SortName + " " + OrderJson[i].SortDesc : Order += SortName + " " + OrderJson[i].SortDesc + ",";
            }
            $("#OpenField").val($String.GetSubString(Field_F, 1));
            $("#OpenTitle").val($String.GetSubString(Field_T, 1));
            $("#OpenSetName").val($String.GetSubString(setName, 1));
            $("#OpenIsSingle").val(OpenIsSingle);
            $("#OpenTabName").val(OpenTabName);
            $("#OpenWhere").val(Where);
            $("#OpenOrder").val(Order);
            $("#BackSpace").val(BackSpace);
            $("#OpenBack").val(JSON.stringify(BackArr));
            $("#OpenGuid_" + BackSpace).val($String.trim(OpenGuid));
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
                        var d = { "RST": "SUC", "ICO": "1", "FuncName": "PublicOpen_Main", "MSG": "操作成功，变换" };
                        $Common.GeneraCallBack(d, callback);
                    }
                    else {
                        var d = { "RST": "SUC", "ICO": "1", "FuncName": "PublicOpen_Main", "MSG": "操作成功，未变换" };
                        $Common.GeneraCallBack(d, callback);
                    }
                }
            });
        },
        // options: 参数
        // callback: 回调函数
        "PublicOpen_Sub": function (options, callback) {
            var defaults = {
                OpenGuid: "ROWID",//开窗标识
                OpenTabName: "ROWID",//开窗数据源
                FieldJson: [
                    {//说明
                        field: "COL",
                        title: "列",
                        setElement: "COLELE",
                        isShow: "1",
                        IsBack: "1"
                    }
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
                BackSpace: "BackSpace",//开窗高度
                SubIndex: "0",//单身开窗索引
                IsBeRelate: 0,//开窗字段是否有其他开窗关联 0 不关联 1关联
                BackNulledRelateField: "", //更改时清空关联字段数组字段
            };
            var opts = $.extend(defaults, options);
            var OpenGuid = opts.OpenGuid,
                OpenTabName = opts.OpenTabName,
                FieldJson = opts.FieldJson,
                OpenTitle = opts.OpenTitle,
                OpenIsSingle = opts.OpenIsSingle,
                WhereJson = opts.WhereJson,
                OrderJson = opts.OrderJson,
                OpenWidth = opts.OpenWidth,
                OpenHeight = opts.OpenHeight,
                callback = opts.callback,
                callbackArgArr = opts.callbackArgArr,
                BackSpace = opts.BackSpace,
                SubIndex = opts.SubIndex,
                IsBeRelate = opts.IsBeRelate,
                BackNulledRelateField = opts.BackNulledRelateField;
            $Input.CreateHiddenInput([
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
                $Input.CreateHiddenInput([
                    BackSpace + "_BackNulledRelateField_" + SubIndex
                ]);
                var BackNulledRelateField = BackNulledRelateField || [];
                $("#" + BackSpace + "_BackNulledRelateField_" + SubIndex).val(BackNulledRelateField.join(','));
            }
            if (!$Check.CheckJson(FieldJson)) {
                var d = { "RST": "ERR", "ICO": "2", "FuncName": "PublicOpen_Sub", "MSG": "字段Json格式不符" };
                $Common.GeneraCallBack(d, callback);
            }
            else if (WhereJson != "") {
                if (!$Check.CheckJson(WhereJson)) {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "PublicOpen_Sub", "MSG": "条件Json格式不符" };
                    $Common.GeneraCallBack(d, callback);
                }
            }
            else if (OrderJson != "") {
                if (!$Check.CheckJson(OrderJson) && OrderJson != "") {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "PublicOpen_Sub", "MSG": "排序Json格式不符" };
                    $Common.GeneraCallBack(d, callback);
                }
            }
            var Field_F = '';
            var Field_T = '';
            var setName = '';
            var Where = '';
            var Order = '';
            var BackArr = [];
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
                    (Value.indexOf(",") == -1) ? Where += Key + " in (\'" + Value + "\') and " : Where += Key + " in (\'" + $Array.ArrayToString(Value.split(','), "\',\'") + "\') and ";
                }
                else if (wheretype == 'not in') {/******not in******/
                    (Value.indexOf(",") == -1) ? Where += Key + " not in (\'" + Value + "\') and " : Where += Key + " not in (\'" + $Array.ArrayToString(Value.split(','), "\',\'") + "\') and ";;
                }
            }
            for (var i = 0; i < OrderJson.length; i++) {
                var SortName = OrderJson[i].SortName;
                var SortDesc = OrderJson[i].SortDesc;
                (i == OrderJson.length - 1) ? Order += SortName + " " + OrderJson[i].SortDesc : Order += SortName + " " + OrderJson[i].SortDesc + ",";
            }
            $("#OpenField").val($String.GetSubString(Field_F, 1));
            $("#OpenTitle").val($String.GetSubString(Field_T, 1));
            $("#OpenSetName").val($String.GetSubString(setName, 1));
            $("#OpenIsSingle").val(OpenIsSingle);
            $("#OpenTabName").val(OpenTabName);
            $("#OpenWhere").val(Where);
            $("#OpenOrder").val(Order);
            $("#BackSpace").val(BackSpace);
            $("#OpenBack").val(JSON.stringify(BackArr));
            $("#OpenGuid_" + BackSpace).val($String.trim(OpenGuid));
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
                        var d = { "RST": "SUC", "ICO": "1", "FuncName": "PublicOpen_Sub", "MSG": "操作成功，变换" };
                        $Common.GeneraCallBack(d, callback);
                    }
                    else {
                        var d = { "RST": "SUC", "ICO": "1", "FuncName": "PublicOpen_Sub", "MSG": "操作成功，未变换" };
                        $Common.GeneraCallBack(d, callback);
                    }
                }
            });
        },
        // options: 参数
        // callback: 回调函数
        "PublickOpenBack_Main": function (options, callback) {
            var defaults = {
                BackSpace: "BackSpace",//开窗域
            };
            var opts = $.extend(defaults, options);
            //区域_是否返回
            var open_back = "isback_" + opts.BackSpace;
            //区域_上次值
            var lastvalue = "lastvalue_" + opts.BackSpace;
            var backinputs = $("input[" + open_back + "='1']");
            for (var i = 0; i < backinputs.length; i++)
                $(backinputs[i]).val($(backinputs[i]).attr(lastvalue));
            var d = { "RST": "SUC", "ICO": "1", "FuncName": "PublickOpenBack_Main", "MSG": "操作成功" };
            $Common.GeneraCallBack(d, callback);
        },
        // options: 参数
        // callback: 回调函数
        "Public_BackNulledRelateField": function (options, callback) {
            var defaults = {
                BackSpace: "BackSpace",//开窗域
                OpenType: "main",//开窗类型
                SubIndex: 0,//单身索引
            };
            var opts = $.extend(defaults, options);
            var SubIndex = opts.SubIndex,
                OpenType = opts.OpenType,
                BackSpace = opts.BackSpace;
            if (OpenType == 'main') {
                var NullElementValue;
                if ($("#" + BackSpace + "_BackNulledRelateField").length == 0) {
                    var d = { "RST": "ERR", "ICO": "2", "FuncName": "Public_BackNulledRelateField", "MSG": BackSpace + "-开窗区域:未找到元素" };
                    $Common.GeneraCallBack(d, callback);
                }
                else {
                    NullElementValue = $("#" + BackSpace + "_BackNulledRelateField").val();
                    var NullArr = NullElementValue.split(',');
                    for (var i = 0; i < NullArr.length; i++) {
                        $("#" + NullArr[i]).val("");
                    }
                    var d = { "RST": "SUC", "ICO": "1", "FuncName": "Public_BackNulledRelateField", "MSG": "操作成功" };
                    $Common.GeneraCallBack(d, callback);
                }
            }
            else if (OpenType = 'sub') {
                var NullElementValue;
                if ($("#" + BackSpace + "_BackNulledRelateField_" + SubIndex).length == 0) {
                    var d = { "RST": "ERR", "ICO": "2", "MSG": BackSpace + "-开窗区域:索引未找到" };
                    $Common.GeneraCallBack(d, callback);
                }
                else {
                    NullElementValue = $("#" + BackSpace + "_BackNulledRelateField_" + SubIndex).val()
                    var NullArr = NullElementValue.split(',');
                    for (var i = 0; i < NullArr.length; i++) {
                        $("#" + NullArr[i]).val("");
                    }
                    var d = { "RST": "SUC", "ICO": "1", "MSG": "操作成功" };
                    $Common.GeneraCallBack(d, callback);
                }
            }
        },
        // options: 参数
        // callback: 回调函数
        "PublickOpenBack_Sub": function (options, callback) {
            var defaults = {
                SubTableId: "temp_table_sub",//单身表ID标识
                SubIndex: 0,//单身索引
                BackSpace: "BackSpace"//开窗域
            };
            var opts = $.extend(defaults, options);
            var SubTableId = opts.SubTableId, SubIndex = opts.SubIndex, BackSpace = opts.BackSpace;
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
            var d = { "RST": "SUC", "ICO": "1", "FuncName": "PublickOpenBack_Sub", "MSG": "操作成功" };
            $Common.GeneraCallBack(d, callback);
        },
        /*
        * 清除表格表体数据
        * ---------------------------------------------------------------
         * @TableName       {字符串}    表ID
         * @BackSpace       {字符串}    域
         * @SubOpenType       {字符串}    多选 单选 默认单选
        */
        "CleanTbodySub": function (options, callback) {
            var defaults = {
                TableName: "temp_table_main",//表ID标识
                BackSpace: 0,//开窗域
                SubOpenType: 0//开窗类型 多选 单选
            };
            var opts = $.extend(defaults, options);
            var TableName = opts.TableName, BackSpace = opts.BackSpace, SubOpenType = opts.SubOpenType;
            $("#" + TableName + " tbody").html("");
            if (SubOpenType == '1') {
                $Input.ClearHiddenInput([
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
            var d = { "RST": "SUC", "ICO": "1", "FuncName": "CleanTbodySub", "MSG": "操作成功" };
            $Common.GeneraCallBack(d, callback);
        },
    }

    var $Input = {
        /*
         * 获取选中复选框的值
         * ---------------------------------------------------------------
         * @param checkBoxName checkbox的name
         * @returns {String}
         */
        "MultipleChoiceCheckBox": function (checkBoxName) {
            var content = '';
            var serids = document.getElementsByName(checkBoxName);
            for (var i = 0; i < serids.length; i++) {
                if (serids[i].checked) {
                    content += serids[i].value + ",";
                }
            }
            content = content.substr(0, content.length - 1);
            return content;
        },
        /*
         * 复选框--子反选父
         * ---------------------------------------------------------------
         * @param checkBoxName checkbox的name
         * @param parentName   控制反选按钮的id
         */
        "ReverseCheckedCheckBox": function (checkBoxName, parentName) {
            var bool = $("#" + parentName).prop("checked");
            var serids = document.getElementsByName(checkBoxName);
            var result = true;
            for (var i = 0; i < serids.length; i++) {
                if (!serids[i].checked) {
                    result = false;
                }
            }
            $("#" + parentName)[0].checked = result;
        },
        /*
        * 复选框--父全选子
        * ---------------------------------------------------------------
        * @param checkBoxName checkbox的name
        * @param parentName   控制反选按钮的id
        */
        "CheckAllCheckBox": function (checkBoxName, parentName) {
            var serids = document.getElementsByName(checkBoxName);
            var bool = $("#" + parentName).prop("checked");
            if (bool) {
                for (var i = 0; i < serids.length; i++) {
                    serids[i].checked = true;
                }
            } else {
                for (var i = 0; i < serids.length; i++) {
                    serids[i].checked = false;
                }
            }
        },
        /*
         * 创建隐藏元素
         * ---------------------------------------------------------------
         * @InputIDArr      {数组}    元素ID数组
         */
        "CreateHiddenInput": function (InputIDArr) {
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
        },
        /*
         * 移除隐藏元素
         * ---------------------------------------------------------------
         * @InputIDArr      {数组}    元素ID数组
         */
        "RemoveHiddenInput": function (InputIDArr) {
            if ($("body").find("div#HiddenElement").length != '0') {
                var DivHidden = $("div#HiddenElement");
                for (var i = 0; i < InputIDArr.length; i++) {
                    if (DivHidden.find($("#" + InputIDArr[i])).length != '0') {
                        $("#" + InputIDArr[i]).remove()
                    }
                }
            }
        },
        /*
         * 清空隐藏元素
         * ---------------------------------------------------------------
         * @InputIDArr      {数组}    元素ID数组
         */
        "ClearHiddenInput": function (InputIDArr) {
            if ($("body").find("div#HiddenElement").length != '0') {
                var DivHidden = $("div#HiddenElement");
                for (var i = 0; i < InputIDArr.length; i++) {
                    if (DivHidden.find($("#" + InputIDArr[i])).length != '0') {
                        $("#" + InputIDArr[i]).val("");
                    }
                }
            }
        },
        /*
         * 判断数组所有元素为空值
         * ---------------------------------------------------------------
         * @InputIDArr      {数组}    元素ID数组
         */
        "CheckInputArrIsNull": function (InputIDArr) {
            var InputIDArr = InputIDArr.split(',');
            for (var i = 0; i < InputIDArr.length; i++) {
                var Input = $("#" + InputIDArr[i])[0];
                if (Input.type.indexOf('select') == -1) {
                    if (Input.value != '') {
                        return false;
                    }
                }
            }
            return true;
        },
        /*
         * 获取单身表格元素值数组
         * ---------------------------------------------------------------
         * @TableID       {字符串}    单身表格ID
         * @InputName       {字符串}    元素Name
         * @RemoveIndex       {数组}    不参与计算索引
         */
        "GetTableInputValueArr": function (TableID, InputName) {
            var Arr = [];
            var subinput = $("#" + TableID + " tbody tr[trtype!='delete'] input[name='" + InputName + "']");
            for (var notini = 0; notini < subinput.length; notini++) {
                Arr.push(subinput[notini].value);
            }
            return Arr;
        },
    }

    var $Var = {
        "excel_Data": "",
        "excel_Columns_Field": "",
        "excel_Columns_Title": "",
        /*
         * 单身必填信息
         * ---------------------------------------------------------------
         */
        "SubRequiredMsg": "",
        /*
         * 单身添加索引
         * ---------------------------------------------------------------
         */
        "Sub_i": 1,
        /*
         * 必填信息
         * ---------------------------------------------------------------
         */
        "RequiredMsg": "",
        /*
        /*
         * Json键值对计算表达式
         * ---------------------------------------------------------------
         */
        "JsonEval": "",
        /*
        /*
         * Json键数组
         * ---------------------------------------------------------------
         */
        "JsonKeyArr": [],
        /*
         * Json值数值
         * ---------------------------------------------------------------
         */
        "JsonValueArr": [],
        /*
         * 执行存储过程后回弹数据
         * ---------------------------------------------------------------
         */
        "ExecProcData": [],
        /*
         * 添加后回弹数据
         * ---------------------------------------------------------------
         */
        "AddData": [],
        /*
         * 添加后回弹状态
         * ---------------------------------------------------------------
         */
        "AddStatus": "",
        /*
         * 添加后回弹信息
         * ---------------------------------------------------------------
         */
        "AddMsg": "",
        /*
         * Json串操作回弹状态
         * ---------------------------------------------------------------
         */
        "JsonStatus": "",
        /*
         * Json串操作回弹信息
         * ---------------------------------------------------------------
         */
        "JsonMsg": "",
        /*
         * Json串操作回弹数据
         * ---------------------------------------------------------------
         */
        "JsonReturnData": "",
        /*
         * 更新后回弹状态
         * ---------------------------------------------------------------
         */
        "UpdateStatus": "",
        /*
         * 更新后回弹信息
         * ---------------------------------------------------------------
         */
        "UpdateMsg": "",
        /*
         * 删除后回弹状态
         * ---------------------------------------------------------------
         */
        "DeleteStatus": "",
        /*
         * 删除后回弹信息
         * ---------------------------------------------------------------
         */
        "DeleteMsg": "",
        /*
         * 执行存储过程后回弹状态
         * ---------------------------------------------------------------
         */
        "ExecProcStatus": "",
        /*
         * 执行存储过程后回弹信息
         * ---------------------------------------------------------------
         */
        "ExecProcMsg": "",
        /*
         * 导出ExcelTimer变量
         * ---------------------------------------------------------------
         */
        "timer": "",
    }
})(jQuery, window)