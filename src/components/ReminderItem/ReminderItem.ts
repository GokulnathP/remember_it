import Component from "../Component/Component";
import template from './reminderItem.template';
import Reminder from "../../models/Reminder";
import ReminderState from "../../state/ReminderState";
import AutoBind from "../../decorators/AutoBind";
import ReminderForm from "../ReminderForm/ReminderForm";

import './reminderItem.scss';

class ReminderItem extends Component<HTMLDivElement, HTMLDivElement> {

    constructor(private hostId: string, public reminder: Reminder) {
        super(hostId, "div");
        this.element.className = "reminder";

        this.renderContent();
        this.configure();
    }

    @AutoBind
    copyHandler() {
        if(navigator.clipboard) {
            navigator.clipboard.writeText(this.reminder.link);
        } else {
            console.log("Cannot copy to clipboard");
        }
    }

    @AutoBind
    editHandler(event: Event) {
        new ReminderForm(this.hostId, this.reminder);
    }

    configure(): void {
        this.element.querySelector("#copy-btn")!.addEventListener("click", this.copyHandler);
        this.element.querySelector("#favorite-btn")!.addEventListener("click", ReminderState.toggleFavorite.bind(this, this.reminder.id));
        this.element.querySelector("#edit-btn")!.addEventListener("click", this.editHandler);
        this.element.querySelector("#delete-btn")!.addEventListener("click", ReminderState.deleteReminder.bind(this, this.reminder.id));
    }

    renderContent(): void {
        this.element.innerHTML = template;
        this.element.id = this.reminder.id;
        this.element.querySelector("h3")!.textContent = this.reminder.title;

        const urlElement = this.element.querySelector('a')!;
        urlElement.href = this.reminder.link;
        urlElement.textContent = this.reminder.link;

        this.element.querySelector("#favorite-btn")!.className = "fa fa-lg fa-heart" + (this.reminder.favorite ? "" : "-o")
    }
}

export default ReminderItem;