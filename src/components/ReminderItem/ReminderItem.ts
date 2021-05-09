import Component from "../Component/Component";
import template from './reminderItem.template';
import Reminder from "../../models/Reminder";
import ReminderState from "../../state/ReminderState";
import AutoBind from "../../decorators/AutoBind";
import ReminderForm from "../ReminderForm/ReminderForm";
import Draggable from "../../models/Draggable";

import './reminderItem.scss';
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";

class ReminderItem extends Component<HTMLDivElement, HTMLDivElement> implements Draggable {

    constructor(private hostId: string, public reminder: Reminder) {
        super(hostId, "div");
        this.element.draggable = true;
        this.element.className = "reminder";

        this.renderContent();
        this.configure();
    }

    @AutoBind
    dragStartHandler(event: DragEvent): void {
        const dataKey = "text/" + (this.reminder.favorite ? "" : "non-") + "fav";
        event.dataTransfer!.setData(dataKey , this.reminder.id);
        event.dataTransfer!.dropEffect = "move";
    }

    @AutoBind
    dragEndHandler(_: DragEvent): void {
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
    editHandler(_: Event) {
        new ReminderForm(this.hostId, this.reminder);
    }

    @AutoBind
    deleteHandler(_: Event) {
        new DeleteConfirmation(this.hostId, this.reminder.id);
    }

    configure(): void {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
        this.element.querySelector("#copy-btn")!.addEventListener("click", this.copyHandler);
        this.element.querySelector("#favorite-btn")!.addEventListener("click", ReminderState.toggleFavorite.bind(this, this.reminder.id));
        this.element.querySelector("#edit-btn")!.addEventListener("click", this.editHandler);
        this.element.querySelector("#delete-btn")!.addEventListener("click", this.deleteHandler);
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