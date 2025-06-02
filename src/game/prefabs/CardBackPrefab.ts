
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CardBackPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 513.1318403812006, y ?? 316.6430869529557);

		// container_4
		const container_4 = scene.add.container(-53.1318359375, 8.356903076171875);
		this.add(container_4);

		// container_2
		const container_2 = scene.add.container(0, 0);
		container_4.add(container_2);

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

		// container_3
		const container_3 = scene.add.container(60.1318359375, 95.64309692382812);
		container_4.add(container_3);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(2, 0, 128, 128);
		rectangle_1.scaleX = 1.6045496848837597;
		rectangle_1.scaleY = 0.4039750558130919;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 1710618;
		rectangle_1.fillAlpha = 0.84;
		container_3.add(rectangle_1);

		// text_1
		const text_1 = scene.add.text(0, 3, "", {});
		text_1.setOrigin(0.49219651128488223, 0.5437108507992799);
		text_1.tintFill = true;
		text_1.text = "High Card";
		text_1.setStyle({ "fontSize": "35px" });
		container_3.add(text_1);

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
