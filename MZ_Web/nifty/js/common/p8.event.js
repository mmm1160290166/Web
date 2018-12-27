function setCursorPosition(elem, index) {
    var val = elem.value
    var len = val.length

    // 超过文本长度直接返回
    if (len < index) return
    setTimeout(function () {
        elem.focus()
        if (elem.setSelectionRange) { // 标准浏览器
            elem.setSelectionRange(index, index)
        } else { // IE9-
            var range = elem.createTextRange()
            range.moveStart("character", -len)
            range.moveEnd("character", -len)
            range.moveStart("character", index)
            range.moveEnd("character", 0)
            range.select()
        }
    }, 10)
}

//单头开窗事件 
function getPublicWindow(a, b, c, d, e) {


    var sqlWhere = "";
    var mj_arr_005 = [];
    $.P8.common().post({ url: 'api/SYSMJ/getSysMjFor', usercode: Session.UserCode, data: { MJ001: a, MJ002: b, MJ004: c }, async: false },
       function (d) {
           mj_arr_005 = JSON.parse(d.MJ005);

           $.each(mj_arr_005, function (i, val) {

               if (val.MA004 == "1") {//从表

                   $(h).parent().parent().parent().parent().find("input").each(function () {

                       var inputName = $(this).attr('name');
                       if (val.MB001 == inputName) {

                           var eleType = val.MB006;
                           var MB001 = val.MB001;
                           var columnName = val.MC001;

                           if (eleType == "T" || eleType == "A" || eleType == "D" || eleType == "M" || eleType == "P") {

                               sqlWhere += " and " + columnName + " like ''%" + $(this).val() + "%'' ";
                           }
                           else if (eleType == "S") {

                               sqlWhere += " and " + columnName + " = ''" + $(this).val() + "'' ";
                           }
                       }
                   });

               } else {//主表

                   var ele = $("#" + val.MB001);
                   var eleType = val.MB006;
                   var MB001 = val.MB001;
                   var columnName = val.MC001;

                   if (ele.length > 0) {
                       //var v=row[index][val.MC001]==null?"":row[index][val.MC001];//值
                       if (eleType == "T" || eleType == "A" || eleType == "D" || eleType == "M" || eleType == "P") {

                           sqlWhere += " and " + columnName + " like ''%" + ele.val() + "%'' ";
                       }
                       else if (eleType == "S") {

                           sqlWhere += " and " + columnName + " = ''" + ele.val() + "'' ";
                       }
                       //else if(eleType=="P")
                       //{
                       //    e = '浏览按钮';
                       //}
                   }

                   var manyele = $('input[name=' + val.MB001 + ']');
                   if (manyele.length > 0) {

                       if (eleType == "R" || eleType == "C") {

                           $.each(manyele, function (j, item) {

                               sqlWhere += " and " + columnName + " = ''" + ele.val() + "'' ";
                               //if(item.value==v)item.checked=true;
                           })

                       }
                   }

               }
               //var ele=doc.find("#"+val.MB001);

           })
       });



    $("#HFSQLWhere").val("").val(sqlWhere);






    $.P8.common().pop({ url: '/SYSMB/PublicWindow?MJ001=' + a + '&MJ002=' + b + '&MJ004=' + c + '&IsManyChoose=' + d + '&Level=' + e, width: "70%", height: "90%", title: "选择" },
                        function () {
                            $("input").change();
                        });
}

//单身开窗事件 
function getSubPublicWindow(a, b, c, d, e, h) {

    var sqlWhere = "";
    var mj_arr_005 = [];
    $.P8.common().post({ url: 'api/SYSMJ/getSysMjFor', usercode: Session.UserCode, data: { MJ001: a, MJ002: b, MJ004: c }, async: false },
       function (d) {
           mj_arr_005 = JSON.parse(d.MJ005);

           $.each(mj_arr_005, function (i, val) {

               if (val.MA004 == "1") {//从表

                   $(h).parent().parent().parent().parent().find("input").each(function () {

                       var inputName = $(this).attr('name');
                       if (val.MB001 == inputName) {

                           var eleType = val.MB006;
                           var MB001 = val.MB001;
                           var columnName = val.MC001;

                           if (eleType == "T" || eleType == "A" || eleType == "D" || eleType == "M" || eleType == "P") {

                               sqlWhere += " and " + columnName + " like ''%" + $(this).val() + "%'' ";
                           }
                           else if (eleType == "S") {

                               sqlWhere += " and " + columnName + " = ''" + $(this).val() + "'' ";
                           }
                       }
                   });

               } else {//主表

                   var ele = $("#" + val.MB001);
                   var eleType = val.MB006;
                   var MB001 = val.MB001;
                   var columnName = val.MC001;

                   if (ele.length > 0) {
                       //var v=row[index][val.MC001]==null?"":row[index][val.MC001];//值
                       if (eleType == "T" || eleType == "A" || eleType == "D" || eleType == "M" || eleType == "P") {

                           sqlWhere += " and " + columnName + " like ''%" + ele.val() + "%'' ";
                       }
                       else if (eleType == "S") {

                           sqlWhere += " and " + columnName + " = ''" + ele.val() + "'' ";
                       }
                       //else if(eleType=="P")
                       //{
                       //    e = '浏览按钮';
                       //}
                   }

                   var manyele = $('input[name=' + val.MB001 + ']');
                   if (manyele.length > 0) {

                       if (eleType == "R" || eleType == "C") {

                           $.each(manyele, function (j, item) {

                               sqlWhere += " and " + columnName + " = ''" + ele.val() + "'' ";
                               //if(item.value==v)item.checked=true;
                           })

                       }
                   }

               }
               //var ele=doc.find("#"+val.MB001);

           })
       });



    $("#HFSQLWhere").val("").val(sqlWhere);


    $.P8.common().pop({ url: '/SYSMB/PublicWindow?MJ001=' + a + '&MJ002=' + b + '&MJ004=' + c + '&IsManyChoose=' + d + '&HFList=HFList&Level=' + e, width: "70%", height: "90%", title: "选择" },
        function () {
            $(h).parent().parent().parent().parent().find("input").each(function () {
                var inputName = $(this).attr('name');
                var e = $(this);
                $.each($.parseJSON($("#HFList").val()), function (index, obj) {
                    var eleType = obj.MB006;
                    if (obj.MB001 == inputName) {
                        if (eleType == "T" || eleType == "A" || eleType == "D" || eleType == "M" || eleType == "P") {
                            e.val(obj.MC001);
                            //alert(obj.MC001);
                        }
                        else if (eleType == "S") {
                            e.val(obj.MC001);
                        }
                    }
                })
            });
        });
}


//单头开窗事件(自定义数据源)
function getPublicWindowCur(url, MB042, MB043) {

    $.P8.common().pop({ url: '/Pop/' + url + '?key=' + MB043 + '&title=' + MB042, width: '400px', height: '600px', title: "选择" },
                        function () {
                            $("input").change();
                        });
}



//单身开窗事件 
function getSubPublicWindowCur(url, MB042, MB043, h) {
    $.P8.common().pop({ url: '/Pop/' + url + '?key=' + MB043 + '&title=' + MB042 + '&HFListBM=HFListBM', width: '400px', height: '600px', title: "选择" },
        function () {
            $(h).parent().parent().parent().parent().find("input").each(function () {
                var inputName = $(this).attr('name');
                var e = $(this);
                $.each($.parseJSON($("#HFListBM").val()), function (index, obj) {
                    //var eleType = obj.MB006;
                    if (obj.MB001 == inputName) {

                        e.val(obj.MC001);
                        //if (eleType == "T" || eleType == "A" || eleType == "D" || eleType == "M" || eleType == "P") {
                        //    e.val(obj.MC001);
                        //    //alert(obj.MC001);
                        //}
                        //else if (eleType == "S") {
                        //    e.val(obj.MC001);
                        //}
                    }
                })
            });
        });
}


//上传开窗事件
function setUpload(field, count, flag) {
    $.P8.common().pop({ url: '/upload/index?field=' + field + '&count=' + count + '&flag=' + flag + "&UpList=''", width: '80%', height: '90%', title: '上传文件' }, function () {

    });
}

//上传开窗事件
function setUploadForDoc(field, count, flag, maxfilecount) {
    $.P8.common().pop({ url: '/newcatalogues/index?field=' + field + '&count=' + count + '&flag=' + flag + '&maxfilecount=' + maxfilecount + "&UpList=''", width: '80%', height: '90%', title: '上传文件' }, function () {

    });
}

//上传开窗事件
function setUploadForDoc1(field, count, flag, maxfilecount) {
    $("#UpList").val("");
    $.P8.common().pop({ url: '/advancecatalogues/index?field=' + field + '&count=' + count + '&flag=' + flag + '&maxfilecount=' + maxfilecount + "&UpList=''", width: '80%', height: '90%', title: '上传文件' }, function () {

    });
}


//单身上传开窗事件
function setSubUpload(field, count, flag, h) {
    $.P8.common().pop({ url: '/upload/index?field=' + field + '&count=' + count + '&flag=' + flag + "&UpList=UpList", width: '80%', height: '90%', title: '上传文件' }, function () {


        var filelist = "";
        $(h).parent().find("input").each(function () {
            var e = $(this);
            $.each($.parseJSON($("#UpList").val()), function (index, obj) {
                if (e.val() != "") {
                    e.val(e.val() + "|" + obj.file);
                }
                else {
                    e.val(obj.file);
                }
            });
            filelist = e.val();
        });
        $("#UpList").val("");
        $(h).parent().find("font").each(function () {
            var e = $(this);
            var arr = filelist.split('|');
            e.html("[" + arr.length + "]");

        });
    });
}


//上传文件查阅开窗事件
function getUpload(field, count, flag) {
    $.P8.common().pop({ url: '/upload/showfile?field=' + field + '&count=' + count + '&flag=' + flag + "&UpList=''", width: '80%', height: '90%', title: '上传文件查阅' }, function () {});
}

//单身上传文件查阅开窗事件
function getSubUpload(field, count, flag, h) {

    $(h).parent().find("input").each(function () {
        var e = $(this);
        $("#UpList").val("");
        $("#UpList").val(e.val());
    });
    $.P8.common().pop({ url: '/upload/showfile?field=' + field + '&count=' + count + '&flag=' + flag + "&UpList=UpList", width: '80%', height: '90%', title: '上传文件查阅' }, function () {
        $(h).parent().find("input").each(function () {
            var e = $(this);
            e.val($("#UpList").val());
        });

        $(h).parent().find("font").each(function () {
            var e = $(this);
            if ($("#UpList").val() != "") {
                var arr = $("#UpList").val().split('|');
                e.html("[" + arr.length + "]");
            }
            else {
                e.html("");
            }
        });

    });
}

//上传模板开窗事件
function setSigFile(field, count, flag, FormNo, FileName) {
    $.P8.common().pop({ url: '/upload/sigfileupload?field=' + field + '&count=' + count + '&flag=' + flag + '&FormNo=' + FormNo + '&FileName=' + FileName, width: '80%', height: '90%', title: '上传模板文件' }, function () {

    });
}

//重置密码
function ResetPWD(ACCOUNT) {
    $.P8.common().post_confirm({ url: 'api/sysuser/resetpwd', usercode: Session.UserCode, data: { ACCOUNT: ACCOUNT }, msg: '确定要将用户“' + ACCOUNT + '”密码重置吗？' }, function (d) {
        top.layer.msg("新密码为”123456“，请及时修改密码！", { icon: 1, time: 2000 });
    });
}

//注销登录
function LoginOut() {
    top.layer.confirm("确定要注销登录吗？", { icon: 3, title: ['温馨提示', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'], closeBtn: 0 }, function (confirm) {
        top.layer.close(confirm);
        $.ajax({
            type: "POST",
            url: "/UserCenter/LoginOut",
            data: {},
            async: true,
            dataType: "json",
            contentType: 'application/json',
            success: function (d, textStatus) { top.window.location.href = "/login/index"; },
            error: function (XMLHttpRequest, textStatus, errorThrown) { top.window.location.href = "/login/index"; }
        });
    }, function (confirm) { top.layer.close(confirm); });
}






//图片上传
function imgUpload(sltid) {



    //存储上传图片列表路径
    var applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "../../";
    var urlJson = {};
    var select = {};

    var $ = jQuery,
      $list = $('#fileList_' + sltid),


      // 优化retina, 在retina下这个值是2
      ratio = window.devicePixelRatio || 1,
      // 缩略图大小
      thumbnailWidth = 45 * ratio,
      thumbnailHeight = 45 * ratio,

      // Web Uploader实例
      uploader;
    uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,

        disableGlobalDnd: true,
        // swf文件路径
        swf: applicationPath + '/Content/webuploader/Script/Uploader.swf',

        // 文件接收服务端。
        server: '/SysForm/UpLoadProcess',
        //server: 'http://127.0.0.1:8020/ImageUpload/UpLoadProcess',
        //method: 'POST',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: { id: '#filePicker_' + sltid, multiple: false },

        //只允许选择图片accept
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            //mimeTypes: 'image/*'
            mimeTypes: 'image/jpg,image/jpeg,image/png'   //修改这行
        }
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {

        var $li = $(
                '<div id="' + file.id + '" class="cp_img">' +
                    '<img>' +
                '<div class="cp_img_jian"></div></div>'
                ),
            $img = $li.find('img');


        // $list为容器jQuery实例
        $list.append($li);

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);

        $("#filePicker_" + sltid).hide();
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo($li)
                    .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {
        //;
        $('#' + file.id).addClass('upload-state-done');
        urlJson[response.id] = response.filePath

        $("#file_img_" + sltid).val(response.filePath);
    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {

        var $li = $('#' + file.id),
            $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {

        $('#' + file.id).find('.progress').remove();


    });

    //所有文件上传完毕
    uploader.on("uploadFinished", function () {
        //提交表单

    });


    //显示删除按钮
    $("#tb_cp_" + sltid).on("mouseover", '.cp_img', function () {
        $(this).children(".cp_img_jian").css('display', 'block');

    });
    //隐藏删除按钮
    $("#tb_cp_" + sltid).on("mouseout", '.cp_img', function () {
        $(this).children(".cp_img_jian").css('display', 'none');

    });


    //执行删除方法
    $list.on("click", ".cp_img_jian", function () {

        //debugger
        //var Id = $(this).parent().attr("id");

        //if (Id.indexOf('tempFile_') >= 0) {
        //    //$('#' + Id).html("");
        //} else {
        //    uploader.removeFile(uploader.getFile(Id, true));

        //}
        $(this).parent().remove();
        //delete urlJson[Id];
        $('#file_img_' + sltid).val("");

        $("#filePicker_" + sltid).show();
    });

}

function SignatureView(ID, FORMNO, DOCNAME) {
    var link = $('<a href="' + '/Office/IndexView?a=' + Math.random() + "&ID=" + ID + "&FORMNO=" + FORMNO + "&DOCNAME=" + encodeURI(DOCNAME) + '" target="_blank"></a>');
    link.get(0).click();
}

//打开文档 签章
function Signature(ID, FORMNO, DOCNAME) {
    //$.P8.common().pop_full({ url: '../Office/OfficeOperation?a=' + Math.random() + "&ID=" + ID + "&FORMNO=" + FORMNO + "&DOCNAME=" + DOCNAME, width: '70%', height: '90%', title: "" },
    //            function () {
    //            });
    var link = $('<a href="' + '/Office/OfficeOperation?a=' + Math.random() + "&ID=" + ID + "&FORMNO=" + FORMNO + "&DOCNAME=" + encodeURI(DOCNAME) + '" target="_blank"></a>');
    link.get(0).click();
}

//创建文档 不签章
function SignatureCreate(ID, FORMNO, DOCNAME, gzstatus) {
    if (gzstatus == "2") {
        top.layer.msg('文档已盖章，不允许修改', { icon: 7, time: 2000 }, function () { });
    }
    else {
        var link = $('<a href="' + '/Office/IndexCreate?a=' + Math.random() + "&ID=" + ID + "&FORMNO=" + FORMNO + "&DOCNAME=" + encodeURI(DOCNAME) + '" target="_blank"></a>');
        link.get(0).click();
    }
}

//电子签章九典
function SignatureJDView(templatename, id) {
    var templateid = '1';
    switch (templatename) {
        case "单笔小合同":
            templateid = '1';
            break;
        case "年度合同-代理":
            templateid = '2';
            break;
        case "年度合同-合作经销":
            templateid = '3';
            break;
    }
    var popindex = layer.open({
        type: 2,
        title: ['报表预览', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
        shade: [0.3, '#393D49'],
        closeBtn: 1,
        content: '/HtmlToPDF/WritePDF?template=' + templateid + '&method=0&id=' + id,
        btn: ['关闭'],
        btnAlign: 'c'
    });
    layer.full(popindex);
    window.onresize = function () { layer.full(popindex); }
}

function SignatureJD(templatename, id, status) {
    var templateid = '1';
    switch (templatename) {
        case "单笔小合同":
            templateid = '1';
            break;
        case "年度合同-代理":
            templateid = '2';
            break;
        case "年度合同-合作经销":
            templateid = '3';
            break;
    }
    var popindex = null;
    //已盖章
    if (status == "已盖章") {
        popindex = layer.open({
            type: 2,
            title: ['报表盖章', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
            shade: [0.3, '#393D49'],
            closeBtn: 1,
            content: '/HtmlToPDF/WritePDF?template=' + templateid + '&method=1&id=' + id,
            btn: ['关闭'],
            btnAlign: 'c'
        });
    }
    else {
        popindex = layer.open({
            type: 2,
            title: ['报表盖章', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'],
            shade: [0.3, '#393D49'],
            closeBtn: 1,
            content: '/HtmlToPDF/WritePDF?template=' + templateid + '&method=0&id=' + id,
            btn: ['盖章', '关闭'],
            btnAlign: 'c',
            yes: function (index, layero) {
                $(layero).find(".layui-layer-btn a").eq(0).css("display", "none");
                layer.iframeSrc(index, '/HtmlToPDF/WritePDF?template=' + templateid + '&method=1&id=' + id);
            },
            end: function () { TableInit(); }
        });
    }
    layer.full(popindex);
    window.onresize = function () { layer.full(popindex); }
}

function DocRead(ID) {
    //$.P8.common().pop_full({ url: '../Office/indexopen?a=' + Math.random() + "&ID=" + ID, width: '70%', height: '90%', title: "" },
    //            function () {
    //            });
    var link = $('<a href="' + '/Office/indexopen?a=' + Math.random() + "&ID=" + ID + '" target="_blank"></a>');
    link.get(0).click();
}
//采购计划 - 单据状态
function DoCheckRow(ID, TableName, Keys, Values) {
    $.P8.common().post_confirm({ url: 'api/SUPInformation/UpState', usercode: Session.UserCode, data: { ID: ID, TableName: 'SUPMANRJ', Keys: 'RJ016', Values: '1' }, msg: '确定发布该计划吗？' }, function (d) { if (d.RST == "SUC") { TableInit(); } else { eval(d.CALLBACK); } });
}
//采购计划 - 邀请供应商
function DoInvitationRow(obj, obj1, w, h) {
    if (obj1 == "1") {
        $.P8.common().post_confirm({ url: 'api/SUPInformation/UpSUPMANRM', usercode: Session.UserCode, data: { RM001: obj, CREATEUSER: Session.UserCode }, msg: '由于询价方式为非邀请供应商，是否邀请所有有效供应商？' }, function (d) { if (d.RST == "SUC") { TableInit(); } else { eval(d.CALLBACK); } });
    }
    else {
        var url = "/sysform/Index_2?formno=1802002&formname=供应商邀请&keyfield=&keyJson={'RM001':'" + obj + "'}";//+ encodeURIComponent("{'RM001':'" + obj + "'}")

        $.P8.common().pop({ url: url, width: w, height: h, title: '新建' + formname }, function () {
            TableInit();
        });
    }

}

//莫正
function ToSupGenearte(a, b, c, d, e, f) {
    $.P8.common().pop({ url: '/supplier/extendfilterlogin?view=SuplierGenerate&param=' + escape(a) + '&param1=' + escape(b) + '&param2=' + escape(c), width: d, height: e, title: f }, function () {
        TableInit();
    });
}


function ToSupGOrder(a, b, c, d, e) {
    $.P8.common().pop({ url: '/supplier/extendfilterlogin?view=SuplierGOrder&param=' + escape(a) + '&param1=' + escape(b), width: c, height: d, title: e }, function () {
        TableInit();
    });
}

//生成红头文件
function HTCreate(taskid, callback) {
    layer.confirm('确定要生成红头文件吗？', { icon: 3, title: ['温馨提示', 'height:30px;color:#fff;font-size:14px; background: rgb(79,129,189); border-bottom: 1px solid rgb(188,188,188);line-height:30px;font-family:"Microsoft YaHei";'], closeBtn: 0 }, function (confirm) {
        layer.close(confirm);
        $.ajax({
            type: "POST",
            url: "/htword/create",
            data: { "TASKID": taskid },
            async: true,
            dataType: "json",
            success: function (d, textStatus) {
                if (d.RST == "SUC") {
                    callback(d);
                }
                else {
                    layer.msg(d.MSG, { icon: d.ICO, time: 2000 }, function () { eval(d.CALLBACK); });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status != 0) {
                    layer.msg("请求失败", { icon: 0, time: 2000 });
                }
            }
        });
    }, function (confirm) { layer.close(confirm); });
}

//Office文档预览
function ShowRowMore(filepath) {
    window.open('../PreView/Show?fullpath=' + filepath, '文档查看');
}