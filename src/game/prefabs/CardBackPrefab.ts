
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CardBackPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 513.1318403812006, y ?? 316.6430869529557);

		// card_and_strength
		const card_and_strength = scene.add.container(-53.1318359375, 8.356903076171875);
		card_and_strength.name = "card_and_strength";
		this.add(card_and_strength);

		// cards_container
		const cards_container = scene.add.container(0, 0);
		cards_container.name = "cards_container";
		card_and_strength.add(cards_container);

		// card_back_1
		const card_back_1 = scene.add.image(1, 0, "card_back_0");
		card_back_1.name = "card_back_1";
		card_back_1.scaleX = 0.2;
		card_back_1.scaleY = 0.2;
		card_back_1.angle = -15;
		cards_container.add(card_back_1);

		// card_back_2
		const card_back_2 = scene.add.image(113, 0, "card_back_0");
		card_back_2.name = "card_back_2";
		card_back_2.scaleX = 0.2;
		card_back_2.scaleY = 0.2;
		card_back_2.angle = 15;
		cards_container.add(card_back_2);

		// strength_container
		const strength_container = scene.add.container(60.1318359375, 95.64309692382812);
		strength_container.name = "strength_container";
		card_and_strength.add(strength_container);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(2, 0, 128, 128);
		rectangle_1.scaleX = 1.6045496848837597;
		rectangle_1.scaleY = 0.4039750558130919;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;
		rectangle_1.fillAlpha = 0.84;
		strength_container.add(rectangle_1);

		// vignetteFx
		rectangle_1.postFX!.addVignette(0.5, 0.5, 0.5, 0.4);

		// strength_text
		const strength_text = scene.add.text(0, 3, "", {});
		strength_text.name = "strength_text";
		strength_text.setOrigin(0.49219651128488223, 0.5437108507992799);
		strength_text.tintFill = true;
		strength_text.text = "High Card";
		strength_text.setStyle({ "fontSize": "35px" });
		strength_container.add(strength_text);

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
