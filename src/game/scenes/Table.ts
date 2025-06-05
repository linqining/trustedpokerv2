
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab";
import UserPrefab from "../prefabs/UserPrefab";
/* START-USER-IMPORTS */
// import Server from "../server.js";
import BetApi from "../betApi.js";
import {callbackOpen,callbackClose,callbackMessage,callbackError} from "../logic.js";
import {EventBus} from "../EventBus.ts";
import {reconnect} from "../../api/api";
import {Room, StateData} from "../types/types.ts";
import {GameState} from "../types/game_state.ts"
import {User, UserImpl} from "../types/user.ts";
/* END-USER-IMPORTS */

export default class Table extends Phaser.Scene {

	constructor() {
		super("Table");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// texas_bg
		const texas_bg = new BackgroundPrefab(this, 0, 0);
		this.add.existing(texas_bg);
		texas_bg.name = "texas_bg";

		// user1
		const user1 = new UserPrefab(this, 553, 516);
		this.add.existing(user1);
		user1.name = "user1";
		user1.scaleX = 0.5;
		user1.scaleY = 0.5;
		user1.visible = true;

		// user2
		const user2 = new UserPrefab(this, 176, 463);
		this.add.existing(user2);
		user2.name = "user2";
		user2.scaleX = 0.5;
		user2.scaleY = 0.5;
		user2.visible = false;

		// user9
		const user9 = new UserPrefab(this, 931, 471);
		this.add.existing(user9);
		user9.name = "user9";
		user9.scaleX = 0.5;
		user9.scaleY = 0.5;
		user9.visible = false;

		// user3
		const user3 = new UserPrefab(this, 81, 300);
		this.add.existing(user3);
		user3.name = "user3";
		user3.scaleX = 0.5;
		user3.scaleY = 0.5;
		user3.visible = false;

		// user8
		const user8 = new UserPrefab(this, 1047, 290);
		this.add.existing(user8);
		user8.name = "user8";
		user8.scaleX = 0.5;
		user8.scaleY = 0.5;
		user8.visible = false;

		// user5
		const user5 = new UserPrefab(this, 388, 35);
		this.add.existing(user5);
		user5.name = "user5";
		user5.scaleX = 0.5;
		user5.scaleY = 0.5;
		user5.visible = false;

		// user6
		const user6 = new UserPrefab(this, 745, 27);
		this.add.existing(user6);
		user6.name = "user6";
		user6.scaleX = 0.5;
		user6.scaleY = 0.5;
		user6.visible = false;

		// user4
		const user4 = new UserPrefab(this, 139, 113);
		this.add.existing(user4);
		user4.name = "user4";
		user4.scaleX = 0.5;
		user4.scaleY = 0.5;
		user4.visible = false;

		// user7
		const user7 = new UserPrefab(this, 987, 116);
		this.add.existing(user7);
		user7.name = "user7";
		user7.scaleX = 0.5;
		user7.scaleY = 0.5;
		user7.visible = false;

		// op_btn_check
		const op_btn_check = this.add.container(969, 638);
		op_btn_check.name = "op_btn_check";

		// button_check
		const button_check = this.add.image(65.14567187550324, 22.269595152564364, "button_green");
		button_check.name = "button_check";
		button_check.scaleX = 0.15758130827137293;
		button_check.scaleY = 0.15758130827137293;
		op_btn_check.add(button_check);

		// check_text
		const check_text = this.add.text(16, 6, "", {});
		check_text.name = "check_text";
		check_text.text = "Check";
		check_text.setStyle({ "fontSize": "32px" });
		op_btn_check.add(check_text);

		// op_btn_fold
		const op_btn_fold = this.add.container(818, 639);
		op_btn_fold.name = "op_btn_fold";

		// button_fold_1
		const button_fold_1 = this.add.image(62.812552081710464, 20.799078357486906, "button_red");
		button_fold_1.name = "button_fold_1";
		button_fold_1.scaleX = 0.15758130827137293;
		button_fold_1.scaleY = 0.15758130827137293;
		op_btn_fold.add(button_fold_1);

		// fold_text
		const fold_text = this.add.text(24.812552081710464, 3.7990783574869056, "", {});
		fold_text.name = "fold_text";
		fold_text.text = "Fold";
		fold_text.setStyle({ "fontSize": "32px" });
		op_btn_fold.add(fold_text);

		// op_btn_raise
		const op_btn_raise = this.add.container(1122, 639);
		op_btn_raise.name = "op_btn_raise";

		// button_raise
		const button_raise = this.add.image(65.14567187550324, 22.269595152564364, "button_yellow");
		button_raise.name = "button_raise";
		button_raise.scaleX = 0.15758130827137293;
		button_raise.scaleY = 0.15758130827137293;
		op_btn_raise.add(button_raise);

		// raise_text
		const raise_text = this.add.text(16, 6, "", {});
		raise_text.name = "raise_text";
		raise_text.text = "Raise";
		raise_text.setStyle({ "fontSize": "32px" });
		op_btn_raise.add(raise_text);

		// slider
		const slider = this.add.container(509, 652);
		slider.name = "slider";

		// slider_empty
		const slider_empty = this.add.image(141.0321179395704, 12.065463195636198, "slider_empty");
		slider_empty.scaleX = 0.5;
		slider_empty.scaleY = 0.5;
		slider.add(slider_empty);

		// slider_full
		const slider_full = this.add.image(140.0321179395704, 15.065463195636198, "slider_full");
		slider_full.scaleX = 0.5;
		slider_full.scaleY = 0.5;
		slider_full.setOrigin(0.5, 1);
		slider.add(slider_full);

		// value_box
		const value_box = this.add.image(-132, 12, "value_box");
		value_box.scaleX = 0.3814860714180076;
		value_box.scaleY = 0.2727097091463893;
		slider.add(value_box);

		// slider_arrow
		const slider_arrow = this.add.image(18, -5, "slider_arrow");
		slider_arrow.scaleX = 0.15557376061488526;
		slider_arrow.scaleY = 0.15557376061488526;
		slider.add(slider_arrow);

		// op_buy_in
		const op_buy_in = this.add.container(554, 305);
		op_buy_in.name = "op_buy_in";

		// buyin_btn
		const buyin_btn = this.add.image(65.14567187550324, 22.269595152564364, "button_yellow");
		buyin_btn.name = "buyin_btn";
		buyin_btn.scaleX = 0.15758130827137293;
		buyin_btn.scaleY = 0.15758130827137293;
		op_buy_in.add(buyin_btn);

		// buyin_text
		const buyin_text = this.add.text(16, 3, "", {});
		buyin_text.name = "buyin_text";
		buyin_text.text = "BuyIn";
		buyin_text.setStyle({ "fontSize": "32px" });
		op_buy_in.add(buyin_text);

		// bb_text
		const bb_text = this.add.text(640, 189, "", {});
		bb_text.name = "bb_text";
		bb_text.setOrigin(0.5, 0.5);
		bb_text.setStyle({ "color": "#000000ff", "fontSize": "21px", "stroke": "#000000ff" });

		// public_card_container
		const public_card_container = this.add.container(644, 331);
		public_card_container.name = "public_card_container";
		public_card_container.visible = false;

		// public_card_1
		const public_card_1 = this.add.image(-177.18549263145178, -0.23896370084037244, "card_back_0");
		public_card_1.name = "public_card_1";
		public_card_1.scaleX = 0.15041695188999193;
		public_card_1.scaleY = 0.15041695188999193;
		public_card_container.add(public_card_1);

		// public_card_2
		const public_card_2 = this.add.image(-89.18549263145178, -0.23896370084037244, "card_back_0");
		public_card_2.name = "public_card_2";
		public_card_2.scaleX = 0.15041695188999193;
		public_card_2.scaleY = 0.15041695188999193;
		public_card_container.add(public_card_2);

		// public_card_3
		const public_card_3 = this.add.image(-1.1854926314517797, -0.23896370084037244, "card_back_0");
		public_card_3.name = "public_card_3";
		public_card_3.scaleX = 0.15041695188999193;
		public_card_3.scaleY = 0.15041695188999193;
		public_card_container.add(public_card_3);

		// public_card_4
		const public_card_4 = this.add.image(86.81450736854822, -0.23896370084037244, "card_back_0");
		public_card_4.name = "public_card_4";
		public_card_4.scaleX = 0.15041695188999193;
		public_card_4.scaleY = 0.15041695188999193;
		public_card_container.add(public_card_4);

		// public_card_5
		const public_card_5 = this.add.image(174.81450736854822, -0.23896370084037244, "card_back_0");
		public_card_5.name = "public_card_5";
		public_card_5.scaleX = 0.15041695188999193;
		public_card_5.scaleY = 0.15041695188999193;
		public_card_container.add(public_card_5);

		// chip_pool_text
		const chip_pool_text = this.add.text(640, 207, "", {});
		chip_pool_text.name = "chip_pool_text";
		chip_pool_text.setOrigin(0.5, 0.5);
		chip_pool_text.setStyle({ "color": "#000000ff", "fontSize": "21px", "stroke": "#000000ff" });

		// lists
		const public_card_list: Array<any> = [];

		this.public_card_list = public_card_list;

		this.events.emit("scene-awake");
	}

	private public_card_list!: Array<any>;

	/* START-USER-CODE */

	// Write your code here
    private  betApi:BetApi;
    private gameState:GameState = new GameStateInstance(this.game);

    preload(){
        // const gImageDir = 'assets_poker/2x/';
        // this.load.image('gamecenterbackground', gImageDir+'background.png')
        // this.load.image('playerBK', 'assets_guopai/Desktop/player_frame.png')
        // this.load.image('userBK', gImageDir+'player-guest.png')
        // this.load.image('blankBK', gImageDir+'player-blank.png')
        // this.load.image('winBK', gImageDir+'win-frame-bg.png')
        // this.load.image('winBKFrame', gImageDir+'win-frame.png')
        // this.load.image('buttonblue', gImageDir+'btn-big-green.png')
        // this.load.image('buttongrey', gImageDir+'btn-big-green.png')
        // this.load.image('buttonyellow', gImageDir+'btn-big-blue.png')
        // this.load.image('fold_btn','assets_guopai/operate/fold.png')
        // this.load.image('call_btn','assets_guopai/operate/call.png')
        // this.load.image('raise_btn','assets_guopai/operate/raise.png')
        // this.load.image('animeCoins', gImageDir+'coin.png')
        // this.load.image('light', gImageDir+'roomLight.png')

        // var cardDir = "assets_guopai/cards/"

        // const cardImageName = [ "clubs", "diamonds","hearts","spades"];
        // const cardName = [  "C", "D","H","S"]; // 梅花，方块，红心，黑桃
        // const cardNumber = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K","A"];
        // for(let i = 0; i < cardImageName.length; i++) {
        //     for(let j = 0; j < cardNumber.length; j++) {
        //         this.load.image(cardName[i] +"_"+ cardNumber[j], "cards/"+cardName[i] +  "_" + cardNumber[j] + ".png")
        //     }
        // }

        // this.load.image("cardBK", 'assets_guopai/cards/CardBack.png')
        // this.load.image("chipPool", gImageDir+'chip-pool.png')
        // this.load.image("chip01", 'assets_guopai/Desktop/chips.png')
        // this.load.image("chip05", gImageDir+'texas_chip05.png')
        // this.load.image("chip1k", gImageDir+'texas_chip1k.png')
        // this.load.image("chip5k", gImageDir+'texas_chip5k.png')
        // this.load.image("chip10w", gImageDir+'texas_chip10w.png')
        // this.load.image("chip50w", gImageDir+'texas_chip50w.png')
        //
        // this.load.image("dcardBK", 'assets_guopai/cards/CardBack.png')
        // // this.load.image("dcardBK", gImageDir+'card_backs_rotate.png');
        //
        //
        // this.load.image("checkOn", gImageDir+'check-on.png')
        // this.load.image("checkOff", gImageDir+'check-off.png')
        // this.load.image("chipbox", gImageDir+'add-chips-box.png')
        // this.load.image("winLight", gImageDir+'light_dot.png')
        // this.load.image("groove", gImageDir+'sliderGroove.png')
        // this.load.image("slidebar", gImageDir+'slidebar.png');
        // this.load.image("btnslider", gImageDir+'btn-slider.png')
        // this.load.image("fillbox", gImageDir+'fill-box.png')
        // this.load.image("exitdoor", gImageDir+'btn-grey.png')
        // this.load.image("dealer", gImageDir+'dealer.png')
        // this.load.image("waitingRound", gImageDir+'win-frameWaiting.png')
        // this.load.image("card_typebg", gImageDir+'card_typebg.png')
        // this.load.image("defaultProfile", 'assets_guopai/Common/avatar.png')
        // this.load.image("buttonrules", gImageDir+'btn-rules.png')
        //
        // const soundDir = "assets_poker/sound/"
        // this.load.audio('sendcard', 'assets_guopai/audio/desk_new_card.wav')
        // this.load.audio('click', soundDir+'click.mp3')
        // this.load.audio('chipsmoving',soundDir+ 'chipsmoving.mp3')
        // this.load.audio('reordercard', soundDir+'reordercard.mp3')
        // this.load.audio('ding', soundDir+'ding.mp3')
        // this.load.audio('win', soundDir+'win.mp3')
        // this.load.audio('lost', soundDir+'lose.mp3')
    }


    init () {
        const userAccount = this.registry.get("current_account")
        if (!userAccount){
            this.scene.start('Preloader');
        }
        this.editorCreate();
        const tableScene = this;
        this.events.once("scene-awake",function () {
            tableScene.setGameObject();
        })
    }

	create() {
        // this.scene.start('Preloader');
        const api = this.betApi
        const userAccount = this.registry.get("current_account");
        this.betApi = new BetApi(function (data) {
            console.log("connect success",JSON.stringify(data))
            api.loginCertification(userAccount.address, function (authData){
                console.log("authdata",authData)
            });
        }, callbackClose, this.callbackMessage.bind(this), callbackError);
        this.betApi.setUserID(userAccount.address);
        this.gameState.setUserID(userAccount.address);
        this.betApi.connect();

        // this.testTexture();
        // return

        // 设置buyin组件的行为
        const buyInContainer = this.scene.scene.children.getByName("op_buy_in") as Phaser.GameObjects.Container;
        const buyInBtn = buyInContainer.getByName("buyin_btn") as Phaser.GameObjects.Image;
        buyInBtn.setInteractive().on('pointerdown', () => {
            console.log("buyin btn click")
            EventBus.emit('action_join_and_pay', this);
        })

        // let api = this.betApi

        EventBus.removeListener('action_join_and_pay_success');
        EventBus.on("action_join_and_pay_success",function (scene, gameid, chips) {
            console.log("action_join_and_pay_success",scene, gameid, chips);
            buyInContainer.visible = true; //todo open
            api.enterRoom(function (res) {
                console.log(res)
            },gameid, chips)
        })

        // 重连根据用户是否在房间设置对应信息
        // const userAccount = this.registry.get("current_account")
        reconnect(userAccount.address).then((res)=>{
            console.log("reconnect success",res.data)
            if (res.data.room_id){
                // buyInContainer.visible = false; //todo open

                this.betApi.enterRoom(function (res) {
                        console.log(res)
                },res.data.room_id, res.data.chips)
            }else{
                buyInContainer.visible = true;
                const user1 =this.scene.scene.children.getByName("user1") as Phaser.GameObjects.Container;
                user1.visible = false;
                console.log("reconnect hide user1",user1)


                const op_raise =this.scene.scene.children.getByName("op_btn_raise") as Phaser.GameObjects.Container;
                op_raise.visible = false;

                const op_fold =this.scene.scene.children.getByName("op_btn_fold") as Phaser.GameObjects.Container;
                op_fold.visible = false;

                const op_check =this.scene.scene.children.getByName("op_btn_check") as Phaser.GameObjects.Container;
                op_check.visible = false;

                const slider =this.scene.scene.children.getByName("slider") as Phaser.GameObjects.Container;
                slider.visible = false;
            }
        });
    }

    testTexture(){
        const user1 =this.scene.scene.children.getByName("user1") as Phaser.GameObjects.Container;
        user1.visible = true;
        const cardBackPrefab = user1.getByName("cardBackPrefab") as Phaser.GameObjects.Container;
        const card_and_strength = cardBackPrefab.getByName("card_and_strength") as Phaser.GameObjects.Container;
        const cards_container = card_and_strength.getByName("cards_container") as Phaser.GameObjects.Container;
        let cardOne = cards_container.getByName("card_back_1") as Phaser.GameObjects.Image;
        let cardTwo = cards_container.getByName("card_back_2") as Phaser.GameObjects.Image;
        let frame = this.textures.get("C_A");
        cardOne.setTexture(frame)
        cardTwo.setTexture(frame)

        console.log("reconnect hide user1",user1)
    }

    setGameObject() {
        const bbText =this.scene.scene.children.getByName("bb_text") as Phaser.GameObjects.Text;
        this.gameState.blindText = bbText;

        const publicCardContainer = this.scene.scene.children.getByName("public_card_container") as Phaser.GameObjects.Container;
        const publicCardOne = publicCardContainer.getByName("public_card_1") as Phaser.GameObjects.Image;
        const publicCardTwo = publicCardContainer.getByName("public_card_2") as Phaser.GameObjects.Image;
        const publicCardThree = publicCardContainer.getByName("public_card_3") as Phaser.GameObjects.Image;
        const publicCardFour = publicCardContainer.getByName("public_card_4") as Phaser.GameObjects.Image;
        const publicCardFive = publicCardContainer.getByName("public_card_5") as Phaser.GameObjects.Image;
        this.gameState.publicCards = [publicCardOne,publicCardTwo,publicCardThree,publicCardFour,publicCardFive]

        const chipPoolText =this.scene.scene.children.getByName("chip_pool_text") as Phaser.GameObjects.Text;
        this.gameState.chipPoolText = chipPoolText;
        for(let i = 0; i < 9; i++) {
            const userContainer = this.scene.scene.children.getByName("user" + (i + 1)) as Phaser.GameObjects.Container;
            const user = new UserImpl(userContainer,this);
            this.gameState.Users.push(user)
        }
    }

     callbackMessage(data) {
        console.log("callback message",JSON.stringify(data))
        if(data.type == "iq") {
            if(data.class == "room")       //查询游戏房间列表
            {
                this.handleCreateRoom(data);
            }
        } else if(data.type == "message"){
            console.log("message",JSON.stringify(data))
        } else if(data.type == "presence") {
            console.log("presence data",JSON.stringify(data))
            if(data.action == "active"){         //服务器广播进入房间的玩家
            }
            else if(data.action == "gone")      //服务器广播离开房间的玩家
            {
                this.handleGone(data)
            }
            else if(data.action == "join")      //服务器通报加入游戏的玩家
            {
                console.log("join data",JSON.stringify(data))
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
                console.log("handle state",this);
                this.handleState(data);
            }
        }
    }

    handleCreateRoom(data){
        console.log("todohandleCreateRoom")
    }
    handleGone(data){
        console.log("todohandlGone")
    }
    handleJoin(data){
        console.log("handlejoin todo")
    }
    handleButton(data){
        console.log("handlebutton")
    }
    handlePreflop(data){
        console.log("handlePreflop")
    }
    handleFlop(data){
        console.log("handlefolp")
    }
    handleTurn(data){
        console.log("handleturn")
    }
    handleRiver(data){
        console.log("handleriver")
    }
    handlePot(data){
        console.log("handlepot")
    }
    handleAction(data){

    }
    handleBet(data){

    }
    handleShowDown(data){

    }

    handleState(data:StateData){
        console.log("handle state",JSON.stringify(data));
        const roomInfo = data.room;

        this.gameState.InitRoom(roomInfo)

    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export class GameStateInstance implements GameState{
    userID:string;

    sb: number;
    bb: number;
    bet: number;
    roomID: string;
    timeout:number;
    buttonPos:number;
    publicCardArr:string[];
    // phaser 牌桌对象
    phaserGame:Phaser.Game;
    blindText:Phaser.GameObjects.Text;
    chipPoolText:Phaser.GameObjects.Text;
    publicCards:Phaser.GameObjects.Image[];
    Users : User[];
    constructor(game:Phaser.Game) {
        this.phaserGame = game
        this.Users = [];
    }

    InitRoom(roomInfo:Room){
        this.roomID = roomInfo.id
        this.bb = roomInfo.bb
        this.sb = roomInfo.sb
        this.timeout = roomInfo.timeout
        this.buttonPos = roomInfo.button;
        this.bet = roomInfo.bet;
        let publicCards = roomInfo.cards;
        if(!publicCards) {
            publicCards = [];
        }
        this.publicCardArr = publicCards;

        this.updateBlindText()
        this.initPublicCards()
        this.initChipPool(roomInfo)
        this.initOccupants(roomInfo);
    }

     formatElement(str:string) {
        return str.replace(/([CDHS])([2-9ATJQK])/g, '$1_$2');
    }

    initPublicCards(){
        for(let i = 0; i < this.publicCardArr.length; i++) {
            this.publicCards[i].visible = true;
            console.log("initpublic card",this.publicCardArr[i])
            const frame = this.phaserGame.textures.get(this.formatElement(this.publicCardArr[i]));
            this.publicCards[i].setTexture(this.formatElement(this.publicCardArr[i]));
            // this.publicCards[i].load.image(publicCards[i], this.publicCards[i].frame);
        }
        for(let i = this.publicCardArr.length; i < this.publicCards.length; i++) {
            if (this.publicCards[i].visible) {
                this.publicCards[i].visible = false;
                // // this.publicCards[i].load.image("cardBK", this.publicCards[i].frame);
                // const frame = this.phaserGame.textures.get("cardBK");
                // this.publicCards[i].setTexture(frame);
            }
        }
    }

    initChipPool(roomInfo:Room){
        //初始化筹码池
        let chipPoolCount = 0;
        if(!roomInfo.pot) {
            roomInfo.pot = []
        }
        for(let i = 0; i < roomInfo.pot.length; i++) {
            chipPoolCount += roomInfo.pot[i];
        }
        this.chipPoolText.setText(chipPoolCount+"");
    }

    initOccupants(roomInfo:Room){
        //初始化玩家
        let occupants = roomInfo.occupants;
        if (!occupants){
            occupants = [];
            return
        }
        // for (let i = 0; i < this.Users.length; i++) {
        //     let user = this.Users[i];
        //     user.setParam(null, null, "");
        // }
        //计算座位偏移量，以自己为5号桌计算
        // let isSendCard = true;
        let playerOffset = 0;
        let userIndex =0;
        for(let i = 0; i < occupants.length; i++) {
            const userInfo = occupants[i];
            if(userInfo && userInfo.id == this.userID) {
                userIndex = i
                playerOffset =  userInfo.index;
                break;
            }
        }
        for(let i = 0; i < occupants.length; i++) {
            const userInfo = occupants[i];
            if(!userInfo) {
                continue;
            }
            let index = userInfo.index - playerOffset;
            if(index >= this.Users.length) {
                index -= this.Users.length;
            } else if(index < 0) {
                index += this.Users.length;
            }
            const user = this.Users[index];
            if (user){
                user.initUser(userInfo,i==userIndex);
                user.User.visible = true; 
            }else{
                console.log("init no user",user)
            }

        }
    }

    updateBlindText(){
        this.blindText.setText("$" + this.sb + " / $" + this.bb);
    }

    setUserID(strUserID:string) {
        this.userID = strUserID;
    }
}