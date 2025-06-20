import {User} from "./user.ts";
import {Room} from "./types.ts";

export interface GameState {
    roomID: string,
    bb:number,
    sb:number,
    bet: number,
    timeout:number,
    buttonPos:number,
    currentUser:string,
    publicCardArr:string[];
    blindText:Phaser.GameObjects.Text,
    chipPoolText:Phaser.GameObjects.Text,
    publicCards:Phaser.GameObjects.Image[],
    Users : User[],
    DealerButtons: Phaser.GameObjects.Container[];
    Dealer: Phaser.GameObjects.Image;
    playerOffset:number;
    sliderContainer: Phaser.GameObjects.Container;
    sliderHandle:Phaser.GameObjects.Image;
    actionRaiseContainer:Phaser.GameObjects.Container;
    actionFoldContainer :Phaser.GameObjects.Container;
    actionCheckContainer :Phaser.GameObjects.Container;

    InitRoom(roomInfo: Room): void;

    getTargetIndex(seatNum: number): number;
    setCurrentUser(userID:string): void;
    hideActionMenu():void;
    showActionMenu(user:User):void;
    getUserByID(userID: string): User | undefined;
    SetCurrentBet(betType:number,betValue:number):void;
    setSlider(minChips:number,maxChips:number,currentChips:number):void;
    showPublicCard(lstIndex:number[], lstKey:string[], showBK:boolean, callback:()=>void):void;
    updatePot(pot:number):void;
}

