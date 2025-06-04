'use strict';
import BetApi from "./betapi";

class GameLogic {
    constructor(betApi:BetApi) {
        this.betApi = betApi
    }
    
    
    setRoomID(strRoomID) {
        this.roomID = strRoomID;
    }

    checkVersion(strVersion, callback) {
        const data = { version: strVersion };
        this.betServer.sendCommand(data, callback);
    }

    loginCertification(address, callback) {
        this.userID = address;
        const data = { mechanism: "plain", text: address };
        this.betServer.sendCommand(data, callback);
    }

    createRoom(strRoomID, nSB, nBB, nTimeout, nMaxPlayer, callback) {
        const data = {
            type: "iq",
            id: "createRoom",
            from: this.userID,
            to: strRoomID,
            action: "set",
            class: "room",
            room: { sb: nSB, bb: nBB, timeout: nTimeout, max: nMaxPlayer }
        };
        this.betServer.sendCommand(data, callback);
    }

    getRoomList(callback) {
        const data = {
            type: "iq",
            id: "getRoomList",
            from: this.userID,
            to: "",
            action: "get",
            class: "roomlist"
        };
        this.betServer.sendCommand(data, callback);
    }

    getRoomInfo(callback) {
        const data = {
            type: "iq",
            id: "getRoomInfo",
            from: this.userID,
            to: this.roomID,
            action: "get",
            class: "room"
        };
        this.betServer.sendCommand(data, callback);
    }

    getUserInfo(playerID, callback) {
        const data = {
            type: "iq",
            id: "getUserInfo",
            from: this.userID,
            to: playerID,
            action: "get",
            class: "occupant"
        };
        this.betServer.sendCommand(data, callback);
    }

    enterRoom(callback, roomID, chipAmount) {
        if (roomID !== undefined) {
            this.roomID = roomID;
        }
        const data = {
            type: "presence",
            id: "enterRoom",
            from: this.userID,
            to: this.roomID,
            action: "join",
            chips: chipAmount
        };
        this.betServer.sendCommand(data, callback);
    }

    leaveRoom(callback) {
        const data = {
            type: "presence",
            id: "leaveRoom",
            from: this.userID,
            to: this.roomID,
            action: "gone"
        };
        this.betServer.sendCommand(data, callback);
    }

    betFold(callback) {
        this.bet("-1", callback);
    }

    betCheck(callback) {
        this.bet("0", callback);
    }

    bet(number, callback) {
        const data = {
            type: "presence",
            id: "bet",
            from: this.userID,
            to: this.roomID,
            action: "bet",
            class: number + ""
        };
        this.betServer.sendCommand(data, callback);
    }

    getRoomWholeStatus(callback) {
        const data = {
            type: "iq",
            id: "getRoomWholeStatus",
            from: this.userID,
            to: this.roomID,
            action: "get",
            class: "state"
        };
        this.betServer.sendCommand(data, callback);
    }
}

export default GameLogic;