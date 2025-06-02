// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

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
		const loading_container = this.add.container(700, 425);
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
		progress_bar.visible = false;
		progress_bar.isFilled = true;
		progress_bar.fillColor = 13512750;
		loading_container.add(progress_bar);

		// loading_text
		const loading_text = this.add.text(-328.88686317300136, -36.202180372252315, "", {});
		loading_text.name = "loading_text";
		loading_text.text = "Loading...";
		loading_text.setStyle({ "color": "#ce302e", "fontSize": "32px" });
		loading_container.add(loading_text);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here
    init () {

		this.editorCreate();
        console.log(this)
        const container = this.scene.scene.children.getByName("loading_container") as Phaser.GameObjects.Container;

        const progressBar = container.getByName('progress_bar') as Phaser.GameObjects.Rectangle;
        this.loadingEffect();

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(progressBar.x+container.x, progressBar.y+container.y, 0, 29, 13512750)
        bar.setOrigin(0,0.5);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width =  (700 * progress);
            if (progress>=1){
                // bar.destroy();
            }
        });
    }

    loadingEffect(){
        const container = this.scene.scene.children.getByName("loading_container") as Phaser.GameObjects.Container;


        // const width = this.cameras.main.width;
        // const height = this.cameras.main.height;


        const percentText = container.getByName('progress_text') as Phaser.GameObjects.Text;


        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) );
        });



        const load_complete = container.getByName('loading_complete') as Phaser.GameObjects.Image;
        const loading_text = container.getByName("loading_text") as Phaser.GameObjects.Text;
        this.load.on('complete', function () {
            loading_text.visible = false;
            load_complete.visible =true;

        });


        this.load.image('logo', 'zenvalogo.png');
        for (let i = 0; i < 2000; i++) {
            this.load.image('logo'+i, 'zenvalogo.png');
        }
    }


    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.

        // if (!this.registry.get("current_account") ) {
        //     this.login = this.add.image(512, 550   , 'guest_login');
        //     this.login.displayHeight= 50;
        //     this.login.displayWidth = 150;
        //     EventBus.removeListener("action_login")
        //     this.login.setInteractive().on("pointerdown", () => {
        //         console.log('图片被点击');
        //         EventBus.emit('action_login', this);
        //     })
        // }else{
        //     this.scene.start('Hall');
        // }

        // this.scene.start('Table');
        // this.time.addEvent({
        //     delay: 2000,
        //     callback: () => {
        //         this.scene.start('Table');
        //     },
        // })
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
