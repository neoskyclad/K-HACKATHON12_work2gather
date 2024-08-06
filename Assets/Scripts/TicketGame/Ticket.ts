import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoText } from 'ZEPETO.World.Gui';

export default class Ticket extends ZepetoScriptBehaviour {

    @SerializeField() private screenInfoText: ZepetoText;
    private theaterName: string;
    private movieName: string;
    private theaterNum: string;
    private screenTime: string;
    // private round: string;
    // private dimension: string; //2D, 3D, 4D 여부
    // private age: string;

    SetTicket(_theaterName:string, _movieName: string, _theaterNum: string, _screenTime: string, random: number): void {
        this.theaterName = _theaterName;
        this.movieName = _movieName;
        this.theaterNum = _theaterNum;
        this.screenTime = _screenTime;
        // this.round = _round;
        // this.dimension = _dimension;
        // this.age = _age;
    }

}