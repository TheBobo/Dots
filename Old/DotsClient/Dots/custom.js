$(document).ready(function () {

    windowWidth = $(document).width();
    windowWidth = windowWidth - 10;

    $(".table").css("width", windowWidth);
    $(".table").css("margin-left", 5);

    if (windowWidth < 767) {
        $("#rows").css("width", "100%");
        $("#cols").css("width", "100%");
        $("#create").css("width", "100%");

    }

    $(document).on("click", "#create", function () {
        var rows = parseInt($("#rows").val());
        var cols = parseInt($("#cols").val());


        buildTable(rows, cols, tableId, me, oponent);

    });

    //$(document).on("click", ".line", function () {
    //    var tableId = $(this).parent().attr("tbl");
    //    var lineId = $(this).attr("data-id");
    //    
    //    $(".tbl[tbl='" + tableId + "'").find(".line[data-id='"+lineId+"'")
    //    $(".tbl[tbl='" + tableId + "'").find(".line[data-id='" + lineId + "'").css("opacity", 1);
    //    $(".tbl[tbl='" + tableId + "'").find(".line[data-id='" + lineId + "'").attr("data-isSelected", 1);
    //    if (!CloseBox(this)) {
    //        if (player == player1) {
    //            player = player2;
    //        }
    //        else {
    //            player = player1;
    //        }
    //    }

    //});
});

var math = {
    add: function addTwoNumbers(a, b) {
        return a + b;
    },

    substract: function substractTwoNumbers(a, b) {
        return a - b;
    },

    product: function productTwoNumbers(a, b) {
        return a * b;
    },

    devide: function devideTwoNumbers(a, b) {
        return a / b;
    }


};

var tbRow = 0, tbCol = 0, player1 = "#44aa66", player2 = "#440066", player = player1;
var windowWidth = 400;

function buildTable(row, col, tableId, me, oponent) {

    tbRow = row;
    tbCol = col;

    var objWidth = (windowWidth - (3 * row)) / row;
    var width5percent = windowWidth / 100 * 5;
    //$("#createTableForm").hide();
    var date = new Date().getTime()
    var result = "<div class='tbl table-" + tableId + "' tbl='table-" + tableId + "' me='" + me + "' oponent='" + oponent + "'>";
    for (var i = 0; i < 2 * row + 1; i++) {
        for (var j = 0; j < 2 * col + 1; j++) {


            if (i % 2 == 0 && j % 2 == 0) {
                var left = (parseInt(j / 2) * objWidth);
                var top = (parseInt(i / 2) * objWidth);
                result += "<div class='dot' style='border-radius:" + objWidth + "px; width: " + width5percent + "px; height:" + width5percent + "px; left: " + left + "px; top:" + top + "px;' data-i='" + i + "' data-j='" + j + "'></div>"
            }
            else if (i % 2 == 1 && j % 2 == 0) {

                var left = (parseInt(j / 2) * objWidth);
                var top = (parseInt(i / 2) * objWidth) + 3;
                var lineId = tableId + "-" + i + "-" + j + "-0";
                result += "<div class='line vertical' style='border-radius:" + objWidth + "px; height:" + (objWidth + width5percent) + "px; width:" + width5percent + "px; left: " + left + "px; top:" + (top - 3) + "px;' data-i='" + i + "' data-j='" + j + "' data-isHorizontal='0' data-isSelected='0' data-id='" + i + "-" + j + "-0' lineId = '" + lineId + "'></div>";
            }
            else if (i % 2 == 0 && j % 2 == 1) {
                var left = (parseInt(j / 2) * objWidth) + 3;
                var top = (parseInt(i / 2) * objWidth);
                var lineId = tableId + "-" + i + "-" + j + "-0";
                result += "<div class='line horizontal' style='border-radius:" + objWidth + "px; width:" + (objWidth + width5percent) + "px; height:" + width5percent + "px; left: " + (left - 3) + "px; top:" + top + "px;' data-i='" + i + "' data-j='" + j + "' data-isHorizontal='1' data-isSelected='0' data-id='" + i + "-" + j + "-0' lineId = '" + lineId + "'></div>";
            }
            else if (i % 2 == 1 && j % 2 == 1) {
                var left = (parseInt(j / 2) * objWidth) + width5percent;
                var top = (parseInt(i / 2) * objWidth) + width5percent;
                var boxId = tableId + "-" + i + "-" + j;
                result += "<div class='box ' style='width:" + (objWidth - width5percent - 2) + "px; height:" + (objWidth - width5percent - 2) + "px; left: " + (left) + "px; top:" + (top) + "px;' data-i='" + i + "+' data-j='" + j + "' data-id='" + i + "_" + j + "' boxId='" + boxId + "'></div>"
            }
        }
    }
    result += "<div class='clear'></div></div>"
    var tableN = $(".nav-table").find("li").length;

    $(".nav-table").append('<li role="presentation"><a href="#table-' + tableId + '" aria-controls="table-' + tableId + '" role="tab" data-toggle="tab">Table ' + tableN + ' <span class="time-left"></span></a></li>');
    $(".tbls-content").append('<div role="tabpanel" class="tab-pane active" id="table-' + tableId + '">')
    var idTable = '#table-' + tableId;
    $(idTable).html(result);
    ClickOn("nav-tabs", "#profile")
    ClickOn("nav-table", idTable)
}

function ClickOn(ulclass, id) {
    $("." + ulclass).find("li").removeClass("active");
    $("." + ulclass).find("li").find("a[href='"+id+"']").parent().addClass("active");
    $("." + ulclass + "+ div").find(".tab-pane").removeClass("active");
    $("." + ulclass + "+ div").find(id).addClass("active");
};


function drawLine(tbl, id) {
    //var line = $(".tbl[tbl='" + tbl + "'").find(".line[data-id='" + id + "'");
    //var tableId = $(line).parent().attr("tbl");
    //var lineId = $(line).attr("data-id");
    
    var tbl = tbl.split('-')[1];
    var lineId = tbl + "-" + id;
    $(".line[lineId='" + lineId + "'").css("background", "black");
    $(".line[lineId='" + lineId + "'").css("opacity", 1);
    $(".line[lineId='" + lineId + "'").attr("data-isSelected", 1);

    //$(".tbl[tbl='" + tableId + "'").find(".line[data-id='" + lineId + "'")
    //$(".tbl[tbl='" + tableId + "'").find(".line[data-id='" + lineId + "'").css("opacity", 1);
    //$(".tbl[tbl='" + tableId + "'").find(".line[data-id='" + lineId + "'").attr("data-isSelected", 1);

    //if (!CloseBox(line)) {
    //    if (player == player1) {
    //        player = player2;
    //    }
    //    else {
    //        player = player1;
    //    }
    //}

}

function CloseBox(item) {
    var row = parseInt($(item).attr("data-i"));
    var col = parseInt($(item).attr("data-j"));
    var isHorizontal = $(item).attr("data-isHorizontal");

    var table = $(item).parent();

    if (isHorizontal == 1) {
        if (row == 0) {
            var checkIdUp = (row + 2) + "-" + col + "-0";
            var checkIdLeft = (row + 1) + "-" + (col - 1) + "-0";
            var checkIdRight = (row + 1) + "-" + (col + 1) + "-0";
            if ($(table).find(".line[data-id=" + checkIdUp + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdLeft + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdRight + "]").attr("data-isSelected") == 1) {
                var checkIdColor = (row + 1) + "_" + (col);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("opacity", 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("background-color", player);
                return true;
            }
            return false;
        }
        else if (row == tbRow * 2 + 1) {
            var checkIdUp = (row - 2) + "-" + col + "-0";
            var checkIdLeft = (row - 1) + "-" + (col - 1) + "-0";
            var checkIdRight = (row - 1) + "-" + (col + 1) + "-0";
            if ($(table).find(".line[data-id=" + checkIdUp + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdLeft + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdRight + "]").attr("data-isSelected") == 1) {
                var checkIdColor = (row - 1) + "_" + (col);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("opacity", 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("background-color", player);
                return true;
            }
            return false;
        }
        else {
            var result = false;
            var checkIdUp = (row - 2) + "-" + col + "-0";
            var checkIdLeft = (row - 1) + "-" + (col - 1) + "-0";
            var checkIdRight = (row - 1) + "-" + (col + 1) + "-0";
            if ($(table).find(".line[data-id=" + checkIdUp + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdLeft + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdRight + "]").attr("data-isSelected") == 1) {
                var checkIdColor = (row - 1) + "_" + (col);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("opacity", 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("background-color", player);
                result = true;
            }

            checkIdUp = (row + 2) + "-" + col + "-0";
            checkIdLeft = (row + 1) + "-" + (col - 1) + "-0";
            checkIdRight = (row + 1) + "-" + (col + 1) + "-0";
            if ($(table).find(".line[data-id=" + checkIdUp + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdLeft + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdRight + "]").attr("data-isSelected") == 1) {
                var checkIdColor = (row + 1) + "_" + (col);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("opacity", 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("background-color", player);
                result = true;
            }
           
            return result;

        }
    }
    else {
        if (col == 0) {
            var checkIdUp = (row) + "-" + (col + 2) + "-0";
            var checkIdLeft = (row - 1) + "-" + (col + 1) + "-0";
            var checkIdRight = (row + 1) + "-" + (col + 1) + "-0";
            if ($(table).find(".line[data-id=" + checkIdUp + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdLeft + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdRight + "]").attr("data-isSelected") == 1) {
                var checkIdColor = (row) + "_" + (col + 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("opacity", 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("background-color", player);
                return true;
            }
            return false;
        }
        else if (col == tbCol * 2 + 1) {
            var checkIdUp = (row) + "-" + (col - 2) + "-0";
            var checkIdLeft = (row - 1) + "-" + (col - 1) + "-0";
            var checkIdRight = (row + 1) + "-" + (col - 1) + "-0";
            if ($(table).find(".line[data-id=" + checkIdUp + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdLeft + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdRight + "]").attr("data-isSelected") == 1) {
                var checkIdColor = (row) + "_" + (col - 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("opacity", 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("background-color", player);
                return true;
            }
            return false;
        }
        else {
            var result = false;
            var checkIdUp = (row) + "-" + (col - 2) + "-0";
            var checkIdLeft = (row - 1) + "-" + (col - 1) + "-0";
            var checkIdRight = (row + 1) + "-" + (col - 1) + "-0";
            if ($(table).find(".line[data-id=" + checkIdUp + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdLeft + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdRight + "]").attr("data-isSelected") == 1) {
                var checkIdColor = (row) + "_" + (col - 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("opacity", 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("background-color", player);

                result = true;
            }

            var checkIdUp = (row) + "-" + (col + 2) + "-0";
            var checkIdLeft = (row - 1) + "-" + (col + 1) + "-0";
            var checkIdRight = (row + 1) + "-" + (col + 1) + "-0";
            if ($(table).find(".line[data-id=" + checkIdUp + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdLeft + "]").attr("data-isSelected") == 1 &&
               $(table).find(".line[data-id=" + checkIdRight + "]").attr("data-isSelected") == 1) {
                var checkIdColor = (row) + "_" + (col + 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("opacity", 1);
                $(table).find(".box[data-id=" + checkIdColor + "]").css("background-color", player);
                result = true;
            }
            return result;

        }
    }
}
