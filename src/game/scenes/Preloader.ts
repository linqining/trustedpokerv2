// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

import {EventBus} from "../EventBus.ts";

export default class Preloader extends Phaser.Scene {

	constructor() {
		super("Preloader");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	preload(): void {

		this.load.pack("boot-asset-pack", "assets/boot-asset-pack.json");
	}

	editorCreate(): void {

		// shuffing
		const shuffing = this.add.image(0, 0, "shuffing");
		shuffing.scaleX = 1.4415829812855638;
		shuffing.scaleY = 1.444319331210211;
		shuffing.setOrigin(0, 0);

		// loading_container
		const loading_container = this.add.container(639, 425);
		loading_container.name = "loading_container";

		// loading_main
		const loading_main = this.add.image(8.113136826998641, -3.2021803722523146, "loading_main");
		loading_main.scaleX = 0.6599700446728418;
		loading_main.scaleY = 0.6887199459947883;
		loading_container.add(loading_main);

		// loading_complete
		const loading_complete = this.add.image(-201.88686555718715, -27.202180372252315, "loading_complete");
		loading_complete.name = "loading_complete";
		loading_complete.scaleX = 0.635894603121304;
		loading_complete.scaleY = 0.635894603121304;
		loading_complete.visible = false;
		loading_container.add(loading_complete);

		// progress_text
		const progress_text = this.add.text(87.11312156820958, -70.20218037225231, "", {});
		progress_text.name = "progress_text";
		progress_text.text = "0";
		progress_text.setStyle({ "color": "#ce302e", "fontSize": "32px" });
		loading_container.add(progress_text);

		// progress_bar
		const progress_bar = this.add.rectangle(-340.89, 28.797819627747685, 128, 128);
		progress_bar.name = "progress_bar";
		progress_bar.scaleX = 5.472706338490127;
		progress_bar.scaleY = 0.23948907841859302;
		progress_bar.setOrigin(0.002683208212025223, 0.5);
		progress_bar.isFilled = true;
		progress_bar.fillColor = 13512750;
		loading_container.add(progress_bar);

		// loading_text
		const loading_text = this.add.text(-328.88686317300136, -36.202180372252315, "", {});
		loading_text.name = "loading_text";
		loading_text.text = "Loading...";
		loading_text.setStyle({ "color": "#ce302e", "fontSize": "32px" });
		loading_container.add(loading_text);

		// login_container
		const login_container = this.add.container(546, 429);
		login_container.name = "login_container";
		login_container.visible = false;

		// login_btn
		const login_btn = this.add.image(93.32542552044305, 25.899244946333, "button_red");
		login_btn.name = "login_btn";
		login_btn.scaleX = 0.2325799507546315;
		login_btn.scaleY = 0.2325799507546315;
		login_container.add(login_btn);

		// login
		const login = this.add.text(45.32542552044305, 6.899244946332999, "", {});
		login.text = "Login";
		login.setStyle({ "fontSize": "32px" });
		login_container.add(login);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here
    init () {
    }
    private timerEventProgress: Phaser.Time.TimerEvent | null = null;

    loadingEffect(){
        const container = this.scene.scene.children.getByName("loading_container") as Phaser.GameObjects.Container;
        const percentText = container.getByName('progress_text') as Phaser.GameObjects.Text;

        const progressBar = container.getByName("progress_bar") as Phaser.GameObjects.Rectangle;

        const that = this;
        let count =0
        const width = progressBar.width;
        const tick =50;
        this.timerEventProgress = this.time.addEvent({
            delay: 20,         // 间隔 1 秒
            callback: () =>  {
                count++;
                percentText.setText(count * 100/tick + "");
                progressBar.width =  (width * count/tick);
                if(count >= tick) {
                    if (this.timerEventProgress){
                        this.time.removeEvent(this.timerEventProgress);
                    }
                    this.time.addEvent({
                        delay: 500,
                        callback:()=>{
                            container.visible = false;
                            // const login_container = this.scene.scene.children.getByName("login_container") as Phaser.GameObjects.Container;
                            console.log("current_account",this.registry.get("current_account"))
                            const current_account =  this.registry.get("current_account");
                            if (current_account && current_account.address ) {
                                this.scene.start('Table');
                            }else{
                                EventBus.emit("action_login", that);
                            }
                        },
                    })
                }
            },
            loop: true           // 无限循环
        })
    }


    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.

        this.editorCreate();
        this.loadingEffect();
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
