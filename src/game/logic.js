

function callbackOpen(data) {
    console.log("callbackOpen " + data);
}

function callbackClose(data) {
    console.log("callbackClose " + data);
    this.loginCertification = false;

    this._disconnectReset();
}

function callbackMessage(data) {
    if (!this.createDone){
        return
    }
    if (this.loginCertification && !this.initRoomDone && !(data.action == "state" && data.type=="presence")){
        return
    }
    // console.log("callbackMessage " + JSON.stringify(data));
    if(data.version && data.version == this.strVersion) {
        var authToken = gParam.user_name;

        if (this.appToken != undefined ) {
            authToken = this.appToken
        };

        this.betApi.loginCertification(authToken, function(isOK){
            console.log("loginCertification is " +  isOK);
            //alert("loginCertification is" +  isOK);
        });
    }
    else if(!this.loginCertification) // loginCertification result
    {
        if(data.id) {
            this.userID = data.id;
            this.userName = data.name;
            this.betApi.setUserID(this.userID);
            this.loginCertification = true;

            this._currentPlayButtonUpdate(false)
            // console.log("gParam:", JSON.stringify(gParam))

            // if(gParam.joinroom != undefined && gParam.joinroom != null) {
            //     this.roomID = gParam.joinroom
            //     console.log("enter room:", this.rootID);
            //     this.betApi.enterRoom(function(isOK){
            //         console.log("enterRoom is " +  isOK);
            //     }, this.roomID);
            //
            // } else {
            console.log("enter random room:");
            this.betApi.enterRoom(function(isOK){
                console.log("enterRoom is " +  isOK);
            }, this.roomID,this.chipAmount);
            // }
        }
    }
    else if(data.type == "iq")
    {
        if(data.class == "room")       //查询游戏房间列表
        {
            this.handleCreateRoom(data);
        }
    }
    else if(data.type == "message") {
    }
    else if(data.type == "presence") {
        // console.log("presence data",JSON.stringify(data))
        if(data.action == "active")         //服务器广播进入房间的玩家
        {
        }
        else if(data.action == "gone")      //服务器广播离开房间的玩家
        {
            this.handleGone(data)
        }
        else if(data.action == "join")      //服务器通报加入游戏的玩家
        {
            this.handleJoin(data);
        }
        else if(data.action == "button")    //服务器通报本局庄家
        {
            this.handleButton(data);
        }
        else if(data.action == "preflop")   //服务器通报发牌
        {
            this.handlePreflop(data);
        }
        else if(data.action == "flop")   //发牌
        {
            this.handleFlop(data);
        }
        else if(data.action == "turn")   //发牌
        {
            this.handleTurn(data);
        }
        else if(data.action == "river")   //发牌
        {
            this.handleRiver(data);
        }
        else if(data.action == "pot")       //服务器通报奖池
        {
            this.handlePot(data)
        }
        else if(data.action == "action")    //服务器通报当前下注玩家
        {
            this.handleAction(data);

        }
        else if(data.action == "bet")       //服务器通报玩家下注结果
        {
            this.handleBet(data);

        }
        else if(data.action == "showdown")  //服务器通报摊牌和比牌
        {
            this.handleShowDown(data);
        }
        else if(data.action == "state")  {//服务器通报房间信息
            this.handleState(data);
            this.initRoomDone = true;
        }
    }
}

function callbackError(data) {
    console.log("callbackError" + data);
}

export  {callbackError,callbackOpen,callbackClose,callbackMessage}