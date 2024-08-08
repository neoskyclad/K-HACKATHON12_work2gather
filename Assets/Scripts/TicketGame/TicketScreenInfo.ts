import { ContextMenu } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoText } from 'ZEPETO.World.Gui';

enum TicketInfo {
    theaterName,
    theaterNum,
    movieName,
    screenTime,
}

export default class TicketScreenInfo extends ZepetoScriptBehaviour {

    @SerializeField() private screenInfoText: ZepetoText;
    public screenInfo: string[] = ['', '', '', ''];

    private round: string;
    private dimension: string; //2D, 3D, 4D 여부
    private age: string;
    private date: string;
    
    SetScreenInfo(_theaterName: string, _theaterNum: string, _movieName: string, _screenTime: string) {
        this.screenInfo[TicketInfo.theaterName] = _theaterName;
        this.screenInfo[TicketInfo.theaterNum] = _theaterNum;
        this.screenInfo[TicketInfo.movieName] = _movieName;
        this.screenInfo[TicketInfo.screenTime] = _screenTime;

        // this.screenInfoText.text = `${this.movieName} + ' | ' + ${this.theaterNum} + ' | ' +
        // ${this.round} + ' | ' + ${this.dimension} + ', ' + ${this.age}`;
    }
}