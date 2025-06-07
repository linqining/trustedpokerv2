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
    DealerButtons: Phaser.GameObjects.Image[];
    Dealer: Phaser.GameObjects.Image;
    playerOffset:number;
    sliderContainer: Phaser.GameObjects.Container;
    actionRaise:Phaser.GameObjects.Container;
    actionFold :Phaser.GameObjects.Container;
    actionCheck :Phaser.GameObjects.Container;

    InitRoom(roomInfo: Room): void;

    getTargetIndex(seatNum: number): number;
    setCurrentUser(userID:string): void;
    hideActionMenu():void;
    showActionMenu():void;
    getUserByID(userID: string): User | undefined;
}

