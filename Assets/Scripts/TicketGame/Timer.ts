import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoText } from 'ZEPETO.World.Gui'
import { WaitForSeconds } from 'UnityEngine';

export default class Timer extends ZepetoScriptBehaviour {

    @SerializeField() private timerText: ZepetoText;
    @SerializeField() private timerSec: number;
    private min: int;
    private sec: int;

    StartTimer(_timerSec: number): void {
        this.timerSec = _timerSec;
        this.StartCoroutine(this.DoStartTimer());
    }

    private pad(num: number): string {
        return num.toString().padStart(2, '0');
    }

    *DoStartTimer() {
        let tempText: string = '0:00';
        while (this.timerSec >= 0) {
            this.min = Math.floor(this.timerSec / 60);
            this.sec = this.timerSec % 60;

            tempText = `${this.min}:${this.pad(this.sec)}`;
            this.timerText.text = tempText;

            yield new WaitForSeconds(1);
            this.timerSec--;
        }
        this.timerSec = 0;
        console.log("Timer Stopped");
    }
}