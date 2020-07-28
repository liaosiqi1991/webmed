
var mstrtype = "";

var oTable;                //table

$(function () {
    oTable = new TableInit();

    oTable.Init();
})

var oTableInit = new Object();

var TableInit = function () {

    //初始化Table
    oTableInit.Init = function () {
        $('#bttable').bootstrapTable({
            url: '',                            //请求后台的URL（*）
            method: 'GET',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            search: false,
            contentType: "application/x-www-form-urlencoded",
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列-
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 5,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 645,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            detailView: false,                   //是否显示父子表
            columns: [

                { field: 'selectItem', radio: true },
                {
                    field: '住院号',
                    title: '住院号'
                }, {
                    field: '姓名',
                    title: '姓名',
                    width: '80px'
                }, {
                    field: '性别',
                    title: '性别'
                },
                {
                    field: '年龄',
                    title: '年龄',
                    width: '50px'
                },
                {
                    field: '住院次数',
                    title: '住院次数'
                },
                {
                    field: '入院日期',
                    title: '入院日期'
                },
                {
                    field: '入院科室',
                    title: '入院科室'
                },
                {
                    field: '出院科室',
                    title: '出院科室'
                },
                {
                    field: '运送人',
                    title: '运送人'
                },
                {
                    field: '接收人',
                    title: '接收人'
                },
                {
                    field: '接收时间',
                    title: '接收时间'
                },
                {
                    field: '编目日期',
                    title: '编目日期'
                },
                {
                    field: '记录时间',
                    title: '记录时间'
                },
                {
                    field: '状态',
                    title: '状态',
                    width: '80px'
                },
                {
                    field: '出院日期',
                    title: '出院日期'
                },
                {
                    field: '出生日期',
                    title: '出生日期'
                },
                {
                    field: '病人ID',
                    title: '病人ID',
                    visible: false
                },
                {
                    field: '主页ID',
                    title: '主页ID',
                    visible: false
                },
                {
                    field: '出院科室ID',
                    title: '出院科室ID',
                    visible: false
                },
                {
                    field: '病案号',
                    title: '病案号'
                }
            ],
            rowStyle: function (row, index) {
                var classesArr = ['success', 'info'];
                var strclass = "";
                if (index % 2 === 0) {//偶数行
                    strclass = classesArr[0];
                } else {//奇数行
                    strclass = classesArr[1];
                }
                return { classes: strclass };
            },//隔行变色
            onClickRow: function (row, $element) {
                //删除、修改按钮不可用，如果状态是已接收就可用
                $('#btnModify').attr('disabled', 'disabled')
                $('#btnDel').attr('disabled', 'disabled')

                if (row.状态 == "已接收") {
                    $('#btnModify').removeAttr('disabled')
                    $('#btnDel').removeAttr('disabled')
                }
            },
        });
    };

    return oTableInit;
};

function refreshbt() {
    $("#bttable").bootstrapTable('refresh');
}

//病案接收主查询
//读取查询表单中的条件，先进行基本验证，然后获取数据
function querymedlist() {
    var lngInNo = "";//住院号
    var lngNoTo = "";//住院号至
    var lngRoomID = "";//出院科室ID
    var dtOut = "";//出院时间
    var dtOutto ="";//出院时间
    var dtsend ="";//接收时间
    var dtsendto = "";//接收时间to
    var dtmake ="";//出院时间
    var dtmaketo = "";//出院时间to
    var strsend = "";//运送人
    var strrec = "";//接收人

    var havetime = 0;

    $('#bttable').bootstrapTable('removeAll'); 

    lngInNo = document.getElementById("txtInNo").value;
    lngNoTo = document.getElementById("txtInNoto").value;

    var select = document.getElementById('seldepadd');
    var index = select.selectedIndex;

    lngRoomID = select.options[index].value;

    strsend = document.getElementById("txtTran").value;
    strrec = document.getElementById("txtGet").value;

    if (document.getElementById("chkdtout").checked) {
        dtOut = document.getElementById("dtOut").value;
        dtOutto = document.getElementById("dtOutTo").value;
        havetime = 1;
    }

    if (document.getElementById("chkdtReceive").checked) {
        dtsend = document.getElementById("dtReceive").value;
        dtsendto = document.getElementById("dtReceiveTo").value;
        havetime = 1;
    }

    if (document.getElementById("chkdtMake").checked) {
        dtmake = document.getElementById("dtMake").value;
        dtmaketo = document.getElementById("dtMakeOutTo").value;
        havetime = 1;
    }

    if (havetime == 0) {
        alert("请至少选择一个时间范围条件");
        return;
    }

    try {
        $.ajax({
            type: "GET",
            url: "/api/values/GetMecRecInfo",
            data: {
                roomID: lngRoomID,
                inNo: lngInNo,
                inNoTo: lngNoTo,
                outDate: dtOut,
                outDateto: dtOutto,
                getDate: dtsend,
                getDateto: dtsendto,
                makeDate: dtmake,
                makeDateto: dtmaketo,
                sendp: strsend,
                getp: strrec
            },
            async: false,
            success: function (redata) {

                var jsonarr = eval('(' + redata + ')');
                $('#bttable').bootstrapTable('load', jsonarr);
  
            }
        });
    } catch (exception) {
        console.log(exception.message);
        window.alert("发生异常");
    }
};

//查询验证规则：目前好像没有规则
function validatequery() {

}

$('input#txtInNo').keyup(function () {
    var c = $(this);
    if (/[^\d]/.test(c.val())) {//替换非数字字符
        var temp_amount = c.val().replace(/[^\d]/g, '');
        $(this).val(temp_amount);
    }
})

$('input#txtInNoto').keyup(function () {
    var c = $(this);
    if (/[^\d]/.test(c.val())) {//替换非数字字符
        var temp_amount = c.val().replace(/[^\d]/g, '');
        $(this).val(temp_amount);
    }
})

function remove() {
    var rows = $('#bttable').bootstrapTable('getSelections');//获取选中行
    if (rows.length == 0) {
        layer.msg("请选择要删除的数据");
        return;
    }
    var indexs = [];
    for (var i = 0; i < rows.length; i++) {
        indexs[i] = rows[i].住院号;
    }
    
    //删除
    $('#bttable').bootstrapTable('remove', {
        field: '住院号',
        values: indexs
    });

}

function showadd() {
    $('#txtFind').removeAttr('disabled')
    $('#seldepadd').removeAttr('disabled')
    $('#btnadd').removeAttr('disabled')
    $('#selfind').removeAttr('disabled')

    init_form_add();
    $('#dm').modal({
        keyboard: false
    });
}

$('#dm').on('shown.bs.modal', function () {
    initadd();
    //init_form_add();
});

var oTableadd; 

function initadd() {
    if (oTableadd == null) {
        oTableadd = new TableInitadd();
        oTableadd.Init();
    }
}

var oTableInitadd = new Object();

var TableInitadd = function () {

    //初始化Table
    oTableInitadd.Init = function () {
        $('#btadd').bootstrapTable({
            url: "",               //请求后台的URL（*）*/,
            method: 'GET',                      //请求方式（*）
            toolbar: '',                //工具按钮用哪个容器  暂时没起作用 div-m-h
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInitadd.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 15],        //可供选择的每页的行数（*）
            search: false,
            contentType: "application/x-www-form-urlencoded",
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 300,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "",                     //每一行的唯一标识，一般为主键列
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            
            columns: [
                {
                    field: '住院号',
                    title: '住院号'
                }, {
                    field: '姓名',
                    title: '姓名'
                }, {
                    field: '性别',
                    title: '性别'
                },
                {
                    field: '年龄',
                    title: '年龄'
                },
                {
                    field: '住院次数',
                    title: '住院次数'
                },
                {
                    field: '入院科室',
                    title: '入院科室'
                },
                {
                    field: '入院时间',
                    title: '入院时间'
                },
                {
                    field: '出院科室',
                    title: '出院科室'
                },
                {
                    field: '出院时间',
                    title: '出院时间'
                },
                {
                    field: '病案号',
                    title: '病案号'
                }
                ,
                {
                    field: '病人ID',
                    title: '病人ID',
                    visible: false
                },
                {
                    field: '运送人',
                    title: '运送人',
                    visible: false
                },
                {
                    field: '接收人',
                    title: '接收人',
                    visible: false
                },
                {
                    field: '接收时间',
                    title: '接收时间',
                    visible: false
                }

                /*,
                {
                    title: "操作",
                    align: 'center',
                    valign: 'middle',
                    width: 160, // 定义列的宽度，单位为像素px
                    formatter: function (value, row, index) {   //传入数据
                        return '<button class="btn btn-primary btn-sm" onclick="del(\'' + row.病案号 + '\')">删除</button>';
                    }
                }*/
            ],
            rowStyle: function (row, index) {
                var classesArr = ['success', 'info'];
                var strclass = "";
                if (index % 2 === 0) {//偶数行
                    strclass = classesArr[0];
                } else {//奇数行
                    strclass = classesArr[1];
                }
                return { classes: strclass };
            },//隔行变色
            onClickRow: function (row, $element) {
                //$('.info').removeClass('info');
                //$($element).addClass('info');
                alert("草")
            },
        });
    };

    return oTableInitadd;
};

/*$('#bttable').bootstrapTable({
    onClickRow: function (row, $element, field) {
        alert("成功接收")
    }
});

$('#bttable').on('onClickRow.bs.table', function (row, $element, field) {
    alert("成功接收");
});*/

/*$('#bttable').on('click-row.bs.table', function (e, row, $element) {
    alert("成功接收");
    //$('.changeColor').removeClass('changeColor');
    //$($element).addClass('changeColor');
});*/

//新增病案
//根据病人ID/病人姓名/住院号查询出所有的符合条件的数据，然后全部新增到列表中
function addmedrec() {
    //读取科室ID
    var select = document.getElementById('seldepadd');
    var index = select.selectedIndex;
    var selectedValue = select.options[index].value;

    //读取输入信息  输入框类别 1:病人ID   2:住院号   3:姓名
    select = document.getElementById('selfind');
    index = select.selectedIndex;
    var s2 = select.options[index].value;


    //读取输入框值
    var txt = document.getElementById('txtFind').value;

    if (txt == "") {
        return;
    }

    document.getElementById('exampleModalLabel').innerHTML="新增病案"
    
    try {
        $.ajax({
            type: "GET",
            url: "/api/values/GetMedInfo",
            data: {
                calltype: s2,
                txt: txt,
                roomID: selectedValue,
            },
            async: false,
            success: function (restr) {

                try {
                    $.ajax({
                        type: "GET",
                        url: "/api/values/GetAddData",
                        data: {
                            calltype: "1",
                            medinfo: restr,
                            roomID: selectedValue,
                        },
                        async: false,
                        success: function (rejson) {
                            var jsonObj = eval('(' + rejson + ')');

                            $('#btadd').bootstrapTable('prepend', jsonObj); 
                        }
                    });
                } catch (exception) {
                    window.alert("发生异常A2" + exception.message);
                }

            }
        });
    } catch (exception) {
        window.alert("发生异常A1" + exception.message);
    }

    $('#txtFind').val("");
}

$().ready(function () {
    initroom();
    initMain();
});

//初始化科室选择下拉框
function initroom() {
    
    var se1 = document.getElementById('seldepadd'); 
    var se2 = document.getElementById('seldep');

    try {
        $.ajax({
            type: "GET",
            url: "/api/values/GetRoom",
            async: true,
            success: function (redata) {

                var listjson = eval(redata);

                var newOption = document.createElement("option");
                newOption.appendChild(document.createTextNode(""));
                newOption.setAttribute("value", 0);
                se1.appendChild(newOption);
                for (var i = 0; i < listjson.length; i++) {

                    var newOption = document.createElement("option");
                    newOption.appendChild(document.createTextNode(listjson[i].CODE + "-" + listjson[i].NAME));
                    newOption.setAttribute("value", listjson[i].ID);

                    se1.appendChild(newOption);
                }

                var newOption = document.createElement("option");
                newOption.appendChild(document.createTextNode(""));
                newOption.setAttribute("value", 0);
                se2.appendChild(newOption);
                for (var i = 0; i < listjson.length; i++) {


                    var newOption = document.createElement("option");
                    newOption.appendChild(document.createTextNode(listjson[i].CODE + "-" + listjson[i].NAME));
                    newOption.setAttribute("value", listjson[i].ID);

                    se2.appendChild(newOption);
                }
                
            }
        });
    } catch (exception) {
        window.alert("发生异常" + exception.message);
    }


    //se.options.add(new Option(a.value));

}

function testadd() {
    var select = document.getElementById('seldepadd');
    var index = select.selectedIndex;
    var selectedValue = select.options[index].value;
    var selectedText = select.options[index].text;

    //window.alert("当前选中信息：科室名称：" + selectedText + ",科室ID:" + selectedValue);

    //$('#table').bootstrapTable('prepend', newData);
}

//保存新增病案界面的数据  savetest
//接收时间 运送时间 接收人 运送人
function saveadddata() {
    var odata = $('#btadd').bootstrapTable('getData', { useCurrentPage: false, includeHiddenRows: false });
    var sdata = JSON.stringify(odata);

    if (sdata == "[]") {
        return;
    }

    var pget = $('#txtaddget').val();
    var psend = $('#txtaddsend').val();

    if (pget == "") {
        alert("请输入接收人");
        return;
    }

    if (psend == "") {
        alert("请输入运送人");
        return;
    }

    var time = new Date();
    var day = ("0" + time.getDate()).slice(-2);
    var month = ("0" + (time.getMonth() + 1)).slice(-2);
    var dtsend = time.getFullYear() + "-" + (month) + "-" + (day);//运送时间
    var dtget = $('#dtrtime').val();//接收时间

    odata.forEach(function (item, index) {
        item.pget = pget;
        item.psend = psend;
        item.dtsend = dtsend;
        item.dtget = dtget;
    })
    sdata = JSON.stringify(odata);
    //alert(sdata)
    
    $.ajax({
        type: "post",
        url: "/api/values/SaveMedRecs",
        contentType: 'application/json; charset=utf-8',
        data: sdata,
        //success: function (data, status) {}
            
    });

    if (document.getElementById('exampleModalLabel').innerHTML == "修改病案") {
        $("#dm").modal('hide');
        return;
    }

    //清空列表
    $('#btadd').bootstrapTable('removeAll');  
}


function init_form_add() {
//新增界面初始化 获取接收时间 列表数据清空
    var time = new Date();
    var day = ("0" + time.getDate()).slice(-2);
    var month = ("0" + (time.getMonth() + 1)).slice(-2);
    var today = time.getFullYear() + "-" + (month) + "-" + (day);
    $('#dtrtime').val(today);
    $('#txtaddget').val("");
    $('#txtaddsend').val("");
    $('#btadd').bootstrapTable('removeAll');
    $('#txtFind').val("");
}

function modify() {
    $('#txtFind').attr('disabled', 'disabled')
    $('#seldepadd').attr('disabled', 'disabled')
    $('#btnadd').attr('disabled', 'disabled')
    $('#selfind').attr('disabled', 'disabled')

    //获取选中病案的信息
    var row = $("#bttable").bootstrapTable('getSelections');

    if (Object.keys(row).length == 0) {
        return
    }

    document.getElementById('exampleModalLabel').innerHTML = "修改病案"

    var mecinfo= row[0].病人ID + "_" + row[0].主页ID;

    init_form_add();
    $('#dm').modal({
        keyboard: false
    });

    showmodify(mecinfo);
}

function showmodify(mecinfo) {
    //列表加载
    try {
        $.ajax({
            type: "GET",
            url: "/api/values/GetAddData",
            data: {
                calltype: "2",
                medinfo: mecinfo,
                roomID: "0",
            },
            async: false,
            success: function (rejson) {

                if (Object.keys(rejson).length == 0) {
                    alert("修改功能没数据");
                    return;
                }

                var jsonObj = eval('(' + rejson + ')');

                var newdata = jsonObj[0].接收时间;
                var t1 = new Date(newdata);
                var t2 = top.dateFtt("yyyy-MM-dd", t1);

                $('#btadd').bootstrapTable('prepend', jsonObj);
                $('#dtrtime').val(t2);
                $('#txtaddget').val(jsonObj[0].接收人);
                $('#txtaddsend').val(jsonObj[0].运送人);

            }
        });
    }
    catch (exception) {
        alert("showmodify发生异常" + exception.message);
    }    
}

//主页面初始化
function initMain() {
    var time = new Date();
    var day = ("0" + time.getDate()).slice(-2);
    var month = ("0" + (time.getMonth() + 1)).slice(-2);
    var today = time.getFullYear() + "-" + (month) + "-" + (day);

    $('#dtOutTo').val(today);
    $('#dtReceiveTo').val(today);
    $('#dtMakeTo').val(today);

    time = new Date();
    day = ("0" + (time.getDate()-7)).slice(-2);
    month = ("0" + (time.getMonth() + 1)).slice(-2);
    today = time.getFullYear() + "-" + (month) + "-" + (day);

    $('#dtOut').val(today);
    $('#dtReceive').val(today);
    $('#dtMake').val(today);

    var chk = document.getElementById('chkdtout');
    chk.checked = true;

    $('#btnModify').attr('disabled', 'disabled')
    $('#btnDel').attr('disabled', 'disabled')
}

function dateFtt(fmt, date) { //author: meizz 
    var o = {
        "M+": date.getMonth() + 1,     //月份 
        "d+": date.getDate(),     //日 
        "h+": date.getHours(),     //小时 
        "m+": date.getMinutes(),     //分 
        "s+": date.getSeconds(),     //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds()    //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
} 

//创建时间格式化显示
function crtTimeFtt(value, row, index) {
    var crtTime = new Date(value);
    return top.dateFtt("yyyy-MM-dd hh:mm:ss", crtTime);//直接调用公共JS里面的时间类处理的办法  
}

function delMed() {
    if (confirm("你是笨蛋吗") == true) {
        try {
            var row = $("#bttable").bootstrapTable('getSelections');
            var mecinfo = row[0].病人ID + "_" + row[0].主页ID;

            $.ajax({
                type: "GET",
                url: "/api/values/DelMedRec",
                data: {
                    medinfo: mecinfo,
                },
                async: false,
                success: function (rejson) {
                    querymedlist();
                }
            });
        }
        catch (exception) {
            alert("showmodify发生异常" + exception.message);
        }
    }
    //DelMedRec
}









