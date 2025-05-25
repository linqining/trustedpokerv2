
// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab";
import UserPrefab from "../prefabs/UserPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Table extends Phaser.Scene {

	constructor() {
		super("Table");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// texas_bg
		const texas_bg = new BackgroundPrefab(this, 0, 0);
		this.add.existing(texas_bg);

		// user1
		const user1 = new UserPrefab(this, 553, 516);
		this.add.existing(user1);
		user1.scaleX = 0.5;
		user1.scaleY = 0.5;

		// user2
		const user2 = new UserPrefab(this, 176, 463);
		this.add.existing(user2);
		user2.scaleX = 0.5;
		user2.scaleY = 0.5;
		user2.visible = false;

		// user9
		const user9 = new UserPrefab(this, 931, 471);
		this.add.existing(user9);
		user9.scaleX = 0.5;
		user9.scaleY = 0.5;
		user9.visible = false;

		// user3
		const user3 = new UserPrefab(this, 81, 300);
		this.add.existing(user3);
		user3.scaleX = 0.5;
		user3.scaleY = 0.5;
		user3.visible = false;

		// user8
		const user8 = new UserPrefab(this, 1047, 290);
		this.add.existing(user8);
		user8.scaleX = 0.5;
		user8.scaleY = 0.5;
		user8.visible = false;

		// user5
		const user5 = new UserPrefab(this, 388, 35);
		this.add.existing(user5);
		user5.scaleX = 0.5;
		user5.scaleY = 0.5;
		user5.visible = false;

		// user6
		const user6 = new UserPrefab(this, 745, 27);
		this.add.existing(user6);
		user6.scaleX = 0.5;
		user6.scaleY = 0.5;
		user6.visible = false;

		// user4
		const user4 = new UserPrefab(this, 139, 113);
		this.add.existing(user4);
		user4.scaleX = 0.5;
		user4.scaleY = 0.5;
		user4.visible = false;

		// user7
		const user7 = new UserPrefab(this, 987, 116);
		this.add.existing(user7);
		user7.scaleX = 0.5;
		user7.scaleY = 0.5;
		user7.visible = false;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
