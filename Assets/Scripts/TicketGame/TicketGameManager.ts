import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import TicketGuest from './TicketGuest';
import Timer from './Timer';
import TicketScreenInfo from './TicketScreenInfo';
import { GameObject } from 'UnityEngine';
import Ticket from './Ticket';
import { UnityEvent } from 'UnityEngine.Events';
import { RoundedRectangleButton, ZepetoText } from 'ZEPETO.World.Gui';
export default class TicketGameManager extends ZepetoScriptBehaviour {

    public acceptButtonObject: GameObject;
    public rejectButtonObject: GameObject;
    public timerObject: GameObject;
    public ticketGuestObject: GameObject;
    public ticketScreenInfoObject: GameObject;
    public ticketObject: GameObject;

    public scoreText: ZepetoText;

    private timer: Timer;
    private ticketGuest: TicketGuest;
    private ticketScreenInfo: TicketScreenInfo;
    private ticket: Ticket;

    private acceptButton: RoundedRectangleButton;
    private rejectButton: RoundedRectangleButton;
    private acceptEvent: UnityEvent;
    private rejectEvent: UnityEvent;

    public timerSec: number = 60;
    public currScore: number = 0;

    Awake() {
        this.timer = this.timerObject.GetComponent<Timer>();
        this.ticketGuest = this.ticketGuestObject.GetComponent<TicketGuest>();
        this.ticketScreenInfo = this.ticketScreenInfoObject.GetComponent<TicketScreenInfo>();
        this.ticket = this.ticketObject.GetComponent<Ticket>();
        this.acceptButton = this.acceptButtonObject.GetComponent<RoundedRectangleButton>();
        this.rejectButton = this.rejectButtonObject.GetComponent<RoundedRectangleButton>();
    }

    Start() {
        //Initialize Button Event
        this.acceptEvent = new UnityEvent();
        this.rejectEvent = new UnityEvent();

        this.acceptEvent.AddListener(() => this.AcceptGuest());
        this.rejectEvent.AddListener(() => this.RejectGuest());

        this.acceptButton.OnClick.AddListener(() => {
            if (this.acceptEvent != null) {
                this.acceptEvent.Invoke();
            }
        });
        this.rejectButton.OnClick.AddListener(() => {
            if (this.rejectEvent != null) {
                this.rejectEvent.Invoke();
            }
        });

        this.timer.StartTimer(this.timerSec);       //Set Timer
        this.ticketScreenInfo.SetScreenInfo("기가박스(Gigavox) K-Hackerton 점", "1관(Laser)", "아웃사이드인", "17:35 ~ 20:05");
        this.SetNewGuest();                         //Set New Guest
    }

    SetNewGuest() {
        const wrongRand = Math.floor(Math.random() * 4);

        this.ticketGuest.SetImageByRandom();
        this.ticketGuest.FadeImageIn();
        this.ticket.SetTicketByWrongCount(wrongRand);
    }

    AcceptGuest() {
        if (this.CheckDecision(true)) {
            this.ticketGuest.FadeImageOut();
            this.currScore++;
            this.scoreText.text = `${this.currScore}`;
            this.SetNewGuest(); //Add Listener
        }
        else {
            this.ticketGuest.FadeImageOut();
            this.currScore--;
            this.scoreText.text = `${this.currScore}`;
            this.SetNewGuest(); //Add Listener
        }
    }

    RejectGuest() {
        if (this.CheckDecision(false)) {
            this.ticketGuest.FadeImageOut();
            this.currScore++;
            this.scoreText.text = `${this.currScore}`;
            this.SetNewGuest(); //Add Listener
        }
        else {
            this.ticketGuest.FadeImageOut();
            this.currScore--;
            this.scoreText.text = `${this.currScore}`;
            this.SetNewGuest(); //Add Listener
        }
    }

    EnableRejectButton() {
        this.rejectButton.gameObject.SetActive(true);
    }

    DisableRejectButton() {
        this.rejectButton.gameObject.SetActive(false);
    }

    CheckDecision(decision: boolean): boolean {
        let result = false;
        let correctCount = 4;

        if (decision)    //If Player accepted
        {
            for (let i = 0; i < 4; i++) {
                if (this.ticketScreenInfo.screenInfo[i] != this.ticket.currInfoArray[i])
                    continue;
                if(this.ticket.selectedInfoArray[i])
                    continue;
                correctCount--;
            }

            if (correctCount == 0)
                result = true;
        }
        else {
            for (let i = 0; i < 4; i++) {
                if (this.ticketScreenInfo.screenInfo[i] == this.ticket.currInfoArray[i])
                    continue;
                if (!this.ticket.selectedInfoArray[i])
                    continue;
                
                correctCount--;
            }

            if (correctCount != 4)
                result = true;
        }

        return result;
    }

}