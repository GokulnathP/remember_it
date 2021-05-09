import Component from "../Component/Component";
import template from "./reminderForm.template";
import Reminder from "../../models/Reminder";
import AutoBind from "../../decorators/AutoBind";
import ReminderState from "../../state/ReminderState";
import Backdrop from "../Backdrop/Backdrop";
import randomString from "../../utils/randomString";

import "./reminderForm.scss";

class ReminderForm extends Component<HTMLDivElement, HTMLFormElement> {
    private titleInput: HTMLInputElement | null = null;
    private linkInput: HTMLInputElement | null = null;
    private backdrop: Backdrop;

    constructor(hostId: string, private reminder?: Reminder) {
        super(hostId, "form");
        this.backdrop = new Backdrop(hostId, this.destroy);

        this.renderContent();
        this.configure();
    }

    @AutoBind
    submitHandler(event: Event) {
        event.preventDefault();
        let reminder: Reminder;

        if (this.reminder) {
            reminder = new Reminder(this.reminder.id, this.titleInput!.value, this.linkInput!.value, this.reminder.favorite);
            ReminderState.updateReminder(reminder);
        } else {
            reminder = new Reminder(randomString(), this.titleInput!.value, this.linkInput!.value);
            ReminderState.addReminder(reminder);
        }

        this.destroy();
    }

    configure(): void {
        this.element.addEventListener("submit", this.submitHandler);
        this.element.querySelector("#reminder-form-cancel")!.addEventListener("click", this.destroy);
    }

    renderContent(): void {
        this.element.id = 'reminder-form';
        this.element.innerHTML = template;
        this.titleInput = this.element.querySelector("#title-input") as HTMLInputElement;
        this.linkInput = this.element.querySelector("#link-input") as HTMLInputElement;

        if (this.reminder) {
            this.element.querySelector("h2")!.textContent = "Edit Reminder";
            this.titleInput.value = this.reminder.title;
            this.linkInput.value = this.reminder.link;
        } else {
            this.element.querySelector("h2")!.textContent = "New Reminder";
        }
    }

    @AutoBind
    destroy() {
        this.element.removeEventListener("submit", this.submitHandler);
        this.element.style.display = "none";
        this.backdrop.destroy();
    }
}

export default ReminderForm;