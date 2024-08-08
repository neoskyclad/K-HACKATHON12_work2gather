import { GameObject, RectTransform } from 'UnityEngine';
import { UnityEvent } from 'UnityEngine.Events';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { RoundedRectangleButton, ZepetoText } from 'ZEPETO.World.Gui';
import TicketGameManager from './TicketGameManager';

enum TicketInfo {
    theaterName,
    theaterNum,
    movieName,
    screenTime,
}
export default class Ticket extends ZepetoScriptBehaviour {

    public ticketInfoObject: GameObject[];
    public seatInfoText: ZepetoText;

    private ticketInfoTextArray: ZepetoText[] = [null, null, null, null];
    private ticketInfoButtonArray: RoundedRectangleButton[] = [null, null, null, null];
    private ticketInfoUnderlineArray: GameObject[] = [null, null, null, null];
    private buttonEvent: UnityEvent[] = [null, null, null, null];

    private ticketGameManager: TicketGameManager;

    private VariationArray: string[][] = [
        ['기가박스(Gigavox) K-Hackerton 점', '지지브이(GGV) K-Hackerton 점', '', ''],
        ['1관(Laser)', '2관(Laser)', '3관(Laser)', '4관(Laser)'],
        ['아웃사이드인', '슈퍼 베프4', '', ''],
        ['17:35 ~ 20:05', '17:30 ~ 20:00', '', '']
    ];

    private VariationCount: number[] = [1, 3, 1, 1];    //Origin Count - 1

    @HideInInspector() public currInfoArray: string[] = ['', '', '', ''];
    private wrongInfoArray: boolean[] = [false, false, false, false];

    public selectedInfoArray: boolean[] = [false, false, false, false];
    private selectedCount: number = 0;

    Awake() {
        for (let i = 0; i < 4; i++) {
            this.ticketInfoTextArray[i] = this.ticketInfoObject[i].GetComponent<ZepetoText>();
            this.ticketInfoButtonArray[i] = this.ticketInfoObject[i].transform.GetChild(0).GetComponent<RoundedRectangleButton>();
            this.ticketInfoUnderlineArray[i] = this.ticketInfoObject[i].transform.GetChild(1).gameObject;
        }
    }

    Start() {
        this.ticketGameManager = GameObject.Find("TicketGameManager").GetComponent<TicketGameManager>();

        //Initialize Ticket Info Button
        for (let i = 0; i < 4; i++) {
            this.buttonEvent[i] = new UnityEvent();
            this.buttonEvent[i].AddListener(() => {
                //button function
                if (this.selectedInfoArray[i]) {
                    this.selectedInfoArray[i] = false;
                    this.ticketInfoUnderlineArray[i].SetActive(false);
                    this.selectedCount--;
                }
                else {
                    this.selectedInfoArray[i] = true;
                    this.ticketInfoUnderlineArray[i].SetActive(true);
                    this.selectedCount++;
                }
            });
            this.ticketInfoButtonArray[i].OnClick.AddListener(() => {
                if (this.buttonEvent[i] != null) {
                    this.buttonEvent[i].Invoke();
                }
            });
        }
    }

    Update() {
        if (this.selectedCount > 0) {
            this.ticketGameManager.EnableRejectButton();
        }
        else {
            this.ticketGameManager.DisableRejectButton();
        }
    }

    // SetTicketByParam(_theaterName: string, _movieName: string, _theaterNum: string, _screenTime: string): void {
    //     this.currTheaterName = _theaterName;
    //     this.currMovieName = _movieName;
    //     this.currTheaterNum = _theaterNum;
    //     this.currScreenTime = _screenTime;
    //     this.round = _round;
    //     this.dimension = _dimension;
    //     this.age = _age;
    // }

    SetButtonWidth() {

    }

    SetUnderlineWidth() {

    }

    SetTicketByWrongCount(wrongCount: number) {
        let caseRand: number = 0;

        for (let i = 0; i < 4; i++)
            this.wrongInfoArray[i] = false;

        //hard code
        switch (wrongCount) {
            case 0:
                break;
            case 1:
                caseRand = Math.floor(Math.random() * 4);
                switch (caseRand) {
                    case 0:
                        this.wrongInfoArray[TicketInfo.theaterName] = true;
                        break;
                    case 1:
                        this.wrongInfoArray[TicketInfo.theaterNum] = true;
                        break;
                    case 2:
                        this.wrongInfoArray[TicketInfo.movieName] = true;
                        break;
                    case 3:
                        this.wrongInfoArray[TicketInfo.screenTime] = true;
                        break;
                }
                break;
            case 2:
                caseRand = Math.floor(Math.random() * 6);
                switch (caseRand) {
                    case 0:
                        this.wrongInfoArray[TicketInfo.theaterName] = true;
                        this.wrongInfoArray[TicketInfo.theaterNum] = true;
                        break;
                    case 1:
                        this.wrongInfoArray[TicketInfo.theaterName] = true;
                        this.wrongInfoArray[TicketInfo.movieName] = true;
                        break;
                    case 2:
                        this.wrongInfoArray[TicketInfo.theaterName] = true;
                        this.wrongInfoArray[TicketInfo.screenTime] = true;
                        break;
                    case 3:
                        this.wrongInfoArray[TicketInfo.theaterNum] = true;
                        this.wrongInfoArray[TicketInfo.movieName] = true;
                        break;
                    case 4:
                        this.wrongInfoArray[TicketInfo.theaterNum] = true;
                        this.wrongInfoArray[TicketInfo.screenTime] = true;
                        break;
                    case 5:
                        this.wrongInfoArray[TicketInfo.movieName] = true;
                        this.wrongInfoArray[TicketInfo.screenTime] = true;
                        break;
                }
                break;
            case 3:
                for (let i = 0; i < 4; i++)
                    this.wrongInfoArray[i] = true;

                caseRand = Math.floor(Math.random() * 4);
                switch (caseRand) {
                    case 0:
                        this.wrongInfoArray[TicketInfo.theaterName] = false;
                        break;
                    case 1:
                        this.wrongInfoArray[TicketInfo.theaterNum] = false;
                        break;
                    case 2:
                        this.wrongInfoArray[TicketInfo.movieName] = false;
                        break;
                    case 3:
                        this.wrongInfoArray[TicketInfo.screenTime] = false;
                        break;
                }
                break;
            case 4:
                for (let i = 0; i < 4; i++)
                    this.wrongInfoArray[i] = true;
                break;
            default:
                break;
        }

        for (let i = 0; i < 4; i++) {
            if (this.wrongInfoArray[i]) {
                this.currInfoArray[i] = this.VariationArray[i][Math.floor(Math.random() * this.VariationCount[i]) + 1];
                this.ticketInfoTextArray[i].text = this.currInfoArray[i];
            }
            else {
                this.currInfoArray[i] = this.VariationArray[i][0];
                this.ticketInfoTextArray[i].text = this.currInfoArray[i];
            }
        }

        // //random seat number
        var asciiNum = Math.floor(Math.random() * 16) + 65;
        let seatCol: string = String.fromCharCode(asciiNum);
        let seatRow: string = this.pad(Math.floor(Math.random() * 27) + 1);
        this.seatInfoText.text = `${seatCol}열 ${seatRow}번`;

        //Initialize Underline
        this.SetUnderlineWidth();

        for (let i = 0; i < 4; i++) {
            this.ticketInfoUnderlineArray[i].SetActive(false);
            this.selectedInfoArray[i] = false;
        }
        this.selectedCount = 0;
    }

    private pad(num: number): string {
        return num.toString().padStart(3, '0');
    }
}