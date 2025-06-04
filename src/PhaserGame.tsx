import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './game/main';
import { EventBus } from './game/EventBus';
import type {WalletAccount} from "@mysten/wallet-standard";

export interface IRefPhaserGame
{
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps
{
    currentActiveScene?: (scene_instance: Phaser.Scene) => void
    account?: WalletAccount|null
    actionLogin?: (scene_instance: Phaser.Scene) => void
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene,account,actionLogin }, ref)
{
    const game = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() =>
    {
        if (game.current === null)
        {

            game.current = StartGame("game-container");

            if (typeof ref === 'function')
            {
                ref({ game: game.current, scene: null });
            } else if (ref)
            {
                ref.current = { game: game.current, scene: null };
            }

        }
        game.current.registry.set("current_account", account);
        return () =>
        {
            if (game.current)
            {
                game.current.destroy(true);
                if (game.current !== null)
                {
                    game.current = null;
                }
            }
        }
    }, [ref]);

    useEffect(() =>
    {
        EventBus.on("action_login", (scene_instance: Phaser.Scene) =>{
            console.log("get action login ");
            actionLogin? actionLogin(scene_instance) : null;
            // EventBus.removeListener('action_login');
        });
        EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) =>
        {
            console.log("current-scene-ready event");
            if (currentActiveScene && typeof currentActiveScene === 'function')
            {

                currentActiveScene(scene_instance);

            }

            if (typeof ref === 'function')
            {
                ref({ game: game.current, scene: scene_instance });
            } else if (ref)
            {
                ref.current = { game: game.current, scene: scene_instance };
            }
            
        });

        return () => {
            EventBus.removeListener('current-scene-ready');
        }
    }, [currentActiveScene, ref,actionLogin]);

    return (
        <div id="game-container"></div>
    );

});
