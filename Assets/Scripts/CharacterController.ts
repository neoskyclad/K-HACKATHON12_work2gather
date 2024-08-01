import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayers, LocalPlayer } from 'ZEPETO.Character.Controller'
import { WorldService } from 'ZEPETO.World';

export default class CharacterController extends ZepetoScriptBehaviour {

    Start() {
        //특정 ID로 로드하기
        ZepetoPlayers.instance.CreatePlayerWithZepetoId("", "neoskyclad", new SpawnInfo(), true);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            const player: LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
        })

        //접속한 ID로 로드하기
        // ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);
        // ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
        //     const player: LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
        // })

    }

}