import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import TicketGuest from './TicketGuest';
import Timer from './Timer';
import TicketScreenInfo from './TicketScreenInfo';
import { GameObject } from 'UnityEngine';
import Ticket from './Ticket';

export default class TicketGameManager extends ZepetoScriptBehaviour {

    public timerObject: GameObject;
    public ticketGuestObject: GameObject;
    public ticketScreenInfoObject: GameObject;
    public ticketObject: GameObject;

    private timer: Timer;
    private ticketGuest: TicketGuest;
    private ticketScreenInfo: TicketScreenInfo;
    private ticket: Ticket;

    public timerSec: number = 60;

    Awake() {
        this.timer = this.timerObject.GetComponent<Timer>();
        this.ticketGuest = this.ticketGuestObject.GetComponent<TicketGuest>();
        this.ticketScreenInfo = this.ticketScreenInfoObject.GetComponent<TicketScreenInfo>();
        this.ticket = this.ticketObject.GetComponent<Ticket>();
    }

    Start() {    
        this.timer.StartTimer(this.timerSec);
    }

}