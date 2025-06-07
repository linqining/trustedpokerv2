
// You can write more code here

/* START OF COMPILED CODE */

import CardBackPrefab from "./CardBackPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class UserPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 449.8756830532577, y ?? 103.94060157132414);

		// user_box
		const user_box = scene.add.rectangle(62.77881089162656, 115.74967914480494, 128, 128);
		user_box.scaleX = 1.0257970460360888;
		user_box.scaleY = 1.7307571274850566;
		user_box.setOrigin(0.4795699426706248, 0.5204300573293752);
		user_box.isFilled = true;
		user_box.fillColor = 0;
		user_box.isStroked = true;
		this.add(user_box);

		// boy
		const boy = scene.add.image(63.12430191040039, 114.05939483642582, "boy");
		boy.name = "boy";
		boy.scaleX = 0.1;
		boy.scaleY = 0.1;
		boy.setOrigin(0.4789448687665644, 0.5315826968501549);
		this.add(boy);

		// action_text
		const action_text = scene.add.text(25.124302118189178, 5.059395115844794, "", {});
		action_text.name = "action_text";
		action_text.text = "Call";
		action_text.setStyle({ "color": "#ffffffff", "fontSize": "35px" });
		this.add(action_text);

		// chips
		const chips = scene.add.text(16.124302118189178, 178.05939511584478, "", {});
		chips.name = "chips";
		chips.text = "10000";
		chips.setStyle({ "color": "#ffffffff", "fontSize": "35px" });
		this.add(chips);

		// cardBackPrefab
		const cardBackPrefab = new CardBackPrefab(scene, 242, 79);
		cardBackPrefab.name = "cardBackPrefab";
		this.add(cardBackPrefab);

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
