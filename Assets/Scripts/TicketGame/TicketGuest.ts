import { Color, Texture, WaitForSeconds } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { RoundedRectangle } from 'ZEPETO.World.Gui'

export default class TicketGuest extends ZepetoScriptBehaviour {

    @SerializeField() private currImage: RoundedRectangle;

    public imageArray: Texture[];

    SetImageByRandom() {
        const rand = Math.floor(Math.random() * this.imageArray.length);

        this.currImage.Texture = this.imageArray[rand];
    }

    SetImageByIndex(_index: number) {
        this.currImage.Texture = this.imageArray[_index];
    }

    FadeImageIn() {
        if (this.currImage.Texture != null)
            this.StartCoroutine(this.DoFadeImageIn());
    }

    *DoFadeImageIn() {
        this.currImage.color.a = 0;

        for (let i = 0; i <= 1; i += 0.1) {
            const newColor = this.currImage.color;
            newColor.a = i;
            this.currImage.color = newColor;
            yield new WaitForSeconds(0.02);
        }

        this.currImage.color.a = 1;
    }

    FadeImageOut() {
        if (this.currImage.Texture != null)
            this.StartCoroutine(this.DoFadeImageOut());
    }

    *DoFadeImageOut() {
        this.currImage.color.a = 1;

        for (let i = 1; i >= 0; i -= 0.1) {
            const newColor = this.currImage.color;
            newColor.a = i;
            this.currImage.color = newColor;
            yield new WaitForSeconds(0.02);
        }

        this.currImage.color.a = 0;
    }
}