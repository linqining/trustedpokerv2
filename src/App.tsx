import { useRef, useState,useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
// import { MainMenu } from './game/scenes/MainMenu';
import {useCurrentAccount, ConnectButton, useSuiClient, useSignAndExecuteTransaction} from "@mysten/dapp-kit";

import '../public/css/button.css'
import {EventBus} from "./game/EventBus.ts";
import {Transaction} from "@mysten/sui/transactions";


function App() {
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
            if(phaserRef.current) {
                const game = phaserRef.current.game;
                if (game?.scene) {
                    game.scene.start("Preloader");
                }
            }
        }
    },[account])
    const client = useSuiClient();
    const PACKAGE = "0x63aeecd28b9bc9cf5476bac7a6ad3e62e5427c15f0a210335df271e75c89baa9";
    const GAMEDATAOBJID = "0x0a84bc3803250c79790245cf2c8ea8f74f9aa48efe5f40a30a205d9233cc5126";
    const GAME_TYPE = PACKAGE+"::mental_poker::PokerGame";
    
    const {mutate:signAndExecuteTransaction} = useSignAndExecuteTransaction();
    EventBus.removeListener('action_join_and_pay');
    EventBus.on('action_join_and_pay', (scene_instance: Phaser.Scene) =>{
        EventBus.emit('action_join_and_pay_success', scene_instance, "0x186f981d970d618f664d9e39fc8299d4ae28da74b075ec74c42b0b05a91a10eb",100000000);
        return 
        // scene_instance.scene.start('Game', {
        //     "game_id":'0xcf6537e367c51f8931a5f6e8852c868af187697abacfa0e0ec25d992430745ea',
        //     "chip_amount": 100000000,
        // })

        console.log("trigger join and pay")
        const tx = new Transaction()
        const betAmountCoin = tx.splitCoins(tx.gas, [
            0.1 * 1000000000,//0.1sui
        ]);
        tx.moveCall({
            package: PACKAGE,
            module: "mental_poker",
            function: "start_game",
            arguments: [
                betAmountCoin,
                tx.object(GAMEDATAOBJID),
            ]
        });
        const res =  signAndExecuteTransaction({transaction: tx},{
            onSuccess: async ({ digest }) => {
                const { effects,events,objectChanges } = await client.waitForTransaction({
                    digest: digest,
                    options: {
                        showEffects: true,
                        showObjectChanges: true,
                        showEvents: true,
                    },
                });
                console.log("effects",effects);
                console.log("events",events);
                console.log("object change",objectChanges);
                let  gameID =""
                if (events && events.length>0){
                    for (let i=0;i<events?.length;i++){
                        if (events[i].parsedJson && events[i].parsedJson.game_id) {
                            gameID = events[i].parsedJson.game_id;
                            console.log("found game id on event",gameID);
                            break;
                        }
                    }
                }
                if (gameID=="" && objectChanges && objectChanges.length>0){
                    for (let i=0;i<objectChanges.length;i++){
                        if (objectChanges[i]["objectType"] == GAME_TYPE) {
                            gameID = objectChanges[i]["objectId"];
                            console.log("found game id on objchange",gameID);
                            break;
                        }
                    }
                }
                console.log(gameID)
                EventBus.emit('action_join_and_pay_success', scene_instance, gameID,100000000);
                
                // if (gameID){
                //     scene_instance.scene.start('Game', {
                //         "game_id":gameID,
                //         "chip_amount": 100000000,
                //     })
                // }
            },
            onError: (error) => {
                console.log("Error = ", error);
            }
        });
        console.log("action_join_and_pay res",res)
    })

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
