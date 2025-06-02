
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

		// op_btn_check
		const op_btn_check = this.add.container(969, 638);
		op_btn_check.name = "op_btn_check";

		// button_check
		const button_check = this.add.image(65.14567187550324, 22.269595152564364, "button_green");
		button_check.name = "button_check";
		button_check.scaleX = 0.15758130827137293;
		button_check.scaleY = 0.15758130827137293;
		op_btn_check.add(button_check);

		// check_text
		const check_text = this.add.text(16, 6, "", {});
		check_text.name = "check_text";
		check_text.text = "Check";
		check_text.setStyle({ "fontSize": "32px" });
		op_btn_check.add(check_text);

		// op_btn_fold_1
		const op_btn_fold_1 = this.add.container(818, 639);
		op_btn_fold_1.name = "op_btn_fold_1";

		// button_fold_1
		const button_fold_1 = this.add.image(62.812552081710464, 20.799078357486906, "button_red");
		button_fold_1.name = "button_fold_1";
		button_fold_1.scaleX = 0.15758130827137293;
		button_fold_1.scaleY = 0.15758130827137293;
		op_btn_fold_1.add(button_fold_1);

		// fold_text
		const fold_text = this.add.text(24.812552081710464, 3.7990783574869056, "", {});
		fold_text.name = "fold_text";
		fold_text.text = "Fold";
		fold_text.setStyle({ "fontSize": "32px" });
		op_btn_fold_1.add(fold_text);

		// op_btn_raise
		const op_btn_raise = this.add.container(1122, 639);
		op_btn_raise.name = "op_btn_raise";

		// button_raise
		const button_raise = this.add.image(65.14567187550324, 22.269595152564364, "button_yellow");
		button_raise.name = "button_raise";
		button_raise.scaleX = 0.15758130827137293;
		button_raise.scaleY = 0.15758130827137293;
		op_btn_raise.add(button_raise);

		// raise_text
		const raise_text = this.add.text(16, 6, "", {});
		raise_text.name = "raise_text";
		raise_text.text = "Raise";
		raise_text.setStyle({ "fontSize": "32px" });
		op_btn_raise.add(raise_text);

		// lists
		const list: Array<any> = [];

		this.list = list;

		this.events.emit("scene-awake");
	}

	private list!: Array<any>;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
