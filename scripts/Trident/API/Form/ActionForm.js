import { ActionFormData, FormCancelationReason } from "@minecraft/server-ui";
export class ActionForm {
    constructor() {
        this.buttons = [];
    }
    /**
     * Sets the action form's title
     * @param text The title's text
     */
    setTitle(text) {
        this.title = text;
        return this;
    }
    /**
     * Sets the action form's body
     * @param text The body's text
     */
    setBody(text) {
        this.body = text;
        return this;
    }
    /**
     * Adds a button to the action form
     * @param text The button's text
     * @param image The button's image
     * @param pressed The function to execute when this button is pressed
     */
    addButton(text, image, pressed) {
        this.buttons.push({ text, image: image, pressed });
        return this;
    }
    onUserCancel(call) {
        this.onCancel = call;
        return this;
    }
    send(player, force = true, tries = 100) {
        const gui = new ActionFormData();
        if (this?.title)
            gui.title(this.title);
        if (this.body)
            gui.body(this.body);
        if (!this.buttons.length)
            throw Error(`ActionForm doesn't have required property: buttons`);
        for (const button of this.buttons) {
            gui.button(button.text, button.image);
        }
        let tryTimes = 0;
        function show(handler) {
            console.warn(tryTimes);
            gui.show(player).then(res => {
                if (res.canceled) {
                    if (res.cancelationReason === FormCancelationReason.UserBusy && force && tryTimes !== tries) {
                        tryTimes += 1;
                        return show(handler);
                    }
                    if (this?.onCancel)
                        handler.onCancel(player, res.cancelationReason);
                    return;
                }
                const button = handler.buttons[res.selection];
                button.pressed(player);
            });
        }
        show(this);
    }
}
