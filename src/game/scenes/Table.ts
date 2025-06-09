
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab";
import UserPrefab from "../prefabs/UserPrefab";
import bet_coin from "../prefabs/bet_coin";
/* START-USER-IMPORTS */
// import Server from "../server.js";
import BetApi from "../betApi.js";
import {callbackOpen,callbackClose,callbackMessage,callbackError} from "../logic.js";
import {EventBus} from "../EventBus.ts";
import {reconnect} from "../../api/api";
import {
    ActionData,
    BetData,
    ButtonData, FlopData,
    JoinData,
    PotData,
    PreFlopData, RiverData,
    Room,
    ShowDownData,
    StateData
} from "../types/types.ts";
import {GameState} from "../types/game_state.ts"
import {User, UserImpl} from "../types/user.ts";
import {COONST} from "../types/const.ts";
import CONST from "./const.ts";
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
		user1.visible = false;

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
		const user3 = new UserPrefab(this, 18, 300);
		this.add.existing(user3);
		user3.name = "user3";
		user3.scaleX = 0.5;
		user3.scaleY = 0.5;
		user3.visible = false;

		// user8
		const user8 = new UserPrefab(this, 1087, 290);
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

		// button_fold
		const button_fold = this.add.image(62.812552081710464, 20.799078357486906, "button_red");
		button_fold.name = "button_fold";
		button_fold.scaleX = 0.15758130827137293;
		button_fold.scaleY = 0.15758130827137293;
		op_btn_fold.add(button_fold);

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
		const slider_full = this.add.image(17.11812009383391, 11.578541090011868, "slider_full");
		slider_full.name = "slider_full";
		slider_full.scaleX = 0.5;
		slider_full.scaleY = 0.5;
		slider_full.setOrigin(0, 0.5);
		slider.add(slider_full);

		// value_box
		const value_box = this.add.image(-75, 7, "value_box");
		value_box.scaleX = 0.24561334306140128;
		value_box.scaleY = 0.15756275935432668;
		slider.add(value_box);

		// slider_arrow
		const slider_arrow = this.add.image(18, -5, "slider_arrow");
		slider_arrow.name = "slider_arrow";
		slider_arrow.scaleX = 0.15;
		slider_arrow.scaleY = 0.15;
		slider.add(slider_arrow);

		// chip_to_bet
		const chip_to_bet = this.add.text(-11.565390119554252, -7, "", {});
		chip_to_bet.name = "chip_to_bet";
		chip_to_bet.setOrigin(1.025565287085044, 0);
		chip_to_bet.text = "0";
		chip_to_bet.setStyle({ "align": "right", "color": "#ffffffff", "fontSize": "27px" });
		slider.add(chip_to_bet);

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

		// public_card_1
		const public_card_1 = this.add.image(-177.18549263145178, -0.23896370084037244, "card_back_0");
		public_card_1.name = "public_card_1";
		public_card_1.scaleX = 0.15041695188999193;
		public_card_1.scaleY = 0.15041695188999193;
		public_card_1.visible = false;
		public_card_container.add(public_card_1);

		// public_card_2
		const public_card_2 = this.add.image(-89.18549263145178, -0.23896370084037244, "card_back_0");
		public_card_2.name = "public_card_2";
		public_card_2.scaleX = 0.15041695188999193;
		public_card_2.scaleY = 0.15041695188999193;
		public_card_2.visible = false;
		public_card_container.add(public_card_2);

		// public_card_3
		const public_card_3 = this.add.image(-1.1854926314517797, -0.23896370084037244, "card_back_0");
		public_card_3.name = "public_card_3";
		public_card_3.scaleX = 0.15041695188999193;
		public_card_3.scaleY = 0.15041695188999193;
		public_card_3.visible = false;
		public_card_container.add(public_card_3);

		// public_card_4
		const public_card_4 = this.add.image(86.81450736854822, -0.23896370084037244, "card_back_0");
		public_card_4.name = "public_card_4";
		public_card_4.scaleX = 0.15041695188999193;
		public_card_4.scaleY = 0.15041695188999193;
		public_card_4.visible = false;
		public_card_container.add(public_card_4);

		// public_card_5
		const public_card_5 = this.add.image(174.81450736854822, -0.23896370084037244, "card_back_0");
		public_card_5.name = "public_card_5";
		public_card_5.scaleX = 0.15041695188999193;
		public_card_5.scaleY = 0.15041695188999193;
		public_card_5.visible = false;
		public_card_container.add(public_card_5);

		// chip_pool_text
		const chip_pool_text = this.add.text(640, 207, "", {});
		chip_pool_text.name = "chip_pool_text";
		chip_pool_text.setOrigin(0.5, 0.5);
		chip_pool_text.visible = false;
		chip_pool_text.setStyle({ "color": "#000000ff", "fontSize": "21px", "stroke": "#000000ff" });

		// dealer
		const dealer = this.add.image(620, 296, "dealer");
		dealer.name = "dealer";
		dealer.scaleX = 0.06200379587037338;
		dealer.scaleY = 0.06200379587037338;

		// bet_coin_1
		const bet_coin_1 = new bet_coin(this, 561, 482);
		this.add.existing(bet_coin_1);
		bet_coin_1.name = "bet_coin_1";
		bet_coin_1.scaleX = 0.18777490724676463;
		bet_coin_1.scaleY = 0.18777490724676463;
		bet_coin_1.visible = false;

		// bet_coin_2
		const bet_coin_2 = new bet_coin(this, 216, 429);
		this.add.existing(bet_coin_2);
		bet_coin_2.name = "bet_coin_2";
		bet_coin_2.scaleX = 0.18777490724676463;
		bet_coin_2.scaleY = 0.18777490724676463;
		bet_coin_2.visible = false;

		// bet_coin_3
		const bet_coin_3 = new bet_coin(this, 202, 335);
		this.add.existing(bet_coin_3);
		bet_coin_3.name = "bet_coin_3";
		bet_coin_3.scaleX = 0.18777490724676463;
		bet_coin_3.scaleY = 0.18777490724676463;
		bet_coin_3.visible = false;

		// bet_coin_4
		const bet_coin_4 = new bet_coin(this, 224, 224);
		this.add.existing(bet_coin_4);
		bet_coin_4.name = "bet_coin_4";
		bet_coin_4.scaleX = 0.18777490724676463;
		bet_coin_4.scaleY = 0.18777490724676463;
		bet_coin_4.visible = false;

		// bet_coin_5
		const bet_coin_5 = new bet_coin(this, 419, 157);
		this.add.existing(bet_coin_5);
		bet_coin_5.name = "bet_coin_5";
		bet_coin_5.scaleX = 0.18777490724676463;
		bet_coin_5.scaleY = 0.18777490724676463;
		bet_coin_5.visible = false;

		// bet_coin_6
		const bet_coin_6 = new bet_coin(this, 749, 153);
		this.add.existing(bet_coin_6);
		bet_coin_6.name = "bet_coin_6";
		bet_coin_6.scaleX = 0.18777490724676463;
		bet_coin_6.scaleY = 0.18777490724676463;
		bet_coin_6.visible = false;

		// bet_coin_7
		const bet_coin_7 = new bet_coin(this, 970, 235);
		this.add.existing(bet_coin_7);
		bet_coin_7.name = "bet_coin_7";
		bet_coin_7.scaleX = 0.18777490724676463;
		bet_coin_7.scaleY = 0.18777490724676463;
		bet_coin_7.visible = false;

		// bet_coin_8
		const bet_coin_8 = new bet_coin(this, 946, 365);
		this.add.existing(bet_coin_8);
		bet_coin_8.name = "bet_coin_8";
		bet_coin_8.scaleX = 0.18777490724676463;
		bet_coin_8.scaleY = 0.18777490724676463;
		bet_coin_8.visible = false;

		// bet_coin_9
		const bet_coin_9 = new bet_coin(this, 930, 438);
		this.add.existing(bet_coin_9);
		bet_coin_9.name = "bet_coin_9";
		bet_coin_9.scaleX = 0.18777490724676463;
		bet_coin_9.scaleY = 0.18777490724676463;
		bet_coin_9.visible = false;

		// lists
		const public_card_list: Array<any> = [];

		this.public_card_list = public_card_list;

		this.events.emit("scene-awake");
	}

	private public_card_list!: Array<any>;

	/* START-USER-CODE */

	// Write your code here
    private  betApi:BetApi;
    private gameState:GameState = new GameStateInstance(this);

    preload(){
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
        this.betApi = new BetApi()
        const api = this.betApi
        this.betApi.registerCallback(function (data) {
            console.log("connect success",JSON.stringify(data))
            api.loginCertification(userAccount.address, function (authData){
                console.log("authdata",authData)
            });
        }, callbackClose, this.callbackMessage.bind(this), callbackError)

        const userAccount = this.registry.get("current_account");
        this.betApi.setUserID(userAccount.address);
        this.gameState.setCurrentUser(userAccount.address);
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
        console.log("game chip pool obj",chipPoolText)
        this.gameState.chipPoolText = chipPoolText;
        for(let i = 0; i < 9; i++) {
            const dealer = this.scene.scene.children.getByName("bet_coin_" + (i + 1)) as Phaser.GameObjects.Container;
            this.gameState.DealerButtons.push(dealer);

            const userContainer = this.scene.scene.children.getByName("user" + (i + 1)) as Phaser.GameObjects.Container;
            const user = new UserImpl(userContainer,dealer,this);
            this.gameState.Users.push(user)
        }

        const dealer = this.scene.scene.children.getByName("dealer") as Phaser.GameObjects.Image;
        this.gameState.Dealer = dealer;


        // 操作面板
        this.gameState.sliderContainer = this.scene.scene.children.getByName("slider") as Phaser.GameObjects.Container;
        const sliderHandle = this.gameState.sliderContainer.getByName("slider_arrow") as Phaser.GameObjects.Image;
        this.gameState.sliderHandle = sliderHandle;

        this.gameState.actionRaiseContainer = this.scene.scene.children.getByName("op_btn_raise") as Phaser.GameObjects.Container;
        const raiseBtn = this.gameState.actionRaiseContainer.getByName("button_raise") as Phaser.GameObjects.Image;
        raiseBtn.setInteractive().on('pointerdown', this.actionRaise.bind(this));

        this.gameState.actionFoldContainer = this.scene.scene.children.getByName("op_btn_fold") as Phaser.GameObjects.Container;
        const foldBtn = this.gameState.actionFoldContainer.getByName("button_fold") as Phaser.GameObjects.Image;
        foldBtn.setInteractive().on('pointerdown', this.actionFold.bind(this));

        this.gameState.actionCheckContainer = this.scene.scene.children.getByName("op_btn_check") as Phaser.GameObjects.Container;
        const callBtn = this.gameState.actionCheckContainer.getByName("button_check") as Phaser.GameObjects.Image;
        callBtn.setInteractive().on('pointerdown', this.actionCall.bind(this));
    }

     callbackMessage(data) {
        console.log("callback message",JSON.stringify(data))
        if(data.type == "iq") {
            if(data.class == "room"){ //查询游戏房间列表
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
            else if(data.action == "bet"){//服务器通报玩家下注结果
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

    // handleCreateRoom(data){
    //     console.log("todohandleCreateRoom")
    // }
    handleGone(data){
        const goneUserID = data.occupant.id;
        const user = this.gameState.getUserByID(goneUserID);
        console.log("Handle Gone ........UserID:",goneUserID);
        if (!user){
            return
        }

        if(user.userID == this.gameState.currentUser) {
            //gameQuit();
            console.log("Handle Gone ........");
            user.User.visible = false
            this.gameState.hideActionMenu();
            // this.selfCards[0].visible = false;
            // this.selfCards[1].visible = false;

            console.log("chips", user.chips)

            if(user.chips <= 0) {
                // if(this.game.Native != undefined) {
                //     this.game.Native.confrimPopupWindow("你的钱输光了！！","你的积分为0， 即将被踢出游戏", "确认", function(data){
                //         game.Native.quitToApp();
                //     });
                //     return;
                // }
                this.game.scene.start('Table');
            }
        }
        user.User.visible = false;
        user.BetCoin.setVisible(false);


        // user.clean();
        // user.setVisible(false)
        // var seatNum = user.param["seatNum"]
        // if(this.gameStateObj.bankerPos == seatNum) {
        //     if(this.dealer != null) {
        //         this.dealer.destroy();
        //         this.dealer = null;
        //     }
        // }
    }
    handleJoin(data:JoinData){
        console.log("JoinRoom data",JSON.stringify(data))
        let occupant = data.occupant;
        //通过和自己的座位号码推算应该在第几个座位
        const userIndex = this.gameState.getTargetIndex(occupant.index);
        let user = this.gameState.Users[userIndex]

        //TODO 设置头像
        // if(occupant.profile && occupant.profile != "") {
        //     console.log("user profile",occupant.profile)
        //     this.game.load.image("userImage" + userIndex, occupant.profile, true);
        //     // this.game.load.start();
        // }

        if (occupant.name == "") {
            console.log("error userName =", occupant.name);
        }
        user.initUser(occupant,occupant.id==this.gameState.currentUser)
    }
    handleButton(data:ButtonData){
        console.log("handlebutton")
        this.gameState.buttonPos = parseInt(data.class);
        this.gameState.Dealer.visible = true;

        const buttonIndex = this.gameState.getTargetIndex(this.gameState.buttonPos)
        const targetDealer =this.gameState.DealerButtons[buttonIndex]
        if (targetDealer){
            this.tweens.add({
                targets: this.gameState.Dealer,   // 目标对象
                x: targetDealer.x,
                y: targetDealer.y,
                duration: 800,    // 持续时间（毫秒）
                ease: 'Linear',    // 缓动函数（支持字符串或函数）
                onComplete: () => { /* 动画完成回调 */ }
            })
        }else{
            console.error("target dealer not found",buttonIndex)
            return 
        }
        this.gameState.Dealer.visible = false;
        const userObj = this.gameState.Users[buttonIndex];
        userObj.BetCoin.setDealer();
        this._initNewRound()
        // todo 发牌
        // this._playSound(this.soundReorderCard, function(){
        // this._sendCardAnimation();
    }
    handlePreflop(data:PreFlopData){
        const user = this.gameState.getUserByID(this.gameState.currentUser);
        if (user){
            const arrayCards = data.class.split(",");
            user.updateCards(arrayCards);
        }
    }
    handleFlop(data:FlopData){
        var arrayParam = data.class.split(",");
        var arrayCards = arrayParam.slice(0,3)
        this._flopAnimation(arrayCards[0], arrayCards[1], arrayCards[2])
        this._setBetCardType(arrayParam[3])
    }
    handleTurn(data:RiverData){
        const arrayCards = data.class.split(",");
        this._turnAnimation(arrayCards[0])

        this._setBetCardType(arrayCards[1])

        console.log("handleturn")
    }
    handleRiver(data){
        const arrayCards = data.class.split(",");
        this._riverAnimation(arrayCards[0])

        this._setBetCardType(arrayCards[1])
    }
    handlePot(data:PotData){
        console.log("handlepot",data)
        let arrayPool = data.class.split(",");

        // TODO 收用户筹码到池子
        // this.chipPoolCoins = this.animation.showCollectChip(this.game,this.userList, this.chipPoolBK.x - this.chipPoolBK.width*0.3 , this.chipPoolBK.y, this.chipPoolCoins);
        const current_user = this.gameState.getUserByID(this.gameState.currentUser)
        current_user?.resetGameRoundStatus()

        let poolall = 0;

        for(let i = 0; i < arrayPool.length; i++) {
            poolall += parseInt(arrayPool[i])
        }
        console.log("allpot ",poolall)
        this.gameState.updatePot(poolall);

        // clear Use coin
        for (let i = this.gameState.Users.length - 1; i >= 0; i--) {
            this.gameState.Users[i].setUseCoin(0);
        }
    }
    // 用户下注
    handleAction(data:ActionData){
        const arrayInfo = data.class.split(",");
        const seatNum = parseInt(arrayInfo[0]); //座位号
        const bet = parseInt(arrayInfo[1]); //单注额
        const userIndex = this.gameState.getTargetIndex(seatNum)
        console.log("handleaction user index",userIndex)
        const user = this.gameState.Users[userIndex]

        //todo 动画
        // this.gameStateObj.currentBettinglines = bet
        for (let uIndex=0;uIndex<this.gameState.Users.length;uIndex++){
            if (this.gameState.Users[uIndex].userID == user.userID) {
                this.gameState.Users[uIndex].backGround.setFillStyle(0xff8410,1); // 下注玩家背景变橙色
            }else{
                this.gameState.Users[uIndex].backGround.setFillStyle(0x000000,1); // 其他玩家变黑
            }        
        }


        // 当前玩家
        if (user.userID == this.gameState.currentUser) {
            user.UpdateBet(bet);

            // if(this._betWaitButtonChecked()) { // 预操作按钮
            //     this._autoAction();
            // } else {
            //     this._currentPlayButtonUpdate(true);
            // }

            // 当前玩家，显示操作案板
            this.gameState.showActionMenu(user);
            let userMinBet = bet;
            if (userMinBet>=user.chips){
                userMinBet  = user.chips
            }
            console.log("minbet amount",bet)
            console.log("set slider", userMinBet,user.chips,userMinBet)
            this.gameState.setSlider(userMinBet,user.chips,userMinBet)
        } else {
            this.gameState.hideActionMenu();
        }
        // todo 操作动画
        // this._drawUserProgress(user.rect.left, user.rect.width, user.rect.top, user.rect.height)
    }
    handleBet(data:BetData){
        const arrayInfo = data.class.split(",");
        const betTypeName = arrayInfo[0]  // 下注类型
        const betvalue = parseInt(arrayInfo[1]) // 本局下注总数
        const chips = parseInt(arrayInfo[2]) // 手上剩余筹码数
        const user = this.gameState.getUserByID(data.from)

        if (user && user.userID != this.gameState.currentUser) {
            // todo 声音
            // this._playSound(this.soundClick);
        }

        const betType = this._betTypeByBetTypeNames(betTypeName)

        this.gameState.SetCurrentBet(betType,betvalue)

        switch(betType){
            case CONST.BetType_ALL:
            case CONST.BetType_Call:
            case CONST.BetType_Raise: 
                if (user) {
                    user.setUseCoin(betvalue);
                    if (user.userID == this.gameState.currentUser) {
                        console.log("set chips bet",chips)
                        user.setChips(chips);
                        user.setOnDeskBet(betvalue)
                    };
                } else {
                    console.log("ERROR: can't find user, userid:",data.from);
                }

                // 取消预操作
                // if(betType == CONST.BetType_Raise) {
                //     // 当 raise 后 wait button 发生变化
                //     //跟注或看牌，取消掉
                //     if(this.waitSelected2 === true) {
                //         this.waitOnClick2()
                //     }
                // }

                break;
            //弃牌
            case CONST.BetType_Fold:
                if (user){
                    user.setGiveUp(true);
                    if (user.userID == this.gameState.currentUser) {
                        user.resetGameRoundStatus()
                    }
                }
                break;
            //看牌
            case CONST.BetType_Check:
                break;
            default:
                console.log("ERROR: betType not a vaid value:",betType);
                break;
        }
    }
    _flopAnimation(card1:string, card2:string, card3:string) {
        var deskCardIDs = []
        //var arrayCards = data.class.split(",");
        //var publicCards = [arrayCards[0], arrayCards[1], arrayCards[2]];
        const publicCards = [card1, card2, card3];

        let lstCardImage = [];
        for (let i = 0; i < publicCards.length; i++) {
            this.gameState.publicCards[i].visible = true
            deskCardIDs.push(i);
            lstCardImage.push(publicCards[i]);
        }
        const that = this;
        this.gameState.showPublicCard(deskCardIDs, lstCardImage, true, function(){
            // that._playSound(that.soundSendCard);
        });
    }
    _turnAnimation(card:string) {
        //this.animation.publicCards.push(card)
        const deskCardIDs = [3]
        const lstCardImage = [card]
        this.gameState.publicCards[3].visible = true;
        this.gameState.showPublicCard(deskCardIDs, lstCardImage, false,()=>{});
        // this._playSound(this.soundSendCard); //todo
    }
    _riverAnimation(card:string) {
        //this.animation.publicCards.push(card)
    
        const deskCardIDs = [4]
        const lstCardImage = [card]
        this.gameState.publicCards[4].visible = true;
        this.gameState.showPublicCard(deskCardIDs, lstCardImage, false,()=>{});
        // this._playSound(this.soundSendCard);
    }
    _setBetCardType(cardType:string) {
        const carTypeName = CONST.CardTypeNames[parseInt(cardType)]
        const user = this.gameState.getUserByID(this.gameState.currentUser)
        if (!user){
            return
        }
        user.setStrength(carTypeName);
    }


    handleShowDown(data:ShowDownData){
        // console.log("showdown:",data);

        // if(this.userProgressObj != undefined) {
        //     this.userProgressObj.stop();
        //     this.userProgressObj.clean();
        //     //this.animation.stopShake = true; 
        // }

        const roomInfo = data.room;
        const playerList = roomInfo.occupants;

        let maxHand = 0
        let maxHandIndex = 0

        // 如果都没有hand说明只有一个人下注，没有翻牌的情况
        let lastHasCardsIndex = -1; //保存最后一个出牌的人index
        let hashand = false;


        for (let i = playerList.length - 1; i >= 0; i--) {
            let occupantInfo = playerList[i]

            if(!occupantInfo) {
                continue;
            }

            if (occupantInfo.cards) {
                lastHasCardsIndex = i
            }

            if (occupantInfo.hand) {
                hashand = true
            }

            var hand = occupantInfo.hand
            if (maxHand < hand) {
                maxHand = hand
                maxHandIndex = i
            }
        };

        //只有一个人下注，没有翻牌的情况
        if (!hashand && lastHasCardsIndex!=-1) {
            maxHandIndex = lastHasCardsIndex
        }

        const winOccupantItem = playerList[maxHandIndex]


        if (winOccupantItem != undefined && winOccupantItem != null) {
            const winUser = this.gameState.getUserByID(winOccupantItem.id)
            if(winOccupantItem.chips > 0 && winOccupantItem.id == this.gameState.currentUser) {
                winUser?.setChips(winOccupantItem.chips)
            }
            winUser?.setChips(winOccupantItem.chips)

            // console.log("winner is ",winUser)

            if (winOccupantItem.action != "fold") {
                if(winOccupantItem.cards != null && winOccupantItem.cards != undefined) {
                    //todo 动效，赢家手牌高亮
                    // winUser.setWinCard(winOccupantItem.cards[0], winOccupantItem.cards[1]);

                    // console.log("winner card  is ",winOccupantItem.cards)

                    // if(winOccupantItem.id != this.userID) {
                    //     this._playSound(this.soundLost);
                    // } else {
                    //     this._playSound(this.soundWin);
                    // }

                    const hand = winOccupantItem.hand;
                    // console.log("winner card  is ",winOccupantItem.cards,"hand",hand);

                    if(hand != undefined && hand != null) {
                        let type = (hand >>> 16)
                        if(type > 10) {
                            type = 0
                        }
                        if(winOccupantItem.id !== this.gameState.currentUser) {
                            // console.log("win card type is ",type)
                            // todo userstrength
                            // winUser.setUserTitle(CONST.CardTypeNames[type])
                        }
                    }
                }
            }

            // var seatNum = winUser.param["seatNum"];
            // var point = this._userPositionBySeatNum(seatNum)

            // todo 筹码移动到用户的筹码堆
            // for(i = 0; i < this.chipPoolCoins.length; i++) {
            //     this._playSound(this.chipsmoving)
            //     this.animation.showChipMove(this.game,this.chipPoolCoins[i], point.x, point.y, 500)
            // }
        }
        // todo user reset
        for (let i = this.gameState.Users.length - 1; i >= 0; i--) {
            this.gameState.Users[i].reset();
        };
    }

    handleState(data:StateData){
        console.log("handle state",JSON.stringify(data));
        const roomInfo = data.room;

        this.gameState.InitRoom(roomInfo)

    }
    _initNewRound() {
        for (let i =0;  i < this.gameState.Users.length;  i++) {
            const user = this.gameState.Users[i]
            if (user.isPlaying){
                user.reset()
            }
        }
        // this._clearWaitButtons();
        // this._setBetButtonsVisible(false);
        // this._setWaitButtonsVisible(false);
        // this._resetGameRoundStatus();
        // this._resetPublicCard();
        
        // this._clearChipPoolCoins();
        //
        // this.gameStateObj.mybet = this.bb
        // this.chipPool.setText("0");
        // this.autoCall = 0;
        this.gameState.hideActionMenu();
        const user = this.gameState.getUserByID(this.gameState.currentUser);
        if (user){
            user.resetGameRoundStatus()
            user.UpdateBet(this.gameState.bb)
            user.setAction("");
        }
        this._resetPublicCard()
        this._clearChipPoolCoins();
        this.gameState.updatePot(0);
    }
    
    _resetPublicCard() {
        const cardBK = this.textures.get("card_back_0");    
        for(let i = 0; i < this.gameState.publicCards.length; i++) {
            this.gameState.publicCards[i].visible = false;
            this.gameState.publicCards[i].setTexture(cardBK);
        }
    }

    sendCardAnimation() {
        var sendPoint ={x:this.chipPoolBK.x + this.chipPoolBK.width * 0.14, y:this.chipPoolBK.y + this.chipPoolBK.height * 0.5}
        var userList = []
        for(var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].param.userID != undefined && this.userList[i].param.userID != null && this.userList[i].param.userID != "") {
                userList.push(this.userList[i]);
            }
        }
        var game = this.game
        var currentIndex = 0;
        var that = this
        var sendCard = function(){
            that._playSound(that.soundSendCard)
            var user = userList[currentIndex++]
            if (user == undefined || user == null) {
                console.log("user not find!!index:", currentIndex);
                return
            }
            var dcard = game.add.sprite(sendPoint.x, sendPoint.y, "dcardBK");
            dcard.setScale(0.5, 0.5);
            dcard.setVisible(false);
            dcard.visible = false
            var x ;
            var y ;
            if(that.userID == user.param.userID) {
                x = that.selfCards[0].x;
                y = that.selfCards[0].y
            }else{
                x = user.dcard.x;
                y = user.dcard.y;
            }
            var tweens = that.tweens.add({
                targets: dcard,   // 目标对象
                x: x,            // 目标属性值
                y:y,
                duration: 500,    // 持续时间（毫秒）
                ease: 'Linear',    // 缓动函数（支持字符串或函数）
                onComplete: () => {
                    if(that.userID === user.param.userID) {
                        that.selfCards[0].setVisible(true);
                        that.selfCards[1].setVisible(true);
                    } else {
                        user.dcard.visible = true;
                    }
                    // user.dcard.visible = true;
                    dcard.destroy();
                    if(currentIndex < userList.length ) {
                        sendCard();
                    }

                    if(user.imagebody.visible == false) {
                        if(user.dcard != undefined  && user.dcard != null) {
                            user.dcard.visible = true;
                        }
                    }
                }
            });
        }
        sendCard();
    }

    _betTypeByBetTypeNames(name :string){
    for (let i = CONST.BetTypeNames.length - 1; i >= 0; i--) {
            if (CONST.BetTypeNames[i] == name) {
                return i;
            }
        }   
        return -1;
    }
    actionFold(){
        console.log("actionFold")
        const that = this
        this.betApi.betFold(function(isok:boolean) {
            // send OK or NOK
            that.gameState.hideActionMenu();
            // todo placksound check
            // that._playSound(that.soundClick);
        });
        console.log("game quit ============");
    }
    actionCheck(){
        console.log("actionFold")
        const that = this
        this.betApi.betFold(function(isok:boolean) {
            // send OK or NOK
            that.gameState.hideActionMenu();
            // todo placksound check
            // that._playSound(that.soundClick);
        });
        console.log("game quit ============");
    }

    actionCall(){
        console.log("actionOnClick2 click")
        const that = this
        const currentUser = this.gameState.getUserByID(this.gameState.currentUser);
        if (!currentUser){
            return
        }
        let betdiff = currentUser.getBet()-currentUser.getOnDeskBet()

        if(betdiff > currentUser.getChips()) {
            betdiff = currentUser.getChips();
        }

        //if (betdiff >= 0 ) {
        this.betApi.bet(betdiff,function(isok:boolean) {
            // send OK or NOK
            //todo sound
            that.gameState.hideActionMenu();
            // that._playSound(that.soundClick);
            // that._setBetButtonsVisible(false)
        })
        //}



        // test native interface
        // gameQuit("test");
    }
    _clearChipPoolCoins() {
        // //todo  clear pot
        // for (var i = this.chipPoolCoins.length - 1; i >= 0; i--) {
        //     this.chipPoolCoins[i].destroy()
        // }
        //
        // this.chipPoolCoins = []
    }
    _raseAction(value:number) {
        const betValue = Math.floor(value)
        console.log("raise value",betValue)
        // var that = this
        
        this.betApi.bet(betValue,function(isok) {
            // send OK or NOK
            // that._playSound(that.soundClick);
            // that._setBetButtonsVisible(false)
        })

        // that.chipboxGroup.visible = false ;
        // that.chipboxGroup.setVisible(false);
    }

    actionRaise(){
        const betChips = this.gameState.sliderHandle.getData('value')
        
        this._raseAction(betChips)
        
        const user = this.gameState.getUserByID(this.gameState.currentUser)
        if (!user){
            return
        }
        user.setAction("Raise");
        // // 如果用户划动滑杆
        // if(this.gameState.sliderContainer.visible) {
        //     const betChips = this.gameState.sliderHandle.getData('value')
        //     this._raseAction(betChips)
        //     const user = this.gameState.getUserByID(this.gameState.currentUser)
        //     if (!user){
        //         return
        //     }
        //     user.setAction("Raise");
        // } else {
        //     //todo
        //     // var bet = this.gameStateObj.mybet - this.gameStateObj.mybetOnDesk;
        //     //
        //     // if(bet > 0 && bet < this.chips) {
        //     //     bet=bet*2
        //     // }
        //     //
        //     // if(bet > this.chips) {
        //     //     bet = 0;
        //     // }
        //     //
        //     // this._updatePoolChipValue(bet*2?bet*2:10*2);
        //     // this._setSliderRange(bet, this.chips);
        //     // this.chipboxGroup.visible = true;
        //     // this.chipboxGroup.setVisible(true);
        //     // this.chipboxOpened = true;
        //     //
        //     // this.lbCallEvery.setText("Raise "+bet);
        // }
        this.gameState.hideActionMenu();
    }


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export class GameStateInstance implements GameState{

    sb: number;
    bb: number;
    bet: number;
    roomID: string;
    timeout:number;
    buttonPos:number;
    publicCardArr:string[];
    currentUser: string;
    // phaser 牌桌对象
    phaserGame:Phaser.Game;
    tableScene:Table;
    blindText:Phaser.GameObjects.Text;
    chipPoolText:Phaser.GameObjects.Text;
    publicCards:Phaser.GameObjects.Image[];
    Users : User[];
    DealerButtons: Phaser.GameObjects.Container[];
    Dealer: Phaser.GameObjects.Image;
    playerOffset:number;
    sliderContainer: Phaser.GameObjects.Container;
    sliderHandle:Phaser.GameObjects.Image;
    actionRaiseContainer:Phaser.GameObjects.Container;
    actionFoldContainer :Phaser.GameObjects.Container;
    actionCheckContainer :Phaser.GameObjects.Container;

    betType:number;
    betValue:number;

    constructor(table:Table) {
        this.phaserGame = table.game;
        this.tableScene = table;
        this.Users = [];
        this.DealerButtons =[];
    }

    setCurrentUser(userID:string){
        this.currentUser = userID;
    }

    hideActionMenu(){
        this.sliderContainer.visible = false
        this.actionFoldContainer.visible = false
        this.actionCheckContainer.visible = false
        this.actionRaiseContainer.visible = false
    }
    showActionMenu(user:User){
        this.sliderContainer.visible = true
        this.actionFoldContainer.visible = true
        this.actionCheckContainer.visible = true
        this.actionRaiseContainer.visible = true
    }

    getUserByID(userID: string):User|undefined{
        for(let i =0;i<this.Users.length;i++){
            if(this.Users[i].userID == userID){
                return this.Users[i];
            }
        }
    };

    SetCurrentBet(betType:number,betValue:number){
        this.betType = betType;
        this.betValue = betValue;
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
            // const frame = this.tableScene.textures.get(this.formatElement(this.publicCardArr[i]));
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
        this.updatePot(chipPoolCount);
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
        for(let i = 0; i < occupants.length; i++) {
            const userInfo = occupants[i];
            console.log("init occupant",userInfo.id,userInfo.name,userInfo.index)
            if(userInfo && userInfo.id == this.currentUser) {
                console.log("find user ")
                playerOffset =  userInfo.index;
                break;
            }
        }
        console.log("initOccupants playerOffset",playerOffset,"userIndex",playerOffset)
        this.playerOffset = playerOffset;


        for(let i = 0; i < occupants.length; i++) {
            const userInfo = occupants[i];
            if(!userInfo) {
                continue;
            }
            const index = this.getTargetIndex(userInfo.index)
            const user = this.Users[index];
            if (user){
                user.initUser(userInfo,index==0);
                user.User.visible = true; 
            }else{
                console.log("init no user",user)
            }

        }
    }

    getTargetIndex(originIndex:number){
        let index =  originIndex- this.playerOffset;
        if(index >= this.Users.length) {
            index -= this.Users.length;
        } else if(index < 0) {
            index += this.Users.length;
        }
        return index
    }

    updateBlindText(){
        this.blindText.setText("Blinds:" + this.sb + "/" + this.bb);
    }


    reSetSliderConfig(minChips:number,maxChips:number,currentChips:number){
        const sliderHandle = this.sliderHandle;
        const sliderFull  = this.sliderContainer.getByName("slider_full") as Phaser.GameObjects.Image;
        const width = sliderFull.width * sliderFull.scaleX;
        const scale = (maxChips-minChips) / width;
        // console.log("chips and scale",maxChips,minChips,width,scale)
        sliderHandle.setData('min', minChips);
        sliderHandle.setData('max', maxChips);
        sliderHandle.setData('value', currentChips);
        sliderHandle.setData('scale', scale);
    }

    setSlider(minChips:number,maxChips:number,currentChips:number){
        const sliderHandle = this.sliderHandle;
        const sliderFull  = this.sliderContainer.getByName("slider_full") as Phaser.GameObjects.Image;
        // const chipToBet  = this.sliderContainer.getByName("chip_to_bet") as Phaser.GameObjects.Text;
        sliderHandle.setInteractive();
        console.log(sliderHandle);
        const width = sliderFull.width * sliderFull.scaleX;
        sliderHandle.setData('left', sliderFull.x);
        sliderHandle.setData('right', sliderFull.x + width+10);
        this.tableScene.input.setDraggable(sliderHandle);
        sliderHandle.setData('callback', function (data){
            // console.log("handle slider callback",data)
        });
        this.reSetSliderConfig(minChips,maxChips,currentChips);

        this.updateSlider(sliderHandle,null,sliderFull.x);

        const that = this;
        sliderHandle.on('drag', function (pointer, dragX, dragY) {
            that.updateSlider(this, pointer, dragX);
        });

    }

    updateSlider (handle, pointer, dragX) {
        const min = handle.getData('min');
        const max = handle.getData('max');
        const scale = handle.getData('scale');
        const left = handle.getData('left');
        const right = handle.getData('right');

        dragX = Phaser.Math.Clamp(dragX, left, right);

        handle.x = dragX;

        //  Calculate the value
        const diffValue = (dragX - left) * scale;
        let value = diffValue + min;
        if (value>max){
            value = max;
        }
        handle.setData('value', value);
        const chipToBet  = this.sliderContainer.getByName("chip_to_bet") as Phaser.GameObjects.Text;
        chipToBet.setText(value.toFixed(0));

        const callback = handle.getData('callback');

        callback.call(this, value);
    }

    showPublicCard(lstIndex:number[], lstKey:string[], showBK:boolean, callback:()=>void) {
        if(lstIndex.length > this.publicCards.length) {
            return;
        }
        const scene = this.tableScene;
        
        let nIndex = 0;
        const animationTime = 100;
        const that = this;
        var showAnimation = function (index:number, key:string, showBK:boolean) {
            const cardWidth = that.publicCards[index].width;
            if(showBK) {
                let cardBK = scene.textures.get("card_back_0");
                that.publicCards[index].setTexture(cardBK)
                let tween = scene.tweens.add({
                    targets: that.publicCards[index],   // 目标对象
                    width:0,
                    duration: animationTime,    // 持续时间（毫秒）
                    ease: 'Linear',    // 缓动函数（支持字符串或函数）
                    // yoyo: true,        // 是否反向播放
                    onComplete: () => { {
                        const frame_key = that.formatElement(key)
                        let publicCard = scene.textures.get(frame_key);
                        that.publicCards[index].setTexture(publicCard)
                        let tween2 = scene.tweens.add({
                            targets:that.publicCards[index],
                            width:cardWidth,
                            duration:animationTime,
                            onComplete:()=>{
                                nIndex++;
                                if(nIndex < lstIndex.length) {
                                    showAnimation(lstIndex[nIndex], lstKey[nIndex], showBK);
                                }
                            }
                        });
                    } }
                });
            }
            else {
                that.publicCards[index].width = 0;
                const frame_key = that.formatElement(key)

                let cardBK = scene.textures.get(frame_key);
                that.publicCards[index].setTexture(cardBK)
                var tween = scene.tweens.add({
                    targets: that.publicCards[index],   // 目标对象
                    width:cardWidth,
                    duration:animationTime,
                    onComplete:()=>{
                        nIndex++;
                        if(nIndex < lstIndex.length) {
                            showAnimation(lstIndex[nIndex], lstKey[nIndex], showBK);
                        }
                    }
                });
            }
        };
        if(callback != undefined) {
            callback();
        }
        
        showAnimation(lstIndex[nIndex], lstKey[nIndex], showBK);
    }
    updatePot(pot: number) {
        if (pot>0){
            this.chipPoolText.visible = true
            this.chipPoolText.setText("Pot:"+pot)
        }else{
            this.chipPoolText.visible = false
        }
    }
}

