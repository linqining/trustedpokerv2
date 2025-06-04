'use strict';

const gParam = {
    ws_server: "localhost:8989/ws",
    user_name: "",
    joinroom: null,
    platform: "PC",
    app_token: null
};

class Server {
    constructor() {
        this.wsServer = 'ws://' + gParam.ws_server;
        this.websocket = null;
        this.isConnect = false;
        this.openCallback = null;
        this.closeCallback = null;
        this.messageCallback = null;
        this.errorCallback = null;
    }

    connect() {
        console.log("ready to connect ...");
        if (this.websocket && (this.websocket.readyState === 0 || this.websocket.readyState === 1)) {
            this.websocket.close();
        }

        this.isConnect = false;

        try {
            this.websocket = new WebSocket(this.wsServer);
        } catch (ex) {
            console.log(ex, "ERROR");
            return;
        }

        this.websocket.onopen = (evt) => this.onOpen(evt);
        this.websocket.onclose = (evt) => this.onClose(evt);
        this.websocket.onmessage = (evt) => this.onMessage(evt);
        this.websocket.onerror = (evt) => this.onError(evt);
    }

    registerCallback(openCallback, closeCallback, messageCallback, errorCallback) {
        this.openCallback = openCallback;
        this.closeCallback = closeCallback;
        this.messageCallback = messageCallback;
        this.errorCallback = errorCallback;
    }

    onOpen(evt) {
        console.log("Connected to WebSocket server.");
        this.isConnect = true;
        let data = {};

        if (evt.data) {
            try {
                data = JSON.parse(evt.data);
            } catch (e) {
                console.log(e);
            }
        }

        if (this.openCallback) {
            this.openCallback(data);
        }
    }

    onClose(evt) {
        console.log("Disconnected");
        let data = {};

        if (evt.data) {
            try {
                data = JSON.parse(evt.data);
            } catch (e) {
                console.log(e);
            }
        }

        if (this.closeCallback) {
            this.closeCallback(data);
        }
    }

    onMessage(evt) {
        console.log("onMessage server."+JSON.stringify(evt));
        console.log(evt)
        let data = {};

        if (evt.data) {
            try {
                data = JSON.parse(evt.data);
            } catch (e) {
                console.log(e);
            }
        }

        if (this.messageCallback) {
            this.messageCallback(data);
        }
    }

    onError(evt) {
        console.log('Error occured: ' + evt.data);
        let data = {};

        if (evt.data) {
            try {
                data = JSON.parse(evt.data);
            } catch (e) {
                console.log(e);
            }
        }

        if (this.errorCallback) {
            this.errorCallback(data);
        }
    }

    quit() {
        console.log("ready to disconnect");
        this.websocket.close(1000, "");
    }

    sendCommand(jsonData, callback) {
        let jsonStr = "";
        let isOK = true;

        if (jsonData) {
            try {
                jsonStr = JSON.stringify(jsonData);
            } catch (e) {
                console.log(e);
                isOK = false;
            }
        }

        console.log("send data:", jsonStr);

        try {
            this.websocket.send(jsonStr);
        } catch (e) {
            console.log(e);
            isOK = false;
        }

        if (callback) {
            callback(isOK);
        }
    }
}

export default Server;