
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CardBackPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 513.1318403812006, y ?? 316.6430869529557);

		// container_2
		const container_2 = scene.add.container(-53.13184038120062, 8.356913047044316);
		this.add(container_2);

		// card_back_0
		const card_back_0 = scene.add.image(1, 0, "card_back_0");
		card_back_0.scaleX = 0.2;
		card_back_0.scaleY = 0.2;
		card_back_0.angle = -15;
		container_2.add(card_back_0);

		// card_back
		const card_back = scene.add.image(113, 0, "card_back_0");
		card_back.scaleX = 0.2;
		card_back.scaleY = 0.2;
		card_back.angle = 15;
		container_2.add(card_back);

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
