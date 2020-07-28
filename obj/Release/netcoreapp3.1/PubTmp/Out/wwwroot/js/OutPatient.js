var dttoday = "";
var nodatatips = "本日没有住院日报数据";
var dtCalender = "";

function initTable() {



}


function testTable() {


}

$('#calendar').calendar({
	onSelect: function (date) {

        var time = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
        filltable(time)
        dtCalender = (time);
	}
});

var oTable;                //table

function initTableMain() {
    oTable = new TableInit();
    oTable.Init();
}

$().ready(function () {
    initTableMain();
    SetLastDaily();

    $('#t-main').bootstrapTable('resetView', { height: 750 });
})

var oTableInit = new Object();

var TableInit = function () {

    //初始化Table
    oTableInit.Init = function () {
        $('#t-main').bootstrapTable({
            url: '',                            //请求后台的URL（*）
            method: 'GET',                      //请求方式（*）
            //toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            search: false,
            contentType: "application/x-www-form-urlencoded",
            strictSearch: true,
            clickToSelect: true,
            showColumns: false,                  //是否显示所有的列-
            showRefresh: false,                  //是否显示刷新按钮
            //minimumCountColumns: 5,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            //height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            detailView: false,                   //是否显示父子表
            undefinedText:"",

            columns: [    
                {
                field: '名称',
                title: '科室',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                },{
                field: '门诊人次',
                title: '门诊人次',
                formatter: function (value, item, index) {
                if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '初诊人次',
                title: '初诊人次',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '复诊人次',
                title: '复诊人次',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '急诊人次',
                title: '急诊人次',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '急抢人次',
                title: '急抢人次',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '急死人次',
                title: '急死人次',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                    field: '出诊人次',
                    title: '出诊人次',
                    formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '巡诊人次',
                title: '巡诊人次',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '体检',
                title: '体检',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '其他',
                title: '其他',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '主治医师',
                title: '主治医师',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '专家',
                title: '专家',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '记录人',
                title: '记录人',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
                }, {
                field: '记录日期',
                title: '记录日期',
                formatter: function (value, item, index) {
                    if (value == 0) {
                        return null;

                    }
                    else {
                        return value
                    }
                    }
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

            /*onClickRow: function (row, $element) {
                //删除、修改按钮不可用，如果状态是已接收就可用
                $('#btnModify').attr('disabled', 'disabled')
                $('#btnDel').attr('disabled', 'disabled')

                if (row.状态 == "已接收") {
                    $('#btnModify').removeAttr('disabled')
                    $('#btnDel').removeAttr('disabled')
                }
            },*/
            onDblClickRow: function (row) {
                //判断列表中是否有数据，如果有，打开编辑界面
                var odata = $('#btadd').bootstrapTable('getData', { useCurrentPage: false, includeHiddenRows: false });
                var sdata = JSON.stringify(odata);

                if (sdata == "[]") {
                    alert("没数据")
                    return;
                }

                showDaily(dttoday);
            },
            formatNoMatches: function () {
                return "请点击刷新按钮获取时报数据";
            }

        });
    };

    return oTableInit;
};

var oTableDaily = new Object();               //table


function initTableDaily() {
    oTableDaily = new TableInitDaily();
    oTableDaily.Init();
}

var TableInitDaily = function () {

    //初始化Table
    oTableInit.Init = function () {
        $('#t-daily').bootstrapTable({
            url: '',                            //请求后台的URL（*）
            method: 'GET',                      //请求方式（*）
            //toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            search: false,
            contentType: "application/x-www-form-urlencoded",
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列-
            showRefresh: false,                  //是否显示刷新按钮
            //minimumCountColumns: 5,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            //height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            detailView: false,                   //是否显示父子表
            undefinedText: "",

            columns: [
                {
                    field: '名称',
                    title: '科室',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '门诊人次',
                    title: '门诊人次',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '初诊人次',
                    title: '初诊人次',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '复诊人次',
                    title: '复诊人次',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '急诊人次',
                    title: '急诊人次',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '急抢人次',
                    title: '急抢人次',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '急死人次',
                    title: '急死人次',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '出诊人次',
                    title: '出诊人次',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '巡诊人次',
                    title: '巡诊人次',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '体检',
                    title: '体检',
                formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '其他',
                    title: '其他',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '主治医师',
                    title: '主治医师',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '专家',
                    title: '专家',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '记录人',
                    title: '记录人',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
                }, {
                    field: '记录日期',
                    title: '记录日期',
                    formatter: function (value, item, index) {
                        if (value == 0) {
                            return null;

                        }
                        else {
                            return value
                        }
                    }
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
         
            formatNoMatches: function () {
                return "不可能出现没数据的情况";
            },

            onClickCell: function (field, value, row, $element) {
                $element.attr('contenteditable', true);
                $element.blur(function () {
                    let index = $element.parent().data('index');
                    let tdValue = $element.html();

                    saveData(index, field, tdValue);
                })
            },


        });
    };

    return oTableInit;
};

function saveData(index, field, value) {
    $("#t-daily").bootstrapTable('updateCell', {
        index: index,       //行索引
        field: field,       //列名
        value: value        //cell值
    })
}

function fillEditTable(ptime) {
    try {

        $.ajax({
            type: "GET",
            url: "/api/values/GetOutPatiDailyList",
            data: {
                time: ptime,
            },
            async: false,
            success: function (rejson) {
              
                if (Object.keys(rejson).length == 0) {
                    
                    $('#t-daily').bootstrapTable('removeAll'); 
                    return;
                }

                var jsonarr = eval('(' + rejson + ')');
                $('#t-daily').bootstrapTable('load', jsonarr);
            }
        });
    }
    catch (exception) {
        alert("showmodify发生异常" + exception.message);
    }
}

function filltable(ptime) {
    try {

        $.ajax({
            type: "GET",
            url: "/api/values/GetOutPatiDailyList",
            data: {
                time: ptime,
            },
            async: false,
            success: function (rejson) {
                if (Object.keys(rejson).length == 0) {
                    $('#t-main').bootstrapTable('removeAll');
                    return;
                }

                var jsonarr = eval('(' + rejson + ')');
                $('#t-main').bootstrapTable('load', jsonarr);

            }
        });
    }
    catch (exception) {
        alert("showmodify发生异常" + exception.message);
    }
}

function showDaily() {
    $('#dm').modal({
        keyboard: false
    });

    //alert("准备显示" + dtCalender +"这天的数据")
}

$('#dm').on('shown.bs.modal', function () {
    initTableDaily();
    fillEditTable(dtCalender);
});

function showLastDaily() {
    //显示最后一次的日报数据

    var reg = /[\u4e00-\u9fa5]/g;
    var str = $('#p-last').text()
    str = str.replace(reg, "");//去除中文

    $('#calendar').calendar('moveTo', new Date(str));
    filltable(str);
    dtCalender = str;
}

function selectToday() {
    $('#calendar').calendar('moveTo', new Date(dttoday));
    filltable(dttoday);
    //filltable("2020-07-18");
    dtCalender = dttoday;
}


function SetLastDaily() {
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    dttoday = s2;

    try {
        $.ajax({
            type: "GET",
            url: "/api/values/GetLastOutDailyDate",
            async: false,
            success: function (rejson) {
                var jsonObj = eval('(' + rejson + ')');
                var time = jsonObj[0].最后日期;
                var oldTime = (new Date(time)).getTime();
                var curTime = new Date(oldTime).format("yyyy-MM-dd");

                $('#p-last').text("跳转最后一次进行门诊日报录入的日期是" + curTime)
                
            }
        });
    }
    catch (exception) {
        alert("SetLastDaily发生异常" + exception.message);
    }
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//保存住院日报 type操作类型 直接传递 "新增" 或者 "修改"
function SaveOutPatiDailt(type) {
    var odata = $('#t-daily').bootstrapTable('getData', { useCurrentPage: false, includeHiddenRows: false });
    var sdata = JSON.stringify(odata);

    sdata = sdata.replace(/<br>/g, "")
    sdata = sdata.replace(/&nbsp/g, "")

    //保存功能测试OK
    if (sdata == "[]") {
        alert("识别为空")
        return;
    }

    //alert(sdata);
    //return

    odata.forEach(function (item, index) {
        item.操作类型 = type;
        item.记录日期 = dtCalender;
    })
    sdata = JSON.stringify(odata);

    //alert("插入类型参数测试")
    $.ajax({
        type: "post",
        url: "/api/values/SaveOutPatiDaily",
        contentType: 'application/json; charset=utf-8',
        data: sdata,
        success: function (data) {
            //TODO 按时间刷新界面
            $('#calendar').calendar('moveTo', new Date(dtCalender));
            filltable(dtCalender);
            ModelHide();
        }

    });
}

function ModelHide() {
    $("#dm").modal('hide');
}

function refresh() {
    if(dtCalender != "")
    {
        filltable(dtCalender);
    }
    else {
        filltable(dttoday);
    }
}  

function add() {
    $('#dm').modal({
        keyboard: false
    });

    //TODO 增加功能逻辑处理
}
