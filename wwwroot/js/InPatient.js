var dttoday = "";
var nodatatips = "本日没有住院日报数据";
var dtCalender = "";
var type="" //新增/修改

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
                [
                    { field: 'selectItem', radio: true, rowspan: 2, },
                    {
                        field: '科室ID',
                        title: '科室ID',
                        rowspan: 2,
                        class: 'mycell',
                        visible: false
                    },
                    {
                        field: '名称',
                        title: '科室',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        class: 'mycell',
                        width: 50
                    },
                    {
                        field: '开放床数',
                        title: '开放床数',
                        align: 'center',
                        valign: 'middle',
                        class: 'mycell',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '本日空床',
                        title: '本日空床',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '科室床位',
                        title: '科室床位</br>占用数',
                        align: 'center',
                        valign: 'middle',
                        class: 'mycell',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '家庭病床',
                        title: '家庭病床',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '床位占用数',
                        title: '公共病床</br>人数',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '住院者动态',
                        title: '住院者动态',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        colspan: 7,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '危重人次',
                        title: '危重人次',
                        class: 'mycell',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '陪伴人次',
                        title: '陪伴人次',
                        class: 'mycell',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '护理天数',
                        title: '一级特级</br>护理天数',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '褥疮人数',
                        title: '褥疮发生</br>人数',
                        align: 'center',
                        valign: 'middle',
                        class: 'mycell',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '抢救人数',
                        title: '抢救人数',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '本日加床',
                        title: '本日加床',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        rowspan: 2,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '医疗事故',
                        title: '医疗事故',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '严重差错',
                        title: '严重差错',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        rowspan: 2,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '床位使用率',
                        title: '床位使用率',
                        class: 'mycell',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }

                    },
                    {
                        field: '记录人',
                        title: '记录人',
                        class: 'mycell',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2
                    },
                    {
                        field: '记录时间',
                        title: '记录日期',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        rowspan: 2
                    },
                    {
                        field: '审核人',
                        title: '审核人',
                        align: 'center',
                        valign: 'middle',
                        class: 'mycell',
                        rowspan: 2
                    },
                    {
                        field: '审核日期',
                        title: '审核日期',
                        align: 'center',
                        valign: 'middle',
                        class: 'mycell',
                        rowspan: 2
                    }
                ],
                [
                    {
                        field: '原人数',
                        align: 'center',
                        valign: 'middle',
                        title: '原人数',
                        class: 'mycell',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '入院数',
                        align: 'center',
                        valign: 'middle',
                        title: '入院数',
                        class: 'mycell',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '转入数',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        title: '转入数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '出院数',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        title: '出院数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    }, {
                        field: '其中死亡',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        title: '其中死亡',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '转出数',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        title: '转出数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '现人数',
                        align: 'center',
                        class: 'mycell',
                        valign: 'middle',
                        title: '现人数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    }
                ]
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
                [
                    {
                        field: '科室ID',
                        title: '科室ID',
                        rowspan: 2,
                        visible: false
                    },
                    {
                        field: '名称',
                        title: '科室',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50
                    },
                    {
                        field: '开放床数',
                        title: '开放床数',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '本日空床',
                        title: '本日空床',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '科室床位',
                        title: '科室床位</br>占用数',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '家庭病床',
                        title: '家庭病床',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '床位占用数',
                        title: '公共病床</br>人数',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '住院者动态',
                        title: '住院者动态',
                        align: 'center',
                        valign: 'middle',
                        colspan: 7,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '危重人次',
                        title: '危重人次',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '陪伴人次',
                        title: '陪伴人次',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '护理天数',
                        title: '一级特级</br>护理天数',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '褥疮人数',
                        title: '褥疮发生</br>人数',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '抢救人数',
                        title: '抢救人数',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '本日加床',
                        title: '本日加床',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '医疗事故',
                        title: '医疗事故',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '严重差错',
                        title: '严重差错',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '床位使用率',
                        title: '床位使用率',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2,
                        width: 50,
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }

                    },
                    {
                        field: '记录人',
                        title: '记录人',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2
                    },
                    {
                        field: '记录时间',
                        title: '记录日期',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2
                    },
                    {
                        field: '审核人',
                        title: '审核人',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2
                    },
                    {
                        field: '审核日期',
                        title: '审核日期',
                        align: 'center',
                        valign: 'middle',
                        rowspan: 2
                    }
                ],
                [
                    {
                        field: '原人数',
                        align: 'center',
                        valign: 'middle',
                        title: '原人数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '入院数',
                        align: 'center',
                        valign: 'middle',
                        title: '入院数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '转入数',
                        align: 'center',
                        valign: 'middle',
                        title: '转入数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '出院数',
                        align: 'center',
                        valign: 'middle',
                        title: '出院数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    }, {
                        field: '其中死亡',
                        align: 'center',
                        valign: 'middle',
                        title: '其中死亡',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '转出数',
                        align: 'center',
                        valign: 'middle',
                        title: '转出数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    },
                    {
                        field: '现人数',
                        align: 'center',
                        valign: 'middle',
                        title: '现人数',
                        formatter: function (value, item, index) {
                            if (value == 0) {
                                return null;

                            }
                            else {
                                return value
                            }
                        }
                    }
                ]
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
            url: "/api/values/GetInPatiDailyList",
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
            url: "/api/values/GetInPatiDailyList",
            data: {
                time: ptime,
            },
            async: false,
            success: function (rejson) {
                //alert(rejson)
                if (Object.keys(rejson).length == 0) {
                    //alert("这个时间没数据");
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

function showDaily(stype) {
    $('#dm').modal({
        keyboard: false
    });

    type = stype
}

$('#dm').on('shown.bs.modal', function () {
    $('#p-now').html("当前日期"+dtCalender);
    if (type == "修改") {
        initTableDaily();
    }
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

    dtCalender = dttoday

    try {
        $.ajax({
            type: "GET",
            url: "/api/values/GetLastInDailyDate",
            async: false,
            success: function (rejson) {
                var jsonObj = eval('(' + rejson + ')');
                var time = jsonObj[0].最后日期;
                var oldTime = (new Date(time)).getTime();
                var curTime = new Date(oldTime).format("yyyy-MM-dd");

                $('#p-last').text("跳转最后一次进行住院日报录入的日期是" + curTime)

                
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
function SaveInPatiDailt(type) {
    var odata = $('#t-daily').bootstrapTable('getData', { useCurrentPage: false, includeHiddenRows: false });
    var sdata = JSON.stringify(odata);

    sdata = sdata.replace(/<br>/g, "")
    sdata = sdata.replace(/&nbsp/g, "")

    //保存功能测试OK
    if (sdata == "[]") {
        alert("识别为空")
        return;
    }
    odata.forEach(function (item, index) {
        item.操作类型 = type;
    })
    sdata = JSON.stringify(odata);

    //alert("插入类型参数测试")
    $.ajax({
        type: "post",
        url: "/api/values/SaveInPatiDaily",
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

//日报审核
function DailyVerify() {
    try {
        $.ajax({
            type: "GET",
            url: "/api/values/DailyVerify",
            data: {
                date: dtCalender,
                roomid: "",
                name: "管理员",
                vdate: dttoday
            },
            async: false,
            success: function (redata) {
                alert("审核流程ok")
                filltable(dtCalender);
            }
        });
    } catch (exception) {
        window.alert("审核发生异常");
    }
}

//取消审核
function CancelDailyVerify() {
    try {
        $.ajax({
            type: "GET",
            url: "/api/values/CancelDailyVerify",
            data: {
                date: dtCalender,
                roomid: "",
            },
            async: false,
            success: function (redata) {
                
                filltable(dtCalender);
            }
        });
    } catch (exception) {
        window.alert("取消审核发生异常");
    }
}

function cancel() {
    var strCan = "确定要取消XXXX/X/XX所有科室的日报数据吗？<br>[是]：对所有已审核的科室进行取消审核！<br>[否]：对当前选中已审核的科室进行取消审核！" +
        "< br > [取消]：放弃操作，退出本窗体。";

    $('#d-tip').html(strCan);

    $('#dm2').modal({
        keyboard: false
    });
}

function del() {
    var strDel = "确定要删除XXXX/X/XX所有科室的日报数据吗？<br>[是]：对所有所有未审核科室的日报进行删除！<br>[否]：对当前选中未审核科室的日报进行删除！" +
        "< br > [取消]：放弃操作，退出本窗体。";

    $('#d-tip').html(strDel);

    $('#dm2').modal({
        keyboard: false
    });
}




//取消全部科室日报审核状态
function dmYes() {
    try {
        $.ajax({
            type: "GET",
            url: "/api/values/CancelDailyVerify",
            data: {
                date: dtCalender,
                roomid: "",
            },
            async: false,
            success: function (redata) {

                filltable(dtCalender);
            }
        });
    } catch (exception) {
        window.alert("发生异常");
    }

    $("#dm2").modal('hide');
}

//取消特定科室日报审核状态
function dmNo() {
    var row = $("#t-main").bootstrapTable('getSelections');

    if (Object.keys(row).length == 0) {
        alert("未提取到科室ID")
        return
    }

    var vid = row[0].科室ID
    
    try {
        $.ajax({
            type: "GET",
            url: "/api/values/CancelDailyVerify",
            data: {
                date: dtCalender,
                roomid: vid,
            },
            async: false,
            success: function (redata) {
                filltable(dtCalender);
            }
        });
    } catch (exception) {
        window.alert("发生异常");
    }
    $("#dm2").modal('hide');
}

function dmCancel() {
    $("#dm2").modal('hide');
}

function refresh() {
    if (dtCalender != "") {
        filltable(dtCalender);
    }
    else {
        filltable(dttoday);
    }
}  