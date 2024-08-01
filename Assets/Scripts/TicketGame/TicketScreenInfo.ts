import { ContextMenu } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoText } from 'ZEPETO.World.Gui';

export default class TicketScreenInfo extends ZepetoScriptBehaviour {

    @SerializeField() private screenInfoText: ZepetoText;
    private movieName: string;
    private theaterNum: string;
    private round: string;
    private dimension: string; //2D, 3D, 4D 여부
    private age: string;

    SetScreenInfo(_movieName: string, _theaterNum: string, _round: string, _dimension: string, _age: string): void {
        this.movieName = _movieName;
        this.theaterNum = _theaterNum;
        this.round = _round;
        this.dimension = _dimension;
        this.age = _age;

        this.screenInfoText.text = `${this.movieName} + ' | ' + ${this.theaterNum} + ' | ' +
        ${this.round} + ' | ' + ${this.dimension} + ', ' + ${this.age}`;
    }
}