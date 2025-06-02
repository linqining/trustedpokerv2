import { useRef, useState,useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
// import { MainMenu } from './game/scenes/MainMenu';
import {useCurrentAccount, ConnectButton} from "@mysten/dapp-kit";
import '../public/css/button.css'


function App()
{
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    const account = useCurrentAccount();

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [btnVisible, setBtnVisible] = useState(false);
    const actionLoginFunction = (scene_instance: Phaser.Scene) =>{
        setBtnVisible(true);
    };
    const connectBTNRef = useRef<HTMLDivElement>(null);
    
    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        setCanMoveSprite(scene.scene.key !== 'MainMenu');
    }
    
    useEffect(()=>{
        phaserRef.current?.game?.registry.set("current_account", account)
        if (account && account.address) {
            setBtnVisible(false);
            phaserRef.current?.game?.scene?.start('Table');
        }else{
            // setBtnVisible(true);
            console.log("no account ,return to preloader,scene",phaserRef.current?.game?.scene);
            if(phaserRef.current) {
                const game = phaserRef.current.game;
                if (game?.scene) {
                    game.scene.start("Preloader");
                }
            }
        }
    },[account])

    return (
        <div>
            <div id="app">
                <div ref={connectBTNRef} className="connect-button" style={{display: btnVisible ? 'block' : 'none' }}>
                    <ConnectButton className="connectBtn"/>
                </div>
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} account={account}
                            actionLogin={actionLoginFunction}/>
            </div>

        </div>
    )
}

export default App
