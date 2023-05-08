$(function () {
    var configLevel = $("#configLevel").val();
    var parentId = $("#parentId").val();

    $("#jqGrid").jqGrid({
        url: '/admin/tbConfig/page',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', index: 'id', width: 50, key: true, hidden: true},
            {label: '配置项', name: 'configName', index: 'configName', width: 120},
            {label: '配置内容', name: 'configValue', index: 'configValue', width: 120},
            {label: '图片展示', name: 'configValue', index: 'configValue', width: 120, formatter: coverImageFormatter},
        ],
        height: 560,
        rowNum: 50,
        rowList: [50],
        styleUI: 'Bootstrap',
        loadtext: '信息读取中...',
        rownumbers: false,
        rownumWidth: 20,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "data.list",
            page: "data.currPage",
            total: "data.totalPage",
            records: "data.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order",
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    function coverImageFormatter(cellvalue) {
        if(cellvalue != null && cellvalue.indexOf('28089/upload') !== -1){
            return "<img src='" + cellvalue + "' height=\"80\" width=\"80\" alt='configValue'/>";
        }else{
            return cellvalue;
        }
    }

    $(window).resize(function () {
        $("#jqGrid").setGridWidth($(".card-body").width());
    });

    new AjaxUpload('#uploadConfigImg', {
        action: '/admin/upload/file',
        name: 'file',
        autoSubmit: true,
        responseType: "json",
        onSubmit: function (file, extension) {
            if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))) {
                Swal.fire({
                    text: "只支持jpg、png、gif格式的文件！",
                    icon: "error",iconColor:"#f05b72",
                });
                return false;
            }
        },
        onComplete: function (file, r) {
            if (r != null && r.resultCode == 200) {
                $("#configImg").attr("src", r.data);
                $("#configImg").attr("style", "width: 128px;height: 128px;display:block;");
                return false;
            } else {
                Swal.fire({
                    text: r.message,
                    icon: "error",iconColor:"#f05b72",
                });
            }
        }
    });
});

/**
 * jqGrid重新加载
 */
function reload() {
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        page: page
    }).trigger("reloadGrid");
}

function configAdd() {
    reset();
    $('.modal-title').html('分类添加');
    $('#configModal').modal('show');
}

//绑定modal上的保存按钮
$('#saveButton').click(function () {
    var id = getSelectedRowWithoutAlert();
    var configName = $("#configName").val();
    var configValue;

    var configImg = $("#configImg")[0].src;

    if(configImg.indexOf('28089/upload') !== -1){
        configValue = configImg;
    }else{
        configValue = $("#configValue").val();
    }

    var url = '/admin/tbConfig/set';
    var data = {
        "id": id,
        "configName": configName,
        "configValue": configValue,
    };
    $.ajax({
        type: 'POST',//方法类型
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            if (result.code === 0) {
                $('#configModal').modal('hide');
                Swal.fire({
                    text: "保存成功",
                    icon: "success",iconColor:"#1d953f",
                });
                reload();
            } else {
                $('#configModal').modal('hide');
                Swal.fire({
                    text: result.message,
                    icon: "error",iconColor:"#f05b72",
                });
            }
        },
        error: function () {
            Swal.fire({
                text: "操作失败",
                icon: "error",iconColor:"#f05b72",
            });
        }
    });
});

function configEdit() {
    reset();
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    var rowData = $("#jqGrid").jqGrid("getRowData", id);
    $('.modal-title').html('配置编辑');
    $('#configModal').modal('show');
    $("#configId").val(id);
    $("#configName").val(rowData.configName);
    if(rowData.configValue.indexOf('28089/upload') !== -1){
        $("#configImg").val(rowData.configValue.substring(10,61));
    }else{
        $("#configValue").val(rowData.configValue);
    }
}

function reset() {
    $("#configName").val('');
    $("#configRank").val(0);
    $('#edit-error-msg').css("display", "none");
}