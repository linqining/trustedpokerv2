
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class bet_coin extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 473.7673684369045, y ?? 384.93599283381764);

		// dealer
		const dealer = scene.add.image(69.86551890656597, 76.7853424419178, "dealer");
		dealer.name = "dealer";
		dealer.scaleX = 0.3148679647230205;
		dealer.scaleY = 0.3148679647230205;
		this.add(dealer);

		// sb
		const sb = scene.add.image(73.02166189140792, 73.15689750999132, "chip_smallblind_top");
		sb.name = "sb";
		this.add(sb);

		// bb
		const bb = scene.add.image(73.02166189140792, 73.15689750999132, "chip_bigblind_top");
		bb.name = "bb";
		this.add(bb);

		// bet_coin
		const bet_coin = scene.add.image(73.02166189140792, 73.15689750999132, "chip_green_top");
		bet_coin.name = "bet_coin";
		this.add(bet_coin);

		// bet_txt
		const bet_txt = scene.add.text(149.2326261451974, 7.656897509991325, "", {});
		bet_txt.name = "bet_txt";
		bet_txt.text = "1000000";
		bet_txt.setStyle({ "fontSize": "131px" });
		this.add(bet_txt);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
