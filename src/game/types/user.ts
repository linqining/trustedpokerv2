import {Occupant} from "./types.ts";
import Table from "../scenes/Table.ts";
import * as phaser from "phaser";


export interface User {
    userID: string,
    User : Phaser.GameObjects.Container,
    chips:number,
}

export class UserImpl implements User{
    userID: string;
    seatNum:number;
    isSelf:boolean=false;
    name:string;
    chips:number;
    cards: string[] = [];
    User : Phaser.GameObjects.Container;
    tableScene:Table;
    cardBackPrefab: Phaser.GameObjects.Container;
    cardOne: Phaser.GameObjects.Image;
    cardTwo: Phaser.GameObjects.Image;
    strengthText: phaser.GameObjects.Text;

    constructor(userGameObj:Phaser.GameObjects.Container,table:Table) {
        this.User = userGameObj
        this.tableScene = table;
        this.cardBackPrefab = this.User.getByName("cardBackPrefab") as Phaser.GameObjects.Container;
        const card_and_strength = this.cardBackPrefab.getByName("card_and_strength") as Phaser.GameObjects.Container;
        const cards_container = card_and_strength.getByName("cards_container") as Phaser.GameObjects.Container;
        this.cardOne = cards_container.getByName("card_back_1") as Phaser.GameObjects.Image;
        this.cardTwo = cards_container.getByName("card_back_2") as Phaser.GameObjects.Image;
        
        const strength_container = card_and_strength.getByName("strength_container") as Phaser.GameObjects.Container;
        this.strengthText = strength_container.getByName("strength_text") as Phaser.GameObjects.Text;
    }

    setChips(chips: number) {
        this.chips = chips;
    }

    initUser(userInfo: Occupant,isSelf:boolean) {
        this.userID = userInfo.id;
        this.seatNum = userInfo.index;
        this.isSelf=isSelf;
        this.name = userInfo.name;

        if (isSelf){
            this.chips = userInfo.chips;
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
        
        this.User.setVisible(true);
        this.User.visible = true;
        console.log("set user visible done")
        
    }
    formatElement(str:string) {
        return str.replace(/([CDHS])([2-9ATJQK])/g, '$1_$2');
    }
    
    updateCards(cards?: string[] | undefined){
        let arrayCards = cards;
        if (!arrayCards){
            arrayCards = [];
        }
        this.cards = arrayCards;
        if(arrayCards.length>0) {
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
}

