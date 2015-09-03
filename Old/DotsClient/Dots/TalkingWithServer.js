function TimerCount() {
    var timers = $(".time-left");

    for (var i = 0; i < timers.length; i++) {
        var time = parseInt($(timers[i]).text());
        time--;
        $(timers[i]).text(time);
    }
    setTimeout(TimerCount, 1000);
}

function timeOut() {
    setTimeout(TimerCount, 1000);
}

timeOut();


$(function () {
    // Create the connection to our SignalR-powered Chat Hub on the server.
    $.connection.hub.url = "http://boyanzhelyazkov.com/signalr";
    var signalRChatHub = $.connection.chatHub;

    $("a[href='#schedule']").click(function () {
        signalRChatHub.server.getTurnament("0", device.uuid);
    });

    $("a[href='#sitAndGo']").click(function () {
        signalRChatHub.server.getTurnament("1", device.uuid);

    });

    $("a[href='#free']").click(function () {
        debugger;
        signalRChatHub.server.getTurnament("2", device.uuid);

    });

    $('#login').click(function () {
        // Call Server method.
        $.connection.hub.qs = { deviceId: device.uuid };
        signalRChatHub.server.loginUserToLobby(device.uuid, $('#username').val(), userWebClientId);
        $("#loginName").val($('#username').val());
        $('#username').val("");
        $(".tab-content").show();
        $(".nav-tabs").show();

        $("#loginform").hide();
    });

    signalRChatHub.client.broadcastUsers = function (name, message) {

        var className = 'u' + name + '-' + message;
        var myDeviceId = device.uuid;
        if ($('.' + className).length == 0 && myDeviceId != name) {
            $("#lobbyUsers").find(".className").remove();
            $('#lobbyUsers').append('<li class="' + className + '" > User: ' + message + '<p class="invite btn btn-success" style="margin-left:12px;" user-id="' + name + '">Invite</li>');
        }
    };

    signalRChatHub.client.clearCurrentTurnamentsTab = function (tabToClear) {
        //TODO Clear Tab
        $("#"+tabToClear).html("");
    };

    signalRChatHub.client.showTurnament = function (turnament, tabToClear, registered) {

    
        //TODO Show Turnaments
        var innerHtml = "<div class='turnament' turnamentId = '" + turnament.Id + "'>" + "<p class='name'>" + turnament.Name+"</p>";
        
         
        if (turnament.isSeatAndGo == 1) {
            turnament.StartTime = turnament.StartTime.split('T')[0];
            innerHtml += "<p class='time'>"+turnament.StartTime+" </p>";
        }


        innerHtml += "<p class='colTur colTurLeft'>"
        innerHtml += "<span class='cost'> $" + turnament.EntryCost + "</span>+";
        innerHtml += "<span class='taxes'>" + turnament.Taxes + "</span>" ;

        innerHtml += "<p class='colTur glyphicon glyphicon-user'>";
        innerHtml += "<span class='taken'>" + turnament.TakenSeats + "</span>/";
        innerHtml += "<span class='seats'>" + turnament.Seats + "</span>";
        innerHtml += "</p>";
        // if (turnament.isSeatAndGo == true) {
            innerHtml += "<button type='button' class='reg btn btn-success'";
            if (registered == true) {
                innerHtml += 'style="display:none"';
            }
            innerHtml += ">Register</button>";
     
            innerHtml += "<button type='button' class='unreg btn btn-danger'";
            if (registered == false) {
                innerHtml += 'style="display:none"';
            }
            innerHtml +=  ">UnRegister</button>";
        
        // }

        innerHtml += "<div class='clear'></div>";
        innerHtml += "</div>";

        
        $("#"+tabToClear).append(innerHtml);
    };

    signalRChatHub.client.alertTurnament = function (turnament) {

        //TODO Show Turnaments
        debugger;
        alert(turnament.Id + " Name: " + turnament.Name + " Seats: " + turnament.Seats + " SitAndGo:" + turnament.IsSeatAndGo);
    };

    signalRChatHub.client.registrationStatus = function (turnamentId, status) {
        debugger;
        if (status == true) {
            $(".turnament[turnamentId='" + turnamentId + "'").find(".unreg").show();
            $(".turnament[turnamentId='" + turnamentId + "'").find(".reg").hide();
        }
        else if (status == false) {
            $(".turnament[turnamentId='" + turnamentId + "'").find(".reg").show();
            $(".turnament[turnamentId='" + turnamentId + "'").find(".unreg").hide();
        }

    };

    signalRChatHub.client.turnamentStatus = function (turnamentId, freeSeats) {
        var seats = $(".turnament[turnamentId='" + turnamentId + "'").find(".seats").text();
        if (seats == freeSeats) {
            $(".turnament[turnamentId='" + turnamentId + "'").hide();
        } 
        $(".turnament[turnamentId='" + turnamentId + "'").find(".taken").html(freeSeats);
    };


    $(document).on("click", '.reg', function () {
        // Call Server method.
        var myId = device.uuid;
        var turnamentId = $(this).parent().attr("turnamentId");

        signalRChatHub.server.registerTurnament(turnamentId, myId);

    });

    $(document).on("click", '.unreg', function () {
        // Call Server method.
        var myId = device.uuid;
        var turnamentId = $(this).parent().attr("turnamentId");
        debugger;
        signalRChatHub.server.unRegisterTurnament(turnamentId, myId);

    });

    $(document).on("click", '.invite', function () {
        // Call Server method.
        var myId = device.uuid;
        var invitedUserId = $(this).attr("user-id");
        var rows = $("#tb-rows").val();
        var cols = $("#tb-cols").val();

        signalRChatHub.server.inviteUser(myId, invitedUserId, rows, cols);

    });

    signalRChatHub.client.inviteUser = function (myId, invitedUserId, rows, cols) {
        var deviceId = device.uuid
        if (device.uuid == invitedUserId) {
            var textInfo = "User:" + myId + ' invite you to play on table with ' + rows + ' rows and' + cols + ' cols.';
            $("#inviteUserDiv").find(".info").text(textInfo);
            $("#inviteUserDiv").attr("inviteMeUser", invitedUserId);
            $("#inviteUserDiv").attr("myId", myId);
            $("#inviteUserDiv").attr("rows", rows);
            $("#inviteUserDiv").attr("cols", cols);
            $("#inviteUserDiv").show();
        }
    };

    $(document).on("click", '.accept', function () {
        var invitedUserId = $("#inviteUserDiv").attr("inviteMeUser");
        var myId = $("#inviteUserDiv").attr("myId");
        var rows = $("#inviteUserDiv").attr("rows");
        var cols = $("#inviteUserDiv").attr("cols");

        signalRChatHub.server.acceptUserInvite(myId, invitedUserId, rows, cols, -1);
    });


    signalRChatHub.client.inviteUser = function (myId, invitedUserId, rows, cols) {
        var deviceId = device.uuid
        if (device.uuid == invitedUserId) {
            var textInfo = "User:" + myId + ' invite you to play on table with ' + rows + ' rows and' + cols + ' cols.';
            $("#inviteUserDiv").find(".info").text(textInfo);
            $("#inviteUserDiv").attr("inviteMeUser", invitedUserId);
            $("#inviteUserDiv").attr("myId", myId);
            $("#inviteUserDiv").attr("rows", rows);
            $("#inviteUserDiv").attr("cols", cols);
            $("#inviteUserDiv").show();
        }
    };


    signalRChatHub.client.acceptInvite = function (myId, invitedUserId, rows, cols, tableId) {
        var deviceId = device.uuid
        if (myId == deviceId || invitedUserId == deviceId) {

            buildTable(rows, cols, tableId, myId, invitedUserId);
            $("#inviteUserDiv").hide();
        }
    };

    signalRChatHub.client.allertAMessage = function (myId, invitedUserId, message) {
        var deviceId = device.uuid
        if (myId == deviceId || invitedUserId == deviceId) {
            alert(message);
        }
    };


    signalRChatHub.client.allertAMessageOnly = function (message) {
        alert(message);

    };


    signalRChatHub.client.userClientId = function (message) {
        //alert(message);
        userWebClientId = message;
    };

    $(document).on("click", '.line', function () {
        var lineId = $(this).attr("data-id");
        var table = $(this).parent();
        var tableId = $(table).attr("tbl");
        tableId = tableId.split('-')[1];
        var myId = $(table).attr("me");
        var oponent = $(table).attr("oponent");

        var myDevice = device.uuid;
        if (myDevice != myId) {

            oponent = myId;
            myId = myDevice;
        }

        signalRChatHub.server.makeMove(myId, oponent, tableId, lineId);
    });

    signalRChatHub.client.drawLine = function (myId, invitedUserId, tableId, lineId) {
        var deviceId = device.uuid
        if (myId == deviceId) {

            tableId = "table-" + tableId;
            drawLine1(tableId, lineId);

            $("a[aria-controls=" + tableId + "]").css("background", "white");
            $("a[aria-controls=" + tableId + "]").css("color", "black");
            $("a[aria-controls=" + tableId + "]").find(".time-left").hide();
        }
        else if (invitedUserId == deviceId) {
            tableId = "table-" + tableId;
            drawLine1(tableId, lineId);

            $("a[aria-controls=" + tableId + "]").css("background", "green");
            $("a[aria-controls=" + tableId + "]").css("color", "white");
            $("a[aria-controls=" + tableId + "]").css("text-weight", "bold");
            $("a[aria-controls=" + tableId + "]").find(".time-left").text("30");
            $("a[aria-controls=" + tableId + "]").find(".time-left").show();

        }
    };

    signalRChatHub.client.colorBox = function (myId, invitedUserId, tableId, boxId) {
        var deviceId = device.uuid
        if (myId == deviceId) {

            tableId = "table-" + tableId;
            colorBox(tableId, boxId,"purple");

        }
        else if (invitedUserId == deviceId) {
            tableId = "table-" + tableId;
            colorBox(tableId, boxId, "green");

        }
    };

    function colorBox(tableId, boxId, color) {
        tableId = tableId.split('-')[1];
        var id = tableId + '-' + boxId;
        $("div[boxId='" + id + "'").css("background", color);
        $("div[boxId='" + id + "'").css("opacity", 1);
    }

    function drawLine1(tbl, id) {
        var tbl = tbl.split('-')[1];
        var lineId = tbl + "-" + id;
        $(".line[lineId='" + lineId + "'").css("background", "black");
        $(".line[lineId='" + lineId + "'").css("opacity", 1);
    }



    signalRChatHub.client.oponentOnTurn = function (myId) {
        var deviceId = device.uuid
        if (myId == deviceId) {
            alert("oponent on turn");
        }
    };



    // Click event-handler for broadcasting chat messages.
    $('#broadcast').click(function () {
        // Call Server method.
        signalRChatHub.server.send(device.uuid, $('#message').val());
        $('#message').val("");
    });

    // Start the SignalR Hub.
    $.connection.hub.start();

    // Click event-handler for clearing chat messages.
    $('#clear').click(function () {
        $('ul li').remove();
    });
});


