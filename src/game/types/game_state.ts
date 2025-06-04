
export interface GameState {
    roomID: string,
    bb:number,
    sb:number,
    bet: number,
    timeout:number,
    buttonPos:number,
    publicCardArr:string[];
    blindText:Phaser.GameObjects.Text,
    chipPoolText:Phaser.GameObjects.Text,
    publicCards:Phaser.GameObjects.Image[],
}

