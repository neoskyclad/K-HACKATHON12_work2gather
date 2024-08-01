import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { ZepetoWorldMultiplay } from 'ZEPETO.World';
import { Room } from 'ZEPETO.Multiplay';

export default class MultiplaySample extends ZepetoScriptBehaviour {

    private _multiplay: ZepetoWorldMultiplay;

    Start() {
        this._multiplay = this.gameObject.GetComponent<ZepetoWorldMultiplay>();

        this._multiplay.RoomJoined += (room: Room) => {
            console.log(`RoomCreated, my session id is ${room.SessionId}`);

            // Send message to server
            room.Send("echo", "hello ZEPETO Multiplay");

            // Add server message listener
            room.AddMessageHandler("echo", (message) => {
                // Print server message
                console.log(message);
            });
        };
    }
}