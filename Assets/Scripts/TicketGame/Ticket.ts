import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoText } from 'ZEPETO.World.Gui';

export default class Ticket extends ZepetoScriptBehaviour {

    @SerializeField() private screenInfoText: ZepetoText;
    private movieName: string;
    private theaterNum: string;
    private round: string;
    private dimension: string; //2D, 3D, 4D 여부
    private age: string;

    SetTicket(_movieName: string, _theaterNum: string, _round: string, _dimension: string, _age: string, random: number): void {
        this.movieName = _movieName;
        this.theaterNum = _theaterNum;
        this.round = _round;
        this.dimension = _dimension;
        this.age = _age;
    }

}