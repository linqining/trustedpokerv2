import {Occupant} from "./types.ts";
import Table from "../scenes/Table.ts";
import * as phaser from "phaser";
import Phaser from "phaser";
import {BetCoin, BetCoinImpl} from "./betCoin.ts";


export interface User {
    isPlaying: boolean;
    userID: string,
    User : Phaser.GameObjects.Container,
    chips:number,
    BetCoin: BetCoin,
    backGround: Phaser.GameObjects.Rectangle;

    reset(): void;
    UpdateBet(bet:number):void;
    getBet():number;
    
    getOnDeskBet():number;
    setOnDeskBet(bet:number):void
    
    getChips():number;
    setChips(chips:number):void;
    initUser(userInfo: Occupant, b: boolean): void;
    setGiveUp(giveUp:boolean): void;
    resetGameRoundStatus():void;
    setUseCoin(userCoin:number):void //前注，bb sb
    updateCards(cards?: string[] | undefined):void
    setAction(action:string):void
    setStrength(cardType:string):void
}

export class UserImpl implements User{
    userID: string;
    seatNum:number;
    isSelf:boolean=false;
    name:string;
    chips:number; // 用户手上的筹码
    myBet:number;
    onDeskBet:number;
    cards: string[] = [];
    BetCoin: BetCoin;
    backGround: Phaser.GameObjects.Rectangle;


    User : Phaser.GameObjects.Container;
    tableScene:Table;
    cardBackPrefab: Phaser.GameObjects.Container;
    cardOne: Phaser.GameObjects.Image;
    cardTwo: Phaser.GameObjects.Image;
    strengthText: phaser.GameObjects.Text;
    actionText: Phaser.GameObjects.Text;
    chipText: Phaser.GameObjects.Text;
    isPlaying: boolean = false; // 是否在游戏中
    giveUp: boolean = false;

    constructor(userGameObj:Phaser.GameObjects.Container,betCoinContainer:Phaser.GameObjects.Container,table:Table) {
        this.User = userGameObj
        this.tableScene = table;
        this.cardBackPrefab = this.User.getByName("cardBackPrefab") as Phaser.GameObjects.Container;
        const card_and_strength = this.cardBackPrefab.getByName("card_and_strength") as Phaser.GameObjects.Container;
        const cards_container = card_and_strength.getByName("cards_container") as Phaser.GameObjects.Container;
        this.cardOne = cards_container.getByName("card_back_1") as Phaser.GameObjects.Image;
        this.cardTwo = cards_container.getByName("card_back_2") as Phaser.GameObjects.Image;
        
        const strength_container = card_and_strength.getByName("strength_container") as Phaser.GameObjects.Container;
        this.strengthText = strength_container.getByName("strength_text") as Phaser.GameObjects.Text;
        
        this.actionText = this.User.getByName("action_text") as Phaser.GameObjects.Text;
        
        this.chipText = this.User.getByName("chips") as Phaser.GameObjects.Text;
        console.log("chips text obj",this.chipText)
        
        this.BetCoin = new BetCoinImpl(betCoinContainer,table)
        
        this.backGround = this.User.getByName("user_box");
    }
    

    initUser(userInfo: Occupant,isSelf:boolean) {
        this.userID = userInfo.id;
        this.seatNum = userInfo.index;
        this.isSelf=isSelf;
        this.name = userInfo.name;
        if (isSelf){
            this.chips = userInfo.chips;
            this.updateChips(this.chips);
            this.updateCards(userInfo.cards)
        }else{
            //TODO userInfo.cards 非自己的不返回牌
        }
        
        // todo 加载头像
        // if(userInfo.profile && userInfo.profile != "") {
        //     this.tableScene.load.image("userImage" + index, userInfo.profile, true);
        //     // this.game.load.start();
        // }
        
        // if(user.dcard != undefined  && user.dcard != null) {
        //     user.dcard.visible = true;
        // }
        
        this.User.visible = true;
        this.BetCoin.setVisible(true);
        this.isPlaying = true;
        
        console.log("set user visible done")
    }
    reset() {
        // this.User.visible = false;
        // this.isPlaying = false;
        // this.cards = [];
        // this.cardOne.setTexture("card_back_0");
        // this.cardTwo.setTexture("card_back_0");
        // this.strengthText.setText("");
    }
    
    UpdateBet(bet:number){
        if ( bet > 0 ) {
            this.myBet = bet;
        };
        const diffbet = this.getBet() - this.getOnDeskBet()
        if(diffbet > this.getChips()) {
            const diffbet = this.getChips();
            this.actionText.setText("Allin");
        } else if(diffbet == 0 ) {
            this.actionText.setText("Check");
        } else {
            this.actionText.setText("Call "+ diffbet);
        }
    }
    getBet():number{
        return this.myBet
    }
    getOnDeskBet():number{
        return this.onDeskBet
    }  
    setOnDeskBet(bet:number){
        this.onDeskBet = bet;
    }
    
    getChips(): number {
        return this.chips
    }
    setChips(chips:number){
        this.chips = chips;
        this.chipText.setText(chips.toString());
    }

    _loadSelfCard(arrayCards:string[]) {
        this.cards = arrayCards;
        if(this.cards.length>0) {
            // this.User.
            for(let i = 0; i < this.cards.length; i++) {
                const card = this.cards[i];
                const frame_key = this.formatElement(card)
                const frame = this.tableScene.textures.get(frame_key);
                console.log("update_user_card", frame_key);
                if (i==0){
                    console.log("update catd one", this.cardOne, frame);
                    this.cardOne.setTexture(frame)
                }
                if (i ==1){
                    console.log("update catd two", this.cardTwo, frame);
                    this.cardTwo.setTexture(frame)
                }
                // card.visible = false;
                // let frame = this.game.textures.get(arrayCards[i]);
                // card.setTexture(frame);
            }
        }
    }
    setStrength(cardType: string){
        this.strengthText.setText(cardType)
    }
    
    formatElement(str:string) {
        return str.replace(/([CDHS])([2-9ATJQK])/g, '$1_$2');
    }
    
    updateChips(chips:number){
        console.log("set user chips",chips)
        this.chipText.setText(chips.toString());
    }
    
    updateCards(cards?: string[] | undefined){
        let arrayCards = cards;
        if (!arrayCards){
            arrayCards = [];
        }
        this._loadSelfCard(arrayCards);
    }
    setAction(action:string){
        this.actionText.setText(action);
    }
    setGiveUp(bGiveUp:boolean) {
        let alpha = 1;
        this.giveUp = bGiveUp;
        if(bGiveUp) {
            alpha = 0.5;
        }
        // 设置动效
        // if(this.group) {
        //     this.containerplayer.alpha = alpha;
        //     this.containeruser.alpha = alpha;
        //     this.containerblank.alpha = alpha;
        //     this.winGroup.alpha = alpha;
        //     this.lbname.alpha = alpha;
        //     this.imagebody.alpha = alpha;
        //     this.lbcoin.alpha = alpha;
        //     this.textCoin.alpha = alpha;
        //     for(var i = 0; i < this.imageCoin.length; i++)
        //     {
        //         this.imageCoin[i].alpha = alpha;
        //     }
        // }
    }

    resetGameRoundStatus() {
        this.myBet = 0;     //当前玩家需要下注额下
        this.onDeskBet = 0;
    }
    setUseCoin(usedCoin:number) {
        if (!isNaN(usedCoin)){
            this.BetCoin.setChips(usedCoin)
            // todo 动画移动到用户头顶
            // var coin = this.game.add.image(this.rect.width / 2,  this.rect.height / 2, "chip01");
            // coin.setOrigin(0.5);
            // coin.setScale(0.3, 0.3)
            // coin.width = this.coinRect.width;
            // coin.height = this.coinRect.height;
            // this.imageCoin.push(coin);
            // this.group.add(coin);
            // this.animation.showChipMove(this.game,coin, this.coinRect.left, this.coinRect.top - this.imageCoin.length * coin.height * 0.1111);
        }else{
            //todo 清理筹码
        }
        

        // if(usedCoin != "") {
        //     this.textCoin.visible = true;
        //     var coin = this.game.add.image(this.rect.width / 2,  this.rect.height / 2, "chip01");
        //     coin.setOrigin(0.5);
        //     coin.setScale(0.3, 0.3)
        //     coin.width = this.coinRect.width;
        //     coin.height = this.coinRect.height;
        //     this.imageCoin.push(coin);
        //     this.group.add(coin);
        //     this.animation.showChipMove(this.game,coin, this.coinRect.left, this.coinRect.top - this.imageCoin.length * coin.height * 0.1111);
        // }
        // else
        // {
        //     this.textCoin.visible = false;
        //     for(var i = 0; i < this.imageCoin.length; i++) {
        //         this.imageCoin[i].destroy();
        //     }
        //     this.imageCoin = [];
        // }
    }
}

