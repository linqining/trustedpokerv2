import {Occupant} from "./types.ts";
import Table from "../scenes/Table.ts";
import * as phaser from "phaser";
import Phaser from "phaser";


export interface BetCoin {
    BetContainer : Phaser.GameObjects.Container,
    tableScene:Table;
    // chips:number,
    // isDealer:boolean;
    // isBB: boolean;
    // isSB: boolean;
    
    dealerObj:Phaser.GameObjects.Image;
    bbObj:Phaser.GameObjects.Image;
    sbObj:Phaser.GameObjects.Image;
    betObj:Phaser.GameObjects.Image;
    betText:Phaser.GameObjects.Text;
    
    
    
    setChips(chips:number):void;
    setDealer():void;
    setBB():void;
    setSB():void;
    resetRole():void;
    clearChips():void;
}

export class BetCoinImpl implements BetCoin{
    BetContainer : Phaser.GameObjects.Container;
    tableScene:Table;
    chips:number;
    isDealer:boolean;
    isBB: boolean;
    isSB: boolean;

    dealerObj:Phaser.GameObjects.Image;
    bbObj:Phaser.GameObjects.Image;
    sbObj:Phaser.GameObjects.Image;
    betObj:Phaser.GameObjects.Image;
    betText:Phaser.GameObjects.Text;



    constructor(betCoinContainer:Phaser.GameObjects.Container,table:Table) {
        this.BetContainer = betCoinContainer
        this.tableScene = table;
        
        this.dealerObj = this.BetContainer.getByName("dealer") as Phaser.GameObjects.Image;
        this.bbObj = this.BetContainer.getByName("bb") as Phaser.GameObjects.Image;
        this.sbObj = this.BetContainer.getByName("sb") as Phaser.GameObjects.Image;
        this.betObj = this.BetContainer.getByName("bet_coin") as Phaser.GameObjects.Image;
        this.betText = this.BetContainer.getByName("bet_txt") as Phaser.GameObjects.Text;
    }

    setChips(chips:number){
        this.betText.setText(chips.toString());
        this.betText.visible = true
    }
    
    setDealer(){
        this.resetRole()
        this.dealerObj.visible = true;
    }
    setBB(){
        this.resetRole()
        this.bbObj.visible = true;
    }
    setSB(){
        this.resetRole()
        this.sbObj.visible = true
    }
    resetRole(){
        this.dealerObj.visible = false;
        this.bbObj.visible = false;
        this.sbObj.visible = false;
        this.betObj.visible = false;
    }
    clearChips(){
        this.betText.setText("");
        this.betText.visible = false;
    }

}

